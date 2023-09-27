// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

const questions = require('./quiz');

let currentQuestionIndex = 0;
let score = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/quiz', (req, res) => {
  if (currentQuestionIndex < questions.length) {
    res.sendFile(__dirname + '/public/quiz.html');
  } else {
    res.send('Quiz beendet');
  }
});

app.get('/getQuestion', (req, res) => {
  if (currentQuestionIndex < questions.length) {
    res.json(questions[currentQuestionIndex]);
  } else {
    res.json({ question: '', options: [] });
  }
});

app.post('/submitAnswer', (req, res) => {
  const userAnswer = req.body.answer;
  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.correctAnswer;

  let isCorrect = userAnswer === correctAnswer;

  if (isCorrect) {
    score++;
  }

  currentQuestionIndex++;

  res.json({ correct: isCorrect, score, correctAnswer });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});