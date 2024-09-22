const express = require("express");
const {
  generateShortUrl,
  redirectToOriginalURL,
  getURLAnalytics,
} = require("../controllers/url");
const router = express.Router();

router.post('/', generateShortUrl);
router.get("/:shortId", redirectToOriginalURL);
router.get("/analytics/:shortId", getURLAnalytics);


module.exports = router;
