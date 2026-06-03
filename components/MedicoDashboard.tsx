'use client'
import { useState } from 'react'
import SidebarLayout from './SidebarLayout'
import { LayoutDashboard, Calendar, Users, ClipboardList, MessageSquare, FileText, AlertTriangle, CheckCircle2, Clock, ChevronRight, Check, Search, Send, X, Stethoscope, User } from 'lucide-react'

const nav = [
  { icon: LayoutDashboard, label: 'Mi Agenda',       key: 'agenda'    },
  { icon: Users,           label: 'Mis Pacientes',   key: 'pacientes' },
  { icon: ClipboardList,   label: 'Triajes',         key: 'triajes'   },
  { icon: FileText,        label: 'Historial',       key: 'historial' },
  { icon: MessageSquare,   label: 'Mensajes',        key: 'mensajes'  },
]

const AGENDA = [
  { id: 1, hora: '08:00', paciente: 'María García López',  edad: 42, motivo: 'Dolor en el pecho',      prioridad: 'alta',    estado: 'pendiente',  triaje: { sintomas: 'Dolor opresivo pecho 7/10, dificultad respirar', duracion: '2 horas',  intensidad: 8, factores: ['Hipertensión','Fumador'],       prioridad: 'alta'    } },
  { id: 2, hora: '08:30', paciente: 'José Mamani Quispe',  edad: 67, motivo: 'Control de diabetes',    prioridad: 'media',   estado: 'pendiente',  triaje: { sintomas: 'Hiperglucemia, sed excesiva, mareos ocasionales', duracion: '3 días',   intensidad: 5, factores: ['Diabetes tipo 2'],             prioridad: 'media'   } },
  { id: 3, hora: '09:00', paciente: 'Luis Huanca Torres',  edad: 55, motivo: 'Cefalea severa',         prioridad: 'critica', estado: 'atendiendo', triaje: { sintomas: 'Cefalea intensa 9/10, vómitos, confusión temporal', duracion: '4 horas',  intensidad: 9, factores: ['Hipertensión','ACV previo'],     prioridad: 'critica' } },
  { id: 4, hora: '09:30', paciente: 'Carmen Zárate Vega',  edad: 28, motivo: 'Revisión general',      prioridad: 'baja',    estado: 'pendiente',  triaje: { sintomas: 'Fatiga leve, sin fiebre, buen estado general',   duracion: '1 semana', intensidad: 2, factores: [],                              prioridad: 'baja'    } },
  { id: 5, hora: '10:00', paciente: 'Ana Torres Quispe',   edad: 35, motivo: 'Palpitaciones',         prioridad: 'alta',    estado: 'pendiente',  triaje: { sintomas: 'Palpitaciones irregulares, sudoración fría',    duracion: '30 min',   intensidad: 7, factores: ['Ansiedad'],                    prioridad: 'alta'    } },
  { id: 6, hora: '10:30', paciente: 'Pedro Cáceres Lima',  edad: 60, motivo: 'Seguimiento post-op',   prioridad: 'media',   estado: 'completada', triaje: { sintomas: 'Dolor moderado en zona operada, buena evolución', duracion: '1 semana', intensidad: 4, factores: ['Post-operatorio'],             prioridad: 'media'   } },
]

const PACIENTES_LIST = [
  { id: 1, nombre: 'María García López', edad: 42, dni: '12345678', tel: '987-654-321', diagnostico: 'Hipertensión arterial estadio I', ultimaCita: '2025-05-28', proxCita: '2025-06-10', estado: 'Activo',   consultas: 3 },
  { id: 2, nombre: 'José Mamani Quispe', edad: 67, dni: '23456789', tel: '987-111-222', diagnostico: 'Diabetes Mellitus tipo 2',         ultimaCita: '2025-05-20', proxCita: '2025-06-20', estado: 'Activo',   consultas: 7 },
  { id: 3, nombre: 'Luis Huanca Torres', edad: 55, dni: '45678901', tel: '987-555-666', diagnostico: 'Cefalea tensional recurrente',      ultimaCita: '2025-06-01', proxCita: '2025-06-09', estado: 'Activo',   consultas: 2 },
  { id: 4, nombre: 'Carmen Zárate Vega', edad: 28, dni: '56789012', tel: '987-777-888', diagnostico: 'Control preventivo anual',          ultimaCita: '2025-04-10', proxCita: null,          estado: 'Activo',   consultas: 1 },
  { id: 5, nombre: 'Ana Torres Quispe',  edad: 35, dni: '67890123', tel: '987-999-000', diagnostico: 'Taquicardia supraventricular',      ultimaCita: '2025-03-15', proxCita: '2025-06-10', estado: 'Inactivo', consultas: 4 },
]

