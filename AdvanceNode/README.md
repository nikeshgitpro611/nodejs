repo - https://github.com/StephenGrider/AdvancedNodeComplete

> # Module
- crypto
- FS
- Path
- Os
- Http
> Os modules deside which threads should be process
> thred is unit of instruction for task execution 
> v8 responcible for c++ code binding for js and Libuv is reponsible for Thread pool.
>  use case of res.on in a Node.js application to handle an HTTP response

# Q// Why Fs Using Threadpool but HTTP modal not using Thread Pool
- Ans - http directely run not invode in loop
> # Cluster mode 
- why using when multiple user req on url that time our application will little bit slow due to singal thred so for mitigate we are using Cluster menager its multiple thread and work kind of adminstrater 
on that cluster module called fork.(Cluster.fork()) if we are using fork node internally back to app.js file and menage every thing.
- Cluster mode is used to start up multiple copies of Node.js that are all running your server instances inside them.
- by starting up multiple copies,we get multiple instances of the event loop so it vaguely somewhat works in a similar fashion as making Node kind of multi-threaded.
- The cluster manager is responsible for monitoring the health of individual instances of our application that we're going to launch simultaneously on our computer.

# We can inmpore node performancr
- yes by two way
01. use Node in cluster mode
02. Use Worker Thread
