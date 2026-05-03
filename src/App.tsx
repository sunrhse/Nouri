import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context'
import Layout from './components/Layout'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Search from './pages/Search'
import RecipeDetail from './pages/RecipeDetail'
import Planner from './pages/Planner'
import ShoppingList from './pages/ShoppingList'
import Profile from './pages/Profile'

function AppRoutes() {
  const { onboarded } = useApp()

  if (!onboarded) return <Onboarding />

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/shopping" element={<ShoppingList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}
