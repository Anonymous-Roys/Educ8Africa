import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Social icons

const Footer = ({ darkMode }) => {
  return (
    <footer className={`${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-700'} border-t border-gray-200`}>
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Footer Top Section */}
        <div className="w-full space-y-8 md:flex md:justify-between md:space-y-0 md:gap-4">
          {/* Logo and Description */}
          <div className="space-y-4 md:w-1/3">
            <h2 className="text-2xl font-bold">Educ8Africa</h2>
            <p className="text-sm">
              Empowering Africa through education and technology. Join us to make an impact!
            </p>
          </div>

          {/* Footer Navigation Links */}
          <div className="flex justify-between space-x-8 md:w-1/3">
            <div>
              <h3 className="mb-2 font-bold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="hover:text-red-600">About Us</a>
                </li>
                <li>
                  <a href="/careers" className="hover:text-red-600">Careers</a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-red-600">Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-bold">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/faqs" className="hover:text-red-600">FAQs</a>
                </li>
                <li>
                  <a href="help-center" className="hover:text-red-600">Help Center</a>
                </li>
                <li>
                  <a href="privacy-policy" className="hover:text-red-600">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Links */}
          {/* <div className="flex flex-col items-start space-y-4 md:w-1/3">
            <h3 className="font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-red-600">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="hover:text-red-600">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com" className="hover:text-red-600">
                <FaLinkedin size={24} />
              </a>
              <a href="https://instagram.com" className="hover:text-red-600">
                <FaInstagram size={24} />
              </a>
            </div>
          </div> */}
        </div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col items-center justify-center w-full pt-8 mt-8 text-sm border-t md:flex-row">
          <p className='text-center'>
            © 2024 Educ8Africa. All rights reserved.
          </p>
          {/* <p className="mt-4 md:mt-0">
            Made with <span className="text-red-600">&hearts;</span> by <a href="#" className="hover:text-red-600">Your Team</a>
          </p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
