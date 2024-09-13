let selectedProject = 0;

// light mode
let activeColor = "#2fa582";
let inactiveColor = "#007070";

let activeTextColor = "white";
let inactiveTextColor = "white";

// dark mode
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  activeColor = "#7199B9";
  inactiveColor = "#2A3B69";

  // text color is white in both light and dark conditions
  // activeTextColor = "white";
  // inactiveTextColor = "white";
}

// this function runs when the DOM is ready, i.e. when the document has been parsed
document.addEventListener("DOMContentLoaded", function () {
  const projectButtons = document.querySelectorAll(
    ".project-filter-buttons button"
  );

  // initial coloring of buttons. The 'all' button starts as active
  projectButtons.forEach((button, index) => {
    if (selectedProject === index) {
      button.style.backgroundColor = activeColor;
      // button.style.fontWeight = "900";
    } else {
      button.style.backgroundColor = inactiveColor;
      // button.style.fontWeight = "400";
      // button.style.color = inactiveTextColor;
    }
  });

  // update selected project when a button is selected
  projectButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      selectedProject = index;
    });
  });

  // There are two projects-tile-list instances: projects and publications
  // These lines only select project tiles
  const projectSection = document.querySelectorAll(".projects-tile-list")[0];
  const projectTiles = projectSection.children;

  // This sets are variable for all buttons
  const buttonGroup = document.querySelector(".project-filter-buttons");

  // This callback runs every time a button is clicked
  buttonGroup.addEventListener("click", () => {
    // Update the button colors to reflect state change
    projectButtons.forEach((button, index) => {
      if (selectedProject === index) {
        button.style.backgroundColor = activeColor;
      } else {
        button.style.backgroundColor = inactiveColor;
      }
    });

    Array.from(projectTiles).forEach((project) => {
      // Convert the project type to a number than can be compared with selected project
      let projectValue = 0;
      switch (project.getAttribute("data-type")) {
        case "Research":
          projectValue = 1;
          break;
        case "Web Development":
          projectValue = 2;
          break;
        default:
      }

      // display a project if all projects should be displayed, or the
      // project is in the selected group
      if (selectedProject === 0 || selectedProject === projectValue) {
        project.style.display = "flex";
      } else {
        project.style.display = "none";
      }
    });
  });
});
