/*
    Copyright (c) 2020 - present, DITDOT Ltd.
    https://www.ditdot.hr/en
*/

function load() {
  const button = document.getElementById("color-mode-button");
  console.log(button);

  // MediaQueryList object
  const useDark = window.matchMedia("(prefers-color-scheme: dark)");

  // Toggles the "dark-mode" class based on if the media query matches
  function toggleDarkMode(state) {
    console.log("toggling state");
    // Older browser don't support the second parameter in the
    // classList.toggle method so you'd need to handle this manually
    // if you need to support older browsers.
    document.documentElement.classList.toggle("dark-mode", state);
  }

  // Initial setting
  toggleDarkMode(useDark.matches);

  useDark.addEventListener("change", (e) => {
    toggleDarkMode(e.matches);
  });

  // Toggles the "dark-mode" class on click
  button.addEventListener("click", () => {
    console.log("button clicked");
    document.documentElement.classList.toggle("dark-mode");
  });
}

window.addEventListener("DOMContentLoaded", load);
