import React, { useState } from 'react'
import { useApp } from '../context'
import { RECIPES, MealTime } from '../data'
import RecipeCard from '../components/RecipeCard'
import styles from './Home.module.css'

const FILTERS: MealTime[] = ['Café da manhã', 'Almoço', 'Jantar', 'Lanche', 'Sobremesa']

export default function Home() {
  const { profile, setProfile } = useApp()
  const [filter, setFilter] = useState<MealTime | null>(null)

  const toggleSave = (id: string) => {
    const saved = profile.savedRecipes.includes(id)
      ? profile.savedRecipes.filter(x => x !== id)
      : [...profile.savedRecipes, id]
    setProfile({ ...profile, savedRecipes: saved })
  }

  const recommended = RECIPES.filter(r =>
    r.restrictions.some(res => profile.restrictions.includes(res)) &&
    (filter === null || r.mealTime.includes(filter))
  )

  const popular = RECIPES.filter(r =>
    !recommended.find(x => x.id === r.id) &&
    (filter === null || r.mealTime.includes(filter))
  )

  return (
    <div>
      {/* Hero */}
      <div className={styles.hero}>
        <div>
          <h1 className={styles.heroTitle}>Olá, {profile.name} 👋</h1>
          <p className={styles.heroSub}>Separamos receitas para o seu perfil</p>
        </div>
        <div className={styles.heroTags}>
          {profile.restrictions.map(r => (
            <span key={r} className={styles.heroTag}>{r}</span>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <button
          className={`${styles.chip} ${filter === null ? styles.chipOn : ''}`}
          onClick={() => setFilter(null)}
        >
          Todas
        </button>
        {FILTERS.map(f => (
          <button
            key={f}
            className={`${styles.chip} ${filter === f ? styles.chipOn : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Recommended */}
      {recommended.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Recomendadas para você</h2>
          <div className={styles.grid}>
            {recommended.map(r => (
              <RecipeCard
                key={r.id}
                recipe={r}
                saved={profile.savedRecipes.includes(r.id)}
                onSave={toggleSave}
              />
            ))}
          </div>
        </section>
      )}

      {/* Popular */}
      {popular.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Populares da semana</h2>
          <div className={styles.grid}>
            {popular.map(r => (
              <RecipeCard
                key={r.id}
                recipe={r}
                saved={profile.savedRecipes.includes(r.id)}
                onSave={toggleSave}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
