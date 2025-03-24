const express = require("express");
const authMiddleware = require("../middleware/authmiddleware");
const Article = require("../models/Article");
const router = express.Router();
const Sentiment = require("sentiment");
const natural = require("natural");
const sentimentAnalyzer = new Sentiment();
// Save Article with Tags
router.post("/save", authMiddleware, async (req, res) => {
    try {
        const { title, description, url, image, publishedAt, tags } = req.body;
        const userId = req.user.id;

        const article = new Article({
            title,
            description,
            url,
            image,
            publishedAt,
            tags,
            userId
        });

        await article.save();
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get Saved Articles
router.get("/saved", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const articles = await Article.find({ userId });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});






// ✅ Route to summarize and analyze sentiment
router.post("/summarize/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const description = article.description || "";

    // ✅ Extract 3-5 key points from description
    const tokenizer = new natural.SentenceTokenizer();
    const sentences = tokenizer.tokenize(description);
    const summary = sentences.slice(0, 5); // Take first 5 sentences

    // ✅ Perform Sentiment Analysis
    const sentimentResult = sentimentAnalyzer.analyze(description);
    let sentiment = "Neutral";
    if (sentimentResult.score > 0) {
      sentiment = "Positive";
    } else if (sentimentResult.score < 0) {
      sentiment = "Negative";
    }

    res.json({ summary, sentiment });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;




// Delete Saved Article
router.delete("/delete/:id", authMiddleware, async (req, res) => {
    try {
        const articleId = req.params.id;
        await Article.findByIdAndDelete(articleId);
        res.json({ message: "Article deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;