const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

//@route    Post api/users
//@desc     Register User
//@access   Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('grade', 'Grade is required').isInt().not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, grade } = req.body;

    if (grade > 12 || grade < 1) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Your grade must be between 1 and 12' }] });
    }

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists!' }] });
      }

      user = new User({
        name,
        email,
        password,
        grade,
      });

      //Encypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/update', async (req, res) => {
  try {
    const m = await User.updateMany(
      {},
      { $set: { grade: 11 } },
      { multi: true }
    );
    res.send(m);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
