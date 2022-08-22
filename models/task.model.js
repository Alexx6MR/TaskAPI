const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete")




const taskSchema = mongoose.Schema({
  title:  String, // String is shorthand for {type: String}
  content: String,
  author:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }, 
},
{
  versionKey: false,
  timestamps: true,
}
); 


/**
 * Implementar metodo de relacion
 */


 taskSchema.statics.findAllData = function () {
 const joinData = this.aggregate([
   
    {
      $lookup: { 
        from: "users", // cual tabla buscar
        localField: "author", // que campo comparar de nuestro schema
        foreignField: "_id", // el campo comparado de la otra tabla
        as: "tasks", // como entregarlo (array mode)

      }
    },
  ])

  return joinData
 }


 taskSchema.statics.checkDuplicate = function ({taskTitle, userID}) {
  const joinData = this.aggregate([
    { 
      $match: 
      {
        title: taskTitle,
        author: userID
      } 
    },
    {
      $lookup: { 
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "owner",

      }
    },
    { 
      $unwind: "$owner"
    }
  ])

  return joinData
 }

 taskSchema.statics.findOneTask = function ({taskID, userID}) {
  const joinData = this.aggregate([
    { 
      $match: 
      {
        _id: mongoose.Types.ObjectId(taskID),
        author: userID
      } 
    },
    {
      $lookup: { 
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "owner",

      }
    },
    { 
      $unwind: "$owner"
    }
  ])

  return joinData
 }

taskSchema.plugin(mongooseDelete, { overrideMethods: "all"});
module.exports = mongoose.model("task", taskSchema);