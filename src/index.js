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

let themeButton = document.querySelector("#theme");
themeButton.addEventListener("click", toggleTheme);
