const SERVER_URL_QUIZZES = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";

const main = document.querySelector(".quizz-list");
const page = document.querySelector(".quizz-page");
const creation = document.querySelector(".quizz-creation");
const loadingPage = document.querySelector(".loading-page");
let details = document.querySelector(".quizzes-not-in-server ul");
let isEditing = false;
let userQuizzes = [];
let quizzToDeleteId;
let quizzToDeleteKey;
let quizzToEdit;
let quizzToEditPosition;
let quizzToEditId;
let quizzToEditKey;
let quizzToEditHTML;
let userQuizzesIds = [];
let serverQuizzesIds = [];
let userQuizzesIdsNotInServer = [];
let banner;
let selectedQuizzId;
let questionsAnswered = 0;
let totalQuestions = 0;
let siblings;
let numOfHits = 0;
let quizz = {
	title: "",
	image: "",
	questions: [],
    levels: []
}

function renderUserQuizzes (userQuizzes) {
    for (let i = 0; i < userQuizzes.length; i++) {
        if(userQuizzesIdsNotInServer.includes(userQuizzes[i].data.id)) {
            let dateOfCreation = userQuizzes[i].data.createdAt.split("T")[0];
            let timeOfCreation = userQuizzes[i].data.createdAt.split("T")[1].split(".")[0];
            details.innerHTML += `<li>Nome: " <strong>${userQuizzes[i].data.title}</strong> "<br>Data de criação: ${dateOfCreation}<br> Horário de criação: ${timeOfCreation}</li>`;
            continue;
        }
        else {
            document.querySelector(".quizz-list .quizzes-title-box.my-quizzes").classList.remove("hide");
            document.querySelector(".quizz-list .quizz-create").classList.add("hide");
            let userQuizzesList = document.querySelector(".quizz-list .quizzes-container.my-quizzes");
            userQuizzesList.innerHTML +=
            `<div id="${userQuizzes[i].data.id}" class="quizz-layout quizz-box user-quizz">
                <img class="img-background" src="${userQuizzes[i].data.image}">
                <div class="gradient-container" >
                </div>
                <p class="description">${userQuizzes[i].data.title}</p>
                <div class="buttons-holder">
                <ion-icon class="edit" onclick="editQuizz(this)" name="create-outline"></ion-icon>
                <ion-icon onclick="confirmDelete(this)" name="trash-outline"></ion-icon>
                </div>
            </div>`;
        }
    }
    if (details.innerHTML !== "") {
        document.querySelector(".quizzes-not-in-server").classList.remove("hide");
    }
    let testando = document.querySelectorAll(".quizz-box.user-quizz");
    for (i=0 ; i < testando.length ; i++) {
        testando[i].addEventListener('click', startQuizzByEvent);
    }
}

function compareQuizzesToServer (response) {
    loadingPage.classList.add("hide");
    for (let i = 0; i < response.data.length; i++) {
        serverQuizzesIds.push(response.data[i].id);
    }

    for (let i = 0; i < userQuizzesIds.length; i++) {
        if (serverQuizzesIds.includes(userQuizzesIds[i])) {
            continue;
        } else {
            console.log(userQuizzesIds[i] + " não está no servidor");
            userQuizzesIdsNotInServer.push(userQuizzesIds[i]);
        }
    }
    renderUserQuizzes(userQuizzes);
}

function isMyQuizzStillInServer () {

    let allQuizzes = axios.get(SERVER_URL_QUIZZES);
    loadingPage.classList.remove("hide");
    allQuizzes.then(compareQuizzesToServer);
    allQuizzes.catch(function (error) {console.log(error)});
}

function loadUserQuizzes() {
    const storagedQuizzes = localStorage.getItem("list");
    const userQuizzesForPrinting = JSON.parse(storagedQuizzes);
    if (userQuizzesForPrinting === null) {
        return;
    }
    userQuizzes = userQuizzesForPrinting;

    for (let i = 0; i < userQuizzes.length; i++) {
        userQuizzesIds.push(userQuizzes[i].data.id);
    }
    console.log("Os Ids dos seus quizzes são: " + userQuizzesIds);
    isMyQuizzStillInServer();
}

