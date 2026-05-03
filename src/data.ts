// ── Types ──────────────────────────────────────────────────────────────────

export type MealTime = 'Café da manhã' | 'Almoço' | 'Jantar' | 'Lanche' | 'Sobremesa'
export type Restriction = 'Sem glúten' | 'Sem lactose' | 'Vegetariano' | 'Vegano' | 'Low carb' | 'Sem frutos do mar'
export type Goal = 'Comer saudável' | 'Perder peso' | 'Ganhar massa' | 'Dieta terapêutica' | 'Explorar sabores'

export interface NutriInfo {
  proteina: number
  carbs: number
  gorduras: number
  fibras: number
}

export interface Recipe {
  id: string
  emoji: string
  name: string
  time: number
  kcal: number
  difficulty: 'Fácil' | 'Médio' | 'Difícil'
  mealTime: MealTime[]
  restrictions: Restriction[]
  ingredients: { name: string; qty: string }[]
  steps: string[]
  nutri: NutriInfo
}

export interface WeekPlan {
  [day: string]: {
    manha: string | null
    almoco: string | null
    jantar: string | null
  }
}

export interface UserProfile {
  name: string
  email: string
  goal: Goal
  restrictions: Restriction[]
  savedRecipes: string[]
}

// ── Mock data ──────────────────────────────────────────────────────────────

