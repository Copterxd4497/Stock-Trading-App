
document.addEventListener("DOMContentLoaded", function () {
  const statusElem = document.querySelector(".status_color");
  if (!statusElem) return;
  // Try to parse the number from the element's text
  const value = parseFloat(statusElem.textContent.replace(/[^\d.\-]/g, ""));
  if (isNaN(value)) return;
  if (value > 1000) {
    statusElem.style.color = "rgb(15, 241, 15)";
  } else {
    statusElem.style.color = "rgb(255, 2, 2)";
  }
});
