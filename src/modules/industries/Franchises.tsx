import React from "react";

const tableClass =
  "w-full border-collapse my-6 text-sm md:text-base shadow-sm rounded-lg overflow-hidden";
const thClass =
  "bg-blue-50 text-blue-900 font-semibold px-4 py-2 border border-blue-100 text-left";
const tdClass =
  "px-4 py-2 border border-blue-100 text-slate-800";
const bullet = "list-disc ml-6 mb-2 text-slate-700";

export default function Franchises() {
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
          <img src="/logos/Logo.svg" alt="ServiceAgent Logo" className="h-auto w-48" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          How a Multi-Location Franchise Reduced Hiring Chaos and Standardized Recruiting Across 14 Units in 21 Days
        </h1>
        <p className="text-lg text-slate-700 mb-6">
          This fast-growing franchise used ServiceAgent to centralize and automate its entire recruiting process—cutting hiring time by 68%, boosting hire quality, and freeing up managers to focus on operations instead of resumes.
        </p>
      </div>

      {/* Article content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">Overview</span>
        <p className="mb-2 text-slate-800">
          A rapidly expanding franchise with 14 locations was struggling to maintain consistent hiring standards across all units. Each location was handling recruitment independently, leading to chaos and inconsistent results.
        </p>
        <p className="mb-2 text-slate-800">
          After implementing ServiceAgent, they standardized their entire recruiting process, reduced hiring time by 68%, and improved hire quality across all locations.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">The Problem</span>
        <p className="mb-2 text-slate-800">
          The franchise faced several critical hiring challenges:
        </p>
        <ul className={bullet}>
          <li>Inconsistent hiring standards across 14 locations</li>
          <li>Manual processes taking 20+ hours per week per location</li>
          <li>High turnover due to poor candidate matching</li>
          <li>Managers spending too much time on recruitment</li>
          <li>No centralized system for tracking applicants</li>
        </ul>
        <p className="mb-2 text-slate-800">
          They needed a <span className="font-bold">centralized, standardized way</span> to handle recruitment across all locations.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">The ServiceAgent Solution</span>
        <p className="mb-2 text-slate-800">
          ServiceAgent was implemented across all 14 locations with standardized screening:
        </p>
        <ul className={bullet}>
          <li>Centralized automated video interviews</li>
          <li>Consistent AI scoring across all locations</li>
          <li>Standardized hiring criteria</li>
          <li>Automated scheduling and follow-up</li>
          <li>Centralized applicant tracking system</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">21-Day Results</span>
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
              <td className={tdClass}>18 days</td>
              <td className={tdClass}>5.8 days</td>
              <td className={tdClass}>68% faster</td>
            </tr>
            <tr>
              <td className={tdClass}>Admin Time per Week</td>
              <td className={tdClass}>280 hours</td>
              <td className={tdClass}>42 hours</td>
              <td className={tdClass}>85% reduction</td>
            </tr>
            <tr>
              <td className={tdClass}>Hiring Success Rate</td>
              <td className={tdClass}>55%</td>
              <td className={tdClass}>92%</td>
              <td className={tdClass}>37% improvement</td>
            </tr>
            <tr>
              <td className={tdClass}>Employee Turnover</td>
              <td className={tdClass}>40%</td>
              <td className={tdClass}>18%</td>
              <td className={tdClass}>55% reduction</td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">Location Impact</span>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Location</th>
              <th className={thClass}>Roles Filled</th>
              <th className={thClass}>Time Saved</th>
              <th className={thClass}>Quality Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdClass}>Downtown</td>
              <td className={tdClass}>8</td>
              <td className={tdClass}>15 hours</td>
              <td className={tdClass}>9.2/10</td>
            </tr>
            <tr>
              <td className={tdClass}>Suburban</td>
              <td className={tdClass}>6</td>
              <td className={tdClass}>12 hours</td>
              <td className={tdClass}>8.8/10</td>
            </tr>
            <tr>
              <td className={tdClass}>Westside</td>
              <td className={tdClass}>7</td>
              <td className={tdClass}>14 hours</td>
              <td className={tdClass}>9.0/10</td>
            </tr>
            <tr>
              <td className={tdClass}>Eastside</td>
              <td className={tdClass}>5</td>
              <td className={tdClass}>10 hours</td>
              <td className={tdClass}>8.9/10</td>
            </tr>
            <tr>
              <td className={tdClass}><strong>Total (14 locations)</strong></td>
              <td className={tdClass}><strong>89</strong></td>
              <td className={tdClass}><strong>238 hours</strong></td>
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
              <td className={tdClass}>Admin Time (952 hours × $25/hr)</td>
              <td className={tdClass}>$23,800</td>
            </tr>
            <tr>
              <td className={tdClass}>Reduced Turnover Costs</td>
              <td className={tdClass}>$8,900</td>
            </tr>
            <tr>
              <td className={tdClass}>Faster Revenue Generation</td>
              <td className={tdClass}>$12,600</td>
            </tr>
            <tr>
              <td className={tdClass}>ServiceAgent Cost</td>
              <td className={tdClass}>-$479</td>
            </tr>
            <tr>
              <td className={tdClass}><strong>Net Monthly Savings</strong></td>
              <td className={tdClass}><strong>$44,821</strong></td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">Franchise Owner Feedback</span>
        <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
          "Before ServiceAgent, each location was doing their own thing. Now we have a consistent, professional hiring process across all 14 locations. The quality of hires has improved dramatically."
          <br />
          <span className="block mt-2 text-right font-semibold">— Michael Thompson, Franchise Owner</span>
        </blockquote>
        <span className="text-blue-700 font-semibold underline mb-2 block">Key Achievements</span>
        <ul className={bullet}>
          <li>89 roles filled across 14 locations in 21 days</li>
          <li>68% reduction in time-to-hire</li>
          <li>85% reduction in administrative time</li>
          <li>37% improvement in hiring success rate</li>
          <li>55% reduction in employee turnover</li>
          <li>Standardized process across all locations</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">The Bottom Line</span>
        <p className="mb-2 text-slate-800">
          For multi-location franchises, consistent hiring processes are crucial for maintaining brand standards and operational efficiency. ServiceAgent provided this franchise with a centralized solution that standardized recruitment while dramatically reducing administrative burden across all locations.
        </p>
      </div>
    </div>
  );
} 