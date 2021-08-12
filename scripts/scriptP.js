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
        `<div class="quizz-layout quizz-box" onclick="changePages(this); renderQuizzSelected(this)">
            <img class="img-background" src="${response.data[i].image}">
            <div class="gradient-container">
            </div>
            <p class="description">Alguma descrição do quizz aaaa afojnasdfsan asdofnasdojn asdofnn</p>
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

function renderQuizzSelected (element) {
    let banner = element.innerHTML;
    document.querySelector(".banner").innerHTML = banner;
}

function teste () {
    let teste = axios.get(SERVER_URL_QUIZZES);

    teste.then(function (data) {console.log(data)});
    teste.catch(function (error) {console.log(error)});
}
teste();