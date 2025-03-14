import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPolicy() {
  // Set meta title and description
  React.useEffect(() => {
    document.title = 'Privacy Policy - ServiceAgent AI';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'ServiceAgent AI Privacy Policy - Learn about how we protect and handle your data.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-lg max-w-none bg-white rounded-xl shadow-sm p-8 sm:p-12">
          <h1>Privacy Policy</h1>
          <div className="text-sm text-gray-500 mb-8">
            <p>Effective Date: February 18, 2025</p>
            <p>Last Updated: February 19, 2025</p>
          </div>

          <p className="lead">
            Welcome to ServiceAgent AI, a service provided by ServiceAgent, LLC ("Company," "we," "us," or "our"). We respect your privacy and are committed to protecting it through this Privacy Policy.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (https://www.serviceagent.ai) (the "Website") and use our services (collectively, the "Services"). Please read this policy carefully to understand our views and practices regarding your personal data and how we will treat it.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We collect several types of information from and about users of our Website and Services, including:</p>
          
          <h3>A. Information You Provide to Us</h3>
          <ul>
            <li><strong>Account Information:</strong> When you sign up for our Services, we collect personal details such as your name, email address, phone number, company name, and payment details.</li>
            <li><strong>Communications:</strong> If you contact us, we may collect information such as your name, email address, and any other details you provide.</li>
            <li><strong>Content You Submit:</strong> If you provide feedback, testimonials, or other content, we may collect this information.</li>
          </ul>

          <h3>B. Information Collected Automatically</h3>
          <ul>
            <li><strong>Usage Data:</strong> We may collect information about your interactions with our Website, such as IP address, browser type, operating system, referring URLs, pages viewed, and the dates/times of visits.</li>
            <li><strong>Cookies & Tracking Technologies:</strong> We use cookies, beacons, and similar technologies to enhance user experience and analyze Website traffic.</li>
          </ul>

          <h3>C. Information from Third Parties</h3>
          <p>We may receive data from third-party service providers, business partners, and publicly available sources.</p>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To provide, maintain, and improve our Services.</li>
            <li>To personalize your experience and deliver relevant content.</li>
            <li>To process payments and manage subscriptions.</li>
            <li>To communicate with you, including responding to inquiries and sending updates.</li>
            <li>To detect, prevent, and address security issues, fraud, and abuse.</li>
            <li>To comply with legal obligations and enforce our terms.</li>
          </ul>

          <h2>3. Sharing and Disclosure of Information</h2>
          <p>We do not sell your personal information. However, we may share information in the following circumstances:</p>
          <ul>
            <li><strong>With Service Providers:</strong> We may share your information with third-party vendors who help us operate our business (e.g., payment processors, hosting providers, analytics services).</li>
            <li><strong>For Legal Compliance:</strong> We may disclose information to comply with legal obligations, protect our rights, or respond to legal requests.</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, sale, or acquisition, your information may be transferred as part of the transaction.</li>
            <li><strong>With Your Consent:</strong> We may share information with third parties when we have your explicit consent.</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>We take reasonable measures to protect your information from unauthorized access, loss, misuse, or alteration. However, no data transmission or storage can be guaranteed 100% secure. If you believe your information has been compromised, please contact us immediately.</p>

          <h2>5. Your Rights & Choices</h2>
          <p>Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul>
            <li><strong>Access & Correction:</strong> You can request access to your data and correct inaccuracies.</li>
            <li><strong>Deletion:</strong> You may request that we delete your personal information.</li>
            <li><strong>Opt-Out:</strong> You can opt out of marketing emails by following the unsubscribe link.</li>
            <li><strong>Cookies:</strong> You can manage cookie preferences through your browser settings.</li>
          </ul>
          <p>To exercise these rights, please contact us at support@serviceagent.ai.</p>

          <h2>6. Retention of Information</h2>
          <p>We retain personal data only as long as necessary for the purposes outlined in this Privacy Policy unless a longer retention period is required by law.</p>

          <h2>7. Third-Party Links & Services</h2>
          <p>Our Website may contain links to third-party sites. We are not responsible for the privacy practices of these external sites. We encourage users to review their privacy policies.</p>

          <h2>8. Children's Privacy</h2>
          <p>Our Services are not intended for individuals under 18. We do not knowingly collect personal data from children. If we become aware of such collection, we will take steps to delete the information.</p>

          <h2>9. International Data Transfers</h2>
          <p>If you are accessing our Website from outside the United States, please be aware that your information may be transferred to, stored, and processed in the U.S. By using our Services, you consent to this transfer.</p>

          <h2>10. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage users to review this policy periodically.</p>

          <h2>11. Contact Us</h2>
          <div className="bg-gray-50 p-6 rounded-lg mt-8">
            <p className="font-medium mb-4">If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
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