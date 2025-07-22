const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// POST a task
router.post('/', async (req, res) => {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.json(savedTask);
});

// PUT (toggle complete)
router.put('/:id', async (req, res) => {
    const updated = await Task.findByIdAndUpdate(
        req.params.id,
        { completed: req.body.completed },
        { new: true }
    );
    res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

module.exports = router;

