import React from 'react';

const tableClass =
  'w-full border-collapse my-6 text-sm md:text-base shadow-sm rounded-lg overflow-hidden';
const thClass =
  'bg-blue-50 text-blue-900 font-semibold px-4 py-2 border border-blue-100 text-left';
const tdClass = 'px-4 py-2 border border-blue-100 text-slate-800';
const bullet = 'list-disc ml-6 mb-2 text-slate-700';

export default function Restaurants() {
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
          How a Restaurant Chain Reduced Turnover by 65% and Cut Hiring Time by
          70% with AI Screening
        </h1>
        <p className="text-lg text-slate-700 mb-6">
          By automating their hiring process with ServiceAgent, this restaurant
          chain filled 45 positions across 8 locations in just 2 weeks while
          dramatically improving employee retention and reducing management
          workload.
        </p>
      </div>

      {/* Article content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">
          Overview
        </span>
        <p className="mb-2 text-slate-800">
          A growing restaurant chain with 8 locations was struggling with high
          employee turnover and slow hiring processes. They needed to fill 45
          positions quickly but traditional hiring methods were too slow and
          resulted in poor retention.
        </p>
        <p className="mb-2 text-slate-800">
          After implementing ServiceAgent, they filled all 45 positions in 2
          weeks, reduced turnover by 65%, and cut hiring time by 70%.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">
          The Problem
        </span>
        <p className="mb-2 text-slate-800">
          The restaurant chain faced several critical challenges:
        </p>
        <ul className={bullet}>
          <li>High employee turnover rate (45%)</li>
          <li>Manual screening taking 15+ hours per week per location</li>
          <li>Slow hiring process (12+ days average)</li>
          <li>Poor candidate quality leading to quick exits</li>
          <li>Managers overwhelmed with hiring tasks</li>
        </ul>
        <p className="mb-2 text-slate-800">
          They needed a{' '}
          <span className="font-bold">faster, more effective way</span> to
          identify and hire reliable restaurant staff.
        </p>
        <hr className="my-8 border-blue-200" />
        <span className="text-blue-700 font-semibold underline mb-2 block">
          The ServiceAgent Solution
        </span>
        <p className="mb-2 text-slate-800">
          ServiceAgent was implemented across all 8 locations with
          restaurant-specific screening:
        </p>
        <ul className={bullet}>
          <li>Automated video interviews for all applicants</li>
          <li>AI scoring based on restaurant experience and reliability</li>
          <li>Personality and work ethic assessment</li>
          <li>Automated scheduling for qualified candidates</li>
          <li>Integration with existing HR systems</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">
          2-Week Results
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
              <td className={tdClass}>3.6 days</td>
              <td className={tdClass}>70% faster</td>
            </tr>
            <tr>
              <td className={tdClass}>Admin Time per Week</td>
              <td className={tdClass}>120 hours</td>
              <td className={tdClass}>24 hours</td>
              <td className={tdClass}>80% reduction</td>
            </tr>
            <tr>
              <td className={tdClass}>Employee Turnover</td>
              <td className={tdClass}>45%</td>
              <td className={tdClass}>16%</td>
              <td className={tdClass}>65% reduction</td>
            </tr>
            <tr>
              <td className={tdClass}>Hiring Success Rate</td>
              <td className={tdClass}>60%</td>
              <td className={tdClass}>95%</td>
              <td className={tdClass}>35% improvement</td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">
          Location Impact
        </span>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Location</th>
              <th className={thClass}>Positions Filled</th>
              <th className={thClass}>Time Saved</th>
              <th className={thClass}>Quality Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdClass}>Downtown</td>
              <td className={tdClass}>8</td>
              <td className={tdClass}>18 hours</td>
              <td className={tdClass}>9.1/10</td>
            </tr>
            <tr>
              <td className={tdClass}>Mall Location</td>
              <td className={tdClass}>6</td>
              <td className={tdClass}>15 hours</td>
              <td className={tdClass}>8.9/10</td>
            </tr>
            <tr>
              <td className={tdClass}>Airport</td>
              <td className={tdClass}>7</td>
              <td className={tdClass}>16 hours</td>
              <td className={tdClass}>9.0/10</td>
            </tr>
            <tr>
              <td className={tdClass}>Suburban</td>
              <td className={tdClass}>5</td>
              <td className={tdClass}>12 hours</td>
              <td className={tdClass}>8.8/10</td>
            </tr>
            <tr>
              <td className={tdClass}>
                <strong>Total (8 locations)</strong>
              </td>
              <td className={tdClass}>
                <strong>45</strong>
              </td>
              <td className={tdClass}>
                <strong>121 hours</strong>
              </td>
              <td className={tdClass}>
                <strong>9.0/10 avg</strong>
              </td>
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
              <th className={thClass}>Monthly Savings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdClass}>Admin Time (384 hours × $20/hr)</td>
              <td className={tdClass}>$7,680</td>
            </tr>
            <tr>
              <td className={tdClass}>Reduced Turnover Costs</td>
              <td className={tdClass}>$5,400</td>
            </tr>
            <tr>
              <td className={tdClass}>Faster Revenue Generation</td>
              <td className={tdClass}>$3,600</td>
            </tr>
            <tr>
              <td className={tdClass}>ServiceAgent Cost</td>
              <td className={tdClass}>-$479</td>
            </tr>
            <tr>
              <td className={tdClass}>
                <strong>Net Monthly Savings</strong>
              </td>
              <td className={tdClass}>
                <strong>$16,201</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <span className="text-blue-700 font-semibold underline mb-2 block">
          Operations Manager Feedback
        </span>
        <blockquote className="italic text-slate-700 border-l-4 border-blue-300 pl-4 my-4">
          "The turnover was killing our business. We'd hire someone and they'd
          quit within a month. ServiceAgent helped us identify candidates who
          are actually committed to the work. Our retention has never been
          better."
          <br />
          <span className="block mt-2 text-right font-semibold">
            — David Rodriguez, Operations Manager
          </span>
        </blockquote>
        <span className="text-blue-700 font-semibold underline mb-2 block">
          Key Achievements
        </span>
        <ul className={bullet}>
          <li>45 positions filled across 8 locations in 2 weeks</li>
          <li>70% reduction in time-to-hire</li>
          <li>80% reduction in administrative time</li>
          <li>65% reduction in employee turnover</li>
          <li>35% improvement in hiring success rate</li>
          <li>Scalable process for future growth</li>
        </ul>
        <span className="text-blue-700 font-semibold underline mb-2 block">
          The Bottom Line
        </span>
        <p className="mb-2 text-slate-800">
          For restaurant chains, hiring reliable staff who stay with the company
          is crucial for maintaining service quality and profitability.
          ServiceAgent provided this company with an efficient solution that not
          only accelerated their hiring process but also significantly improved
          employee retention.
        </p>
      </div>
    </div>
  );
}
