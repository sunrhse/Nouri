import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { RECIPES } from '../data'
import { useApp } from '../context'
import styles from './RecipeDetail.module.css'
import { calcNutri } from '../utils'

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { profile, setProfile, plan, setPlan } = useApp()
  const recipe = RECIPES.find(r => r.id === id)
  const [portions, setPortions] = useState(2)
  const [addedMsg, setAddedMsg] = useState(false)

  if (!recipe) return <p>Receita não encontrada.</p>

  const isSaved = profile.savedRecipes.includes(recipe.id)

  const toggleSave = () => {
    const saved = isSaved
      ? profile.savedRecipes.filter(x => x !== recipe.id)
      : [...profile.savedRecipes, recipe.id]
    setProfile({ ...profile, savedRecipes: saved })
  }

  const addToPlanner = () => {
    const newPlan = { ...plan }
    for (const day of Object.keys(newPlan)) {
      if (!newPlan[day].almoco) {
        newPlan[day] = { ...newPlan[day], almoco: recipe.id }
        setPlan(newPlan)
        setAddedMsg(true)
        setTimeout(() => setAddedMsg(false), 2000)
        return
      }
    }
    setAddedMsg(true)
    setTimeout(() => setAddedMsg(false), 2000)
  }

  const nutri = calcNutri(recipe.nutri, portions)

  return (
    <div className={styles.wrapper}>
      <button className={styles.back} onClick={() => navigate(-1)}>← Voltar</button>

      <div className={styles.card}>
        <div className={styles.hero}>
          <span className={styles.emoji}>{recipe.emoji}</span>
          <button
            className={`${styles.saveBtn} ${isSaved ? styles.saved : ''}`}
            onClick={toggleSave}
          >
            {isSaved ? '♥ Salva' : '♡ Salvar'}
          </button>
        </div>

        <div className={styles.body}>
          <h1 className={styles.title}>{recipe.name}</h1>

          <div className={styles.badges}>
            <span className={styles.badge}>⏱ {recipe.time} min</span>
            <span className={styles.badge}>🔥 {recipe.kcal} kcal</span>
            <span className={styles.badge}>👤 {recipe.difficulty}</span>
            {recipe.restrictions.map(r => (
              <span key={r} className={styles.tag}>{r}</span>
            ))}
          </div>

          {/* Portions */}
          <div className={styles.portionsRow}>
            <span className={styles.portionLabel}>Porções:</span>
            <button className={styles.portionBtn} onClick={() => setPortions(p => Math.max(1, p - 1))}>−</button>
            <span className={styles.portionVal}>{portions}</span>
            <button className={styles.portionBtn} onClick={() => setPortions(p => p + 1)}>+</button>
          </div>

          <div className={styles.twoCol}>
            {/* Ingredients */}
            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Ingredientes</h3>
              {recipe.ingredients.map(ing => (
                <div key={ing.name} className={styles.ingrRow}>
                  <span>{ing.name}</span>
                  <span className={styles.ingrQty}>{ing.qty}</span>
                </div>
              ))}
            </div>

            {/* Nutrition */}
            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Informação nutricional <small>(por porção)</small></h3>
              {[
                { label: 'Proteína', val: nutri.proteina, max: 50, unit: 'g' },
                { label: 'Carboidratos', val: nutri.carbs, max: 100, unit: 'g' },
                { label: 'Gorduras', val: nutri.gorduras, max: 70, unit: 'g' },
                { label: 'Fibras', val: nutri.fibras, max: 30, unit: 'g' },
              ].map(n => (
                <div key={n.label} className={styles.nutriRow}>
                  <div className={styles.nutriHeader}>
                    <span>{n.label}</span>
                    <span className={styles.nutriVal}>{n.val}{n.unit}</span>
                  </div>
                  <div className={styles.barBg}>
                    <div className={styles.barFill} style={{ width: `${Math.min(100, (n.val / n.max) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className={styles.block} style={{ marginTop: '1rem' }}>
            <h3 className={styles.blockTitle}>Modo de preparo</h3>
            {recipe.steps.map((step, i) => (
              <div key={i} className={styles.step}>
                <div className={styles.stepNum}>{i + 1}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>

          <button className={styles.ctaBtn} onClick={addToPlanner}>
            {addedMsg ? '✓ Adicionado ao plano!' : 'Adicionar ao plano semanal'}
          </button>
        </div>
      </div>
    </div>
  )
}
