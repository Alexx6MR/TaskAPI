const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete")

const taskSchema = mongoose.Schema({
  title:  String, // String is shorthand for {type: String}
  content: String,
  author:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
  
});


taskSchema.plugin(mongooseDelete, { overrideMethods: "all"});
module.exports = mongoose.model("task", taskSchema);