import React from "react";
import { motion } from "framer-motion";

interface StatBarProps {
  label: string;
  value: number; // 0–10
  max?: number;
}

export const StatBar: React.FC<StatBarProps> = ({ label, value, max = 10 }) => {
  const percent = (value / max) * 100;
  
  // Determine color based on value
  const getBarColor = (val: number) => {
    if (val < 4) return "bg-gradient-to-r from-terracotta/80 to-terracotta";
    if (val >= 4 && val <= 6) return "bg-gradient-to-r from-gold/80 to-gold";
    return "bg-gradient-to-r from-teal/80 to-teal";
  };

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-1">
        <motion.span 
          className="text-gray-500 font-semibold text-md italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {label} - {value}/10
        </motion.span>
      </div>
      <div className="relative h-4 w-full bg-gray-200 overflow-hidden">
        <motion.div
          className={`absolute left-0 top-0 h-full ${getBarColor(value)}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ 
            duration: 1.8, 
            delay: 0.3,
            ease: [0.1, 0.8, 0.2, 1]
          }}
        />
        {/* small segments */}
        {[...Array(max)].map((_, i) => (
          i > 0 && (
            <motion.div
              key={i}
              className="absolute top-0 bottom-0 border-r-[3px] border-gray-900/30"
              style={{ left: `${(i / max) * 100}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + (i * 0.05), duration: 0.2 }}
            />
          )
        ))}
      </div>
    </motion.div>
  );
};

// Candidate evaluation categories
interface CandidateCategory {
  label: string;
  value: number;
}

export const CandidateStats = ({ categories }: { categories: CandidateCategory[] }) => {
  return (
    <div className="w-full text-white">
      {categories.map((category, index) => (
        <motion.div
          key={category.label}
          className={index < categories.length - 1 ? "mb-3" : ""}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1 
          }}
        >
          <StatBar 
            label={category.label} 
            value={category.value} 
          />
        </motion.div>
      ))}
    </div>
  );
};

export const getTextColorForScore = (score: number) => {
    if (score <= 4) return "text-terracotta";
    if (score >= 5 && score <= 7) return "text-gold";
    return "text-teal";
};

export const getColorForScoreHex = (score: number) => {
    if (score <= 4) return "#E63946"; // text-terracotta
    if (score >= 5 && score <= 7) return "#F4A261"; // text-gold
    return "#2EC4B6"; // text-teal
};

export const getBgColorForScore = (score: number) => {
    if (score <= 4) return "bg-gradient-to-br from-card to-accent/5";
    if (score >= 5 && score <= 7) return "bg-gradient-to-br from-card to-accent/10"; 
    return "bg-gradient-to-br from-card to-accent/30";
};