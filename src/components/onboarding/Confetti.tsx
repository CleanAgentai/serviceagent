import React, { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useAuth } from '@/app/providers/AuthContext';
import { supabase } from '@/app/lib/supabase';
import { useLocation } from 'react-router-dom';

export default function LoggedInConfetti({
  durationMs = 6000,
  startPieces = 400,
  step = 50,
  stepInterval = 300,
}: {
  durationMs?: number;
  startPieces?: number;
  step?: number;
  stepInterval?: number;
}) {
  const { user } = useAuth();
  const { width, height } = useWindowSize();
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [pieces, setPieces] = useState(startPieces);
  const timerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  async function maybeCelebrate() {
    if (!user) return;
    const KEY = `confetti_firstTwoDone:${user.id}`;
    if (localStorage.getItem(KEY) === 'true') return;

    const { data, error } = await supabase
      .from('company_profiles')
      .select('completion_bitmask')
      .eq('created_by_user_id', user.id)
      .single();

    if (error) {
      console.error('confetti bitmask fetch error:', error);
      return;
    }

    const bm = String(data?.completion_bitmask ?? '');
    if (bm.startsWith('11')) {
      localStorage.setItem(KEY, 'true');
      setPieces(startPieces);
      setShow(true);

      timerRef.current = window.setTimeout(() => {
        intervalRef.current = window.setInterval(() => {
          setPieces((prev) => {
            if (prev <= step) {
              if (intervalRef.current) clearInterval(intervalRef.current);
              setShow(false);
              return 0;
            }
            return prev - step;
          });
        }, stepInterval);
      }, durationMs);
    }
  }

  useEffect(() => {
    maybeCelebrate();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [user, pathname]);

  if (!show) return null;

  return (
    <>
      <Confetti
        width={width}
        height={height}
        numberOfPieces={pieces}
        recycle={false}
      />
      <div
        style={{
          position: 'fixed',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          background: 'rgba(255,255,255,0.95)',
          padding: '1.25rem 2rem',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          zIndex: 9999,
          animation: 'fadeInOut 9s ease forwards',
        }}
      >
        <p className="text-sm text-gray-700 mb-4 leading-relaxed">
          🎉 Getting Started complete! <br />
          You're now ready to explore the full platform.
        </p>
      </div>
      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; }
            10% { opacity: 1; }
            80% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>
    </>
  );
}
