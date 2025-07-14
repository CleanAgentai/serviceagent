import React from "react";

const tableClass =
  "w-full border-collapse my-6 text-sm md:text-base shadow-sm rounded-lg overflow-hidden";
const thClass =
  "bg-blue-50 text-blue-900 font-semibold px-4 py-2 border border-blue-100 text-left";
const tdClass =
  "px-4 py-2 border border-blue-100 text-slate-800";
const bullet = "list-disc ml-6 mb-2 text-slate-700";

export default function HVAC() {
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
        <img src="/HVAC.svg" alt="HVAC" className="w-14 h-14 rounded-full object-cover" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
        How a Fast-Growing HVAC Business Hired 7 Techs in 21 Days Without a Single Resume Review
      </h1>
      <p className="text-lg text-slate-700 mb-4">
        Using ServiceAgent to automate applicant screening, this HVAC company filled 7 technician roles in under 3 weeks, reduced time-to-hire by 68%, and freed up over 45 hours of admin time—all during peak season.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">Overview</span>
      <p className="mb-2 text-slate-800">
        A multi-location HVAC company serving residential and commercial customers across the Southeast hit a major growth milestone: three new service contracts and a surge in seasonal calls.
      </p>
      <p className="mb-2 text-slate-800">
        They needed to hire 6–8 field technicians fast—but were burned out from previous recruiting cycles filled with resume spam, no-shows, and inconsistent hiring standards.
      </p>
      <p className="mb-2 text-slate-800">
        With ServiceAgent, they fully staffed their team in 21 days and built a repeatable system that continues to fill roles automatically.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">The Problem</span>
      <p className="mb-2 text-slate-800">
        The owner and operations manager were responsible for hiring—but their system was breaking:
      </p>
      <ul className={bullet}>
        <li>500+ resumes came in over 2 weeks</li>
        <li>No central scoring system, just gut feel</li>
        <li>Calls and interviews took 40+ hours/week</li>
        <li>Unqualified candidates slipped through constantly</li>
      </ul>
      <p className="mb-2 text-slate-800">
        Time-to-hire averaged <span className="font-bold">9.4 days</span>, costing $1,200–$2,000 per lost day
      </p>
      <p className="mb-2 text-slate-800">
        They didn’t need more applicants—they needed a way to qualify and hire faster.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">The ServiceAgent Rollout</span>
      <p className="mb-2 text-slate-800">
        The company integrated ServiceAgent into their job funnel within 24 hours. All applicants:
      </p>
      <ul className={bullet}>
        <li>Received an <span className="font-bold">automated video + chat interview</span> within 5 minutes of applying</li>
        <li>Were <span className="font-bold">scored using a rubric</span> focused on:
          <ul className="list-disc ml-8 mt-2">
            <li>EPA/Universal certification</li>
            <li>On-call availability</li>
            <li>Reliability and professionalism</li>
            <li>Communication and customer handling</li>
          </ul>
        </li>
        <li>Results + video links were auto-synced into their CRM</li>
        <li>Ops manager received a <span className="font-bold">ranked shortlist daily</span></li>
      </ul>
      <span className="text-blue-700 font-semibold underline mb-2 block">21-Day Hiring Funnel</span>
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
            <td className={tdClass}>Total Applicants</td>
            <td className={tdClass}>538</td>
            <td className={tdClass}>–</td>
          </tr>
          <tr>
            <td className={tdClass}>Completed Interviews</td>
            <td className={tdClass}>128</td>
            <td className={tdClass}>23.7%</td>
          </tr>
          <tr>
            <td className={tdClass}>Qualified (Score ≥ 7)</td>
            <td className={tdClass}>45</td>
            <td className={tdClass}>35.1% of interviewed</td>
          </tr>
          <tr>
            <td className={tdClass}>Final Interviews Conducted</td>
            <td className={tdClass}>12</td>
            <td className={tdClass}>26.7% of qualified</td>
          </tr>
          <tr>
            <td className={tdClass}>Offers Accepted</td>
            <td className={tdClass}>7</td>
            <td className={tdClass}>100% of roles filled</td>
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
            <td className={tdClass}>9.4 days</td>
            <td className={tdClass}>3.0 days</td>
            <td className={tdClass}>68% faster</td>
          </tr>
          <tr>
            <td className={tdClass}>Admin Screening Time</td>
            <td className={tdClass}>~52 hours/month</td>
            <td className={tdClass}>~7 hours/month</td>
            <td className={tdClass}>45+ hrs saved</td>
          </tr>
          <tr>
            <td className={tdClass}>Interview No-Show Rate</td>
            <td className={tdClass}>36%</td>
            <td className={tdClass}>0%</td>
            <td className={tdClass}>Eliminated</td>
          </tr>
          <tr>
            <td className={tdClass}>Revenue Lost from Open Roles</td>
            <td className={tdClass}>~$14,000/month</td>
            <td className={tdClass}>$0</td>
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
            <td className={tdClass}>$1,575 (45 hrs × $35/hr)</td>
          </tr>
          <tr>
            <td className={tdClass}>Revenue Retained</td>
            <td className={tdClass}>~$14,000</td>
          </tr>
          <tr>
            <td className={tdClass}>Total Value Created</td>
            <td className={tdClass}>~$15,575</td>
          </tr>
          <tr>
            <td className={tdClass}>ROI on Spend</td>
            <td className={tdClass}>~32x return on $479</td>
          </tr>
        </tbody>
      </table>
      <span className="text-blue-700 font-semibold underline mb-2 block">Operator Feedback</span>
      <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
        “We’re in the field all day—hiring used to be a second job. ServiceAgent took 80% of that load off our plate. Now we only talk to the best candidates. We don’t chase resumes or play phone tag anymore.”
        <br />
        <span className="block mt-2 text-right font-semibold">— Jordan Pierce, GM</span>
      </blockquote>
      <span className="text-blue-700 font-semibold underline mb-2 block">Key Wins</span>
      <ul className={bullet}>
        <li>7 certified techs hired in 3 weeks</li>
        <li>45+ hours/month of admin work eliminated</li>
        <li>100% of interviews completed within 5 minutes of applying</li>
        <li>Time-to-hire cut by 68%</li>
        <li>0% interview ghosting</li>
        <li>$14K/month in revenue protected</li>
      </ul>
      <span className="text-blue-700 font-semibold underline mb-2 block">The Bottom Line</span>
      <p className="mb-2 text-slate-800">
        For HVAC companies with seasonal spikes and contract-based revenue, speed and consistency in hiring is a competitive advantage. ServiceAgent helped this business eliminate bottlenecks, reduce stress, and build a repeatable recruiting system for long-term growth.
      </p>
    </div>
  );
} 