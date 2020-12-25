const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Subjects = require('../../models/Subjects');

//@route GET api/subjects
//@desc     get all subjects
//@access   public
router.post(
  '/me',
  [auth, [check('grade', 'Grade is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { grade } = req.body;

    try {
      const subjects = await Subjects.find({ grade });
      res.send(subjects);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    POST api/subjects
//@desc     add new subject
//@access   ADMIN
router.post('/', async (req, res) => {
  const { subject, grade } = req.body;

  try {
    const newSubject = new Subjects({
      subject,
      grade,
    });

    await newSubject.save();

    res.json(subject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// router.get('/update', async (req, res) => {
//   try {
//     const m = await Subjects.updateMany(
//       {},
//       { $set: { grade: 11 } },
//       { multi: true }
//     );
//     res.send(m);
//   } catch (err) {
//     console.error(err);
//   }
// });

module.exports = router;