export const RECIPES: Recipe[] = [
  {
    id: '1',
    emoji: '🥗',
    name: 'Bowl de quinoa mediterrâneo',
    time: 20,
    kcal: 380,
    difficulty: 'Fácil',
    mealTime: ['Almoço', 'Jantar'],
    restrictions: ['Vegano', 'Sem glúten'],
    ingredients: [
      { name: 'Quinoa', qty: '1 xíc.' },
      { name: 'Tomate cereja', qty: '150 g' },
      { name: 'Pepino', qty: '½ uni' },
      { name: 'Azeitona preta', qty: '50 g' },
      { name: 'Azeite extra virgem', qty: '2 c.s.' },
    ],
    steps: [
      'Cozinhe a quinoa em água fervente com sal por 15 minutos.',
      'Corte os legumes em pedaços médios.',
      'Monte o bowl com a quinoa na base, legumes por cima.',
      'Finalize com azeite e temperos a gosto.',
    ],
    nutri: { proteina: 14, carbs: 48, gorduras: 12, fibras: 6 },
  },
  {
    id: '2',
    emoji: '🍜',
    name: 'Pad thai vegano',
    time: 35,
    kcal: 520,
    difficulty: 'Médio',
    mealTime: ['Almoço', 'Jantar'],
    restrictions: ['Vegano', 'Sem glúten'],
    ingredients: [
      { name: 'Macarrão de arroz', qty: '200 g' },
      { name: 'Tofu firme', qty: '150 g' },
      { name: 'Broto de feijão', qty: '100 g' },
      { name: 'Amendoim torrado', qty: '50 g' },
      { name: 'Molho tamari', qty: '3 c.s.' },
    ],
    steps: [
      'Deixe o macarrão de molho em água morna por 10 minutos.',
      'Frite o tofu em cubos até dourar.',
      'Adicione o macarrão escorrido e o molho.',
      'Finalize com broto, amendoim e limão.',
    ],
    nutri: { proteina: 22, carbs: 68, gorduras: 16, fibras: 5 },
  },
  {
    id: '3',
    emoji: '🥑',
    name: 'Tostada de abacate',
    time: 10,
    kcal: 290,
    difficulty: 'Fácil',
    mealTime: ['Café da manhã', 'Lanche'],
    restrictions: ['Vegano', 'Sem lactose'],
    ingredients: [
      { name: 'Pão integral', qty: '2 fatias' },
      { name: 'Abacate maduro', qty: '1 uni' },
      { name: 'Limão', qty: '½ uni' },
      { name: 'Sal e pimenta', qty: 'a gosto' },
    ],
    steps: [
      'Torre o pão.',
      'Amasse o abacate com suco de limão, sal e pimenta.',
      'Espalhe sobre as torradas e sirva imediatamente.',
    ],
    nutri: { proteina: 6, carbs: 30, gorduras: 18, fibras: 8 },
  },
  {
    id: '4',
    emoji: '🍛',
    name: 'Curry de grão-de-bico',
    time: 40,
    kcal: 460,
    difficulty: 'Médio',
    mealTime: ['Almoço', 'Jantar'],
    restrictions: ['Vegano', 'Sem glúten', 'Low carb'],
    ingredients: [
      { name: 'Grão-de-bico cozido', qty: '400 g' },
      { name: 'Leite de coco', qty: '200 ml' },
      { name: 'Curry em pó', qty: '2 c.s.' },
      { name: 'Tomate', qty: '2 uni' },
      { name: 'Cebola', qty: '1 uni' },
    ],
    steps: [
      'Refogue a cebola e alho até dourar.',
      'Adicione o curry e tomate, cozinhe 5 min.',
      'Junte o grão-de-bico e o leite de coco.',
      'Cozinhe em fogo médio por 20 minutos.',
    ],
    nutri: { proteina: 18, carbs: 52, gorduras: 14, fibras: 12 },
  },
  {
    id: '5',
    emoji: '🍨',
    name: 'Smoothie bowl',
    time: 5,
    kcal: 210,
    difficulty: 'Fácil',
    mealTime: ['Café da manhã'],
    restrictions: ['Vegano', 'Sem glúten', 'Sem lactose'],
    ingredients: [
      { name: 'Açaí congelado', qty: '200 g' },
      { name: 'Banana', qty: '1 uni' },
      { name: 'Leite de amêndoas', qty: '100 ml' },
      { name: 'Granola vegana', qty: '3 c.s.' },
    ],
    steps: [
      'Bata açaí, banana e leite de amêndoas no liquidificador.',
      'Despeje em bowl e decore com granola e frutas.',
    ],
    nutri: { proteina: 4, carbs: 40, gorduras: 6, fibras: 5 },
  },
  {
    id: '6',
    emoji: '🥦',
    name: 'Arroz de couve-flor',
    time: 25,
    kcal: 310,
    difficulty: 'Fácil',
    mealTime: ['Almoço', 'Jantar'],
    restrictions: ['Vegano', 'Sem glúten', 'Low carb'],
    ingredients: [
      { name: 'Couve-flor', qty: '1 uni' },
      { name: 'Alho', qty: '3 dentes' },
      { name: 'Azeite', qty: '2 c.s.' },
      { name: 'Ervas frescas', qty: 'a gosto' },
    ],
    steps: [
      'Processe a couve-flor até virar "arroz".',
      'Refogue o alho no azeite.',
      'Adicione a couve-flor e refogue por 8 minutos.',
      'Tempere com ervas e sirva.',
    ],
    nutri: { proteina: 8, carbs: 22, gorduras: 10, fibras: 7 },
  },
  {
    id: '7',
    emoji: '🥗',
    name: 'Salada de lentilha',
    time: 25,
    kcal: 340,
    difficulty: 'Fácil',
    mealTime: ['Almoço'],
    restrictions: ['Vegano', 'Sem glúten', 'Sem lactose'],
    ingredients: [
      { name: 'Lentilha cozida', qty: '300 g' },
      { name: 'Cenoura ralada', qty: '1 uni' },
      { name: 'Salsa', qty: '½ maço' },
      { name: 'Limão', qty: '1 uni' },
      { name: 'Azeite', qty: '2 c.s.' },
    ],
    steps: [
      'Cozinhe a lentilha até ficar al dente.',
      'Misture com os demais ingredientes.',
      'Tempere com azeite e limão. Sirva fria.',
    ],
    nutri: { proteina: 16, carbs: 44, gorduras: 8, fibras: 10 },
  },
  {
    id: '8',
    emoji: '🌽',
    name: 'Polenta cremosa',
    time: 20,
    kcal: 360,
    difficulty: 'Fácil',
    mealTime: ['Almoço', 'Jantar'],
    restrictions: ['Vegano', 'Sem glúten'],
    ingredients: [
      { name: 'Fubá fino', qty: '1 xíc.' },
      { name: 'Leite de coco', qty: '200 ml' },
      { name: 'Água', qty: '3 xíc.' },
      { name: 'Sal e pimenta', qty: 'a gosto' },
    ],
    steps: [
      'Ferva a água com sal.',
      'Adicione o fubá aos poucos mexendo sempre.',
      'Junte o leite de coco e cozinhe mais 10 min.',
    ],
    nutri: { proteina: 6, carbs: 58, gorduras: 10, fibras: 3 },
  },
]

export const DAYS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM']

export const INITIAL_PLAN: WeekPlan = {
  SEG: { manha: '5', almoco: '1', jantar: '4' },
  TER: { manha: null, almoco: null, jantar: '2' },
  QUA: { manha: null, almoco: '7', jantar: null },
  QUI: { manha: '5', almoco: '8', jantar: null },
  SEX: { manha: null, almoco: '7', jantar: '6' },
  SÁB: { manha: '3', almoco: null, jantar: null },
  DOM: { manha: null, almoco: '1', jantar: '4' },
}

export const INITIAL_PROFILE: UserProfile = {
  name: 'Isa',
  email: 'isa@email.com',
  goal: 'Comer saudável',
  restrictions: ['Vegano', 'Sem glúten'],
  savedRecipes: ['1', '4', '5'],
}
