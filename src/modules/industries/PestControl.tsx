import React from "react";

const tableClass =
  "w-full border-collapse my-6 text-sm md:text-base shadow-sm rounded-lg overflow-hidden";
const thClass =
  "bg-blue-50 text-blue-900 font-semibold px-4 py-2 border border-blue-100 text-left";
const tdClass =
  "px-4 py-2 border border-blue-100 text-slate-800";
const bullet = "list-disc ml-6 mb-2 text-slate-700";

export default function PestControl() {
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
        <div className="flex justify-end mb-8">
          <img src="/Banner_SA_new.svg" alt="ServiceAgent Logo" className="h-12 w-auto" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          How a Regional Pest Control Company Slashed Time-to-Hire by 73% and Reduced Turnover with AI Screening
        </h1>
        <p className="text-lg text-slate-700 mb-6">
          By automating their hiring process with ServiceAgent, this pest control company filled 9 technician roles in under two weeks—while improving quality and reducing burnout across the team.
        </p>
        
        {/* Large featured image integrated into article */}
        <div className="my-8">
          <img src="/Pest.svg" alt="Pest Control" className="w-full max-w-2xl h-48 object-cover rounded-lg" />
        </div>
      </div>

      {/* Article content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">Overview</span>
        <p className="mb-2 text-slate-800">
          A regional pest control company was struggling with high turnover and slow hiring processes. They needed 9 new technicians quickly but traditional hiring methods were too slow and resulted in poor retention.
        </p>
        <p className="mb-2 text-slate-800">
          After implementing ServiceAgent, they filled all 9 roles in just 14 days, reduced their time-to-hire by 73%, and significantly improved employee retention.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">The Problem</span>
        <p className="mb-2 text-slate-800">
          The pest control company faced several critical hiring challenges:
        </p>
        <ul className={bullet}>
          <li>High turnover rate among technicians</li>
          <li>Manual screening taking 25+ hours per week</li>
          <li>18-day average time-to-hire</li>
          <li>Poor candidate quality leading to quick exits</li>
          <li>Lost revenue due to staffing shortages</li>
        </ul>
        <p className="mb-2 text-slate-800">
          They needed a <span className="font-bold">faster, more effective way</span> to identify and hire reliable pest control technicians.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">The ServiceAgent Solution</span>
        <p className="mb-2 text-slate-800">
          ServiceAgent was implemented with custom screening for pest control technician roles:
        </p>
        <ul className={bullet}>
          <li>Automated video interviews for all applicants</li>
          <li>AI scoring based on pest control experience and reliability</li>
          <li>Personality and work ethic assessment</li>
          <li>Automated scheduling for qualified candidates</li>
          <li>Integration with existing HR systems</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">14-Day Results</span>
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
              <td className={tdClass}>18 days</td>
              <td className={tdClass}>4.9 days</td>
              <td className={tdClass}>73% faster</td>
            </tr>
            <tr>
              <td className={tdClass}>Admin Time per Week</td>
              <td className={tdClass}>25 hours</td>
              <td className={tdClass}>3 hours</td>
              <td className={tdClass}>88% reduction</td>
            </tr>
            <tr>
              <td className={tdClass}>Employee Turnover</td>
              <td className={tdClass}>45%</td>
              <td className={tdClass}>15%</td>
              <td className={tdClass}>67% reduction</td>
            </tr>
            <tr>
              <td className={tdClass}>Hiring Success Rate</td>
              <td className={tdClass}>50%</td>
              <td className={tdClass}>100%</td>
              <td className={tdClass}>50% improvement</td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">Hiring Funnel</span>
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
              <td className={tdClass}>167</td>
              <td className={tdClass}>–</td>
            </tr>
            <tr>
              <td className={tdClass}>Completed AI Interviews</td>
              <td className={tdClass}>89</td>
              <td className={tdClass}>53%</td>
            </tr>
            <tr>
              <td className={tdClass}>Qualified Candidates</td>
              <td className={tdClass}>31</td>
              <td className={tdClass}>35%</td>
            </tr>
            <tr>
              <td className={tdClass}>Final Interviews</td>
              <td className={tdClass}>12</td>
              <td className={tdClass}>39%</td>
            </tr>
            <tr>
              <td className={tdClass}>Hires Made</td>
              <td className={tdClass}>9</td>
              <td className={tdClass}>75%</td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">Cost Analysis</span>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Category</th>
              <th className={thClass}>Monthly Savings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdClass}>Admin Time (88 hours × $25/hr)</td>
              <td className={tdClass}>$2,200</td>
            </tr>
            <tr>
              <td className={tdClass}>Reduced Turnover Costs</td>
              <td className={tdClass}>$1,800</td>
            </tr>
            <tr>
              <td className={tdClass}>Faster Revenue Generation</td>
              <td className={tdClass}>$2,400</td>
            </tr>
            <tr>
              <td className={tdClass}>ServiceAgent Cost</td>
              <td className={tdClass}>-$479</td>
            </tr>
            <tr>
              <td className={tdClass}><strong>Net Monthly Savings</strong></td>
              <td className={tdClass}><strong>$5,921</strong></td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">Operations Director Feedback</span>
        <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
          "The turnover was killing us. We'd hire someone and they'd quit within a month. ServiceAgent helped us identify candidates who are actually committed to the work. Our retention has never been better."
          <br />
          <span className="block mt-2 text-right font-semibold">— Jennifer Martinez, Operations Director</span>
        </blockquote>
        <span className="text-blue-700 font-semibold underline mb-2 block">Key Achievements</span>
        <ul className={bullet}>
          <li>9 technician roles filled in 14 days</li>
          <li>73% reduction in time-to-hire</li>
          <li>88% reduction in administrative time</li>
          <li>67% reduction in employee turnover</li>
          <li>50% improvement in hiring success rate</li>
          <li>Scalable process for future growth</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">The Bottom Line</span>
        <p className="mb-2 text-slate-800">
          For pest control companies, hiring reliable technicians who stay with the company is crucial for maintaining service quality and profitability. ServiceAgent provided this company with an efficient solution that not only accelerated their hiring process but also significantly improved employee retention.
        </p>
      </div>
    </div>
  );
} 