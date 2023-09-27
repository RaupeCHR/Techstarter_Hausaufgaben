document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    const quizContainer = document.querySelector(".quiz-container");
    const questionElement = document.querySelector(".question");
    const optionsContainer = document.querySelector(".options");
    const submitButton = document.getElementById("submit-button");
    const nextButton = document.getElementById("next-button");
    const restartButton = document.getElementById("restart-button");
    const resultContainer = document.querySelector(".result");
    const scoreElement = document.getElementById("score");
    const finalMessage = document.querySelector(".final-message");

    let quizData; // Hier speichern wir die Quiz-Fragen und Antworten
    let currentQuestionIndex = 0; // Index der aktuellen Frage
    let score = 0; // Die Punktzahl des Benutzers

    // Hier sind 10 lustige Fragen mit Antworten
    quizData = [
        {
            question: "Warum hat das Mathematikbuch geweint?",
            options: ["Weil es zu viele Probleme hatte.", "Weil es gelangweilt war.", "Weil es nass geworden ist."],
            correctAnswer: "Weil es zu viele Probleme hatte."
        },
        {
            question: "Wie nennt man einen Fisch ohne Augen?",
            options: ["Blindfisch", "Augelessi", "Augenfisch"],
            correctAnswer: "Blindfisch"
        },
        {
            question: "Warum hat der Tomate mit der Gurke gestritten?",
            options: ["Weil er sauer war.", "Weil er keinen Salat machen wollte.", "Weil er eifersüchtig war."],
            correctAnswer: "Weil er sauer war."
        },
        {
            question: "Was sagt ein Null zur Acht?",
            options: ["Du hast eine komische Taille.", "Du siehst gut aus.", "Schicker Gürtel!"],
            correctAnswer: "Du hast eine komische Taille."
        },
        {
            question: "Was ist schwerer als 100 kg, aber nicht zu tragen?",
            options: ["Eine Tonne Federn", "Eine Tonne Steine", "Eine Tonne Luft"],
            correctAnswer: "Eine Tonne Federn"
        },
        {
            question: "Was fällt öfter vom Himmel als Regen?",
            options: ["Schnee", "Sternschnuppen", "Münzen"],
            correctAnswer: "Sternschnuppen"
        },
        {
            question: "Warum haben Geister so schlechte Lügen?",
            options: ["Weil man durch sie hindurchsehen kann.", "Weil sie schüchtern sind.", "Weil sie keine Zunge haben."],
            correctAnswer: "Weil man durch sie hindurchsehen kann."
        },
        {
            question: "Warum hat der Teddybär keinen Kuchen gegessen?",
            options: ["Weil er schon zu viel gegessen hatte.", "Weil er Diät machte.", "Weil er allergisch war."],
            correctAnswer: "Weil er schon zu viel gegessen hatte."
        },
        {
            question: "Was ist grün und hüpft durch den Wald?",
            options: ["Ein Hupfschwein", "Ein Gummibaum", "Ein Frosch mit Fußballschuhen."],
            correctAnswer: "Ein Frosch mit Fußballschuhen."
        },
        {
            question: "Warum tragen Geister nie Unterhosen?",
            options: ["Weil sie zu spuktakulär sind.", "Weil sie keine Beine haben.", "Weil sie niemanden beeindrucken müssen."],
            correctAnswer: "Weil sie keine Beine haben."
        }
    ];

    // Funktion zum Anzeigen der aktuellen Frage
    function displayQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsContainer.innerHTML = "";

        currentQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement("label");
            optionElement.innerHTML = `<input type="radio" name="answer" value="${option}"> ${option}`;
            optionsContainer.appendChild(optionElement);
        });

        submitButton.style.display = "block";
    }

    function checkAnswer() {
        const userAnswer = document.querySelector('input[name="answer"]:checked');
        if (!userAnswer) {
            return; // Der Benutzer hat keine Antwort ausgewählt
        }
    
        const currentQuestion = quizData[currentQuestionIndex];
        const options = optionsContainer.querySelectorAll('input[type="radio"]');
        
        options.forEach((option) => {
            const label = option.parentNode;
            if (option.value === currentQuestion.correctAnswer) {
                label.style.color = "green"; // Richtige Antwort in grün markieren
            } else {
                label.style.color = "red"; // Falsche Antwort in rot markieren
            }
    
            option.disabled = true; // Deaktiviere alle Optionen, um erneutes Auswählen zu verhindern
        });
    
        if (userAnswer.value === currentQuestion.correctAnswer) {
            score++;
            scoreElement.textContent = score; // Punktzahl aktualisieren
        }
    
        submitButton.style.display = "none";
        nextButton.style.display = "block";
    }
    

    // Funktion zum Anzeigen des Quiz-Ergebnisses
    function displayResult() {
        resultContainer.textContent = `Ergebnis: ${score} von ${quizData.length} Fragen richtig beantwortet.`;
        resultContainer.style.display = "block";

        if (score === quizData.length) {
            finalMessage.textContent = "Perfekt! Du hast alle Fragen richtig beantwortet.";
        } else if (score >= Math.floor(quizData.length / 2)) {
            finalMessage.textContent = "Gut gemacht!";
        } else {
            finalMessage.textContent = "Weiter üben!";
        }

        quizContainer.style.display = "none";
        restartButton.style.display = "block";
    }

    // Funktion zum Neustarten des Quiz
    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        resultContainer.style.display = "none";
        quizContainer.style.display = "block";
        restartButton.style.display = "none";
        displayQuestion();
    }

    // Event Listener für den Start-Button
    startButton.addEventListener("click", () => {
        startButton.style.display = "none";
        quizContainer.style.display = "block";
        displayQuestion();
    });

    // Event Listener für den Überprüfen-Button
    submitButton.addEventListener("click", checkAnswer);

    // Event Listener für den Nächste-Frage-Button
    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            displayQuestion();
            nextButton.style.display = "none";
        } else {
            displayResult();
        }
    });
    
    // Event Listener für den Neustart-Button
    restartButton.addEventListener("click", restartQuiz);
    
    // Initialanzeige
    startButton.style.display = "block";
    quizContainer.style.display = "none";
    resultContainer.style.display = "none";
});