function toggleTheme() {
  let themeButton = document.querySelector("#theme");
  let body = document.querySelector("body");
  let container = document.querySelector("#container");
  let smallNote = document.querySelectorAll("small");
  if (themeButton.innerHTML == "☀️") {
    body.classList.add("dark-theme");
    container.classList.add("dark-theme");
    smallNote.forEach((smallNote) => {
      smallNote.classList.add("dark-theme");
    });
    themeButton.innerHTML = "🌙";
  } else {
    body.classList.remove("dark-theme");
    container.classList.remove("dark-theme");
    smallNote.forEach((smallNote) => {
      smallNote.classList.remove("dark-theme");
    });
    themeButton.innerHTML = "☀️";
  }
}

function generatePoem(event) {
  event.preventDefault();
  let poemBox = document.querySelector("#poem");
  let poemText = document.querySelector("#poem-text");
  let copyButton = document.querySelector("#copy-btn");
  let keywords = document.querySelector("#topic-input").value;
  let tone = document.querySelector("#tone-input").value;
  let prompt = "";
  if (tone !== "") {
    prompt = `In just 4 lines, generate a poem in malay about ${keywords} in a ${tone} tone`;
  } else {
    prompt = `In just 4 lines, generate a poem in malay about ${keywords}`;
  }
  let context = `You are a poetic AI assistant, skilled in crafting 4-line Malay poems, deeply attuned to nature, life, and the inner thoughts of humanity. Each line should be separated by <br />. You will sign your work with '<strong>- SheCodes AI</strong>'`;
  let apiKey = "93aa3f2e40748o3cacebbc6bct7b0422";
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;
  if (poemBox.classList.contains("hidden-poem")) {
    poemBox.classList.remove("hidden-poem");
  }
  if (!copyButton.classList.contains("hidden-copy")) {
    copyButton.classList.add("hidden-copy");
  }
  if (tone !== "") {
    poemText.innerHTML = `<span class="blinking-text">⏳ Crafting a poem inspired by ${keywords} in a ${tone} tone..</span>`;
  } else {
    poemText.innerHTML = `<span class="blinking-text">⏳ Crafting a poem inspired by ${keywords}..</span>`;
  }
  axios
    .get(apiUrl)
    .then(writePoem)
    .catch((error) => {
      console.error("Error fetching poem: ", error);
    });
}

function writePoem(response) {
  let copyButton = document.querySelector("#copy-btn");
  new Typewriter("#poem-text", {
    strings: response.data.answer,
    autoStart: true,
    cursor: null,
    delay: 50,
  });
  if (copyButton.classList.contains("hidden-copy")) {
    copyButton.classList.remove("hidden-copy");
  }
  copyButton.addEventListener("click", copyPoem);
}

function copyPoem() {
  let poemText = document.querySelector("#poem-text");
  navigator.clipboard
    .writeText(poemText.innerText)
    .then(() => {
      alert("Poem copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
      alert("Failed to copy poem. Please try again.");
    });
}

let themeButton = document.querySelector("#theme");
themeButton.addEventListener("click", toggleTheme);

let poemForm = document.querySelector("#poem-form");
poemForm.addEventListener("submit", generatePoem);
