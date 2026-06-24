const express = require("express");
const router = express.Router();

const {
  createShortUrl,
  redirectUrl
} = require("../controllers/urlController");

// HOME ROUTE
router.get("/", (req, res) => {
  res.send("URL Shortener API is running");
});

// API ROUTES
router.post("/shorten", createShortUrl);
router.get("/:shortId", redirectUrl);

module.exports = router;