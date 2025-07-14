import React from "react";

const tableClass =
  "w-full border-collapse my-6 text-sm md:text-base shadow-sm rounded-lg overflow-hidden";
const thClass =
  "bg-blue-50 text-blue-900 font-semibold px-4 py-2 border border-blue-100 text-left";
const tdClass =
  "px-4 py-2 border border-blue-100 text-slate-800";
const bullet = "list-disc ml-6 mb-2 text-slate-700";

export default function OutsourcingFirms() {
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
        <img src="/Call Service.svg" alt="Outsourcing Firms" className="w-14 h-14 rounded-full object-cover" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
        How a Global Outsourcing Firm Automated Candidate Screening for 3 Countries and Reclaimed 360+ Recruiter Hours
      </h1>
      <p className="text-lg text-slate-700 mb-4">
        A 200-seat outsourcing firm replaced manual first-round interviews with AI—screening 800+ candidates in 30 days, reducing time-to-hire by 74%, and scaling placements across the Philippines, Mexico, and India.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">Overview</span>
      <p className="mb-2 text-slate-800">
        A business process outsourcing (BPO) company specializing in customer service and back-office support was rapidly scaling headcount across multiple time zones. Despite healthy candidate pipelines, its 12-member recruitment team was overwhelmed with screening, no-shows, and inconsistent evaluation.
      </p>
      <p className="mb-2 text-slate-800">
        By using ServiceAgent, the BPO was able to automate every applicant interview across all geographies—using AI to screen, score, and rank talent around the clock. Recruiters now focus only on the most promising candidates, reducing burnout, boosting throughput, and accelerating client onboarding.
      </p>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">The Problem</span>
      <p className="mb-2 text-slate-800">
        As demand surged, the recruiting bottlenecks became unmanageable:
      </p>
      <ul className={bullet}>
        <li>The team received over <span className="font-bold">2,000 applications per month</span>, often in different time zones and languages</li>
        <li>Recruiters manually reviewed resumes and ran dozens of intro interviews daily</li>
        <li>Candidate quality varied wildly and first-round interviews were redundant</li>
        <li>No standardized rubric—hiring decisions varied by recruiter</li>
        <li>Interview no-shows were frequent, especially across LATAM and SEA</li>
        <li>Recruiters were losing 50%+ of their week to screening</li>
        <li>Clients were frustrated by long staffing timelines (avg: 10+ days)</li>
      </ul>
      <hr className="my-6 border-blue-200" />
      <span className="text-blue-700 font-semibold underline mb-2 block">The ServiceAgent Rollout</span>
      <p className="mb-2 text-slate-800">
        ServiceAgent was deployed across the Philippines, India, and Mexico hiring funnels:
      </p>
      <ul className={bullet}>
        <li>Each applicant received an <span className="font-bold">automated AI interview</span> (chat and video) within 5 minutes of applying</li>
        <li>Candidates were scored using a custom rubric:
          <ul className="list-disc ml-8 mt-2">
            <li>English fluency</li>
            <li>Remote-readiness</li>
            <li>Customer service tone and clarity</li>
            <li>Reliability traits (via DISC markers)</li>
          </ul>
        </li>
        <li>Interviews were conducted in <span className="font-bold">local time zones and local languages</span></li>
        <li>Recruiters received daily shortlists with transcripts, scores, and flagged highlights</li>
        <li>No-shows and back-and-forth scheduling were eliminated entirely</li>
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
            <td className={tdClass}>Applicants</td>
            <td className={tdClass}>2,165</td>
            <td className={tdClass}>–</td>
          </tr>
          <tr>
            <td className={tdClass}>AI Interviews Completed</td>
            <td className={tdClass}>842</td>
            <td className={tdClass}>38.9%</td>
          </tr>
          <tr>
            <td className={tdClass}>Qualified (Score ≥7)</td>
            <td className={tdClass}>323</td>
            <td className={tdClass}>38.4% of completed</td>
          </tr>
          <tr>
            <td className={tdClass}>Final Interviews Conducted</td>
            <td className={tdClass}>141</td>
            <td className={tdClass}>43.6% of qualified</td>
          </tr>
          <tr>
            <td className={tdClass}>Candidates Hired</td>
            <td className={tdClass}>96</td>
            <td className={tdClass}>100% of monthly target</td>
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
            <td className={tdClass}>10.4 days</td>
            <td className={tdClass}>2.7 days</td>
            <td className={tdClass}>–74%</td>
          </tr>
          <tr>
            <td className={tdClass}>No-Show Rate (Initial Interview)</td>
            <td className={tdClass}>49%</td>
            <td className={tdClass}>0%</td>
            <td className={tdClass}>Eliminated</td>
          </tr>
          <tr>
            <td className={tdClass}>Screening Time per Recruiter</td>
            <td className={tdClass}>~22 hrs/week</td>
            <td className={tdClass}>~5 hrs/week</td>
            <td className={tdClass}>77% reduction</td>
          </tr>
          <tr>
            <td className={tdClass}>Total Team Time Saved</td>
            <td className={tdClass}>~360 hours/month</td>
            <td className={tdClass}>Freed up capacity</td>
            <td className={tdClass}></td>
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
            <td className={tdClass}>$2,450/month (700 AI interviews)</td>
          </tr>
          <tr>
            <td className={tdClass}>Recruiter Time Saved (12 recruiters)</td>
            <td className={tdClass}>360 hrs × $25/hr = $9,000</td>
          </tr>
          <tr>
            <td className={tdClass}>Revenue from 96 Placements</td>
            <td className={tdClass}>96 × $600 avg client margin = $57,600</td>
          </tr>
          <tr>
            <td className={tdClass}>Total Value Created</td>
            <td className={tdClass}>$66,600+</td>
          </tr>
          <tr>
            <td className={tdClass}>ROI on Spend</td>
            <td className={tdClass}>27x</td>
          </tr>
        </tbody>
      </table>
      <span className="text-blue-700 font-semibold underline mb-2 block">Operator Feedback</span>
      <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
        “Our team used to screen endlessly, and the candidates would disappear before we even got to the second round. Now, we have shortlists every morning—pre-scored, flagged, and ready to go. It’s the single biggest unlock to our scaling effort so far.”
        <br />
        <span className="block mt-2 text-right font-semibold">— Mitesh N., VP of Global Talent, Nimbus CX Solutions</span>
      </blockquote>
      <span className="text-blue-700 font-semibold underline mb-2 block">Key Wins</span>
      <ul className={bullet}>
        <li>AI interviews conducted in 3 countries and 2 languages</li>
        <li>96 placements filled in 30 days</li>
        <li>360+ hours reclaimed across the recruitment team</li>
        <li>74% faster time-to-hire, accelerating client onboarding</li>
        <li>Candidate quality improved via rubric-driven scoring</li>
        <li>Eliminated time zone coordination and interview ghosting</li>
      </ul>
      <span className="text-blue-700 font-semibold underline mb-2 block">The Bottom Line</span>
      <p className="mb-2 text-slate-800">
        In outsourcing, speed and consistency win clients. ServiceAgent gave this BPO the ability to interview <span className="font-bold">every applicant instantly</span>, filter for the <span className="font-bold">best talent</span>, and eliminate <span className="font-bold">recruiter overload</span>—at a fraction of the cost of expanding the hiring team.
      </p>
    </div>
  );
} 