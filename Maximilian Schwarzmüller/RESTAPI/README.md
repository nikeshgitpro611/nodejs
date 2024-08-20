# Official React Docs: https://reactjs.org/docs/getting-started.html

# Official Node.js Docs: https://nodejs.org/en/docs/

# Official Express.js Docs: https://expressjs.com/

# Official MongoDB Docs: https://docs.mongodb.com/

# body-parser
- handling incoming request
  > As of Express 4.16.0, the body-parser middleware is included in the Express package. You can use express.json() and express.urlencoded() directly without needing to install body-parser separately.

```
const express = require("express");
// const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen("3002", () => {
  console.log("Server Connected on 3001");
});
```
# Error Handling MiddleWare


```
app.use((error, req, res,next)=>{
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An Unknown Error Occured...!'});
})

Route
//Here Error Hnadling 
  if (!ageData) {
    const error = new Error('Some Thing Went Wrong data not Found of user age...');
    error.code = 404;
    return next(error) ;
    // return res.status(404).json({
    //   status: false,
    //   message: "Some Thing Went Wrong data not Found...",
    // });
  }

```

# Model-View-Controller (MVC) 
- the MVC pattern provides a structured way to build scalable and maintainable web applications. Here's how the MVC architecture is typically used in Node.js.
1. Modal
**Purpose**: Represents the data and business logic of the application. It interacts with the database, handles data validation, and implements the rules and logic that define how data is manipulated.
**Example in Node.js**: Using an ORM like Mongoose (for MongoDB) or Sequelize (for SQL databases) to define models and interact with the database.
**Use Case**: If you are building a blog, the model would represent posts, comments, users, etc., and handle operations like saving a new post, retrieving a list of posts, or deleting a comment.
2. View
**Purpose**: Represents the user interface of the application. It is responsible for presenting data to the user and handling user input.
**Example in Node.js**: Views can be rendered using templating engines like EJS, Pug, or Handlebars, which allow you to generate HTML dynamically based on data from the model.
Use Case: In a blog application, the view would be responsible for displaying the list of blog posts, showing a single post, or rendering a form for creating or editing a post.
3. Controller
**Purpose**: Acts as an intermediary between models and views. It handles incoming requests, processes the data through the model, and then returns the appropriate view.
**Example in Node.js**: Controllers are typically implemented as functions that are invoked when specific routes are hit. For instance, Express.js might be used to define a controller that handles HTTP requests.
**Use Case**: In a blog application, the controller would manage the logic for routes like /posts, /posts/:id, or /posts/new, handling CRUD operations for posts.
> Use Cases of MVC in Node.js
**Separation of Concerns**: MVC divides an application into three interconnected components, allowing developers to work on the model, view, or controller independently. This improves code organization and maintainability.

***Scalability***: By keeping the business logic (Model), user interface (View), and request handling (Controller) separate, the application becomes easier to scale. Changes to one component (e.g., changing the database structure) can be made with minimal impact on other components.

***Reusability***: Models can be reused across different controllers or views, and views can be rendered by different controllers, reducing code duplication.

**Testability**: Each component of the MVC architecture can be tested independently. For instance, you can unit test the model's business logic without worrying about the view or controller.

```
// Model: models/Post.js
const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Post', PostSchema);

// Controller: controllers/PostController.js
const Post = require('../models/Post');
exports.getAllPosts = async (req, res) => {
    const posts = await Post.find();
    res.render('posts', { posts });
};

// View: views/posts.ejs
<ul>
    <% posts.forEach(post => { %>
        <li><%= post.title %> by <%= post.author %></li>
    <% }); %>
</ul>

// Express Route: routes/index.js
const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
router.get('/posts', PostController.getAllPosts);
module.exports = router;
```

