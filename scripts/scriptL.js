const inputs = document.querySelectorAll(".basic-information .input");
console.log(inputs);
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
    if (inputs[0].value.length < 20 || inputs[0].value.length > 65) {
        console.log("O nome do seu quizz deve ter de 20 a 65 caracteres");
        return;
    }
    if (!isURL(inputs[1].value)) {
        console.log("Tente outro link.");
        return;
    }
    if (Number(inputs[2].value) < 3 || Number(inputs[2].value) === NaN) {
        console.log("Seu quizz deve ter no mínimo 3 perguntas.");
        return;
    }
    if (Number(inputs[3].value) < 2 || Number(inputs[3].value) === NaN) {
        console.log("Seu quizz deve ter no mínimo 2 níveis.");
        return;
    }
    console.log("Tudo certo!");
    printAmountOfQuestions();
    printAmountOfLevels();
    const neWinputs = document.querySelectorAll(".input");
    console.log(neWinputs);
    document.querySelector(".basic-information").classList.add("hide");
    document.querySelector(".levels").classList.remove("hide");
}

function printAmountOfQuestions() {
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
                    <input class="input background" placeholder="Cor de fundo da pergunta" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Cor de fundo da pergunta'"/>
                    <div class="divider"></div>
                    <div class="section-title">Resposta correta</div>
                    <div class="divisor"></div>
                    <input class="input correct answer necessary" placeholder="Resposta correta" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Resposta correta'"/>
                    <input class="input correct necessary image" placeholder="URL da imagem" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'URL da imagem'"/>
                    <div class="divider"></div>
                    <div class="section-title">Respostas incorretas</div>
                    <div class="divisor"></div>
                    <input class="input incorrect answer necessary" placeholder="Resposta incorreta 1" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Resposta incorreta 1'"/>
                    <input class="input incorrect necessary image" placeholder="URL da imagem 1" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'URL da imagem 1'"/>
                    <div class="divider"></div>
                    <input class="input incorrect" placeholder="Resposta incorreta 2" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Resposta incorreta 2'"/>
                    <input class="input incorrect image" placeholder="URL da imagem 2" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'URL da imagem 2'"/>
                    <div class="divider"></div>
                    <input class="input incorrect" placeholder="Resposta incorreta 3" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Resposta incorreta 3'"/>
                    <input class="input incorrect image" placeholder="URL da imagem 3" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'URL da imagem 3'"/>
                </div>
            </div>
        `;
    }
    document.querySelector(".question.closed").classList.remove("closed");
}
function printAmountOfLevels() {
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
                    <input class="input percentage" placeholder="% de acerto mínima" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = '% de acerto mínima'"/>
                    <input class="input image" placeholder="URL da imagem do nível" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Resposta correta'"/>
                    <input class="input description" placeholder="Descrição do nível" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Descrição do nível'"/>
                </div>
            </div>
        `;
    }
    document.querySelector(".level.closed").classList.remove("closed");
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
    const Qinputs = document.querySelectorAll(".questions .input");
    for (i = 0 ; i < Qinputs.length ; i ++) {
        if (Qinputs[i].classList.contains("question")) {
            if (Qinputs[i].value.length < 20) {
                console.log ("As perguntas devem ter no mínimo 20 caracteres.");
                return;
            }
        }
        if (Qinputs[i].classList.contains("background")) {
            if (!validarHexadecimal(Qinputs[i].value)) {
                console.log ("O background deve ser uma cor hexadecimal.");
                return;
            }
        }
        if (Qinputs[i].classList.contains("answer") && Qinputs[i].classList.contains("correct")
        && Qinputs[i].classList.contains("necessary")) {
            if (Qinputs[i].value.length < 1) {
                console.log ("Você precisa criar a resposta correta.");
                return;
            }
        }
        if (Qinputs[i].classList.contains("answer") && Qinputs[i].classList.contains("incorrect")
        && Qinputs[i].classList.contains("necessary")) {
            if (Qinputs[i].value.length < 1) {
                console.log ("Você precisa criar ao menos uma resposta incorreta.");
                return;
            }
        }
        if (Qinputs[i].classList.contains("image") && Qinputs[i].classList.contains("necessary")) {
            if (!isURL(Qinputs[i].value)) {
                console.log ("Insira um URL válido.");
                return;
            }
        }
    }
    document.querySelector(".questions").classList.add("hide");
    document.querySelector(".levels").classList.remove("hide");
}

function confirmLevels() {
    const Linputs = document.querySelectorAll(".levels .input");
    for (i = 0 ; i < Linputs.length ; i++) {
        if (Linputs[i].classList.contains("title")) {
            if (Linputs[i].value.length < 10) {
                console.log ("Título de nível deve ter no mínimo 10 caracteres.");
                return;
            }
        }
        if (Linputs[i].classList.contains("percentage")) {
            if (Number(Linputs[i].value) < 0 || Number(Linputs[i].value) > 100
            || Linputs[i].value === "") {
                console.log ("Escolha valores entre 0 e 100 para a porcentagem de acerto.");
                return;
            }
        }
        if (Linputs[i].classList.contains("image")) {
            if (!isURL(Linputs[i].value)) {
                console.log ("Insira um URL válido.");
                return;
            }
        }
        if (Linputs[i].classList.contains("description")) {
            if (Linputs[i].value.length < 30) {
                console.log ("Descrição de nível deve ter no mínimo 30 caracteres.");
                return;
            }
        }
    }
    document.querySelector(".levels").classList.add("hide");
    document.querySelector(".success").classList.remove("hide");
}
function finishCreation(element) {
    document.querySelector(".success").classList.add("hide");
    document.querySelector(".basic-information").classList.remove("hide");
    document.querySelector(".quizz-creation").classList.add("hide");
    if (element.classList.contains("home-button")) {
        document.querySelector(".quizz-list").classList.remove("hide");
    }
    else {
        document.querySelector(".quizz-page").classList.remove("hide");
    }
}