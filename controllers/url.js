const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl( req, res){
  const body = req.body;
  if(!body.url){
    return res.status(400).json({error: "URL is required"});
  }
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home",{
    id: shortID
  })
  // return res.status(201).json({Id: shortID});
}

async function handleGetRedirect(req, res){
  const shortId = req.params.shortId;
  const urlEntry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  if (!urlEntry) {
    return res.status(404).json({ error: "Short URL not found" });
  }
  // Redirect to the original URL
  return res.redirect(urlEntry.redirectURL);
}

async function handleGetAnalytics(req, res){
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetRedirect,
  handleGetAnalytics,
}