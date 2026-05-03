declare module '*.module.css' {
  const classes: Record<string, string>
  export default classes
}

declare module '*.css' {
  const content: string
  export default content
}

declare module '../utils.js' {
  export function filterRecipes(recipes: any[], query: string, restrictions: string[], mealTimes: string[], maxTime: number | null): any[]
  export function calcNutri(nutri: any, portions: number): { proteina: number; carbs: number; gorduras: number; fibras: number }
  export function buildShoppingList(plan: any, recipes: any[]): Record<string, string>
  export function validateOnboarding(name: string, email: string): { valid: boolean; errors: Record<string, string> }
}
