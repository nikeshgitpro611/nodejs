const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type : String,
    required : [true, "Must Provide Name"],
    trim : true,
    maxlength: [20, "Can not be more then 20 characters."]
  },
  completed: {
    type : String,
    default : false
  },
  random: String,
  amount: Number
});

module.exports = mongoose.model("Task", taskSchema);
