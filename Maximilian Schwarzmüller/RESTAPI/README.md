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