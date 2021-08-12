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
        `<div class="quizz-layout quizz-box" onclick="changePages(this)">
            <img class="img-background" src="${response.data[i].image}">
            <div class="gradient-container">
                <p class="description">Alguma descrição do quizz aaaa afojnasdfsan asdofnasdojn asdofnn</p>
            </div>`
    }
}

function changePages (element) {
    main.classList.add("hide");

    if (element.classList.contains("quizz-box")) {
        page.classList.remove("hide");
    } else if (element.parentElement.classList.contains("quizz-create") || element.id === "add-icon") {
        creation.classList.remove("hide");
    }
}

function refreshPage () {
    location.reload();
}
