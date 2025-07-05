document
  .getElementById("searchStock")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const stockSymbol = this.stockSymbol.value;
    const quantity = this.quantity.value;

    fetch("/purchase/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock: stockSymbol,
        quantity: quantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  });
