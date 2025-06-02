import React from "react";

interface ProgressBarProps {
  used: number;
  limit: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ used, limit }) => {
  const percentage = Math.min(100, Math.round((used / limit) * 100));

  return (
    <div className="w-52">
      <div className="relative w-full h-4 bg-blue-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-black">
          {used}/{limit}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;