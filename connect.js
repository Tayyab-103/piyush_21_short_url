const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

// connection function
async function connectToMongoDB(url){
  return mongoose.connect(url);
}

module.exports = {
  connectToMongoDB,
}