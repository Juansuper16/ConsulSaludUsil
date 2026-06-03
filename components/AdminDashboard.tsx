'use client'
import { useState } from 'react'
import SidebarLayout from './SidebarLayout'
import { LayoutDashboard, Users, Stethoscope, Calendar, BarChart3, Settings, Plus, Search, Trash2, Check, X, TrendingUp, Clock, Activity, Edit2, ToggleLeft, ToggleRight, Bell, Shield, Globe } from 'lucide-react'

const nav = [
  { icon: LayoutDashboard, label: 'Dashboard',      key: 'dashboard' },
  { icon: Users,           label: 'Pacientes',       key: 'pacientes' },
  { icon: Stethoscope,     label: 'Médicos',         key: 'medicos' },
  { icon: Calendar,        label: 'Citas',           key: 'citas' },
  { icon: Activity,        label: 'Especialidades',  key: 'especialidades' },
  { icon: BarChart3,       label: 'Métricas',        key: 'metricas' },
  { icon: Settings,        label: 'Configuración',   key: 'config' },
]

const MEDICOS_INIT = [
  { id: 1, nombre: 'Dr. Carlos Mendoza',    especialidad: 'Cardiología',       cmp: 'CMP-12345', estado: 'Activo',   citas: 8  },
  { id: 2, nombre: 'Dra. Ana Villanueva',   especialidad: 'Medicina General',  cmp: 'CMP-23456', estado: 'Activo',   citas: 12 },
  { id: 3, nombre: 'Dr. Miguel Ríos',       especialidad: 'Pediatría',         cmp: 'CMP-34567', estado: 'Activo',   citas: 6  },
  { id: 4, nombre: 'Dra. Rosa Flores',      especialidad: 'Traumatología',     cmp: 'CMP-45678', estado: 'Inactivo', citas: 0  },
  { id: 5, nombre: 'Dr. Jorge Paredes',     especialidad: 'Neurología',        cmp: 'CMP-56789', estado: 'Activo',   citas: 5  },
]

const CITAS_DATA = [
  { id: 1, paciente: 'María García López',  medico: 'Dr. Carlos Mendoza',   hora: '08:00', especialidad: 'Cardiología',      estado: 'Confirmada',  prioridad: 'alta'    },
  { id: 2, paciente: 'José Mamani Quispe',  medico: 'Dra. Ana Villanueva',  hora: '08:30', especialidad: 'Medicina General', estado: 'En espera',   prioridad: 'media'   },
  { id: 3, paciente: 'Rosa Condori Apaza',  medico: 'Dr. Miguel Ríos',      hora: '09:00', especialidad: 'Pediatría',        estado: 'Confirmada',  prioridad: 'baja'    },
  { id: 4, paciente: 'Luis Huanca Torres',  medico: 'Dr. Jorge Paredes',    hora: '09:30', especialidad: 'Neurología',       estado: 'Confirmada',  prioridad: 'critica' },
  { id: 5, paciente: 'Carmen Zárate Vega',  medico: 'Dra. Ana Villanueva',  hora: '10:00', especialidad: 'Medicina General', estado: 'Cancelada',   prioridad: 'baja'    },
  { id: 6, paciente: 'Pedro Cáceres Lima',  medico: 'Dr. Carlos Mendoza',   hora: '10:30', especialidad: 'Cardiología',      estado: 'Confirmada',  prioridad: 'media'   },
]

const PACIENTES_DATA = [
  { id: 1, nombre: 'María García López',  dni: '12345678', edad: 42, telefono: '987-654-321', ultima: '2025-05-28', estado: 'Activo'   },
  { id: 2, nombre: 'José Mamani Quispe',  dni: '23456789', edad: 67, telefono: '987-111-222', ultima: '2025-05-20', estado: 'Activo'   },
  { id: 3, nombre: 'Rosa Condori Apaza',  dni: '34567890', edad: 35, telefono: '987-333-444', ultima: '2025-05-15', estado: 'Activo'   },
  { id: 4, nombre: 'Luis Huanca Torres',  dni: '45678901', edad: 55, telefono: '987-555-666', ultima: '2025-06-01', estado: 'Activo'   },
  { id: 5, nombre: 'Carmen Zárate Vega',  dni: '56789012', edad: 28, telefono: '987-777-888', ultima: '2025-04-10', estado: 'Inactivo' },
]

