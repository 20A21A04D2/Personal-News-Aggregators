import React from 'react';
import { FaUserPlus, FaSignInAlt, FaNewspaper, FaRobot, FaHeart, FaGithub, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PersonalNewsAggregator = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/Signup');
  };

  const handleLoginClick = () => {
    navigate('/Login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <FaNewspaper className="text-3xl text-indigo-200" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-100">
              Personal News Aggregator
            </span>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={handleSignUpClick}
              className="flex items-center space-x-2 bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg shadow-md transition-all transform hover:scale-105"
            >
              <FaUserPlus className="text-lg" />
              <span>Sign Up</span>
            </button>
            <button 
              onClick={handleLoginClick}
              className="flex items-center space-x-2 bg-transparent border-2 border-white hover:bg-white hover:text-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-all transform hover:scale-105"
            >
              <FaSignInAlt className="text-lg" />
              <span>Login</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-6 flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/2 p-6 space-y-6">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800 leading-tight">
            AI-Powered News Summarization Tailored For You
          </h1>
          <p className="text-xl text-gray-700">
            Discover the most relevant news stories distilled into concise summaries by our advanced AI technology. Save time while staying informed.
          </p>
          <div className="flex space-x-6 mt-8">
            <div className="bg-white p-4 rounded-xl shadow-lg border-l-4 border-blue-500">
              <FaRobot className="text-3xl text-blue-600 mb-2" />
              <h3 className="font-semibold text-lg">Smart Summaries</h3>
              <p className="text-gray-600">Get to the point quickly</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border-l-4 border-indigo-500">
              <FaHeart className="text-3xl text-indigo-600 mb-2" />
              <h3 className="font-semibold text-lg">Personalized</h3>
              <p className="text-gray-600">Curated for your interests</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 p-6 flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="AI summarizing news articles" 
            className="rounded-2xl shadow-2xl max-w-full h-auto border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-300"
          />
        </div>
      </main>

      {/* Features Section */}
      <section className="py-12 bg-white bg-opacity-50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
            Why Choose Our News Aggregator?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow transform hover:-translate-y-2">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaRobot className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Advanced AI Summarization</h3>
              <p className="text-gray-600 text-center">
                Our cutting-edge AI analyzes and condenses news articles into clear, concise summaries without losing key information.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow transform hover:-translate-y-2">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaNewspaper className="text-2xl text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Personalized News Feed</h3>
              <p className="text-gray-600 text-center">
                The more you use it, the better it understands your preferences, delivering only the most relevant content.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow transform hover:-translate-y-2">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaHeart className="text-2xl text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Save & Organize</h3>
              <p className="text-gray-600 text-center">
                Bookmark important articles, categorize them, and access them anytime from your personal library.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <FaNewspaper className="text-3xl text-indigo-300" />
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                  News Aggregator
                </span>
              </div>
              <p className="text-blue-200 max-w-md">
                Bringing you the world's news, summarized by AI, personalized for you.
              </p>
            </div>
            
            <div className="flex space-x-6 mb-8 md:mb-0">
              <a 
                href="https://github.com/20A21A04D2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-full transition-all transform hover:scale-110"
                aria-label="GitHub"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a 
                href="https://www.linkedin.com/in/naga-sai-subba-reddy-medapati-44750b254" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-full transition-all transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-2xl" />
              </a>
              <a 
                href="https://stupendous-semolina-f4b64f.netlify.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-full transition-all flex items-center justify-center transition-all transform hover:scale-110"
                aria-label="Portfolio"
              >
                <FaExternalLinkAlt className="text-xl" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-blue-700 mt-8 pt-6 text-center text-blue-300">
            <p>© {new Date().getFullYear()} Personal News Aggregator with AI Summarization. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PersonalNewsAggregator;