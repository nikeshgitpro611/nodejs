const cluster = require('cluster');


if (cluster.isMaster) {
    //Due to this function app.js excuted again as parent mode and isMaster will sate as a false.
    cluster.fork()
    // console.log('check', cluster.fork());
} else {
    const express = require('express');
    const app = express();
    const start = new Date()
    const funLoading = (duration) => {
        const testVal = new Date() - start
        while (new Date() - start) {
            console.log('duration', testVal);
        }
    }
    app.use('/', (req, res) => {
        funLoading(5000)
        res.send('Hi Check...')
    })
    app.listen(3001, () => console.log('Server connected.......!'))
}