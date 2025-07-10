document.addEventListener("DOMContentLoaded", function status() {
  const indexElem = document.querySelector(".index_value");
  if (!indexElem) return;
  const index = parseFloat(indexElem.textContent.replace(/[^\d.-]/g, ""));
  const statusElem = document.querySelector(".status_value");
  if (!statusElem) return;
  if (index > 1000) {
    statusElem.style.color = "rgb(15, 241, 15)";
  } else {
    statusElem.style.color = "rgb(255, 2, 2)";
  }
});
