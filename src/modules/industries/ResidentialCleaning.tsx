import React from "react";

const tableClass =
  "w-full border-collapse my-6 text-sm md:text-base shadow-sm rounded-lg overflow-hidden";
const thClass =
  "bg-blue-50 text-blue-900 font-semibold px-4 py-2 border border-blue-100 text-left";
const tdClass =
  "px-4 py-2 border border-blue-100 text-slate-800";
const sectionTitle =
  "text-2xl md:text-3xl font-bold text-slate-900 mb-2 mt-8 border-b-2 border-blue-200 pb-1";
const subTitle =
  "text-lg md:text-xl font-semibold text-blue-700 mb-2 mt-6";
const bullet = "list-disc ml-6 mb-2 text-slate-700";
const highlight = "font-bold text-blue-700";

export default function ResidentialCleaning() {
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
        <div className="flex justify-end mb-8">
          <img src="/Banner_SA_new.svg" alt="ServiceAgent Logo" className="h-12 w-auto" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          How This 6-Location Cleaning Franchise Filled Every Open Role in 30 Days
        </h1>
        <p className="text-lg text-slate-700 mb-6">
          Automating interviews, qualification, and follow-up saved over 50 hours a month and kept every branch fully staffed—all for under $750.
        </p>
        
        {/* Large featured image integrated into article */}
        <div className="my-8">
          <img src="/CleaningService.svg" alt="Residential Cleaning" className="w-full max-w-2xl h-48 object-cover rounded-lg" />
        </div>
      </div>

      {/* Article content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">Overview</span>
        <p className="mb-2 text-slate-800">
          A growing residential cleaning franchise with 6 locations was struggling to keep up with hiring demand. Each branch needed 2-3 new cleaners monthly, but manual screening was taking too long and missing qualified candidates.
        </p>
        <p className="mb-2 text-slate-800">
          After implementing ServiceAgent, they filled every open role within 30 days, reduced time-to-hire by 65%, and saved over 50 hours of administrative work per month.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">The Problem</span>
        <p className="mb-2 text-slate-800">
          The franchise was facing several hiring challenges:
        </p>
        <ul className={bullet}>
          <li>High turnover in residential cleaning roles</li>
          <li>Manual resume screening taking 3-4 hours per week</li>
          <li>Phone interviews with unqualified candidates</li>
          <li>Inconsistent hiring standards across locations</li>
          <li>Delayed start dates due to slow hiring process</li>
        </ul>
        <p className="mb-2 text-slate-800">
          They needed a <span className={highlight}>faster, more efficient way</span> to screen and hire reliable cleaning staff.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">The ServiceAgent Solution</span>
        <p className="mb-2 text-slate-800">
          ServiceAgent was implemented across all 6 locations with customized screening for residential cleaning roles:
        </p>
        <ul className={bullet}>
          <li>Automated video interviews for all applicants</li>
          <li>AI scoring based on cleaning experience and reliability</li>
          <li>Standardized hiring criteria across all branches</li>
          <li>Instant follow-up with qualified candidates</li>
          <li>Integration with existing HR systems</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">30-Day Results</span>
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
              <td className={tdClass}>14 days</td>
              <td className={tdClass}>5 days</td>
              <td className={tdClass}>65% faster</td>
            </tr>
            <tr>
              <td className={tdClass}>Admin Time per Week</td>
              <td className={tdClass}>15 hours</td>
              <td className={tdClass}>2 hours</td>
              <td className={tdClass}>87% reduction</td>
            </tr>
            <tr>
              <td className={tdClass}>Hiring Success Rate</td>
              <td className={tdClass}>60%</td>
              <td className={tdClass}>95%</td>
              <td className={tdClass}>35% improvement</td>
            </tr>
            <tr>
              <td className={tdClass}>Cost per Hire</td>
              <td className={tdClass}>$150</td>
              <td className={tdClass}>$45</td>
              <td className={tdClass}>70% reduction</td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">Monthly Impact</span>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Location</th>
              <th className={thClass}>Roles Filled</th>
              <th className={thClass}>Time Saved</th>
              <th className={thClass}>Cost Savings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdClass}>Downtown</td>
              <td className={tdClass}>3</td>
              <td className={tdClass}>12 hours</td>
              <td className={tdClass}>$315</td>
            </tr>
            <tr>
              <td className={tdClass}>Suburban</td>
              <td className={tdClass}>2</td>
              <td className={tdClass}>8 hours</td>
              <td className={tdClass}>$210</td>
            </tr>
            <tr>
              <td className={tdClass}>Westside</td>
              <td className={tdClass}>2</td>
              <td className={tdClass}>8 hours</td>
              <td className={tdClass}>$210</td>
            </tr>
            <tr>
              <td className={tdClass}>Eastside</td>
              <td className={tdClass}>3</td>
              <td className={tdClass}>12 hours</td>
              <td className={tdClass}>$315</td>
            </tr>
            <tr>
              <td className={tdClass}>North</td>
              <td className={tdClass}>2</td>
              <td className={tdClass}>8 hours</td>
              <td className={tdClass}>$210</td>
            </tr>
            <tr>
              <td className={tdClass}>South</td>
              <td className={tdClass}>2</td>
              <td className={tdClass}>8 hours</td>
              <td className={tdClass}>$210</td>
            </tr>
            <tr>
              <td className={tdClass}><strong>Total</strong></td>
              <td className={tdClass}><strong>14</strong></td>
              <td className={tdClass}><strong>56 hours</strong></td>
              <td className={tdClass}><strong>$1,470</strong></td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">Franchise Owner Feedback</span>
        <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
          "ServiceAgent transformed our hiring process. We went from spending hours on phone screens to having qualified candidates ready for final interviews in minutes. The consistency across all our locations is incredible."
          <br />
          <span className="block mt-2 text-right font-semibold">— Sarah Johnson, Franchise Owner</span>
        </blockquote>
        <span className="text-blue-700 font-semibold underline mb-2 block">Key Benefits</span>
        <ul className={bullet}>
          <li>All 14 open roles filled within 30 days</li>
          <li>56 hours of administrative time saved monthly</li>
          <li>95% hiring success rate achieved</li>
          <li>Consistent hiring standards across all locations</li>
          <li>Reduced turnover through better candidate matching</li>
          <li>Scalable process for future growth</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">ROI Analysis</span>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Investment</th>
              <th className={thClass}>Monthly Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdClass}>ServiceAgent Plan</td>
              <td className={tdClass}>$479</td>
            </tr>
            <tr>
              <td className={tdClass}>Time Savings Value</td>
              <td className={tdClass}>$1,470</td>
            </tr>
            <tr>
              <td className={tdClass}>Net Monthly Savings</td>
              <td className={tdClass}>$991</td>
            </tr>
            <tr>
              <td className={tdClass}>Annual ROI</td>
              <td className={tdClass}>2,480%</td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">The Bottom Line</span>
        <p className="mb-2 text-slate-800">
          For residential cleaning franchises, efficient hiring is crucial for maintaining service quality and growth. ServiceAgent provided this franchise with a scalable, cost-effective solution that improved hiring outcomes while dramatically reducing administrative burden.
        </p>
      </div>
    </div>
  );
} 