const express = require('express');
const app = express();

app.get('/', (req,res) =>{
    res.send('Hello World!!!');

});

app.get('/api/courses', (req,res) =>{

    res.send([1, 2, 3,])
})


app.get('/api/courses/:id', (req,res) =>{

    res.send(req.params.id);
    
})

app.get('/api/posts/:year/:month/:h', (req,res) =>{

    //res.send(req.params); // returns the params
    res.send(req.query); // returns name value pairs
    
})

// PORT
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`listening port ${port}....`);
})


/*
app.post()
app.put()
app.delete()

*/


/*
const http = require('http');
const server = http.createServer((req, res) =>{
    if(req.url === '/'){
        res.write('Hello World');
        res.end();
    }

    if(req.url === 'api/courses'){
        res.write(JSON.stringify([1, 2 ,3]));
        res.end();
    }
});

server.listen(3000);
*/