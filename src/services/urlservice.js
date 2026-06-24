const { nanoid } = require("nanoid");
const Url = require("../models/Url");

async function generateShortUrl(originalUrl) {
  let shortId;
  let exists = true;

  while (exists) {
    shortId = nanoid(7);
    exists = await Url.findOne({ shortId });
  }

  const url = await Url.create({
    originalUrl,
    shortId
  });

  return url;
}

module.exports = { generateShortUrl };