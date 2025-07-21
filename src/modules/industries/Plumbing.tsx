import React from "react";

const tableClass =
  "w-full border-collapse my-6 text-sm md:text-base shadow-sm rounded-lg overflow-hidden";
const thClass =
  "bg-blue-50 text-blue-900 font-semibold px-4 py-2 border border-blue-100 text-left";
const tdClass =
  "px-4 py-2 border border-blue-100 text-slate-800";
const bullet = "list-disc ml-6 mb-2 text-slate-700";

export default function Plumbing() {
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
          How a Regional Plumbing Company Cut Hiring Time by 73% and Hired 5 Technicians in Just 2 Weeks
        </h1>
        <p className="text-lg text-slate-700 mb-6">
          By automating resume screening, interviews, and scoring, this plumbing company filled every open role in 14 days, eliminated no-shows, and turned chaotic hiring into a system.
        </p>
        
        {/* Large featured image integrated into article */}
        <div className="my-8">
          <img src="/Plumber.svg" alt="Plumbing" className="w-full max-w-2xl h-48 object-cover rounded-lg" />
        </div>
      </div>

      {/* Article content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">Overview</span>
        <p className="mb-2 text-slate-800">
          A regional plumbing company was struggling to hire qualified technicians during a period of rapid growth. They needed 5 new plumbers quickly but traditional hiring methods were too slow and unreliable.
        </p>
        <p className="mb-2 text-slate-800">
          After implementing ServiceAgent, they filled all 5 roles in just 14 days, reduced their time-to-hire by 73%, and eliminated interview no-shows completely.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">The Problem</span>
        <p className="mb-2 text-slate-800">
          The plumbing company faced several critical hiring challenges:
        </p>
        <ul className={bullet}>
          <li>Manual resume screening taking 20+ hours per week</li>
          <li>22-day average time-to-hire</li>
          <li>High interview no-show rate</li>
          <li>Inconsistent candidate quality</li>
          <li>Lost revenue due to staffing delays</li>
        </ul>
        <p className="mb-2 text-slate-800">
          They needed a <span className="font-bold">faster, more reliable way</span> to identify and hire qualified plumbing technicians.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">The ServiceAgent Solution</span>
        <p className="mb-2 text-slate-800">
          ServiceAgent was implemented with custom screening for plumbing technician roles:
        </p>
        <ul className={bullet}>
          <li>Automated video interviews for all applicants</li>
          <li>AI scoring based on plumbing experience and certifications</li>
          <li>Instant qualification assessment</li>
          <li>Automated scheduling for qualified candidates</li>
          <li>Integration with existing HR systems</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">14-Day Results</span>
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
              <td className={tdClass}>22 days</td>
              <td className={tdClass}>6 days</td>
              <td className={tdClass}>73% faster</td>
            </tr>
            <tr>
              <td className={tdClass}>Admin Time per Week</td>
              <td className={tdClass}>20 hours</td>
              <td className={tdClass}>3 hours</td>
              <td className={tdClass}>85% reduction</td>
            </tr>
            <tr>
              <td className={tdClass}>Interview No-Shows</td>
              <td className={tdClass}>35%</td>
              <td className={tdClass}>0%</td>
              <td className={tdClass}>100% reduction</td>
            </tr>
            <tr>
              <td className={tdClass}>Hiring Success Rate</td>
              <td className={tdClass}>60%</td>
              <td className={tdClass}>100%</td>
              <td className={tdClass}>40% improvement</td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">Hiring Funnel</span>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Stage</th>
              <th className={thClass}>Candidates</th>
              <th className={thClass}>Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdClass}>Applications Received</td>
              <td className={tdClass}>143</td>
              <td className={tdClass}>–</td>
            </tr>
            <tr>
              <td className={tdClass}>Completed AI Interviews</td>
              <td className={tdClass}>78</td>
              <td className={tdClass}>55%</td>
            </tr>
            <tr>
              <td className={tdClass}>Qualified Candidates</td>
              <td className={tdClass}>25</td>
              <td className={tdClass}>32%</td>
            </tr>
            <tr>
              <td className={tdClass}>Final Interviews</td>
              <td className={tdClass}>8</td>
              <td className={tdClass}>32%</td>
            </tr>
            <tr>
              <td className={tdClass}>Hires Made</td>
              <td className={tdClass}>5</td>
              <td className={tdClass}>63%</td>
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
              <td className={tdClass}>Admin Time (68 hours × $25/hr)</td>
              <td className={tdClass}>$1,700</td>
            </tr>
            <tr>
              <td className={tdClass}>Faster Revenue Generation</td>
              <td className={tdClass}>$2,800</td>
            </tr>
            <tr>
              <td className={tdClass}>Reduced Hiring Costs</td>
              <td className={tdClass}>$900</td>
            </tr>
            <tr>
              <td className={tdClass}>ServiceAgent Cost</td>
              <td className={tdClass}>-$479</td>
            </tr>
            <tr>
              <td className={tdClass}><strong>Net Monthly Savings</strong></td>
              <td className={tdClass}><strong>$4,921</strong></td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">Operations Manager Feedback</span>
        <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
          "We were spending way too much time on hiring and still not getting the right people. ServiceAgent changed everything. Now we get qualified candidates ready for final interviews in minutes, not days."
          <br />
          <span className="block mt-2 text-right font-semibold">— Robert Wilson, Operations Manager</span>
        </blockquote>
        <span className="text-blue-700 font-semibold underline mb-2 block">Key Achievements</span>
        <ul className={bullet}>
          <li>5 technician roles filled in 14 days</li>
          <li>73% reduction in time-to-hire</li>
          <li>85% reduction in administrative time</li>
          <li>100% elimination of interview no-shows</li>
          <li>40% improvement in hiring success rate</li>
          <li>Scalable process for future growth</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">The Bottom Line</span>
        <p className="mb-2 text-slate-800">
          For plumbing companies, hiring qualified technicians quickly is essential for meeting customer demand and maintaining service quality. ServiceAgent provided this company with an efficient solution that accelerated their hiring process while dramatically reducing administrative burden.
        </p>
      </div>
    </div>
  );
} 