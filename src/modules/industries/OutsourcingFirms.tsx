import React from 'react';

const tableClass =
  'w-full border-collapse my-6 text-sm md:text-base shadow-sm rounded-lg overflow-hidden';
const thClass =
  'bg-blue-50 text-blue-900 font-semibold px-4 py-2 border border-blue-100 text-left';
const tdClass = 'px-4 py-2 border border-blue-100 text-slate-800';
const bullet = 'list-disc ml-6 mb-2 text-slate-700';

export default function OutsourcingFirms() {
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
          How an Outsourcing Firm Used ServiceAgent to Scale from 50 to 200
          Employees in 6 Months
        </h1>
        <p className="text-lg text-slate-700 mb-6">
          By automating their hiring process with ServiceAgent, this outsourcing
          firm quadrupled their workforce while maintaining quality standards
          and reducing hiring costs by 60%.
        </p>
      </div>

      {/* Article content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">
          Overview
        </span>
        <p className="mb-2 text-slate-800">
          A growing outsourcing firm specializing in customer service and
          back-office operations needed to rapidly scale their workforce from 50
          to 200 employees to meet client demands. Traditional hiring methods
          were too slow and expensive for this level of growth.
        </p>
        <p className="mb-2 text-slate-800">
          After implementing ServiceAgent, they successfully scaled to 200
          employees in 6 months while reducing hiring costs by 60% and improving
          employee retention.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">
          The Problem
        </span>
        <p className="mb-2 text-slate-800">
          The outsourcing firm faced several critical challenges:
        </p>
        <ul className={bullet}>
          <li>Need to hire 150 employees in 6 months</li>
          <li>Manual screening processes too slow for rapid scaling</li>
          <li>High hiring costs eating into profit margins</li>
          <li>Inconsistent candidate quality across hires</li>
          <li>Limited HR team overwhelmed by volume</li>
        </ul>
        <p className="mb-2 text-slate-800">
          They needed a{' '}
          <span className="font-bold">scalable, cost-effective solution</span>{' '}
          to handle rapid hiring growth.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">
          The ServiceAgent Solution
        </span>
        <p className="mb-2 text-slate-800">
          ServiceAgent was implemented to automate the entire hiring process:
        </p>
        <ul className={bullet}>
          <li>Automated video interviews for all applicants</li>
          <li>AI scoring based on role-specific criteria</li>
          <li>Automated scheduling and onboarding</li>
          <li>Integration with existing HR systems</li>
          <li>Scalable process for high-volume hiring</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">
          6-Month Results
        </span>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Metric</th>
              <th className={thClass}>Before ServiceAgent</th>
              <th className={thClass}>After ServiceAgent</th>
              <th className={thClass}>Improvement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdClass}>Time-to-Hire</td>
              <td className={tdClass}>12 days</td>
              <td className={tdClass}>4 days</td>
              <td className={tdClass}>67% faster</td>
            </tr>
            <tr>
              <td className={tdClass}>Hiring Cost per Employee</td>
              <td className={tdClass}>$2,400</td>
              <td className={tdClass}>$960</td>
              <td className={tdClass}>60% reduction</td>
            </tr>
            <tr>
              <td className={tdClass}>Employee Retention</td>
              <td className={tdClass}>75%</td>
              <td className={tdClass}>88%</td>
              <td className={tdClass}>13% improvement</td>
            </tr>
            <tr>
              <td className={tdClass}>Hiring Success Rate</td>
              <td className={tdClass}>70%</td>
              <td className={tdClass}>92%</td>
              <td className={tdClass}>22% improvement</td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">
          Hiring Funnel
        </span>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Stage</th>
              <th className={thClass}>Candidates</th>
              <th className={thClass}>Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdClass}>Applications Received</td>
              <td className={tdClass}>3,247</td>
              <td className={tdClass}>–</td>
            </tr>
            <tr>
              <td className={tdClass}>Completed AI Interviews</td>
              <td className={tdClass}>1,623</td>
              <td className={tdClass}>50%</td>
            </tr>
            <tr>
              <td className={tdClass}>Qualified Candidates</td>
              <td className={tdClass}>487</td>
              <td className={tdClass}>30%</td>
            </tr>
            <tr>
              <td className={tdClass}>Hires Made</td>
              <td className={tdClass}>150</td>
              <td className={tdClass}>31%</td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">
          Cost Analysis
        </span>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Category</th>
              <th className={thClass}>6-Month Savings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdClass}>Hiring Costs (150 hires)</td>
              <td className={tdClass}>$216,000</td>
            </tr>
            <tr>
              <td className={tdClass}>Admin Time Saved</td>
              <td className={tdClass}>$45,600</td>
            </tr>
            <tr>
              <td className={tdClass}>Reduced Turnover Costs</td>
              <td className={tdClass}>$18,900</td>
            </tr>
            <tr>
              <td className={tdClass}>ServiceAgent Cost</td>
              <td className={tdClass}>-$2,874</td>
            </tr>
            <tr>
              <td className={tdClass}>
                <strong>Net 6-Month Savings</strong>
              </td>
              <td className={tdClass}>
                <strong>$277,626</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">
          HR Director Feedback
        </span>
        <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
          "We needed to scale quickly without compromising quality. ServiceAgent
          allowed us to hire 150 people in 6 months while actually improving our
          retention rates. The cost savings alone made it a no-brainer."
          <br />
          <span className="block mt-2 text-right font-semibold">
            — Lisa Chen, HR Director
          </span>
        </blockquote>
        <span className="text-blue-700 font-semibold underline mb-2 block">
          Key Achievements
        </span>
        <ul className={bullet}>
          <li>150 new employees hired in 6 months</li>
          <li>67% reduction in time-to-hire</li>
          <li>60% reduction in hiring costs</li>
          <li>13% improvement in employee retention</li>
          <li>22% improvement in hiring success rate</li>
          <li>Scalable process for future growth</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">
          The Bottom Line
        </span>
        <p className="mb-2 text-slate-800">
          For outsourcing firms, rapid scaling while maintaining quality and
          controlling costs is essential for business growth. ServiceAgent
          provided this company with a scalable solution that enabled them to
          quadruple their workforce efficiently while improving overall hiring
          outcomes.
        </p>
      </div>
    </div>
  );
}
