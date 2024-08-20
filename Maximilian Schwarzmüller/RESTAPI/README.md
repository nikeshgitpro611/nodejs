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
