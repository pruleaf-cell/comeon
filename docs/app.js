const RECIPES = [
  {
    name: "Creamy Tomato Pasta",
    mealType: "Dinner",
    diet: "Contains dairy",
    description: "A comforting weeknight pasta using cupboard staples and a splash of cream.",
    ingredients: [
      "200g dried penne",
      "1 tbsp olive oil",
      "2 garlic cloves, minced",
      "400g chopped tomatoes (tin)",
      "75ml double cream",
      "1 tsp dried basil",
      "Salt and black pepper"
    ],
    method: [
      "Cook pasta in salted boiling water until al dente.",
      "Gently fry garlic in olive oil for 1 minute.",
      "Add chopped tomatoes and basil, then simmer for 8 minutes.",
      "Stir in cream, season, and toss with drained pasta."
    ]
  },
  {
    name: "Chickpea Jacket Potatoes",
    mealType: "Lunch",
    diet: "Vegan",
    description: "Baked potatoes topped with spiced chickpeas and lemony greens.",
    ingredients: [
      "2 large baking potatoes",
      "1 tbsp rapeseed oil",
      "400g chickpeas (tin), drained",
      "1 tsp ground cumin",
      "1 tsp smoked paprika",
      "2 handfuls spinach",
      "1/2 lemon, juiced"
    ],
    method: [
      "Bake potatoes at 200°C for about 50 minutes until fluffy inside.",
      "Warm oil in a pan, add chickpeas and spices, then cook for 5 minutes.",
      "Fold in spinach and lemon juice until wilted.",
      "Split potatoes and spoon over chickpea mixture."
    ]
  },
  {
    name: "Porridge with Apple & Cinnamon",
    mealType: "Breakfast",
    diet: "Vegetarian",
    description: "Hearty porridge made with oats and milk, topped with soft apple.",
    ingredients: [
      "100g porridge oats",
      "500ml semi-skimmed milk",
      "1 apple, diced",
      "1/2 tsp ground cinnamon",
      "1 tsp honey"
    ],
    method: [
      "Simmer oats and milk in a saucepan for 5-6 minutes, stirring.",
      "Microwave apple with cinnamon for 1 minute until softened.",
      "Serve porridge topped with apple and drizzle with honey."
    ]
  },
  {
    name: "Tuna Sweetcorn Toasties",
    mealType: "Snack",
    diet: "Contains fish",
    description: "Crisp toasties with a quick tuna and sweetcorn filling.",
    ingredients: [
      "1 tin tuna in spring water, drained",
      "100g sweetcorn",
      "2 tbsp mayonnaise",
      "4 slices wholemeal bread",
      "25g cheddar, grated",
      "Black pepper"
    ],
    method: [
      "Mix tuna, sweetcorn, mayonnaise and pepper.",
      "Spread between bread slices and sprinkle with cheddar.",
      "Toast in a sandwich press or grill until golden."
    ]
  },
  {
    name: "Sausage & Bean Traybake",
    mealType: "Dinner",
    diet: "Contains meat",
    description: "An easy one-tray meal with sausages, beans and root veg.",
    ingredients: [
      "6 pork sausages",
      "1 red onion, sliced",
      "2 carrots, chopped",
      "400g mixed beans (tin), drained",
      "2 tbsp tomato purée",
      "150ml vegetable stock",
      "1 tsp dried thyme"
    ],
    method: [
      "Roast sausages, onion and carrots at 200°C for 20 minutes.",
      "Mix beans, tomato purée, stock and thyme in a baking dish.",
      "Add roasted sausages and veg, then bake for 15 minutes more."
    ]
  }
];

const ingredientInput = document.getElementById("ingredientInput");
const mealTypeFilter = document.getElementById("mealTypeFilter");
const dietFilter = document.getElementById("dietFilter");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const recipeList = document.getElementById("recipeList");
const resultCount = document.getElementById("resultCount");
const template = document.getElementById("recipeCardTemplate");

const normalise = (value) => value.toLowerCase().trim();

function parseIngredients(value) {
  return value
    .split(",")
    .map(normalise)
    .filter(Boolean);
}

function filterRecipes() {
  const queryIngredients = parseIngredients(ingredientInput.value);
  const chosenMealType = mealTypeFilter.value;
  const chosenDiet = dietFilter.value;

  return RECIPES.filter((recipe) => {
    const mealMatch = chosenMealType === "all" || recipe.mealType === chosenMealType;
    const dietMatch = chosenDiet === "all" || recipe.diet === chosenDiet;

    const pantryText = normalise(recipe.ingredients.join(" "));
    const ingredientMatch = queryIngredients.every((ingredient) => pantryText.includes(ingredient));

    return mealMatch && dietMatch && ingredientMatch;
  });
}

function renderRecipes(recipes) {
  recipeList.innerHTML = "";
  resultCount.textContent = `${recipes.length} recipe${recipes.length === 1 ? "" : "s"}`;

  if (!recipes.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No matches found. Try fewer ingredients or a different filter.";
    recipeList.appendChild(empty);
    return;
  }

  recipes.forEach((recipe) => {
    const card = template.content.firstElementChild.cloneNode(true);
    card.querySelector(".recipe-meta").textContent = `${recipe.mealType} · ${recipe.diet}`;
    card.querySelector("h3").textContent = recipe.name;
    card.querySelector(".description").textContent = recipe.description;

    const ingredientsEl = card.querySelector(".ingredients");
    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      ingredientsEl.appendChild(li);
    });

    const methodEl = card.querySelector(".method");
    recipe.method.forEach((step) => {
      const li = document.createElement("li");
      li.textContent = step;
      methodEl.appendChild(li);
    });

    recipeList.appendChild(card);
  });
}

function resetFilters() {
  ingredientInput.value = "";
  mealTypeFilter.value = "all";
  dietFilter.value = "all";
  renderRecipes(RECIPES);
}

searchBtn.addEventListener("click", () => {
  renderRecipes(filterRecipes());
});

resetBtn.addEventListener("click", resetFilters);
ingredientInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    renderRecipes(filterRecipes());
  }
});

renderRecipes(RECIPES);
