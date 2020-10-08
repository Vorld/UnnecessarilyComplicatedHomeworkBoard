const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Task = require('../../models/Task');
const auth = require('../../middleware/auth');

//@route    Post api/tasks
//@desc     Post new task
//@access   Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Task name is required').not().isEmpty(),
      check('subject', 'Subject is required').not().isEmpty(),
      //   check('due', 'Due Date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, subject, due } = req.body;

    try {
      if (!due) {
        due_ = Date.now();
      } else {
        due_ = due;
      }

      if (new Date(due) < new Date()) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Date can't be in the past" }] });
      }

      if (subject === 'Personal') {
        subject_ = req.user.id;
      } else {
        subject_ = subject;
      }

      const task = new Task({
        name,
        subject: subject_,
        due: due_,
      });

      await task.save();

      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    Delete api/tasks
//@desc     Delete tasks
//@access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    await task.remove();

    res.json({ msg: 'Task Removed' });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route    Post api/tasks/me
//@desc     Get all tasks that apply only to this account
//@access   Private
router.post(
  '/me',
  [
    auth,
    [
      check(
        'subjects',
        'Your subjects were not received by the server'
      ).isArray(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { subjects } = req.body;

    const subjects_ = [...subjects, req.user.id];

    try {
      const tasks = await Task.find();

      tasks.sort((a, b) => a.due - b.due);

      var filteredTasks = tasks.filter((task) => {
        return (
          subjects_.includes(task.subject) &&
          new Date(task.due) >= new Date().setHours(0, 0, 0, 0)
        );
      });

      filteredTasks.forEach((task, index) => {
        if (task.subject === req.user.id) {
          task.subject = 'Personal';
          this[index] = task;
        }
      }, filteredTasks);

      res.json(filteredTasks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
