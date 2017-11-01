const http = require('http');
const fs = require('fs')
const path = require('path')


const hostname = 'localhost';
const port=3000;

const server = http.createServer((req, res) =>{
    console.log("Request received: " +   req.url + ", Method:" + req.method);
    if(req.method == 'GET'){
        var fileURL;
        if(req.url=='/') 
            fileURL='/index.html';
        else 
            fileURL=req.url;
        
            var filePath = path.resolve('./public'+fileURL);
            const fileExt = path.extname(filePath);
            if(fileExt == '.html' || fileExt =='.htm'){
                fs.exists(filePath, (exists) => {               //A Callback functions
                    if(!exists){
                        res.status=404;
                        res.setHeader('Content-Type','text/html');
                        res.end('<html><body>File NOT found</body></html>');
                        return;
                    }
                    res.statusCode=200;
                    res.setHeader('Content-Type','text/html');
                    fs.createReadStream(filePath).pipe(res);
                })
    } else {
        res.status=404;
        res.setHeader('Content-Type','text/html');
        res.end('<html><body>A file other than HTML requested</body></html>');
        return;
    }
        
   

    } else {
        res.status=404;
        res.setHeader('Content-Type','text/html');
        res.end('<html><body>Request method other than GET are NOT supported.</body></html>');
        return;
    }
    });

    server.listen(port, hostname, ()=>{
        console.log(`Server runnnnnnning at http://${hostname}:${port} started`)
    });