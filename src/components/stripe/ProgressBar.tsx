import React from "react";

interface ProgressBarProps {
  used: number;
  limit: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ used, limit }) => {
  const percentage = Math.min(100, Math.round((used / limit) * 100));
  const isFull = percentage >= 90;
  const isHalf = percentage > 50;

  return (
    <div className="w-52">
      <div className="relative w-full h-6 bg-blue-100 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 rounded-full ${
            isFull ? "bg-terracotta" : "bg-teal-600"
          }`}
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
          <span className={isHalf ? "text-white" : "text-black"}>
            {used}/{limit}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;