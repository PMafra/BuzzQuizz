const SERVER_URL_QUIZZES = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";

const main = document.querySelector(".quizz-list");
const page = document.querySelector(".quizz-page");
const creation = document.querySelector(".quizz-creation");

loadPage();

function loadPage () {
    getAllQuizzes();
    
}

function getAllQuizzes () {
    let allQuizzes = axios.get(SERVER_URL_QUIZZES);

    allQuizzes.then(renderAllQuizzes);
    allQuizzes.catch(function (error) {console.log(error)});
}

function renderAllQuizzes (response) {
    for (let i = 0; i < response.data.length; i++) {
        let allQuizzesContainer = document.querySelector(".quizz-list .all-quizzes");
        allQuizzesContainer.innerHTML += 
        `<div class="quizz-layout quizz-box" onclick="changePages(this); renderBanner(this); getQuizz(this)">
            <img class="img-background" src="${response.data[i].image}">
            <div class="gradient-container">
            </div>
            <p class="description">${response.data[i].title}</p>
        </div>`
    }
}

function changePages (element) {


    if (element.classList.contains("quizz-box")) {
        main.classList.add("hide");
        page.classList.remove("hide");
    } 
    if (element.parentElement.classList.contains("quizz-create") || element.id === "add-icon") {
        main.classList.add("hide");
        creation.classList.remove("hide");
    }
    if (element.classList.contains("home-button")) {
        main.classList.remove("hide");
        page.classList.add("hide");
    }
    if (element.classList.contains("restart-button")) {

    }
    

    window.scrollTo(0,0);
}

function refreshPage () {
    location.reload();
}

// QUIZZ PAGE

function renderBanner (element) {
    let banner = element.innerHTML;
    document.querySelector(".banner").innerHTML = banner;
}

let quizzSrc;
function getQuizz (element) {
    quizzSrc = element.firstElementChild.src;

    let allQuizzes = axios.get(SERVER_URL_QUIZZES);
    allQuizzes.then(renderQuizzQuestions);
    allQuizzes.catch(function (error) {console.log(error)});
}

function renderQuizzQuestions (response) {

    for (let i = 0; i < response.data.length; i++) {
        if (quizzSrc === response.data[i].image) {
            for (let j = 0; j < response.data[i].questions.length; j++) {
                page.innerHTML +=
                `<div class="question-container" id="q${j}">
                    <div class="question-box">
                        <span class="question">${response.data[i].questions[j].title}</span>
                    </div>
                    <div class="answers-box">
                    </div>
                </div>`
                for (let k = 0; k < response.data[i].questions[j].answers.length; k++) {
                    let questionPrinted = document.getElementById(`q${j}`);
                    questionPrinted.lastElementChild.innerHTML += 
                        `<div class="answer-option">
                            <img src="${response.data[i].questions[j].answers[k].image}">
                            <span class="legend">${response.data[i].questions[j].answers[k].text}</span>
                        </div>`
                }
            }      
        }    
    }
}