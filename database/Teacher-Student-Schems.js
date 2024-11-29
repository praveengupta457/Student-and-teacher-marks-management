const mongoose = require('mongoose');

const student_teacher_DataSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        enum: ['Teacher', 'Student'],
        required: true
    }
});

const STSchema = mongoose.model("Student_Teacher_data", student_teacher_DataSchema);

module.exports = STSchema;
