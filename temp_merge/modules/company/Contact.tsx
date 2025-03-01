import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Linkedin, Twitter, Send, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - CleanAgent.AI</title>
        <meta name="description" content="Get in touch with CleanAgent.AI. We're here to help with your questions about AI-powered automation for cleaning businesses." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <Link to="/" className="text-xl font-bold">
                <span className="text-blue-600">Clean</span>
                <span className="text-blue-600">Agent</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Get in Touch with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                CleanAgent.AI
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Have questions? We'd love to hear from you. Reach out to our team, and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Thank you for reaching out!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      We'll be in touch with you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.name ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Sales">Sales</option>
                        <option value="Support">Support</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.message ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                          Sending...
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Other Ways to Connect
                </h3>

                {/* Email */}
                <div className="mb-6">
                  <div className="flex items-center text-gray-600 mb-2">
                    <Mail className="h-5 w-5 mr-2" />
                    Email
                  </div>
                  <a
                    href="mailto:support@cleanagent.ai"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    support@cleanagent.ai
                  </a>
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <div className="flex items-center text-gray-600 mb-2">
                    <Phone className="h-5 w-5 mr-2" />
                    Phone
                  </div>
                  <a
                    href="tel:+18137505308"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    813-750-5308
                  </a>
                </div>

                {/* Social Media */}
                <div>
                  <div className="text-gray-600 mb-3">Connect with us</div>
                  <div className="flex space-x-4">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Twitter className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 