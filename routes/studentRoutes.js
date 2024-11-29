const express = require('express');
const authentication = require('../middleware/authentication');
const Student = require('../database/marks');

const router = express.Router();

// Enter marks route
router.get('/enter-marks', (req, res) => {
  const username = req.user.username;
  res.render('enter-marks', { username, totalMarks: null });
});

router.post('/enter-marks', async (req, res) => {
  const { name, Hindi, English, Science, Mathematics, Computer } = req.body;

  // Validate input (ensure marks are numbers)
  const marks = [Hindi, English, Science, Mathematics, Computer];
  if (marks.some(mark => isNaN(parseInt(mark)))) {
    req.flash('error', 'Please enter valid marks for all subjects');
    return res.redirect('/enter-marks');
  }

  const totalMarks = marks.reduce((acc, mark) => acc + parseInt(mark), 0);

  const newStudent = new Student({
    name,
    marks: {
      Hindi: parseInt(Hindi),
      English: parseInt(English),
      Science: parseInt(Science),
      Mathematics: parseInt(Mathematics),
      Computer: parseInt(Computer),
      total: totalMarks,
    },
  });

  try {
    await newStudent.save();
    res.redirect('/aggregate'); // Redirect to aggregate page or another confirmation page
  } catch (error) {
    console.error('Error occurred during saving marks:', error);
    req.flash('error', 'There was an error while saving the marks');
    res.redirect('/enter-marks');
  }
});

// Aggregation route
router.get('/aggregate', async (req, res) => {
  try {
    const aggregationPipeline = [
      {
        $project: {
          _id: 0,
          name: 1,
          marks: 1,
          total: '$marks.total',
        },
      },
      {
        $sort: { total: -1 },
      },
    ];

    const students = await Student.aggregate(aggregationPipeline);
    const totalMarks = students.map(student => student.total);
    const average = totalMarks.reduce((acc, curr) => acc + curr, 0) / totalMarks.length;

    const topTwoStudents = students.slice(0, 2);
    const aboveAverageStudents = students.filter(student => student.total > average);
    const belowAverageStudents = students.filter(student => student.total < average);

    res.render('aggregate', {
      average,
      topTwoStudents,
      aboveAverageStudents,
      belowAverageStudents,
      allStudents: students,
    });
  } catch (error) {
    console.error('Error occurred during aggregation:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
