document
  .getElementById("searchStock")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const stockSymbol = document.getElementById("stock");
    const quantity = document.getElementById("quantity");
    const buyMessage = document.getElementById("buyMessage");

    buyMessage.innerHTML = "";

    fetch("/purchase/buyStock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock: stockSymbol.value,
        quantity: quantity.value,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          buyMessage.textContent = "Purchase successful!";
          buyMessage.style.color = "green";
        } else {
          buyMessage.textContent =
            "Failed to purchase: " + (data.message || response.statusText);
          buyMessage.style.color = "red";
        }
        console.log(data);
      })
      .catch((error) => {
        buyMessage.textContent = "Error: " + error.message;
        buyMessage.style.color = "red";
        console.error("Error:", error);
      });
  });
