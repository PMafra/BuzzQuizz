function isURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

  function validarHexadecimal(str){
    if(!/^#[a-fA-F0-9]{6}$/i.test(str)){
      return false
    }
    return true
  }

function confirmInformation() {
    const inputs = document.querySelectorAll(".basic-information .input");
    const errors = document.querySelectorAll(".basic-information .error");
    for(i = 0 ; i < inputs.length ; i ++) {
        inputs[i].classList.remove("error-background");
        errors[i].classList.add("hide");
    }
    if (inputs[0].value.length < 20 || inputs[0].value.length > 65) {
        inputs[0].classList.add("error-background");
        errors[0].classList.remove("hide");
    }
    if (!isURL(inputs[1].value)) {
        inputs[1].classList.add("error-background");
        errors[1].classList.remove("hide");
    }
    if (Number(inputs[2].value) < 3 || Number(inputs[2].value) === NaN) {
        inputs[2].classList.add("error-background");
        errors[2].classList.remove("hide");
    }
    if (Number(inputs[3].value) < 2 || Number(inputs[3].value) === NaN) {
        inputs[3].classList.add("error-background");
        errors[3].classList.remove("hide");
    }
    for(i = 0 ; i < inputs.length ; i ++) {
        if (inputs[i].classList.contains("error-background")) {
            return;
        }
    }
    quizzInformation(inputs);
    printAmountOfQuestions(inputs);
    printAmountOfLevels(inputs);
    printFinalScreen(inputs)
    document.querySelector(".basic-information").classList.add("hide");
    document.querySelector(".questions").classList.remove("hide");
}

function quizzInformation(inputs) {
    quizz.title = inputs[0].value;
    quizz.image = inputs[1].value;
    quizz.questions.length = Number(inputs[2].value);
    quizz.levels.length = Number(inputs[3].value);
}

function printAmountOfQuestions(inputs) {
    const numberOfQuestions = Number(inputs[2].value);
    const questions = document.querySelector(".questions .versatile-box");
    questions.innerHTML = "";
    for (i = 0 ; i < numberOfQuestions ; i++) {
        questions.innerHTML += `
            <div class="information-box question closed" onclick="openQuestion(this)">
                <div class="section-title">Pergunta ${i + 1}</div>
                <ion-icon name="create-outline"></ion-icon>
                <div class="opened">
                    <div class="divisor"></div>
                    <input class="input question" placeholder="Texto da pergunta" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Texto da pergunta'"/>
                    <div class = "error hide ">As perguntas devem ter no mínimo 20 caracteres.</div>
                    <input class="input background" placeholder="Cor de fundo da pergunta" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Cor de fundo da pergunta'"/>
                    <div class = "error hide ">O background deve ser uma cor hexadecimal.</div>
                    <div class="divider"></div>
                    <div class="section-title">Resposta correta</div>
                    <div class="divisor"></div>
                    <input class="input correct answer necessary" placeholder="Resposta correta" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Resposta correta'"/>
                    <div class = "error hide ">Você precisa criar a resposta correta.</div>
                    <input class="input correct necessary image" placeholder="URL da imagem" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'URL da imagem'"/>
                    <div class = "error hide ">Insira um URL de imagem válido.</div>
                    <div class="divider"></div>
                    <div class="section-title">Respostas incorretas</div>
                    <div class="divisor"></div>
                    <input class="input incorrect answer necessary" placeholder="Resposta incorreta 1" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Resposta incorreta 1'"/>
                    <div class = "error hide ">Você precisa criar ao menos uma resposta incorreta.</div>
                    <input class="input incorrect necessary image" placeholder="URL da imagem 1" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'URL da imagem 1'"/>
                    <div class = "error hide ">Insira um URL de imagem válido.</div>
                    <div class="divider"></div>
                    <input class="input incorrect answer unnecessary third" placeholder="Resposta incorreta 2" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Resposta incorreta 2'"/>
                    <div class = "error hide ">Essa resposta precisa de um texto.</div>
                    <input class="input incorrect unnecessary third image" placeholder="URL da imagem 2" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'URL da imagem 2'"/>
                    <div class = "error hide ">Insira um URL de imagem válido.</div>
                    <div class="divider"></div>
                    <input class="input incorrect answer unnecessary forth" placeholder="Resposta incorreta 3" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Resposta incorreta 3'"/>
                    <div class = "error hide ">Essa resposta precisa de um texto.</div>
                    <input class="input incorrect unnecessary forth image" placeholder="URL da imagem 3" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'URL da imagem 3'"/>
                    <div class = "error hide ">Insira um URL de imagem válido.</div>
                </div>
            </div>
        `;
    }
    document.querySelector(".question.closed").classList.remove("closed");
}

