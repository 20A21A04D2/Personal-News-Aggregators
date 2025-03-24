const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose=require('mongoose')

// Load environment variables first
dotenv.config();


const authRoutes = require("./routes/authroutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
//Mongodb Connection
const mongo_db_url = process.env.MONGO_URI;

mongoose.connect(mongo_db_url, {

})
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err))
// Routes
app.use("/api/auth", authRoutes);
const articleRoutes = require("./routes/articleRoutes");
app.use("/api/articles", articleRoutes);
app.use("/api/news", authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
