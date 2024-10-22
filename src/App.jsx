
import { useState } from 'react';
import JobBoard from './component/JobBoard'
import LandingPage from './component/LandingPage';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import About from './component/About';


function App() {
  const [darkMode, setDarkMode] = useState(false);

 

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
    
         <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <LandingPage darkMode={darkMode}/>
        <About darkMode={darkMode} />
      <JobBoard darkMode={darkMode} />
      <Footer darkMode={darkMode} />
      
    </div>
    </>
  )
}

export default App
