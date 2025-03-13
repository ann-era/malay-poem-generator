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
  let writePoem = new Typewriter("#poem", {
    strings: "Whipping up your poem...<br />Hang tight, creativity at work!",
    autoStart: true,
    cursor: null,
    delay: 50,
  });
  writePoem
    .deleteAll(25)
    .typeString("Poem Line 1<br>Poem Line 2<br>Poem Line 3")
    .start();
}

let themeButton = document.querySelector("#theme");
themeButton.addEventListener("click", toggleTheme);

let poemForm = document.querySelector("#poem-form");
poemForm.addEventListener("submit", generatePoem);
