const express = require('express');
const res = require('express/lib/response');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const pool = require('./db');

app.use(express.json());

app.post('/task/new', async (req, res, next) => {
  try {
    const { description } = req.body;

    const newTask = await pool.query(
      'INSERT INTO task(description) VALUES($1) RETURNING *',
      [description]
    );
    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
  }
});
app.get('/tasks', async (req, res) => {
  const allTask = await pool.query('SELECT * FROM task');
  res.json(allTask);
});
app.get('/task/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const singleTask = await pool.query(
      'SELECT * FROM task WHERE task_id=($1)',
      [id]
    );
    res.json(singleTask);
  } catch (err) {
    console.error(err.message);
  }
});
app.put('/task/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await pool.query('UPDATE task SET description=$1 WHERE task_id=$2', [
      description,
      id,
    ]);
    res.json('success');
  } catch (err) {
    console.error(err.message);
  }
});
app.delete('/task/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM task  WHERE task_id=$1', [id]);
    res.json('delete success');
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3000, () => {
  console.log('server is running on port 3000');
});
