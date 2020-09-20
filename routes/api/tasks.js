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
      check('name', 'Name is required').not().isEmpty(),
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
        dued = Date.now();
      } else {
        dued = due;
      }

      const task = new Task({
        name,
        subject,
        due: dued,
      });

      await task.save();

      res.json(task);
    } catch (err) {
      console.log(err);
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

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

//@route    Get api/tasks
//@desc     Get all tasks
//@access   Private
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
