const SERVER_URL_QUIZZES = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";

const main = document.querySelector(".quizz-list");
const page = document.querySelector(".quizz-page");
const creation = document.querySelector(".quizz-creation");
let userQuizzes = [];
let quizz = {
	title: "",
	image: "",
	questions: [],
    levels: []
}

loadUserQuizzes()
function loadUserQuizzes() {
    const storagedQuizzes = localStorage.getItem("list");
    const userQuizzesForPrinting = JSON.parse(storagedQuizzes);
    if (userQuizzesForPrinting === null) {
        return;
    }
    userQuizzes = userQuizzesForPrinting;
    console.log(userQuizzes);
}

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
    console.log(response);
    for (let i = 0; i < response.data.length; i++) {
        let allQuizzesContainer = document.querySelector(".quizz-list .all-quizzes");
        allQuizzesContainer.innerHTML += 
        `<div id="${response.data[i].id}" class="quizz-layout quizz-box" onclick="changePages(this); renderBanner(this); getQuizz(this)">
            <img class="img-background" src="${response.data[i].image}">
            <div class="gradient-container">
            </div>
            <p class="description">${response.data[i].title}</p>
        </div>`;
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
    /*
    if (element.classList.contains("home-button")) {
        main.classList.remove("hide");
        page.classList.add("hide");
    }
    */
    if (element.classList.contains("restart-button")) {

    }
    

    window.scrollTo(0,0);
}

function refreshPage () {
    location.reload();
}

// QUIZZ PAGE

let banner;

function renderBanner (element) {
    banner = element.innerHTML;
    document.querySelector(".quizz-page .banner").innerHTML = banner;
}

let selectedQuizzId;

function getQuizz (element) {
    selectedQuizzId = Number(element.id);
    console.log(element.id);

    let allQuizzes = axios.get(SERVER_URL_QUIZZES);
    allQuizzes.then(renderQuizzQuestions);
    allQuizzes.catch(function (error) {console.log(error)});
}

let questionsAnswered = 0;
let totalQuestions = 0;

function renderQuizzQuestions (response) {
    console.log(response.data);
    for (let i = 0; i < response.data.length; i++) {
        if (selectedQuizzId === response.data[i].id) {
            for (let j = 0; j < response.data[i].questions.length; j++) {
                page.innerHTML +=
                `<div class="question-container" id="q${j}">
                    <div class="question-box">
                        <span class="question">${response.data[i].questions[j].title}</span>
                    </div>
                    <div class="answers-box">
                    </div>
                </div>`;
            
                for (let k = 0; k < response.data[i].questions[j].answers.length; k++) {
                    let questionPrinted = document.getElementById(`q${j}`);
                    questionPrinted.lastElementChild.innerHTML += 
                        `<div class="answer-option" onclick="selectOption(this)" id="${response.data[i].questions[j].answers[k].isCorrectAnswer}">
                            <img src="${response.data[i].questions[j].answers[k].image}">
                            <span class="legend">${response.data[i].questions[j].answers[k].text}</span>
                        </div>`;
                }
                
            questionsAnswered ++;
            totalQuestions++;
            }      
        }    
    }
}

let siblings;
let numOfHits = 0;
function getSiblings (element) {

    siblings = []; 
    let sibling  = element.parentNode.firstChild;
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== element) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};

function selectOption (element) {
    console.log(element.parentElement.nextElementSibling);
    if (element.lastElementChild.classList.contains("color-green") || element.lastElementChild.classList.contains("color-red")) {
        return;
    }

    getSiblings(element);

    for (let i = 0; i < siblings.length; i++) {
        siblings[i].classList.add("blurred-background");
        if (siblings[i].id === "true") {
            siblings[i].lastElementChild.classList.add("color-green");
        } else {
            siblings[i].lastElementChild.classList.add("color-red");
        }
    }

    if (element.id === "true") {
        element.lastElementChild.classList.add("color-green");
        numOfHits++;
    } else {
        element.lastElementChild.classList.add("color-red");
    }
    
    questionsAnswered--;

    console.log(numOfHits);

    isFinished(questionsAnswered);

    setTimeout(scrollToNext, 2000, element);   

}

function isFinished (remainingQuestions) {

    console.log(remainingQuestions);

    if (remainingQuestions === 0) {

        let allQuizzes = axios.get(SERVER_URL_QUIZZES);
        allQuizzes.then(renderResult);
        allQuizzes.catch(function (error) {console.log(error)});       
    }

}

function renderResult(response) {
    let result;
    
    for (let i = 0; i < response.data.length; i++) {
        if (selectedQuizzId === response.data[i].id){
            for (let j = 0; j < response.data[i].levels.length; j++) {
                console.log(Math.round((numOfHits/totalQuestions)*100));
                if (Math.round((numOfHits/totalQuestions)*100) >= response.data[i].levels[j].minValue) {
                    result = 
                        `<div class="quizz-result question-container">
                            <div class="question-box">
                                <span class="question">${response.data[i].levels[j].title}</span>
                            </div>
                            <div class="answer-option">
                                <img src="${response.data[i].levels[j].image}">
                                <span class="legend">${response.data[i].levels[j].text}</span>
                            </div>
                        </div>
                        <button class="restart-button" onclick="changePages(this)">Reiniciar Quizz</button>
                        <button class="home-button" onclick="refreshPage()">Voltar para home</button>`;
                }           
            }
            console.log(result);
            page.innerHTML += result;        
        }
    }
}

function scrollToNext (element) {
    let scrollNextOne = element.parentElement.parentElement.nextElementSibling;
    let scrollResult = document.querySelector(".quizz-result");
    if (scrollNextOne !== null) {
        scrollNextOne.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
    } else {
        scrollResult.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
    }
}







