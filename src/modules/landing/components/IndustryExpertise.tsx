import React from 'react'
import { Gallery4, Gallery4Item } from "@/components/ui/gallery4";
import { Sparkles, Check, ArrowRight, Clock, Zap, Target, Brain, BarChart3, Users, Link2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const IndustryExpertise = () => {
    const industries = [
        "Cleaning", "Pest Control", "Restaurants", "HVAC", "Plumbing", 
        "Landscaping", "Staffing", "Franchises"
      ];
    
      const industryData: Gallery4Item[] = [
        {
          id: "residential-cleaning",
          title: "Residential Cleaning",
          description: "Find reliable house cleaners with AI screening that tests attention to detail, trustworthiness, and customer service skills for home environments.",
          href: "/industries/ResidentialCleaning",
          image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        },
        {
          id: "commercial-cleaning",
          title: "Commercial Cleaning",
          description: "Hire commercial cleaning staff with AI interviews that assess reliability, attention to detail, and ability to work in office and retail environments.",
          href: "/industries/CommercialCleaning", 
          image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        },
        {
          id: "hvac",
          title: "HVAC Services",
          description: "Screen HVAC technicians with technical assessments and safety protocols. AI evaluates problem-solving skills and customer communication abilities.",
          href: "/industries/HVAC",
          image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        },
        {
          id: "plumbing",
          title: "Plumbing Services", 
          description: "Find skilled plumbers through AI screening that tests technical knowledge, problem-solving abilities, and customer service in emergency situations.",
          href: "/industries/Plumbing",
          image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        },
        {
          id: "landscaping",
          title: "Landscaping & Lawn Care",
          description: "Hire landscaping crews with AI interviews that assess outdoor work experience, equipment knowledge, and seasonal availability patterns.",
          href: "/industries/Landscaping",
          image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        },
        {
          id: "pest-control",
          title: "Pest Control",
          description: "Screen pest control technicians for safety compliance, chemical handling knowledge, and customer education skills through specialized AI assessments.", 
          href: "/industries/PestControl",
          image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        },
        {
          id: "franchises", 
          title: "Franchises",
          description: "Scale hiring across multiple franchise locations with consistent AI screening that maintains brand standards and service quality across all units.",
          href: "/industries/Franchises",
          image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        },
        {
          id: "staffing",
          title: "Staffing Agencies", 
          description: "Accelerate candidate screening for staffing agencies with AI interviews that pre-qualify candidates for multiple client requirements and roles.",
          href: "/industries/Staffing",
          image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        },
        {
          id: "restaurants",
          title: "Restaurants & Food Service",
          description: "Hire restaurant staff with AI interviews that test food safety knowledge, customer service skills, and ability to work in fast-paced environments.",
          href: "/industries/Restaurants",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        },
        {
          id: "hospitality",
          title: "Hospitality & Hotels",
          description: "Find hospitality staff through AI screening that evaluates guest service excellence, cultural sensitivity, and ability to handle high-stress situations.",
          href: "/industries/Hospitality",
          image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        }
      ];
  return (
    <section id="industries" className="py-24 bg-gradient-to-b from-card/20 to-background relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-gold/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-teal/3 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative">
          {/* Section Header */}
          <div 
            className="text-center space-y-6 mb-20 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 text-terracotta rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Industry Expertise
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-primary leading-tight">
              Industries We Serve
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              ServiceAgent specializes in high-turnover service industries where quality hiring makes the difference between success and struggle.
            </p>
          </div>

          {/* Enhanced Industry Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Industry Card 1: Cleaning Services */}
            <div 
              className="group opacity-0 animate-fade-in"
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              <div className="relative bg-gradient-to-br from-card to-gold/5 rounded-3xl overflow-hidden border border-gold/20 shadow-lg hover:shadow-2xl hover:-translate-y-3 hover:border-gold/40 transition-all duration-500">
                {/* Image */}
                <Link to="/industries/residential-cleaning" className="block">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="Professional cleaning service team member cleaning office space with attention to detail and quality"
                    className="absolute h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-gold/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                </Link>
                
                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-gold">
                    <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                    <span className="text-sm font-medium uppercase tracking-wide">High Volume</span>
                  </div>
                  <Link to="/industries/residential-cleaning" className="block hover:underline group-hover:text-gold transition-colors duration-300">
                  <h3 className="text-left text-xl font-bold text-primary group-hover:text-gold transition-colors duration-300">
                    Cleaning Services
                  </h3>
                  </Link>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Find reliable house and commercial cleaners with AI screening that tests attention to detail, trustworthiness, and customer service skills.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1 text-gold font-medium text-sm">
                      <Check className="w-4 h-4" />
                      <span>Quality focused</span>
                    </div>
                    <Link to="/industries/residential-cleaning">
                    <ArrowRight className="w-5 h-5 text-gold group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
                
                {/* Hover Effect Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-gold/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Industry Card 2: Restaurants */}
            <div 
              className="group opacity-0 animate-fade-in"
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
            >
              <div className="relative bg-gradient-to-br from-card to-teal/5 rounded-3xl overflow-hidden border border-teal/20 shadow-lg hover:shadow-2xl hover:-translate-y-3 hover:border-teal/40 transition-all duration-500">
                {/* Image */}
                <Link to="/industries/restaurants" className="block">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="Restaurant kitchen staff working in fast-paced food service environment with focus on food safety and customer service"
                    className="absolute h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-teal/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                </Link>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-teal">
                    <div className="w-2 h-2 bg-teal rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                    <span className="text-sm font-medium uppercase tracking-wide">Fast Paced</span>
                  </div>
                  <Link to="/industries/restaurants" className="block hover:underline group-hover:text-teal transition-colors duration-300">
                  <h3 className="text-left text-xl font-bold text-primary group-hover:text-teal transition-colors duration-300">
                    Restaurants & Food Service
                  </h3>
                  </Link>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Hire restaurant staff with AI interviews that test food safety knowledge, customer service skills, and ability to work under pressure.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1 text-teal font-medium text-sm">
                      <Zap className="w-4 h-4" />
                      <span>Quick hiring</span>
                    </div>
                    <Link to="/industries/restaurants">
                    <ArrowRight className="w-5 h-5 text-teal group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
                
                {/* Hover Effect Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal/10 to-teal/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Industry Card 3: HVAC Services */}
            <div 
              className="group opacity-0 animate-fade-in"
              style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
            >
              <div className="relative bg-gradient-to-br from-card to-terracotta/5 rounded-3xl overflow-hidden border border-terracotta/20 shadow-lg hover:shadow-2xl hover:-translate-y-3 hover:border-terracotta/40 transition-all duration-500">
                {/* Image */}
                <Link to="/industries/hvac" className="block">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="HVAC technician working on air conditioning unit demonstrating technical skills and problem-solving abilities"
                    className="absolute h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    style={{ objectPosition: 'center center' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-terracotta/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                </Link>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-terracotta">
                    <div className="w-2 h-2 bg-terracotta rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                    <span className="text-sm font-medium uppercase tracking-wide">Technical Skills</span>
                  </div>
                  <Link to="/industries/hvac" className="block hover:underline group-hover:text-terracotta transition-colors duration-300">
                  <h3 className="text-left text-xl font-bold text-primary group-hover:text-terracotta transition-colors duration-300">
                    HVAC Services
                  </h3>
                  </Link>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Screen HVAC technicians with technical assessments and safety protocols. AI evaluates problem-solving skills and customer communication.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1 text-terracotta font-medium text-sm">
                      <Brain className="w-4 h-4" />
                      <span>Skill testing</span>
                    </div>
                    <Link to="/industries/hvac">
                    <ArrowRight className="w-5 h-5 text-terracotta group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
                
                {/* Hover Effect Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-terracotta/10 to-terracotta/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Industry Card 4: Staffing Agencies */}
            <div 
              className="group opacity-0 animate-fade-in"
              style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
            >
              <div className="relative bg-gradient-to-br from-card to-gold/5 rounded-3xl overflow-hidden border border-accent/20 shadow-xl hover:shadow-3xl hover:-translate-y-3 hover:border-accent/40 transition-all duration-500">
                {/* Image */}
                <Link to="/industries/staffing" className="block">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="Staffing Agencies"
                    className="absolute h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-accent/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                </Link>
                
                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-accent">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.9s' }} />
                    <span className="text-sm font-medium uppercase tracking-wide">Scale Focused</span>
                  </div>
                  <Link to="/industries/staffing" className="inline-block hover:underline group-hover:text-accent transition-colors duration-300">
                  <h3 className="text-left text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                    Staffing Agencies
                  </h3>
                  </Link>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Accelerate candidate screening for staffing agencies with AI interviews that pre-qualify candidates for multiple client requirements.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1 text-accent font-medium text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span>Scale hiring</span>
                    </div>
                    <Link to="/industries/staffing">
                    <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
                
                {/* Hover Effect Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Industry Card 5: Franchises */}
            <div 
              className="group opacity-0 animate-fade-in"
              style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
            >
              <div className="relative bg-gradient-to-br from-card to-primary/5 rounded-3xl overflow-hidden border border-primary/20 shadow-xl hover:shadow-3xl hover:-translate-y-3 hover:border-primary/40 transition-all duration-500">
                {/* Image */}
                <Link to="/industries/franchises" className="block">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="Franchises"
                    className="absolute h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Link2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                </Link>
                
                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1.2s' }} />
                    <span className="text-sm font-medium uppercase tracking-wide">Multi-Location</span>
                  </div>
                  <Link to="/industries/franchises" className="block hover:underline group-hover:text-primary transition-colors duration-300">
                  <h3 className="text-left text-xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300">
                    Franchises
                  </h3>
                  </Link>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Scale hiring across multiple franchise locations with consistent AI screening that maintains brand standards and service quality.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1 text-primary font-medium text-sm">
                      <Check className="w-4 h-4" />
                      <span>Brand consistency</span>
                    </div>
                    <Link to="/industries/franchises">
                    <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
                
                {/* Hover Effect Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Industry Card 6: More Industries */}
            <div 
              className="group opacity-0 animate-fade-in"
              style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
            >
              <div className="relative bg-gradient-to-br from-card to-muted/5 rounded-3xl overflow-hidden border border-border/20 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                {/* Header */}
                <div className="p-6 pb-4 text-center border-b border-border/10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300 mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-primary transition-colors duration-300">
                    More Industries
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    We serve many more industries with specialized solutions
                  </p>
                </div>
                
                {/* Industries List */}
                <div className="p-6 pt-4 space-y-4">
                  <div className="flex items-center justify-center gap-3 group/item hover:bg-muted/20 rounded-lg p-2 transition-colors duration-300">
                    <div className="w-8 h-8 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center group-hover/item:from-gold/30 group-hover/item:to-gold/20 transition-all duration-300">
                      <Users className="w-4 h-4 text-gold" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-primary text-sm">Healthcare</div>
                      <div className="text-xs text-muted-foreground">CNAs, home health aides, medical assistants</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 group/item hover:bg-muted/20 rounded-lg p-2 transition-colors duration-300">
                    <div className="w-8 h-8 bg-gradient-to-br from-teal/20 to-teal/10 rounded-full flex items-center justify-center group-hover/item:from-teal/30 group-hover/item:to-teal/20 transition-all duration-300">
                      <Target className="w-4 h-4 text-teal" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-primary text-sm">Manufacturing</div>
                      <div className="text-xs text-muted-foreground">Production workers, quality control, assembly</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 group/item hover:bg-muted/20 rounded-lg p-2 transition-colors duration-300">
                    <div className="w-8 h-8 bg-gradient-to-br from-terracotta/20 to-terracotta/10 rounded-full flex items-center justify-center group-hover/item:from-terracotta/30 group-hover/item:to-terracotta/20 transition-all duration-300">
                      <BarChart3 className="w-4 h-4 text-terracotta" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-primary text-sm">Warehouse</div>
                      <div className="text-xs text-muted-foreground">Warehouse workers, forklift operators, inventory</div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="text-center text-xs text-muted-foreground inline-flex justify-center items-center gap-x-1.5 gap-y-1 tracking-normal">
                        <span>+</span>
                        <Link to="/industries/landscaping" className="underline hover:text-primary whitespace-nowrap">Landscaping,</Link>
                        <Link to="/industries/plumbing" className="underline hover:text-primary whitespace-nowrap">Plumbing,</Link>
                        <Link to="/industries/pest-control" className="underline hover:text-primary whitespace-nowrap">Pest&nbsp;Control,</Link>
                        <span>&amp;</span>
                        <span>more</span>
                    </div>
                </div>


                </div>
                
                {/* Hover Effect Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-muted/5 to-muted/2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Bottom CTA section */}
          <div 
            className="text-center mt-16 opacity-0 animate-fade-in"
            style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}
          >
            <div className="relative group">
              {/* <div className="max-w-screen-sm after:absolute -inset-1 bg-gradient-to-r from-gold via-terracotta to-teal rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div> */}
              <Link to="/signup">
              <Button 
                size="lg"
                 className="relative bg-gradient-to-r from-gold to-gold/90 hover:from-terracotta hover:to-terracotta/90 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-xl shadow-gold/40 hover:shadow-terracotta/50 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6" />
                  Start for Free
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse opacity-80"></div>
                </div>
              </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              14 Days Free • Works with any industry
            </p>
          </div>    
        </div>
      </section>
   );
};

export default IndustryExpertise;
