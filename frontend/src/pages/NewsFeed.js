import React, { useEffect, useState } from "react";
import { fetchNews, saveArticle, getSavedArticles, deleteArticle, summarizeArticle, getProfile } from "../api";
import { FaBookmark, FaRegBookmark, FaUser, FaTimes, FaSearch, FaTags, FaCheck, FaTrash, FaBars } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewsFeed = () => {
  // News Feed State
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tagInput, setTagInput] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showSavedArticles, setShowSavedArticles] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Profile State
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  
  const token = localStorage.getItem("token");

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      
      try {
        const [newsResponse, savedResponse, profileResponse] = await Promise.all([
          fetchNews(token),
          getSavedArticles(token),
          getProfile(token)
        ]);

        setArticles(newsResponse.data.map((article, index) => ({
          ...article,
          id: article.id || `temp-${index}-${Date.now()}`,
          isRead: false
        })));

        setSavedArticles(Array.isArray(savedResponse.data) ? savedResponse.data : []);
        setUser(profileResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Filter articles based on search
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSaveArticle = async () => {
    if (!tagInput.trim()) {
      toast.error("Please enter at least one tag!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const tags = tagInput.split(",").map(tag => tag.trim());
      await saveArticle(token, { ...selectedArticle, tags });
      const savedResponse = await getSavedArticles(token);
      setSavedArticles(savedResponse.data);
      
      toast.success("Article saved successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      setTagInput("");
      setShowTagInput(false);
    } catch (error) {
      console.error("Error saving article:", error);
      toast.error("Failed to save article", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleMarkRead = (articleId) => {
    setArticles(currentArticles => 
      currentArticles.map(article => 
        article.id === articleId ? { ...article, isRead: !article.isRead } : article
      )
    );
  };

  const handleDeleteArticle = async (articleId) => {
    try {
      await deleteArticle(token, articleId);
      setSavedArticles(savedArticles.filter(a => a._id !== articleId));
      
      toast.success("Article deleted successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error deleting article:", error);
      toast.error("Failed to delete article", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleSummarize = async (articleId) => {
    try {
      const { data } = await summarizeArticle(token, articleId);
      setSummaryData(data);
      setShowSummary(true);
    } catch (error) {
      console.error("Error summarizing article:", error);
      toast.error("Failed to summarize article", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 relative overflow-hidden">
      {/* Toast Container */}
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header - Mobile First */}
      <header className="relative z-10 flex justify-between items-center mb-8 p-4 backdrop-blur-sm bg-white/30 rounded-xl shadow-lg">
        <button 
          className="md:hidden p-2 rounded-full bg-white/70 hover:bg-white transition-all shadow-md"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <FaBars className="text-indigo-600 text-xl" />
        </button>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-indigo-700 text-center md:text-left">
            Personal News
          </h1>
        
        <div className="relative flex-grow mx-4 md:mx-0 md:flex-grow-0">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
  <div className="md:hidden fixed inset-0 z-50">
    {/* Backdrop that closes the menu when clicked */}
    <div 
      className="absolute inset-0 bg-black/30"
      onClick={() => setShowMobileMenu(false)}
    />
    
    {/* Menu content */}
    <div 
      className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-lg rounded-b-xl shadow-xl p-4 z-50"
      onClick={(e) => e.stopPropagation()} // Prevent clicks inside menu from closing it
    >
      <div className="flex justify-around">
        <button 
          onClick={() => {
            setShowProfile(!showProfile);
            setShowMobileMenu(false);
          }}
          className={`flex flex-col items-center p-2 rounded-lg ${
            showProfile ? 'bg-indigo-500 text-white' : 'bg-white hover:bg-gray-100'
          }`}
        >
          <FaUser className="text-xl mb-1" />
          <span className="text-xs">Profile</span>
        </button>

        <button 
          onClick={() => {
            setShowSavedArticles(!showSavedArticles);
            setShowMobileMenu(false);
          }}
          className="flex flex-col items-center p-2 rounded-lg bg-white hover:bg-gray-100 relative"
        >
          {savedArticles.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {savedArticles.length}
            </span>
          )}
          {showSavedArticles ? (
            <>
              <FaBookmark className="text-indigo-600 text-xl mb-1" />
              <span className="text-xs">Saved</span>
            </>
          ) : (
            <>
              <FaRegBookmark className="text-indigo-600 text-xl mb-1" />
              <span className="text-xs">Saved</span>
            </>
          )}
        </button>
      </div>
    </div>
  </div>
)}

        {/* Desktop Header Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className={`p-2 rounded-full transition-all shadow-md ${showProfile ? 'bg-indigo-500 text-white' : 'bg-white/70 hover:bg-white'}`}
          >
            <FaUser className="text-xl" />
          </button>

          <button 
            onClick={() => setShowSavedArticles(!showSavedArticles)}
            className="relative p-2 rounded-full bg-white/70 hover:bg-white transition-all shadow-md"
          >
            {savedArticles.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {savedArticles.length}
              </span>
            )}
            {showSavedArticles ? <FaBookmark className="text-indigo-600 text-xl" /> : <FaRegBookmark className="text-indigo-600 text-xl" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row">
        {/* News Articles */}
        <div className={`transition-all duration-300 ${showProfile ? 'md:w-2/3 md:pr-6' : 'w-full'}`}>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <div 
                  key={article.id} 
                  className={`bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] ${article.isRead ? 'opacity-80' : ''}`}
                >
                  <div className="relative h-40 sm:h-48 overflow-hidden rounded-lg mb-3 sm:mb-4">
                    <img
                      src={article.image || "https://source.unsplash.com/random/600x400/?news"}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform hover:scale-110"
                    />
                    <button
                      onClick={() => handleMarkRead(article.id)}
                      className={`absolute top-2 right-2 p-1 sm:p-2 rounded-full ${article.isRead ? 'bg-green-500' : 'bg-blue-500'} text-white shadow-md`}
                    >
                      {article.isRead ? <FaCheck className="text-xs sm:text-base" /> : '👁️'}
                    </button>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                    {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Date not available"}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-4">
                    <button
                      onClick={() => {
                        setSelectedArticle(article);
                        setShowTagInput(true);
                      }}
                      className="flex items-center gap-1 bg-indigo-500 text-white py-1 px-2 sm:py-2 sm:px-3 rounded-lg hover:bg-indigo-600 transition-all text-xs sm:text-sm"
                    >
                      <FaTags className="text-xs sm:text-sm" /> Save
                    </button>
                    
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-500 text-white py-1 px-2 sm:py-2 sm:px-3 rounded-lg hover:bg-blue-600 transition-all text-xs sm:text-sm"
                    >
                      Read Full
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile Panel - Integrated into main page */}
        {showProfile && (
          <div className="w-full md:w-1/3 bg-white/80 backdrop-blur-lg p-4 sm:p-6 rounded-xl shadow-lg border border-white/30 mt-4 md:mt-0">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-indigo-700">Your Profile</h2>
              <button 
                onClick={() => setShowProfile(false)}
                className="p-1 sm:p-2 rounded-full hover:bg-gray-100"
              >
                <FaTimes className="text-gray-500" />
              </button>
            </div>
            
            {user ? (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-2 sm:mb-4 shadow-md">
                    <span className="text-xl sm:text-3xl text-indigo-600 font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">{user.name}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{user.email}</p>
                </div>
                
                <div className="bg-indigo-50/50 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 mb-1 sm:mb-2 text-sm sm:text-base">Your Interests</h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {user.interests.map((interest, index) => (
                      <span key={index} className="bg-indigo-100 text-indigo-800 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-indigo-50/50 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 mb-1 sm:mb-2 text-sm sm:text-base">News Preferences</h4>
                  <p className="text-gray-700 text-sm sm:text-base">You have {savedArticles.length} saved articles</p>
                  <button 
                    onClick={() => {
                      setShowSavedArticles(true);
                      setShowProfile(false);
                    }}
                    className="mt-2 w-full bg-indigo-500 text-white py-1 sm:py-2 px-4 rounded-lg hover:bg-indigo-600 transition-all text-sm sm:text-base"
                  >
                    View Saved Articles
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Saved Articles Modal - Responsive */}
      {showSavedArticles && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-indigo-700">Saved Articles</h3>
                <button
                  onClick={() => setShowSavedArticles(false)}
                  className="p-1 sm:p-2 rounded-full hover:bg-gray-100"
                >
                  <FaTimes className="text-gray-500" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {savedArticles.length > 0 ? (
                  savedArticles.map((article) => (
                    <div key={article._id} className="bg-white p-3 sm:p-4 rounded-lg shadow-md border border-gray-100">
                      <img
                        src={article.image || "https://source.unsplash.com/random/600x400/?news"}
                        alt={article.title}
                        className="w-full h-32 sm:h-40 object-cover rounded-lg mb-2 sm:mb-3"
                      />
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2">{article.title}</h3>
                      <p className="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-2">
                        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Date not available"}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                        {article.tags?.map((tag, i) => (
                          <span key={i} className="bg-indigo-100 text-indigo-800 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xxs sm:text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-1 sm:gap-2">
                        <button
                          onClick={() => handleSummarize(article._id)}
                          className="bg-purple-500 text-white py-0.5 px-2 sm:py-1 sm:px-3 rounded-lg hover:bg-purple-600 transition-all text-xs sm:text-sm"
                        >
                          Summarize
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article._id)}
                          className="flex items-center gap-1 bg-red-500 text-white py-0.5 px-2 sm:py-1 sm:px-3 rounded-lg hover:bg-red-600 transition-all text-xs sm:text-sm"
                        >
                          <FaTrash className="text-xs sm:text-sm" /> Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8 sm:py-10 text-gray-500 text-sm sm:text-base">
                    You haven't saved any articles yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tag Input Modal - Responsive */}
      {showTagInput && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-lg p-4 sm:p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h3 className="text-lg sm:text-xl font-bold text-indigo-700 mb-3 sm:mb-4">Save Article</h3>
            <div className="mb-3 sm:mb-4">
              <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Add Tags (comma separated)</label>
              <div className="relative">
                <FaTags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="technology, business, health"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setShowTagInput(false);
                  setTagInput("");
                }}
                className="bg-gray-300 text-gray-700 py-1 sm:py-2 px-3 sm:px-4 rounded-lg hover:bg-gray-400 transition-all text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveArticle}
                className="bg-indigo-500 text-white py-1 sm:py-2 px-3 sm:px-4 rounded-lg hover:bg-indigo-600 transition-all text-sm sm:text-base"
              >
                Save Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Modal - Responsive */}
      {showSummary && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-lg p-4 sm:p-6 rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-indigo-700">Article Summary</h3>
              <button
                onClick={() => setShowSummary(false)}
                className="p-1 sm:p-2 rounded-full hover:bg-gray-100"
              >
                <FaTimes className="text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-indigo-50/50 p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-700 mb-1 sm:mb-2 text-sm sm:text-base">Key Points:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm sm:text-base">
                  {summaryData?.summary.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center text-sm sm:text-base">
                <span className="font-semibold text-gray-700 mr-2">Sentiment:</span>
                <span className={`px-2 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                  summaryData?.sentiment === "Positive" ? "bg-green-100 text-green-800" :
                  summaryData?.sentiment === "Negative" ? "bg-red-100 text-red-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {summaryData?.sentiment}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation styles */}
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

export default NewsFeed;