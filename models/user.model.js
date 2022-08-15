const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  username:  String, // String is shorthand for {type: String}
  email: String,
  password: String,
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


module.exports = mongoose.model("user", userSchema);