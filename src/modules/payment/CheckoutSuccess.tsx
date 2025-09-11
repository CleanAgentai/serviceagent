import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>(
    'verifying',
  );
  const navigate = useNavigate();

  const sessionId = new URLSearchParams(window.location.search).get(
    'session_id',
  );
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }
    fetch(`${apiBaseUrl}/api/stripe/verify-checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Verification failed');
        return res.json();
      })
      .then((data) => {
        if (data.paid) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      })
      .catch((err) => {
        console.error('Verification error:', err);
        setStatus('error');
      });
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-lg shadow">
        {status === 'verifying' && (
          <>
            <h2 className="text-xl font-semibold">Verifying your payment...</h2>
            <p className="text-gray-500 mt-2">Please wait a moment.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <h2 className="text-2xl font-bold text-green-600">
              Payment Successful
            </h2>
            <p className="text-gray-600 mt-2">
              Thank you for your subscription.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Go to Dashboard
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <h2 className="text-2xl font-bold text-red-600">
              Payment Verification Failed
            </h2>
            <p className="text-gray-600 mt-2">
              Please contact support or try again.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutSuccess;
