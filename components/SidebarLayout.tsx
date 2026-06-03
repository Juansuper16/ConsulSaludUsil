'use client'
import { ReactNode } from 'react'
import { useApp, UserRole } from '@/app/page'
import { Heart, LogOut, Bell } from 'lucide-react'

interface SidebarLayoutProps {
  title: string
  role: UserRole
  userName: string
  navItems: { icon: React.ElementType; label: string; key: string }[]
  activeTab: string
  onTabChange: (k: string) => void
  children: ReactNode
}

export default function SidebarLayout({ title, role, userName, navItems, activeTab, onTabChange, children }: SidebarLayoutProps) {
  const { navigate } = useApp()

  const roleColors: Record<string, string> = {
    admin: '#8B5CF6', medico: '#0EA5E9', paciente: '#10B981'
  }
  const roleLabels: Record<string, string> = {
    admin: 'Administrador', medico: 'Médico', paciente: 'Paciente'
  }
  const color = roleColors[role || 'admin']

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: 'var(--text)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ background: 'var(--sky)', borderRadius: '0.4rem', padding: '0.3rem', display: 'flex' }}>
            <Heart size={18} color="white" />
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>ConsulSalud</div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>HSJB</div>
          </div>
        </div>

        {/* User info */}
        <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0 }}>
              {userName.charAt(0)}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: 'white', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userName}</div>
              <div style={{ background: color, borderRadius: 9999, padding: '0.1rem 0.4rem', display: 'inline-block', marginTop: '0.15rem' }}>
                <span style={{ color: 'white', fontSize: '0.6rem', fontWeight: 700 }}>{roleLabels[role || 'admin']}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0.75rem 0.5rem' }}>
          {navItems.map(item => {
            const active = activeTab === item.key
            return (
              <button key={item.key} onClick={() => onTabChange(item.key)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', marginBottom: '0.15rem', background: active ? color : 'transparent', color: active ? 'white' : 'rgba(255,255,255,0.55)', fontWeight: active ? 600 : 400, fontSize: '0.85rem', transition: 'all 0.15s', textAlign: 'left' }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)' }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
                <item.icon size={17} />
                {item.label}
              </button>
            )
          })}
        </nav>

        <button onClick={() => navigate('landing')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '1rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <LogOut size={17} /> Cerrar Sesión
        </button>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        {/* Topbar */}
        <header style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '0 1.5rem', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <h1 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>{title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button style={{ position: 'relative', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '0.5rem', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Bell size={16} color="var(--muted)" />
              <span style={{ position: 'absolute', top: 7, right: 7, width: 7, height: 7, background: 'var(--red)', borderRadius: '50%', border: '1.5px solid white' }} />
            </button>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{new Date().toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
          </div>
        </header>
        <main style={{ flex: 1, padding: '1.5rem', overflow: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
