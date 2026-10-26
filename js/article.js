
const articleContainer = document.querySelector("#article-content");

// Get the recipe ID from the page URL
const params = new URLSearchParams(window.location.search);
const recipeId = Number(params.get("id"));

// Find the selected recipe in recipes.js
const recipe = recipes.find((item) => item.id === recipeId);

if (!recipe) {
  articleContainer.innerHTML = `
    <div class="article-not-found">
      <h1>Recipe not found</h1>
      <p>Sorry, we couldn't find that recipe.</p>
      <a class="button button-primary" href="index.html#recipes">
        Browse all recipes
      </a>
    </div>
  `;
} else {
  articleContainer.innerHTML = `
    <article class="full-recipe">
      <a class="back-link" href="index.html#recipes">
        &larr; Back to all recipes
      </a>

      <header class="article-header">
        <span class="recipe-category">${recipe.category}</span>
        <h1>${recipe.title}</h1>
        <p class="article-description">${recipe.description}</p>

        <div class="article-meta">
          <span>By ${recipe.author}</span>
          <span>${recipe.date}</span>
          <span>${recipe.readTime} read</span>
        </div>
      </header>

      <img
        class="article-image"
        src="${recipe.image}"
        alt="${recipe.title}"
      >

      <div class="article-body">
        <section>
          <h2>Ingredients</h2>
          <ul class="ingredient-list">
            ${recipe.ingredients.map((ingredient) => `
              <li>${ingredient}</li>
            `).join("")}
          </ul>
        </section>

        <section>
          <h2>How to make it</h2>
          <ol class="instruction-list">
            ${recipe.instructions.map((instruction) => `
              <li>${instruction}</li>
            `).join("")}
          </ol>
        </section>
      </div>
    </article>
  `;
}
