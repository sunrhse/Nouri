import React, { useState } from 'react'
import { useApp } from '../context'
import { RECIPES, MealTime, Restriction } from '../data'
import RecipeCard from '../components/RecipeCard'
import { filterRecipes } from '../utils'
import styles from './Search.module.css'

const RESTRICTIONS: Restriction[] = ['Sem glúten', 'Sem lactose', 'Vegetariano', 'Vegano', 'Low carb', 'Sem frutos do mar']
const MEAL_TIMES: MealTime[] = ['Café da manhã', 'Almoço', 'Jantar', 'Lanche', 'Sobremesa']
const TIME_OPTIONS = [{ label: 'Até 15 min', max: 15 }, { label: 'Até 30 min', max: 30 }, { label: 'Até 1h', max: 60 }]

export default function Search() {
  const { profile, setProfile } = useApp()
  const [query, setQuery] = useState('')
  const [activeRestrictions, setActiveRestrictions] = useState<Restriction[]>([])
  const [activeMeals, setActiveMeals] = useState<MealTime[]>([])
  const [maxTime, setMaxTime] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const toggleR = (r: Restriction) =>
    setActiveRestrictions(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r])

  const toggleM = (m: MealTime) =>
    setActiveMeals(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])

  const toggleSave = (id: string) => {
    const saved = profile.savedRecipes.includes(id)
      ? profile.savedRecipes.filter(x => x !== id)
      : [...profile.savedRecipes, id]
    setProfile({ ...profile, savedRecipes: saved })
  }

  const results = filterRecipes(RECIPES, query, activeRestrictions, activeMeals, maxTime)

  return (
    <div>
      <div className={styles.searchRow}>
        <input
          className={styles.searchInput}
          placeholder="Buscar por nome ou ingrediente..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className={styles.filterToggle} onClick={() => setShowFilters(f => !f)}>
          Filtros {showFilters ? '▲' : '▼'}
        </button>
      </div>

      {showFilters && (
        <div className={styles.filterPanel}>
          <div className={styles.filterGroup}>
            <p className={styles.filterLabel}>Restrições</p>
            <div className={styles.tagRow}>
              {RESTRICTIONS.map(r => (
                <button
                  key={r}
                  className={`${styles.chip} ${activeRestrictions.includes(r) ? styles.chipOn : ''}`}
                  onClick={() => toggleR(r)}
                >{r}</button>
              ))}
            </div>
          </div>
          <div className={styles.filterGroup}>
            <p className={styles.filterLabel}>Refeição</p>
            <div className={styles.tagRow}>
              {MEAL_TIMES.map(m => (
                <button
                  key={m}
                  className={`${styles.chip} ${activeMeals.includes(m) ? styles.chipOn : ''}`}
                  onClick={() => toggleM(m)}
                >{m}</button>
              ))}
            </div>
          </div>
          <div className={styles.filterGroup}>
            <p className={styles.filterLabel}>Tempo</p>
            <div className={styles.tagRow}>
              {TIME_OPTIONS.map(t => (
                <button
                  key={t.max}
                  className={`${styles.chip} ${maxTime === t.max ? styles.chipOn : ''}`}
                  onClick={() => setMaxTime(maxTime === t.max ? null : t.max)}
                >{t.label}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className={styles.count}>{results.length} receita{results.length !== 1 ? 's' : ''} encontrada{results.length !== 1 ? 's' : ''}</p>

      <div className={styles.grid}>
        {results.map(r => (
          <RecipeCard
            key={r.id}
            recipe={r}
            saved={profile.savedRecipes.includes(r.id)}
            onSave={toggleSave}
          />
        ))}
        {results.length === 0 && (
          <p className={styles.empty}>Nenhuma receita encontrada. Tente outros filtros.</p>
        )}
      </div>
    </div>
  )
}