const TRIAJES_LIST = [
  { id: 1, paciente: 'María García López', hora: '08:00', prioridad: 'alta',    sintomas: 'Dolor opresivo en pecho, dificultad para respirar', intensidad: 8, duracion: '2 horas',  factores: ['Hipertensión','Fumador'],    revisado: false },
  { id: 2, paciente: 'José Mamani Quispe', hora: '08:30', prioridad: 'media',   sintomas: 'Hiperglucemia, sed excesiva, mareos ocasionales',   intensidad: 5, duracion: '3 días',   factores: ['Diabetes tipo 2'],          revisado: false },
  { id: 3, paciente: 'Luis Huanca Torres', hora: '09:00', prioridad: 'critica', sintomas: 'Cefalea intensa, vómitos, confusión temporal',       intensidad: 9, duracion: '4 horas',  factores: ['Hipertensión','ACV previo'], revisado: true  },
  { id: 4, paciente: 'Carmen Zárate Vega', hora: '09:30', prioridad: 'baja',    sintomas: 'Fatiga leve, sin fiebre',                           intensidad: 2, duracion: '1 semana', factores: [],                           revisado: false },
  { id: 5, paciente: 'Ana Torres Quispe',  hora: '10:00', prioridad: 'alta',    sintomas: 'Palpitaciones irregulares, sudoración fría',         intensidad: 7, duracion: '30 min',   factores: ['Ansiedad'],                 revisado: false },
]

const HISTORIAL_MEDICO = [
  { id: 1, fecha: '2025-05-28', paciente: 'María García López', diagnostico: 'Hipertensión arterial estadio I',   tratamiento: 'Losartán 50mg/día. Dieta baja en sodio. Actividad física moderada.',          obs: 'PA: 145/92 mmHg. Holter solicitado. Control en 3 meses.' },
  { id: 2, fecha: '2025-05-20', paciente: 'José Mamani Quispe', diagnostico: 'Diabetes Mellitus tipo 2 — control', tratamiento: 'Metformina 850mg c/12h. Dieta hipoglucémica. Glucómetro en casa.',             obs: 'HbA1c: 7.8%. Mejora leve respecto a control anterior.' },
  { id: 3, fecha: '2025-06-01', paciente: 'Luis Huanca Torres', diagnostico: 'Cefalea tensional severa',           tratamiento: 'Ibuprofeno 600mg c/8h por 5 días. Reposo. Evitar pantallas.',                  obs: 'Derivado a neurología para seguimiento. TAC pendiente.' },
  { id: 4, fecha: '2025-04-10', paciente: 'Carmen Zárate Vega', diagnostico: 'Paciente sana — control anual',      tratamiento: 'No requiere tratamiento. Continuar hábitos saludables. Próximo control en 1 año.', obs: 'Examen físico normal. Exámenes de laboratorio normales.' },
  { id: 5, fecha: '2025-03-15', paciente: 'Ana Torres Quispe',  diagnostico: 'Taquicardia supraventricular',       tratamiento: 'Metoprolol 25mg/día. Holter 24h. Evitar cafeína y estrés.',                    obs: 'ECG con episodios de TSV. Derivada a arritmias.' },
]

const MENSAJES_INIT = [
  { id: 1, paciente: 'María García López', avatar: 'M', hora: '08:45', msg: 'Doctor, ¿debo tomar el Losartán en ayunas o con comida?',               leido: false, resp: '' },
  { id: 2, paciente: 'José Mamani Quispe', avatar: 'J', hora: '07:30', msg: 'Mi glucosa en ayunas fue 180 mg/dL esta mañana. ¿Es muy alta?',           leido: true,  resp: 'Sí, está elevada. Evite carbohidratos refinados hoy y mida nuevamente en 2 horas después del desayuno.' },
  { id: 3, paciente: 'Ana Torres Quispe',  avatar: 'A', hora: 'Ayer',  msg: 'Tuve otra crisis de palpitaciones anoche, duró 10 minutos y me asusté.', leido: false, resp: '' },
  { id: 4, paciente: 'Carmen Zárate Vega', avatar: 'C', hora: 'Ayer',  msg: 'Muchas gracias doctor, me sentí muy bien atendida en mi última visita.',  leido: true,  resp: 'Con gusto, cualquier duda no dude en escribirme.' },
]

