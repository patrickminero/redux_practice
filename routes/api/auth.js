const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require ('dotenv').config();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')
//model
const User = require('../../models/User')

router.post('/login', async (req, res) => {
  const {email, password } = req.body.user;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) throw Error('User does not exists');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });
    if (!token) throw Error('Couldnt sign the token');

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get('/user', auth, (req, res) =>{
  User.findById(req.user.id)
  .select('-password')
  .then(user => res.json(user));
});

module.exports = router;
