import React from 'react';

const tableClass =
  'w-full border-collapse my-6 text-sm md:text-base shadow-sm rounded-lg overflow-hidden';
const thClass =
  'bg-blue-50 text-blue-900 font-semibold px-4 py-2 border border-blue-100 text-left';
const tdClass = 'px-4 py-2 border border-blue-100 text-slate-800';
const bullet = 'list-disc ml-6 mb-2 text-slate-700';

export default function Landscaping() {
  return (
    <div className="relative w-full bg-white">
      {/* Blue background gradient and accent shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-16 -left-24 w-80 h-80 bg-gradient-radial from-[#0E7CFF]/20 to-transparent rounded-full blur-2xl opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-radial from-[#A1E3FF]/30 to-transparent rounded-full blur-2xl opacity-40"></div>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] opacity-80"></div>
      </div>

      {/* Header with logo in top right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="flex justify-start">
          <img
            src="/logos/Logo.svg"
            alt="ServiceAgent Logo"
            className="h-auto w-48"
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          How a Landscaping Company Staffed Up for Peak Season in 10 Days and
          Saved 60+ Hours of Admin Time
        </h1>
        <p className="text-lg text-slate-700 mb-6">
          With ServiceAgent, this commercial landscaping firm automated
          applicant screening and hired a full field crew—before their
          competitors even started interviews.
        </p>
      </div>

      {/* Article content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">
          Overview
        </span>
        <p className="mb-2 text-slate-800">
          A mid-sized commercial landscaping company was heading into peak
          spring contracts short-staffed. They needed 6 new field crew
          members—mowers, trimmers, irrigation techs—across two service areas.
        </p>
        <p className="mb-2 text-slate-800">
          Historically, this meant 3–4 weeks of phone calls, ghosted interviews,
          and rushed hires. This year, they tried something different.
        </p>
        <p className="mb-2 text-slate-800">
          By launching ServiceAgent, they filled all 6 roles in 10 days, saved
          over 60 hours of admin work, and eliminated no-shows entirely.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">
          The Problem
        </span>
        <p className="mb-2 text-slate-800">
          Hiring seasonal labor was a chaotic scramble every year:
        </p>
        <ul className={bullet}>
          <li>300+ applicants from job boards and walk-ins</li>
          <li>Admin assistant manually screening and calling candidates</li>
          <li>Field managers losing time trying to vet applicants on-site</li>
          <li>Interviews often missed or unqualified</li>
          <li>Start dates pushed back—delaying customer contracts</li>
        </ul>
        <p className="mb-2 text-slate-800">
          This year, they wanted a{' '}
          <span className="font-bold">faster, more consistent process</span>{' '}
          with <span className="font-bold">less human effort</span>.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">
          The ServiceAgent Rollout
        </span>
        <p className="mb-2 text-slate-800">
          They rolled out ServiceAgent in under 24 hours, tailored to green
          industry roles:
        </p>
        <ul className={bullet}>
          <li>
            Every applicant got an{' '}
            <span className="font-bold">instant chat + video interview</span>{' '}
            invite
          </li>
          <li>
            The AI interview scored for:
            <ul className="list-disc ml-8 mt-2">
              <li>Lawn care or irrigation experience</li>
              <li>Driver's license / equipment operation</li>
              <li>English/Spanish fluency</li>
              <li>Reliability & physical readiness</li>
            </ul>
          </li>
          <li>
            Field managers reviewed only the{' '}
            <span className="font-bold">ranked shortlists</span>
          </li>
          <li>Final interviews and onboarding happened the same week</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">
          10-Day Hiring Funnel
        </span>
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
              <td className={tdClass}>Applicants (from Indeed + Flyers)</td>
              <td className={tdClass}>312</td>
              <td className={tdClass}>–</td>
            </tr>
            <tr>
              <td className={tdClass}>Completed Interviews</td>
              <td className={tdClass}>81</td>
              <td className={tdClass}>25.9%</td>
            </tr>
            <tr>
              <td className={tdClass}>Qualified (Score ≥7)</td>
              <td className={tdClass}>27</td>
              <td className={tdClass}>33.3% of interviewed</td>
            </tr>
            <tr>
              <td className={tdClass}>Final Interviews Conducted</td>
              <td className={tdClass}>9</td>
              <td className={tdClass}>33.3% of qualified</td>
            </tr>
            <tr>
              <td className={tdClass}>Hires Made</td>
              <td className={tdClass}>6</td>
              <td className={tdClass}>100% of hiring goal</td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">
          Time & Cost Impact
        </span>
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
              <td className={tdClass}>11.6 days</td>
              <td className={tdClass}>3.3 days</td>
              <td className={tdClass}>71% faster</td>
            </tr>
            <tr>
              <td className={tdClass}>Admin Time per Week</td>
              <td className={tdClass}>20 hours</td>
              <td className={tdClass}>{'<3 hours'}</td>
              <td className={tdClass}>17 hrs saved/week</td>
            </tr>
            <tr>
              <td className={tdClass}>Interview No-Show Rate</td>
              <td className={tdClass}>38%</td>
              <td className={tdClass}>0%</td>
              <td className={tdClass}>Eliminated</td>
            </tr>
            <tr>
              <td className={tdClass}>Delayed Start Dates</td>
              <td className={tdClass}>Common</td>
              <td className={tdClass}>None</td>
              <td className={tdClass}>On-time crews</td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">
          Cost vs. Value
        </span>
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
              <td className={tdClass}>~$1,050 (60 hrs × $17.50/hr)</td>
            </tr>
            <tr>
              <td className={tdClass}>Revenue Secured via Crews</td>
              <td className={tdClass}>$4,800 (6 hires × $800 avg/wk)</td>
            </tr>
            <tr>
              <td className={tdClass}>Total Value Created</td>
              <td className={tdClass}>~$5,850</td>
            </tr>
            <tr>
              <td className={tdClass}>ROI on Spend</td>
              <td className={tdClass}>~12x return in 10 days</td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">
          Operator Feedback
        </span>
        <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
          "We used to lose contracts because we couldn't staff fast enough. This
          time, we were fully crewed before anyone else—and with better people.
          It's not just automation—it's an edge."
          <br />
          <span className="block mt-2 text-right font-semibold">
            — Ramon Diaz, General Manager
          </span>
        </blockquote>
        <span className="text-blue-700 font-semibold underline mb-2 block">
          Key Wins
        </span>
        <ul className={bullet}>
          <li>6 hires made in 10 days</li>
          <li>No-show interviews eliminated</li>
          <li>60+ hours of admin labor recovered</li>
          <li>Field managers only met top 10% of applicants</li>
          <li>Crews deployed on-time, protecting key contracts</li>
          <li>Hiring pipeline built for next season</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">
          The Bottom Line
        </span>
        <p className="mb-2 text-slate-800">
          For landscaping firms racing against seasons and competitors, speed
          and simplicity matter. ServiceAgent gave this company a faster way to
          hire—and more confidence heading into peak season.
        </p>
      </div>
    </div>
  );
}
