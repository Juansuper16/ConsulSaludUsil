'use client'
import { useState } from 'react'
import { useApp } from '@/app/page'
import { Heart, Eye, EyeOff, ArrowLeft, AlertCircle, UserPlus, Check } from 'lucide-react'

const USERS = [
  { email: 'admin@hospital.pe',    password: 'admin123',    role: 'admin'    as const, name: 'Dra. Lucía Quispe' },
  { email: 'medico@hospital.pe',   password: 'medico123',   role: 'medico'   as const, name: 'Dr. Carlos Mendoza' },
  { email: 'paciente@hospital.pe', password: 'paciente123', role: 'paciente' as const, name: 'María García López' },
]

export default function LoginPage() {
  const { navigate } = useApp()
  const [mode, setMode]           = useState<'login' | 'register'>('login')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [showPw, setShowPw]       = useState(false)
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [registered, setRegistered] = useState(false)

  // Register fields
  const [regNombre, setRegNombre]   = useState('')
  const [regApellido, setRegApellido] = useState('')
  const [regDni, setRegDni]         = useState('')
  const [regTel, setRegTel]         = useState('')
  const [regEmail, setRegEmail]     = useState('')
  const [regPw, setRegPw]           = useState('')

  const handleLogin = async () => {
    setLoading(true); setError('')
    await new Promise(r => setTimeout(r, 900))
    const user = USERS.find(u => u.email === email && u.password === password)
    if (user) { navigate(user.role, user.role) }
    else { setError('Correo o contraseña incorrectos'); setLoading(false) }
  }

  const handleRegister = async () => {
    setError('')
    if (!regNombre || !regApellido || !regDni || !regEmail || !regPw) {
      setError('Por favor completa todos los campos obligatorios'); return
    }
    if (regDni.length !== 8 || !/^\d+$/.test(regDni)) {
      setError('El DNI debe tener exactamente 8 dígitos'); return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1100))
    setLoading(false)
    setRegistered(true)
  }

  const quickLogin = (u: typeof USERS[0]) => { setEmail(u.email); setPassword(u.password) }

  const features = ['Citas médicas en línea', 'Triaje inteligente', 'Historial clínico digital', 'Notificaciones automáticas']

  if (registered) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center', maxWidth: 420, padding: '2rem' }}>
        <div style={{ background: '#DCFCE7', borderRadius: '50%', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <Check size={40} color="#15803D" />
        </div>
        <h2 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.75rem' }}>¡Registro exitoso!</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '0.5rem' }}>Tu cuenta ha sido creada para <strong>{regNombre} {regApellido}</strong>.</p>
        <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>Puedes iniciar sesión con el acceso demo para explorar la plataforma.</p>
        <button className="btn-primary" style={{ justifyContent: 'center', width: '100%' }} onClick={() => { setMode('login'); setRegistered(false) }}>Ir al inicio de sesión</button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Left panel */}
      <div style={{ background: 'linear-gradient(145deg, #0EA5E9, #0369A1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.08) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 380 }}>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '1rem', padding: '1rem', display: 'inline-flex', marginBottom: '1.5rem' }}>
            <Heart size={40} color="white" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>ConsulSalud</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.65, fontSize: '0.95rem', marginBottom: '2.5rem' }}>
            Plataforma digital de atención hospitalaria del Hospital San José del Bicentenario
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {features.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '0.6rem 1rem' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#86EFAC', flexShrink: 0 }} />
                <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2.5rem 4rem', background: 'var(--bg)', overflowY: 'auto' }}>
        <button onClick={() => navigate('landing')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.85rem', marginBottom: '1.5rem', padding: 0 }}>
          <ArrowLeft size={16} /> Volver al inicio
        </button>

        {/* Mode toggle */}
        <div style={{ display: 'flex', background: 'var(--border)', borderRadius: '0.6rem', padding: '0.2rem', marginBottom: '1.75rem', maxWidth: 380, width: '100%' }}>
          {(['login', 'register'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setError('') }}
              style={{ flex: 1, padding: '0.5rem', borderRadius: '0.45rem', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.15s', background: mode === m ? 'white' : 'transparent', color: mode === m ? 'var(--sky)' : 'var(--muted)', boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
              {m === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: 380, width: '100%' }}>
          {mode === 'login' ? (
            <>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.4rem' }}>Bienvenido</h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Ingresa tus credenciales para continuar</p>

              <div style={{ marginBottom: '1.25rem' }}>
                <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Acceso rápido demo</p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {USERS.map(u => (
                    <button key={u.role} onClick={() => quickLogin(u)}
                      style={{ flex: 1, padding: '0.45rem 0.25rem', border: '1px solid var(--border)', borderRadius: '0.4rem', background: 'white', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, color: 'var(--sky)', transition: 'all 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--sky-light)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'white')}>
                      {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1rem', color: '#B91C1C', fontSize: '0.85rem' }}>
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <div style={{ marginBottom: '1rem' }}>
                <label>Correo electrónico</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="correo@hospital.pe" />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label>Contraseña</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                    onKeyDown={e => e.key === 'Enter' && handleLogin()} style={{ paddingRight: '2.75rem' }} />
                  <button onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex' }}>
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button className="btn-primary" onClick={handleLogin} disabled={loading}
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Verificando...' : 'Iniciar Sesión'}
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--muted)', marginTop: '1.25rem' }}>
                ¿Problemas de acceso? <span style={{ color: 'var(--sky)', cursor: 'pointer', fontWeight: 600 }}>Contactar soporte</span>
              </p>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.4rem' }}>Crear cuenta</h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Regístrate para acceder a la plataforma</p>

              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1rem', color: '#B91C1C', fontSize: '0.85rem' }}>
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div><label>Nombre *</label><input value={regNombre} onChange={e => setRegNombre(e.target.value)} placeholder="Juan" /></div>
                <div><label>Apellido *</label><input value={regApellido} onChange={e => setRegApellido(e.target.value)} placeholder="García" /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div><label>DNI *</label><input value={regDni} onChange={e => setRegDni(e.target.value)} placeholder="12345678" maxLength={8} /></div>
                <div><label>Teléfono</label><input value={regTel} onChange={e => setRegTel(e.target.value)} placeholder="987 654 321" /></div>
              </div>
              <div style={{ marginBottom: '0.75rem' }}><label>Correo electrónico *</label><input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="correo@ejemplo.com" /></div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label>Contraseña *</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPw ? 'text' : 'password'} value={regPw} onChange={e => setRegPw(e.target.value)} placeholder="Mínimo 6 caracteres" style={{ paddingRight: '2.75rem' }} />
                  <button onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex' }}>
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button className="btn-primary" onClick={handleRegister} disabled={loading}
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', opacity: loading ? 0.7 : 1 }}>
                <UserPlus size={16} />
                {loading ? 'Registrando...' : 'Crear Cuenta'}
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--muted)', marginTop: '1rem', lineHeight: 1.5 }}>
                Al registrarte aceptas los términos de uso y la política de privacidad del Hospital San José del Bicentenario.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
