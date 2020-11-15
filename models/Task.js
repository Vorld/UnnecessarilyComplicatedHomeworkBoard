const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  due: {
    type: Date,
    required: true,
  },
});

module.exports = Task = mongoose.model('task', TaskSchema);
