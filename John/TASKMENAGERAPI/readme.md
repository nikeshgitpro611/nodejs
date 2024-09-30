repo - https://github.com/john-smilga/node-express-course

Atlas Mongodb - 
```
const mongoose = require("mongoose");


const connectDb = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected To The Db.."))
    .catch((err) => console.error("Error connecting to DB:", err.message));
};

module.exports = connectDb;
```
```
// CORS
const corsOptions = {
  origin: "http://localhost:5173", // Fixed CORS origin (no trailing slash)
  optionsSuccessStatus: 200, // some legacy browsers (IE11, SmartTVs) choke on 204
};
// Middleware
app.use(cors(corsOptions));

const start = async () => {
  try {
    // Connect to MongoDB using the URI from the environment variable
    await connectDb(process.env.MONGO_URI);
    app.listen(5000, () => console.log("Server connected on port 5000"));
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
};

start()
```

::::::::::::WORK :::::::::::::::::::::::::::::

# Creat End Points
- getAllTask
> const task = await Task.find({});
- Update Task(Patch)
> const task = await Task.findById(req.body.id).exec();
> const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
        runValidators: true // Ensure that the data conforms to the schema
    });
- Creat Task(post)
const task = await Task.create(req.body);
- get Task Based on id
 > const task = await Task.findOne({ _id: id });
- Delet Task(Delet)
> const task = await Task.findOneAndDelete({ _id: id });



# Task Schema
```
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
```

# Q - What diffrance between put vs Patch

**Both use for Updating resource**

**Put -** Replaces an existing resource with a new one. When a PUT request is sent, the server replaces the existing resource with the new one. This means that all fields of the resource are sent in the request body, even if they are not modified

**Patch -** Modifies a resource by applying partial updates. When a PATCH request is sent, only the fields that need to be changed are sent in the request body. This helps with network utilization by sending less data to the server and consuming less bandwidth.
