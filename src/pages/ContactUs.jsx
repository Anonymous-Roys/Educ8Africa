import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactUs = ({ darkMode }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Determine the appropriate email based on subject
    const getTargetEmail = (subject) => {
      switch (subject) {
        case 'careers':
        case 'nss':
          return 'careers@educ8africa.com';
        case 'partnerships':
          return 'partnerships@educ8africa.com';
        case 'programs':
        case 'support':
        case 'general':
        case 'other':
        default:
          return 'info@educ8africa.com';
      }
    };

    const targetEmail = getTargetEmail(formData.subject);
    
    try {
      // Create mailto link with proper formatting
      const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from Educ8Africa Contact Form
      `.trim();

      const mailtoLink = `mailto:${targetEmail}?subject=${encodeURIComponent(`Contact Form: ${formData.subject || 'General Inquiry'} - ${formData.name}`)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Simulate successful submission
      setTimeout(() => {
        setSubmitStatus('success');
        setIsSubmitting(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      }, 500);
      
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setIsSubmitting(false);
      
      // Clear error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className={`min-h-screen py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 transition-all duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-700 mb-4">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-red-600 mb-6">
            Get In Touch With Educ8Africa
          </p>
          <p className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Have questions about our cybersecurity programs? Want to partner with us? 
            Looking for career opportunities? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className={`rounded-lg p-6 sm:p-8 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-2xl font-bold text-red-700 mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Mail className="w-6 h-6 text-red-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      General Inquiries: info@educ8africa.com
                    </p>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Careers: careers@educ8africa.com
                    </p>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Partnerships: partnerships@educ8africa.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Phone className="w-6 h-6 text-red-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      +233 (0) 244 865 815 
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Location</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Accra, Ghana
                    </p>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                      (We operate primarily Hybrid with Remote options)
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Clock className="w-6 h-6 text-red-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Monday - Friday: 9:00 AM - 6:00 PM (GMT)
                    </p>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Saturday: 10:00 AM - 4:00 PM (GMT)
                    </p>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className={`rounded-lg p-6 sm:p-8 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-2xl font-bold text-red-700 mb-6">Quick Links</h2>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/jobs')}
                  className="block text-red-600 hover:text-red-700 font-medium transition-colors text-left"
                >
                  → View Internship Opportunities
                </button>
                <button 
                  onClick={() => navigate('/nss')}
                  className="block text-red-600 hover:text-red-700 font-medium transition-colors text-left"
                >
                  → NSS Positions
                </button>
                <button 
                  onClick={() => navigate('/about')}
                  className="block text-red-600 hover:text-red-700 font-medium transition-colors text-left"
                >
                  → About Educ8Africa
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`rounded-lg p-6 sm:p-8 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-2xl font-bold text-red-700 mb-6">Send Us a Message</h2>
            
            <div className={`mb-6 p-4 rounded-lg border-l-4 border-blue-500 ${darkMode ? 'bg-blue-900/20 text-blue-100' : 'bg-blue-50 text-blue-800'}`}>
              <p className="text-sm font-medium">
                📧 Smart Email Routing: Your message will be automatically directed to the appropriate department based on your subject selection.
              </p>
            </div>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                <p className="font-medium">Email client opened successfully!</p>
                <p className="text-sm">Your default email application should open with the message pre-filled. Please send the email to complete your inquiry.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p className="font-medium">Error opening email client!</p>
                <p className="text-sm">Please manually send your message to the appropriate email address listed in the contact information.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition-colors ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`}
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition-colors ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`}
                  placeholder="Enter your email address"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition-colors ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry (info@educ8africa.com)</option>
                  <option value="careers">Career Opportunities (careers@educ8africa.com)</option>
                  <option value="partnerships">Partnership Inquiry (partnerships@educ8africa.com)</option>
                  <option value="programs">Training Programs (info@educ8africa.com)</option>
                  <option value="nss">National Service Opportunities (careers@educ8africa.com)</option>
                  <option value="support">Technical Support (info@educ8africa.com)</option>
                  <option value="other">Other (info@educ8africa.com)</option>
                </select>
                {formData.subject && (
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Your message will be sent to: {
                      formData.subject === 'careers' || formData.subject === 'nss' 
                        ? 'careers@educ8africa.com' 
                        : formData.subject === 'partnerships' 
                        ? 'partnerships@educ8africa.com' 
                        : 'info@educ8africa.com'
                    }
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition-colors resize-vertical ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`}
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700 transform hover:scale-105'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 lg:mt-16 text-center">
          <div className={`rounded-lg p-6 sm:p-8 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-2xl font-bold text-red-700 mb-4">
              Why Choose Educ8Africa?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-red-600">Industry-Relevant Training</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Globally recognized cybersecurity certifications at subsidized rates for African students.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-red-600">Practical Experience</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Real-world projects and hands-on learning opportunities with industry experts.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-red-600">Career Development</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Direct pathways to employment and continuous professional growth support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
