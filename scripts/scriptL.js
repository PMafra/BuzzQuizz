const inputs = document.querySelectorAll(".input");

function isURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
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
    if (Number(inputs[2].value) < 3 || Number(inputs[2].value) / 1 !== Number(inputs[2].value)) {
        console.log("Seu quizz deve ter no mínimo 3 perguntas.");
        return;
    }
    if (Number(inputs[3].value) < 2 || Number(inputs[3].value) / 1 !== Number(inputs[3].value)) {
        console.log("Seu quizz deve ter no mínimo 2 níveis.");
        return;
    }
    console.log("Tudo certo!");
    printAmountOfQuestions();
    printAmountOfLevels();
    document.querySelector(".basic-information").classList.add("hide");
    document.querySelector(".questions").classList.remove("hide");
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
                    <input class="input" placeholder="Texto da pergunta" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Texto da pergunta'"/>
                    <input class="input" placeholder="Cor de fundo da pergunta" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Cor de fundo da pergunta'"/>
                    <div class="divider"></div>
                    <div class="section-title">Resposta correta</div>
                    <div class="divisor"></div>
                    <input class="input" placeholder="Resposta correta" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Resposta correta'"/>
                    <input class="input" placeholder="URL da imagem" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'URL da imagem'"/>
                    <div class="divider"></div>
                    <div class="section-title">Respostas incorretas</div>
                    <div class="divisor"></div>
                    <input class="input" placeholder="Resposta incorreta 1" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Resposta incorreta 1'"/>
                    <input class="input" placeholder="URL da imagem 1" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'URL da imagem 1'"/>
                    <div class="divider"></div>
                    <input class="input" placeholder="Resposta incorreta 2" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Resposta incorreta 2'"/>
                    <input class="input" placeholder="URL da imagem 2" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'URL da imagem 2'"/>
                    <div class="divider"></div>
                    <input class="input" placeholder="Resposta incorreta 3" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Resposta incorreta 3'"/>
                    <input class="input" placeholder="URL da imagem 3" onfocus="this.placeholder = ''"
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
                    <input class="input" placeholder="Título do nível" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Título do nível'"/>
                    <input class="input" placeholder="% de acerto mínima" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = '% de acerto mínima'"/>
                    <input class="input" placeholder="URL da imagem do nível" onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Resposta correta'"/>
                    <input class="input" placeholder="Descrição do nível" onfocus="this.placeholder = ''"
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
    document.querySelector(".questions").classList.add("hide");
    document.querySelector(".levels").classList.remove("hide");
}
function confirmLevels() {
    document.querySelector(".levels").classList.add("hide");
    document.querySelector(".success").classList.remove("hide");
}

