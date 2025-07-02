document
  .getElementById("searchForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const initials = this.search.value;
    const category = this.category.value;

    const params = new URLSearchParams();
    if (initials) params.append("initials", initials);
    if (category) params.append("category", category);

    //Get data from initaisAndFull_name function (server)
    const response = await fetch(`/eachStock?${params.toString()}`);
    const products = await response.json();

    const list = document.getElementById("productList");
    list.innerHTML = ""; //Clear previous search result

    if (products.length === 0) {
      list.innerHTML = "<li>No products found.</li>";
      return;
    }

    products.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = `${product.initials} (${product.full_name})`;
      list.appendChild(li);
    });
  });

document
  .getElementById("refreshStocks")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    try {
      // Get the value from the country input field by its ID
      const countryInput = document.getElementById("country");
      const country = countryInput ? countryInput.value : "";
      const params = new URLSearchParams();
      if (country) params.append("country", country);

      const response = await fetch(`/refresh?${params.toString()}`);
      if (!response.ok) throw new Error("Network response was not OK");
      const stocks = await response.json();

      const stockList = document.querySelector(".stock-list");

      stockList.innerHTML = ""; // Clear current list

      if (!stocks.length) {
        stockList.innerHTML = "<li>No stocks found.</li>";
        return;
      }

      stocks.forEach((stock) => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="stock-initials">${stock.initials}</span> - <span class="stock-name">${stock.full_name}</span> - <span class="stock-country">${stock.country}</span>`;
        stockList.appendChild(li);
      });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  });
