const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function generateShortUrl(req, res) {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ error: "Url is required" });
  }

  const shortID = nanoid(8);

  try {
    await URL.create({
      shortId: shortID,
      redirectUrl: req.body.url,
      visitHistory: [],
    });
    return res.status(200).json({ id: shortID });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
}

async function redirectToOriginalURL(req, res) {
  const shortId = req.params.shortId;
  
  try {
    const response = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    res.status(300).redirect(response.redirectUrl);
    
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
}


// Get the count of click on short url
async function getURLAnalytics(req, res) {
  const shortId = req.params.shortId;
  try {
    const response = await URL.findOne({shortId});
    console.log(response)
    
    if(!response) {
      return res.status(404).json({error: "Short URL not found"});
    }

    res.status(200).json({totalClicks: response.visitHistory.length, response});

  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
}

module.exports = { generateShortUrl, redirectToOriginalURL, getURLAnalytics };
