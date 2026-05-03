export function filterRecipes(
  recipes: any[],
  query: string,
  restrictions: string[],
  mealTimes: string[],
  maxTime: number | null
): any[]

export function calcNutri(
  nutri: { proteina: number; carbs: number; gorduras: number; fibras: number },
  portions: number
): { proteina: number; carbs: number; gorduras: number; fibras: number }

export function buildShoppingList(
  plan: Record<string, Record<string, string | null>>,
  recipes: any[]
): Record<string, string>

export function validateOnboarding(
  name: string,
  email: string
): { valid: boolean; errors: Record<string, string> }