function renderAllQuizzes (response) {
    loadingPage.classList.add("hide");
    for (let i = 0; i < response.data.length; i++) {
        if (userQuizzesIds.includes(response.data[i].id)) {
            continue;
        } else {
            let allQuizzesContainer = document.querySelector(".quizz-list .all-quizzes");
            allQuizzesContainer.innerHTML +=
            `<div id="${response.data[i].id}" class="quizz-layout quizz-box general" onclick="startingQuizz(this)">
                <img class="img-background" src="${response.data[i].image}">
                <div class="gradient-container">
                </div>
                <p class="description">${response.data[i].title}</p>
            </div>`;
        }
    }
}

function getAllQuizzes () {
    let allQuizzes = axios.get(SERVER_URL_QUIZZES);
    loadingPage.classList.remove("hide");
    allQuizzes.then(renderAllQuizzes);
    allQuizzes.catch(function (error) {console.log(error)});
}

function loadPage () {
    loadUserQuizzes();
    getAllQuizzes();
}

loadPage();

const shuffleDivs = parent => {
    let divs = parent.children;
    let frag = document.createDocumentFragment();
    while (divs.length) {
        frag.appendChild(divs[Math.floor(Math.random() * divs.length)]);
    }
    parent.appendChild(frag);
}

function isTooLightYIQ(hexcolor){
    let r = parseInt(hexcolor.substr(0,2),16);
    let g = parseInt(hexcolor.substr(2,2),16);
    let b = parseInt(hexcolor.substr(4,2),16);
    let yiq = ((r*299)+(g*587)+(b*114))/1000;
    return yiq >= 128;
}

function renderQuizzQuestions (response) {
    loadingPage.classList.add("hide");
    for (let i = 0; i < response.data.length; i++) {
        if (selectedQuizzId === response.data[i].id) {
            for (let j = 0; j < response.data[i].questions.length; j++) {

                let questionBoxColor = response.data[i].questions[j].color;
                if (isTooLightYIQ(questionBoxColor.replace("#",""))) {
                    page.innerHTML +=
                    `<div class="question-container" id="q${j}">
                        <div class="question-box" style="background-color: ${response.data[i].questions[j].color};">
                            <span class="question" style="color: #000000;">${response.data[i].questions[j].title}</span>
                        </div>
                        <div class="answers-box">
                        </div>
                    </div>`;
                } else {
                    page.innerHTML +=
                    `<div class="question-container" id="q${j}">
                        <div class="question-box" style="background-color: ${response.data[i].questions[j].color};">
                            <span class="question">${response.data[i].questions[j].title}</span>
                        </div>
                        <div class="answers-box">
                        </div>
                    </div>`;
                }

                for (let k = 0; k < response.data[i].questions[j].answers.length; k++) {
                    let questionPrinted = document.getElementById(`q${j}`);
                    questionPrinted.lastElementChild.innerHTML +=
                        `<div class="answer-option" onclick="selectOption(this)" id="${response.data[i].questions[j].answers[k].isCorrectAnswer}">
                            <img src="${response.data[i].questions[j].answers[k].image}">
                            <span class="legend">${response.data[i].questions[j].answers[k].text}</span>
                        </div>`;
                }

                let answersBox = document.getElementById(`q${j}`).lastElementChild;
                shuffleDivs(answersBox);

            questionsAnswered ++;
            totalQuestions++;
            }
        }
    }
}

function getQuizz (element) {
    selectedQuizzId = Number(element.id);
    let allQuizzes = axios.get(SERVER_URL_QUIZZES);
    loadingPage.classList.remove("hide");
    allQuizzes.then(renderQuizzQuestions);
    allQuizzes.catch(function (error) {console.log(error)});
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
    if (element.classList.contains("restart-button")) {
        restartingQuizz();
    }
    if (element.classList.contains("test-created")) {
        page.classList.remove("hide");
        creation.classList.add("hide");
    }
    if (element.classList.contains("edit")) {
        creation.classList.remove("hide");
        main.classList.add("hide");
    }
    window.scrollTo(0,0);
}

function renderBanner (element) {
    banner = element.innerHTML;
    document.querySelector(".quizz-page .banner").innerHTML = banner;
    if (isEditing === true) {
        document.querySelector(".quizz-page .banner img").src = document.querySelector(".success img").src;
        document.querySelector(".quizz-page .banner .description").innerHTML = document.querySelector(".success .description").innerHTML;
    }
    if (document.querySelector(".quizz-page .buttons-holder") !== null) {
        document.querySelector(".quizz-page .buttons-holder").classList.add("hide");
    }
}

