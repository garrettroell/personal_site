document.addEventListener("DOMContentLoaded", function () {
  const footer = document.getElementById("footer-name");
  const year = new Date().getFullYear();
  footer.innerText = `Garrett Roell ${year}`;
});
