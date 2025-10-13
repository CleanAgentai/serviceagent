import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Quote, Users, Target, Zap, Heart, Building2, Wrench, Sparkles, ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function AboutUs() {
  // Set meta title and description and scroll to top
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About Us - ServiceAgent";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Learn about ServiceAgent's mission to empower service businesses with AI-powered hiring tools. Read Porter Stanley's founder letter and discover how we're changing hiring for America's backbone businesses."
      );
    }
  }, []);

  const navigate = useNavigate();

  // Helper for smooth scroll
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
    if (href === "demo") {
      navigate("/");
      handleScrollTo("demo");
    } else {
      handleScrollTo(href);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto py-20 bg-gradient-to-br from-blue-50 via-white to-teal-50">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full mb-8 shadow-lg">
              <Lightbulb className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Mission
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              To empower the backbone of America by giving service businesses the tools to hire faster, hire better, and finally scale without being crippled by turnover.
            </p>
          </div>
        </div>
      </div>

      {/* Founder's Letter Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              A Letter From Our Founder
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-600">
              <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center border-4 border-teal/70">
                <img 
                  src="/Porter_AboutUs.JPG" 
                  alt="Porter Stanley" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-900">Porter Stanley</h3>
                <p className="text-sm text-gray-500">Founder & CEO, ServiceAgent</p>
              </div>
            </div>
          </div>

          {/* Pull Quote */}
          <div className="bg-gradient-to-br from-card to-gold/10 border-l-4 border-gold p-6 mb-8 rounded-r-lg">
            <Quote className="w-8 h-8 text-gold mb-4" />
            <blockquote className="text-lg md:text-xl font-medium text-gray-700 italic">
              "What should have been a moment of growth for the business became a drain on my time and energy."
            </blockquote>
          </div>

          {/* Letter Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-6">
              My name is Porter Stanley and I am the founder and CEO of ServiceAgent. 
              I know firsthand how painful hiring can be because I lived it. 
              Before starting ServiceAgent, I launched a commercial cleaning business. 
              In just a few months we grew from zero to twenty five employees. 
              Growth was exciting but the hardest part was not landing new contracts or managing operations. 
              It was hiring.
            </p>

            <p className="mb-6">
              I spent more than twenty five hours interviewing thirty five people just to fill a single role. 
              Most applicants were not qualified. Many never showed up at all. 
              The person I finally hired quit before their first day. 
              Meanwhile, job boards filled my inbox with resumes that had no real connection to the work we needed done. 
              The process was exhausting and broken.
            </p>

            <p className="mb-6">
              What should have been a moment of growth for the business became a drain on my time and energy. 
              That experience stayed with me. I realized that if I was struggling this much with hiring, 
              thousands of other business owners were going through the exact same pain. 
              Owners who are already stretched thin, wearing every hat, and doing whatever it takes to 
              keep their companies alive. I knew there had to be a better way.
            </p>

            <p className="mb-6">
              That was the beginning of ServiceAgent. We built an AI Hiring Assistant designed specifically for service businesses. 
              Instead of wasting hours chasing candidates, our system interviews every applicant instantly through chat and video, scores them from one to ten, 
              and creates a ranked shortlist with transcripts and clips. Business owners only need to review the best candidates, saving 15+ hours for every hire. 
              More importantly, they get people who actually show up and stick.
            </p>

            <p className="mb-6">
            But ServiceAgent is not just about efficiency. It is about giving small and mid sized businesses the same hiring edge that large companies have with advanced technology. 
            These businesses are the backbone of America. They clean our buildings, repair our homes, maintain our communities, and create millions of jobs. 
            Yet they have been left behind when it comes to modern tools.
            </p>

            <p className="mb-6">
            Our mission is to change that. We want to level the playing field so that America's businesses can hire with confidence, grow with stability, and finally scale without being crippled by constant turnover. 
            We believe that when service businesses thrive, local communities thrive, and the country as a whole becomes stronger.
            </p>

            <p className="mb-8">
              Thank you for taking the time to learn about us. ServiceAgent exists to serve you, the business owner, and to make sure that hiring is no longer the thing holding you back.
            </p>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-600 mb-2">Sincerely,</p>
              <p className="text-lg font-semibold text-gray-900">Porter Stanley</p>
              <p className="text-gray-600">Founder and CEO, ServiceAgent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why We Exist
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Service businesses are the backbone of America, yet they've been left behind when it comes to modern hiring tools.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">The Backbone of America</h3>
              <p className="text-gray-600">
                Service businesses clean our buildings, repair our homes, maintain our communities, and create millions of jobs. They deserve the same advanced technology that large companies have.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-teal-200 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Level the Playing Field</h3>
              <p className="text-gray-600">
                We give small and mid-sized businesses the same hiring edge that large companies have with AI-powered technology designed specifically for service industries.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Stronger Communities</h3>
              <p className="text-gray-600">
                When service businesses thrive, local communities thrive, and the country as a whole becomes stronger. We're building tools that make this vision a reality.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Join Us in Changing Hiring
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Hiring doesn't have to hold your business back. <br />
            ServiceAgent is here to help you grow with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup">
              <Button 
                size="lg"
                className="group bg-gradient-to-r from-gold to-gold/90 hover:from-terracotta hover:to-terracotta/90 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-gradient-to-r from-teal/10 to-teal/20 border-teal/30 text-teal group-hover:shadow-lg group-hover:shadow-teal/20 group-hover:scale-105 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("demo");
                }}
              >
                Watch Demo
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
}