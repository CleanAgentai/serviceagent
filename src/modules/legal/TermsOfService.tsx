import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function TermsOfService() {
  // Set meta title and description
  React.useEffect(() => {
    document.title = 'Terms of Service - ServiceAgent AI';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'ServiceAgent AI Terms of Service - Read about our terms and conditions for using our services.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-lg max-w-none bg-white rounded-xl shadow-sm p-8 sm:p-12">
          <h1>Terms of Service</h1>
          <div className="text-sm text-gray-500 mb-8">
            <p>Effective Date: February 18, 2025</p>
            <p>Last Updated: February 19, 2025</p>
          </div>

          <p className="lead">
            Welcome to ServiceAgent AI, a service provided by ServiceAgent, LLC ("Company," "we," "us," or "our"). By accessing or using our website (https://www.serviceagent.ai) and services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use our Services.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By using our Services, you confirm that you have read, understood, and agreed to these Terms, as well as our Privacy Policy. If you are using our Services on behalf of an organization, you represent that you have the authority to bind that organization.
          </p>

          <h2>2. Use of Our Services</h2>
          <h3>A. Eligibility</h3>
          <p>You must be at least 18 years old to use our Services. By using our Services, you represent that you meet this requirement.</p>
          
          <h3>B. Account Registration</h3>
          <ul>
            <li>You may need to create an account to access certain features.</li>
            <li>You are responsible for maintaining the security of your account credentials.</li>
            <li>You must provide accurate and complete information when registering.</li>
            <li>You are responsible for all activities that occur under your account.</li>
          </ul>

          <h3>C. Prohibited Activities</h3>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Services for unlawful or fraudulent activities.</li>
            <li>Interfere with or disrupt the operation of our Services.</li>
            <li>Reverse engineer, decompile, or disassemble any part of our Services.</li>
            <li>Use bots, scripts, or automated methods to access our Services.</li>
          </ul>

          <h2>3. Payment & Subscription</h2>
          <ul>
            <li>Some features may require a paid subscription.</li>
            <li>Payments are billed on a recurring basis unless canceled.</li>
            <li>No refunds are provided for partial use of Services.</li>
            <li>We reserve the right to modify pricing with prior notice.</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            All content, logos, and trademarks on our Services are owned by ServiceAgent, LLC or its licensors.
            You may not copy, reproduce, or distribute any content from our Services without our prior written consent.
          </p>

          <h2>5. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account if you violate these Terms or engage in activities that may harm our Services or users. You may terminate your account at any time by discontinuing use of our Services.
          </p>

          <h2>6. Disclaimer of Warranties</h2>
          <p>
            Our Services are provided "as is" and "as available" without warranties of any kind.
            We do not guarantee that our Services will be error-free or uninterrupted.
            We are not responsible for any loss resulting from reliance on our Services.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law:</p>
          <ul>
            <li>ServiceAgent, LLC shall not be liable for any indirect, incidental, or consequential damages arising from your use of our Services.</li>
            <li>Our total liability in any claim related to the Services shall not exceed the amount you paid us in the past 12 months.</li>
          </ul>

          <h2>8. Indemnification</h2>
          <p>
            You agree to indemnify and hold ServiceAgent, LLC harmless from any claims, liabilities, damages, or expenses arising from your use of our Services or violation of these Terms.
          </p>

          <h2>9. Governing Law & Dispute Resolution</h2>
          <p>
            These Terms shall be governed by the laws of the State of Florida. Any disputes shall be resolved through binding arbitration in Florida, except for claims that may qualify for small claims court.
          </p>

          <h2>10. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of our Services after changes constitute acceptance of the revised Terms.
          </p>

          <h2>11. Contact Us</h2>
          <div className="bg-gray-50 p-6 rounded-lg mt-8">
            <p className="font-medium mb-4">If you have any questions about these Terms, please contact us at:</p>
            <address className="not-italic">
              <p className="font-bold">ServiceAgent, LLC</p>
              <p>209 Turner Street</p>
              <p>Clearwater, Florida 33756</p>
              <p>Email: <a href="mailto:support@serviceagent.ai">support@serviceagent.ai</a></p>
              <p>Phone: <a href="tel:+18137505308">813-750-5308</a></p>
            </address>
          </div>
        </article>
      </div>
    </div>
  );
} 