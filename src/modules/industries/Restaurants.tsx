import React from "react";

const tableClass =
  "w-full border-collapse my-6 text-sm md:text-base shadow-sm rounded-lg overflow-hidden";
const thClass =
  "bg-blue-50 text-blue-900 font-semibold px-4 py-2 border border-blue-100 text-left";
const tdClass =
  "px-4 py-2 border border-blue-100 text-slate-800";
const bullet = "list-disc ml-6 mb-2 text-slate-700";

export default function Restaurants() {
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
        <img src="/Resturant.svg" alt="Restaurants" className="w-14 h-14 rounded-full object-cover" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
        How a 14-Location QSR Franchise Cut Time-to-Hire by 80% and Filled 48 Roles in 30 Days Using AI Interviews
      </h1>
      <p className="text-lg text-slate-700 mb-4">
        By replacing resumes and manual screening with instant AI interviews, this restaurant group eliminated ghosting, hired faster, and gave managers back 120+ hours per month—without increasing recruiting headcount.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">Overview</span>
      <p className="mb-2 text-slate-800">
        A quick-service restaurant (QSR) operator managing 14 locations across Florida and Georgia was struggling to keep up with constant turnover. The regional manager needed to fill front-line roles (cashiers, line cooks, shift leads) fast—but managers were already overloaded.
      </p>
      <p className="mb-2 text-slate-800">
        They implemented ServiceAgent to fully automate the top of their hiring funnel. In 30 days, they filled all 48 open roles, cut average time-to-hire from 7 days to under 36 hours, and removed the need for manual resume screening or phone tag entirely.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">The Problem</span>
      <p className="mb-2 text-slate-800">
        Hiring was slow, reactive, and draining hours from already-busy store managers:
      </p>
      <ul className={bullet}>
        <li>400+ job applications/month came in across Indeed and referrals</li>
        <li>Store managers had to read resumes and make phone calls between shifts</li>
        <li>Interview no-shows were rampant (40–50%)</li>
        <li>Applicants often stopped responding after 1–2 days of delay</li>
        <li>No centralized view of candidates—each manager used a different method</li>
        <li>Recruiting was a bottleneck to store-level performance and revenue</li>
      </ul>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">The ServiceAgent Rollout</span>
      <p className="mb-2 text-slate-800">
        The franchise deployed ServiceAgent centrally, and candidates across all 14 locations now:
      </p>
      <ul className={bullet}>
        <li>Receive a <span className="font-bold">chat or video interview via SMS/email</span> within 5 minutes of applying</li>
        <li>Are scored using a simple rubric:
          <ul className="list-disc ml-8 mt-2">
            <li>Communication and attitude</li>
            <li>Schedule flexibility</li>
            <li>Prior food service experience</li>
            <li>Reliability traits via DISC</li>
          </ul>
        </li>
        <li>Candidates scoring ≥7 are ranked and shared with the right manager</li>
        <li>Managers only spend 5–10 minutes reviewing the shortlist and scheduling next steps</li>
        <li>Interview recordings and transcripts are saved for review or compliance</li>
      </ul>
      <span className="text-blue-700 font-semibold underline mb-2 block">30-Day Hiring Funnel</span>
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
            <td className={tdClass}>Applicants (Indeed + Referrals)</td>
            <td className={tdClass}>1,263</td>
            <td className={tdClass}>–</td>
          </tr>
          <tr>
            <td className={tdClass}>AI Interviews Completed</td>
            <td className={tdClass}>376</td>
            <td className={tdClass}>29.8%</td>
          </tr>
          <tr>
            <td className={tdClass}>Qualified Candidates (Score ≥7)</td>
            <td className={tdClass}>128</td>
            <td className={tdClass}>34% of completed</td>
          </tr>
          <tr>
            <td className={tdClass}>Final Interviews Scheduled</td>
            <td className={tdClass}>96</td>
            <td className={tdClass}>75% of qualified</td>
          </tr>
          <tr>
            <td className={tdClass}>Hires Made</td>
            <td className={tdClass}>48</td>
            <td className={tdClass}>100% of goal</td>
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
            <td className={tdClass}>7.1 days</td>
            <td className={tdClass}>1.4 days</td>
            <td className={tdClass}>–80%</td>
          </tr>
          <tr>
            <td className={tdClass}>No-Show Rate (Initial Call)</td>
            <td className={tdClass}>~46%</td>
            <td className={tdClass}>0%</td>
            <td className={tdClass}>Eliminated</td>
          </tr>
          <tr>
            <td className={tdClass}>Manager Admin Time/Month</td>
            <td className={tdClass}>~10 hrs/location</td>
            <td className={tdClass}>~1 hr/location</td>
            <td className={tdClass}>120+ hours saved total</td>
          </tr>
          <tr>
            <td className={tdClass}>Hiring Workflow</td>
            <td className={tdClass}>7 manual steps</td>
            <td className={tdClass}>2 streamlined steps</td>
            <td className={tdClass}>Simplified</td>
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
            <td className={tdClass}>$1,350/month (400 AI interviews)</td>
          </tr>
          <tr>
            <td className={tdClass}>Manager Time Saved</td>
            <td className={tdClass}>120 hrs × $25/hr = $3,000</td>
          </tr>
          <tr>
            <td className={tdClass}>Revenue Preserved from New Hires</td>
            <td className={tdClass}>48 × $1,500/month = $72,000</td>
          </tr>
          <tr>
            <td className={tdClass}>Total Value Created</td>
            <td className={tdClass}>$75,000+</td>
          </tr>
          <tr>
            <td className={tdClass}>ROI on Spend</td>
            <td className={tdClass}>Over 55x</td>
          </tr>
        </tbody>
      </table>
      <span className="text-blue-700 font-semibold underline mb-2 block">Operator Feedback</span>
      <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
        “Before ServiceAgent, our GMs were drowning in hiring tasks. Now they just log in, review top candidates, and hire. No ghosting. No phone tag. Just qualified people showing up and working.”
        <br />
        <span className="block mt-2 text-right font-semibold">— James T., Regional Manager, BajaWrap QSR Group</span>
      </blockquote>
      <span className="text-blue-700 font-semibold underline mb-2 block">Key Wins</span>
      <ul className={bullet}>
        <li>48 roles filled in 30 days with no outside recruiter help</li>
        <li>120+ hours/month saved across location managers</li>
        <li>100% of applicants interviewed within 5 minutes</li>
        <li>Time-to-hire cut by 80%</li>
        <li>Replaced the need for resume review, scheduling, and ghosted interviews</li>
      </ul>
      <span className="text-blue-700 font-semibold underline mb-2 block">The Bottom Line</span>
      <p className="mb-2 text-slate-800">
        For fast-moving industries like restaurants, every day a role is unfilled hurts service, revenue, and morale. With ServiceAgent, this QSR franchise turned hiring from a headache into a competitive advantage—giving managers leverage and keeping every shift staffed.
      </p>
    </div>
  );
} 