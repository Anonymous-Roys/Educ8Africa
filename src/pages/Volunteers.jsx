import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks';
import Navbar from '../component/Navbar_Enhanced';
import Footer from '../component/Footer';
import { ToastProvider } from '../context/ToastContext';
import SkipNavigation from '../components/common/SkipNavigation';
import ScrollToTop from '../components/common/ScrollToTop';
import MetaTags from '../components/common/MetaTags';
import { Users, Heart, Clock, Globe, Award, Mail } from 'lucide-react';

const Volunteers = () => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    profession: '',
    expertise: '',
    availability: '',
    motivation: '',
    experience: ''
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
    const emailSubject = 'Volunteer Application - Educ8Africa';
    const emailBody = `Dear Educ8Africa Team,

I am interested in volunteering with your organization. Please find my details below:

Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Location: ${formData.location}
Profession: ${formData.profession}
Area of Expertise: ${formData.expertise}
Availability: ${formData.availability}

Motivation:
${formData.motivation}

Previous Volunteer Experience:
${formData.experience}

Thank you for considering my application.

Best regards,
${formData.fullName}`;

    const mailtoLink = `mailto:careers@educ8africa.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    
    // Show confirmation after a brief delay
    setTimeout(() => {
      alert('Your email client has been opened with your volunteer application. Please send the email to complete your application.');
    }, 1000);
  };

  const volunteerOpportunities = [
    {
      icon: Users,
      title: "Community Outreach",
      description: "Help us reach more students and spread cybersecurity awareness in communities",
      commitment: "2-4 hours/week"
    },
    {
      icon: Globe,
      title: "Content Translation",
      description: "Translate our educational content into local languages",
      commitment: "Flexible"
    },
    {
      icon: Heart,
      title: "Student Support",
      description: "Provide guidance and support to students in their learning journey",
      commitment: "3-5 hours/week"
    },
    {
      icon: Award,
      title: "Event Organization",
      description: "Help organize workshops, webinars, and cybersecurity awareness events",
      commitment: "Project-based"
    }
  ];

  return (
    <ToastProvider>
      <MetaTags 
        title="Call for Volunteers - Educ8Africa"
        description="Join our volunteer program and help build Africa's cybersecurity future. Make a difference in youth education and digital literacy."
        url="/volunteers"
      />
      <SkipNavigation />
      
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} activeSection="volunteers" />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Call for <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Volunteers</span>
              </h1>
              <p className={`text-xl sm:text-2xl mb-8 max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Join our mission to build Africa's cybersecurity future. Your skills and passion can make a real difference in the lives of young Africans.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-red-600" />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Flexible Hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-red-600" />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Remote & On-site</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Make Impact</span>
                </div>
              </div>
            </div>
          </section>

          {/* Volunteer Opportunities */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Volunteer Opportunities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {volunteerOpportunities.map((opportunity, index) => (
                  <div key={index} className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-lg`}>
                    <div className={`w-12 h-12 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-red-100'} flex items-center justify-center mb-4`}>
                      <opportunity.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {opportunity.title}
                    </h3>
                    <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {opportunity.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-red-600" />
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {opportunity.commitment}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Application Form */}
          <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Apply to Volunteer
                </h2>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Ready to make a difference? Fill out the form below and join our volunteer community.
                </p>
              </div>

              <form onSubmit={handleSubmit} className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
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
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
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
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
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
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
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
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Profession/Occupation
                    </label>
                    <input
                      type="text"
                      name="profession"
                      value={formData.profession}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      placeholder="Your current profession"
                    />
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
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    >
                      <option value="">Select your expertise</option>
                      <option value="cybersecurity">Cybersecurity</option>
                      <option value="education">Education & Training</option>
                      <option value="marketing">Marketing & Communications</option>
                      <option value="technology">Technology & Development</option>
                      <option value="business">Business & Administration</option>
                      <option value="design">Design & Creative</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Availability *
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    required
                    className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  >
                    <option value="">Select your availability</option>
                    <option value="1-2 hours/week">1-2 hours per week</option>
                    <option value="3-5 hours/week">3-5 hours per week</option>
                    <option value="6-10 hours/week">6-10 hours per week</option>
                    <option value="10+ hours/week">10+ hours per week</option>
                    <option value="project-based">Project-based</option>
                  </select>
                </div>

                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Why do you want to volunteer with Educ8Africa? *
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    placeholder="Tell us about your motivation to volunteer..."
                  />
                </div>

                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Previous Volunteer Experience (Optional)
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    placeholder="Describe any previous volunteer experience..."
                  />
                </div>

                <div className="mt-8 text-center">
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Submit Application</span>
                  </button>
                  <p className={`text-sm mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    We'll get back to you within 3-5 business days
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

export default Volunteers;
