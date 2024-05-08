// async function getQuestions(){
//     const quizQuestions = await fetch("https://opentdb.com/api.php?amount=10")
//     const response = await quizQuestions.json()
//     let accumlator = 0
//     const yourQuestion = response.results[accumlator].question

// console.log(response.results)
//     for (let i = 0; i< response.results.length; i++) {
//         let choices =  response.results[i].incorrect_answers

//         const questions = [{
//             question: yourQuestion,
//             answers: [
//                 {text: choices, correct: false},
//                 {text: choices, correct: false},
//                 {text: response.results[i].correctAnswer, correct: true},
//                 {text: choices, correct: false},
//             ]
//         },
//         ]



//     }

// }
// getQuestions()


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answers-btns");
const nextButton = document.getElementById("next-btn");
const setofQuestions = document.getElementById("next-set")
let currentSet = 0;
let currentQuestionIndex = 0;
let score = 0;






function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}


function resetState() {
    nextButton.style.display = "none"
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}


async function test() {
    const quizQuestions = await fetch("https://opentdb.com/api.php?amount=10")
    let response = await quizQuestions.json()

    const data = {
        response
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }

    }
    console.log(options)
    const db_response = await fetch("/api", options)
    const db_json = await db_response.json()
    console.log(db_json)

}

async function getData() {
    const response = await fetch("/api")

   const data = await response.json()
  

return data



}



getData()

 async function showQuestion() {
    resetState()
let data = await getData()

let questionNo = currentQuestionIndex 

const currentQuestion = data[currentSet].response.results[questionNo]
console.log()
const correctAnswer = currentQuestion.correct_answer
const incorrectAnswers = currentQuestion.incorrect_answers


const questions = [{
       
    answers: [
            {text: correctAnswer, correct: true},
          {text: incorrectAnswers[0], correct: false},
     {text: incorrectAnswers[1], correct: false},
        {text: incorrectAnswers[2], correct: false},
      ]
    },
]


    questionElement.innerHTML = questionNo + ". " + currentQuestion.question
 questions[0].answers.sort(() => Math.random() - 0.5)
    questions[0].answers.forEach(answer => {
  
        const button = document.createElement("button")
       
            if (answer.text == undefined){
                button.innerHTML = ""
            }
            
     else {
       
  
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButton.appendChild(button)
     }
       
   
        if (answer.correct) {
            button.dataset.correct =    answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
        
return questions
}




    

    



async function handleNextButton() {
    let questions = await showQuestion()
    currentQuestionIndex++
    if (currentQuestionIndex < 9) {
        showQuestion()
    } else {
        showScore()
    }
}

nextButton.addEventListener("click", async () => {
    let questions = await showQuestion()
    if (currentQuestionIndex < 9) {
        handleNextButton()
    } else {
        startQuiz()
    }
})


function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true"
    if (isCorrect) {
        selectedButton.classList.add("correct")
        score++
    } else {
        selectedButton.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = "true"
    })
    nextButton.style.display = "block"
}
async function showScore() {
    let questions = await showQuestion()

    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${9}`
    nextButton.innerHTML = "Play again"
    nextButton.style.display = " block"
    setofQuestions.style.display = " block"
}

async function nextSet(){
    let questions = await showQuestion()
    resetState()
currentSet++
nextButton.innerHTML = "Next"
showQuestion()
currentQuestionIndex = 0
setofQuestions.style.display = "none"
}

setofQuestions.addEventListener("click", nextSet )
startQuiz()

//  function handleNextButton() {
// currentQuestionIndex++
//     if (currentQuestionIndex < questions.length) {
//         showQuestion()
//      } else {
//          showScore()
//      }
//  }


// nextButton.addEventListener("click", () => {
//      if (currentQuestionIndex < questions.length) {
//          handleNextButton()
//      } else {
//          startQuiz()
//      }
//  })