import { useState } from 'react';
import Navbar from '../component/Navbar';
import LandingPage from '../component/LandingPage';
import JobBoard from '../component/JobBoard';
import NssBoard from '../component/NssBoard';
import AboutSection from '../component/About';
import Footer from '../component/Footer';


function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    
    <div className={`min-h-screen ${darkMode ? ' bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <LandingPage darkMode={darkMode} />
      <AboutSection darkMode={darkMode} />
      <JobBoard darkMode={darkMode} />
      <NssBoard darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default Home;
