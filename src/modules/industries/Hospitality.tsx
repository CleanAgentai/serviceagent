import React from "react";

const tableClass =
  "w-full border-collapse my-6 text-sm md:text-base shadow-sm rounded-lg overflow-hidden";
const thClass =
  "bg-blue-50 text-blue-900 font-semibold px-4 py-2 border border-blue-100 text-left";
const tdClass =
  "px-4 py-2 border border-blue-100 text-slate-800";
const bullet = "list-disc ml-6 mb-2 text-slate-700";

export default function Hospitality() {
  return (
    <div className="relative w-full bg-white">
      {/* Blue background gradient and accent shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-16 -left-24 w-80 h-80 bg-gradient-radial from-[#0E7CFF]/20 to-transparent rounded-full blur-2xl opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-radial from-[#A1E3FF]/30 to-transparent rounded-full blur-2xl opacity-40"></div>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] opacity-80"></div>
      </div>
      
      {/* Header with logo in top right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="flex justify-start">
          <img src="/logos/Logo_transparent.png" alt="ServiceAgent Logo" className="h-auto w-48" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          How a Hotel Chain Improved Guest Satisfaction by 23% and Reduced Staff Turnover by 58% with AI Hiring
        </h1>
        <p className="text-lg text-slate-700 mb-6">
          By automating their hiring process with ServiceAgent, this hotel chain filled 67 positions across 12 properties in just 3 weeks while dramatically improving employee retention and guest satisfaction scores.
        </p>
      </div>

      {/* Article content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">Overview</span>
        <p className="mb-2 text-slate-800">
          A regional hotel chain with 12 properties was struggling with high employee turnover and declining guest satisfaction scores. They needed to fill 67 positions quickly but traditional hiring methods were too slow and resulted in poor retention.
        </p>
        <p className="mb-2 text-slate-800">
          After implementing ServiceAgent, they filled all 67 positions in 3 weeks, reduced turnover by 58%, and improved guest satisfaction by 23%.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">The Problem</span>
        <p className="mb-2 text-slate-800">
          The hotel chain faced several critical challenges:
        </p>
        <ul className={bullet}>
          <li>High employee turnover rate (42%)</li>
          <li>Declining guest satisfaction scores</li>
          <li>Manual screening taking 20+ hours per week per property</li>
          <li>Slow hiring process (15+ days average)</li>
          <li>Poor candidate quality leading to quick exits</li>
        </ul>
        <p className="mb-2 text-slate-800">
          They needed a <span className="font-bold">faster, more effective way</span> to identify and hire reliable hospitality staff.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">The ServiceAgent Solution</span>
        <p className="mb-2 text-slate-800">
          ServiceAgent was implemented across all 12 properties with hospitality-specific screening:
        </p>
        <ul className={bullet}>
          <li>Automated video interviews for all applicants</li>
          <li>AI scoring based on hospitality experience and customer service skills</li>
          <li>Personality and work ethic assessment</li>
          <li>Automated scheduling for qualified candidates</li>
          <li>Integration with existing HR systems</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">3-Week Results</span>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Metric</th>
              <th className={thClass}>Before ServiceAgent</th>
              <th className={thClass}>After ServiceAgent</th>
              <th className={thClass}>Improvement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdClass}>Time-to-Hire</td>
              <td className={tdClass}>15 days</td>
              <td className={tdClass}>4.5 days</td>
              <td className={tdClass}>70% faster</td>
            </tr>
            <tr>
              <td className={tdClass}>Admin Time per Week</td>
              <td className={tdClass}>240 hours</td>
              <td className={tdClass}>48 hours</td>
              <td className={tdClass}>80% reduction</td>
            </tr>
            <tr>
              <td className={tdClass}>Employee Turnover</td>
              <td className={tdClass}>42%</td>
              <td className={tdClass}>18%</td>
              <td className={tdClass}>58% reduction</td>
            </tr>
            <tr>
              <td className={tdClass}>Guest Satisfaction</td>
              <td className={tdClass}>7.2/10</td>
              <td className={tdClass}>8.8/10</td>
              <td className={tdClass}>23% improvement</td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">Property Impact</span>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Property</th>
              <th className={thClass}>Positions Filled</th>
              <th className={thClass}>Time Saved</th>
              <th className={thClass}>Quality Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdClass}>Downtown Hotel</td>
              <td className={tdClass}>12</td>
              <td className={tdClass}>25 hours</td>
              <td className={tdClass}>9.2/10</td>
            </tr>
            <tr>
              <td className={tdClass}>Airport Hotel</td>
              <td className={tdClass}>8</td>
              <td className={tdClass}>20 hours</td>
              <td className={tdClass}>8.9/10</td>
            </tr>
            <tr>
              <td className={tdClass}>Resort Property</td>
              <td className={tdClass}>15</td>
              <td className={tdClass}>30 hours</td>
              <td className={tdClass}>9.1/10</td>
            </tr>
            <tr>
              <td className={tdClass}>Business Hotel</td>
              <td className={tdClass}>6</td>
              <td className={tdClass}>15 hours</td>
              <td className={tdClass}>8.8/10</td>
            </tr>
            <tr>
              <td className={tdClass}><strong>Total (12 properties)</strong></td>
              <td className={tdClass}><strong>67</strong></td>
              <td className={tdClass}><strong>180 hours</strong></td>
              <td className={tdClass}><strong>9.0/10 avg</strong></td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">Cost Analysis</span>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Category</th>
              <th className={thClass}>Monthly Savings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdClass}>Admin Time (768 hours × $25/hr)</td>
              <td className={tdClass}>$19,200</td>
            </tr>
            <tr>
              <td className={tdClass}>Reduced Turnover Costs</td>
              <td className={tdClass}>$12,600</td>
            </tr>
            <tr>
              <td className={tdClass}>Increased Guest Revenue</td>
              <td className={tdClass}>$8,400</td>
            </tr>
            <tr>
              <td className={tdClass}>ServiceAgent Cost</td>
              <td className={tdClass}>-$479</td>
            </tr>
            <tr>
              <td className={tdClass}><strong>Net Monthly Savings</strong></td>
              <td className={tdClass}><strong>$39,721</strong></td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">General Manager Feedback</span>
        <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
          "The turnover was affecting our guest experience. We'd hire someone and they'd quit within a month. ServiceAgent helped us identify candidates who are actually committed to hospitality. Our guest satisfaction scores have never been higher."
          <br />
          <span className="block mt-2 text-right font-semibold">— Maria Santos, General Manager</span>
        </blockquote>
        <span className="text-blue-700 font-semibold underline mb-2 block">Key Achievements</span>
        <ul className={bullet}>
          <li>67 positions filled across 12 properties in 3 weeks</li>
          <li>70% reduction in time-to-hire</li>
          <li>80% reduction in administrative time</li>
          <li>58% reduction in employee turnover</li>
          <li>23% improvement in guest satisfaction</li>
          <li>Scalable process for future growth</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">The Bottom Line</span>
        <p className="mb-2 text-slate-800">
          For hospitality businesses, hiring reliable staff who stay with the company is crucial for maintaining guest satisfaction and profitability. ServiceAgent provided this hotel chain with an efficient solution that not only accelerated their hiring process but also significantly improved employee retention and guest experience.
        </p>
      </div>
    </div>
  );
} 