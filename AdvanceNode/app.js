const express = require('express');
const app =  express();
const cluster =  require('cluster')


//Cluster
console.log('cluster: ', cluster.isMaster);
//Loading Time 

const start =   new Date()
const funLoading =  (duration) => {
    const testVal = new Date() - start
    while(new Date() - start){
        console.log('duration', testVal);
    }
}
app.use('/', (req, res)=>{
    funLoading(5000)
    res.send('Hi Check...')
})
app.listen(3001, ()=> console.log('Server connected.......!'))