import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context'
import { RECIPES, Goal, Restriction } from '../data'
import RecipeCard from '../components/RecipeCard'
import styles from './Profile.module.css'

const GOALS: Goal[] = ['Comer saudável', 'Perder peso', 'Ganhar massa', 'Dieta terapêutica', 'Explorar sabores']
const RESTRICTIONS: Restriction[] = ['Sem glúten', 'Sem lactose', 'Vegetariano', 'Vegano', 'Low carb', 'Sem frutos do mar']

export default function Profile() {
  const { profile, setProfile, setOnboarded } = useApp()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(profile.name)
  const [goal, setGoal] = useState<Goal>(profile.goal)
  const [restrictions, setRestrictions] = useState<Restriction[]>(profile.restrictions)

  const saved = RECIPES.filter(r => profile.savedRecipes.includes(r.id))

  const toggleR = (r: Restriction) =>
    setRestrictions(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r])

  const save = () => {
    setProfile({ ...profile, name, goal, restrictions })
    setEditing(false)
  }

  const toggleSave = (id: string) => {
    const savedIds = profile.savedRecipes.includes(id)
      ? profile.savedRecipes.filter(x => x !== id)
      : [...profile.savedRecipes, id]
    setProfile({ ...profile, savedRecipes: savedIds })
  }

  return (
    <div>
      {/* Header card */}
      <div className={styles.headerCard}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>
            {profile.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className={styles.profileName}>{profile.name}</p>
            <p className={styles.profileEmail}>{profile.email}</p>
            <div className={styles.tagRow}>
              {profile.restrictions.map(r => (
                <span key={r} className={styles.tag}>{r}</span>
              ))}
            </div>
          </div>
        </div>
        <button className={styles.editBtn} onClick={() => setEditing(e => !e)}>
          {editing ? 'Cancelar' : 'Editar'}
        </button>
      </div>

      {/* Edit form */}
      {editing && (
        <div className={styles.editCard}>
          <div className={styles.formRow}>
            <label className={styles.label}>Nome</label>
            <input
              className={styles.input}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Objetivo</label>
            <div className={styles.chipRow}>
              {GOALS.map(g => (
                <button
                  key={g}
                  className={`${styles.chip} ${goal === g ? styles.chipOn : ''}`}
                  onClick={() => setGoal(g)}
                >{g}</button>
              ))}
            </div>
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Restrições</label>
            <div className={styles.chipRow}>
              {RESTRICTIONS.map(r => (
                <button
                  key={r}
                  className={`${styles.chip} ${restrictions.includes(r) ? styles.chipOn : ''}`}
                  onClick={() => toggleR(r)}
                >{r}</button>
              ))}
            </div>
          </div>
          <button className={styles.saveBtn} onClick={save}>Salvar alterações</button>
        </div>
      )}

      {/* Stats */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{profile.savedRecipes.length}</span>
          <span className={styles.statLabel}>Receitas salvas</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>3</span>
          <span className={styles.statLabel}>Planos criados</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>12</span>
          <span className={styles.statLabel}>Compras feitas</span>
        </div>
      </div>

      {/* Saved recipes */}
      {saved.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Receitas favoritas</h2>
          <div className={styles.grid}>
            {saved.map(r => (
              <RecipeCard key={r.id} recipe={r} saved onSave={toggleSave} />
            ))}
          </div>
        </section>
      )}

      <button className={styles.logoutBtn} onClick={() => setOnboarded(false)}>
        Sair da conta
      </button>
    </div>
  )
}
