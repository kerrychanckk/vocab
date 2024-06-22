const questions = [
    {
        question: "Which image shows an 'Apple'?",
        options: [
            {image: "apple.jpg", isCorrect: true},
            {image: "banana.jpg", isCorrect: false},
            {image: "orange.jpg", isCorrect: false},
            {image: "grape.jpg", isCorrect: false}
        ]
    },
    {
        question: "Which image represents a 'Cat'?",
        options: [
            {image: "dog.jpg", isCorrect: false},
            {image: "cat.jpg", isCorrect: true},
            {image: "bird.jpg", isCorrect: false},
            {image: "fish.jpg", isCorrect: false}
        ]
    }
    // ??????????
];

let availableQuestions = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getRandomQuestion() {
    if (availableQuestions.length === 0) {
        availableQuestions = [...questions];
        shuffleArray(availableQuestions);
    }
    return availableQuestions.pop();
}

function loadQuestion() {
    const question = getRandomQuestion();
    document.getElementById("question").textContent = question.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    
    // ???????????
    const shuffledOptions = [...question.options];
    shuffleArray(shuffledOptions);

    shuffledOptions.forEach((option, index) => {
        const img = document.createElement("img");
        img.src = option.image;
        img.alt = `Option ${index + 1}`;
        img.classList.add("option");
        img.width = 100;
        img.height = 100;
        img.onclick = () => selectOption(option.isCorrect);
        optionsContainer.appendChild(img);
    });
    document.getElementById("result").textContent = "";
    document.getElementById("next-btn").style.display = "none";
}

function selectOption(isCorrect) {
    const resultElement = document.getElementById("result");
    if (isCorrect) {
        resultElement.textContent = "Correct!";
        resultElement.style.color = "green";
    } else {
        resultElement.textContent = "Incorrect. Try again!";
        resultElement.style.color = "red";
    }
    document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
    if (availableQuestions.length > 0) {
        loadQuestion();
    } else {
        document.getElementById("game-container").innerHTML = "<h1>Game Over!</h1><p>You've completed all questions.</p>";
    }
}

document.getElementById("next-btn").addEventListener("click", nextQuestion);

// ?????
shuffleArray(questions);
availableQuestions = [...questions];
loadQuestion();
