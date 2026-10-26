
const recipeGrid = document.querySelector("#recipe-grid");

function renderRecipes(recipeList) {
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


renderRecipes(recipes);

// Select all category buttons
const categoryButtons = document.querySelectorAll(".category-button");

// Filter recipes when a category is clicked
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active style from all buttons
    categoryButtons.forEach((item) => {
      item.classList.remove("active");
    });

    // Highlight the selected button
    button.classList.add("active");

    // Read the selected category
    const selectedCategory = button.textContent.trim();

    // Show all recipes or filter by category
    if (selectedCategory === "All recipes") {
      renderRecipes(recipes);
    } else {
      const filteredRecipes = recipes.filter((recipe) => {
        return recipe.category === selectedCategory;
      });

      renderRecipes(filteredRecipes);
    }
  });
});

