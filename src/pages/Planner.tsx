import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context'
import { RECIPES, DAYS } from '../data'
import styles from './Planner.module.css'

type MealSlot = 'manha' | 'almoco' | 'jantar'
const SLOTS: { key: MealSlot; label: string }[] = [
  { key: 'manha', label: 'Manhã' },
  { key: 'almoco', label: 'Almoço' },
  { key: 'jantar', label: 'Jantar' },
]

export default function Planner() {
  const { plan, setPlan } = useApp()
  const navigate = useNavigate()
  const [picking, setPicking] = useState<{ day: string; slot: MealSlot } | null>(null)

  const getRecipe = (id: string | null) => RECIPES.find(r => r.id === id)

  const assign = (recipeId: string) => {
    if (!picking) return
    setPlan({
      ...plan,
      [picking.day]: { ...plan[picking.day], [picking.slot]: recipeId },
    })
    setPicking(null)
  }

  const remove = (day: string, slot: MealSlot) => {
    setPlan({ ...plan, [day]: { ...plan[day], [slot]: null } })
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Plano semanal</h1>
        <button className={styles.ctaBtn} onClick={() => navigate('/shopping')}>
          🛒 Gerar lista de compras
        </button>
      </div>

      <div className={styles.grid}>
        {DAYS.map(day => (
          <div key={day} className={styles.dayCol}>
            <div className={styles.dayLabel}>{day}</div>
            {SLOTS.map(slot => {
              const recipe = getRecipe(plan[day]?.[slot.key] ?? null)
              const isActive = picking?.day === day && picking?.slot === slot.key
              return (
                <div key={slot.key} className={styles.slotWrap}>
                  <p className={styles.slotLabel}>{slot.label}</p>
                  {recipe ? (
                    <div
                      className={styles.slotFilled}
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                    >
                      <span className={styles.slotEmoji}>{recipe.emoji}</span>
                      <span className={styles.slotName}>{recipe.name}</span>
                      <button
                        className={styles.removeBtn}
                        onClick={e => { e.stopPropagation(); remove(day, slot.key) }}
                      >×</button>
                    </div>
                  ) : (
                    <button
                      className={`${styles.slotEmpty} ${isActive ? styles.slotEmptyActive : ''}`}
                      onClick={() => setPicking(isActive ? null : { day, slot: slot.key })}
                    >
                      {isActive ? '× cancelar' : '+ add'}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Recipe picker */}
      {picking && (
        <div className={styles.pickerPanel}>
          <p className={styles.pickerTitle}>
            Escolha uma receita para {picking.day} — {SLOTS.find(s => s.key === picking.slot)?.label}
          </p>
          <div className={styles.pickerGrid}>
            {RECIPES.map(r => (
              <button key={r.id} className={styles.pickerCard} onClick={() => assign(r.id)}>
                <span>{r.emoji}</span>
                <span>{r.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
