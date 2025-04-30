const palavras = ["javascript", "html", "css", "programacao", "frontend"];
let palavraSelecionada = "";
let palavraExibida = [];
let tentativas = 6;

function startGame() {
  palavraSelecionada = palavras[Math.floor(Math.random() * palavras.length)];
  palavraExibida = Array(palavraSelecionada.length).fill("_");
  tentativas = 6;
  document.getElementById("attempts").textContent = tentativas;
  document.getElementById("message").textContent = "";
  renderWord();
  renderLetters();
}

function renderWord() {
  document.getElementById("word").textContent = palavraExibida.join(" ");
}

function renderLetters() {
  const container = document.getElementById("letters");
  container.innerHTML = "";
  const alfabeto = "abcdefghijklmnopqrstuvwxyz";

  alfabeto.split("").forEach(letra => {
    const button = document.createElement("button");
    button.textContent = letra;
    button.onclick = () => escolherLetra(letra, button);
    container.appendChild(button);
  });
}

function escolherLetra(letra, button) {
  button.disabled = true;

  if (palavraSelecionada.includes(letra)) {
    for (let i = 0; i < palavraSelecionada.length; i++) {
      if (palavraSelecionada[i] === letra) {
        palavraExibida[i] = letra;
      }
    }
  } else {
    tentativas--;
    document.getElementById("attempts").textContent = tentativas;
  }

  renderWord();
  verificarFimDoJogo();
}

function verificarFimDoJogo() {
  if (!palavraExibida.includes("_")) {
    document.getElementById("message").textContent = "Você venceu!";
    desativarBotoes();
  } else if (tentativas === 0) {
    document.getElementById("message").textContent = `Você perdeu! A palavra era: ${palavraSelecionada}`;
    desativarBotoes();
  }
}

function desativarBotoes() {
  document.querySelectorAll("#letters button").forEach(btn => btn.disabled = true);
}

startGame();