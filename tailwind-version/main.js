const recipeGrid = document.querySelector("#recipe-grid");
const searchInput = document.querySelector("#recipe-search");
const categoryButtons = document.querySelectorAll(".category-button");
const resultsStatus = document.querySelector("#recipe-results-status");

let selectedCategory = "All recipes";

function renderRecipes(recipeList) {
  if (!recipeGrid) return;

  if (recipeList.length === 0) {
    recipeGrid.innerHTML = `
      <p class="col-span-full py-10 text-center text-lg text-muted">
        No recipes found. Try another search.
      </p>
    `;
    return;
  }

  recipeGrid.innerHTML = recipeList.map((recipe) => `
    <article class="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <a href="../article.html?id=${recipe.id}" aria-label="Read ${recipe.title}">
        <img
          class="h-60 w-full object-cover transition duration-300 group-hover:scale-105"
          src="${recipe.image}"
          alt="${recipe.title}"
          loading="lazy"
        >
      </a>

      <div class="p-6">
        <span class="inline-block rounded-full bg-[#fbe9e4] px-3 py-1 text-xs font-bold text-tomato-dark">
          ${recipe.category}
        </span>

        <h3 class="mt-4 font-heading text-2xl font-bold">
          <a href="../article.html?id=${recipe.id}" class="transition hover:text-tomato">
            ${recipe.title}
          </a>
        </h3>

        <p class="mt-3 text-sm leading-7 text-muted">
          ${recipe.description}
        </p>

        <div class="mt-5 flex justify-between border-t border-border pt-4 text-xs text-muted">
          <span>${recipe.date}</span>
          <span>${recipe.readTime}</span>
        </div>

        <div class="mt-4 flex items-center gap-3">
          <span class="flex h-10 w-10 items-center justify-center rounded-full bg-sage font-bold text-white">
            ${recipe.initials}
          </span>
          <span class="text-sm font-semibold">By ${recipe.author}</span>
        </div>
      </div>
    </article>
  `).join("");
}

function filterRecipes() {
  if (!searchInput || typeof recipes === "undefined") return;

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

  if (resultsStatus) {
    resultsStatus.textContent = `${filteredRecipes.length} recipes found.`;
  }
}

if (searchInput) {
  searchInput.addEventListener("input", filterRecipes);
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((item) => {
      item.classList.remove("bg-tomato", "text-white");
      item.classList.add("border", "border-border", "bg-white");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("bg-tomato", "text-white");
    button.classList.remove("border", "border-border", "bg-white");
    button.setAttribute("aria-pressed", "true");

    selectedCategory = button.textContent.trim();

    filterRecipes();
  });
});

filterRecipes();