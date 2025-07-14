import React from "react";

const tableClass =
  "w-full border-collapse my-6 text-sm md:text-base shadow-sm rounded-lg overflow-hidden";
const thClass =
  "bg-blue-50 text-blue-900 font-semibold px-4 py-2 border border-blue-100 text-left";
const tdClass =
  "px-4 py-2 border border-blue-100 text-slate-800";
const bullet = "list-disc ml-6 mb-2 text-slate-700";

export default function PestControl() {
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
        <img src="/Pest.svg" alt="Pest Control" className="w-14 h-14 rounded-full object-cover" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
        How a Regional Pest Control Company Slashed Time-to-Hire by 73% and Reduced Turnover with AI Screening
      </h1>
      <p className="text-lg text-slate-700 mb-4">
        By automating their hiring process with ServiceAgent, this pest control company filled 9 technician roles in under two weeks—while improving quality and reducing burnout across the team.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">Overview</span>
      <p className="mb-2 text-slate-800">
        A regional pest control company with 5 branches needed to hire 8–10 new field technicians ahead of termite season. Historically, recruiting was slow, inconsistent, and left managers overwhelmed with unqualified candidates.
      </p>
      <p className="mb-2 text-slate-800">
        With ServiceAgent, they fully automated top-of-funnel hiring—replacing 30+ hours of manual screening per week with structured AI interviews. In 14 days, they hired 9 techs, reduced time-to-hire by 73%, and made higher-quality hires who stayed longer.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">The Problem</span>
      <p className="mb-2 text-slate-800">
        The old system was breaking under pressure:
      </p>
      <ul className={bullet}>
        <li>400+ applications/month across 5 markets</li>
        <li>No centralized process—each branch handled its own hiring</li>
        <li>Managers wasted time calling no-shows and reviewing generic resumes</li>
        <li>Gut decisions led to mis-hires and early turnover</li>
        <li>Time-to-hire averaged 11 days—costing missed appointments and revenue</li>
      </ul>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">The ServiceAgent Rollout</span>
      <p className="mb-2 text-slate-800">
        They implemented ServiceAgent across all branches in one week, with a rubric built specifically for pest control roles.
      </p>
      <ul className={bullet}>
        <li>Every applicant received an <span className="font-bold">instant AI interview</span> via SMS and email</li>
        <li>The interview scored for:
          <ul className="list-disc ml-8 mt-2">
            <li>Applicator license (if applicable)</li>
            <li>Physical availability for routes</li>
            <li>Clean driving record</li>
            <li>Problem-solving + customer service ability</li>
            <li>DISC alignment for fieldwork</li>
          </ul>
        </li>
        <li>ServiceAgent auto-generated <span className="font-bold">ranked shortlists per branch</span>, reviewed daily</li>
        <li>Hires were made within 24–48 hours of the AI interview</li>
      </ul>
      <span className="text-blue-700 font-semibold underline mb-2 block">14-Day Funnel Breakdown</span>
      <table className={tableClass}>
        <thead>
          <tr>
            <th className={thClass}>Funnel Stage</th>
            <th className={thClass}>Volume</th>
            <th className={thClass}>Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={tdClass}>Applicants (Job boards + site)</td>
            <td className={tdClass}>418</td>
            <td className={tdClass}>–</td>
          </tr>
          <tr>
            <td className={tdClass}>AI Interviews Completed</td>
            <td className={tdClass}>109</td>
            <td className={tdClass}>26.0%</td>
          </tr>
          <tr>
            <td className={tdClass}>Qualified (Score ≥7)</td>
            <td className={tdClass}>36</td>
            <td className={tdClass}>33.0% of completed</td>
          </tr>
          <tr>
            <td className={tdClass}>Final Interviews Scheduled</td>
            <td className={tdClass}>14</td>
            <td className={tdClass}>38.8% of qualified</td>
          </tr>
          <tr>
            <td className={tdClass}>Hires Made</td>
            <td className={tdClass}>9</td>
            <td className={tdClass}>100% of headcount goal</td>
          </tr>
        </tbody>
      </table>
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
            <td className={tdClass}>Avg Time-to-Hire</td>
            <td className={tdClass}>10.8 days</td>
            <td className={tdClass}>2.9 days</td>
            <td className={tdClass}>73% faster</td>
          </tr>
          <tr>
            <td className={tdClass}>Admin Time Spent Screening</td>
            <td className={tdClass}>~33 hrs/week</td>
            <td className={tdClass}>{"<"}6 hrs/week</td>
            <td className={tdClass}>80%+ reduction</td>
          </tr>
          <tr>
            <td className={tdClass}>Interview No-Show Rate</td>
            <td className={tdClass}>42%</td>
            <td className={tdClass}>0%</td>
            <td className={tdClass}>Eliminated</td>
          </tr>
          <tr>
            <td className={tdClass}>Turnover (30-day)</td>
            <td className={tdClass}>38%</td>
            <td className={tdClass}>11%</td>
            <td className={tdClass}>71% improvement</td>
          </tr>
        </tbody>
      </table>
      <span className="text-blue-700 font-semibold underline mb-2 block">Cost vs. Value</span>
      <table className={tableClass}>
        <thead>
          <tr>
            <th className={thClass}>Line Item</th>
            <th className={thClass}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={tdClass}>Plan Used</td>
            <td className={tdClass}>$479/month (Scale)</td>
          </tr>
          <tr>
            <td className={tdClass}>Admin Time Saved (14 Days)</td>
            <td className={tdClass}>~$1,100 (27 hrs × $40/hr)</td>
          </tr>
          <tr>
            <td className={tdClass}>Revenue Preserved (9 Techs)</td>
            <td className={tdClass}>$20,250 (9 × $2,250 avg/month)</td>
          </tr>
          <tr>
            <td className={tdClass}>Early Turnover Reduced</td>
            <td className={tdClass}>3 hires retained longer</td>
          </tr>
          <tr>
            <td className={tdClass}>Total Value Created</td>
            <td className={tdClass}>~$21,350+</td>
          </tr>
          <tr>
            <td className={tdClass}>ROI on Spend</td>
            <td className={tdClass}>~44x return</td>
          </tr>
        </tbody>
      </table>
      <span className="text-blue-700 font-semibold underline mb-2 block">Operator Feedback</span>
      <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
        “We always got tons of applicants—but 80% were the wrong fit. Now we only see the top 20% and make decisions in a day or two. We’re fully staffed and moving fast.”
        <br />
        <span className="block mt-2 text-right font-semibold">— Tracy M., Area Manager – Southeast Division</span>
      </blockquote>
      <span className="text-blue-700 font-semibold underline mb-2 block">Key Wins</span>
      <ul className={bullet}>
        <li>9 hires made in 14 days across 5 branches</li>
        <li>Turnover within 30 days dropped 71%</li>
        <li>AI scored applicants for license status, attitude, and fit</li>
        <li>Saved over 27 recruiter hours in two weeks</li>
        <li>Branch managers only reviewed top-ranked candidates</li>
        <li>Improved time-to-hire and start date reliability during busy season</li>
      </ul>
      <span className="text-blue-700 font-semibold underline mb-2 block">The Bottom Line</span>
      <p className="mb-2 text-slate-800">
        For pest control businesses, <span className="font-bold">speed + precision</span> in hiring means fewer missed routes, happier customers, and lower churn. ServiceAgent gave this firm a plug-and-play system to scale without sacrificing quality.
      </p>
    </div>
  );
} 