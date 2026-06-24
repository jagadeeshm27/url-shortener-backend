const Url = require("../models/Url");
const { generateShortUrl } = require("../services/urlService");

async function createShortUrl(req, res) {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "originalUrl required" });
    }

    const url = await generateShortUrl(originalUrl);

    res.json({
      shortUrl: `${process.env.BASE_URL}/${url.shortId}`,
      originalUrl: url.originalUrl
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function redirectUrl(req, res) {
  try {
    const { shortId } = req.params;

    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  createShortUrl,
  redirectUrl
};