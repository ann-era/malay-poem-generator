function toggleTheme() {
  let themeButton = document.querySelector("#theme");
  let body = document.querySelector("body");
  let container = document.querySelector("#container");
  if (themeButton.innerHTML == "☀️") {
    body.classList.add("dark-theme");
    container.classList.add("dark-theme");
    themeButton.innerHTML = "🌙";
  } else {
    body.classList.remove("dark-theme");
    container.classList.remove("dark-theme");
    themeButton.innerHTML = "☀️";
  }
}

function generatePoem(event) {
  event.preventDefault();
  let main = document.querySelector("main");
  if (main.querySelector("#poem") == null) {
    let poemBox = '<div class="poem" id="poem"></div>';
    main.insertAdjacentHTML("beforeend", poemBox);
  }
  new Typewriter("#poem", {
    strings: "Whipping up your poem...<br />Hang tight, creativity at work!",
    autoStart: true,
    cursor: null,
    delay: 50,
  });

  let keywords = document.querySelector("#topic-input").value;
  let prompt = `In just 4 lines, generate a poem in malay about ${keywords}`;
  let context = `You are a poetic AI assistant, skilled in crafting 4-line Malay poems, deeply attuned to nature, life, and the inner thoughts of humanity. Each line should be separated by <br />. You will sign your work with '<strong>- SheCodes AI</strong>'`;
  let apiKey = "93aa3f2e40748o3cacebbc6bct7b0422";
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;
  console.log(apiUrl);
  axios
    .get(apiUrl)
    .then(writePoem)
    .catch((error) => {
      console.error("Error fetching poem: ", error);
    });
}

function writePoem(response) {
  new Typewriter("#poem", {
    strings: response.data.answer,
    autoStart: true,
    cursor: null,
    delay: 50,
  });
}

let themeButton = document.querySelector("#theme");
themeButton.addEventListener("click", toggleTheme);

let poemForm = document.querySelector("#poem-form");
poemForm.addEventListener("submit", generatePoem);
