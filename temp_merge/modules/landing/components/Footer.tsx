import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
  ],
  company: [
    { label: 'About Us', href: '/about-us' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
  ],
};

const socialLinks = [
  { 
    icon: Linkedin, 
    href: 'https://www.linkedin.com/company/cleanagent-ai/?viewAsMember=true', 
    label: 'LinkedIn' 
  },
  { 
    icon: Facebook, 
    href: 'https://www.facebook.com/profile.php?id=61572125470196', 
    label: 'Facebook' 
  },
  { 
    icon: Twitter, 
    href: 'https://x.com/cleanagentai', 
    label: 'Twitter' 
  },
];

const contactInfo = [
  { icon: Mail, text: 'support@cleanagent.ai', href: 'mailto:support@cleanagent.ai' },
  { icon: Phone, text: '(813) 750-5308', href: 'tel:+18137505308' },
  { icon: MapPin, text: '209 Turner Street, Clearwater, FL 33756', href: 'https://maps.google.com/?q=209+Turner+Street,+Clearwater,+FL+33756' },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold">
                <span className="text-blue-600">Clean</span>
                <span className="text-blue-600">Agent</span>
              </span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-sm">
              AI-powered automation for cleaning businesses. Save time, reduce costs, and grow your business with CleanAgent.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 lg:col-span-3">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info) => (
              <a
                key={info.text}
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <info.icon className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="text-sm">{info.text}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} CleanAgent. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Do Not Sell My Info
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Accessibility
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Region:</span>
                <select className="text-sm text-gray-600 bg-transparent border-none focus:ring-0 cursor-pointer">
                  <option value="us">United States</option>
                  <option value="eu">Europe</option>
                  <option value="uk">United Kingdom</option>
                  <option value="ca">Canada</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 