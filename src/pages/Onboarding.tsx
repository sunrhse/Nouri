import React, { useState } from 'react'
import { useApp } from '../context'
import { Goal, Restriction } from '../data'
import { validateOnboarding } from '../utils'
import styles from './Onboarding.module.css'

const GOALS: Goal[] = ['Comer saudável', 'Perder peso', 'Ganhar massa', 'Dieta terapêutica', 'Explorar sabores']
const RESTRICTIONS: Restriction[] = ['Sem glúten', 'Sem lactose', 'Vegetariano', 'Vegano', 'Low carb', 'Sem frutos do mar']

export default function Onboarding() {
  const { profile, setProfile, setOnboarded } = useApp()
  const [step, setStep] = useState(0)
  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [goal, setGoal] = useState<Goal>(profile.goal)
  const [restrictions, setRestrictions] = useState<Restriction[]>(profile.restrictions)

  const toggleRestriction = (r: Restriction) => {
    setRestrictions(prev =>
      prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]
    )
  }

  const finish = () => {
    setProfile({ ...profile, name, email, goal, restrictions })
    setOnboarded(true)
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logoWrap}>
          <span className={styles.logo}>nouri<span>.</span></span>
          <p className={styles.tagline}>comida que faz sentido pra você</p>
        </div>

        {/* Progress */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${((step + 1) / 3) * 100}%` }} />
        </div>
        <p className={styles.stepLabel}>Passo {step + 1} de 3</p>

        {step === 0 && (
          <div className={styles.stepContent}>
            <h2 className={styles.title}>Olá! Como você se chama?</h2>
            <p className={styles.sub}>Vamos personalizar tudo para você.</p>
            <div className={styles.formRow}>
              <label className={styles.label}>Seu nome</label>
              <input
                className={styles.input}
                value={name}
                onChange={e => { setName(e.target.value); setErrors({}) }}
                placeholder="Nome"
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
            <div className={styles.formRow}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors({}) }}
                placeholder="seu@email.com"
                type="email"
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className={styles.stepContent}>
            <h2 className={styles.title}>Qual é o seu objetivo?</h2>
            <p className={styles.sub}>Isso ajuda a recomendar receitas certeiras.</p>
            <div className={styles.tagGrid}>
              {GOALS.map(g => (
                <button
                  key={g}
                  className={`${styles.tagBtn} ${goal === g ? styles.tagOn : ''}`}
                  onClick={() => setGoal(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.stepContent}>
            <h2 className={styles.title}>Restrições alimentares?</h2>
            <p className={styles.sub}>Selecione tudo que se aplica. Pode mudar depois.</p>
            <div className={styles.tagGrid}>
              {RESTRICTIONS.map(r => (
                <button
                  key={r}
                  className={`${styles.tagBtn} ${restrictions.includes(r) ? styles.tagOn : ''}`}
                  onClick={() => toggleRestriction(r)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={styles.actions}>
          {step > 0 && (
            <button className={styles.btnBack} onClick={() => setStep(s => s - 1)}>
              Voltar
            </button>
          )}
          {step < 2 ? (
            <button className={styles.btnNext} onClick={() => {
              if (step === 0) {
                const { valid, errors: errs } = validateOnboarding(name, email)
                if (!valid) { setErrors(errs); return }
              }
              setStep(s => s + 1)
            }}>
              Próximo →
            </button>
          ) : (
            <button className={styles.btnNext} onClick={finish}>
              Começar 🌿
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
