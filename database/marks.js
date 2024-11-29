const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  marks: {
    Hindi: {
      type: Number,
      required: true,
    },
    English: {
      type: Number,
      required: true,
    },
    Science: {
      type: Number,
      required: true,
    },
    Mathematics: {
      type: Number,
      required: true,
    },
    Computer: {
      type: Number,
      required: true,
    },
    total: {
        type: Number,
        required: true,
      },
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
