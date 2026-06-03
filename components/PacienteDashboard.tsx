'use client'
import { useState } from 'react'
import SidebarLayout from './SidebarLayout'
import { LayoutDashboard, Calendar, ClipboardList, FileText, Bell, Plus, Check, ChevronRight, AlertTriangle, Clock, Stethoscope, X, Edit2, User } from 'lucide-react'

const nav = [
  { icon: LayoutDashboard, label: 'Mi Panel',        key: 'panel'    },
  { icon: Calendar,        label: 'Mis Citas',       key: 'citas'    },
  { icon: Plus,            label: 'Nueva Cita',      key: 'nueva'    },
  { icon: ClipboardList,   label: 'Triaje',          key: 'triaje'   },
  { icon: FileText,        label: 'Mi Historial',    key: 'historial'},
  { icon: Bell,            label: 'Notificaciones',  key: 'notif'    },
  { icon: User,            label: 'Mi Perfil',       key: 'perfil'   },
]

const MIS_CITAS_INIT = [
  { id: 1, medico: 'Dr. Carlos Mendoza',  especialidad: 'Cardiología',      fecha: '2025-06-10', hora: '08:00', estado: 'Confirmada', prioridad: 'alta'  },
  { id: 2, medico: 'Dra. Ana Villanueva', especialidad: 'Medicina General', fecha: '2025-05-28', hora: '10:00', estado: 'Completada', prioridad: 'media' },
  { id: 3, medico: 'Dr. Miguel Ríos',     especialidad: 'Pediatría',        fecha: '2025-04-15', hora: '09:30', estado: 'Completada', prioridad: 'baja'  },
]

const HISTORIAL = [
  { id: 1, fecha: '2025-05-28', medico: 'Dra. Ana Villanueva', especialidad: 'Medicina General', diagnostico: 'Infección respiratoria aguda', tratamiento: 'Amoxicilina 500mg c/8h por 7 días. Reposo relativo. Control en 7 días.', observaciones: 'Paciente presenta cuadro de 3 días de evolución. Rx de tórax normal.' },
  { id: 2, fecha: '2025-04-15', medico: 'Dr. Miguel Ríos',     especialidad: 'Pediatría',        diagnostico: 'Control anual pediátrico',       tratamiento: 'Continuar con vacunas según calendario. Dieta balanceada.',          observaciones: 'Desarrollo normal. Peso y talla dentro de percentiles adecuados.' },
  { id: 3, fecha: '2025-02-10', medico: 'Dr. Carlos Mendoza',  especialidad: 'Cardiología',      diagnostico: 'Hipertensión arterial estadio I', tratamiento: 'Losartán 50mg/día. Dieta baja en sodio. Actividad física moderada.',  observaciones: 'PA: 145/92 mmHg. Se solicita Holter 24h. Próximo control en 3 meses.' },
]

const NOTIFICACIONES_INIT = [
  { id: 1, tipo: 'cita',    titulo: 'Cita confirmada',           mensaje: 'Tu cita con Dr. Carlos Mendoza el 10 Jun a las 08:00 ha sido confirmada.',  fecha: 'Hace 2 horas',   leida: false },
  { id: 2, tipo: 'triaje',  titulo: 'Triaje requerido',          mensaje: 'Completa el triaje digital 24h antes de tu cita del 10 de junio.',           fecha: 'Hace 2 horas',   leida: false },
  { id: 3, tipo: 'recuerdo',titulo: 'Recordatorio de cita',      mensaje: 'Recuerda tu cita con Dra. Ana Villanueva mañana a las 10:00.',                fecha: 'Hace 1 día',     leida: true  },
  { id: 4, tipo: 'sistema', titulo: 'Bienvenido a ConsulSalud',  mensaje: 'Tu cuenta ha sido activada. Ya puedes solicitar citas en línea.',             fecha: 'Hace 3 días',    leida: true  },
  { id: 5, tipo: 'cita',   titulo: 'Cita completada',            mensaje: 'Tu consulta con Dr. Miguel Ríos del 15 de abril fue registrada en tu historial.', fecha: 'Hace 2 meses', leida: true  },
]

const ESPECIALIDADES = ['Medicina General','Cardiología','Pediatría','Neurología','Traumatología','Ginecología','Dermatología']
const MEDICOS_POR_ESP: Record<string,string[]> = {
  'Medicina General':['Dra. Ana Villanueva','Dr. Roberto Salinas'],
  'Cardiología':['Dr. Carlos Mendoza','Dra. Patricia Lozano'],
  'Pediatría':['Dr. Miguel Ríos','Dra. Sofía Herrera'],
  'Neurología':['Dr. Jorge Paredes'],
  'Traumatología':['Dra. Rosa Flores','Dr. Alberto Reyna'],
  'Ginecología':['Dra. Carmen Núñez'],
  'Dermatología':['Dr. Samuel Torres'],
}
const HORARIOS = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30']
const SINTOMAS  = ['Fiebre','Dolor de cabeza','Náuseas / Vómitos','Dolor en el pecho','Dificultad para respirar','Mareos','Dolor abdominal','Cansancio extremo','Tos persistente','Dolor articular']
const FACTORES  = ['Hipertensión','Diabetes','Embarazo','Asma','Cardiopatía','Adulto mayor (+65)','Inmunosuprimido']

