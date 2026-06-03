'use client'
import { useState, createContext, useContext } from 'react'
import LandingPage from '@/components/LandingPage'
import LoginPage from '@/components/LoginPage'
import AdminDashboard from '@/components/AdminDashboard'
import MedicoDashboard from '@/components/MedicoDashboard'
import PacienteDashboard from '@/components/PacienteDashboard'

export type UserRole = 'admin' | 'medico' | 'paciente' | null
export type AppView = 'landing' | 'login' | 'admin' | 'medico' | 'paciente'

export const AppContext = createContext<{
  view: AppView
  role: UserRole
  navigate: (v: AppView, r?: UserRole) => void
}>({ view: 'landing', role: null, navigate: () => {} })

export const useApp = () => useContext(AppContext)

export default function App() {
  const [view, setView] = useState<AppView>('landing')
  const [role, setRole] = useState<UserRole>(null)

  const navigate = (v: AppView, r?: UserRole) => {
    setView(v)
    if (r) setRole(r)
  }

  return (
    <AppContext.Provider value={{ view, role, navigate }}>
      {view === 'landing'  && <LandingPage />}
      {view === 'login'    && <LoginPage />}
      {view === 'admin'    && <AdminDashboard />}
      {view === 'medico'   && <MedicoDashboard />}
      {view === 'paciente' && <PacienteDashboard />}
    </AppContext.Provider>
  )
}
