const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter")

const URL = require("./models/url");
const { set } = require("mongoose");

const app = express();
const PORT = 8001;

//Connect to MongoDB
connectToMongoDB(
  "mongodb+srv://tayyabhameed103:tayyabhameed103@learningnode.2g0s703.mongodb.net/"
)
  .then(() => console.log("MongoDb Connected successfully"))
  .catch((err) => console.log("MongoDb Connection Failed", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// app.get("/test", async (req, res) => {
//   const allUsers = await URL.find({});
//   return res.render("home",{
//     urls: allUsers
//   });
// });

// app.get("/test2", (req, res)=>{
//   return res.end("<h1>Test 2 route working</h1>");
// })

app.use("/url", urlRoute);
app.use("/", staticRouter);

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
