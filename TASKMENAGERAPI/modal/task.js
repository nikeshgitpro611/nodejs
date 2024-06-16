const mongoose =  require('mongoose');

// const taskSchema = new mongoose.Schema({
//     name: String,
//     completed: Boolean
// }) ;
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Must Provide name'],
        trim: true,
        maxlength: [20, 'Name can not be more then 20 charector']
    },
    completed: {
        type: Boolean,
        default: false,
        
    }
}) ;

module.exports =  mongoose.model('Task', taskSchema)