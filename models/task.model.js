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


/**
 * Implementar metodo de relacion
 */


 taskSchema.statics.findAllData = function () {
  const joinData = this.aggregate([
    {
      $lookup: { 
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "Owner",

      }
    },
    { $unwind: "$Owner"}
  ])

  return joinData
 }

 taskSchema.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    { 
      $match: 
      {
        _id: mongoose.Types.ObjectId(id)
      } 
    },
    {
      $lookup: { 
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "Owner",

      }
    },
    { 
      $unwind: "$Owner"
    }
  ])

  return joinData
 }

taskSchema.plugin(mongooseDelete, { overrideMethods: "all"});
module.exports = mongoose.model("task", taskSchema);