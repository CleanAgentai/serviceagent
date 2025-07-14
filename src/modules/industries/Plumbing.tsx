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
    <div className="relative max-w-3xl mx-auto px-4 py-10 pt-24 bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Blue background gradient and accent shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-16 -left-24 w-80 h-80 bg-gradient-radial from-[#0E7CFF]/20 to-transparent rounded-full blur-2xl opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-radial from-[#A1E3FF]/30 to-transparent rounded-full blur-2xl opacity-40"></div>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] rounded-t-2xl opacity-80"></div>
      </div>
      <div className="flex items-center gap-2 mb-6">
        <img src="/Banner_SA_new.svg" alt="ServiceAgent Logo" className="h-12 w-auto" />
        <img src="/Plumber.svg" alt="Plumbing" className="w-14 h-14 rounded-full object-cover" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
        How a Regional Plumbing Company Cut Hiring Time by 73% and Hired 5 Technicians in Just 2 Weeks
      </h1>
      <p className="text-lg text-slate-700 mb-4">
        By automating resume screening, interviews, and scoring, this plumbing company filled every open role in 14 days, eliminated no-shows, and turned chaotic hiring into a system.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">Overview</span>
      <p className="mb-2 text-slate-800">
        A fast-growing plumbing company with three regional branches was struggling to meet customer demand due to unfilled technician roles. Their team had just signed contracts with new builders and property managers—but lacked the skilled labor to fulfill work orders without overtime or delays.
      </p>
      <p className="mb-2 text-slate-800">
        Hiring was a bottleneck. Despite strong applicant volume, the operations team was stuck in a loop of resume filtering, phone tag, and ghosted interviews.
      </p>
      <p className="mb-2 text-slate-800">
        Within 14 days of launching ServiceAgent, they hired 5 new field techs and recovered over $18,000 in lost revenue potential.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">The Problem</span>
      <p className="mb-2 text-slate-800">
        Their hiring process was reactive and overwhelmed:
      </p>
      <ul className={bullet}>
        <li>400+ resumes came in across job boards (Indeed, ZipRecruiter, referrals)</li>
        <li>3-person ops team handling recruiting manually</li>
        <li>No way to quickly vet certifications, experience, or soft skills</li>
        <li>Interview coordination took days—and half the candidates never showed</li>
        <li>Revenue was lost weekly due to job delays and unstaffed trucks</li>
      </ul>
      <p className="mb-2 text-slate-800">
        They didn’t need more job board spend—they needed <span className="font-bold">qualified talent, fast</span>.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">The ServiceAgent Rollout</span>
      <p className="mb-2 text-slate-800">
        Within 48 hours, the company deployed ServiceAgent across all three locations. Every applicant:
      </p>
      <ul className={bullet}>
        <li>Was invited to a <span className="font-bold">real-time video + chat interview</span> via SMS/email</li>
        <li>Was scored using a tailored rubric for plumbing roles, including:
          <ul className="list-disc ml-8 mt-2">
            <li>License status (Journeyman/Master/Apprentice)</li>
            <li>Commercial vs. residential experience</li>
            <li>Availability (nights/weekends)</li>
            <li>Reliability & soft skills</li>
          </ul>
        </li>
        <li>Interviews were <span className="font-bold">fully automated</span>, with results delivered in a ranked shortlist daily</li>
        <li>Final review + hiring decisions were made by the ops lead</li>
      </ul>
      <span className="text-blue-700 font-semibold underline mb-2 block">14-Day Hiring Funnel</span>
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
            <td className={tdClass}>Total Applicants</td>
            <td className={tdClass}>414</td>
            <td className={tdClass}>–</td>
          </tr>
          <tr>
            <td className={tdClass}>Completed Interviews</td>
            <td className={tdClass}>102</td>
            <td className={tdClass}>24.6%</td>
          </tr>
          <tr>
            <td className={tdClass}>Qualified (Score ≥ 7)</td>
            <td className={tdClass}>38</td>
            <td className={tdClass}>37.2% of interviewed</td>
          </tr>
          <tr>
            <td className={tdClass}>Final Interviews Conducted</td>
            <td className={tdClass}>12</td>
            <td className={tdClass}>31.6% of qualified</td>
          </tr>
          <tr>
            <td className={tdClass}>Offers Accepted</td>
            <td className={tdClass}>5</td>
            <td className={tdClass}>100% of hiring goal</td>
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
            <td className={tdClass}>Time-to-Hire</td>
            <td className={tdClass}>7.5 days</td>
            <td className={tdClass}>2.0 days</td>
            <td className={tdClass}>73% faster</td>
          </tr>
          <tr>
            <td className={tdClass}>Admin Screening Time</td>
            <td className={tdClass}>40+ hours/month</td>
            <td className={tdClass}>{"<"}6 hours/month</td>
            <td className={tdClass}>34+ hrs saved</td>
          </tr>
          <tr>
            <td className={tdClass}>Interview No-Show Rate</td>
            <td className={tdClass}>42%</td>
            <td className={tdClass}>0%</td>
            <td className={tdClass}>Eliminated</td>
          </tr>
          <tr>
            <td className={tdClass}>Revenue Lost from Delays</td>
            <td className={tdClass}>~$18K/month</td>
            <td className={tdClass}>~$0</td>
            <td className={tdClass}>Fully recovered</td>
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
            <td className={tdClass}>Admin Time Saved</td>
            <td className={tdClass}>$1,190 (34 hrs × $35/hr)</td>
          </tr>
          <tr>
            <td className={tdClass}>Revenue Recovered</td>
            <td className={tdClass}>~$18,000</td>
          </tr>
          <tr>
            <td className={tdClass}>Total Value Created</td>
            <td className={tdClass}>~$19,190</td>
          </tr>
          <tr>
            <td className={tdClass}>ROI on Spend</td>
            <td className={tdClass}>~40x return on $479</td>
          </tr>
        </tbody>
      </table>
      <span className="text-blue-700 font-semibold underline mb-2 block">Operator Feedback</span>
      <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
        “We’re plumbers, not recruiters. Before ServiceAgent, it took us 3 hours just to figure out who to call. Now we log in, see scores, watch the interviews, and hire the best ones. The whole process takes less than 30 minutes a day.”
        <br />
        <span className="block mt-2 text-right font-semibold">— Devon James, Branch Manager</span>
      </blockquote>
      <span className="text-blue-700 font-semibold underline mb-2 block">Key Wins</span>
      <ul className={bullet}>
        <li>5 techs hired in 2 weeks during peak workload</li>
        <li>34+ hours/month of admin saved</li>
        <li>100% of applicants interviewed in under 5 minutes</li>
        <li>No more ghosted interviews</li>
        <li>Revenue delays eliminated</li>
        <li>Hiring now takes <span className="font-bold">1/10th the time</span> with higher quality results</li>
      </ul>
      <span className="text-blue-700 font-semibold underline mb-2 block">The Bottom Line</span>
      <p className="mb-2 text-slate-800">
        For plumbing businesses operating under tight timelines and revenue pressure, speed, precision, and consistency in hiring makes all the difference. ServiceAgent delivered all three—turning a hiring headache into a competitive advantage.
      </p>
    </div>
  );
} 