function printAmountOfLevels(inputs) {
    const numberOfLevels = Number(inputs[3].value);
    const levels = document.querySelector(".levels .versatile-box");
    levels.innerHTML = "";
    for (i = 0 ; i < numberOfLevels ; i++) {
        levels.innerHTML += `
            <div class="information-box level closed" onclick="openLevel(this)">
                <div class="section-title">Nível ${i + 1}</div>
                <ion-icon name="create-outline"></ion-icon>
                <div class="opened">
                    <div class="divisor"></div>
                    <input class="input title" placeholder="Título do nível" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Título do nível'"/>
                    <div class = "error hide">Título de nível deve ter no mínimo 10 caracteres.</div>
                    <input class="input percentage" placeholder="% de acerto mínima" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = '% de acerto mínima'"/>
                    <div class = "error hide">Escolha valores entre 0 e 100 para a porcentagem de acerto.</div>
                    <input class="input image" placeholder="URL da imagem do nível" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Resposta correta'"/>
                    <div class = "error hide">Insira um URL de imagem válido.</div>
                    <input class="input description" placeholder="Descrição do nível" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Descrição do nível'"/>
                    <div class = "error hide">Descrição de nível deve ter no mínimo 30 caracteres.</div>
                </div>
            </div>
        `;
    }
    document.querySelector(".level.closed").classList.remove("closed");
}

function printFinalScreen(inputs) {
    document.querySelector(".success img").src = (inputs[1].value);
    document.querySelector(".success .description").innerHTML = (inputs[0].value);
}

function openQuestion(element) {
    const questions = document.querySelectorAll(".quizz-creation .question");
    for (i = 0 ; i < questions.length ; i++) {
        questions[i].classList.add("closed");
    }
    element.classList.remove("closed");
}

function openLevel(element) {
    const questions = document.querySelectorAll(".quizz-creation .level");
    for (i = 0 ; i < questions.length ; i++) {
        questions[i].classList.add("closed");
    }
    element.classList.remove("closed");
}

function confirmQuestions() {
    const questionInputs = document.querySelectorAll(".questions .input");
    const questionErrors = document.querySelectorAll(".questions .error");
    for(i = 0 ; i < questionInputs.length ; i ++) {
        questionInputs[i].classList.remove("error-background");
        questionErrors[i].classList.add("hide");
    }
    for (i = 0 ; i < questionInputs.length ; i ++) {
        if (questionInputs[i].classList.contains("question")) {
            if (questionInputs[i].value.length < 20) {
                questionInputs[i].classList.add("error-background");
                questionErrors[i].classList.remove("hide");
            }
        }
        if (questionInputs[i].classList.contains("background")) {
            if (!validarHexadecimal(questionInputs[i].value)) {
                questionInputs[i].classList.add("error-background");
                questionErrors[i].classList.remove("hide");
            }
        }
        if (questionInputs[i].classList.contains("answer") && questionInputs[i].classList.contains("correct")
        && questionInputs[i].classList.contains("necessary")) {
            if (questionInputs[i].value.length < 1) {
                questionInputs[i].classList.add("error-background");
                questionErrors[i].classList.remove("hide");
            }
        }
        if (questionInputs[i].classList.contains("answer") && questionInputs[i].classList.contains("incorrect")
        && questionInputs[i].classList.contains("necessary")) {
            if (questionInputs[i].value.length < 1) {
                questionInputs[i].classList.add("error-background");
                questionErrors[i].classList.remove("hide");
            }
        }
        if (questionInputs[i].classList.contains("image") && questionInputs[i].classList.contains("necessary")) {
            if (!isURL(questionInputs[i].value)) {
                questionInputs[i].classList.add("error-background");
                questionErrors[i].classList.remove("hide");
            }
        }
        if (questionInputs[i].classList.contains("answer") && questionInputs[i].classList.contains("unnecessary") && questionInputs[i].value !== "") {
            if (!isURL(questionInputs[i + 1].value)) {
                questionInputs[i + 1].classList.add("error-background");
                questionErrors[i + 1].classList.remove("hide");
            }
        }
        if (questionInputs[i].classList.contains("image") && questionInputs[i].classList.contains("unnecessary") && questionInputs[i].value !== "") {
            if (questionInputs[i - 1].value === "") {
                questionInputs[i - 1].classList.add("error-background");
                questionErrors[i - 1].classList.remove("hide");
            }
        }
        if (questionInputs[i].classList.contains("image") && questionInputs[i].classList.contains("unnecessary") && questionInputs[i].value !== "") {
            if (!isURL(questionInputs[i].value)) {
                questionInputs[i].classList.add("error-background");
                questionErrors[i].classList.remove("hide");
            }
        }
    }
    // for(i = 0 ; i < quizz.questions.length  ; i ++) {
    //     if (document.querySelector(".question.closed")..classList.contains("error-background")) {
    //         return;
    //     }
    // }
    for(i = 0 ; i < questionInputs.length ; i ++) {
        if (questionInputs[i].classList.contains("error-background")) {
            return;
        }
    }
    QuizzQuestions();
    document.querySelector(".questions").classList.add("hide");
    document.querySelector(".levels").classList.remove("hide");
}

