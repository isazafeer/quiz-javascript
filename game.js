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

//adding in questions//

var questions =  [
    {
        question: '1?',
        choice1: '1',
        choice2: '1',
        choice3: '1',
        choice4: '1',
        answer: '1',
    },
    {
        question: '2?',
        choice1: '2',
        choice2: '2',
        choice3: '2',
        choice4: '2',
        answer: '2',
    },
    {
        question: '3?',
        choice1: '3',
        choice2: '3',
        choice3: '3',
        choice4: '3',
        answer: '3',
    },
    {
        question: '4?',
        choice1: '4',
        choice2: '4',
        choice3: '4',
        choice4: '4',
        answer: '4',
    },
    {
        question: '5?',
        choice1: '5',
        choice2: '5',
        choice3: '5',
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
}