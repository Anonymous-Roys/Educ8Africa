import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaGithub, FaTiktok, FaWhatsapp } from 'react-icons/fa'; // Social icons
import { Link } from 'react-router-dom';

const Footer = ({ darkMode }) => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Add newsletter signup logic here
    console.log('Newsletter signup submitted');
  };

  return (
    <footer className={`${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-700'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className={`mb-8 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
              <p className="text-sm">Get the latest cybersecurity insights and career opportunities delivered to your inbox.</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 md:max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className={`px-4 py-2 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-red-500 flex-1`}
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Top Section */}
        <div className="w-full space-y-8 md:flex md:justify-between md:space-y-0 md:gap-8">
          {/* Logo and Description */}
          <div className="space-y-4 md:w-1/3">
            <h2 className="text-2xl font-bold text-red-600">Educ8Africa</h2>
            <p className="text-sm leading-relaxed">
              Empowering Africa through cybersecurity education and technology innovation. 
              Join us in building a more secure digital future for the continent.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Training the next generation of cyber defenders</span>
            </div>
          </div>

          {/* Footer Navigation Links */}
          <div className="flex justify-between space-x-8 md:w-1/3">
            <div>
              <h3 className="mb-2 font-bold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="hover:text-red-600 transition-colors">About Us</Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-red-600 transition-colors">Internships</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-red-600 transition-colors">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-bold">Programs</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/jobs" className="hover:text-red-600 transition-colors">Internships</Link>
                </li>
                <li>
                  <Link to="/nss" className="hover:text-red-600 transition-colors">NSS Program</Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-red-600 transition-colors">Training</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-start space-y-4 md:w-1/3">
            <h3 className="font-bold">Follow Us</h3>
            <div className="grid grid-cols-4 gap-4">
              <a 
                href="https://facebook.com/educ8africa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                aria-label="Follow us on Facebook"
                title="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a 
                href="https://twitter.com/educ8africa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sky-500 hover:text-sky-600 transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                aria-label="Follow us on Twitter"
                title="Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a 
                href="https://linkedin.com/company/educ8africa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-800 transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                aria-label="Follow us on LinkedIn"
                title="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a 
                href="https://instagram.com/educ8africa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700 transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                aria-label="Follow us on Instagram"
                title="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="https://youtube.com/@educ8africa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                aria-label="Subscribe to our YouTube channel"
                title="YouTube"
              >
                <FaYoutube size={24} />
              </a>
              <a 
                href="https://github.com/educ8africa" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-all duration-300 hover:scale-110 hover:drop-shadow-lg ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-900 hover:text-black'
                }`}
                aria-label="Follow us on GitHub"
                title="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a 
                href="https://tiktok.com/@educ8africa" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-all duration-300 hover:scale-110 hover:drop-shadow-lg ${
                  darkMode ? 'text-white hover:text-gray-200' : 'text-black hover:text-gray-800'
                }`}
                aria-label="Follow us on TikTok"
                title="TikTok"
              >
                <FaTiktok size={24} />
              </a>
              <a 
                href="https://wa.me/233244865815" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600 transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                aria-label="Contact us on WhatsApp"
                title="WhatsApp"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Connect with us across all platforms for the latest updates
            </p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col items-center justify-between w-full pt-8 mt-8 text-sm border-t md:flex-row">
          <p className='text-center md:text-left'>
            © {new Date().getFullYear()} Educ8Africa. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-red-600 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-red-600 transition-colors">Terms of Service</a>
            <a href="/cookies" className="hover:text-red-600 transition-colors">Cookie Policy</a>
          </div>
          <p className="mt-4 md:mt-0 text-center md:text-right">
            Made with <span className="text-red-600">&hearts;</span> in Ghana for Africa
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
