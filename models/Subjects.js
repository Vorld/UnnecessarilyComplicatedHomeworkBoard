const mongoose = require('mongoose');

const SubjectsSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = Subjects = mongoose.model('subjects', SubjectsSchema);
