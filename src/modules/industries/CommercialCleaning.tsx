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
    <div className="relative max-w-3xl mx-auto px-4 py-10 pt-24 bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Blue background gradient and accent shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-16 -left-24 w-80 h-80 bg-gradient-radial from-[#0E7CFF]/20 to-transparent rounded-full blur-2xl opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-radial from-[#A1E3FF]/30 to-transparent rounded-full blur-2xl opacity-40"></div>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] rounded-t-2xl opacity-80"></div>
      </div>
      <div className="flex items-center gap-2 mb-6">
        <img src="/Banner_SA_new.svg" alt="ServiceAgent Logo" className="h-12 w-auto" />
        <img src="/ComClean (1).svg" alt="Commercial Cleaning" className="w-14 h-14 rounded-full object-cover" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
        How a Commercial Cleaning Company Reduced No-Shows by 100% and Filled 9 Roles in 14 Days
      </h1>
      <p className="text-lg text-slate-700 mb-4">
        By automating candidate screening and interviews with ServiceAgent, this growing commercial cleaning business eliminated interview no-shows, cut time-to-hire from 10 days to under 3, and fully staffed a new facility in just two weeks.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">Overview</span>
      <p className="mb-2 text-slate-800">
        A regional commercial cleaning provider specializing in office parks, healthcare clinics, and government buildings needed to staff up quickly after landing two large facility contracts. They were aiming to hire 8–10 janitors and night crew staff within 14 days — a challenge given their past struggles with flaky applicants and long screening cycles.
      </p>
      <p className="mb-2 text-slate-800">
        With ServiceAgent, they hit their hiring target in 11 days, eliminated interview no-shows, and reduced their manual screening time by over 80%.
      </p>
      <span className="text-blue-700 font-semibold underline mb-2 block">The Problem</span>
      <hr className="my-6 border-blue-200" />
      <p className="mb-2 text-slate-800">
        Before ServiceAgent, the company’s hiring process looked like this:
      </p>
      <ul className={bullet}>
        <li>400+ monthly applicants from job boards like Indeed</li>
        <li>Manual resume reviews by the HR assistant</li>
        <li>20+ phone screens per week (mostly unqualified or unreachable)</li>
        <li>40–50% interview no-show rate</li>
        <li>No centralized candidate scoring or interview transcripts</li>
        <li>Compliance risk from inconsistent screening practices</li>
      </ul>
      <p className="mb-2 text-slate-800">
        Time-to-hire averaged 10.2 days, often causing delays in service delivery and risking client contracts.
      </p>
      <span className="text-blue-700 font-semibold underline mb-2 block">The ServiceAgent Rollout</span>
      
      <p className="mb-2 text-slate-800">
        The company activated ServiceAgent to automate and streamline their entire top-of-funnel hiring process. Here’s how it worked:
      </p>
      <ul className={bullet}>
        <li>Candidates were instantly invited to a chat + video interview after applying</li>
        <li>Each was scored using a custom rubric:
          <ul className="list-disc ml-8 mt-2">
            <li>Background check readiness</li>
            <li>Reliability and punctuality</li>
            <li>Past experience in commercial spaces</li>
            <li>English fluency and professionalism</li>
          </ul>
        </li>
        <li>Scoring and transcripts were synced into the company’s CRM</li>
        <li>Hiring manager only reviewed top-ranked candidates</li>
      </ul>
      <span className="text-blue-700 font-semibold underline mb-2 block">14-Day Hiring Funnel</span>
      
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
            <td className={tdClass}>413</td>
            <td className={tdClass}>–</td>
          </tr>
          <tr>
            <td className={tdClass}>Completed Interviews</td>
            <td className={tdClass}>102</td>
            <td className={tdClass}>24.7%</td>
          </tr>
          <tr>
            <td className={tdClass}>Qualified (Score ≥ 7)</td>
            <td className={tdClass}>41</td>
            <td className={tdClass}>40.2% of interviewed</td>
          </tr>
          <tr>
            <td className={tdClass}>Final Interviews Conducted</td>
            <td className={tdClass}>14</td>
            <td className={tdClass}>34.1% of qualified</td>
          </tr>
          <tr>
            <td className={tdClass}>Offers Accepted</td>
            <td className={tdClass}>9</td>
            <td className={tdClass}>100% of hiring target</td>
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
            <td className={tdClass}>10.2 days</td>
            <td className={tdClass}>2.8 days</td>
            <td className={tdClass}>72% faster</td>
          </tr>
          <tr>
            <td className={tdClass}>Admin Screening Time</td>
            <td className={tdClass}>~26 hours/week</td>
            <td className={tdClass}>~4 hours/week</td>
            <td className={tdClass}>84% reduction</td>
          </tr>
          <tr>
            <td className={tdClass}>Interview No-Show Rate</td>
            <td className={tdClass}>42%</td>
            <td className={tdClass}>0%</td>
            <td className={tdClass}>Eliminated</td>
          </tr>
          <tr>
            <td className={tdClass}>Revenue at Risk (delays)</td>
            <td className={tdClass}>$7,500–$10,000/mo</td>
            <td className={tdClass}>$0</td>
            <td className={tdClass}>Protected</td>
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
            <td className={tdClass}>~88 hours/month ($2,640 value @ $30/hr)</td>
          </tr>
          <tr>
            <td className={tdClass}>Revenue Protected</td>
            <td className={tdClass}>~$9,000</td>
          </tr>
          <tr>
            <td className={tdClass}>Total Value Created</td>
            <td className={tdClass}>~$11,640</td>
          </tr>
          <tr>
            <td className={tdClass}>ROI</td>
            <td className={tdClass}>~24x return</td>
          </tr>
        </tbody>
      </table>
      <span className="text-blue-700 font-semibold underline mb-2 block">Operator Feedback</span>
      
      <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
        “We used to scramble for every role and lose sleep over no-shows. Now I get a shortlist of pre-vetted people and just pick the best. We staffed two new contracts in days, not weeks.”
        <br />
        <span className="block mt-2 text-right font-semibold">— Tina Alvarez, Director of Operations</span>
      </blockquote>
      <span className="text-blue-700 font-semibold underline mb-2 block">Key Wins</span>
      
      <ul className={bullet}>
        <li>100% of applicants screened within 5 minutes</li>
        <li>72% reduction in time-to-hire</li>
        <li>84% less manual screening time</li>
        <li>$9,000/month in retained contract revenue</li>
        <li>0% interview ghosting rate</li>
        <li>Fully compliant, centralized records for every applicant</li>
      </ul>
      <span className="text-blue-700 font-semibold underline mb-2 block">The Bottom Line</span>
      
      <p className="mb-2 text-slate-800">
        ServiceAgent helped this commercial cleaning company turn a stressful hiring bottleneck into a competitive advantage. With faster placements, better candidates, and fewer no-shows, they’re now scaling confidently into new cities with a proven, AI-powered hiring engine.
      </p>
    </div>
  );
} 