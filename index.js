import express from 'express';
import mongoose from 'mongoose';
import myTodoModel from './models/todo_schema.js';
import fs from 'fs';
const app = express();
const port = 3000;


//this is our first home route
app.get('/todo', (req, res) => {
    fs.readFile('./database.json', function (err, data) {
        res.send(data.toString());
    })

})

//this is our todo route
app.post('/todo', (req, res) => {
    const c = { title, description, dateTime } = req.body;
    res.json(c)
})
//this is my update route
app.put('/todo/:id', (req, res) => {
    res.send('this route Update my todo');
})
//this is my delete route
app.delete('/todo/:id', (req, res) => {
    res.send('this route delete my todo')
})

try {
    mongoose.connect('mongodb://localhost/Code', {})
    console.log('Connection successfull')
} catch (error) {
    console.log('Connection Failed' + error)
}


app.listen(port, function () {
    console.log('App is listening to port ' + port);
});
