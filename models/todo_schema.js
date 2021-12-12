import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const todoSchema = Schema({
    title: String,
    description: String,
    dateTime: String,
    status: Boolean,

});

const myTodoModel = model('Code', todoSchema)
export default myTodoModel;
