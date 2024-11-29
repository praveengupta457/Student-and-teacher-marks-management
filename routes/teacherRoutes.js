const express = require('express');
const authentication = require('../middleware/authentication');
const Student = require('../database/marks');

const router = express.Router();

router.get('/teacher-dashboard', async (req, res) => {
  try {
    const username = req.user.username;
    const vidyarthi = await Student.find();
    res.render('teacher-dashboard', { username, vidyarthi });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
