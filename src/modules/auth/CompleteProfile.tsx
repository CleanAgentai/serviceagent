import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/app/lib/supabase";
import { User, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigation } from "@/modules/landing/components/Navigation";

export function CompleteProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    acceptTerms: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: sessionData, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Failed to get user:", error);
        return;
      }

      if (sessionData?.user) {
        setFormData((prev) => ({
          ...prev,
          email: sessionData.user.email, // ✅ 이메일 저장
          firstName:
            sessionData.user.user_metadata?.full_name?.split(" ")[0] || "",
          lastName:
            sessionData.user.user_metadata?.full_name?.split(" ")[1] || "",
        }));
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.companyName ||
      !formData.email
    ) {
      alert("All fields are required!");
      return;
    }

    if (!formData.acceptTerms) {
      alert("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getUser();
    if (sessionError) {
      alert("User not found. Please try logging in again.");
      return;
    }

    const userId = sessionData.user.id;

    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: formData.firstName,
        last_name: formData.lastName,
        company_name: formData.companyName,
        email: formData.email, // ✅ 이메일 저장
      })
      .eq("id", userId);

    if (error) {
      alert("Error updating profile. Please try again.");
      console.error(error);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      <main className="flex-grow">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Profile
            </h1>
            <p className="text-gray-600">
              We need a little more information to set up your account.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email (Read-Only) */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="block w-full border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Company name
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Cleaning Company"
                />
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-start">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="ml-3 text-sm">
                  <label htmlFor="acceptTerms" className="text-gray-600">
                    I agree to the{" "}
                    <Link
                      to="/terms-of-service"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy-policy"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90"
              >
                Complete Profile
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
