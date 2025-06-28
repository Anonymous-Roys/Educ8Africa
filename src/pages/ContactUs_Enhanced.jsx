import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, User, MessageCircle } from 'lucide-react';
import AccessibleButton from '../components/common/AccessibleButton';
import { useToast } from '../context/ToastContext';

const ContactUs = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { success, error } = useToast();

  const subjectOptions = [
    { value: 'careers', label: 'Career Opportunities', email: 'careers@educ8africa.com' },
    { value: 'nss', label: 'National Service Applications', email: 'careers@educ8africa.com' },
    { value: 'partnerships', label: 'Partnerships & Collaborations', email: 'partnerships@educ8africa.com' },
    { value: 'programs', label: 'Training Programs', email: 'info@educ8africa.com' },
    { value: 'support', label: 'Technical Support', email: 'support@educ8africa.com' },
    { value: 'general', label: 'General Inquiries', email: 'info@educ8africa.com' },
    { value: 'other', label: 'Other', email: 'info@educ8africa.com' }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Location',
      details: ['Accra, Ghana', 'West Africa'],
      color: 'text-red-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [' +233 (0) 244 865 815 ', 'Mon-Fri 9AM-5PM GMT'],
      color: 'text-blue-600'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@educ8africa.com', 'Quick response guaranteed'],
      color: 'text-green-600'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9AM - 5PM', 'Saturday: 10AM - 2PM'],
      color: 'text-purple-600'
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must not exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const getTargetEmail = (subject) => {
    const selectedOption = subjectOptions.find(option => option.value === subject);
    return selectedOption ? selectedOption.email : 'info@educ8africa.com';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const targetEmail = getTargetEmail(formData.subject);
    
    try {
      // Create mailto link with proper formatting
      const emailSubject = `Contact Form: ${subjectOptions.find(opt => opt.value === formData.subject)?.label || 'General Inquiry'}`;
      const emailBody = `Name: ${formData.name}
Email: ${formData.email}
Subject: ${emailSubject}

Message:
${formData.message}

---
This message was sent via the Educ8Africa contact form.`;

      const mailtoLink = `mailto:${targetEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open the email client
      window.location.href = mailtoLink;
      
      // Show success message
      setSubmitStatus('success');
      success(`Your message will be sent to ${targetEmail}. Thank you for contacting us!`);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setSubmitStatus('error');
      error('There was an error preparing your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedSubjectEmail = formData.subject ? getTargetEmail(formData.subject) : '';

  return (
    <section className={`section-padding ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Contact Information
              </h3>
              <p className={`text-lg mb-8 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Ready to transform African tech education? Let's connect and make it happen together.
              </p>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={index}
                    className={`p-6 rounded-xl card card-hover ${
                      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    } flex items-center justify-center mb-4`}>
                      <IconComponent className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <h4 className={`text-lg font-semibold mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h4>
                    {item.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className={`text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {detail}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Quick Links */}
            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}>
              <h4 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Quick Actions
              </h4>
              <div className="space-y-3">
                <AccessibleButton
                  onClick={() => window.location.href = '#jobboard'}
                  variant="outline"
                  size="small"
                  className="w-full justify-start"
                >
                  Browse Job Opportunities
                </AccessibleButton>
                <AccessibleButton
                  onClick={() => window.location.href = '#nss'}
                  variant="outline"
                  size="small"
                  className="w-full justify-start"
                >
                  View NSS Positions
                </AccessibleButton>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`p-8 rounded-xl card ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                      errors.name 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:border-red-500'
                    } ${
                      darkMode 
                        ? 'bg-gray-700 text-white placeholder-gray-400' 
                        : 'bg-white text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:border-red-500'
                    } ${
                      darkMode 
                        ? 'bg-gray-700 text-white placeholder-gray-400' 
                        : 'bg-white text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                    errors.subject 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-red-500'
                  } ${
                    darkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-white text-gray-900'
                  }`}
                >
                  <option value="">Select a subject</option>
                  {subjectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.subject}
                  </p>
                )}
                {selectedSubjectEmail && (
                  <p className="mt-1 text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Your message will be sent to: {selectedSubjectEmail}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Message *
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none resize-vertical ${
                      errors.message 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:border-red-500'
                    } ${
                      darkMode 
                        ? 'bg-gray-700 text-white placeholder-gray-400' 
                        : 'bg-white text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <div className="flex justify-between mt-1">
                  {errors.message && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.message}
                    </p>
                  )}
                  <p className={`text-sm ml-auto ${
                    formData.message.length > 1000 ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {formData.message.length}/1000 characters
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <AccessibleButton
                type="submit"
                variant="primary"
                size="large"
                disabled={isSubmitting}
                className="w-full"
                ariaLabel="Send message"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Preparing Message...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </AccessibleButton>

              {/* Privacy Notice */}
              <p className={`text-xs text-center ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                By submitting this form, you agree to our privacy policy. We'll never share your information.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
