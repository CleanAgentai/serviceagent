import React from "react";

const tableClass =
  "w-full border-collapse my-6 text-sm md:text-base shadow-sm rounded-lg overflow-hidden";
const thClass =
  "bg-blue-50 text-blue-900 font-semibold px-4 py-2 border border-blue-100 text-left";
const tdClass =
  "px-4 py-2 border border-blue-100 text-slate-800";
const bullet = "list-disc ml-6 mb-2 text-slate-700";

export default function Hospitality() {
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
        <img src="/Hotel.svg" alt="Hospitality" className="w-14 h-14 rounded-full object-cover" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
        How a Boutique Hotel Group Filled 32 Open Roles in 30 Days and Cut No-Shows to Zero Using AI Interviews
      </h1>
      <p className="text-lg text-slate-700 mb-4">
        ServiceAgent helped this fast-growing hospitality group eliminate resume screening, reduce time-to-hire by 72%, and save over 200 hours of admin time—while increasing the quality of customer-facing hires.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">Overview</span>
      <p className="mb-2 text-slate-800">
        A boutique hospitality group operating five upscale hotels across the Southeast U.S. was facing major challenges filling front-desk, housekeeping, kitchen, and concierge roles. Their in-house team couldn’t keep up with the high volume of turnover and seasonal demand.
      </p>
      <p className="mb-2 text-slate-800">
        They replaced their manual screening process with ServiceAgent’s automated AI interviewing system. In the first month, they filled all 32 open roles, completely eliminated interview no-shows, and empowered HR to shift from reactive hiring to proactive talent pipeline building.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">The Problem</span>
      <p className="mb-2 text-slate-800">
        Before ServiceAgent, the internal hiring process looked like this:
      </p>
      <ul className={bullet}>
        <li>800+ monthly applicants across roles, mostly from Indeed</li>
        <li>HR and GMs spent hours reviewing resumes and coordinating calls</li>
        <li>Candidates often went cold due to delays or lack of follow-up</li>
        <li>Interviews were inconsistent—different managers used different standards</li>
        <li>Housekeeping roles were especially difficult to fill due to high competition</li>
        <li>Time-to-hire averaged 6.5 days, which impacted room turnover rates and customer service</li>
      </ul>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">The ServiceAgent Rollout</span>
      <p className="mb-2 text-slate-800">
        The group rolled out ServiceAgent across all 5 properties. Here's how it worked:
      </p>
      <ul className={bullet}>
        <li>Every applicant received a <span className="font-bold">chat/video interview</span> automatically within 5 minutes</li>
        <li>Each interview was scored on traits like:
          <ul className="list-disc ml-8 mt-2">
            <li>Communication & friendliness</li>
            <li>Attention to detail (housekeeping roles)</li>
            <li>Professionalism & prior hospitality experience</li>
            <li>Shift availability</li>
          </ul>
        </li>
        <li>Candidates with a score ≥7 were ranked and sent directly to the appropriate GM</li>
        <li>GMs could review transcripts and video clips before final interviews</li>
        <li>All activity was tracked in one central dashboard</li>
      </ul>
      <span className="text-blue-700 font-semibold underline mb-2 block">30-Day Funnel Performance</span>
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
            <td className={tdClass}>873</td>
            <td className={tdClass}>–</td>
          </tr>
          <tr>
            <td className={tdClass}>AI Interviews Completed</td>
            <td className={tdClass}>293</td>
            <td className={tdClass}>33.6%</td>
          </tr>
          <tr>
            <td className={tdClass}>Qualified Candidates (Score ≥7)</td>
            <td className={tdClass}>108</td>
            <td className={tdClass}>36.9% of completed</td>
          </tr>
          <tr>
            <td className={tdClass}>Final Interviews Scheduled</td>
            <td className={tdClass}>74</td>
            <td className={tdClass}>68.5% of qualified</td>
          </tr>
          <tr>
            <td className={tdClass}>Hires Made</td>
            <td className={tdClass}>32</td>
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
            <td className={tdClass}>6.5 days</td>
            <td className={tdClass}>1.8 days</td>
            <td className={tdClass}>–72%</td>
          </tr>
          <tr>
            <td className={tdClass}>Interview No-Show Rate</td>
            <td className={tdClass}>~52%</td>
            <td className={tdClass}>0%</td>
            <td className={tdClass}>Eliminated</td>
          </tr>
          <tr>
            <td className={tdClass}>Admin Time Saved (per month)</td>
            <td className={tdClass}>200+ hours</td>
            <td className={tdClass}>{"<"}40 hours</td>
            <td className={tdClass}>160+ hours saved</td>
          </tr>
          <tr>
            <td className={tdClass}>Screening Consistency</td>
            <td className={tdClass}>Varied by location</td>
            <td className={tdClass}>Fully standardized</td>
            <td className={tdClass}>Centralized & fair</td>
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
            <td className={tdClass}>$1,050/month (300 AI interviews)</td>
          </tr>
          <tr>
            <td className={tdClass}>Labor Hours Saved</td>
            <td className={tdClass}>160 hrs × $30/hr = $4,800</td>
          </tr>
          <tr>
            <td className={tdClass}>Revenue Preserved (rooms online)</td>
            <td className={tdClass}>32 rooms × $125/night × 20 days = $80,000+</td>
          </tr>
          <tr>
            <td className={tdClass}>Total Value Created</td>
            <td className={tdClass}>$84,800+</td>
          </tr>
          <tr>
            <td className={tdClass}>ROI on Spend</td>
            <td className={tdClass}>80x+</td>
          </tr>
        </tbody>
      </table>
      <span className="text-blue-700 font-semibold underline mb-2 block">Operator Feedback</span>
      <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
        “Hiring used to be the biggest drag on our operations team. Now, it’s the easiest part of our workflow. The AI does the hard part—we just hire from the top of the list.”
        <br />
        <span className="block mt-2 text-right font-semibold">— Naomi C., Director of Operations, Nara Hotel Group</span>
      </blockquote>
      <span className="text-blue-700 font-semibold underline mb-2 block">Key Wins</span>
      <ul className={bullet}>
        <li>32 roles filled across 5 locations in under 30 days</li>
        <li>160+ hours/month saved for hiring teams</li>
        <li>0% no-show rate on interviews</li>
        <li>Hospitality-standard hiring rubric built into every AI screen</li>
        <li>Hires started within 48 hours of applying</li>
        <li>Seamless integration with their PMS system and internal hiring software</li>
      </ul>
      <span className="text-blue-700 font-semibold underline mb-2 block">The Bottom Line</span>
      <p className="mb-2 text-slate-800">
        For hospitality businesses that depend on high-quality, high-volume hiring—ServiceAgent delivers a hands-off solution that matches the speed of operations. Fewer delays. Better candidates. More rooms, more revenue.
      </p>
    </div>
  );
} 