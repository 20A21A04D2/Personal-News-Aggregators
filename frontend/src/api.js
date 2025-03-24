import axios from "axios";

// Replace with your Render backend URL
const API = axios.create({ 
  baseURL: "https://personal-news-aggregator.onrender.com/api" 
});


export const signup = (formData) => API.post("/auth/signup", formData);
export const login = (formData) => API.post("/auth/login", formData);
export const getProfile = (token) =>
  API.get("/auth/profile", { headers: { Authorization: `Bearer ${token}` } });

export const fetchNews = (token) =>
  API.get("/news", { headers: { Authorization: `Bearer ${token}` } });

export const saveArticle = (token, article) =>
  API.post("/articles/save", article, { headers: { Authorization: `Bearer ${token}` } });

export const getSavedArticles = (token) =>
  API.get("/articles/saved", { headers: { Authorization: `Bearer ${token}` } });

export const deleteArticle = (token, articleId) =>
  API.delete(`/articles/delete/${articleId}`, { headers: { Authorization: `Bearer ${token}` } });

export const summarizeArticle = (token, articleId) => 
  API.post(`/articles/summarize/${articleId}`, {}, { headers: { Authorization: `Bearer ${token}` } });