// import React, { useState, useRef, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ArrowRight, Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { openCalendly } from "@/app/shared/utils/calendly";

// export function Navigation({ isNavVisible = true }: { isNavVisible?: boolean }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isSignIn = location.pathname === "/login" || location.pathname === "/signin";
//   const isSignUp = location.pathname === "/signup";
//   const isPostSignup = location.pathname === "/post-signup";
//   const isPlanOnboarding = location.pathname === "/plan-onboarding";
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [industriesOpen, setIndustriesOpen] = useState(false);
//   const industriesRef = useRef<HTMLDivElement>(null);

//   // Close dropdown on outside click
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (industriesRef.current && !industriesRef.current.contains(event.target as Node)) {
//         setIndustriesOpen(false);
//       }
//     }
//     if (industriesOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [industriesOpen]);

//   // Auto-close mobile menu when resizing to desktop
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setMobileMenuOpen(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <nav className={`fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-white/90 via-white/95 to-white/90 backdrop-blur-xl border-b border-slate-200/30 shadow-lg transition-transform duration-300 ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}>
//       {/* Additional gradient overlay for depth */}
//       <div className="absolute inset-0 bg-gradient-to-r from-[#A1E3FF]/5 via-transparent to-[#0E7CFF]/5 pointer-events-none"></div>
//       <div className="relative mx-auto max-w-7xl lg:max-w-full px-2 sm:px-6 lg:px-12">
//         <div className="flex items-center justify-start h-24 md:h-20">
//           <div className="flex items-center">
//             <Link to="/" aria-label="ServiceAgent Home" className="flex items-center min-w-32">
//             <img
//               src="/Banner_SA_new.svg"
//               alt="ServiceAgent Logo"
//               className="block w-3/4 md:w-full sm:h-6 md:h-20 transition-all duration-200"
//             />
//           </Link>
//           </div>
//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center md:flex-1 ml-2 md:ml-4">
//             <div className="flex items-center justify-end space-x-4 lg:space-x-6 xl:space-x-8 w-full text-lg md:text-xl">
//             <button onClick={() => handleScrollTo("features")} className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group bg-transparent border-none outline-none cursor-pointer">
//               Features
//               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
//             </button>
//             <button onClick={() => handleScrollTo("demo")} className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group bg-transparent border-none outline-none cursor-pointer">
//               Tour
//               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
//             </button>
//             {/* Industries Dropdown */}
//             <div className="relative" ref={industriesRef}>
//               <button
//                 className="text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 relative group bg-transparent border-none outline-none cursor-pointer flex items-center"
//                 onClick={() => setIndustriesOpen((open) => !open)}
//                 aria-expanded={industriesOpen}
//                 aria-haspopup="true"
//                 type="button"
//               >
//                 Industries
//                 <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0E7CFF] to-[#A1E3FF] group-hover:w-full transition-all duration-300"></span>
//               </button>
//               {industriesOpen && (
//                 <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 z-50" style={{top: '100%'}}>
//                   <ul className="py-2">
//                     {[
//                       { label: 'Residential Cleaning', path: '/industries/residential-cleaning' },
//                       { label: 'Commercial Cleaning', path: '/industries/commercial-cleaning' },
//                       { label: 'HVAC', path: '/industries/hvac' },
//                       { label: 'Plumbing', path: '/industries/plumbing' },
//                       { label: 'Landscaping', path: '/industries/landscaping' },
//                       { label: 'Pest Control', path: '/industries/pest-control' },
//                       { label: 'Franchises', path: '/industries/franchises' },
//                       { label: 'Staffing', path: '/industries/staffing' },
//                       { label: 'Outsourcing Firms', path: '/industries/outsourcing-firms' },
//                       { label: 'Restaurants', path: '/industries/restaurants' },
//                       { label: 'Hospitality', path: '/industries/hospitality' },
//                     ].map((item) => (
//                       <li key={item.path}>
//                         <Link
//                           to={item.path}
//                           className="block px-5 py-2 text-slate-700 hover:bg-blue-50 hover:text-[#0E7CFF] transition-all duration-200 rounded-lg"
//                           onClick={() => setIndustriesOpen(false)}
//                         >
//                           {item.label}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>

//           {/* Mobile Navigation - Burger/X toggle */}
//           <div className="md:hidden flex items-center">
            
//             <button
//               aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
//               className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0E7CFF]"
//               onClick={() => setMobileMenuOpen((open) => !open)}
//             >
//               {mobileMenuOpen ? (
//                 <X className="h-8 w-8 text-[#0E7CFF] transition-all duration-200" />
//               ) : (
//                 <Menu className="h-8 w-8 text-[#0E7CFF] transition-all duration-200" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* Mobile Menu Dropdown */}
//       {mobileMenuOpen && (
//         <div className={`md:hidden fixed left-0 right-0 top-24 z-[10001] flex justify-center transition-all duration-300 opacity-100 translate-y-0 pointer-events-auto`}
//           style={{ willChange: 'transform, opacity' }}>
//           <div className="bg-white rounded-b-2xl p-8 w-full max-w-[600px] flex flex-col items-center space-y-10 max-h-[80vh] overflow-y-auto" style={{ boxShadow: 'none', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
//             <button onClick={openCalendly} className="text-xl font-bold text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 w-full text-center">Get A Demo</button>
//             <button onClick={() => handleScrollTo("demo")} className="text-xl font-bold text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 w-full text-center">Tour</button>
//             <button onClick={() => handleScrollTo("pricing")} className="text-xl font-bold text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 w-full text-center">Pricing</button>
//             {!isSignIn && (
//               <Link to="/signin" className="text-xl font-bold text-slate-700 hover:text-[#0E7CFF] transition-all duration-300 w-full text-center" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
//             )}
//             <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
//               <Button className="w-full bg-gradient-to-r bg-blue-600 hover:bg-purple-400 text-white transition-all duration-300 rounded-full px-8 py-4 text-xl font-bold mt-2">
//                 Start Free Trial
//               </Button>
//             </Link>
            
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Zap, Sparkles, ArrowRight, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { openCalendly } from "@/app/shared/utils/calendly";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Navigation({ isNavVisible = true }: { isNavVisible?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const location = useLocation();
  const navigate = useNavigate();
  const isSignIn = location.pathname === "/login" || location.pathname === "/signin";
  const isSignUp = location.pathname === "/signup";
  const isPostSignup = location.pathname === "/post-signup";
  const isPlanOnboarding = location.pathname === "/plan-onboarding";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const industriesRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (industriesRef.current && !industriesRef.current.contains(event.target as Node)) {
        setIndustriesOpen(false);
      }
    }
    if (industriesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [industriesOpen]);
  
    // Auto-close mobile menu when resizing to desktop
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 768) {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    // Only render nav on allowed pages
    if (isPostSignup || isPlanOnboarding) return null;
  
    // Helper for smooth scroll
    const handleScrollTo = (id: string) => {
      setMobileMenuOpen(false);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          // If not on landing, go home and scroll after navigation
          navigate(`/#${id}`);
          setTimeout(() => {
            const el2 = document.getElementById(id);
            if (el2) el2.scrollIntoView({ behavior: "smooth" });
          }, 500);
        }
      }, 100);
    };

  return (
    <div
    className={`fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-sm transition-transform duration-300 ${
      isNavVisible ? "translate-y-0" : "-translate-y-full"
    }`}
  >
      <div className="px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left Aligned */}
          <motion.a
            href="#"
            className="flex items-center group cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="flex items-center justify-center gap-3">
              <Link to="/" aria-label="ServiceAgent Home" className="flex items-center">
                <img
                  src="/logos/Brandmark_transparent.png"
                  alt="ServiceAgent Logo"
                  className="block w-8 h-8 transition-all duration-200"
                />
              <span className="text-xl font-bold text-primary group-hover:text-gold transition-colors duration-300 ml-2">
                ServiceAgent
                <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-gold to-teal transition-all duration-500 rounded-full"></div>
              </span>
              </Link>
            </div>
          </motion.a>
          
          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex flex-1 items-center justify-center space-x-2">
            {[
              { name: "How It Works", href: "howitworks", delay: 0.1 },
              { name: "Features", href: "stats", delay: 0.15 },
              { name: "Pricing", href: "pricing", delay: 0.2 },
              { name: "Industries", href: "industries", delay: 0.25 },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item.delay }}
                className="relative group"
              >
                <button 
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 rounded-lg hover:bg-primary/5"
                  onClick={(e) => handleScrollTo(item.href)}
                >
                  {item.name}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-8 h-0.5 bg-gradient-to-r from-teal to-gold transition-all duration-300 rounded-full"></div>
                </button>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA Buttons - Right Aligned */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Login */}
            {!isSignIn && (
            <Link to="/signin">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-accent hover:bg-accent/10 font-medium transition-all duration-300"
              >
                Login
              </Button>
            </motion.div>
            </Link>
            )}
            {/* Get Demo */}  
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="group"
            >
              <a 
                href="https://calendly.com/serviceagent/25min"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-teal/30 text-teal font-medium transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal/20"
                >
                  <div className="flex items-center gap-2">
                    Get a Demo
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Button>
              </a>
            </motion.div>

            {/* Start for Free - Exciting Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-gold via-terracotta to-teal rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              <Button 
                size="sm"
                className="relative bg-gradient-to-r from-gold to-gold/90 hover:from-terracotta hover:to-terracotta/90 text-white px-6 py-2.5 text-sm font-bold rounded-lg shadow-lg shadow-gold/30 hover:shadow-terracotta/40 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Link to="/signup">
                <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 group-hover:animate-pulse" />
                    Start for Free
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-80"></div>
                </div>
                  </Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="lg:hidden relative p-2 rounded-lg hover:bg-primary/10 transition-colors duration-300" 
            onClick={toggleMenu} 
            aria-label={isOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-primary" />
            )}
          </motion.button>
      </div>

      {/* Enhanced Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed left-0 right-0 top-20 bottom-0 z-50 lg:hidden bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >

            {/* Mobile Menu Content - Single Scrollable Container */}
            <div className="relative h-full w-full">

              {/* Single Connected Menu Container */}
              <div className="top-24 h-[calc(100vh-100px)] overflow-y-auto">
                <div className="bg-background border border-border rounded-none overflow-hidden">
                  {/* Navigation Links */}
                  {[
                    { name: "How It Works", href: "howitworks" },
                    { name: "Features", href: "stats" },
                    { name: "Pricing", href: "pricing" },
                    { name: "Industries", href: "industries" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <button
                        className="w-full flex items-center justify-between p-6 bg-background border-b border-border text-foreground transition-colors duration-200 active:bg-muted"
                        onClick={(e) => {
                          e.preventDefault();
                          handleScrollTo(item.href);
                          toggleMenu();
                        }}
                      >
                        <span className="text-lg font-medium">
                          {item.name}
                        </span>
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </motion.div>
                  ))}

                  {/* Connected CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    
                    <Button 
                      className="w-full h-16 bg-gradient-to-r from-gold to-terracotta text-white text-lg font-bold border-b border-border rounded-none"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/signup")
                        toggleMenu();
                      }}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <Zap className="w-4 h-4" />
                        Start for Free
                        <Sparkles className="w-5 h-5" />
                      </div>
                    </Button>
                  
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <a 
                      href="https://calendly.com/serviceagent/25min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button 
                        variant="ghost" 
                        className="w-full h-16 text-teal bg-background rounded-none text-lg font-semibold" 
                      >
                        <div className="flex items-center justify-center gap-3">
                          <Video className="w-4 h-4" />
                          Get a Demo
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </Button>
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button 
                      className="w-full h-16 text-white bg-primary rounded-none font-medium border-0 text-lg" 
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/login")
                        toggleMenu();
                      }}
                    >
                      Login
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
  )
}
