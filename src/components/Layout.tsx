import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Layout.module.css'

const NAV = [
  { path: '/', label: 'Início', emoji: '🏠' },
  { path: '/search', label: 'Buscar', emoji: '🔍' },
  { path: '/planner', label: 'Plano', emoji: '📅' },
  { path: '/shopping', label: 'Compras', emoji: '🛒' },
  { path: '/profile', label: 'Perfil', emoji: '👤' },
]

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  return (
    <div className={styles.root}>
      <header className={styles.topbar}>
        <button className={styles.logo} onClick={() => navigate('/')}>
          nouri<span>.</span>
        </button>
        <nav className={styles.topnav}>
          {NAV.map(n => (
            <NavLink
              key={n.path}
              to={n.path}
              end={n.path === '/'}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default Layout
