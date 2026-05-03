export function filterRecipes(recipes, query, restrictions, mealTimes, maxTime) {
  return recipes.filter((recipe) => {
    const matchesQuery =
      query === "" ||
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients.some((i) =>
        i.name.toLowerCase().includes(query.toLowerCase())
      );

    const matchesRestrictions =
      restrictions.length === 0 ||
      restrictions.every((r) => recipe.restrictions.includes(r));

    const matchesMealTime =
      mealTimes.length === 0 ||
      mealTimes.some((m) => recipe.mealTime.includes(m));

    const matchesTime = maxTime === null || recipe.time <= maxTime;

    return matchesQuery && matchesRestrictions && matchesMealTime && matchesTime;
  });
}

export function calcNutri(nutri, portions) {
  const scale = portions / 2;
  return {
    proteina: Math.round(nutri.proteina * scale),
    carbs: Math.round(nutri.carbs * scale),
    gorduras: Math.round(nutri.gorduras * scale),
    fibras: Math.round(nutri.fibras * scale),
  };
}

export function buildShoppingList(plan, recipes) {
  const recipeIds = new Set();

  Object.values(plan).forEach((day) => {
    Object.values(day).forEach((id) => {
      if (id) recipeIds.add(id);
    });
  });

  const items = {};

  recipeIds.forEach((id) => {
    const recipe = recipes.find((r) => r.id === id);
    if (!recipe) return;
    recipe.ingredients.forEach((ing) => {
      items[ing.name] = ing.qty;
    });
  });

  return items;
}

export function validateOnboarding(name, email) {
  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = "Nome deve ter pelo menos 2 caracteres.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Informe um email válido.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