const prioColor: Record<string, string> = { critica: '#B91C1C', alta: '#B45309', media: '#1D4ED8', baja: '#15803D' }
const prioLabel: Record<string, string> = { critica: 'CRÍTICA', alta: 'ALTA', media: 'MEDIA', baja: 'BAJA' }

function TabAgenda() {
  const [selected, setSelected] = useState<typeof AGENDA[0] | null>(null)
  const [obs, setObs]   = useState('')
  const [diag, setDiag] = useState('')
  const [trat, setTrat] = useState('')
  const [saved, setSaved] = useState<number[]>([])

  const handleSave = () => {
    if (selected) { setSaved(p => [...p, selected.id]); setSelected(null); setObs(''); setDiag(''); setTrat('') }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.9rem' }}>Pacientes de Hoy — {AGENDA.length} citas</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{new Date().toLocaleDateString('es-PE')}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {AGENDA.map(a => {
            const isSelected = selected?.id === a.id
            const isDone = saved.includes(a.id) || a.estado === 'completada'
            return (
              <div key={a.id} onClick={() => !isDone && setSelected(isSelected ? null : a)}
                className="card"
                style={{ cursor: isDone ? 'default' : 'pointer', border: isSelected ? '2px solid var(--sky)' : '1px solid var(--border)', background: isDone ? '#F8FAFC' : 'white', opacity: isDone ? 0.65 : 1, transition: 'all 0.15s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <Clock size={13} color="var(--muted)" />
                      <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{a.hora}</span>
                      <span className={`badge badge-${a.prioridad}`}>{prioLabel[a.prioridad]}</span>
                      {isDone && <span className="badge badge-success">✓ Atendido</span>}
                    </div>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.15rem' }}>{a.paciente}</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{a.motivo} · {a.edad} años</p>
                  </div>
                  {!isDone && <ChevronRight size={16} color="var(--muted)" />}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        {selected ? (
          <div>
            <div className="card" style={{ marginBottom: '1rem', border: `2px solid ${prioColor[selected.prioridad]}20`, background: `${prioColor[selected.prioridad]}06` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h3 style={{ fontWeight: 800, fontSize: '1rem' }}>{selected.paciente}</h3>
                <span className={`badge badge-${selected.prioridad}`}>Prioridad {prioLabel[selected.prioridad]}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>Cita: {selected.hora} · {selected.edad} años · Motivo: {selected.motivo}</p>
              <div style={{ background: 'white', borderRadius: '0.5rem', padding: '0.875rem', border: '1px solid var(--border)', marginBottom: '0.75rem' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Resultado del Triaje</p>
                <p style={{ fontSize: '0.82rem', marginBottom: '0.4rem' }}><strong>Síntomas:</strong> {selected.triaje.sintomas}</p>
                <p style={{ fontSize: '0.82rem', marginBottom: '0.4rem' }}><strong>Duración:</strong> {selected.triaje.duracion} · <strong>Intensidad:</strong> {selected.triaje.intensidad}/10</p>
                {selected.triaje.factores.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                    {selected.triaje.factores.map(f => <span key={f} style={{ background: '#FEF3C7', color: '#B45309', fontSize: '0.7rem', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontWeight: 600 }}>{f}</span>)}
                  </div>
                )}
              </div>
              {selected.prioridad === 'critica' && (
                <div style={{ display: 'flex', gap: '0.5rem', background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '0.4rem', padding: '0.6rem', alignItems: 'center' }}>
                  <AlertTriangle size={15} color="#B91C1C" />
                  <span style={{ fontSize: '0.78rem', color: '#B91C1C', fontWeight: 600 }}>Paciente con prioridad CRÍTICA. Atención inmediata recomendada.</span>
                </div>
              )}
            </div>
            <div className="card">
              <h4 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.875rem' }}>Registrar Consulta</h4>
              <div style={{ marginBottom: '0.75rem' }}><label>Diagnóstico</label><input value={diag} onChange={e => setDiag(e.target.value)} placeholder="Ej: Hipertensión arterial estadio II" /></div>
              <div style={{ marginBottom: '0.75rem' }}><label>Observaciones</label><textarea value={obs} onChange={e => setObs(e.target.value)} rows={2} placeholder="Observaciones clínicas..." style={{ resize: 'vertical' }} /></div>
              <div style={{ marginBottom: '1rem' }}><label>Tratamiento indicado</label><textarea value={trat} onChange={e => setTrat(e.target.value)} rows={2} placeholder="Medicación, indicaciones, próxima cita..." style={{ resize: 'vertical' }} /></div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-primary" onClick={handleSave} style={{ flex: 1, justifyContent: 'center' }}><CheckCircle2 size={16} /> Finalizar Consulta</button>
                <button className="btn-secondary" onClick={() => setSelected(null)}>Cancelar</button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 400, color: 'var(--muted)' }}>
            <ClipboardList size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
            <p style={{ fontWeight: 600 }}>Selecciona un paciente</p>
            <p style={{ fontSize: '0.85rem' }}>para ver el triaje y registrar la consulta</p>
          </div>
        )}
      </div>
    </div>
  )
}

function TabPacientes() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<typeof PACIENTES_LIST[0] | null>(null)
  const filtered = PACIENTES_LIST.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) || p.dni.includes(search)
  )
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
      <div>
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nombre o DNI..." style={{ paddingLeft: '2.25rem' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {filtered.map(p => (
            <div key={p.id} className="card" onClick={() => setSelected(selected?.id === p.id ? null : p)}
              style={{ cursor: 'pointer', border: selected?.id === p.id ? '2px solid var(--sky)' : '1px solid var(--border)', transition: 'all 0.15s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>
                    {p.nombre.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{p.nombre}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{p.edad} años · DNI {p.dni}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--sky)', fontWeight: 600, marginTop: '0.15rem' }}>{p.consultas} consultas</p>
                  </div>
                </div>
                <span className={`badge ${p.estado === 'Activo' ? 'badge-success' : 'badge-cancel'}`}>{p.estado}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        {selected ? (
          <div className="card" style={{ border: '2px solid var(--sky-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.4rem' }}>
                {selected.nombre.charAt(0)}
              </div>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: '1rem' }}>{selected.nombre}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{selected.edad} años · {selected.estado}</p>
              </div>
            </div>
            {[['DNI', selected.dni], ['Teléfono', selected.tel], ['Diagnóstico principal', selected.diagnostico], ['Última cita', selected.ultimaCita], ['Próxima cita', selected.proxCita || 'No programada'], ['Total consultas', `${selected.consultas} consultas`]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 500 }}>{k}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, maxWidth: '55%', textAlign: 'right' }}>{v}</span>
              </div>
            ))}
            <button className="btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}><FileText size={15} /> Ver historial completo</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 350, color: 'var(--muted)' }}>
            <User size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
            <p style={{ fontWeight: 600 }}>Selecciona un paciente</p>
            <p style={{ fontSize: '0.85rem' }}>para ver su ficha clínica</p>
          </div>
        )}
      </div>
    </div>
  )
}

