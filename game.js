//selecing items to target//

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

var currentQuestion = {}
var acceptingAnswers = true
var score = 0
var questionCounter = 0
var availableQuestions = []

//timer//
var timeLeft = 30;
var timerEl = document.getElementById('timer');
var timerId = setInterval(countdown, 800);
function countdown() {
    if (timeLeft === -1) {
        clearInterval(timerId);
        return;
    } else {
        timerEl.innerHTML = timeLeft;
        timeLeft--;
    }
}

//adding in questions//

var questions =  [
    {
        question: 'Commonly used data types DOES NOT include:',
        choice1: 'Strings',
        choice2: 'Booleans',
        choice3: 'Alerts',
        choice4: 'Numbers',
        answer: 'Alerts',
    },
    {
        question: 'The condition in an if / else statement is enclosed within ____.',
        choice1: 'Quotes',
        choice2: 'Curly brackets',
        choice3: 'Parentheses',
        choice4: 'Square brackets',
        answer: 'Parentheses',
    },
    {
        question: 'Arrays in JavaScript can be used to store ____.',
        choice1: 'Numbers and strings',
        choice2: 'Other arrays',
        choice3: 'Booleans',
        choice4: 'All of the above',
        answer: 'All of the above',
    },
    {
        question: 'String values must be enclosed within ____ when being assigned to variables.',
        choice1: 'commas',
        choice2: 'curly brackets',
        choice3: 'parentheses',
        choice4: 'quotes', 
        answer:  'quotes', 
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choice1: 'JavaScript',
        choice2: 'terminal / bash', 
        choice3: 'for loops', 
        choice4: 'console.log',
        answer: 'console.log',
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incremenetScore (SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            getNewQuestion()

        }, 1000)
    })
})

//increments//

incremenetScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame ()