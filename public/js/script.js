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
