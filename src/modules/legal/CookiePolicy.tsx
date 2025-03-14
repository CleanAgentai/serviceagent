import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function CookiePolicy() {
  // Set meta title and description
  React.useEffect(() => {
    document.title = 'Cookie Policy - ServiceAgent AI';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'ServiceAgent AI Cookie Policy - Learn about how we use cookies and similar technologies.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-lg max-w-none bg-white rounded-xl shadow-sm p-8 sm:p-12">
          <h1>Cookie Policy</h1>
          <div className="text-sm text-gray-500 mb-8">
            <p>Effective Date: February 18, 2025</p>
            <p>Last Updated: February 19, 2025</p>
          </div>

          <p className="lead">
            This Cookie Policy explains how ServiceAgent, LLC ("Company," "we," "us," or "our") uses cookies and similar tracking technologies when you visit our website (https://www.serviceagent.ai) (the "Website"). This policy should be read in conjunction with our Privacy Policy.
          </p>

          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your device when you visit a website. They help us improve your browsing experience, track site usage, and personalize content. Cookies can be "session cookies" (which expire when you close your browser) or "persistent cookies" (which remain on your device for a set period or until you delete them).
          </p>

          <h2>2. How We Use Cookies</h2>
          <p>We use cookies and similar technologies for the following purposes:</p>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> Necessary for the functioning of our Website, such as enabling navigation and access to secure areas.
            </li>
            <li>
              <strong>Performance & Analytics Cookies:</strong> Help us analyze Website traffic, track visitor interactions, and improve functionality.
            </li>
            <li>
              <strong>Functional Cookies:</strong> Enhance user experience by remembering preferences, such as language or login details.
            </li>
            <li>
              <strong>Advertising & Marketing Cookies:</strong> Used to deliver relevant ads and measure the effectiveness of marketing campaigns.
            </li>
          </ul>

          <h2>3. Third-Party Cookies</h2>
          <p>
            We may allow third-party service providers, such as Google Analytics, to use cookies to collect data about how users interact with our Website. These third parties may use cookies for their own purposes in accordance with their privacy policies.
          </p>

          <h2>4. Managing Your Cookie Preferences</h2>
          <p>You can manage your cookie preferences in the following ways:</p>
          <ul>
            <li>
              <strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies through their settings.
            </li>
            <li>
              <strong>Opt-Out Tools:</strong> Some third-party services provide opt-out mechanisms for their cookies.
            </li>
            <li>
              <strong>Cookie Consent Banner:</strong> When you visit our Website, you may be given the option to accept or decline non-essential cookies.
            </li>
          </ul>
          <p>Please note that disabling certain cookies may impact your experience on our Website.</p>

          <h2>5. Changes to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of our Website after any changes constitutes acceptance of the revised policy.
          </p>

          <h2>6. Contact Us</h2>
          <div className="bg-gray-50 p-6 rounded-lg mt-8">
            <p className="font-medium mb-4">If you have any questions about this Cookie Policy, please contact us at:</p>
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