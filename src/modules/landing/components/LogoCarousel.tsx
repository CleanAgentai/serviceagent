import React from "react";

// List of logo filenames (alphabetical, only those that exist in public folder)
const logoFilenames = [
  "ApplicantStack_Square_Logo_wBHYVRL-thumbnail-144x144-70.jpg",
  "Ashby_Square_Logo_3uQWavw-thumbnail-144x144.png",
  "BambooHR_Square_Logo-thumbnail-144x144-70.jpg",
  "Breezy_Square_Logo-thumbnail-144x144-70.jpg",
  "CATS_Square_Logo_J4NkqoE-thumbnail-144x144-70.jpg",
  "Cornerstone_Square_Logo-thumbnail-144x144-70.jpg",
  "Fountain_Square_Logo-thumbnail-144x144.png",
  "Greenhouse_Square_Logo-thumbnail-144x144-70.jpg",
  "HR_Cloud_Square_Logo-thumbnail-144x144-70.jpg",
  "homerun-thumbnail-144x144.png",
  "Jobvite_Square_Logo-thumbnail-144x144.png",
  "Lever_Square_Logo_oYg8yBW-thumbnail-144x144-70.jpg",
  "Oracle_Recruiting_square-thumbnail-144x144.png",
  "Pinpoint_square-thumbnail-144x144.png",
  "PlatformCrelate_square-thumbnail-144x144.png",
  "PlatformICIMS_square-thumbnail-144x144.png",
  "PlatformJobDiva-thumbnail-144x144.png",
  "PlatformManatal-thumbnail-144x144.png",
  "PlatformOnlyfi-thumbnail-144x144.png",
  "PlatformTaleez-thumbnail-144x144.png",
  "PlatformTraffit_jTdJ5ZL-thumbnail-144x144.png",
  "PlatformWelcome_to_the_Jungle-thumbnail-144x144.png",
  "PlatformZoho_recruit_square-thumbnail-144x144.png",
  "Property_1Integration_Property_2Generic_Property_3Square_Property_4Bullhorn-thumbnail-144x144.png",
  "RecruiterFlow_Square_Logo_0pzjFF2-thumbnail-144x144-70.jpg",
  "Recruit_Icon_Only-thumbnail-144x144.png",
  "SmartRecruiters_Square_Logo_j8vLfEW-thumbnail-144x144.png",
  "SuccessFactors_Square_Logo_BcXogF0-thumbnail-144x144-70.jpg",
  "Taleo_Square_Logo-thumbnail-144x144-70.jpg",
  "Teamtailor_Square_Logo-thumbnail-144x144-70.jpg",
  "UKG_Square_Logo_zTMYILE-thumbnail-144x144.png",
  "Workable_Square_Logo_OvllNl9-thumbnail-144x144-70.jpg"
];

const LogoCarousel: React.FC = () => {
  return (
    <div className="overflow-hidden w-full py-6 flex justify-center" style={{ background: 'transparent' }}>
      <div className="rounded-xl shadow-lg border border-gray-100 px-2 py-8 w-full max-w-6xl bg-white">
        <div className="mb-6 text-center">
          <span className="text-black text-lg font-medium">Trusted to power integrations at</span>
        </div>
        <div className="relative flex items-center">
          <div className="logo-carousel-track flex gap-12 animate-logo-scroll">
            {logoFilenames.concat(logoFilenames).map((filename, idx) => (
              <div key={idx} className="flex items-center justify-center h-24 w-36 opacity-80 hover:opacity-100 transition-all">
                <img
                  src={`/${filename}`}
                  alt="Logo"
                  className="max-h-16 max-w-[120px] object-contain"
                  draggable="false"
                  style={{ mixBlendMode: 'multiply', width: 'auto', height: '64px' }}
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