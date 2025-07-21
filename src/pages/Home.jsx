import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar_Enhanced';
import LandingPage from '../component/LandingPage';
import Footer from '../component/Footer';
import { ToastProvider } from '../context/ToastContext';
import SkipNavigation from '../components/common/SkipNavigation';
import ScrollToTop from '../components/common/ScrollToTop';
import AccessibleButton from '../components/common/AccessibleButton';
import { useActiveSection, useLocalStorage } from '../hooks';
import { ArrowRight, Users, Briefcase, GraduationCap, MessageCircle, Heart, UserCheck } from 'lucide-react';

function Home() {
  // Use localStorage to persist dark mode preference
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const navigate = useNavigate();
  
  // Track active section for navigation highlighting (only home for this page)
  const activeSection = 'home';

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Add smooth scrolling behavior and section IDs
  useEffect(() => {
    // Apply dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const quickActions = [
    {
      icon: Users,
      title: 'About Educ8Africa',
      description: 'Learn about our mission to transform cybersecurity education across Africa',
      action: () => navigate('/about'),
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600'
    },
    {
      icon: Briefcase,
      title: 'Internship Program',
      description: 'Explore exciting internship opportunities in cybersecurity and technology',
      action: () => navigate('/jobs'),
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-600'
    },
    {
      icon: GraduationCap,
      title: 'NSS Program',
      description: 'Join our National Service Program and gain valuable industry experience',
      action: () => navigate('/nss'),
      color: 'from-red-500 to-red-600',
      textColor: 'text-red-600'
    },
    {
      icon: Heart,
      title: 'Volunteer Program',
      description: 'Make a difference by volunteering and supporting cybersecurity education in Africa',
      action: () => navigate('/volunteers'),
      color: 'from-pink-500 to-pink-600',
      textColor: 'text-pink-600'
    },
    {
      icon: UserCheck,
      title: 'Mentor Program',
      description: 'Share your expertise and guide the next generation of cybersecurity professionals',
      action: () => navigate('/mentors'),
      color: 'from-indigo-500 to-indigo-600',
      textColor: 'text-indigo-600'
    },
    {
      icon: MessageCircle,
      title: 'Get in Touch',
      description: 'Contact us for partnerships, inquiries, or internship guidance',
      action: () => navigate('/contact'),
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <ToastProvider darkMode={darkMode}>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <SkipNavigation />
        
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          activeSection={activeSection}
        />
        
        <main id="main-content" className="relative pt-16">
          <section id="home" className="scroll-mt-16">
            <LandingPage darkMode={darkMode} />
          </section>
          
          {/* Quick Access Section */}
          <section className={`py-16 px-4 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Explore <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Educ8Africa</span>
                </h2>
                <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Discover our comprehensive ecosystem of cybersecurity education, internship opportunities, and professional development.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <div
                      key={index}
                      className={`group p-6 rounded-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600' 
                          : 'bg-gray-50 hover:bg-white border border-gray-200 hover:shadow-lg'
                      }`}
                      onClick={action.action}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className={`text-lg font-semibold mb-2 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {action.title}
                      </h3>
                      
                      <p className={`text-sm mb-4 leading-relaxed ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {action.description}
                      </p>
                      
                      <div className={`flex items-center text-sm font-medium ${action.textColor} group-hover:gap-2 transition-all duration-300`}>
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className={`py-16 px-4 ${
            darkMode ? 'bg-gray-900' : 'bg-gray-50'
          }`}>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Ready to Transform Your <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Career?</span>
              </h2>
              <p className={`text-xl mb-8 leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Join thousands of professionals who have advanced their cybersecurity careers with Educ8Africa.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AccessibleButton
                  onClick={() => navigate('/jobs')}
                  variant="primary"
                  size="large"
                  className="px-8 py-4"
                >
                  View Internship Opportunities
                  <ArrowRight className="w-5 h-5 ml-2" />
                </AccessibleButton>
                
                <AccessibleButton
                  onClick={() => navigate('/nss')}
                  variant="outline"
                  size="large"
                  className="px-8 py-4"
                >
                  Join NSS Program
                  <GraduationCap className="w-5 h-5 ml-2" />
                </AccessibleButton>
              </div>
            </div>
          </section>
        </main>
        
        <Footer darkMode={darkMode} />
        <ScrollToTop darkMode={darkMode} />
      </div>
    </ToastProvider>
  );
}

export default Home;
