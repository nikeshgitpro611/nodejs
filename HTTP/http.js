const http = require('http');
// console.log('HTTP : ', http);

const server = http.createServer((req, res) => {
    // console.log('REQ : ', req);
    // console.log('url : ', req.url);
    // if (req.url === '/') { res.end() };
    // res.write('Hello Server 5000');
    // res.end()

    if (req.url === '/') {
        res.end('Welcome to our Home Page');
        return;
    }

    if (req.url === '/about') {
        res.end('Welcome to our about Page');
        return;
    }
    res.end(`Some thing Wrong`)


    // res.end(`Hello user Oppes 
    //         <a href = '/'> back Home </a>
    //         `)
});

server.listen(5000)