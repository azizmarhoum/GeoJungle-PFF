const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [{
    question: { type: String, required: true },
    options: [{ type: String }],
    correctAnswer: { type: String, required: true }
  }],
  difficulty: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema); 