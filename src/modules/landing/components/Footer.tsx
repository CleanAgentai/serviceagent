import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import { openCalendly } from '@/app/shared/utils/calendly';

const footerLinks = {
  product: [
    { label: 'Features', href: '/#complete-ai-solution' },
    { label: 'Book a Demo', onClick: openCalendly },
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

export function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleLinkClick = (href?: string) => {
    if (href?.startsWith('/#') && isHomePage) {
      const sectionId = href.replace('/#', '');
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  };

  const renderLink = (link: { label: string; href?: string; onClick?: (e: React.MouseEvent) => void }) => {
    if (link.onClick) {
      return (
        <button
          onClick={link.onClick}
          className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
        >
          {link.label}
        </button>
      );
    }

    if (link.href?.startsWith('http')) {
      return (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
        >
          {link.label}
        </a>
      );
    }

    if (link.href?.startsWith('/#') && isHomePage) {
      return (
        <button
          onClick={() => handleLinkClick(link.href)}
          className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
        >
          {link.label}
        </button>
      );
    }

    return (
      <Link
        to={link.href || '/'}
        onClick={() => handleLinkClick(link.href)}
        className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
      >
        {link.label}
      </Link>
    );
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4" onClick={() => handleLinkClick()}>
              <img
                src="/serviceagent-logo.svg"
                alt="ServiceAgent Logo"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-600 mb-6 max-w-sm">
              AI-powered automation for service businesses. Save time, reduce costs, and grow your business with ServiceAgent.
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
                      {renderLink(link)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 