const quizData = [
    {
        question: "When did WW2 end?",
        a: "June 6, 1944",
        b: "September 8, 1944",
        c: "August 9, 1944",
        d: "June 3, 1943",
        correct: "a",
    },
    {
        question: "Which language was used by the U.S. military to encode messages that were never deciphered by the enemy during World War II?",
        a: "Yiddish",
        b: "Navajo",
        c: "Welsh",
        d: "Greek",
        correct: "b",
    },
    {
        question: "Which U.S. president won the Navy and Marine Corps Medal for his heroism during World War II?",
        a: "John F Kennedy",
        b: "Dwight D. Eisenhower",
        c: "Jimmy Carter",
        d: "Ronald Reagan",
        correct: "a",
    },
    {
        question: "The German military operation code-named Walküre (“Valkyrie”) hoped to assassinate which leader?",
        a: "Winston Churchill",
        b: "Franklin Roosevelt",
        c: "Adolf Hitler",
        d: "Benito Mussolini",
        correct: "c",
    },


]

const quiz = document.getElementById("quiz")
const answerEls = document.querySelectorAll(".answer")
const questionEl = document.getElementById("question")
const a_text = document.getElementById("a_text")
const b_text = document.getElementById("b_text")
const c_text = document.getElementById("c_text")
const d_text = document.getElementById("d_text")
const submitBtn = document.getElementById("submit")

let currentQuiz = 0
let score = 0

loadQuiz()

function loadQuiz() {
    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

submitBtn.addEventListener("click", () => {
    const answer = getSelected()
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++
        }
        currentQuiz++

        if (currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            quiz.innerHTML = `
<h2>You answered ${score}/${quizData.length} questions correctly</h2>

<button onclick="location.reload()">Reload</button>`
        }
    }
})