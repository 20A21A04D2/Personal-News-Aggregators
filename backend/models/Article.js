const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    image: { type: String },
    publishedAt: { type: Date },
    tags: { type: [String], default: [] },
    isRead: { type: Boolean, default: false },
    isLiked: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Article", ArticleSchema);