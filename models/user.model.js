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
},
{
  versionKey: false,
  timestamps: true,
});


userSchema.statics.findAuthorTask = function (id) {
  const joinData = this.aggregate([
    { 
      $match: 
      {
        _id: mongoose.Types.ObjectId(id)
      } 
    },
    {
      $lookup: { 
        from: "tasks", // cual tabla buscar
        localField: "_id", // que campo comparar de nuestro schema
        foreignField: "author", // el campo comparado de la otra tabla
        as: "tasks", // como entregarlo (array mode)

      }
    },
  ])

  return joinData
 }




userSchema.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("user", userSchema);