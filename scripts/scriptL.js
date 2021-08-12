const inputs = document.querySelectorAll(".input");

function advanceCreation(element) {
    // Aqui, criar variaveis do querySelector para diminuir código? 
    if (element.classList.contains("information-button")) {
        document.querySelector(".basic-information").classList.add("hide");
        document.querySelector(".questions").classList.remove("hide");
    }
    if (element.classList.contains("questions-button")) {
        document.querySelector(".questions").classList.add("hide");
        document.querySelector(".levels").classList.remove("hide");
    }
    if (element.classList.contains("levels-button")) {
        document.querySelector(".levels").classList.add("hide");
        document.querySelector(".success").classList.remove("hide");
    }
    if (element.classList.contains("success-button")) {
        document.querySelector(".success").classList.add("hide");
    }
    if (element.classList.contains("home-button")) {
        document.querySelector(".success").classList.add("hide");
        document.querySelector(".quizz-list").classList.remove("hide");
    }
}
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
function openQuestion(element) {
    const questions = document.querySelectorAll(".quizz-creation .question");
    for (i = 0 ; i < questions.length ; i++) {
        questions[i].classList.add("closed");
    }
    element.classList.remove("closed");
}
function confirmQuestions() {
}

