import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Recipe } from '../data'
import styles from './RecipeCard.module.css'

interface Props {
  recipe: Recipe
  saved?: boolean
  onSave?: (id: string) => void
}

const RecipeCard: React.FC<Props> = ({ recipe, saved, onSave }) => {
  const navigate = useNavigate()
  return (
    <div className={styles.card} onClick={() => navigate(`/recipe/${recipe.id}`)}>
      <div className={styles.img}>
        <span className={styles.emoji}>{recipe.emoji}</span>
        {onSave && (
          <button
            className={`${styles.saveBtn} ${saved ? styles.saved : ''}`}
            onClick={e => { e.stopPropagation(); onSave(recipe.id) }}
          >
            {saved ? '♥' : '♡'}
          </button>
        )}
      </div>
      <div className={styles.body}>
        <p className={styles.name}>{recipe.name}</p>
        <p className={styles.meta}>{recipe.time} min · {recipe.kcal} kcal</p>
        <div className={styles.tags}>
          {recipe.restrictions.slice(0, 2).map(r => (
            <span key={r} className={styles.tag}>{r}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
