const mongoose = require('mongoose');

const SubjectsSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
});

SubjectsSchema.index({ subject: 1, grade: 1 }, { unique: true });

module.exports = Subjects = mongoose.model('subjects', SubjectsSchema);
