const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answers-btns");
const nextButton = document.getElementById("next-btn");
const setofQuestions = document.getElementById("next-set")
let currentSet = 0;
let currentQuestionIndex = 0;
let score = 0;

// use this to fetch the questions




function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"

}

function resetState() {
    nextButton.style.display = "none"
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}

let selection = 0
let displayIt = document.getElementsByClassName("questionCategory")
let select = document.getElementById("category")


const categories = {
    trivia_categories:[{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]}


const category = () =>{
    categories.trivia_categories.forEach(element => {
        const opt1 = document.createElement("option")
        opt1.value = element.name
        opt1.text = element.name
        currentQuestionIndex = 0
        score = 0
        nextButton.innerHTML = "Next"
        select.add(opt1, null)

    })
  
}
     

const categoryPromise = category()

const fetchingData = (num)  =>{

        categories.trivia_categories.forEach(element => {
            if (select.value == element.name) {
                num = element.id
       
            }
        }
        
        )
        return data = fetch(`https://opentdb.com/api.php?amount=10&category=${num}`).then(response => response.json()).then(data => arrofQ.push(data))
    }


    const arrofQ = [

    
    ]
    console.log(arrofQ)
  select.addEventListener("change", fetchingData)




async function showQuestion() {
    resetState()
let data = arrofQ
console.log(data)
        let questionNo = currentQuestionIndex

        const currentQuestion = data[0].results[currentQuestionIndex]
        const correctAnswer = currentQuestion.correct_answer
        const incorrectAnswers = currentQuestion.incorrect_answers


        const questions = [{

            answers: [
                { text: correctAnswer, correct: true },
                { text: incorrectAnswers[0], correct: false },
                { text: incorrectAnswers[1], correct: false },
                { text: incorrectAnswers[2], correct: false },
            ]
        },
        ]


        questionElement.innerHTML = questionNo + ". " + currentQuestion.question
        questions[currentSet].answers.sort(() => Math.random() - 0.5)
        questions[currentSet].answers.forEach(answer => {

            const button = document.createElement("button")

            if (answer.text == undefined) {
                button.innerHTML = ""
            }

            else {


                button.innerHTML = answer.text
                button.classList.add("btn")
                answerButton.appendChild(button)
            }


            if (answer.correct) {
                button.dataset.correct = answer.correct
            }
            button.addEventListener("click", selectAnswer)
        })

        return questions
    }

    selectCategory.addEventListener("click", showQuestion)


function handleNextButton() {

    currentQuestionIndex++
    if (currentQuestionIndex < 9) {
        showQuestion()
    } else {
        showScore()
    }
}

nextButton.addEventListener("click", async () => {
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
    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${9}`
    nextButton.innerHTML = "Play again"
    nextButton.style.display = " block"
    setofQuestions.style.display = " block"
}

async function nextSet() {
    resetState()
    currentSet++
    nextButton.innerHTML = "Next"
    showQuestion()
    currentQuestionIndex = 0
    setofQuestions.style.display = "none"
}

setofQuestions.addEventListener("click", nextSet)
startQuiz()
