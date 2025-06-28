
import { useState } from 'react';
import Navbar from '../component/Navbar';
import NssBoard from '../component/NssBoard';
import Footer from '../component/Footer';

export default function Nss() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? ' bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <NssBoard darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}
