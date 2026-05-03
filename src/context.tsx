import React, { createContext, useContext, useState } from 'react'
import { UserProfile, WeekPlan, INITIAL_PROFILE, INITIAL_PLAN } from './data'

interface AppContextType {
  profile: UserProfile
  setProfile: (p: UserProfile) => void
  plan: WeekPlan
  setPlan: (p: WeekPlan) => void
  onboarded: boolean
  setOnboarded: (v: boolean) => void
}

const AppContext = createContext<AppContextType | null>(null)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE)
  const [plan, setPlan] = useState<WeekPlan>(INITIAL_PLAN)
  const [onboarded, setOnboarded] = useState(false)

  return (
    <AppContext.Provider value={{ profile, setProfile, plan, setPlan, onboarded, setOnboarded }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
