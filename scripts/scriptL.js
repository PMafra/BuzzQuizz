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
