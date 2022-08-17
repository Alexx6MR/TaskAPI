const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete")

const userSchema = mongoose.Schema({
  username:  String, // String is shorthand for {type: String}
  email: String,
  password: {
    type: String,
    select: false
  },
  role: {
    type: String,
    default: "USER"
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "task"
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
  
});

userSchema.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("user", userSchema);