function QuizzQuestions() {
    for(i=0 ; i < quizz.questions.length ; i ++) {
        quizz.questions[i] = {
			title: document.querySelectorAll(".input.question")[i].value,
			color: document.querySelectorAll(".input.background")[i].value,
			answers: [{
                text: document.querySelectorAll(".input.correct.answer")[i].value,
                image: document.querySelectorAll(".input.correct.image")[i].value,
                isCorrectAnswer: true
                },
                {
                text: document.querySelectorAll(".input.incorrect.necessary.answer")[i].value,
                image: document.querySelectorAll(".input.incorrect.necessary.image")[i].value,
                isCorrectAnswer: false
                }
            ]
        }
    }
    for(i=0 ; i < quizz.questions.length ; i ++) {
        if (document.querySelectorAll(".input.third.answer")[i].value !== "") {
            quizz.questions[i].answers.push({
                text: document.querySelectorAll(".input.incorrect.third.answer")[i].value,
                image: document.querySelectorAll(".input.incorrect.third.image")[i].value,
                isCorrectAnswer: false
                })
        }
        if (document.querySelectorAll(".input.forth.answer")[i].value !== "") {
            quizz.questions[i].answers.push({
                text: document.querySelectorAll(".input.incorrect.forth.answer")[i].value,
                image: document.querySelectorAll(".input.incorrect.forth.image")[i].value,
                isCorrectAnswer: false
                })
        }
    }
}

function confirmLevels() {
    let checkifthereisalowscore = false;
    let checkifthereissamepercentage = false;
    const levelInputs = document.querySelectorAll(".levels .input");
    const levelErrors = document.querySelectorAll(".levels .error");
    for(i = 0 ; i < levelInputs.length ; i ++) {
        levelInputs[i].classList.remove("error-background");
        levelErrors[i].classList.add("hide");
    }
    for (i = 0 ; i < levelInputs.length ; i++) {
        if (levelInputs[i].classList.contains("title")) {
            if (levelInputs[i].value.length < 10) {
                levelInputs[i].classList.add("error-background");
                levelErrors[i].classList.remove("hide");
            }
        }
        if (levelInputs[i].classList.contains("percentage")) {
            if (Number(levelInputs[i].value) < 0 || Number(levelInputs[i].value) > 100
            || levelInputs[i].value === "") {
                levelInputs[i].classList.add("error-background");
                levelErrors[i].classList.remove("hide");
            }
            if (Number(levelInputs[i].value) === 0) {
                checkifthereisalowscore = true;
            }
            for(j = i+1 ; j < levelInputs.length ; j++) {
                if (Number(levelInputs[j].value) === Number(levelInputs[i].value)) {
                    checkifthereissamepercentage = true;
                }
            }
        }
        if (levelInputs[i].classList.contains("image")) {
            if (!isURL(levelInputs[i].value)) {
                levelInputs[i].classList.add("error-background");
                levelErrors[i].classList.remove("hide");
            }
        }
        if (levelInputs[i].classList.contains("description")) {
            if (levelInputs[i].value.length < 30) {
                levelInputs[i].classList.add("error-background");
                levelErrors[i].classList.remove("hide");
            }
        }
    }
    for(i = 0 ; i < levelInputs.length ; i ++) {
        if (levelInputs[i].classList.contains("error-background")) {
            return;
        }
    }
    if (checkifthereisalowscore === false) {
        alert("Pelo menos um nível deve ter porcentagem de acertos igual a 0.");
        return;
    }
    if (checkifthereissamepercentage === true) {
        alert("Não pode ter dois níveis com a mesma porcentagem.");
        return;
    }
    quizzLevels();
    createQuizz();
    document.querySelector(".levels").classList.add("hide");
    document.querySelector(".success").classList.remove("hide");
}

function quizzLevels() {
    for(i=0 ; i < quizz.levels.length ; i ++) {
        quizz.levels[i] = {
			title: document.querySelectorAll(".levels .input.title")[i].value,
			image: document.querySelectorAll(".levels .input.image")[i].value,
			text: document.querySelectorAll(".levels .input.description")[i].value,
			minValue: document.querySelectorAll(".levels .input.percentage")[i].value
		}
    }
}

function quizzCreatedScreen(element) {
    if (element.classList.contains("home-button")) {
        location.reload();
    }
    else {
        changePages(this);
        renderBanner(this);
        getQuizz(this);
    }
}

function createQuizz() {
    const promise = axios.post(SERVER_URL_QUIZZES, quizz);
    promise.then(sendQuizz);
    promise.catch(incorrectQuizz);
}

function sendQuizz(response) {
    const newQuizz = response;
   // document.querySelector(".success .test-created").id = newQuizz.answers.data.id;
    console.log(response);
    addToDataStorage(newQuizz)
}

function incorrectQuizz(error) {
    console.log(error);
    alert("Ocorreu um erro, tente novamente.");
}

function addToDataStorage(newQuizz) {
    userQuizzes.push(newQuizz);
    localStorage.setItem("list", JSON.stringify(userQuizzes));
}