REPO - https://github.com/john-smilga/node-express-course

<!-- #Importants -->


global - no window
__dirname = path of current directory
__filename = file name
require =  function to use module(commonjs)
module = information about current module(file)
process  = info about env wher the program being execute

<!-- #module -->
module.exports.fruits = ['Apple', 'Banana', 'Orange', 'Mango'];

const data = {
  name: 'Jone Data',
};

module.exports.singalPerson = data.name;

# module path
how to get base name path
const pathJoin = path.join('/context', 'pathtest', 'text.txt')
console.log('Path : ', pathJoin);
console.log('BaseName', path.basename(pathJoin));

- get absolut path
const absolutPath =  path.resolve(__dirname, 'context', 'pathtest', 'text.txt' );
console.log('absolutPath : ', absolutPath) 

# module fs

- read file and readFile
const readFirstFile =  readFileSync('./fs/fsOne.txt', 'utf-8')
- write file
const writeFile =  writeFileSync('./fs/write.txt', 'Hello pass data2 mode World', {flag : 'a'});
Here flag is define to start and just like push our content..


# Http Modle

These are helpfull for request server and server will respond then user can get data
- we are creating server 
- handling req, res of url
- HTTP/http.js
- created server listen port

> HTTP METHODS

- GET - Read data
- Post - Inser Data
- Put - Update Data
- Delete - Delete Data

GET - Get all orders
POST - Insert and Placed on Orders
PUT - Update on behalf of specific id


# npm 
- it's called re-useable pakages that containts of js code.
- Another name called modules and dependancy
- npm is global command comes with nodejs
- local dependancy - use in particular project [NPM i]
- global dependancy - use it any project [npm i -g]

# Deploymet Platform
- digitalocean, horrocu

# Event loop 
 - it to handle asynchronous operations
 - It is the mechanism that allows Node.js to perform non-blocking I/O operations 
 - Node.js uses the event loop to handle asynchronous operations without blocking the main thread.
  > Event Loop is working in phase wise
  - TIME PHASE - Executes callbacks scheduled by setTimeout and setInterval.
  - PENDING CALLBACK PHASE - Executes I/O callbacks deferred to the next loop iteration.
  - Idle, Prepare Phase: Used internally by Node.js for internal operations.
  - Poll Phase: Retrieves new I/O events; executes I/O-related callbacks (excluding close callbacks, timers, and setImmediate).
  - Check Phase: 
  - Close Callbacks Phase:Executes close event callbacks (e.g., socket.on('close', ...)).

  > Task Queue and Microtask Queue:
  - Task Queue (Macro-tasks): Includes callbacks from setTimeout, setInterval, setImmediate, I/O, and others.
  - Microtask Queue: Includes promises and process.nextTick.

  > Order of Execution:
  - Microtasks are executed after each phase of the event loop.

Reff - https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick

# EXPRESSJS

- it's kind of famework of nodejs
> Performance

-  Express provides a thin layer of fundamental web application features, without obscuring Node.js features that you know and love.

> Middleware
- Express is a lightweight and flexible routing framework with minimal core features meant to be augmented through the use of Express middleware modules.

> Web Applications
- Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

> APIs
- With a myriad of HTTP utility methods and middleware at your disposal, creating a robust API is quick and easy.

> Methods
 >  app.get
   - In express method is res.send('msg)
   - it will take two argument app.get(path, callback Fn)
   - app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, "./navBar/index.html"))
      })

      reff - showNav.js
  - sendFile is use for redirect path
  - HOW TO show data.js file in json format reff -  dataJsonUi.js
  - json Data Show on ui after button click with a tag link 
  reff - conditionaldatShowUIJson.js
  - ROUTING PARAMS AND USING product id on url and show data
  reff - parmsRouting.js

  > Query String Perameters and URL Peramtrs
    - we have url - http://localhost:5000/api/query?name=JohnDoe&age=25&city=NewYork
    - 
 - app.put
 - app.push
 - app.delet
> app.all
 - You can use app.all to apply middleware that needs to run for every request to a specific path, such as authentication, logging, or setting response headers.

 - app.all('/user', (req, res, next) => {
  console.log('A request was made to /user');
  next(); // Pass control to the next handler.

  - ![alt text](image-1.png)
  - Status and Send 
  ![alt text](image-2.png)
});
> app.use 
 - It,s responsible for Middleware
> app.listen
 - Responsible for port configure

 > API VS SSR

 ![alt text](image-3.png)

 # Middleware
 - it's a function that request to the servr 
 - express is based on bunch of middleware
 - when you work with middleware must be pass next() if not then browser will be not loded
 - all kind of logic we can setup in middleware
 - two case here either u pass next() else trminate funtion like as res.send('msg')
 - app.use('path will apply on all router', exprted function)
 ref - middleWareBasic.js
 - // for multiple middlewareval.js and middlewareBasic.js
    app.use([getHome, authrise])

 Q// How we pass two middleware in single route
 Ans - app.get('/about',[getHome, authrise], (req, res) =>{
    console.log('User : ', req.user);
    res.send('About')
})

Q// can we creat own middleware/ Express/ third-party

 - Yes We can creat Own Middleware app.use(//logic)
 - Express Also app.use(express.static('path'))
 - Third Party morgan npm reff - https://expressjs.com/en/resources/middleware/morgan.html
 
 Q// creat form and use post method
 - such cases i will use app.use(express.urlencoded({extended: false})) for get request data from body parser then we can able to show req.body data
 - ref - 

 # Install Postman
 - use for test API 

  1. use postman display some get data
   - reff data use (data.js/product)
   - Ans - Express / Postman/get.js

  2. in post cenerion need to be use
    - const bodyParser = require('body-parser');
    - // Middleware to parse JSON bodies  app.use(bodyParser.json());
    - Ans - Express / Postman/post.js
  
  3. Put req
   - for put required parms (for url id)
   - req body for update responce
   - Ans Reff -  Ans - Express / Postman/post.js

# route
 - inside Express folder
 - base url need to be common
 - ![alt text](image-4.png)
 - need to be use route.use(bodyParser.json()) middle ware
 - we are using kind of clear code of app.js
 - importing like as
 - app.use('/api/people', peopleRoute) [app.js] base rout and route import path
 - ![alt text](image-5.png)

# controller
 - for cleanig router using controler

 --------------------------------------------------------------------------------------------
 # TASK MENAGER API SESSION

 > Install dependancy
  -  "dependencies": {
    "dotenv": "^16.4.5", 
    "express": "^4.19.2",
    "mongoose": "^8.4.1"
    }

  - devdependancy nodemon
 