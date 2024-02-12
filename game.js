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
        choice1: 'strings',
        choice2: 'booleans',
        choice3: 'alerts',
        choice4: 'numbers',
        answer: 'alerts',
    },
    {
        question: '2?',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: '2',
    },
    {
        question: '3?',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: '3',
    },
    {
        question: '4?',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: '4',
    },
    {
        question: '5?',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '5',
        answer: '5',
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
            selectedChoice.parentElement.classList.remove(classToApply)
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