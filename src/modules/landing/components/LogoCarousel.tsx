import React from 'react';

const logoFilenames = [
  'Untitled design.svg',
  'Untitled design (1).svg',
  'Untitled design (2).svg',
  'Untitled design (3).svg',
  'Untitled design (4).svg',
  'Untitled design (5).svg',
  'Untitled design (6).svg',
  'Untitled design (7).svg',
  'Untitled design (8).svg',
  'Untitled design (9).svg',
  'Untitled design (10).svg',
  'Untitled design (11).svg',
  'Untitled design (12).svg',
  'Untitled design (13).svg',
  'Untitled design (14).svg',
  'Untitled design (15).svg',
  'Untitled design (16).svg',
  'Untitled design (17).svg',
  'Untitled design (18).svg',
  'Untitled design (19).svg',
  'Untitled design (20).svg',
  'Untitled design (21).svg',
  'Untitled design (22).svg',
  'Untitled design (23).svg',
  'Untitled design (24).svg',
  'Untitled design (25).svg',
  'Untitled design (26).svg',
  'Untitled design (27).svg',
  'Untitled design (28).svg',
  'Untitled design (29).svg',
  'Untitled design (30).svg',
  'Untitled design (31).svg',
];

const LogoCarousel: React.FC = () => {
  return (
    <div className="w-full py-6 flex justify-center relative bg-transparent">
      <div className="relative z-10 w-full max-w-7xl rounded-xl bg-white shadow-lg border border-gray-100 px-2 py-8">
        <div className="mb-6 text-center">
          <span className="text-black text-lg font-medium">
            Seamlessly integrates with
            <br className="sm:hidden" /> popular ATS platforms.
          </span>
        </div>

        {/* Masked viewport */}
        <div
          className="relative h-24 overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div className="logo-carousel-track flex gap-12">
            {logoFilenames.concat(logoFilenames).map((filename, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center h-24 w-36 opacity-80 hover:opacity-100 transition-opacity"
              >
                <img
                  src={`/${filename}`}
                  alt="Logo"
                  className="max-h-16 max-w-[120px] object-contain"
                  draggable="false"
                  style={{
                    width: 'auto',
                    height: '64px',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes logo-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logo-carousel-track {
          width: max-content;
          animation: logo-scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LogoCarousel;
