import React, { useMemo, useState } from 'react'
import { useApp } from '../context'
import { RECIPES } from '../data'
import { buildShoppingList } from '../utils'
import styles from './ShoppingList.module.css'

interface ShopItem { name: string; qty: string; checked: boolean }

const CATEGORIES: Record<string, string[]> = {
  'Hortifrúti': ['Tomate cereja', 'Pepino', 'Couve-flor', 'Abacate maduro', 'Limão', 'Cenoura ralada', 'Salsa', 'Alho', 'Cebola', 'Tomate', 'Broto de feijão', 'Ervas frescas', 'Banana'],
  'Grãos e cereais': ['Quinoa', 'Lentilha cozida', 'Grão-de-bico cozido', 'Fubá fino', 'Macarrão de arroz', 'Pão integral'],
  'Temperos e óleos': ['Azeite extra virgem', 'Azeite', 'Curry em pó', 'Cúrcuma', 'Molho tamari', 'Sal e pimenta'],
  'Outros': ['Leite de coco', 'Azeitona preta', 'Tahine', 'Tofu firme', 'Amendoim torrado', 'Granola vegana', 'Açaí congelado', 'Leite de amêndoas'],
}

const CAT_COLORS: Record<string, string> = {
  'Hortifrúti': '#2a6b45',
  'Grãos e cereais': '#185fa5',
  'Temperos e óleos': '#854f0b',
  'Outros': '#993556',
}

export default function ShoppingList() {
  const { plan } = useApp()

  const rawItems: Record<string, string> = useMemo(() => buildShoppingList(plan, RECIPES), [plan])

  const [checked, setChecked] = useState<Set<string>>(new Set())

  const toggle = (name: string) => {
    setChecked(prev => {
      const n = new Set(prev)
      n.has(name) ? n.delete(name) : n.add(name)
      return n
    })
  }

  const total = Object.keys(rawItems).length
  const done = checked.size

  const getCat = (name: string) => {
    for (const [cat, items] of Object.entries(CATEGORIES)) {
      if (items.some(i => name.toLowerCase().includes(i.toLowerCase()) || i.toLowerCase().includes(name.toLowerCase()))) {
        return cat
      }
    }
    return 'Outros'
  }

  const grouped = Object.entries(rawItems).reduce<Record<string, ShopItem[]>>((acc, [name, qty]) => {
    const cat = getCat(name)
    if (!acc[cat]) acc[cat] = []
    acc[cat].push({ name, qty, checked: checked.has(name) })
    return acc
  }, {})

  if (total === 0) return (
    <div className={styles.empty}>
      <p className={styles.emptyText}>Seu plano semanal está vazio.</p>
      <p className={styles.emptyHint}>Adicione receitas no <a href="/planner">Plano Semanal</a> para gerar a lista.</p>
    </div>
  )

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Lista de compras</h1>
          <p className={styles.subtitle}>{total} itens · {done} marcados</p>
        </div>
        <button className={styles.clearBtn} onClick={() => setChecked(new Set())}>
          Limpar marcados
        </button>
      </div>

      {/* Progress */}
      <div className={styles.progressBg}>
        <div className={styles.progressFill} style={{ width: `${(done / total) * 100}%` }} />
      </div>

      <div className={styles.cols}>
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className={styles.catCard}>
            <div className={styles.catHeader}>
              <span className={styles.catDot} style={{ background: CAT_COLORS[cat] || '#999' }} />
              <span className={styles.catName}>{cat}</span>
            </div>
            {items.map(item => (
              <div
                key={item.name}
                className={`${styles.item} ${item.checked ? styles.itemDone : ''}`}
                onClick={() => toggle(item.name)}
              >
                <div className={`${styles.checkbox} ${item.checked ? styles.checkboxDone : ''}`}>
                  {item.checked && '✓'}
                </div>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemQty}>{item.qty}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
