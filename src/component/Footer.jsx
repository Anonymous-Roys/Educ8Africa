import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Social icons

const Footer = ({ darkMode }) => {
  return (
    <footer className={`${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-700'} border-t border-gray-200`}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Footer Top Section */}
        <div className="md:flex md:justify-between  space-y-8 md:space-y-0 md:gap-4 w-full">
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
              <h3 className="font-bold mb-2">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-red-600">About Us</a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600">Careers</a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600">Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-red-600">FAQs</a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600">Help Center</a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4 md:w-1/3 flex flex-col items-start">
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
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-center items-center text-sm w-full">
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
