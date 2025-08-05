import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const todoListSchema = new mongoose.Schema({
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [itemSchema],
});

const TodoList = mongoose.model('TodoList', todoListSchema);
export default TodoList;