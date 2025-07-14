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
    <div className="relative max-w-3xl mx-auto px-4 py-10 pt-24 bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Blue background gradient and accent shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-16 -left-24 w-80 h-80 bg-gradient-radial from-[#0E7CFF]/20 to-transparent rounded-full blur-2xl opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-radial from-[#A1E3FF]/30 to-transparent rounded-full blur-2xl opacity-40"></div>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] rounded-t-2xl opacity-80"></div>
      </div>
      <div className="flex items-center gap-2 mb-6">
        <img src="/Banner_SA_new.svg" alt="ServiceAgent Logo" className="h-12 w-auto" />
        <img src="/CleaningService.svg" alt="Residential Cleaning" className="w-14 h-14 rounded-full object-cover" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
        How This 6-Location Cleaning Franchise Filled Every Open Role in 30 Days
      </h1>
      <p className="text-lg text-slate-700 mb-4">
        Automating interviews, qualification, and follow-up saved over 50 hours a month and kept every branch fully staffed—all for under $750.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">Overview</span>
      <p className="mb-2 text-slate-800">
        A multi-location residential cleaning franchise—operating across Colorado, Georgia, and Florida—was hiring 12 to 18 cleaners per month across six branches. Despite a consistent flow of applicants from Indeed, their hiring process was slowing down growth and costing revenue.
      </p>
      <p className="mb-2 text-slate-800">
        <span className="font-bold">They replaced it with ServiceAgent.</span> In 30 days, they fully staffed all six locations, cut their time-to-hire by more than 70%, and eliminated over 50 hours of recruiting work per month.
      </p>
      <span className="text-blue-700 font-semibold underline mb-2 block">The Problem</span>
      <hr className="my-6 border-blue-200" />
      <p className="mb-2 text-slate-800">
        Before ServiceAgent, each location manager played the role of recruiter on top of their day job. The process was chaotic:
      </p>
      <ul className={bullet}>
        <li>700+ applications/month had to be reviewed manually</li>
        <li>Interview invites went out late—or not at all</li>
        <li>Follow-ups were inconsistent, and no-shows were common</li>
        <li>Time-to-hire averaged <span className="font-bold">8.3 days</span>, delaying job fulfillment and revenue</li>
        <li>No scoring system existed—decisions were gut-based and inconsistent across locations</li>
      </ul>
      <p className="mb-2 text-slate-800">
        <span className="font-bold">The result:</span> missed hires, missed jobs, and tens of thousands in lost revenue.
      </p>
      <span className="text-blue-700 font-semibold underline mb-2 block">The Solution: End-to-End Hiring Automation</span>
     
      <p className="mb-2 text-slate-800">
        The franchise rolled out <span className="font-bold">ServiceAgent across all six locations</span>, fully integrated with their ATS (Workable). The system automated the entire top of funnel:
      </p>
      <ul className={bullet}>
        <li>Instant AI interviews (chat & video) sent via SMS + email within 5 minutes of application</li>
        <li>Candidates scored in real time using a weighted rubric (experience, reliability, communication, DISC)</li>
        <li>Qualified candidates (score ≥7) routed directly to the ATS for review</li>
        <li>All interview activity logged and centralized for manager visibility</li>
      </ul>
      <span className="text-blue-700 font-semibold underline mb-2 block">30-Day Hiring Funnel</span>
      
      <table className={tableClass}>
        <thead>
          <tr>
            <th className={thClass}>Stage</th>
            <th className={thClass}>Volume</th>
            <th className={thClass}>Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={tdClass}>Applicants (from Indeed)</td>
            <td className={tdClass}>765</td>
            <td className={tdClass}>–</td>
          </tr>
          <tr>
            <td className={tdClass}>Interviews Completed</td>
            <td className={tdClass}>171</td>
            <td className={tdClass}>22.4%</td>
          </tr>
          <tr>
            <td className={tdClass}>Qualified Candidates (Score ≥7)</td>
            <td className={tdClass}>61</td>
            <td className={tdClass}>35.6% of completed</td>
          </tr>
          <tr>
            <td className={tdClass}>Hires Made</td>
            <td className={tdClass}>16</td>
            <td className={tdClass}>100% of goal (12–18/month)</td>
          </tr>
        </tbody>
      </table>
      <p className="mb-2 text-slate-800">
        They hit their hiring targets <span className="font-bold">in full</span>, with every branch staffed by day 30.
      </p>
      <span className="text-blue-700 font-semibold underline mb-2 block">Time & Cost Impact</span>
     
      <table className={tableClass}>
        <thead>
          <tr>
            <th className={thClass}>Metric</th>
            <th className={thClass}>Before ServiceAgent</th>
            <th className={thClass}>After ServiceAgent</th>
            <th className={thClass}>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={tdClass}>Time-to-Hire</td>
            <td className={tdClass}>8.3 days</td>
            <td className={tdClass}>2.5 days</td>
            <td className={tdClass}>–70%</td>
          </tr>
          <tr>
            <td className={tdClass}>Admin Time per Month</td>
            <td className={tdClass}>~60 hours</td>
            <td className={tdClass}>{"<6 hours"}</td>
            <td className={tdClass}>54+ hours saved</td>
          </tr>
          <tr>
            <td className={tdClass}>Interview No-Show Rate</td>
            <td className={tdClass}>~50%</td>
            <td className={tdClass}>0% (Thanks AI)</td>
            <td className={tdClass}>Eliminated</td>
          </tr>
          <tr>
            <td className={tdClass}>Revenue Lost from Vacancies</td>
            <td className={tdClass}>$12K–$15K/month</td>
            <td className={tdClass}>Near-zero</td>
            <td className={tdClass}>Fully recovered</td>
          </tr>
        </tbody>
      </table>
      <span className="text-blue-700 font-semibold underline mb-2 block">Cost vs. Value</span>
     
      <table className={tableClass}>
        <thead>
          <tr>
            <th className={thClass}>Line Item</th>
            <th className={thClass}>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={tdClass + " font-bold"}>ServiceAgent Custom Plan</td>
            <td className={tdClass}>$700/month (200 interviews @ $3.50)</td>
          </tr>
          <tr>
            <td className={tdClass}>Labor Savings</td>
            <td className={tdClass}>$1,890/month (54 hrs × $35/hr)</td>
          </tr>
          <tr>
            <td className={tdClass}>Revenue Preserved (from new hires)</td>
            <td className={tdClass}>$28,800/month (16 hires × $1,800/month)</td>
          </tr>
          <tr>
            <td className={tdClass + " font-bold"}>Total Value Created</td>
            <td className={tdClass}>$30,690</td>
          </tr>
          <tr>
            <td className={tdClass + " font-bold"}>ROI on Spend</td>
            <td className={tdClass}>Over 43x</td>
          </tr>
        </tbody>
      </table>
      <span className="text-blue-700 font-semibold underline mb-2 block">Operator Feedback</span>
      
      <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
        “We didn’t need more recruiters. We needed speed, consistency, and scale. With ServiceAgent, our team spends less than 2 hours a week reviewing applicants—and we’re fully staffed.”
        <br />
        <span className="block mt-2 text-right font-semibold">— Cherie, Franchise Director</span>
      </blockquote>
      <span className="text-blue-700 font-semibold underline mb-2 block">The Bottom Line</span>
      
      <p className="mb-2 text-slate-800">
        ServiceAgent didn’t just improve their hiring process—it reshaped it. In 30 days, the franchise gained a system that:
      </p>
      <ul className={bullet}>
        <li>Delivered pre-qualified, ranked candidates in hours—not days</li>
        <li>Standardized hiring across all locations</li>
        <li>Freed up over 50 hours/month of manager time</li>
        <li>Protected over $28,000/month in location-level revenue</li>
      </ul>
      <p className="mt-4 text-slate-900 font-semibold">
        All for <span className="font-bold text-blue-700">less than what they paid one part-time recruiter.</span>
      </p>
    </div>
  );
} 