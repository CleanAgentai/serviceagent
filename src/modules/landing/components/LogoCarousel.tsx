import React from "react";

// Explicit list of SVG filenames in the public folder, in order
const logoFilenames = [
  "Untitled design.svg",
  "Untitled design (1).svg",
  "Untitled design (2).svg",
  "Untitled design (3).svg",
  "Untitled design (4).svg",
  "Untitled design (5).svg",
  "Untitled design (6).svg",
  "Untitled design (7).svg",
  "Untitled design (8).svg",
  "Untitled design (9).svg",
  "Untitled design (10).svg",
  "Untitled design (11).svg",
  "Untitled design (12).svg",
  "Untitled design (13).svg",
  "Untitled design (14).svg",
  "Untitled design (15).svg",
  "Untitled design (16).svg",
  "Untitled design (17).svg",
  "Untitled design (18).svg",
  "Untitled design (19).svg",
  "Untitled design (20).svg",
  "Untitled design (21).svg",
  "Untitled design (22).svg",
  "Untitled design (23).svg",
  "Untitled design (24).svg",
  "Untitled design (25).svg",
  "Untitled design (26).svg",
  "Untitled design (27).svg",
  "Untitled design (28).svg",
  "Untitled design (29).svg",
  "Untitled design (30).svg",
  "Untitled design (31).svg"
];

const LogoCarousel: React.FC = () => {
  return (
    <div className="overflow-hidden w-full py-6 flex justify-center relative" style={{ background: 'transparent' }}>
            <div className="rounded-xl shadow-lg border border-gray-100 px-2 py-8 w-full max-w-6xl bg-white relative z-10">
        <div className="mb-6 text-center">
          <span className="text-black text-lg font-medium">Seamlessly integrates with popular ATS platforms or use ServiceAgent standalone</span>
        </div>
        <div className="relative flex items-center" style={{height: '96px'}}>
          {/* Left Gradient Overlay - wider and flush with card edge */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 -ml-8 z-20" style={{background: 'linear-gradient(to right, white 40%, transparent)'}} />
          {/* Right Gradient Overlay - wider and flush with card edge */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 -mr-8 z-20" style={{background: 'linear-gradient(to left, white 40%, transparent)'}} />
          <div className="logo-carousel-track flex gap-12 animate-logo-scroll -ml-16">
            {logoFilenames.concat(logoFilenames).map((filename, idx) => (
              <div key={idx} className="flex items-center justify-center h-24 w-36 opacity-80 hover:opacity-100 transition-all">
                <img
                  src={`/${filename}`}
                  alt="Logo"
                  className="max-h-16 max-w-[120px] object-contain"
                  draggable="false"
                  style={{ width: 'auto', height: '64px' }}
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