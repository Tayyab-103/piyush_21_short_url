const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");

const URL = require("./models/url");

const app = express();
const PORT = 8001;

//Connect to MongoDB
connectToMongoDB(
  "mongodb+srv://tayyabhameed103:tayyabhameed103@learningnode.2g0s703.mongodb.net/"
)
  .then(() => console.log("MongoDb Connected successfully"))
  .catch((err) => console.log("MongoDb Connection Failed", err));

app.use(express.json());

app.use("/url", urlRoute);

// app.get("/:shortId", async (req, res) => {
//   const shortId = req.params.shortId;
//   const urlEntry = await URL.findOneAndUpdate(
//     { shortId },
//     { $push: { visitHistory: { timestamp: Date.now() } } }
//   );
//   if (!urlEntry) {
//     return res.status(404).json({ error: "Short URL not found" });
//   }
//   // Redirect to the original URL
//   return res.redirect(urlEntry.redirectURL);
// });

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
