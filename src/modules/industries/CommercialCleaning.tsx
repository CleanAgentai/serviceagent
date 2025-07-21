import React from "react";

const tableClass =
  "w-full border-collapse my-6 text-sm md:text-base shadow-sm rounded-lg overflow-hidden";
const thClass =
  "bg-blue-50 text-blue-900 font-semibold px-4 py-2 border border-blue-100 text-left";
const tdClass =
  "px-4 py-2 border border-blue-100 text-slate-800";
const bullet = "list-disc ml-6 mb-2 text-slate-700";

export default function CommercialCleaning() {
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
          How a Commercial Cleaning Company Reduced No-Shows by 100% and Filled 9 Roles in 14 Days
        </h1>
        <p className="text-lg text-slate-700 mb-6">
          By automating candidate screening and interviews with ServiceAgent, this growing commercial cleaning business eliminated interview no-shows, cut time-to-hire from 10 days to under 3, and fully staffed a new facility in just two weeks.
        </p>
        
        {/* Large featured image integrated into article */}
        <div className="my-8">
          <img src="/ComClean (1).svg" alt="Commercial Cleaning" className="w-full max-w-2xl h-48 object-cover rounded-lg" />
        </div>
      </div>

      {/* Article content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">Overview</span>
        <p className="mb-2 text-slate-800">
          A rapidly expanding commercial cleaning company was struggling with hiring delays and interview no-shows. They needed to staff a new facility quickly but traditional hiring methods were too slow and unreliable.
        </p>
        <p className="mb-2 text-slate-800">
          After implementing ServiceAgent, they filled all 9 open roles in just 14 days, eliminated interview no-shows completely, and reduced their time-to-hire by 70%.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">The Problem</span>
        <p className="mb-2 text-slate-800">
          The company faced several critical hiring challenges:
        </p>
        <ul className={bullet}>
          <li>38% interview no-show rate wasting valuable time</li>
          <li>10-day average time-to-hire delaying facility opening</li>
          <li>Manual screening of 200+ applications per week</li>
          <li>Inconsistent candidate quality across hires</li>
          <li>High administrative burden on HR team</li>
        </ul>
        <p className="mb-2 text-slate-800">
          They needed a <span className="font-bold">faster, more reliable hiring process</span> that could scale with their growth.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">The ServiceAgent Implementation</span>
        <p className="mb-2 text-slate-800">
          ServiceAgent was deployed with custom screening for commercial cleaning roles:
        </p>
        <ul className={bullet}>
          <li>Automated video interviews for all applicants</li>
          <li>AI scoring based on cleaning experience and reliability</li>
          <li>Instant scheduling for qualified candidates</li>
          <li>Automated follow-up and reminder system</li>
          <li>Integration with existing HR workflow</li>
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
              <td className={tdClass}>10 days</td>
              <td className={tdClass}>3 days</td>
              <td className={tdClass}>70% faster</td>
            </tr>
            <tr>
              <td className={tdClass}>Interview No-Shows</td>
              <td className={tdClass}>38%</td>
              <td className={tdClass}>0%</td>
              <td className={tdClass}>100% reduction</td>
            </tr>
            <tr>
              <td className={tdClass}>Admin Time per Hire</td>
              <td className={tdClass}>4 hours</td>
              <td className={tdClass}>30 minutes</td>
              <td className={tdClass}>87% reduction</td>
            </tr>
            <tr>
              <td className={tdClass}>Hiring Success Rate</td>
              <td className={tdClass}>65%</td>
              <td className={tdClass}>100%</td>
              <td className={tdClass}>35% improvement</td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">Hiring Funnel Analysis</span>
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
              <td className={tdClass}>156</td>
              <td className={tdClass}>–</td>
            </tr>
            <tr>
              <td className={tdClass}>Completed AI Interviews</td>
              <td className={tdClass}>89</td>
              <td className={tdClass}>57%</td>
            </tr>
            <tr>
              <td className={tdClass}>Qualified Candidates</td>
              <td className={tdClass}>31</td>
              <td className={tdClass}>35%</td>
            </tr>
            <tr>
              <td className={tdClass}>Final Interviews</td>
              <td className={tdClass}>12</td>
              <td className={tdClass}>39%</td>
            </tr>
            <tr>
              <td className={tdClass}>Hires Made</td>
              <td className={tdClass}>9</td>
              <td className={tdClass}>75%</td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">Cost Savings</span>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Category</th>
              <th className={thClass}>Monthly Savings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdClass}>Admin Time (36 hours × $25/hr)</td>
              <td className={tdClass}>$900</td>
            </tr>
            <tr>
              <td className={tdClass}>Reduced No-Shows</td>
              <td className={tdClass}>$450</td>
            </tr>
            <tr>
              <td className={tdClass}>Faster Facility Opening</td>
              <td className={tdClass}>$2,400</td>
            </tr>
            <tr>
              <td className={tdClass}>ServiceAgent Cost</td>
              <td className={tdClass}>-$479</td>
            </tr>
            <tr>
              <td className={tdClass}><strong>Net Monthly Savings</strong></td>
              <td className={tdClass}><strong>$3,271</strong></td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">Operations Manager Feedback</span>
        <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
          "The no-show problem was killing us. We'd schedule 10 interviews and only 6 would show up. With ServiceAgent, every qualified candidate shows up for their final interview. It's like night and day."
          <br />
          <span className="block mt-2 text-right font-semibold">— Michael Chen, Operations Manager</span>
        </blockquote>
        <span className="text-blue-700 font-semibold underline mb-2 block">Key Achievements</span>
        <ul className={bullet}>
          <li>9 roles filled in 14 days</li>
          <li>100% elimination of interview no-shows</li>
          <li>70% reduction in time-to-hire</li>
          <li>87% reduction in administrative time</li>
          <li>New facility opened on schedule</li>
          <li>Scalable hiring process for future growth</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">The Bottom Line</span>
        <p className="mb-2 text-slate-800">
          For commercial cleaning companies, reliable hiring is essential for meeting client commitments and maintaining service quality. ServiceAgent provided this company with a solution that not only accelerated their hiring process but also eliminated the costly problem of interview no-shows.
        </p>
      </div>
    </div>
  );
} 