import express from 'express';
import TodoList from '../models/TodoList.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  const todos = await TodoList.find({ user: req.user._id });
  res.json(todos);
});

router.post('/', protect, async (req, res) => {
  const todo = await TodoList.create({ user: req.user._id, name: req.body.name, items: [] });
  res.json(todo);
});

router.post('/:id/items', protect, async (req, res) => {
  const todo = await TodoList.findById(req.params.id);
  todo.items.push({ text: req.body.text, completed: false });
  await todo.save();
  res.json(todo);
});

router.put('/:listId/items/:itemId', protect, async (req, res) => {
  const todo = await TodoList.findById(req.params.listId);
  const item = todo.items.id(req.params.itemId);
  item.text = req.body.text;
  item.completed = req.body.completed;
  await todo.save();
  res.json(todo);
});

router.delete('/:listId/items/:itemId', protect, async (req, res) => {
  const todo = await TodoList.findById(req.params.listId);
  todo.items.id(req.params.itemId).remove();
  await todo.save();
  res.json(todo);
});

router.delete('/:id', protect, async (req, res) => {
  await TodoList.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;