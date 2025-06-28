import React, { useState } from 'react';
import { Bar, BarChart, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import './AboutSection.css'; // Import the CSS file for custom styles

// Enhanced data showing growth in cybersecurity training
const studentData = [
  { name: 'Jan', students: 1200, certifications: 240, placements: 180 },
  { name: 'Feb', students: 1500, certifications: 320, placements: 220 },
  { name: 'Mar', students: 1800, certifications: 410, placements: 280 },
  { name: 'Apr', students: 2200, certifications: 520, placements: 350 },
  { name: 'May', students: 2600, certifications: 650, placements: 420 },
  { name: 'Jun', students: 3100, certifications: 780, placements: 510 },
  { name: 'Jul', students: 3800, certifications: 950, placements: 640 },
];

const impactData = [
  { name: 'Beginner', previous: 1200, current: 2800 },
  { name: 'Intermediate', previous: 800, current: 1900 },
  { name: 'Advanced', previous: 400, current: 1100 },
  { name: 'Expert', previous: 200, current: 600 },
];

const AboutSection = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('mission');

  return (
    <div className="about-section-container">
      <section
        id="about"
        className={`py-16 px-4 transition-all duration-500 relative ${
          darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <h2 className="text-center text-4xl font-bold mb-12 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
          About Educ8Africa
        </h2>

        {/* Centered Company Description */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center space-y-6">
            <p className={`text-xl leading-relaxed font-semibold ${
              darkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>
              Educ8Africa is a bold knowledge and skill transfer institution on a mission to bridge the gap between academic theory and industry relevance in Africa.
              Through two powerful arms — our Core Operations and our CSR initiative, Grow with Educ8Africa — we equip Africa's youth with the requisite cybersecurity skills and global credentials needed to lead, protect, and innovate in the digital age.
            </p>
            <p className={`text-xl leading-relaxed font-semibold ${
              darkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>
              Our National Service Program places graduates in high-impact roles across cybersecurity, tech training, media, and operations.
              Our CSR arm, Grow with Educ8Africa, extends globally recognized cybersecurity certifications to students at subsidized rates, turning potential into job-ready power.
            </p>
            <p className={`text-xl leading-relaxed font-bold ${
              darkMode ? 'text-red-400' : 'text-red-600'
            }`}>
              From hands-on training to industry projects, we are not here to tick boxes — we are here to spark transformation. If you are serious about skills, relevance, and the future of Africa, Educ8Africa is where your journey begins.
            </p>
          </div>
        </div>

        <div className="sticky max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-12">
          {/* Left Column */}
          <div className="lg:w-1/3 lg:sticky lg:top-8">
            <div className="flex flex-col gap-2">
              {['mission', 'vision', 'values'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 text-left font-medium
                    ${activeTab === tab
                      ? 'bg-red-500 text-white transform scale-105'
                      : darkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Our {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Mission, Vision, Values Content */}
          <div className="lg:w-2/3">
            <div className="space-y-12">
              {activeTab === 'mission' && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className={`text-3xl font-bold mb-4 ${
                      darkMode ? 'text-red-400' : 'text-red-600'
                    }`}>Our Mission</h3>
                    <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
                  </div>
                  <p className={`text-lg leading-relaxed text-center max-w-4xl mx-auto ${
                    darkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    At Educ8Africa, our mission is to bridge the cybersecurity skills gap across Africa by providing world-class training and certification programs. We empower individuals to protect digital infrastructures and build resilient cyber ecosystems.
                  </p>
                  <div className={`bg-gradient-to-br ${!darkMode ? 'from-red-50 to-gray-50' : "from-gray-800 to-gray-900"} p-8 rounded-xl shadow-lg`}>
                    <h4 className={`text-xl font-semibold mb-6 text-center ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>Our Growing Impact</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={studentData}>
                        <XAxis dataKey="name" stroke={darkMode ? "#fff" : "#000"} />
                        <YAxis stroke={darkMode ? "#fff" : "#000"} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="students" name="Students Enrolled" stroke="#ef4444" strokeWidth={2} />
                        <Line type="monotone" dataKey="certifications" name="Certifications" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="placements" name="Industry Placements" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className={`text-3xl font-bold mb-4 ${
                      darkMode ? 'text-red-400' : 'text-red-600'
                    }`}>Our Vision</h3>
                    <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
                  </div>
                  <p className={`text-lg leading-relaxed text-center max-w-4xl mx-auto ${
                    darkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    We envision Africa as a global hub for cybersecurity excellence, where every organization has access to skilled professionals capable of defending against evolving digital threats. By 2025, we aim to train 100,000 cybersecurity professionals across the continent.
                  </p>
                  <div className={`bg-gradient-to-br ${!darkMode ? 'from-red-50 to-gray-50' : "from-gray-800 to-gray-900"} p-8 rounded-xl shadow-lg`}>
                    <h4 className={`text-xl font-semibold mb-6 text-center ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>Skill Level Growth</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={impactData}>
                        <XAxis dataKey="name" stroke={darkMode ? "#fff" : "#000"} />
                        <YAxis stroke={darkMode ? "#fff" : "#000"} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="previous" name="Previous Year" fill="#6b7280" />
                        <Bar dataKey="current" name="Current Year" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {activeTab === 'values' && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className={`text-3xl font-bold mb-4 ${
                      darkMode ? 'text-red-400' : 'text-red-600'
                    }`}>Our Core Values</h3>
                    <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    {[
                      {
                        title: "Excellence in Security",
                        description: "We maintain the highest standards in cybersecurity education, staying current with emerging threats and defense strategies."
                      },
                      {
                        title: "Ethical Practice",
                        description: "We promote responsible security practices and ethical hacking principles, ensuring our graduates become trusted security professionals."
                      },
                      {
                        title: "Innovation & Adaptability",
                        description: "We continuously evolve our curriculum to address new cyber threats and technologies, preparing students for real-world challenges."
                      },
                      {
                        title: "Inclusive Growth",
                        description: "We believe in making cybersecurity education accessible to all, regardless of background or prior technical experience."
                      },
                      {
                        title: "Industry Partnership",
                        description: "We collaborate with leading security firms to provide practical exposure and placement opportunities for our students."
                      },
                      {
                        title: "Community Impact",
                        description: "We build a strong network of security professionals who contribute to Africa's digital sovereignty and cyber resilience."
                      }
                    ].map((value, index) => (
                      <div 
                        key={index}
                        className={`p-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105
                          ${darkMode 
                            ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
                            : 'bg-white hover:bg-gray-50 border border-gray-200'
                          }`}
                      >
                        <h4 className={`text-xl font-semibold mb-3 ${
                          darkMode ? 'text-red-400' : 'text-red-600'
                        }`}>{value.title}</h4>
                        <p className={`text-base leading-relaxed ${
                          darkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>{value.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
