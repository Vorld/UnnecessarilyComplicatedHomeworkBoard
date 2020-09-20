const express = require('express');
const router = express.Router();

const Subjects = require('../../models/Subjects');

//@route GET api/subjects
//@desc     get all subjects
//@access   public
router.get('/', async (req, res) => {
  try {
    const subjects = await Subjects.find({});
    res.send(subjects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    POST api/subjects
//@desc     add new subject
//@access   ADMIN
router.post('/', async (req, res) => {
  const { subject } = req.body;

  try {
    const newSubject = new Subjects({
      subject,
    });

    await newSubject.save();

    res.json(subject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
