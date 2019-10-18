const Joi = require('joi');
const express = require('express');
const app = express();


app.use(express.json()); // to parse the reuest

const courses = [
    {id:1, name:"course1"},
    {id:2, name:"course2"},
    {id:3, name:"course3"},
]

// Get requests

app.get('/', (req,res) =>{
    res.send('Hello World!!!');

});

app.get('/api/courses', (req,res) =>{

    //res.send([1, 2, 3,])
    res.send(courses)
})


app.get('/api/courses/:id', (req,res) =>{

    let course = courses.find(c => c.id === parseInt(req.params.id) );
    if(!course) //404
    {
        return res.status(404).send("The courses is not available");
        
        //res.send = "The courses is not available";

    }
    else
    {
        res.send(course)    
    }
    //res.send(courses)
    //res.send(req.params.id);
    
})

app.get('/api/posts/:year/:month/:h', (req,res) =>{

    //res.send(req.params); // returns the params
    res.send(req.query); // returns name value pairs
    
})

// Post requests

app.post('api/courses', (req, res)=>{

    /*
    const result = validateCourse(req.body);
    if(result.error)
    {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    */

    //using Es6 object destructuring

    const {error} = validateCourse(req.body);
    if(error)
    {
        return res.status(400).send(error.details[0].message);
        
    }


    const course = {
        id:courses.length + 1,
        name:req.body.name // need to enable the json parser
    };
    courses.push(course);
    res.send(course);
})


// PUT


app.put('/api/courses:id', (req,res) =>{

    let course = courses.find(c => c.id === parseInt(req.params.id) );

    if(!course) //404
    {
        return res.status(404).send("The courses is not available");
        
        //res.send = "The courses is not available";

    }
   
    const result = validateCourse(req.body);
    if(result.error)
    {
        return res.status(400).send(result.error.details[0].message);
        
    }

    course.name = req.body.name;
    res.send(course)    

    
})



// PUT


app.delete('/api/courses:id', (req,res) =>{

    let course = courses.find(c => c.id === parseInt(req.params.id) );

    if(!course) //404
    {
        return res.status(404).send("The courses is not available");
        
        //res.send = "The courses is not available";

    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

      
    res.send(course)    

    
})

// PORT
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`listening port ${port}....`);
})

function validateCourse(course){

    const schema = {
        name:Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)
}

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