function calcularPrioridad(intensidad: number, factores: string[], sintomas: string[]): string {
  const criticos = ['Dolor en el pecho','Dificultad para respirar']
  if (intensidad >= 9 || (sintomas.some(s=>criticos.includes(s)) && factores.length > 0)) return 'critica'
  if (intensidad >= 7 || sintomas.some(s=>criticos.includes(s)) || factores.length >= 2) return 'alta'
  if (intensidad >= 4 || factores.length >= 1) return 'media'
  return 'baja'
}

function TabPanel({ onNav }: { onNav: (k: string) => void }) {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label:'Próxima Cita',       value:'10 Jun',  sub:'Dr. Mendoza · 08:00', color:'#0EA5E9', icon:Calendar      },
          { label:'Citas Completadas',  value:'2',       sub:'Historial disponible', color:'#10B981', icon:Check         },
          { label:'Nivel de Prioridad', value:'ALTA',    sub:'Según último triaje',  color:'#F59E0B', icon:AlertTriangle },
        ].map(s => (
          <div key={s.label} className="card" style={{ display:'flex',alignItems:'flex-start',justifyContent:'space-between' }}>
            <div>
              <p style={{ fontSize:'0.72rem',color:'var(--muted)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'0.25rem' }}>{s.label}</p>
              <p style={{ fontSize:'1.75rem',fontWeight:800,color:'var(--text)',lineHeight:1 }}>{s.value}</p>
              <p style={{ fontSize:'0.72rem',color:s.color,fontWeight:600,marginTop:'0.3rem' }}>{s.sub}</p>
            </div>
            <div style={{ background:`${s.color}18`,borderRadius:'0.6rem',padding:'0.6rem',display:'flex' }}><s.icon size={22} color={s.color} /></div>
          </div>
        ))}
      </div>
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem' }}>
        <div className="card">
          <h3 style={{ fontWeight:700,fontSize:'0.9rem',marginBottom:'1rem' }}>Mis próximas citas</h3>
          {MIS_CITAS_INIT.filter(c=>c.estado==='Confirmada').map(c=>(
            <div key={c.id} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0.75rem',background:'var(--bg)',borderRadius:'0.5rem',marginBottom:'0.5rem' }}>
              <div>
                <p style={{ fontWeight:600,fontSize:'0.85rem' }}>{c.medico}</p>
                <p style={{ fontSize:'0.75rem',color:'var(--muted)' }}>{c.especialidad} · {c.fecha} a las {c.hora}</p>
              </div>
              <span className={`badge badge-${c.prioridad}`}>{c.prioridad.charAt(0).toUpperCase()+c.prioridad.slice(1)}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <h3 style={{ fontWeight:700,fontSize:'0.9rem',marginBottom:'1rem' }}>Acciones rápidas</h3>
          {[
            { label:'Solicitar nueva cita',        icon:Plus,         color:'var(--sky)', key:'nueva'    },
            { label:'Completar triaje digital',    icon:ClipboardList,color:'#10B981',    key:'triaje'   },
            { label:'Ver mi historial clínico',    icon:FileText,     color:'#8B5CF6',    key:'historial'},
          ].map(a=>(
            <button key={a.label} onClick={()=>onNav(a.key)}
              style={{ width:'100%',display:'flex',alignItems:'center',gap:'0.75rem',padding:'0.75rem',background:'var(--bg)',border:'1px solid var(--border)',borderRadius:'0.5rem',cursor:'pointer',marginBottom:'0.5rem',textAlign:'left',transition:'all 0.15s' }}
              onMouseEnter={e=>(e.currentTarget.style.background='var(--sky-light)')}
              onMouseLeave={e=>(e.currentTarget.style.background='var(--bg)')}>
              <div style={{ background:`${a.color}18`,borderRadius:'0.4rem',padding:'0.4rem',display:'flex' }}><a.icon size={16} color={a.color} /></div>
              <span style={{ fontSize:'0.85rem',fontWeight:500 }}>{a.label}</span>
              <ChevronRight size={14} color="var(--muted)" style={{ marginLeft:'auto' }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function TabNuevaCita() {
  const [step,setStep]   = useState(1)
  const [esp,setEsp]     = useState('')
  const [med,setMed]     = useState('')
  const [hora,setHora]   = useState('')
  const [fecha,setFecha] = useState('')
  const [done,setDone]   = useState(false)
  if (done) return (
    <div style={{ display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:350,textAlign:'center' }}>
      <div style={{ background:'#DCFCE7',borderRadius:'50%',width:80,height:80,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'1rem' }}><Check size={40} color="#15803D" /></div>
      <h2 style={{ fontWeight:800,fontSize:'1.25rem',marginBottom:'0.5rem' }}>¡Cita confirmada!</h2>
      <p style={{ color:'var(--muted)',marginBottom:'0.25rem' }}>{med} · {esp}</p>
      <p style={{ color:'var(--muted)',fontSize:'0.9rem',marginBottom:'1.5rem' }}>{fecha} a las {hora}</p>
      <p style={{ fontSize:'0.85rem',color:'var(--sky)',fontWeight:600 }}>Recibirás un recordatorio por correo electrónico</p>
      <button className="btn-primary" style={{ marginTop:'1.5rem' }} onClick={()=>{setDone(false);setStep(1);setEsp('');setMed('');setHora('');setFecha('')}}>Nueva Cita</button>
    </div>
  )
  return (
    <div style={{ maxWidth:560,margin:'0 auto' }}>
      <div style={{ display:'flex',alignItems:'center',marginBottom:'2rem',gap:'0.5rem' }}>
        {[1,2,3].map(s=>(
          <div key={s} style={{ display:'flex',alignItems:'center',flex:s<3?1:'none' }}>
            <div style={{ width:32,height:32,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:'0.85rem',background:step>=s?'var(--sky)':'var(--border)',color:step>=s?'white':'var(--muted)',flexShrink:0 }}>{s}</div>
            {s<3 && <div style={{ flex:1,height:2,background:step>s?'var(--sky)':'var(--border)',marginLeft:'0.4rem' }} />}
          </div>
        ))}
      </div>
      {step===1 && (
        <div className="card">
          <h3 style={{ fontWeight:700,marginBottom:'1.25rem' }}>Selecciona especialidad y médico</h3>
          <div style={{ marginBottom:'1rem' }}><label>Especialidad</label><select value={esp} onChange={e=>{setEsp(e.target.value);setMed('')}}><option value="">Seleccionar especialidad...</option>{ESPECIALIDADES.map(e=><option key={e}>{e}</option>)}</select></div>
          {esp && <div style={{ marginBottom:'1.25rem' }}><label>Médico disponible</label><select value={med} onChange={e=>setMed(e.target.value)}><option value="">Seleccionar médico...</option>{(MEDICOS_POR_ESP[esp]||[]).map(m=><option key={m}>{m}</option>)}</select></div>}
          <button className="btn-primary" disabled={!esp||!med} onClick={()=>setStep(2)} style={{ opacity:(!esp||!med)?0.5:1 }}>Siguiente <ChevronRight size={16} /></button>
        </div>
      )}
      {step===2 && (
        <div className="card">
          <h3 style={{ fontWeight:700,marginBottom:'1.25rem' }}>Elige fecha y hora</h3>
          <div style={{ marginBottom:'1rem' }}><label>Fecha</label><input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} min={new Date().toISOString().split('T')[0]} /></div>
          {fecha && <div style={{ marginBottom:'1.25rem' }}><label>Horario disponible</label><div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0.5rem' }}>{HORARIOS.map(h=>(<button key={h} onClick={()=>setHora(h)} style={{ padding:'0.6rem',borderRadius:'0.4rem',border:hora===h?'2px solid var(--sky)':'1px solid var(--border)',background:hora===h?'var(--sky-light)':'white',color:hora===h?'var(--sky-dark)':'var(--text)',fontWeight:hora===h?700:400,cursor:'pointer',fontSize:'0.85rem' }}>{h}</button>))}</div></div>}
          <div style={{ display:'flex',gap:'0.5rem' }}><button className="btn-secondary" onClick={()=>setStep(1)}>Atrás</button><button className="btn-primary" disabled={!fecha||!hora} onClick={()=>setStep(3)} style={{ opacity:(!fecha||!hora)?0.5:1 }}>Confirmar <ChevronRight size={16} /></button></div>
        </div>
      )}
      {step===3 && (
        <div className="card">
          <h3 style={{ fontWeight:700,marginBottom:'1.25rem' }}>Confirma tu cita</h3>
          <div style={{ background:'var(--bg)',borderRadius:'0.6rem',padding:'1rem',marginBottom:'1.25rem' }}>
            {[['Especialidad',esp],['Médico',med],['Fecha',fecha],['Hora',hora]].map(([k,v])=>(
              <div key={k} style={{ display:'flex',justifyContent:'space-between',padding:'0.4rem 0',borderBottom:'1px solid var(--border)' }}>
                <span style={{ fontSize:'0.82rem',color:'var(--muted)',fontWeight:500 }}>{k}</span>
                <span style={{ fontSize:'0.82rem',fontWeight:600 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ background:'#FEF3C7',border:'1px solid #FDE68A',borderRadius:'0.5rem',padding:'0.75rem',marginBottom:'1.25rem',fontSize:'0.82rem',color:'#92400E' }}>
            <strong>Recuerda:</strong> Deberás completar el triaje digital 24h antes de tu cita.
          </div>
          <div style={{ display:'flex',gap:'0.5rem' }}><button className="btn-secondary" onClick={()=>setStep(2)}>Atrás</button><button className="btn-primary" style={{ flex:1,justifyContent:'center' }} onClick={()=>setDone(true)}><Check size={16} /> Confirmar Cita</button></div>
        </div>
      )}
    </div>
  )
}

function TabCitas() {
  const [citas, setCitas]     = useState(MIS_CITAS_INIT)
  const [editId, setEditId]   = useState<number|null>(null)
  const [editFecha, setEditFecha] = useState('')
  const [editHora, setEditHora]   = useState('')
  const [cancelId, setCancelId]   = useState<number|null>(null)

  const confirmarCancelacion = (id: number) => {
    setCitas(prev => prev.map(c => c.id===id ? {...c, estado:'Cancelada'} : c))
    setCancelId(null)
  }

  const confirmarReprogramacion = (id: number) => {
    if (!editFecha || !editHora) return
    setCitas(prev => prev.map(c => c.id===id ? {...c, fecha:editFecha, hora:editHora} : c))
    setEditId(null)
  }

  return (
    <div>
      {cancelId && (
        <div style={{ background:'#FEE2E2',border:'1px solid #FECACA',borderRadius:'0.6rem',padding:'1rem',marginBottom:'1rem',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
          <div><p style={{ fontWeight:700,color:'#B91C1C',marginBottom:'0.25rem' }}>¿Cancelar esta cita?</p><p style={{ fontSize:'0.85rem',color:'#B91C1C' }}>Esta acción no se puede deshacer fácilmente.</p></div>
          <div style={{ display:'flex',gap:'0.5rem' }}>
            <button onClick={()=>confirmarCancelacion(cancelId)} style={{ padding:'0.5rem 1rem',background:'#EF4444',color:'white',border:'none',borderRadius:'0.4rem',cursor:'pointer',fontWeight:600,fontSize:'0.85rem' }}>Sí, cancelar</button>
            <button onClick={()=>setCancelId(null)} style={{ padding:'0.5rem 1rem',background:'white',color:'var(--muted)',border:'1px solid var(--border)',borderRadius:'0.4rem',cursor:'pointer',fontWeight:600,fontSize:'0.85rem' }}>No, volver</button>
          </div>
        </div>
      )}

      <div style={{ display:'flex',flexDirection:'column',gap:'0.875rem' }}>
        {citas.map(c => (
          <div key={c.id} className="card">
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'0.75rem' }}>
              <div>
                <div style={{ display:'flex',gap:'0.5rem',alignItems:'center',marginBottom:'0.25rem' }}>
                  <span style={{ fontWeight:700,fontSize:'0.95rem' }}>{c.medico}</span>
                  <span className={`badge badge-${c.prioridad}`}>{c.prioridad.charAt(0).toUpperCase()+c.prioridad.slice(1)}</span>
                  <span className={`badge ${c.estado==='Confirmada'?'badge-success':c.estado==='Cancelada'?'badge-cancel':'badge-media'}`}>{c.estado}</span>
                </div>
                <p style={{ fontSize:'0.82rem',color:'var(--muted)' }}>{c.especialidad} · {c.fecha} a las {c.hora}</p>
              </div>
              {c.estado==='Confirmada' && (
                <div style={{ display:'flex',gap:'0.4rem' }}>
                  <button onClick={()=>{setEditId(c.id);setEditFecha(c.fecha);setEditHora(c.hora)}} style={{ display:'flex',alignItems:'center',gap:'0.3rem',padding:'0.35rem 0.65rem',border:'1px solid var(--border)',borderRadius:'0.4rem',background:'white',cursor:'pointer',fontSize:'0.75rem',color:'var(--muted)' }}><Edit2 size={13}/> Reprogramar</button>
                  <button onClick={()=>setCancelId(c.id)} style={{ display:'flex',alignItems:'center',gap:'0.3rem',padding:'0.35rem 0.65rem',border:'1px solid #FECACA',borderRadius:'0.4rem',background:'#FEF2F2',cursor:'pointer',fontSize:'0.75rem',color:'#EF4444' }}><X size={13}/> Cancelar</button>
                </div>
              )}
            </div>
            {editId===c.id && (
              <div style={{ background:'var(--sky-light)',border:'1px solid #BAE6FD',borderRadius:'0.5rem',padding:'0.875rem' }}>
                <p style={{ fontSize:'0.82rem',fontWeight:700,color:'var(--sky-dark)',marginBottom:'0.75rem' }}>Reprogramar cita</p>
                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem',marginBottom:'0.75rem' }}>
                  <div><label>Nueva fecha</label><input type="date" value={editFecha} onChange={e=>setEditFecha(e.target.value)} min={new Date().toISOString().split('T')[0]} /></div>
                  <div><label>Nuevo horario</label><select value={editHora} onChange={e=>setEditHora(e.target.value)}><option value="">Seleccionar...</option>{HORARIOS.map(h=><option key={h}>{h}</option>)}</select></div>
                </div>
                <div style={{ display:'flex',gap:'0.5rem' }}>
                  <button onClick={()=>confirmarReprogramacion(c.id)} className="btn-primary" style={{ fontSize:'0.82rem',padding:'0.4rem 1rem' }}><Check size={14}/> Guardar</button>
                  <button onClick={()=>setEditId(null)} className="btn-secondary" style={{ fontSize:'0.82rem',padding:'0.4rem 1rem' }}>Cancelar</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function TabTriaje() {
  const [step,setStep]           = useState(1)
  const [sintomas,setSintomas]   = useState<string[]>([])
  const [intensidad,setInten]    = useState(5)
  const [duracion,setDuracion]   = useState('')
  const [factores,setFactores]   = useState<string[]>([])
  const [resultado,setResultado] = useState<string|null>(null)

  const toggleSintoma = (s:string) => setSintomas(prev=>prev.includes(s)?prev.filter(x=>x!==s):[...prev,s])
  const toggleFactor  = (f:string) => setFactores(prev=>prev.includes(f)?prev.filter(x=>x!==f):[...prev,f])

  const prioConfig: Record<string,{label:string;color:string;bg:string;msg:string}> = {
    critica:{label:'CRÍTICA',color:'#B91C1C',bg:'#FEE2E2',msg:'Tu caso requiere atención inmediata. Acude a urgencias o espera ser contactado.'},
    alta:   {label:'ALTA',   color:'#B45309',bg:'#FEF3C7',msg:'Tu caso es urgente. Serás atendido con prioridad en tu cita programada.'},
    media:  {label:'MEDIA',  color:'#1D4ED8',bg:'#DBEAFE',msg:'Tu caso tiene prioridad estándar. Acude a tu cita en el horario establecido.'},
    baja:   {label:'BAJA',   color:'#15803D',bg:'#DCFCE7',msg:'Tu estado es estable. Acude a tu cita relajado, no es urgente.'},
  }

  const calcular = () => { setResultado(calcularPrioridad(intensidad,factores,sintomas)); setStep(3) }

  if (step===3 && resultado) {
    const cfg = prioConfig[resultado]
    return (
      <div style={{ maxWidth:520,margin:'0 auto' }}>
        <div className="card" style={{ textAlign:'center',background:cfg.bg,border:`2px solid ${cfg.color}30` }}>
          <div style={{ width:72,height:72,borderRadius:'50%',background:cfg.color,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 1rem' }}><Stethoscope size={32} color="white" /></div>
          <h2 style={{ fontWeight:800,fontSize:'1.1rem',marginBottom:'0.5rem' }}>Resultado del Triaje</h2>
          <div style={{ display:'inline-flex',alignItems:'center',gap:'0.4rem',background:cfg.color,borderRadius:9999,padding:'0.35rem 1rem',marginBottom:'1rem' }}>
            <span style={{ color:'white',fontWeight:800,fontSize:'1rem' }}>PRIORIDAD {cfg.label}</span>
          </div>
          <p style={{ color:'var(--text)',fontSize:'0.9rem',lineHeight:1.6,marginBottom:'1.25rem' }}>{cfg.msg}</p>
          <div style={{ background:'white',borderRadius:'0.6rem',padding:'1rem',textAlign:'left',marginBottom:'1rem' }}>
            <p style={{ fontSize:'0.72rem',color:'var(--muted)',fontWeight:700,textTransform:'uppercase',marginBottom:'0.6rem' }}>Resumen</p>
            <p style={{ fontSize:'0.82rem',marginBottom:'0.3rem' }}><strong>Síntomas:</strong> {sintomas.join(', ')||'Ninguno indicado'}</p>
            <p style={{ fontSize:'0.82rem',marginBottom:'0.3rem' }}><strong>Intensidad:</strong> {intensidad}/10 · <strong>Duración:</strong> {duracion}</p>
            {factores.length>0 && <p style={{ fontSize:'0.82rem' }}><strong>Factores de riesgo:</strong> {factores.join(', ')}</p>}
          </div>
          <button className="btn-primary" style={{ width:'100%',justifyContent:'center' }} onClick={()=>{setStep(1);setSintomas([]);setInten(5);setDuracion('');setFactores([]);setResultado(null)}}>Nuevo Triaje</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth:560,margin:'0 auto' }}>
      <div style={{ display:'flex',alignItems:'center',marginBottom:'1.5rem',gap:'0.5rem' }}>
        {[1,2].map(s=>(<div key={s} style={{ display:'flex',alignItems:'center',flex:s<2?1:'none' }}>
          <div style={{ width:32,height:32,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:'0.85rem',background:step>=s?'var(--sky)':'var(--border)',color:step>=s?'white':'var(--muted)',flexShrink:0 }}>{s}</div>
          {s<2 && <div style={{ flex:1,height:2,background:step>s?'var(--sky)':'var(--border)',marginLeft:'0.4rem' }} />}
        </div>))}
      </div>
      {step===1 && (
        <div className="card">
          <h3 style={{ fontWeight:700,marginBottom:'0.5rem' }}>¿Cuáles son tus síntomas?</h3>
          <p style={{ color:'var(--muted)',fontSize:'0.85rem',marginBottom:'1.25rem' }}>Selecciona todos los síntomas que presentas actualmente</p>
          <div style={{ display:'flex',flexWrap:'wrap',gap:'0.5rem',marginBottom:'1.5rem' }}>
            {SINTOMAS.map(s=>(<button key={s} onClick={()=>toggleSintoma(s)} style={{ padding:'0.4rem 0.875rem',borderRadius:9999,border:sintomas.includes(s)?'2px solid var(--sky)':'1px solid var(--border)',background:sintomas.includes(s)?'var(--sky-light)':'white',color:sintomas.includes(s)?'var(--sky-dark)':'var(--text)',fontWeight:sintomas.includes(s)?700:400,fontSize:'0.82rem',cursor:'pointer',transition:'all 0.15s' }}>{s}</button>))}
          </div>
          <div style={{ marginBottom:'1rem' }}>
            <label>Intensidad del malestar ({intensidad}/10)</label>
            <input type="range" min={1} max={10} value={intensidad} onChange={e=>setInten(Number(e.target.value))} style={{ width:'100%',accentColor:'var(--sky)',border:'none',padding:'0.4rem 0' }} />
            <div style={{ display:'flex',justifyContent:'space-between',fontSize:'0.72rem',color:'var(--muted)' }}><span>Leve (1)</span><span>Moderado (5)</span><span>Severo (10)</span></div>
          </div>
          <div style={{ marginBottom:'1.5rem' }}>
            <label>¿Cuánto tiempo llevas con estos síntomas?</label>
            <select value={duracion} onChange={e=>setDuracion(e.target.value)}><option value="">Seleccionar...</option>{['Menos de 1 hora','1-4 horas','4-12 horas','1-2 días','3-7 días','Más de 1 semana'].map(d=><option key={d}>{d}</option>)}</select>
          </div>
          <button className="btn-primary" disabled={sintomas.length===0||!duracion} onClick={()=>setStep(2)} style={{ opacity:(sintomas.length===0||!duracion)?0.5:1 }}>Siguiente <ChevronRight size={16} /></button>
        </div>
      )}
      {step===2 && (
        <div className="card">
          <h3 style={{ fontWeight:700,marginBottom:'0.5rem' }}>Factores de riesgo</h3>
          <p style={{ color:'var(--muted)',fontSize:'0.85rem',marginBottom:'1.25rem' }}>Indica si tienes alguna condición preexistente (opcional)</p>
          <div style={{ display:'flex',flexWrap:'wrap',gap:'0.5rem',marginBottom:'1.5rem' }}>
            {FACTORES.map(f=>(<button key={f} onClick={()=>toggleFactor(f)} style={{ padding:'0.4rem 0.875rem',borderRadius:9999,border:factores.includes(f)?'2px solid #F59E0B':'1px solid var(--border)',background:factores.includes(f)?'#FEF3C7':'white',color:factores.includes(f)?'#92400E':'var(--text)',fontWeight:factores.includes(f)?700:400,fontSize:'0.82rem',cursor:'pointer',transition:'all 0.15s' }}>{f}</button>))}
          </div>
          <div style={{ display:'flex',gap:'0.5rem' }}>
            <button className="btn-secondary" onClick={()=>setStep(1)}>Atrás</button>
            <button className="btn-primary" onClick={calcular}><Stethoscope size={16} /> Calcular Prioridad</button>
          </div>
        </div>
      )}
    </div>
  )
}

function TabHistorial() {
  const [selected, setSelected] = useState<typeof HISTORIAL[0]|null>(null)
  return (
    <div>
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginBottom:'1rem' }}>
        {[{label:'Consultas registradas',v:'3',c:'#0EA5E9'},{label:'Último diagnóstico',v:'Inf. Resp.',c:'#10B981'},{label:'Médico de cabecera',v:'Dra. Villanueva',c:'#8B5CF6'}].map(s=>(
          <div key={s.label} className="card" style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
            <div><p style={{ fontSize:'0.72rem',color:'var(--muted)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'0.2rem' }}>{s.label}</p><p style={{ fontWeight:800,fontSize:'1.25rem',color:s.c }}>{s.v}</p></div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem' }}>
        <div style={{ display:'flex',flexDirection:'column',gap:'0.75rem' }}>
          {HISTORIAL.map(h=>(
            <div key={h.id} className="card" onClick={()=>setSelected(selected?.id===h.id?null:h)} style={{ cursor:'pointer',border:selected?.id===h.id?'2px solid var(--sky)':'1px solid var(--border)',transition:'all 0.15s' }}>
              <div style={{ display:'flex',justifyContent:'space-between',marginBottom:'0.35rem' }}>
                <span style={{ fontSize:'0.8rem',color:'var(--muted)',fontWeight:500 }}>{h.fecha}</span>
                <span style={{ fontSize:'0.75rem',background:'var(--sky-light)',color:'var(--sky-dark)',padding:'0.1rem 0.5rem',borderRadius:9999,fontWeight:600 }}>{h.especialidad}</span>
              </div>
              <p style={{ fontWeight:700,fontSize:'0.875rem',marginBottom:'0.2rem' }}>{h.diagnostico}</p>
              <p style={{ fontSize:'0.78rem',color:'var(--muted)' }}>{h.medico}</p>
            </div>
          ))}
        </div>

        <div>
          {selected ? (
            <div className="card" style={{ border:'2px solid var(--sky-light)' }}>
              <div style={{ display:'flex',justifyContent:'space-between',marginBottom:'1rem' }}>
                <div>
                  <p style={{ fontSize:'0.7rem',color:'var(--muted)',fontWeight:600,textTransform:'uppercase',marginBottom:'0.2rem' }}>Detalle de consulta</p>
                  <p style={{ fontWeight:800,fontSize:'1rem' }}>{selected.diagnostico}</p>
                </div>
                <button onClick={()=>setSelected(null)} style={{ background:'none',border:'none',cursor:'pointer',color:'var(--muted)',display:'flex' }}><X size={18} /></button>
              </div>
              {[['Fecha',selected.fecha],['Médico',selected.medico],['Especialidad',selected.especialidad]].map(([k,v])=>(
                <div key={k} style={{ display:'flex',justifyContent:'space-between',padding:'0.4rem 0',borderBottom:'1px solid var(--border)' }}>
                  <span style={{ fontSize:'0.8rem',color:'var(--muted)',fontWeight:500 }}>{k}</span>
                  <span style={{ fontSize:'0.8rem',fontWeight:600 }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop:'0.875rem' }}>
                <p style={{ fontSize:'0.72rem',color:'var(--muted)',fontWeight:700,textTransform:'uppercase',marginBottom:'0.4rem' }}>Tratamiento</p>
                <p style={{ fontSize:'0.82rem',lineHeight:1.6,background:'var(--bg)',borderRadius:'0.4rem',padding:'0.75rem' }}>{selected.tratamiento}</p>
              </div>
              <div style={{ marginTop:'0.75rem' }}>
                <p style={{ fontSize:'0.72rem',color:'var(--muted)',fontWeight:700,textTransform:'uppercase',marginBottom:'0.4rem' }}>Observaciones</p>
                <p style={{ fontSize:'0.82rem',lineHeight:1.6,color:'var(--muted)' }}>{selected.observaciones}</p>
              </div>
            </div>
          ) : (
            <div style={{ display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:280,color:'var(--muted)' }}>
              <FileText size={44} style={{ marginBottom:'0.75rem',opacity:0.2 }} />
              <p style={{ fontWeight:600 }}>Selecciona una consulta</p>
              <p style={{ fontSize:'0.82rem' }}>para ver el detalle</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TabNotificaciones() {
  const [notifs, setNotifs] = useState(NOTIFICACIONES_INIT)
  const marcarTodas = () => setNotifs(prev=>prev.map(n=>({...n,leida:true})))
  const marcarLeida = (id:number) => setNotifs(prev=>prev.map(n=>n.id===id?{...n,leida:true}:n))
  const tipoIcon: Record<string,string> = { cita:'📅', triaje:'🩺', recuerdo:'⏰', sistema:'🔔' }
  const noLeidas = notifs.filter(n=>!n.leida).length
  return (
    <div style={{ maxWidth:620 }}>
      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem' }}>
        <div>
          <h3 style={{ fontWeight:700,fontSize:'0.9rem' }}>Notificaciones</h3>
          {noLeidas>0 && <p style={{ fontSize:'0.78rem',color:'var(--sky)',fontWeight:600,marginTop:'0.15rem' }}>{noLeidas} sin leer</p>}
        </div>
        {noLeidas>0 && <button onClick={marcarTodas} style={{ padding:'0.4rem 0.875rem',border:'1px solid var(--border)',borderRadius:'0.4rem',background:'white',cursor:'pointer',fontSize:'0.78rem',color:'var(--muted)' }}>Marcar todas como leídas</button>}
      </div>
      <div style={{ display:'flex',flexDirection:'column',gap:'0.6rem' }}>
        {notifs.map(n=>(
          <div key={n.id} className="card" style={{ background:n.leida?'var(--bg)':'white',border:n.leida?'1px solid var(--border)':'1px solid #BAE6FD',opacity:n.leida?0.75:1 }}>
            <div style={{ display:'flex',gap:'0.75rem',alignItems:'flex-start' }}>
              <span style={{ fontSize:'1.2rem',flexShrink:0,marginTop:'0.1rem' }}>{tipoIcon[n.tipo]||'🔔'}</span>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex',justifyContent:'space-between',marginBottom:'0.2rem' }}>
                  <span style={{ fontWeight:n.leida?500:700,fontSize:'0.875rem' }}>{n.titulo}</span>
                  <span style={{ fontSize:'0.72rem',color:'var(--muted)',flexShrink:0 }}>{n.fecha}</span>
                </div>
                <p style={{ fontSize:'0.82rem',color:'var(--muted)',lineHeight:1.5 }}>{n.mensaje}</p>
              </div>
              {!n.leida && <button onClick={()=>marcarLeida(n.id)} style={{ flexShrink:0,padding:'0.25rem',background:'none',border:'none',cursor:'pointer',color:'var(--sky)' }} title="Marcar como leída"><Check size={16} /></button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TabPerfil() {
  const [nombre,  setNombre]   = useState('María')
  const [apellido,setApellido] = useState('García López')
  const [dni,     setDni]      = useState('12345678')
  const [tel,     setTel]      = useState('987-654-321')
  const [email,   setEmail]    = useState('paciente@hospital.pe')
  const [nacimiento, setNac]   = useState('1983-03-15')
  const [direccion, setDir]    = useState('Av. Los Olivos 245, San Isidro')
  const [saved,   setSaved]    = useState(false)

  const handleSave = async () => {
    setSaved(false)
    await new Promise(r=>setTimeout(r,700))
    setSaved(true)
    setTimeout(()=>setSaved(false),3000)
  }

  return (
    <div style={{ maxWidth:600 }}>
      {saved && (
        <div style={{ display:'flex',alignItems:'center',gap:'0.5rem',background:'#DCFCE7',border:'1px solid #BBF7D0',borderRadius:'0.5rem',padding:'0.75rem 1rem',marginBottom:'1.25rem',color:'#15803D',fontSize:'0.875rem' }}>
          <Check size={16} /> Perfil actualizado correctamente
        </div>
      )}
      <div className="card" style={{ marginBottom:'1rem' }}>
        <div style={{ display:'flex',alignItems:'center',gap:'1rem',marginBottom:'1.25rem',paddingBottom:'1rem',borderBottom:'1px solid var(--border)' }}>
          <div style={{ width:64,height:64,borderRadius:'50%',background:'var(--sky)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:800,fontSize:'1.5rem' }}>M</div>
          <div><h3 style={{ fontWeight:700 }}>{nombre} {apellido}</h3><p style={{ fontSize:'0.8rem',color:'var(--muted)' }}>Paciente · DNI {dni}</p></div>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.875rem',marginBottom:'0.875rem' }}>
          <div><label>Nombre</label><input value={nombre} onChange={e=>setNombre(e.target.value)} /></div>
          <div><label>Apellido</label><input value={apellido} onChange={e=>setApellido(e.target.value)} /></div>
          <div><label>DNI</label><input value={dni} onChange={e=>setDni(e.target.value)} maxLength={8} /></div>
          <div><label>Teléfono</label><input value={tel} onChange={e=>setTel(e.target.value)} /></div>
          <div><label>Correo electrónico</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
          <div><label>Fecha de nacimiento</label><input type="date" value={nacimiento} onChange={e=>setNac(e.target.value)} /></div>
        </div>
        <div><label>Dirección</label><input value={direccion} onChange={e=>setDir(e.target.value)} /></div>
      </div>
      <button className="btn-primary" onClick={handleSave}><Check size={16} /> Guardar cambios</button>
    </div>
  )
}

export default function PacienteDashboard() {
  const [tab,setTab] = useState('panel')
  const titles: Record<string,string> = { panel:'Mi Panel',citas:'Mis Citas',nueva:'Solicitar Cita',triaje:'Triaje Digital',historial:'Mi Historial Clínico',notif:'Notificaciones',perfil:'Mi Perfil' }
  return (
    <SidebarLayout title={titles[tab]} role="paciente" userName="María García López" navItems={nav} activeTab={tab} onTabChange={setTab}>
      {tab==='panel'     && <TabPanel onNav={setTab} />}
      {tab==='citas'     && <TabCitas />}
      {tab==='nueva'     && <TabNuevaCita />}
      {tab==='triaje'    && <TabTriaje />}
      {tab==='historial' && <TabHistorial />}
      {tab==='notif'     && <TabNotificaciones />}
      {tab==='perfil'    && <TabPerfil />}
    </SidebarLayout>
  )
}
