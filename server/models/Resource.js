const mongoose = require("mongoose");
const resourceSchema = new mongoose.Schema({
  title: String,
  url: String,
  category: String,
});
module.exports = mongoose.model("Resource", resourceSchema);
