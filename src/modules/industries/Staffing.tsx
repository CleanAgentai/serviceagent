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
    <div className="relative max-w-3xl mx-auto px-4 py-10 pt-24 bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Blue background gradient and accent shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-16 -left-24 w-80 h-80 bg-gradient-radial from-[#0E7CFF]/20 to-transparent rounded-full blur-2xl opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-radial from-[#A1E3FF]/30 to-transparent rounded-full blur-2xl opacity-40"></div>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] rounded-t-2xl opacity-80"></div>
      </div>
      <div className="flex items-center gap-2 mb-6">
        <img src="/Banner_SA_new.svg" alt="ServiceAgent Logo" className="h-12 w-auto" />
        <img src="/WareHouse.svg" alt="Staffing" className="w-14 h-14 rounded-full object-cover" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
        How a 15-Person Staffing Team Used ServiceAgent to Increase Fill Rates and Save 280+ Hours a Month
      </h1>
      <span className="text-blue-700 font-semibold underline mb-2 block">Overview</span>
      <p className="mb-2 text-slate-800">
        A regional light industrial staffing firm with 15 recruiters was struggling to keep up with high applicant volume for entry-level warehouse and logistics roles. Applications were strong, but their internal team couldn’t screen fast enough—causing drop-off, missed placements, and recruiter burnout.
      </p>
      <p className="mb-2 text-slate-800">
        In just 30 days, ServiceAgent automated over 570 candidate interviews, delivered pre-qualified candidates in under 24 hours, and helped the firm <span className="font-bold">increase fill rates while saving over 280 recruiter hours per month</span>.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">The Problem</span>
      <p className="mb-2 text-slate-800">
        The firm’s recruiting model was heavily manual:
      </p>
      <ul className={bullet}>
        <li>Recruiters were reviewing and calling hundreds of applicants weekly</li>
        <li>Candidates often went cold before anyone reached out</li>
        <li>No-shows and unqualified interviews burned hours of recruiter time</li>
        <li>Internal screening processes varied by recruiter and location</li>
        <li>Time-to-submit to clients was averaging <span className="font-bold">3–4 days</span></li>
      </ul>
      <p className="mb-2 text-slate-800">
        They weren’t short on candidates—they were short on time.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">The ServiceAgent Rollout</span>
      <p className="mb-2 text-slate-800">
        The firm integrated ServiceAgent into their ATS stack (Bullhorn). Each applicant was automatically:
      </p>
      <ul className={bullet}>
        <li>Invited to complete a <span className="font-bold">chat or video interview</span> within 5 minutes of applying</li>
        <li>Scored using a role-specific rubric (availability, work history, forklift experience, professionalism, etc.)</li>
        <li>Synced back into Bullhorn with transcripts, a score, and status</li>
        <li>Marked as “qualified” if scoring <span className="font-bold">7 or higher</span>, ready for recruiter handoff or direct client submission</li>
      </ul>
      <span className="text-blue-700 font-semibold underline mb-2 block">30-Day Performance Snapshot</span>
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
            <td className={tdClass}>Applicants (Indeed, Zip, Referrals)</td>
            <td className={tdClass}>2,410</td>
            <td className={tdClass}>–</td>
          </tr>
          <tr>
            <td className={tdClass}>Completed Interviews</td>
            <td className={tdClass}>573</td>
            <td className={tdClass}>23.8%</td>
          </tr>
          <tr>
            <td className={tdClass}>Qualified (Score ≥7)</td>
            <td className={tdClass}>201</td>
            <td className={tdClass}>35.1% of completed</td>
          </tr>
          <tr>
            <td className={tdClass}>Candidates Submitted to Clients</td>
            <td className={tdClass}>148</td>
            <td className={tdClass}>73.6% of qualified</td>
          </tr>
          <tr>
            <td className={tdClass}>Hires Made</td>
            <td className={tdClass}>81</td>
            <td className={tdClass}>54.7% of submitted</td>
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
            <td className={tdClass}>Screening Time per Recruiter</td>
            <td className={tdClass}>~30 hours/month</td>
            <td className={tdClass}>~11 hours/month</td>
            <td className={tdClass}>~19 hours saved/pp</td>
          </tr>
          <tr>
            <td className={tdClass}>Team Time Spent Screening</td>
            <td className={tdClass}>450 hours/month (15 ppl)</td>
            <td className={tdClass}>~165 hours</td>
            <td className={tdClass}><span className="font-bold">285 hours saved</span></td>
          </tr>
          <tr>
            <td className={tdClass}>Avg Time-to-Submit</td>
            <td className={tdClass}>3.3 days</td>
            <td className={tdClass}>0.8 days</td>
            <td className={tdClass}>76% faster</td>
          </tr>
          <tr>
            <td className={tdClass}>Interview No-Show Rate</td>
            <td className={tdClass}>47%</td>
            <td className={tdClass}>0% (Thanks AI)</td>
            <td className={tdClass}>Eliminated</td>
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
            <td className={tdClass}>Completed Interviews</td>
            <td className={tdClass}>$600 interviews = $2,100</td>
          </tr>
          <tr>
            <td className={tdClass}>Recruiter Time Saved</td>
            <td className={tdClass}>285 hours × $40/hr = <span className="font-bold">$11,400</span></td>
          </tr>
          <tr>
            <td className={tdClass}>Revenue from 81 Hires</td>
            <td className={tdClass}>81 × $1,000 average margin = <span className="font-bold">$81,000</span></td>
          </tr>
          <tr>
            <td className={tdClass}>Total Value Created</td>
            <td className={tdClass}>$90,700+</td>
          </tr>
          <tr>
            <td className={tdClass}>ROI on Spend</td>
            <td className={tdClass}>~43x return on $2,100 spend</td>
          </tr>
        </tbody>
      </table>
      <span className="text-blue-700 font-semibold underline mb-2 block">Operator Feedback</span>
      <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
        “ServiceAgent doesn’t replace our team—it just gives each recruiter 2x more leverage. We’re no longer bogged down by repetitive screening. We’re focused on what matters: placing people and keeping clients happy.”
        <br />
        <span className="block mt-2 text-right font-semibold">— Cherie, Director of Operations</span>
      </blockquote>
      <span className="text-blue-700 font-semibold underline mb-2 block">Key Wins</span>
      <ul className={bullet}>
        <li>100% of initial interviews fully automated</li>
        <li>Over 280 recruiter hours reallocated to client service</li>
        <li>Fill rate increased from 49% to 55% on submittals</li>
        <li>Time-to-submit cut from 3+ days to under 24 hours</li>
        <li>All for less than the cost of one lost placement</li>
      </ul>
    </div>
  );
} 