function TabTriajes() {
  const [triajes, setTriajes] = useState(TRIAJES_LIST)
  const [selected, setSelected] = useState<typeof TRIAJES_LIST[0] | null>(null)

  const marcarRevisado = (id: number) => {
    setTriajes(prev => prev.map(t => t.id === id ? { ...t, revisado: true } : t))
    setSelected(null)
  }

  const pendientes = triajes.filter(t => !t.revisado)
  const revisados  = triajes.filter(t => t.revisado)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.9rem' }}>Triajes de hoy</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span style={{ background: '#FEF3C7', color: '#B45309', fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: 9999, fontWeight: 700 }}>{pendientes.length} pendientes</span>
            <span style={{ background: '#DCFCE7', color: '#15803D', fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: 9999, fontWeight: 700 }}>{revisados.length} revisados</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {triajes.map(t => (
            <div key={t.id} className="card" onClick={() => setSelected(selected?.id === t.id ? null : t)}
              style={{ cursor: 'pointer', border: selected?.id === t.id ? '2px solid var(--sky)' : '1px solid var(--border)', opacity: t.revisado ? 0.6 : 1, transition: 'all 0.15s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{t.hora}</span>
                    <span className={`badge badge-${t.prioridad}`}>{prioLabel[t.prioridad]}</span>
                    {t.revisado && <span className="badge badge-success">✓ Revisado</span>}
                  </div>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{t.paciente}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.15rem' }}>Intensidad: {t.intensidad}/10 · {t.duracion}</p>
                </div>
                <ChevronRight size={16} color="var(--muted)" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        {selected ? (
          <div className="card" style={{ border: `2px solid ${prioColor[selected.prioridad]}30` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 800 }}>{selected.paciente}</h3>
              <span className={`badge badge-${selected.prioridad}`}>{prioLabel[selected.prioridad]}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ background: 'var(--bg)', borderRadius: '0.5rem', padding: '0.875rem' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Síntomas reportados</p>
                <p style={{ fontSize: '0.85rem' }}>{selected.sintomas}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div style={{ background: 'var(--bg)', borderRadius: '0.5rem', padding: '0.75rem' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Intensidad</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: prioColor[selected.prioridad] }}>{selected.intensidad}<span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>/10</span></p>
                </div>
                <div style={{ background: 'var(--bg)', borderRadius: '0.5rem', padding: '0.75rem' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Duración</p>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>{selected.duracion}</p>
                </div>
              </div>
              {selected.factores.length > 0 && (
                <div style={{ background: '#FEF3C7', borderRadius: '0.5rem', padding: '0.75rem' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#B45309', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Factores de riesgo</p>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {selected.factores.map(f => <span key={f} style={{ background: 'white', color: '#B45309', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '0.25rem', fontWeight: 600 }}>{f}</span>)}
                  </div>
                </div>
              )}
            </div>
            {!selected.revisado && (
              <button className="btn-primary" onClick={() => marcarRevisado(selected.id)} style={{ width: '100%', justifyContent: 'center' }}>
                <Check size={16} /> Marcar como revisado
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 350, color: 'var(--muted)' }}>
            <Stethoscope size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
            <p style={{ fontWeight: 600 }}>Selecciona un triaje</p>
            <p style={{ fontSize: '0.85rem' }}>para revisar los detalles</p>
          </div>
        )}
      </div>
    </div>
  )
}

function TabHistorial() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<typeof HISTORIAL_MEDICO[0] | null>(null)
  const filtered = HISTORIAL_MEDICO.filter(h =>
    h.paciente.toLowerCase().includes(search.toLowerCase()) || h.diagnostico.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div>
      <div style={{ position: 'relative', maxWidth: 380, marginBottom: '1rem' }}>
        <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar en historial..." style={{ paddingLeft: '2.25rem' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {filtered.map(h => (
            <div key={h.id} className="card" onClick={() => setSelected(selected?.id === h.id ? null : h)}
              style={{ cursor: 'pointer', border: selected?.id === h.id ? '2px solid var(--sky)' : '1px solid var(--border)', transition: 'all 0.15s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{h.fecha}</span>
                <span style={{ fontSize: '0.72rem', background: 'var(--sky-light)', color: 'var(--sky-dark)', padding: '0.1rem 0.5rem', borderRadius: 9999, fontWeight: 600 }}>{h.paciente.split(' ')[0]}</span>
              </div>
              <p style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.15rem' }}>{h.diagnostico}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{h.paciente}</p>
            </div>
          ))}
        </div>
        <div>
          {selected ? (
            <div className="card" style={{ border: '2px solid var(--sky-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Consulta registrada</p>
                  <p style={{ fontWeight: 800, fontSize: '1rem' }}>{selected.diagnostico}</p>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex' }}><X size={18} /></button>
              </div>
              {[['Fecha', selected.fecha], ['Paciente', selected.paciente]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 500 }}>{k}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: '0.875rem' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>Tratamiento indicado</p>
                <p style={{ fontSize: '0.82rem', lineHeight: 1.6, background: 'var(--bg)', borderRadius: '0.4rem', padding: '0.75rem' }}>{selected.tratamiento}</p>
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>Observaciones</p>
                <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--muted)' }}>{selected.obs}</p>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300, color: 'var(--muted)' }}>
              <FileText size={44} style={{ marginBottom: '0.75rem', opacity: 0.2 }} />
              <p style={{ fontWeight: 600 }}>Selecciona una consulta</p>
              <p style={{ fontSize: '0.82rem' }}>para ver el detalle</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TabMensajes() {
  const [mensajes, setMensajes] = useState(MENSAJES_INIT)
  const [selected, setSelected] = useState<typeof MENSAJES_INIT[0] | null>(null)
  const [respuesta, setRespuesta] = useState('')

  const noLeidos = mensajes.filter(m => !m.leido).length

  const handleSelect = (m: typeof MENSAJES_INIT[0]) => {
    setMensajes(prev => prev.map(x => x.id === m.id ? { ...x, leido: true } : x))
    setSelected(m)
    setRespuesta(m.resp)
  }

  const handleEnviar = () => {
    if (!respuesta.trim() || !selected) return
    setMensajes(prev => prev.map(m => m.id === selected.id ? { ...m, resp: respuesta } : m))
    setSelected(prev => prev ? { ...prev, resp: respuesta } : null)
    setRespuesta('')
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.25rem' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.9rem' }}>Mensajes de pacientes</h3>
          {noLeidos > 0 && <span style={{ background: '#EF4444', color: 'white', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 9999, fontWeight: 700 }}>{noLeidos} nuevos</span>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {mensajes.map(m => (
            <div key={m.id} className="card" onClick={() => handleSelect(m)}
              style={{ cursor: 'pointer', border: selected?.id === m.id ? '2px solid var(--sky)' : '1px solid var(--border)', background: !m.leido ? 'white' : 'var(--bg)', transition: 'all 0.15s' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, flexShrink: 0 }}>
                  {m.avatar}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <span style={{ fontWeight: m.leido ? 500 : 700, fontSize: '0.85rem' }}>{m.paciente}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--muted)', flexShrink: 0, marginLeft: '0.5rem' }}>{m.hora}</span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.msg}</p>
                  {m.resp && <p style={{ fontSize: '0.72rem', color: 'var(--sky)', fontWeight: 600, marginTop: '0.2rem' }}>✓ Respondido</p>}
                </div>
                {!m.leido && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--sky)', flexShrink: 0, marginTop: 6 }} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        {selected ? (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 400 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
                {selected.avatar}
              </div>
              <div>
                <p style={{ fontWeight: 700 }}>{selected.paciente}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Mensaje recibido {selected.hora}</p>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
                <div style={{ background: 'var(--bg)', borderRadius: '0 0.75rem 0.75rem 0.75rem', padding: '0.75rem 1rem', border: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.55 }}>{selected.msg}</p>
                </div>
                <p style={{ fontSize: '0.68rem', color: 'var(--muted)', marginTop: '0.2rem', marginLeft: '0.2rem' }}>{selected.paciente}</p>
              </div>

              {selected.resp && (
                <div style={{ alignSelf: 'flex-end', maxWidth: '85%' }}>
                  <div style={{ background: 'var(--sky)', borderRadius: '0.75rem 0 0.75rem 0.75rem', padding: '0.75rem 1rem' }}>
                    <p style={{ fontSize: '0.85rem', color: 'white', lineHeight: 1.55 }}>{selected.resp}</p>
                  </div>
                  <p style={{ fontSize: '0.68rem', color: 'var(--muted)', marginTop: '0.2rem', textAlign: 'right', marginRight: '0.2rem' }}>Dr. Carlos Mendoza</p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                value={respuesta}
                onChange={e => setRespuesta(e.target.value)}
                placeholder="Escribe tu respuesta..."
                onKeyDown={e => e.key === 'Enter' && handleEnviar()}
                style={{ flex: 1 }}
              />
              <button className="btn-primary" onClick={handleEnviar} disabled={!respuesta.trim()} style={{ opacity: !respuesta.trim() ? 0.5 : 1, padding: '0.5rem 1rem' }}>
                <Send size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 350, color: 'var(--muted)' }}>
            <MessageSquare size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
            <p style={{ fontWeight: 600 }}>Selecciona un mensaje</p>
            <p style={{ fontSize: '0.85rem' }}>para leer y responder</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function MedicoDashboard() {
  const [tab, setTab] = useState('agenda')
  const titles: Record<string, string> = {
    agenda: 'Dr. Carlos Mendoza · Cardiología',
    pacientes: 'Mis Pacientes',
    triajes: 'Triajes del Día',
    historial: 'Historial de Consultas',
    mensajes: 'Mensajes',
  }
  return (
    <SidebarLayout title={titles[tab] || 'Mi Agenda'} role="medico" userName="Dr. Carlos Mendoza" navItems={nav} activeTab={tab} onTabChange={setTab}>
      {tab === 'agenda'    && <TabAgenda />}
      {tab === 'pacientes' && <TabPacientes />}
      {tab === 'triajes'   && <TabTriajes />}
      {tab === 'historial' && <TabHistorial />}
      {tab === 'mensajes'  && <TabMensajes />}
    </SidebarLayout>
  )
}