const ESPECIALIDADES_INIT = [
  { id: 1, nombre: 'Medicina General',  descripcion: 'Atención primaria y consultas generales',          medicos: 2, activa: true  },
  { id: 2, nombre: 'Cardiología',       descripcion: 'Enfermedades del corazón y sistema cardiovascular', medicos: 2, activa: true  },
  { id: 3, nombre: 'Pediatría',         descripcion: 'Atención médica para niños y adolescentes',         medicos: 1, activa: true  },
  { id: 4, nombre: 'Neurología',        descripcion: 'Enfermedades del sistema nervioso',                 medicos: 1, activa: true  },
  { id: 5, nombre: 'Traumatología',     descripcion: 'Lesiones y enfermedades del aparato locomotor',    medicos: 1, activa: false },
  { id: 6, nombre: 'Ginecología',       descripcion: 'Salud reproductiva femenina',                      medicos: 0, activa: true  },
]

function StatCard({ value, label, sub, color, icon: Icon }: { value: string; label: string; sub: string; color: string; icon: React.ElementType }) {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{label}</p>
        <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>{value}</p>
        <p style={{ fontSize: '0.75rem', color: color, fontWeight: 600, marginTop: '0.3rem' }}>{sub}</p>
      </div>
      <div style={{ background: `${color}18`, borderRadius: '0.6rem', padding: '0.6rem', display: 'flex' }}>
        <Icon size={22} color={color} />
      </div>
    </div>
  )
}

