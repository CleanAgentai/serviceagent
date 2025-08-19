import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { openCalendly } from "@/app/shared/utils/calendly";

const footerLinks = {
  product: [
    { label: "Features", href: "/#hiring-agent-features-grid" },
    { label: "Sign up now", href: "/signup" },
    { label: "Book a Demo", onClick: openCalendly },
  ],
  company: [
    { label: "About Us", href: "/about-us" },
    // { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/cleanagent-ai/?viewAsMember=true",
    label: "LinkedIn",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=61572125470196",
    label: "Facebook",
  },
  {
    icon: Twitter,
    href: "https://x.com/cleanagentai",
    label: "Twitter",
  },
];

export function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleLinkClick = (href?: string) => {
    if (href?.startsWith("/#") && isHomePage) {
      const sectionId = href.replace("/#", "");
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  };

  const renderLink = (link: {
    label: string;
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
  }) => {
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

    if (link.href?.startsWith("http")) {
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

    if (link.href?.startsWith("/#") && isHomePage) {
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
        to={link.href || "/"}
        onClick={() => handleLinkClick(link.href)}
        className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
      >
        {link.label}
      </Link>
    );
  };

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="mx-auto px-24 lg:px-48">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          <div className="md:w-1/2">
            <div className="text-2xl font-bold mb-4">ServiceAgent</div>
            <p className="text-slate-400 mb-6 max-w-md">
              ServiceAgent helps you hire faster by doing the interviews for you.
            </p>
            <div className="flex space-x-4">
              <a href="https://x.com/porter2301" className="text-slate-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/cleanagent-ai/?viewAsMember=true" className="text-slate-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col md:flex-row md:justify-end md:space-x-16 space-y-8 md:space-y-0">
            <div>
              <h3 className="max-md:text-left font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Reviews</a></li>
                <li><a href="https://calendly.com/serviceagent/25min" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Book a Demo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="max-md:text-left font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                </ul>
              </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
          <p>&copy; 2025 ServiceAgent. All rights reserved. | fsagent.com</p>
        </div>
      </div>
    </footer>
  );
}
