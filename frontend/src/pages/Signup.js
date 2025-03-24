import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../api";
import { FaUser, FaEnvelope, FaLock, FaTags, FaArrowRight } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    interests: "" 
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const isValid = password.length >= minLength && 
                   hasUpperCase && 
                   hasLowerCase && 
                   hasNumber && 
                   hasSpecialChar;

    return {
      isValid,
      message: isValid ? null : 'Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.'
    };
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password
    const { isValid, message } = validatePassword(formData.password);
    if (!isValid) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setIsLoading(true);
    try {
      await signup(formData);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error);
      toast.error("Signup failed. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Main card */}
      <div className="relative w-full max-w-md">
        {/* Glass card */}
        <div className="backdrop-blur-lg bg-white/30 rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          {/* Decorative header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center">
            <h2 className="text-3xl font-bold text-white">Create Account</h2>
            <p className="text-blue-100 mt-2">Join our news community today</p>
          </div>

          {/* Form container */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-blue-500" />
                </div>
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 bg-white/70 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-blue-500" />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 bg-white/70 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-blue-500" />
                </div>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 bg-white/70 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Interests field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaTags className="text-blue-500" />
                </div>
                <input
                  name="interests"
                  type="text"
                  placeholder="Interests (comma separated)"
                  className="w-full pl-10 pr-4 py-3 bg-white/70 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  onChange={handleChange}
                />
                <p className="text-xs text-gray-500 mt-1">e.g. technology, sports, politics</p>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Sign Up <FaArrowRight className="ml-2" />
                  </span>
                )}
              </button>
              
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-blue-600 hover:text-blue-800 font-medium transition-all hover:underline flex items-center justify-center"
                  >
                    Login here 
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Decorative image */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 opacity-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4F46E5" d="M45.2,-58.1C58.4,-48.4,68.9,-34.8,71.7,-19.7C74.5,-4.6,69.5,12,61.1,27.2C52.7,42.4,40.9,56.2,25.2,65.3C9.5,74.4,-10.1,78.8,-26.4,72.9C-42.7,67,-55.7,50.8,-62.4,32.6C-69.1,14.4,-69.5,-5.8,-63.1,-23.1C-56.7,-40.4,-43.5,-54.9,-28.8,-63.9C-14.1,-72.9,2.1,-76.5,19.3,-72.5C36.5,-68.5,54.6,-56.9,45.2,-58.1Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      {/* Add some global styles for the animation */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Signup;