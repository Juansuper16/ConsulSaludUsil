'use client'
import { useApp } from '@/app/page'
import { Heart, Calendar, Clock, Shield, Users, BarChart3, ChevronRight, Activity, Stethoscope, Phone } from 'lucide-react'

export default function LandingPage() {
  const { navigate } = useApp()

  const features = [
    { icon: Calendar, title: 'Citas Digitales', desc: 'Agenda tu cita médica en minutos desde cualquier dispositivo, sin colas ni esperas.' },
    { icon: Activity, title: 'Triaje Inteligente', desc: 'Sistema de clasificación automática que prioriza casos según urgencia médica.' },
    { icon: Stethoscope, title: 'Telemedicina', desc: 'Consultas por videollamada con especialistas desde la comodidad de tu hogar.' },
    { icon: Clock, title: 'Menos Espera', desc: 'Reducción de tiempos de espera mediante distribución inteligente de horarios.' },
    { icon: Shield, title: 'Datos Seguros', desc: 'Tu información médica protegida con los más altos estándares de seguridad.' },
    { icon: BarChart3, title: 'Panel Administrativo', desc: 'Métricas en tiempo real para una gestión hospitalaria eficiente.' },
  ]

  const stats = [
    { value: '2,400+', label: 'Pacientes Atendidos' },
    { value: '98%', label: 'Satisfacción' },
    { value: '45 min', label: 'Tiempo Ahorrado' },
    { value: '24/7', label: 'Disponibilidad' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Navbar */}
      <nav style={{ background: 'white', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ background: 'var(--sky)', borderRadius: '0.5rem', padding: '0.35rem', display: 'flex' }}>
              <Heart size={20} color="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)' }}>ConsulSalud</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--muted)', cursor: 'pointer' }}>Servicios</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--muted)', cursor: 'pointer' }}>Especialidades</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--muted)', cursor: 'pointer' }}>Contacto</span>
            <button className="btn-primary" onClick={() => navigate('login')}>Iniciar Sesión</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 50%, #0369A1 100%)', padding: '5rem 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 9999, padding: '0.35rem 0.875rem', marginBottom: '1.5rem' }}>
            <Activity size={14} color="white" />
            <span style={{ fontSize: '0.8rem', color: 'white', fontWeight: 600 }}>Hospital San José del Bicentenario</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            Atención médica moderna,<br />accesible para todos
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: '2rem', maxWidth: 540, margin: '0 auto 2rem' }}>
            Agenda citas, realiza triaje digital y consulta a especialistas desde cualquier lugar. Sin colas, sin esperas innecesarias.
          </p>
          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('login')} style={{ background: 'white', color: 'var(--sky-dark)', padding: '0.75rem 1.75rem', borderRadius: '0.6rem', border: 'none', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              Solicitar Cita <ChevronRight size={18} />
            </button>
            <button style={{ background: 'rgba(255,255,255,0.12)', color: 'white', padding: '0.75rem 1.75rem', borderRadius: '0.6rem', border: '1.5px solid rgba(255,255,255,0.35)', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}>
              Ver Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
          {stats.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--sky)' }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem' }}>Todo lo que necesitas</h2>
            <p style={{ color: 'var(--muted)', fontSize: '1rem' }}>Una plataforma completa para pacientes, médicos y administradores</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {features.map(f => (
              <div key={f.title} className="card" style={{ transition: 'box-shadow 0.2s, transform 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(14,165,233,0.12)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = ''; (e.currentTarget as HTMLElement).style.transform = '' }}>
                <div style={{ background: 'var(--sky-light)', borderRadius: '0.6rem', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <f.icon size={22} color="var(--sky)" />
                </div>
                <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--sky)', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>¿Listo para una atención más ágil?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem' }}>Únete a los miles de pacientes que ya gestionan su salud con ConsulSalud.</p>
          <button onClick={() => navigate('login')} style={{ background: 'white', color: 'var(--sky-dark)', padding: '0.875rem 2rem', borderRadius: '0.6rem', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Comenzar Ahora
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--text)', color: 'rgba(255,255,255,0.6)', padding: '2rem 1.5rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Heart size={16} color="var(--sky)" />
          <span style={{ color: 'white', fontWeight: 700 }}>ConsulSalud</span>
        </div>
        <p style={{ fontSize: '0.8rem' }}>Hospital San José del Bicentenario · Lima, Perú · © 2025</p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.75rem' }}>
          <Phone size={14} />
          <span style={{ fontSize: '0.8rem' }}>(01) 555-0100</span>
        </div>
      </footer>
    </div>
  )
}
