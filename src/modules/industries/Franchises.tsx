import React from "react";

const tableClass =
  "w-full border-collapse my-6 text-sm md:text-base shadow-sm rounded-lg overflow-hidden";
const thClass =
  "bg-blue-50 text-blue-900 font-semibold px-4 py-2 border border-blue-100 text-left";
const tdClass =
  "px-4 py-2 border border-blue-100 text-slate-800";
const bullet = "list-disc ml-6 mb-2 text-slate-700";

export default function Franchises() {
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
        <img src="/Franchise.svg" alt="Franchises" className="w-14 h-14 rounded-full object-cover" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
        How a Multi-Location Franchise Reduced Hiring Chaos and Standardized Recruiting Across 14 Units in 21 Days
      </h1>
      <p className="text-lg text-slate-700 mb-4">
        This fast-growing franchise used ServiceAgent to centralize and automate its entire recruiting process—cutting hiring time by 68%, boosting hire quality, and freeing up managers to focus on operations instead of resumes.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">Overview</span>
      <p className="mb-2 text-slate-800">
        A national service-based franchise group with 14 locations (across 4 states) needed to hire 20+ hourly workers to keep up with seasonal demand. Each location handled its own hiring, resulting in major inconsistencies, delays, and missed revenue due to understaffing.
      </p>
      <p className="mb-2 text-slate-800">
        With ServiceAgent, the franchisor centralized top-of-funnel hiring for all locations using AI-powered interviews, rubric-based candidate scoring, and automated follow-ups. The results: 22 hires in 21 days, 50+ hours saved weekly, and a repeatable process to roll out across every new franchise unit.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">The Problem</span>
      <p className="mb-2 text-slate-800">
        The decentralized system was holding growth back:
      </p>
      <ul className={bullet}>
        <li>Each franchisee posted jobs, reviewed resumes, and managed their own interview process</li>
        <li>Applicant screening was inconsistent and unstructured</li>
        <li>Qualified candidates slipped through the cracks</li>
        <li>Location managers were spending 4–6 hours/week on hiring tasks</li>
        <li>Some units were staffed, others were in crisis</li>
        <li>No visibility at the corporate/franchisee level on funnel performance</li>
      </ul>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">The ServiceAgent Rollout</span>
      <p className="mb-2 text-slate-800">
        The franchisor rolled out ServiceAgent as a shared recruiting layer across all locations:
      </p>
      <ul className={bullet}>
        <li>Job posts were auto-distributed across boards (Indeed, Zip, etc.)</li>
        <li>All applicants received <span className="font-bold">instant AI interviews</span> via chat or video</li>
        <li>Candidates were scored centrally using a consistent rubric:
          <ul className="list-disc ml-8 mt-2">
            <li>Experience</li>
            <li>Reliability</li>
            <li>Communication</li>
            <li>DISC fit for customer-facing roles</li>
          </ul>
        </li>
        <li><span className="font-bold">Pre-qualified shortlists</span> were auto-routed to the relevant franchise manager</li>
        <li>Hiring funnel data was tracked at both the corporate and unit level</li>
      </ul>
      <span className="text-blue-700 font-semibold underline mb-2 block">21-Day Hiring Funnel</span>
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
            <td className={tdClass}>Applicants</td>
            <td className={tdClass}>1,420</td>
            <td className={tdClass}>–</td>
          </tr>
          <tr>
            <td className={tdClass}>AI Interviews Completed</td>
            <td className={tdClass}>336</td>
            <td className={tdClass}>23.7%</td>
          </tr>
          <tr>
            <td className={tdClass}>Qualified (Score ≥7)</td>
            <td className={tdClass}>112</td>
            <td className={tdClass}>33.3% of completed</td>
          </tr>
          <tr>
            <td className={tdClass}>Final Interviews Conducted</td>
            <td className={tdClass}>47</td>
            <td className={tdClass}>42.0% of qualified</td>
          </tr>
          <tr>
            <td className={tdClass}>Hires Made</td>
            <td className={tdClass}>22</td>
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
            <td className={tdClass}>9.6 days</td>
            <td className={tdClass}>3.1 days</td>
            <td className={tdClass}>68% faster</td>
          </tr>
          <tr>
            <td className={tdClass}>Admin Time Spent per Manager</td>
            <td className={tdClass}>~5.5 hrs/week</td>
            <td className={tdClass}>~1 hr/week</td>
            <td className={tdClass}>80% saved</td>
          </tr>
          <tr>
            <td className={tdClass}>Interview No-Show Rate</td>
            <td className={tdClass}>51%</td>
            <td className={tdClass}>0%</td>
            <td className={tdClass}>Eliminated</td>
          </tr>
          <tr>
            <td className={tdClass}>Hiring Funnel Visibility</td>
            <td className={tdClass}>None</td>
            <td className={tdClass}>Real-time dashboards</td>
            <td className={tdClass}>Fully centralized</td>
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
            <td className={tdClass}>$899/month (custom volume)</td>
          </tr>
          <tr>
            <td className={tdClass}>Manager Time Saved (14 Units)</td>
            <td className={tdClass}>63 hours/week × $35/hr = $2,205</td>
          </tr>
          <tr>
            <td className={tdClass}>Revenue Protected (22 Hires)</td>
            <td className={tdClass}>$49,500/month (avg $2,250/hire)</td>
          </tr>
          <tr>
            <td className={tdClass}>Time-to-hire impact on revenue flow</td>
            <td className={tdClass}>Seasonal ops met on time</td>
          </tr>
          <tr>
            <td className={tdClass}>Total Value Created</td>
            <td className={tdClass}>~$51,700/month</td>
          </tr>
          <tr>
            <td className={tdClass}>ROI on Spend</td>
            <td className={tdClass}>~57x</td>
          </tr>
        </tbody>
      </table>
      <span className="text-blue-700 font-semibold underline mb-2 block">Operator Feedback</span>
      <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
        “Franchisees love the speed. <span className="underline">Corporate loves the control</span>. We’ve never had this much visibility into the hiring funnel—and the team only sees the best candidates. It’s a no-brainer for every new location.”
        <br />
        <span className="block mt-2 text-right font-semibold">— Tyler R., VP of Operations, Franchise Group</span>
      </blockquote>
      <span className="text-blue-700 font-semibold underline mb-2 block">Key Wins</span>
      <ul className={bullet}>
        <li>22 hires in 21 days across 14 franchise units</li>
        <li>Fully centralized hiring funnel, scored and ranked by AI</li>
        <li>Cut average time-to-hire by 68%</li>
        <li>50+ hours/week saved across franchise managers</li>
        <li>Interview no-shows eliminated</li>
        <li>Created a scalable, plug-and-play hiring system for all future locations</li>
      </ul>
      <span className="text-blue-700 font-semibold underline mb-2 block">The Bottom Line</span>
      <p className="mb-2 text-slate-800">
        Hiring at scale doesn’t need to be chaotic. ServiceAgent gave this franchise a <span className="font-bold">centralized, repeatable system</span> to grow faster, staff locations reliably, and reclaim hours of time every week.
      </p>
    </div>
  );
} 