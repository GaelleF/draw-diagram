const fs = require('fs');
// ./la-belle-table-client

fs.readdir('./', res=>{
    setTimeout(()=> console.log('readdir : ', res),1000)
})