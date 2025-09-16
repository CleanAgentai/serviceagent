import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Building2, ArrowRight, Eye, EyeOff, Check } from "lucide-react";
import { useAuth } from "@/app/providers/AuthContext";
import { supabase } from "@/app/lib/supabase";

export function Signup() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Set meta title and description
  React.useEffect(() => {
    document.title = "Sign Up - ServiceAgent";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Create your ServiceAgent account to start automating and growing your business."
      );
    }
    window.scrollTo(0, 0);
  }, []);

  const validatePassword = (password: string) => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push("At least 1 uppercase letter required");
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push("At least 1 lowercase letter required");
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push("At least 1 number (0-9) required");
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push("At least 1 special character required");
    }
    
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === "password") {
      const errors = validatePassword(value);
      setPasswordErrors(errors);
      setShowPasswordRequirements(value.length > 0);
    }
    
    if (name === "acceptTerms") {
      setAcceptTerms((e.target as HTMLInputElement).checked);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    // Clear any previous HTML5 validation messages
    const form = e.target as HTMLFormElement;
    form.classList.remove('was-validated');

    const {
      email,
      password,
    } = formData;

    if (
      !email ||
      !password
    ) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // if (password !== confirmPassword) {
    //   setError("Passwords do not match");
    //   setIsLoading(false);
    //   return;
    // }

    // Check password requirements
    const passwordValidationErrors = validatePassword(password);
    if (passwordValidationErrors.length > 0) {
      setError("Password does not meet requirements");
      setIsLoading(false);
      return;
    }

    // Check terms acceptance
    if (!acceptTerms) {
      setError("Please accept the Terms of Service and Privacy Policy");
      setIsLoading(false);
      return;
    }

    try {
      const { error: signUpError } = await signUp(
        email,
        password
      );

      if (signUpError) {
        if (signUpError.message.toLowerCase().includes("already registered")) {
          setError("This email is already registered. Please log in.");
        } else {
          throw signUpError;
        }
      } else {
        // Navigate to payment selection upon successful signup
        navigate("/plan-onboarding");
      }
    } catch (err: any) {
      setError(err.message || "회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }

    // Handle signup logic
  };

  const handleSocialSignup = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: "select_account",
          },
          skipBrowserRedirect: false,
        },
      });

      if (error) throw error;

      // The redirect will happen automatically, so we don't need to handle the response here
    } catch (error: any) {
      setError("Google signup failed. Please try again.");
      console.error("Google signup failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-gray-50 to-white -z-10" />
      <main className="flex-grow">
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* Logo above header */}
          <div className="flex justify-center mb-4">
            <Link to="/" className="block">
              <img src="/logos/Brandmark.svg" alt="ServiceAgent Icon" className="h-20 w-20 max-w-none object-contain" />
            </Link>
          </div>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Start Your Free 14-Day Trial
            </h1>
            <p className="text-gray-600">
            No charges today, cancel anytime.
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Signup Form */}
          <div className="bg-transparent rounded-xl p-8 pt-0">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name Fields */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div> */}

              {/* Company Name */}
              {/* <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Company name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your Cleaning Company"
                  />
                </div>
              </div> */}

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your work email"
                  />
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setShowPasswordRequirements(true)}
                      required
                      className={`block w-full pl-10 pr-24 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        passwordErrors.length > 0 && formData.password.length > 0
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-1">
                      <button
                        type="button"
                        className="px-3 flex items-center text-xs bg-white text-gray-500 hover:text-gray-700 transition-all duration-200"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide Password" : "Show Password"}
                      </button>
                    </div>
                  </div>
                  
                  {/* Password Requirements */}
                  {showPasswordRequirements && (
                    <div className="mt-2 bg-gray-50 rounded-lg">
                      <ul className="space-y-1 transition-all duration-300">
                        <li className={`text-xs flex items-center transition-colors duration-300 ${
                          formData.password.length >= 8 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          <span className="mr-2 transition-all duration-300">{formData.password.length >= 8 ? '✓' : '✗'}</span>
                          At least 8 characters long
                        </li>
                        <li className={`text-xs flex items-center transition-colors duration-300 ${
                          /[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <span className="mr-2 transition-all duration-300">{/[A-Z]/.test(formData.password) ? '✓' : '✗'}</span>
                          At least 1 uppercase letter
                        </li>
                        <li className={`text-xs flex items-center transition-colors duration-300 ${
                          /[a-z]/.test(formData.password) ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <span className="mr-2 transition-all duration-300">{/[a-z]/.test(formData.password) ? '✓' : '✗'}</span>
                          At least 1 lowercase letter
                        </li>
                        <li className={`text-xs flex items-center transition-colors duration-300 ${
                          /[0-9]/.test(formData.password) ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <span className="mr-2 transition-all duration-300">{/[0-9]/.test(formData.password) ? '✓' : '✗'}</span>
                          At least 1 number (0-9)
                        </li>
                        <li className={`text-xs flex items-center transition-colors duration-300 ${
                          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <span className="mr-2 transition-all duration-300">{/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? '✓' : '✗'}</span>
                          At least 1 special character
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className={`block w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword
                          ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                          : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword.length > 0 && (
                    <div className="mt-1 transition-all duration-300">
                      {formData.password === formData.confirmPassword ? (
                        <p className="text-xs text-green-600 flex items-center transition-colors duration-300">
                          <span className="mr-1 transition-all duration-300">✓</span>
                          Passwords match
                        </p>
                      ) : (
                        <p className="text-xs text-red-600 flex items-center transition-colors duration-300">
                          <span className="mr-1 transition-all duration-300">✗</span>
                          Passwords do not match
                        </p>
                      )}
                    </div>
                  )}
                </div> */}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setAcceptTerms(!acceptTerms)}
                  className={`flex items-center justify-center h-6 w-6 rounded-xl border-2 transition-all duration-200 ${
                    acceptTerms
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-gray-300 text-transparent hover:border-blue-600'
                  }`}
                >
                  <Check className="h-3 w-3" />
                </button>
                <div className="ml-3 text-sm">
                  <span className="text-gray-600">
                    I agree to the{" "}
                    <Link
                      to="/terms-of-service"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Terms of Service
                    </Link>
                    {" "}and{" "}
                    <Link
                      to="/privacy-policy"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 bg-clip-padding text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6 py-3 border border-white/20 group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              {/* Reassurance Copy */}

                <p className=" text-center text-sm text-muted-foreground hyphens-none break-words italic">
                  No charges today · Cancel anytime · 14 days free
                </p>
            </form>

            {/* <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => handleSocialSignup()}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <img
                    className="h-5 w-5 mr-2"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google logo"
                  />
                  <span>Google</span>
                </button>
              </div>
            </div> */}
          </div>

          {/* Sign in link */}
          <p className="text-center text-sm text-gray-600 -mt-2">
            Already have an account?
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-700 ml-1"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
