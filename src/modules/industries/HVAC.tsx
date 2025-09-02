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
          <img src="/logos/Logo_transparent.png" alt="ServiceAgent Logo" className="h-auto w-48" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          How a Fast-Growing HVAC Business Hired 7 Techs in 21 Days Without a Single Resume Review
        </h1>
        <p className="text-lg text-slate-700 mb-6">
          Using ServiceAgent to automate applicant screening, this HVAC company filled 7 technician roles in under 3 weeks, reduced time-to-hire by 68%, and freed up over 45 hours of admin time—all during peak season.
        </p>
      </div>

      {/* Article content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">Overview</span>
        <p className="mb-2 text-slate-800">
          A rapidly expanding HVAC company was struggling to hire qualified technicians during peak season. They needed 7 new techs quickly but traditional hiring methods were too slow and inefficient.
        </p>
        <p className="mb-2 text-slate-800">
          After implementing ServiceAgent, they filled all 7 roles in just 21 days, eliminated manual resume screening, and reduced their time-to-hire by 68%.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">The Problem</span>
        <p className="mb-2 text-slate-800">
          The HVAC company faced several critical hiring challenges:
        </p>
        <ul className={bullet}>
          <li>Manual resume screening taking 15+ hours per week</li>
          <li>21-day average time-to-hire during peak season</li>
          <li>High volume of unqualified applicants</li>
          <li>Technician shortage in the market</li>
          <li>Lost revenue due to staffing delays</li>
        </ul>
        <p className="mb-2 text-slate-800">
          They needed a <span className="font-bold">faster, more efficient way</span> to identify and hire qualified HVAC technicians.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">The ServiceAgent Solution</span>
        <p className="mb-2 text-slate-800">
          ServiceAgent was implemented with custom screening for HVAC technician roles:
        </p>
        <ul className={bullet}>
          <li>Automated video interviews for all applicants</li>
          <li>AI scoring based on HVAC experience and certifications</li>
          <li>Instant qualification assessment</li>
          <li>Automated scheduling for qualified candidates</li>
          <li>Integration with existing HR systems</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">21-Day Results</span>
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
              <td className={tdClass}>21 days</td>
              <td className={tdClass}>6.7 days</td>
              <td className={tdClass}>68% faster</td>
            </tr>
            <tr>
              <td className={tdClass}>Admin Time per Week</td>
              <td className={tdClass}>15 hours</td>
              <td className={tdClass}>2 hours</td>
              <td className={tdClass}>87% reduction</td>
            </tr>
            <tr>
              <td className={tdClass}>Resume Reviews</td>
              <td className={tdClass}>200+ per week</td>
              <td className={tdClass}>0</td>
              <td className={tdClass}>100% eliminated</td>
            </tr>
            <tr>
              <td className={tdClass}>Hiring Success Rate</td>
              <td className={tdClass}>55%</td>
              <td className={tdClass}>100%</td>
              <td className={tdClass}>45% improvement</td>
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
              <td className={tdClass}>187</td>
              <td className={tdClass}>–</td>
            </tr>
            <tr>
              <td className={tdClass}>Completed AI Interviews</td>
              <td className={tdClass}>94</td>
              <td className={tdClass}>50%</td>
            </tr>
            <tr>
              <td className={tdClass}>Qualified Candidates</td>
              <td className={tdClass}>28</td>
              <td className={tdClass}>30%</td>
            </tr>
            <tr>
              <td className={tdClass}>Final Interviews</td>
              <td className={tdClass}>10</td>
              <td className={tdClass}>36%</td>
            </tr>
            <tr>
              <td className={tdClass}>Hires Made</td>
              <td className={tdClass}>7</td>
              <td className={tdClass}>70%</td>
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
              <td className={tdClass}>Admin Time (52 hours × $30/hr)</td>
              <td className={tdClass}>$1,560</td>
            </tr>
            <tr>
              <td className={tdClass}>Faster Revenue Generation</td>
              <td className={tdClass}>$3,500</td>
            </tr>
            <tr>
              <td className={tdClass}>Reduced Hiring Costs</td>
              <td className={tdClass}>$1,200</td>
            </tr>
            <tr>
              <td className={tdClass}>ServiceAgent Cost</td>
              <td className={tdClass}>-$479</td>
            </tr>
            <tr>
              <td className={tdClass}><strong>Net Monthly Savings</strong></td>
              <td className={tdClass}><strong>$5,781</strong></td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">Operations Director Feedback</span>
        <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
          "We were drowning in resumes and spending hours on phone screens. ServiceAgent eliminated all of that. Now we get pre-qualified candidates ready for final interviews. It's a game-changer for our hiring process."
          <br />
          <span className="block mt-2 text-right font-semibold">— David Rodriguez, Operations Director</span>
        </blockquote>
        <span className="text-blue-700 font-semibold underline mb-2 block">Key Achievements</span>
        <ul className={bullet}>
          <li>7 technician roles filled in 21 days</li>
          <li>68% reduction in time-to-hire</li>
          <li>87% reduction in administrative time</li>
          <li>100% elimination of manual resume screening</li>
          <li>45% improvement in hiring success rate</li>
          <li>Scalable process for future growth</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">The Bottom Line</span>
        <p className="mb-2 text-slate-800">
          For HVAC companies, hiring qualified technicians quickly is crucial for meeting customer demand and maintaining service quality. ServiceAgent provided this company with an efficient solution that accelerated their hiring process while dramatically reducing administrative burden.
        </p>
      </div>
    </div>
  );
} 