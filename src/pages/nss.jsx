
import { useState } from 'react';
import Navbar from '../component/Navbar';
import LandingPage from '../component/LandingPage';
import JobBoard from '../component/JobBoard';
import AboutSection from '../component/About';
import Footer from '../component/Footer';
import NssCard from '../component/nsscard';

export default function  Nss() {
    const [darkMode, setDarkMode] = useState(false);
  
    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
    };
  return (
    <div className ="text-lg  flex-1 bg-red-500 h-screen ">
        <h1 className="text-3xl font-bold text-center text-white pt-20">NSS Page</h1>
        <p className="text-center text-white mt-4">This is the NSS page content.</p>
        
    </div>
  )
}
