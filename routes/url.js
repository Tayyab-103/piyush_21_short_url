const express = require('express');
const { handleGenerateNewShortUrl, handleGetAnalytics, handleGetRedirect } = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);

router.get("/:shortId", handleGetRedirect);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;