const os =  require('os');
const path =  require('path');
const {readFileSync, writeFileSync} = require('fs')
// console.log('OS : ', os.totalmem());
const pathJoin = path.join('/context', 'pathtest', 'text.txt')
// console.log('Path : ', pathJoin);
// console.log('BaseName', path.basename(pathJoin));
// const absolutPath =  path.resolve(__dirname, 'context', 'pathtest', 'text.txt' );
// console.log('absolutPath : ', absolutPath)
// const readFirstFile =  readFileSync('./fs/fsOne.txt', 'utf-8')
// console.log('readFirstFile : ', readFirstFile);

// const writeFile =  writeFileSync('./fs/write.txt', 'Hello pass data2 mode World', {flag : 'a'});

// console.log('writeFile : ', writeFile);



// ---------------HttP Modle----