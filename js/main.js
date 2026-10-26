

const recipeGrid = document.querySelector("#recipe-grid");
const searchInput = document.querySelector("#recipe-search");
const categoryButtons = document.querySelectorAll(".category-button");
const resultsStatus = document.querySelector("#recipe-results-status");

let selectedCategory = "All recipes";

function renderRecipes(recipeList) {
  if (recipeList.length === 0) {
    recipeGrid.innerHTML = `
      <p class="no-recipes">
        No recipes found. Try another search.
      </p>
    `;
    return;
  }

  recipeGrid.innerHTML = recipeList.map((recipe) => `
    <article class="recipe-card">
      <a
        class="recipe-image-link"
        href="article.html?id=${recipe.id}"
        aria-label="Read ${recipe.title}"
      >
        <img
          class="recipe-image"
          src="${recipe.image}"
          alt="${recipe.title}"
          loading="lazy"
        >
      </a>

      <div class="recipe-card-content">
        <span class="recipe-category">${recipe.category}</span>

        <h3>
          <a href="article.html?id=${recipe.id}">
            ${recipe.title}
          </a>
        </h3>

        <p class="recipe-description">${recipe.description}</p>

        <div class="recipe-meta">
          <span>${recipe.date}</span>
          <span>${recipe.readTime}</span>
        </div>

        <div class="recipe-author">
          <span class="author-avatar" aria-hidden="true">
            ${recipe.initials}
          </span>
          <span>By ${recipe.author}</span>
        </div>
      </div>
    </article>
  `).join("");
}

function filterRecipes() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === "All recipes" ||
      recipe.category === selectedCategory;

    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.description.toLowerCase().includes(searchTerm) ||
      recipe.category.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  renderRecipes(filteredRecipes);
  resultsStatus.textContent =
  `${filteredRecipes.length} recipes found.`;
}

// Filter as the visitor types
searchInput.addEventListener("input", filterRecipes);

// Filter when a category is selected
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    selectedCategory = button.textContent.trim();

    filterRecipes();
  });
});

// Show all recipes when the page loads
filterRecipes();
