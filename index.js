
require('dotenv').config();

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // for parsing application/json

// In-memory DB
let todos = [];

// ROUTES

// GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// GET a todo by ID
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

// POST a new todo
app.post('/todos', (req, res) => {
  const { title, completed = false } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const newTodo = {
    id: uuidv4(),
    title,
    completed,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT (update) a todo
app.put('/todos/:id', (req, res) => {
  const { title, completed } = req.body;
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// DELETE a todo
app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });

  todos.splice(index, 1);
  res.status(204).send();
});

app.get('/', (req, res) => {
    res.send(`Welcome to ${process.env.APP_NAME}`);
  });
  

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
