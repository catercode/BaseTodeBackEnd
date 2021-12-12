import express from 'express';
import mongoose from 'mongoose';
import myTodoModel from './models/todo_schema.js';
import fs from 'fs';

const app = express();
const port = 4000;
app.use(express.json());

//this is our first home route
app.get('/todo', async (req, res) => {
    const getAllTodos = await myTodoModel.find({})
    if (getAllTodos) {
        return res.status(200).json({
            status: true,
            message: 'Todo load successful',
            data: getAllTodos
        })
    } else {
        return res.status(400).json({
            status: false,
            message: 'Failed to load Todo',
            data: getAllTodos
        })
    }
})

app.get('/todo/:completed', async (req, res) => {
    const { completed } = req.params

    const getStatus = await myTodoModel.find({}).where('completed').equals(completed)
    if (getStatus) {
        return res.status(200).json({
            status: true,
            message: 'Todo fatch successful',
            data: getStatus
        })

    } else {
        return res.status(200).json({
            status: false,
            message: 'Failed to fatch todo',
            data: getStatus
        })
    }

})

//this is our todo route
app.post('/todo', async (req, res) => {
    const { title, description, dateTime, completed } = req.body;
    const AddNewTodo = await myTodoModel.create({
        title,
        description,
        dateTime,
        completed
    })
    if (AddNewTodo) {
        return res.status(200).json({
            status: true,
            message: 'Todo created successful',
            data: AddNewTodo
        })
    } else {
        return res.status(400).json({
            status: true,
            message: 'Faild to create todo',
            data: AddNewTodo
        })
    }
})

//this is my update route
app.put('/todo/:id', async (req, res) => {

    const updateTodo = await myTodoModel.findByIdAndUpdate(req.params.id, req.body)
    if (updateTodo) {
        return res.status(200).json({
            status: true,
            message: 'Todo update',
            data: updateTodo
        })
    } else {
        return req.status(200), json({
            status: false,
            message: 'Failed to update',
            data: updateTodo
        })
    }
}
)
//this is my delete route
// app.delete('/todo/:id', async (req, res) => {
//     const deleteTodo = await myTodoModel.findByIdAndDelete(res.params.id)
//     if (deleteTodo) {
//         return res.status(200).json({
//             status: true,
//             message: 'Todo delete',
//             data: deleteTodo
//         })
//     } else {
//         return req.status(400), json({
//             status: false,
//             message: 'Failed to delete',
//             data: deleteTodo
//         })
//     }
// })

try {
    mongoose.connect('mongodb://localhost/todo')
    console.log('Connection successfull')
} catch (error) {
    console.log('Connection Failed' + error)
}


app.listen(port, function () {
    console.log('App is listening to port ' + port);
});
