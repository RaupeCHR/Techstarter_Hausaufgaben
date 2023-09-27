// public/quiz.js

let currentQuestionIndex = 0;
let score = 0;

// Fragen-Daten
const questions = [
  {
    question: 'Was ist die Hauptstadt von Frankreich?',
    options: ['Paris', 'Berlin', 'Madrid'],
    correctAnswer: 'Paris',
  },
  {
    question: 'Wie viele Planeten hat unser Sonnensystem?',
    options: ['7', '8', '9'],
    correctAnswer: '8',
  },
  {
    question: 'Welches ist das größte Säugetier der Welt?',
    options: ['Elefant', 'Giraffe', 'Blauwal'],
    correctAnswer: 'Blauwal',
  },
  {
    question: 'In welchem Jahr wurde die Unabhängigkeit der USA erklärt?',
    options: ['1776', '1865', '1492'],
    correctAnswer: '1776',
  },
  {
    question: 'Wie viele Kontinente gibt es auf der Erde?',
    options: ['5', '6', '7'],
    correctAnswer: '7',
  },
  {
    question: 'Was ist die Hauptstadt von Japan?',
    options: ['Tokio', 'Peking', 'Seoul'],
    correctAnswer: 'Tokio',
  },
  {
    question: 'Welcher Planet ist der drittgrößte in unserem Sonnensystem?',
    options: ['Mars', 'Venus', 'Erde'],
    correctAnswer: 'Erde',
  },
  {
    question: 'Welcher Fluss fließt durch Kairo?',
    options: ['Nil', 'Euphrat', 'Jangtse'],
    correctAnswer: 'Nil',
  },
  {
    question: 'Was ist die chemische Formel für Wasser?',
    options: ['H2O', 'CO2', 'O2'],
    correctAnswer: 'H2O',
  },
  // Fügen Sie hier weitere Fragen hinzu
];

function startQuiz() {
  const questionContainer = document.querySelector('.question-container');
  const quizForm = document.getElementById('quiz-form');
  const feedback = document.getElementById('feedback');
  const scoreDisplay = document.getElementById('score');

  function loadQuestion() {
    const questionData = questions[currentQuestionIndex];

    if (questionData) {
      const { question, options, correctAnswer } = questionData;

      // Zeige die Frage an
      const questionElement = document.getElementById('question');
      questionElement.textContent = question;

      // Erstelle Antwortoptionen
      quizForm.innerHTML = '';
      options.forEach((option, index) => {
        const optionLabel = document.createElement('label');
        optionLabel.textContent = option;
        const optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.name = 'answer';
        optionInput.value = option;
        optionLabel.appendChild(optionInput);
        quizForm.appendChild(optionLabel);
      });

      // Aktualisiere den Punktestand
      scoreDisplay.textContent = score;

      // Zeige die Frage und Antwortmöglichkeiten an
      questionContainer.style.display = 'block';
      feedback.style.display = 'none';

      // Formularsubmit-Handler
      quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userAnswer = quizForm.querySelector('input[name="answer"]:checked');
        if (userAnswer) {
          const userAnswerValue = userAnswer.value;
          if (userAnswerValue === correctAnswer) {
            score++;
            userAnswer.parentElement.style.backgroundColor = 'green'; // Hervorheben bei richtiger Antwort
          } else {
            userAnswer.parentElement.style.backgroundColor = 'red'; // Hervorheben bei falscher Antwort
          }
          currentQuestionIndex++;
          setTimeout(loadQuestion, 1000); // Nächste Frage nach 1 Sekunde anzeigen
        }
      });
    } else {
      // Das Quiz ist beendet
      questionContainer.style.display = 'none';
      feedback.style.display = 'block';
      feedback.textContent = `Quiz beendet! Dein Punktestand: ${score}`;
    }
  }

  loadQuestion(); // Lade die erste Frage
}

// Diese Funktion wird nur im Browser ausgeführt
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', startQuiz);
}