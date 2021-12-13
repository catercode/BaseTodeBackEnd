import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import myTodoModel from './models/todo_schema.js';

dotenv.config();
const app = express();
const port = process.env.port || 5000;
const DB = process.env.DB_URL;
app.use(express.json());

//this is our first home route
app.get('/todo', async (req, res) => {
    const getAllTodo = await myTodoModel.find({})
    if (getAllTodo) {
        return res.status(200).json({
            status: true,
            message: 'Todo load successful',
            data: getAllTodo
        })
    } else {
        return res.status(404).json({
            status: false,
            message: 'Failed to load todo',

        })
    }
})
app.get('/todo/:completed', async (req, res) => {
    const { completed } = req.params
    console.log(completed)
    const updateTodo = await myTodoModel.find({}).where('completed').equals(completed)
    if (updateTodo) {
        return res.status(200).json({
            status: true,
            message: 'Todo fatch successful',
            data: updateTodo
        })

    } else {
        return res.status(200).json({
            status: false,
            message: 'Failed to fatch todo',
            data: updateTodo
        })
    }

})

//this is our todo route
app.post('/todo', async (req, res) => {
    const { title, description, dateTime, completed } = req.body
    const addNewTodo = await myTodoModel.create({
        title,
        description,
        dateTime,
        completed
    })
    if (addNewTodo) {
        return res.status(200).json({
            status: true,
            message: 'Todo add successful',
            data: addNewTodo
        })
    } else {
        return res.status(404).json({
            status: false,
            message: 'Todo add failed',

        })
    }

})

//this is my update route
app.put('/todo/:id', async (req, res) => {
    const { completed } = req.body
    const { id } = req.params.id
    const updateTodo = await myTodoModel.findByIdAndUpdate(req.params.id, req.body)
    if (updateTodo) {
        return res.status(200).json({
            status: true,
            message: 'Todo update successful',
            data: updateTodo
        })
    } else {
        return res.status(404).json({
            status: false,
            message: 'Todo update failed',
        })

    }

})
//this is my delete route
app.delete('/todo/:id', async (req, res) => {
    const deleteTodo = await myTodoModel.findByIdAndDelete(req.params.id)
    if (deleteTodo) {
        return res.status(200).json({
            status: true,
            message: 'Todo deleted successsful',
            data: deleteTodo
        })
    } else {
        return res.status(404).json({
            status: false,
            message: 'Todo deleted failed',
            data: deleteTodo
        })
    }
})

try {
    mongoose.connect(DB)
    console.log('Connection successfull')
} catch (error) {
    console.log('Connection Failed' + error)
}


app.listen(port, function () {
    console.log('App is listening to port ' + port);
});
