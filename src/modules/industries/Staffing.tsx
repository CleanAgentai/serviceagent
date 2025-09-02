import React from "react";

const tableClass =
  "w-full border-collapse my-6 text-sm md:text-base shadow-sm rounded-lg overflow-hidden";
const thClass =
  "bg-blue-50 text-blue-900 font-semibold px-4 py-2 border border-blue-100 text-left";
const tdClass =
  "px-4 py-2 border border-blue-100 text-slate-800";
const bullet = "list-disc ml-6 mb-2 text-slate-700";

export default function Staffing() {
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
          How a 15-Person Staffing Team Used ServiceAgent to Increase Fill Rates and Save 280+ Hours a Month
        </h1>
        <p className="text-lg text-slate-700 mb-6">
          By automating their hiring process with ServiceAgent, this staffing team increased fill rates, reduced admin time, and improved candidate quality across the board.
        </p>
      </div>

      {/* Article content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">Overview</span>
        <p className="mb-2 text-slate-800">
          A regional light industrial staffing firm with 15 recruiters was struggling to keep up with high applicant volume for entry-level warehouse and logistics roles. Applications were strong, but their internal team couldn't screen fast enough—causing drop-off, missed placements, and recruiter burnout.
        </p>
        <p className="mb-2 text-slate-800">
          After implementing ServiceAgent, they increased fill rates by 40%, saved over 280 hours of admin time monthly, and improved candidate quality significantly.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">The Problem</span>
        <p className="mb-2 text-slate-800">
          The staffing company faced several critical challenges:
        </p>
        <ul className={bullet}>
          <li>High volume of applications overwhelming recruiters</li>
          <li>Manual screening taking 25+ hours per recruiter per week</li>
          <li>Slow response times leading to candidate drop-off</li>
          <li>Inconsistent candidate quality across placements</li>
          <li>Recruiter burnout from repetitive screening tasks</li>
        </ul>
        <p className="mb-2 text-slate-800">
          They needed a <span className="font-bold">faster, more efficient way</span> to screen and qualify candidates.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">The ServiceAgent Solution</span>
        <p className="mb-2 text-slate-800">
          ServiceAgent was implemented to automate the initial screening process:
        </p>
        <ul className={bullet}>
          <li>Automated video interviews for all applicants</li>
          <li>AI scoring based on job requirements and experience</li>
          <li>Instant qualification assessment</li>
          <li>Automated scheduling for qualified candidates</li>
          <li>Integration with existing ATS and CRM systems</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">Monthly Results</span>
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
              <td className={tdClass}>Fill Rate</td>
              <td className={tdClass}>65%</td>
              <td className={tdClass}>91%</td>
              <td className={tdClass}>40% improvement</td>
            </tr>
            <tr>
              <td className={tdClass}>Admin Time per Recruiter</td>
              <td className={tdClass}>25 hours/week</td>
              <td className={tdClass}>7 hours/week</td>
              <td className={tdClass}>72% reduction</td>
            </tr>
            <tr>
              <td className={tdClass}>Time-to-Place</td>
              <td className={tdClass}>8 days</td>
              <td className={tdClass}>3 days</td>
              <td className={tdClass}>63% faster</td>
            </tr>
            <tr>
              <td className={tdClass}>Candidate Quality Score</td>
              <td className={tdClass}>7.2/10</td>
              <td className={tdClass}>8.8/10</td>
              <td className={tdClass}>22% improvement</td>
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
              <td className={tdClass}>1,247</td>
              <td className={tdClass}>–</td>
            </tr>
            <tr>
              <td className={tdClass}>Completed AI Interviews</td>
              <td className={tdClass}>623</td>
              <td className={tdClass}>50%</td>
            </tr>
            <tr>
              <td className={tdClass}>Qualified Candidates</td>
              <td className={tdClass}>187</td>
              <td className={tdClass}>30%</td>
            </tr>
            <tr>
              <td className={tdClass}>Placements Made</td>
              <td className={tdClass}>156</td>
              <td className={tdClass}>83%</td>
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
              <td className={tdClass}>Admin Time (280 hours × $30/hr)</td>
              <td className={tdClass}>$8,400</td>
            </tr>
            <tr>
              <td className={tdClass}>Increased Placement Revenue</td>
              <td className={tdClass}>$12,600</td>
            </tr>
            <tr>
              <td className={tdClass}>Reduced Recruiter Turnover</td>
              <td className={tdClass}>$3,200</td>
            </tr>
            <tr>
              <td className={tdClass}>ServiceAgent Cost</td>
              <td className={tdClass}>-$479</td>
            </tr>
            <tr>
              <td className={tdClass}><strong>Net Monthly Savings</strong></td>
              <td className={tdClass}><strong>$23,721</strong></td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">Recruiting Manager Feedback</span>
        <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
          "Our recruiters were drowning in applications and spending hours on phone screens. ServiceAgent eliminated all of that. Now they focus on building relationships with pre-qualified candidates. Our fill rates have never been higher."
          <br />
          <span className="block mt-2 text-right font-semibold">— Sarah Williams, Recruiting Manager</span>
        </blockquote>
        <span className="text-blue-700 font-semibold underline mb-2 block">Key Achievements</span>
        <ul className={bullet}>
          <li>40% improvement in fill rates</li>
          <li>280+ hours of admin time saved monthly</li>
          <li>63% reduction in time-to-place</li>
          <li>22% improvement in candidate quality</li>
          <li>72% reduction in recruiter admin time</li>
          <li>Scalable process for future growth</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">The Bottom Line</span>
        <p className="mb-2 text-slate-800">
          For staffing companies, efficient candidate screening is crucial for maintaining high fill rates and recruiter productivity. ServiceAgent provided this company with an automated solution that dramatically improved their operational efficiency while enhancing candidate quality.
        </p>
      </div>
    </div>
  );
} 