function startingQuizz (element) {
    getQuizz(element);
    changePages(element);
    renderBanner(element);
}

function deleteQuizz(response) {
    alert("Seu quizz foi deletado do nosso servidor com sucesso!")
    location.reload();
}

function requireQuizzRemoval() {
    let promise = axios.delete(SERVER_URL_QUIZZES + `/${quizzToDeleteId}`, {headers:{ "Secret-Key": quizzToDeleteKey}});
    promise.then(deleteQuizz);
    promise.catch(function (error) {console.log(error)});
}

function confirmDelete(selectedQuizz) {
    quizzToDeleteId = Number(selectedQuizz.parentNode.parentNode.id);
    for (let i=0 ; i<userQuizzes.length ; i++) {
        if (quizzToDeleteId === userQuizzes[i].data.id) {
            quizzToDeleteKey = userQuizzes[i].data.key;
        }
    }
    if (confirm("Você realmente deseja remover o quizz selecionado?")) {
        requireQuizzRemoval();
    }
}

function startQuizzByEvent(e) {
    if(e.path[0].classList.contains("description") || e.path[0].classList.contains("gradient-container")) {
        let selectedQuizz = e.path[1];
        startingQuizz(selectedQuizz);
    }
    return;
}

const removeClass = (element, className) => {
    if (element.classList.contains(className)){
        element.classList.remove(className);
    }
}

const restartingQuizz = () => {
    let resetingAnswersAndResult = document.querySelectorAll(".reset, .color-green, .color-red, .blurred-background, .answers-box");

    resetingAnswersAndResult.forEach(element => {
        if (element.classList.contains("reset")) {
            element.remove();
        }
        if (element.classList.contains("answers-box")) {
            shuffleDivs(element);
        }
        removeClass(element, "color-green");
        removeClass(element, "color-red");
        removeClass(element, "blurred-background");
    });

    questionsAnswered = totalQuestions;
    numOfHits = 0;

}

function refreshPage () {
    location.reload();
}

function renderResult(response) {
    loadingPage.classList.add("hide");
    let listOfLevels = [];
    let resultValue;
    let result;

    for (let i = 0; i < response.data.length; i++) {
        if (selectedQuizzId === response.data[i].id){

            for (let j = 0; j < response.data[i].levels.length; j++) {
                listOfLevels.push(response.data[i].levels[j].minValue);
            }
            listOfLevels.sort();

            for (let j = 0; j < listOfLevels.length; j++) {
                if (Math.round((numOfHits/totalQuestions)*100) >= listOfLevels[j]) {
                    resultValue = listOfLevels[j];
                }
            }

            for (let j = 0; j < response.data[i].levels.length; j++) {
                if (response.data[i].levels[j].minValue === resultValue) {
                    result =
                        `<div class="quizz-result question-container reset">
                            <div class="question-box">
                                <span class="question">${response.data[i].levels[j].title}</span>
                            </div>
                            <div class="answer-option">
                                <img src="${response.data[i].levels[j].image}">
                                <span class="legend">${response.data[i].levels[j].text}</span>
                            </div>
                        </div>
                        <button class="restart-button reset" onclick="changePages(this)">Reiniciar Quizz</button>
                        <button class="home-button reset" onclick="refreshPage()">Voltar para home</button>`;
                }
            }
            page.innerHTML += result;
        }
    }
}

function isFinished (remainingQuestions) {

    if (remainingQuestions === 0) {
        let allQuizzes = axios.get(SERVER_URL_QUIZZES);
        loadingPage.classList.remove("hide");
        allQuizzes.then(renderResult);
        allQuizzes.catch(function (error) {console.log(error)});
    }
}

function scrollToNext (element) {
    let scrollNextOne = element.parentElement.parentElement.nextElementSibling;
    let scrollResult = document.querySelector(".quizz-result");
    if (scrollNextOne !== null) {
        scrollNextOne.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });
    } else {
        scrollResult.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });
    }
}

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
}

function selectOption (element) {
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
    isFinished(questionsAnswered);
    setTimeout(scrollToNext, 2000, element);
}