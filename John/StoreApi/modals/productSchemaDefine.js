const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product Name must be provide"],
  },
  price: {
    type: Number,
    required: [true, "product price must be provide"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum:{
        values: ["ikea","liddy","cressa","marcos"],
        message: '{values} is not valid'
    }
    // enum: ["ikea","liddy","cressa","marcos"],
  },
});

module.exports = mongoose.model('Product', productSchema)