function TabDashboard() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <StatCard value="247"  label="Pacientes Hoy"    sub="↑ 12% vs ayer"       color="#0EA5E9" icon={Users}      />
        <StatCard value="38"   label="Citas Pendientes" sub="6 críticas"           color="#F59E0B" icon={Clock}      />
        <StatCard value="12"   label="Médicos Activos"  sub="2 en consulta"        color="#10B981" icon={Stethoscope}/>
        <StatCard value="94%"  label="Ocupación"        sub="↑ vs semana anterior" color="#8B5CF6" icon={TrendingUp} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem' }}>Citas por día (semana actual)</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: 120 }}>
            {[{ d:'L',v:70},{d:'M',v:85},{d:'X',v:65},{d:'J',v:90},{d:'V',v:80},{d:'S',v:40},{d:'D',v:20}].map(b => (
              <div key={b.d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                <div style={{ width: '100%', background: '#E0F2FE', borderRadius: '0.25rem', display: 'flex', alignItems: 'flex-end', height: 90 }}>
                  <div style={{ width: '100%', background: 'var(--sky)', borderRadius: '0.25rem', height: `${b.v}%`, transition: 'height 0.3s' }} />
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 500 }}>{b.d}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem' }}>Especialidades más demandadas</h3>
          {[{name:'Med. General',pct:35,color:'#0EA5E9'},{name:'Cardiología',pct:22,color:'#8B5CF6'},{name:'Pediatría',pct:18,color:'#10B981'},{name:'Neurología',pct:15,color:'#F59E0B'},{name:'Traumatología',pct:10,color:'#EF4444'}].map(e => (
            <div key={e.name} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{e.name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{e.pct}%</span>
              </div>
              <div style={{ height: 6, background: '#F1F5F9', borderRadius: 9999 }}>
                <div style={{ height: '100%', width: `${e.pct}%`, background: e.color, borderRadius: 9999 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem' }}>Citas de Hoy</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead><tr style={{ borderBottom: '1px solid var(--border)' }}>
            {['Hora','Paciente','Médico','Especialidad','Prioridad','Estado'].map(h => (
              <th key={h} style={{ padding: '0.5rem 0.75rem', textAlign: 'left', fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{CITAS_DATA.map(c => (
            <tr key={c.id} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.6rem 0.75rem', fontWeight: 600 }}>{c.hora}</td>
              <td style={{ padding: '0.6rem 0.75rem' }}>{c.paciente}</td>
              <td style={{ padding: '0.6rem 0.75rem', color: 'var(--muted)' }}>{c.medico}</td>
              <td style={{ padding: '0.6rem 0.75rem' }}>{c.especialidad}</td>
              <td style={{ padding: '0.6rem 0.75rem' }}><span className={`badge badge-${c.prioridad}`}>{c.prioridad.charAt(0).toUpperCase()+c.prioridad.slice(1)}</span></td>
              <td style={{ padding: '0.6rem 0.75rem' }}><span className={`badge ${c.estado==='Confirmada'?'badge-success':c.estado==='Cancelada'?'badge-cancel':'badge-pending'}`}>{c.estado}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}

function TabMedicos() {
  const [medicos, setMedicos] = useState(MEDICOS_INIT)
  const [search, setSearch]   = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm]       = useState({ nombre: '', especialidad: '', cmp: '' })
  const filtered = medicos.filter(m => m.nombre.toLowerCase().includes(search.toLowerCase()) || m.especialidad.toLowerCase().includes(search.toLowerCase()))
  const addMedico = () => {
    if (!form.nombre || !form.especialidad || !form.cmp) return
    setMedicos(prev => [...prev, { id: prev.length + 1, ...form, estado: 'Activo', citas: 0 }])
    setForm({ nombre: '', especialidad: '', cmp: '' }); setShowForm(false)
  }
  const toggleEstado = (id: number) => setMedicos(prev => prev.map(m => m.id === id ? { ...m, estado: m.estado==='Activo'?'Inactivo':'Activo' } : m))
  const remove = (id: number) => setMedicos(prev => prev.filter(m => m.id !== id))
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 340 }}>
          <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar médico..." style={{ paddingLeft: '2.25rem' }} />
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}><Plus size={16} /> Nuevo Médico</button>
      </div>
      {showForm && (
        <div className="card" style={{ marginBottom: '1rem', background: 'var(--sky-light)', border: '1px solid #BAE6FD' }}>
          <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--sky-dark)' }}>Registrar Médico</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div><label>Nombre completo</label><input value={form.nombre} onChange={e => setForm(p=>({...p,nombre:e.target.value}))} placeholder="Dr. Nombre Apellido" /></div>
            <div><label>Especialidad</label><select value={form.especialidad} onChange={e => setForm(p=>({...p,especialidad:e.target.value}))}><option value="">Seleccionar...</option>{['Medicina General','Cardiología','Pediatría','Neurología','Traumatología','Ginecología'].map(e=><option key={e}>{e}</option>)}</select></div>
            <div><label>Código CMP</label><input value={form.cmp} onChange={e => setForm(p=>({...p,cmp:e.target.value}))} placeholder="CMP-00000" /></div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-primary" onClick={addMedico}><Check size={15} /> Guardar</button>
            <button className="btn-secondary" onClick={() => setShowForm(false)}><X size={15} /> Cancelar</button>
          </div>
        </div>
      )}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead style={{ background: 'var(--bg)' }}>
            <tr>{['Médico','Especialidad','CMP','Citas Hoy','Estado','Acciones'].map(h=><th key={h} style={{ padding:'0.75rem 1rem',textAlign:'left',fontSize:'0.7rem',color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em' }}>{h}</th>)}</tr>
          </thead>
          <tbody>{filtered.map(m=>(
            <tr key={m.id} style={{ borderTop: '1px solid var(--border)' }}>
              <td style={{ padding:'0.75rem 1rem',fontWeight:600 }}>{m.nombre}</td>
              <td style={{ padding:'0.75rem 1rem',color:'var(--muted)' }}>{m.especialidad}</td>
              <td style={{ padding:'0.75rem 1rem',fontFamily:'monospace',fontSize:'0.8rem' }}>{m.cmp}</td>
              <td style={{ padding:'0.75rem 1rem' }}><span style={{ background:'var(--sky-light)',color:'var(--sky-dark)',padding:'0.2rem 0.5rem',borderRadius:9999,fontSize:'0.75rem',fontWeight:600 }}>{m.citas}</span></td>
              <td style={{ padding:'0.75rem 1rem' }}><span className={`badge ${m.estado==='Activo'?'badge-success':'badge-cancel'}`}>{m.estado}</span></td>
              <td style={{ padding:'0.75rem 1rem' }}>
                <div style={{ display:'flex',gap:'0.4rem' }}>
                  <button onClick={()=>toggleEstado(m.id)} style={{ padding:'0.3rem 0.6rem',borderRadius:'0.4rem',border:'1px solid var(--border)',background:'white',cursor:'pointer',fontSize:'0.75rem',color:'var(--muted)' }}>{m.estado==='Activo'?'Desactivar':'Activar'}</button>
                  <button onClick={()=>remove(m.id)} style={{ padding:'0.35rem',borderRadius:'0.4rem',border:'1px solid #FECACA',background:'#FEF2F2',cursor:'pointer',display:'flex',color:'#EF4444' }}><Trash2 size={14} /></button>
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}

function TabPacientes() {
  const [search, setSearch] = useState('')
  const filtered = PACIENTES_DATA.filter(p => p.nombre.toLowerCase().includes(search.toLowerCase()) || p.dni.includes(search))
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 340 }}>
          <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nombre o DNI..." style={{ paddingLeft: '2.25rem' }} />
        </div>
        <button className="btn-primary"><Plus size={16} /> Nuevo Paciente</button>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead style={{ background: 'var(--bg)' }}>
            <tr>{['Paciente','DNI','Edad','Teléfono','Última Cita','Estado'].map(h=><th key={h} style={{ padding:'0.75rem 1rem',textAlign:'left',fontSize:'0.7rem',color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em' }}>{h}</th>)}</tr>
          </thead>
          <tbody>{filtered.map(p=>(
            <tr key={p.id} style={{ borderTop: '1px solid var(--border)' }}>
              <td style={{ padding:'0.75rem 1rem',fontWeight:600 }}>{p.nombre}</td>
              <td style={{ padding:'0.75rem 1rem',fontFamily:'monospace',fontSize:'0.8rem' }}>{p.dni}</td>
              <td style={{ padding:'0.75rem 1rem' }}>{p.edad} años</td>
              <td style={{ padding:'0.75rem 1rem',color:'var(--muted)' }}>{p.telefono}</td>
              <td style={{ padding:'0.75rem 1rem',color:'var(--muted)' }}>{p.ultima}</td>
              <td style={{ padding:'0.75rem 1rem' }}><span className={`badge ${p.estado==='Activo'?'badge-success':'badge-cancel'}`}>{p.estado}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}

function TabEspecialidades() {
  const [especialidades, setEspecialidades] = useState(ESPECIALIDADES_INIT)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId]     = useState<number | null>(null)
  const [form, setForm]         = useState({ nombre: '', descripcion: '' })

  const saveForm = () => {
    if (!form.nombre) return
    if (editId !== null) {
      setEspecialidades(prev => prev.map(e => e.id === editId ? { ...e, ...form } : e))
      setEditId(null)
    } else {
      setEspecialidades(prev => [...prev, { id: prev.length + 1, ...form, medicos: 0, activa: true }])
    }
    setForm({ nombre: '', descripcion: '' }); setShowForm(false)
  }

  const startEdit = (e: typeof especialidades[0]) => {
    setForm({ nombre: e.nombre, descripcion: e.descripcion }); setEditId(e.id); setShowForm(true)
  }

  const toggleActiva = (id: number) => setEspecialidades(prev => prev.map(e => e.id === id ? { ...e, activa: !e.activa } : e))
  const remove = (id: number) => setEspecialidades(prev => prev.filter(e => e.id !== id))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontWeight: 700, fontSize: '0.9rem' }}>Especialidades médicas</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.15rem' }}>{especialidades.filter(e=>e.activa).length} activas · {especialidades.length} total</p>
        </div>
        <button className="btn-primary" onClick={() => { setEditId(null); setForm({nombre:'',descripcion:''}); setShowForm(!showForm) }}><Plus size={16} /> Nueva Especialidad</button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '1rem', background: 'var(--sky-light)', border: '1px solid #BAE6FD' }}>
          <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--sky-dark)' }}>{editId ? 'Editar' : 'Nueva'} Especialidad</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div><label>Nombre *</label><input value={form.nombre} onChange={e=>setForm(p=>({...p,nombre:e.target.value}))} placeholder="Ej: Dermatología" /></div>
            <div><label>Descripción</label><input value={form.descripcion} onChange={e=>setForm(p=>({...p,descripcion:e.target.value}))} placeholder="Breve descripción..." /></div>
          </div>
          <div style={{ display:'flex',gap:'0.5rem' }}>
            <button className="btn-primary" onClick={saveForm}><Check size={15} /> {editId ? 'Actualizar' : 'Guardar'}</button>
            <button className="btn-secondary" onClick={() => { setShowForm(false); setEditId(null) }}><X size={15} /> Cancelar</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        {especialidades.map(e => (
          <div key={e.id} className="card" style={{ opacity: e.activa ? 1 : 0.6, transition: 'opacity 0.2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{e.nombre}</span>
                  <span className={`badge ${e.activa ? 'badge-success' : 'badge-cancel'}`}>{e.activa ? 'Activa' : 'Inactiva'}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>{e.descripcion}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--sky)', fontWeight: 600 }}>{e.medicos} médico{e.medicos !== 1 ? 's' : ''} asignado{e.medicos !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.875rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
              <button onClick={() => startEdit(e)} style={{ display:'flex',alignItems:'center',gap:'0.3rem',padding:'0.3rem 0.6rem',borderRadius:'0.4rem',border:'1px solid var(--border)',background:'white',cursor:'pointer',fontSize:'0.75rem',color:'var(--muted)' }}><Edit2 size={13} /> Editar</button>
              <button onClick={() => toggleActiva(e.id)} style={{ display:'flex',alignItems:'center',gap:'0.3rem',padding:'0.3rem 0.6rem',borderRadius:'0.4rem',border:'1px solid var(--border)',background:'white',cursor:'pointer',fontSize:'0.75rem',color:'var(--muted)' }}>
                {e.activa ? <ToggleRight size={14} color="#10B981" /> : <ToggleLeft size={14} />}
                {e.activa ? 'Desactivar' : 'Activar'}
              </button>
              <button onClick={() => remove(e.id)} style={{ marginLeft:'auto',padding:'0.35rem',borderRadius:'0.4rem',border:'1px solid #FECACA',background:'#FEF2F2',cursor:'pointer',display:'flex',color:'#EF4444' }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TabMetricas() {
  const meses = ['Ene','Feb','Mar','Abr','May','Jun']
  const citas   = [180, 210, 195, 240, 225, 260]
  const espera  = [42, 38, 35, 32, 30, 28]
  const maxCitas = Math.max(...citas)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <StatCard value="1,310" label="Citas (semestre)"    sub="↑ 18% vs año ant."   color="#0EA5E9" icon={Calendar}   />
        <StatCard value="28 min" label="Espera promedio"    sub="↓ 33% vs inicio"     color="#10B981" icon={Clock}      />
        <StatCard value="4.7/5" label="Satisfacción"        sub="Basado en 843 enc."  color="#8B5CF6" icon={TrendingUp} />
        <StatCard value="89%"   label="Asistencia a citas"  sub="↑ 5% vs semestre ant." color="#F59E0B" icon={Activity}  />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1rem' }}>
        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '1.25rem' }}>Citas mensuales (2025)</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', height: 140 }}>
            {meses.map((m, i) => (
              <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 600 }}>{citas[i]}</span>
                <div style={{ width: '100%', background: '#E0F2FE', borderRadius: '0.3rem', display: 'flex', alignItems: 'flex-end', height: 100 }}>
                  <div style={{ width:'100%', background: i===5?'var(--sky)':'#7DD3FC', borderRadius:'0.3rem', height:`${(citas[i]/maxCitas)*100}%`, transition:'height 0.3s' }} />
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 500 }}>{m}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '1.25rem' }}>Tiempo de espera (min)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {meses.map((m, i) => (
              <div key={m}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.2rem' }}>
                  <span style={{ fontSize:'0.75rem', fontWeight:500 }}>{m}</span>
                  <span style={{ fontSize:'0.75rem', color:'var(--muted)' }}>{espera[i]} min</span>
                </div>
                <div style={{ height:6, background:'#F1F5F9', borderRadius:9999 }}>
                  <div style={{ height:'100%', width:`${(espera[i]/50)*100}%`, background:espera[i]<=30?'#10B981':'#F59E0B', borderRadius:9999, transition:'width 0.3s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem' }}>Distribución de prioridades (último mes)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
          {[{label:'Crítica',pct:8,color:'#EF4444',bg:'#FEE2E2'},{label:'Alta',pct:22,color:'#F59E0B',bg:'#FEF3C7'},{label:'Media',pct:45,color:'#3B82F6',bg:'#DBEAFE'},{label:'Baja',pct:25,color:'#10B981',bg:'#DCFCE7'}].map(p=>(
            <div key={p.label} style={{ textAlign:'center', background:p.bg, borderRadius:'0.75rem', padding:'1rem' }}>
              <div style={{ fontSize:'2rem', fontWeight:800, color:p.color }}>{p.pct}%</div>
              <div style={{ fontSize:'0.8rem', color:p.color, fontWeight:600 }}>{p.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TabConfiguracion() {
  const [notifEmail, setNotifEmail]     = useState(true)
  const [notifSMS, setNotifSMS]         = useState(false)
  const [triaje, setTriaje]             = useState(true)
  const [telemedicina, setTelemedicina] = useState(false)
  const [horario, setHorario]           = useState('07:00 - 18:00')
  const [capacidad, setCapacidad]       = useState('20')
  const [saved, setSaved]               = useState(false)

  const handleSave = async () => {
    setSaved(false)
    await new Promise(r => setTimeout(r, 700))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button onClick={() => onChange(!value)} style={{ width:44, height:24, borderRadius:9999, border:'none', cursor:'pointer', background:value?'var(--sky)':'var(--border)', padding:2, display:'flex', alignItems:'center', transition:'background 0.2s' }}>
      <span style={{ width:20, height:20, borderRadius:'50%', background:'white', display:'block', transition:'transform 0.2s', transform:value?'translateX(20px)':'translateX(0)' }} />
    </button>
  )

  return (
    <div style={{ maxWidth: 680 }}>
      {saved && (
        <div style={{ display:'flex',alignItems:'center',gap:'0.5rem',background:'#DCFCE7',border:'1px solid #BBF7D0',borderRadius:'0.5rem',padding:'0.75rem 1rem',marginBottom:'1.25rem',color:'#15803D',fontSize:'0.875rem' }}>
          <Check size={16} /> Configuración guardada correctamente
        </div>
      )}

      <div className="card" style={{ marginBottom: '1rem' }}>
        <div style={{ display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'1rem' }}>
          <Bell size={18} color="var(--sky)" />
          <h3 style={{ fontWeight: 700, fontSize: '0.9rem' }}>Notificaciones</h3>
        </div>
        {[{label:'Notificaciones por correo',sub:'Confirmación de citas y recordatorios por email',v:notifEmail,set:setNotifEmail},{label:'Notificaciones por SMS',sub:'Recordatorios por mensaje de texto (requiere integración)',v:notifSMS,set:setNotifSMS}].map(n=>(
          <div key={n.label} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0.75rem 0',borderBottom:'1px solid var(--border)' }}>
            <div><p style={{ fontWeight:600,fontSize:'0.875rem' }}>{n.label}</p><p style={{ fontSize:'0.78rem',color:'var(--muted)',marginTop:'0.15rem' }}>{n.sub}</p></div>
            <Toggle value={n.v} onChange={n.set} />
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: '1rem' }}>
        <div style={{ display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'1rem' }}>
          <Shield size={18} color="var(--sky)" />
          <h3 style={{ fontWeight: 700, fontSize: '0.9rem' }}>Módulos del sistema</h3>
        </div>
        {[{label:'Triaje digital habilitado',sub:'Requiere que los pacientes completen el triaje antes de su cita',v:triaje,set:setTriaje},{label:'Telemedicina (Fase 2)',sub:'Videollamadas médico-paciente. Requiere configuración adicional.',v:telemedicina,set:setTelemedicina}].map(n=>(
          <div key={n.label} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0.75rem 0',borderBottom:'1px solid var(--border)' }}>
            <div><p style={{ fontWeight:600,fontSize:'0.875rem' }}>{n.label}</p><p style={{ fontSize:'0.78rem',color:'var(--muted)',marginTop:'0.15rem' }}>{n.sub}</p></div>
            <Toggle value={n.v} onChange={n.set} />
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'1rem' }}>
          <Globe size={18} color="var(--sky)" />
          <h3 style={{ fontWeight: 700, fontSize: '0.9rem' }}>Operación hospitalaria</h3>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem' }}>
          <div><label>Horario de atención</label><input value={horario} onChange={e=>setHorario(e.target.value)} /></div>
          <div><label>Capacidad máx. citas/día por médico</label><input type="number" value={capacidad} onChange={e=>setCapacidad(e.target.value)} /></div>
        </div>
      </div>

      <button className="btn-primary" onClick={handleSave} style={{ padding:'0.7rem 2rem' }}><Check size={16} /> Guardar cambios</button>
    </div>
  )
}

export default function AdminDashboard() {
  const [tab, setTab] = useState('dashboard')
  const titles: Record<string,string> = {
    dashboard:'Panel de Control', medicos:'Gestión de Médicos', pacientes:'Gestión de Pacientes',
    citas:'Gestión de Citas', especialidades:'Especialidades', metricas:'Métricas', config:'Configuración'
  }
  return (
    <SidebarLayout title={titles[tab]||'Dashboard'} role="admin" userName="Dra. Lucía Quispe" navItems={nav} activeTab={tab} onTabChange={setTab}>
      {tab==='dashboard'     && <TabDashboard />}
      {tab==='medicos'       && <TabMedicos />}
      {tab==='pacientes'     && <TabPacientes />}
      {tab==='especialidades' && <TabEspecialidades />}
      {tab==='metricas'      && <TabMetricas />}
      {tab==='config'        && <TabConfiguracion />}
      {tab==='citas' && (
        <div className="card">
          <h3 style={{ fontWeight:700,marginBottom:'1rem' }}>Gestión de Citas</h3>
          <table style={{ width:'100%',borderCollapse:'collapse',fontSize:'0.85rem' }}>
            <thead><tr style={{ borderBottom:'1px solid var(--border)' }}>{['Hora','Paciente','Médico','Especialidad','Prioridad','Estado'].map(h=><th key={h} style={{ padding:'0.5rem 0.75rem',textAlign:'left',fontSize:'0.7rem',color:'var(--muted)',fontWeight:700,textTransform:'uppercase' }}>{h}</th>)}</tr></thead>
            <tbody>{CITAS_DATA.map(c=>(
              <tr key={c.id} style={{ borderBottom:'1px solid var(--border)' }}>
                <td style={{ padding:'0.6rem 0.75rem',fontWeight:600 }}>{c.hora}</td>
                <td style={{ padding:'0.6rem 0.75rem' }}>{c.paciente}</td>
                <td style={{ padding:'0.6rem 0.75rem',color:'var(--muted)' }}>{c.medico}</td>
                <td style={{ padding:'0.6rem 0.75rem' }}>{c.especialidad}</td>
                <td style={{ padding:'0.6rem 0.75rem' }}><span className={`badge badge-${c.prioridad}`}>{c.prioridad.charAt(0).toUpperCase()+c.prioridad.slice(1)}</span></td>
                <td style={{ padding:'0.6rem 0.75rem' }}><span className={`badge ${c.estado==='Confirmada'?'badge-success':c.estado==='Cancelada'?'badge-cancel':'badge-pending'}`}>{c.estado}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </SidebarLayout>
  )
}
