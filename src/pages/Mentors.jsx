import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks';
import Navbar from '../component/Navbar_Enhanced';
import Footer from '../component/Footer';
import { ToastProvider } from '../context/ToastContext';
import SkipNavigation from '../components/common/SkipNavigation';
import ScrollToTop from '../components/common/ScrollToTop';
import MetaTags from '../components/common/MetaTags';
import { GraduationCap, Users, Lightbulb, Star, Clock, Globe, Mail, Shield } from 'lucide-react';

const Mentors = () => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    profession: '',
    company: '',
    experience: '',
    expertise: '',
    mentorshipArea: '',
    availability: '',
    motivation: '',
    background: '',
    linkedIn: ''
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailSubject = 'Mentor Application - Educ8Africa';
    const emailBody = `Dear Educ8Africa Mentorship Team,

I am interested in becoming a mentor for your organization. Please find my details below:

Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Location: ${formData.location}
Profession: ${formData.profession}
Company/Organization: ${formData.company}
Years of Experience: ${formData.experience}
Area of Expertise: ${formData.expertise}
Mentorship Focus Area: ${formData.mentorshipArea}
Availability: ${formData.availability}
LinkedIn Profile: ${formData.linkedIn}

Professional Background:
${formData.background}

Why I want to be a mentor:
${formData.motivation}

Thank you for considering my application. I look forward to contributing to the growth of Africa's cybersecurity professionals.

Best regards,
${formData.fullName}`;

    const mailtoLink = `mailto:careers@educ8africa.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    
    // Show confirmation after a brief delay
    setTimeout(() => {
      alert('Your email client has been opened with your mentor application. Please send the email to complete your application.');
    }, 1000);
  };

  const mentorshipAreas = [
    {
      icon: Shield,
      title: "Cybersecurity Expertise",
      description: "Guide students in technical cybersecurity skills, certifications, and industry best practices",
      focus: "Technical Skills"
    },
    {
      icon: GraduationCap,
      title: "Career Development",
      description: "Help students navigate career paths, job searches, and professional growth in cybersecurity",
      focus: "Career Guidance"
    },
    {
      icon: Lightbulb,
      title: "Innovation & Entrepreneurship",
      description: "Mentor students interested in cybersecurity startups and innovative solutions",
      focus: "Innovation"
    },
    {
      icon: Users,
      title: "Leadership & Soft Skills",
      description: "Develop leadership capabilities, communication skills, and professional networking",
      focus: "Leadership"
    }
  ];

  const mentorBenefits = [
    "Make a lasting impact on Africa's cybersecurity future",
    "Expand your professional network across Africa",
    "Develop leadership and coaching skills",
    "Gain fresh perspectives from emerging talent",
    "Contribute to closing the cybersecurity skills gap",
    "Flexible mentoring schedule that fits your life"
  ];

  return (
    <ToastProvider>
      <MetaTags 
        title="Call for Mentors - Educ8Africa"
        description="Become a mentor and shape the next generation of African cybersecurity professionals. Share your expertise and make a lasting impact."
        url="/mentors"
      />
      <SkipNavigation />
      
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} activeSection="mentors" />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Call for <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Mentors</span>
              </h1>
              <p className={`text-xl sm:text-2xl mb-8 max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Shape the future of cybersecurity in Africa. Share your expertise, guide emerging talent, and help build the next generation of cybersecurity leaders.
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-red-600" />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>2-4 hours/month</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-red-600" />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Virtual Mentoring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-red-600" />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>High Impact</span>
                </div>
              </div>
            </div>
          </section>

          {/* Mentorship Areas */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Mentorship Areas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {mentorshipAreas.map((area, index) => (
                  <div key={index} className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-lg`}>
                    <div className={`w-12 h-12 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-red-100'} flex items-center justify-center mb-4`}>
                      <area.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {area.title}
                    </h3>
                    <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {area.description}
                    </p>
                    <div className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-full">
                      {area.focus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Become a Mentor */}
          <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Why Become a Mentor?
                </h2>
                <p className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Mentoring with Educ8Africa offers you the opportunity to give back while growing personally and professionally.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mentorBenefits.map((benefit, index) => (
                  <div key={index} className={`flex items-start space-x-3 p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-md`}>
                    <div className="flex-shrink-0 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-white" />
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Application Form */}
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Apply to Become a Mentor
                </h2>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Ready to make a difference? Share your expertise with the next generation of cybersecurity professionals.
                </p>
              </div>

              <form onSubmit={handleSubmit} className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Current Position *
                    </label>
                    <input
                      type="text"
                      name="profession"
                      value={formData.profession}
                      onChange={handleInputChange}
                      required
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      placeholder="Your current job title"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Company/Organization *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      placeholder="Your current employer"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Years of Experience *
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    >
                      <option value="">Select experience level</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5-10 years">5-10 years</option>
                      <option value="10-15 years">10-15 years</option>
                      <option value="15+ years">15+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Area of Expertise *
                    </label>
                    <select
                      name="expertise"
                      value={formData.expertise}
                      onChange={handleInputChange}
                      required
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    >
                      <option value="">Select your expertise</option>
                      <option value="Network Security">Network Security</option>
                      <option value="Cloud Security">Cloud Security</option>
                      <option value="Incident Response">Incident Response</option>
                      <option value="Penetration Testing">Penetration Testing</option>
                      <option value="Security Architecture">Security Architecture</option>
                      <option value="Compliance & Governance">Compliance & Governance</option>
                      <option value="Cybersecurity Management">Cybersecurity Management</option>
                      <option value="Digital Forensics">Digital Forensics</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Preferred Mentorship Area *
                    </label>
                    <select
                      name="mentorshipArea"
                      value={formData.mentorshipArea}
                      onChange={handleInputChange}
                      required
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    >
                      <option value="">Select mentorship focus</option>
                      <option value="Technical Skills">Technical Skills Development</option>
                      <option value="Career Guidance">Career Development</option>
                      <option value="Leadership">Leadership & Soft Skills</option>
                      <option value="Innovation">Innovation & Entrepreneurship</option>
                      <option value="All Areas">All Areas</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Availability *
                    </label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      required
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    >
                      <option value="">Select your availability</option>
                      <option value="1-2 hours/month">1-2 hours per month</option>
                      <option value="2-4 hours/month">2-4 hours per month</option>
                      <option value="4-8 hours/month">4-8 hours per month</option>
                      <option value="8+ hours/month">8+ hours per month</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Professional Background *
                  </label>
                  <textarea
                    name="background"
                    value={formData.background}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    placeholder="Describe your professional background and key achievements..."
                  />
                </div>

                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Why do you want to become a mentor? *
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    placeholder="Share your motivation for mentoring young cybersecurity professionals..."
                  />
                </div>

                <div className="mt-8 text-center">
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Submit Mentor Application</span>
                  </button>
                  <p className={`text-sm mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    We'll review your application and get back to you within 5-7 business days
                  </p>
                </div>
              </form>
            </div>
          </section>
        </main>

        <Footer darkMode={darkMode} />
        <ScrollToTop />
      </div>
    </ToastProvider>
  );
};

export default Mentors;
