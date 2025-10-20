import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Linkedin, Flag, BookOpen, ArrowRight } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleScrollTo = (id: string) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        // If not on landing, go home and scroll after navigation
        navigate('/');
        setTimeout(() => {
          const el2 = document.getElementById(id);
          if (el2) el2.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    }, 100);
  };

  // Helper for navigation
  const handleNavigation = (href: string) => {
    if (location.pathname === "/about-us") {
      navigate("/");
      handleScrollTo(href);
    }
    if (href === "demo") {
      navigate("/");
      handleScrollTo("demo");
    } else {
      handleScrollTo(href);
    }
  };

  const handleStartForFree = () => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  return (
    <footer className="relative bg-gradient-to-b from-card/30 to-background border-t border-border/30 py-16 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-teal/2 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold/2 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Side - Brand Section */}
          <div 
            className="space-y-6 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            <div className="space-y-4">
              <div className="text-3xl font-bold text-primary"
              style={{ fontFamily: '"Inter Variable", sans-serif' }}>
                ServiceAgent
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                AI-powered hiring platform that conducts interviews, scores candidates, and saves you hours of time so you can hire the best talent faster.
              </p>
            </div>
            
            {/* Social */}
            <div className="flex items-center gap-6">
              <a 
                href="https://www.linkedin.com/company/serviceagent-ai/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer" 
                className="group flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal/10 to-gold/10 hover:from-teal/20 hover:to-gold/20 rounded-xl border border-teal/20 hover:border-gold/30 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-6 h-6 text-teal group-hover:text-gold transition-colors" />
              </a>
            </div>
            
          </div>

          {/* Right Side - Navigation Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Navigation */}
            <div 
              className="space-y-4 opacity-0 animate-fade-in"
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              <h4 className="text-lg font-bold text-foreground border-b border-teal/20 pb-2">
                Platform
              </h4>
              <nav className="space-y-3">
                <button 
                  className="block text-left text-muted-foreground hover:text-teal transition-all duration-200 hover:translate-x-1"
                  onClick={() => handleNavigation("howitworks")}
                >
                  How It Works
                </button>
                <button 
                  className="block text-left text-muted-foreground hover:text-teal transition-all duration-200 hover:translate-x-1"
                  onClick={() => handleNavigation("features")}
                >
                  Features
                </button>
                <button 
                  className="block text-left text-muted-foreground hover:text-gold transition-all duration-200 hover:translate-x-1"
                  onClick={() => handleNavigation("pricing")}
                >
                  Pricing
                </button>
                <button 
                  className="block text-left text-muted-foreground hover:text-terracotta transition-all duration-200 hover:translate-x-1"
                  onClick={() => handleNavigation("industries")}
                >
                  Industries
                </button>
              </nav>
            </div>

            {/* Company */}
            <div 
              className="space-y-4 opacity-0 animate-fade-in"
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
            >
              <h4 className="text-lg font-bold text-foreground border-b border-gold/20 pb-2">
                Company
              </h4>
              <nav className="space-y-3">
              <Link to="/about-us" className="block text-muted-foreground hover:text-gold transition-all duration-200 hover:translate-x-1">
                  About Us
                </Link>
                <Link to="/blog" className="block text-muted-foreground hover:text-gold transition-all duration-200 hover:translate-x-1">
                  Blog
                </Link>
                <a href="https://calendly.com/serviceagent/strategy-call" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-gold transition-all duration-200 hover:translate-x-1">
                  Get a Demo
                </a>
                <button 
                  className="block text-left text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-x-1"
                  onClick={handleStartForFree}
                >
                  Start for Free
                </button>
              </nav>
            </div>

            {/* Legal & Resources */}
            <div 
              className="space-y-4 opacity-0 animate-fade-in"
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
            >
              <h4 className="text-lg font-bold text-foreground border-b border-terracotta/20 pb-2">
                Legal
              </h4>
              <nav className="space-y-3">
                <Link to="/privacy-policy" className="block text-muted-foreground hover:text-teal transition-all duration-200 hover:translate-x-1">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="block text-muted-foreground hover:text-gold transition-all duration-200 hover:translate-x-1">
                  Terms of Service
                </Link>
                <Link to="/cookie-policy" className="block text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-x-1">
                  Cookie Policy
                </Link>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Blog Section - Only show if not on blog route */}
        {location.pathname !== '/blog' && (
          <div 
            className="bg-gradient-to-r from-teal/5 via-gold/5 to-terracotta/5 rounded-2xl p-8 mb-12 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal/20 to-gold/20 rounded-xl border border-teal/30">
                  <BookOpen className="w-6 h-6 text-teal" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    Check Out Our Blog
                  </h3>
                  <p className="text-muted-foreground">
                    Latest insights on AI hiring, recruitment trends, and industry best practices
                  </p>
                </div>
              </div>
              <Link 
                to="/blog"
                className="group flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <span className="font-semibold">Read Articles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        )}
        
        {/* Bottom Section */}
        <div 
          className="border-t border-gradient-to-r from-teal/20 via-gold/20 to-terracotta/20 pt-8 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-muted-foreground text-sm">
                © 2025 ServiceAgent. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Flag className="w-3 h-3 text-gold" />
                  <span>Made in USA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };