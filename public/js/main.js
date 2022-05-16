let selectedProject = 0;
const activeColor = "#288b6e";
const inactiveColor = "#005555";

const activeTextColor = "white";
const inactiveTextColor = "white";

// this function runs when the DOM is ready, i.e. when the document has been parsed
document.addEventListener("DOMContentLoaded", function () {
  // setCopywriteText();

  const projectButtons = document.querySelectorAll(
    ".project-filter-buttons button"
  );

  // initial coloring of buttons. The 'all' button starts as active
  projectButtons.forEach((button, index) => {
    if (selectedProject === index) {
      button.style.backgroundColor = activeColor;
      // button.style.color = activeTextColor;
    } else {
      button.style.backgroundColor = inactiveColor;
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
        // button.style.color = activeTextColor;
      } else {
        button.style.backgroundColor = inactiveColor;
        // button.style.color = inactiveTextColor;
      }
    });

    Array.from(projectTiles).forEach((project) => {
      // Convert the project type to a number than can be compared with selected project
      let projectValue = 0;
      switch (project.getAttribute("data-type")) {
        case "PhD Research":
          projectValue = 1;
          break;
        case "Web Development":
          projectValue = 2;
          break;
        default:
          null;
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

// funcs
