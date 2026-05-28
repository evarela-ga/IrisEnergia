/* global React, Ic, PARKS, STATUS_META */
// Mantenimiento — Calendario + Órdenes de Trabajo

// Icons used only in this module (eye / pencil / trash / chevron small)
const _svgProps = { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
const EyeIcon    = (p = {}) => <svg {..._svgProps} {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>;
const PencilIcon = (p = {}) => <svg {..._svgProps} {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z"/></svg>;
const TrashIcon  = (p = {}) => <svg {..._svgProps} {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/><path d="M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14"/></svg>;
const ChevDownIcon = (p = {}) => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m6 9 6 6 6-6"/></svg>;

const TECHS = [
  { name: 'Carlos Ruiz',     init: 'CR' },
  { name: 'María López',     init: 'ML' },
  { name: 'Diego Fernández', init: 'DF' },
  { name: 'Lucía Herrera',   init: 'LH' },
  { name: 'Javier Torres',   init: 'JT' },
];

const WORK_ORDERS_SEED = [
  { id: 'OT-2026-001', title: 'Limpieza de paneles — strings 1 a 4',     inst: 'Bodega Los Aromos',       city: 'Colonia Caroya',        type: 'preventive', status: 'done',       tech: 'Carlos Ruiz',       techInit: 'CR', date: '10/04/2026', priority: 'low' },
  { id: 'OT-2026-002', title: 'Revisión inversor SG110CX',                inst: 'MetalCor Industries',     city: 'Córdoba Capital',       type: 'corrective', status: 'progress',   tech: 'María López',       techInit: 'ML', date: '18/04/2026', priority: 'high' },
  { id: 'OT-2026-003', title: 'Reemplazo panel dañado string 3',          inst: 'Agro San Marcos',         city: 'Jesús María',           type: 'corrective', status: 'pending',    tech: 'Carlos Ruiz',       techInit: 'CR', date: '22/04/2026', priority: 'high' },
  { id: 'OT-2026-004', title: 'Inspección conexiones DC',                 inst: 'Cooperativa Oncativo',    city: 'Oncativo',              type: 'preventive', status: 'pending',    tech: 'Diego Fernández',   techInit: 'DF', date: '23/04/2026', priority: 'medium' },
  { id: 'OT-2026-005', title: 'Actualización firmware Huawei',            inst: 'Lácteos Línea Dorada',    city: 'Río Primero',           type: 'preventive', status: 'scheduled',  tech: 'María López',       techInit: 'ML', date: '25/04/2026', priority: 'medium' },
  { id: 'OT-2026-006', title: 'Reparación sensor temperatura',            inst: 'Frigorífico del Centro',  city: 'Río Cuarto',            type: 'emergency',  status: 'done',       tech: 'Carlos Ruiz',       techInit: 'CR', date: '05/04/2026', priority: 'high' },
  { id: 'OT-2026-007', title: 'Verificación inyección a red',             inst: 'Comunidad Solar',         city: 'Alta Gracia',           type: 'preventive', status: 'pending',    tech: 'Diego Fernández',   techInit: 'DF', date: '28/04/2026', priority: 'low' },
  { id: 'OT-2026-008', title: 'Diagnóstico bajo rendimiento',             inst: 'Hotel Sierras',           city: 'Villa Carlos Paz',      type: 'corrective', status: 'progress',   tech: 'María López',       techInit: 'ML', date: '19/04/2026', priority: 'medium' },
];

const TYPE_META = {
  preventive: { label: 'Preventivo', color: '#0EA5E9', bg: 'rgba(14,165,233,0.12)', border: 'rgba(14,165,233,0.35)' },
  corrective: { label: 'Correctivo', color: '#F97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.35)' },
  emergency:  { label: 'Emergencia', color: '#EF4444', bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.4)' },
};
const STATUS_MT = {
  pending:   { label: 'Pendiente',   color: '#94A3B8', bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.3)' },
  scheduled: { label: 'Programada',  color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)',   border: 'rgba(14,165,233,0.3)' },
  progress:  { label: 'En Progreso', color: '#0EA5E9', bg: 'rgba(14,165,233,0.14)',  border: 'rgba(14,165,233,0.4)', pulse: true },
  done:      { label: 'Completada',  color: '#10B981', bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.35)' },
  cancelled: { label: 'Cancelada',   color: '#EF4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.25)' },
  overdue:   { label: 'Vencida',     color: '#F97316', bg: 'rgba(249,115,22,0.14)',  border: 'rgba(249,115,22,0.4)' },
};
const PRIORITY_META = {
  high:   { label: 'Alta',  color: '#EF4444' },
  medium: { label: 'Media', color: '#F59E0B' },
  low:    { label: 'Baja',  color: '#10B981' },
};

function MaintenanceScreen() {
  const [tab, setTab] = React.useState('orders');
  const [detail, setDetail] = React.useState(null);

  // CRUD state
  const [orders, setOrders] = React.useState(WORK_ORDERS_SEED);
  const [formState, setFormState] = React.useState(null); // { mode: 'create'|'edit', ot? }
  const [confirmDel, setConfirmDel] = React.useState(null); // ot
  const [toast, setToast] = React.useState(null); // { text, kind }

  const showToast = (text, kind = 'ok') => {
    setToast({ text, kind, id: Date.now() });
    setTimeout(() => setToast(null), 2800);
  };

  const handleSave = (data) => {
    if (formState?.mode === 'create') {
      // generate next id
      const maxN = orders.reduce((m, o) => {
        const n = parseInt((o.id.match(/(\d+)$/) || [0, 0])[1], 10);
        return n > m ? n : m;
      }, 0);
      const id = `OT-2026-${String(maxN + 1).padStart(3, '0')}`;
      const inst = PARKS.find(p => p.name === data.inst);
      const tech = TECHS.find(t => t.name === data.tech);
      const newOt = {
        id,
        title: data.title || data.description?.split('\n')[0]?.slice(0, 70) || 'Nueva orden de trabajo',
        description: data.description,
        inst: data.inst,
        city: inst?.city || '',
        type: data.type,
        status: 'pending',
        tech: data.tech,
        techInit: tech?.init || data.tech?.split(' ').map(n => n[0]).join('').slice(0, 2),
        date: data.date,
        priority: data.priority,
      };
      setOrders([newOt, ...orders]);
      showToast(`Orden ${id} creada`, 'ok');
    } else if (formState?.mode === 'edit') {
      const tech = TECHS.find(t => t.name === data.tech);
      const inst = PARKS.find(p => p.name === data.inst);
      setOrders(orders.map(o => o.id === formState.ot.id ? {
        ...o,
        title: data.title || o.title,
        description: data.description,
        inst: data.inst,
        city: inst?.city || o.city,
        type: data.type,
        tech: data.tech,
        techInit: tech?.init || o.techInit,
        date: data.date,
        priority: data.priority,
      } : o));
      showToast(`Orden ${formState.ot.id} actualizada`, 'ok');
    }
    setFormState(null);
  };

  const handleStatusChange = (ot, next) => {
    setOrders(orders.map(o => o.id === ot.id ? { ...o, status: next } : o));
    showToast(`${ot.id} → ${STATUS_MT[next].label}`, 'ok');
  };

  const handleDelete = (ot) => {
    setOrders(orders.filter(o => o.id !== ot.id));
    showToast(`Orden ${ot.id} eliminada`, 'del');
    setConfirmDel(null);
  };

  return (
    <div className="col gap-20">
      <div className="row items-end justify-between">
        <div>
          <div className="t-eyebrow" style={{ color: 'var(--solar-500)' }}>Operaciones</div>
          <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>Mantenimiento</h1>
        </div>
        <button className="btn btn-primary" onClick={() => setFormState({ mode: 'create' })}>
          <Ic.plus /> Nueva Orden
        </button>
      </div>

      {/* Tabs */}
      <div className="row gap-4" style={{ borderBottom: '1px solid rgba(148,163,184,0.12)' }}>
        {[{ id: 'calendar', label: 'Calendario' }, { id: 'orders', label: 'Órdenes de Trabajo' }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '12px 20px', background: 'transparent', border: 0, cursor: 'pointer',
            color: tab === t.id ? 'var(--solar-500)' : 'var(--text-2)',
            fontFamily: 'var(--f-display)', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            borderBottom: tab === t.id ? '2px solid var(--solar-500)' : '2px solid transparent',
            filter: tab === t.id ? 'drop-shadow(0 0 6px rgba(255,184,0,0.5))' : 'none',
          }}>{t.label}</button>
        ))}
      </div>

      {tab === 'calendar'
        ? <CalendarView onOpen={setDetail} />
        : <OrdersView
            orders={orders}
            onOpen={setDetail}
            onEdit={(ot) => setFormState({ mode: 'edit', ot })}
            onDelete={(ot) => setConfirmDel(ot)}
            onStatusChange={handleStatusChange}
            onCreate={() => setFormState({ mode: 'create' })}
          />}

      {detail && <OTDetailPanel ot={detail} onClose={() => setDetail(null)} />}
      {formState && <OTFormModal mode={formState.mode} ot={formState.ot} onClose={() => setFormState(null)} onSave={handleSave} />}
      {confirmDel && <ConfirmDeleteModal ot={confirmDel} onCancel={() => setConfirmDel(null)} onConfirm={() => handleDelete(confirmDel)} />}
      {toast && <Toast text={toast.text} kind={toast.kind} />}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalIn { from { opacity: 0; transform: translateY(12px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes toastIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

// ============================================================
// Calendar View
// ============================================================
function CalendarView({ onOpen }) {
  const [selectedDay, setSelectedDay] = React.useState(18);
  // April 2026: 30 days; Apr 1 2026 is a Wednesday → offset 3 (Mon-start)
  const firstOffset = 2; // Mon=0 ... Wed=2
  const daysInMonth = 30;

  // Events by day
  const eventsByDay = {
    5:  [{ ot: 'OT-2026-006', type: 'emergency',  title: 'Reparación sensor temperatura', inst: 'Frigorífico del Centro', tech: 'Carlos Ruiz',     time: '09:00' }],
    7:  [{ ot: 'OT-2026-P01', type: 'preventive', title: 'Inspección trimestral',         inst: 'Coop. V. María',         tech: 'Diego Fernández', time: '10:00' }],
    10: [{ ot: 'OT-2026-001', type: 'preventive', title: 'Limpieza de paneles',           inst: 'Bodega Los Aromos',      tech: 'Carlos Ruiz',     time: '08:30' }],
    12: [{ ot: 'OT-2026-P02', type: 'preventive', title: 'Inspección eléctrica',          inst: 'Tambos del Centro',      tech: 'María López',     time: '14:00' }],
    15: [{ ot: 'OT-2026-P03', type: 'preventive', title: 'Limpieza strings 5-8',          inst: 'Coop. Morteros',         tech: 'Diego Fernández', time: '09:00' },
         { ot: 'OT-2026-P04', type: 'corrective', title: 'Revisión breaker',              inst: 'TechHub Córdoba',        tech: 'Carlos Ruiz',     time: '15:00' }],
    18: [{ ot: 'OT-2026-002', type: 'corrective', title: 'Revisión inversor SG110CX',     inst: 'MetalCor Industries',    tech: 'María López',     time: '10:30' }],
    19: [{ ot: 'OT-2026-008', type: 'corrective', title: 'Diagnóstico bajo rendimiento',  inst: 'Hotel Sierras',          tech: 'María López',     time: '11:00' }],
    22: [{ ot: 'OT-2026-003', type: 'corrective', title: 'Reemplazo panel string 3',      inst: 'Agro San Marcos',        tech: 'Carlos Ruiz',     time: '09:30' }],
    23: [{ ot: 'OT-2026-004', type: 'preventive', title: 'Inspección conexiones DC',      inst: 'Coop. Oncativo',         tech: 'Diego Fernández', time: '14:00' }],
    25: [{ ot: 'OT-2026-005', type: 'preventive', title: 'Actualización firmware',        inst: 'Lácteos Línea Dorada',   tech: 'María López',     time: '10:00' }],
    28: [{ ot: 'OT-2026-007', type: 'preventive', title: 'Verificación inyección a red',  inst: 'Comunidad Solar',        tech: 'Diego Fernández', time: '13:30' }],
  };

  const today = 20; // "today" in the calendar
  const days = [];
  for (let i = 0; i < firstOffset; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const upcoming = Object.entries(eventsByDay)
    .filter(([d]) => parseInt(d) >= today)
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .slice(0, 6);

  const kpis = [
    { label: 'Programados este mes', value: 12, color: 'solar' },
    { label: 'Completados',          value: 7,  color: 'emerald' },
    { label: 'Pendientes',           value: 5,  color: 'cyan' },
    { label: 'Vencidos',             value: 1,  color: 'red' },
  ];

  return (
    <div className="col gap-20">
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {kpis.map(k => <KPISmall key={k.label} {...k} />)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16 }}>
        {/* Calendar */}
        <div className="card bracket" style={{ padding: 20 }}>
          <div className="row items-center justify-between mb-20">
            <div className="row items-center gap-12">
              <button className="btn btn-ghost btn-icon" style={{ transform: 'scaleX(-1)' }}><Ic.chevRight /></button>
              <div className="t-display" style={{ fontSize: 18, fontWeight: 600 }}>ABRIL 2026</div>
              <button className="btn btn-ghost btn-icon"><Ic.chevRight /></button>
            </div>
            <div className="row gap-8">
              <button className="chip active">Mes</button>
              <button className="chip">Semana</button>
              <button className="chip">Día</button>
            </div>
          </div>

          {/* Week headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 6 }}>
            {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map(d => (
              <div key={d} style={{
                textAlign: 'center', padding: '8px 0',
                fontFamily: 'var(--f-display)', fontSize: 10, letterSpacing: '0.16em',
                color: 'var(--text-3)',
              }}>{d}</div>
            ))}
          </div>

          {/* Days */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
            {days.map((d, i) => {
              if (d === null) return <div key={i} style={{ minHeight: 88 }} />;
              const events = eventsByDay[d] || [];
              const isToday = d === today;
              const isSel   = d === selectedDay;
              return (
                <button key={i} onClick={() => setSelectedDay(d)} style={{
                  minHeight: 88,
                  padding: '8px 8px 6px',
                  background: isSel ? 'linear-gradient(180deg, rgba(255,184,0,0.12), rgba(255,184,0,0.03))'
                            : isToday ? 'rgba(14,165,233,0.06)' : 'rgba(17,24,39,0.45)',
                  border: '1px solid ' + (isSel ? 'rgba(255,184,0,0.55)' : isToday ? 'rgba(14,165,233,0.35)' : 'rgba(148,163,184,0.08)'),
                  borderRadius: 8,
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: 'var(--text-0)',
                  boxShadow: isSel ? '0 0 18px rgba(255,184,0,0.18)' : 'none',
                  transition: 'all .15s',
                  display: 'flex', flexDirection: 'column', gap: 4,
                }}>
                  <div className="row items-center justify-between">
                    <span className="t-mono" style={{
                      fontSize: 13, fontWeight: isToday ? 700 : 500,
                      color: isToday ? 'var(--cyan-500)' : isSel ? 'var(--solar-500)' : 'var(--text-1)',
                    }}>{String(d).padStart(2, '0')}</span>
                    {isToday && <span className="t-mono" style={{ fontSize: 8, color: 'var(--cyan-500)', letterSpacing: '0.14em' }}>HOY</span>}
                  </div>
                  <div className="col gap-2" style={{ gap: 3 }}>
                    {events.slice(0, 2).map((e, idx) => (
                      <div key={idx} className="row items-center gap-4" style={{ fontSize: 9, color: 'var(--text-2)' }}>
                        <span style={{
                          width: 6, height: 6, borderRadius: '50%',
                          background: TYPE_META[e.type].color,
                          boxShadow: `0 0 5px ${TYPE_META[e.type].color}`,
                          flexShrink: 0,
                        }} />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.time}</span>
                      </div>
                    ))}
                    {events.length > 2 && (
                      <div style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'var(--f-mono)' }}>+{events.length - 2} más</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="row gap-20 mt-20" style={{ paddingTop: 14, borderTop: '1px solid rgba(148,163,184,0.08)' }}>
            <LegendDot color="#0EA5E9" label="Preventivo" />
            <LegendDot color="#F97316" label="Correctivo" />
            <LegendDot color="#EF4444" label="Emergencia" />
          </div>

          {/* Expanded day panel */}
          {selectedDay && eventsByDay[selectedDay] && (
            <div style={{
              marginTop: 16, padding: 16,
              background: 'linear-gradient(180deg, rgba(255,184,0,0.05), rgba(17,24,39,0.6))',
              border: '1px solid rgba(255,184,0,0.22)',
              borderRadius: 10,
              animation: 'fadeIn .25s ease-out',
            }}>
              <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }`}</style>
              <div className="row items-center justify-between mb-12">
                <div className="t-display" style={{ fontSize: 14, fontWeight: 600 }}>
                  {String(selectedDay).padStart(2, '0')} de abril · <span style={{ color: 'var(--text-2)' }}>{eventsByDay[selectedDay].length} mantenimiento(s)</span>
                </div>
                <button className="btn btn-outline btn-sm"><Ic.plus /> Agendar</button>
              </div>
              <div className="col gap-8">
                {eventsByDay[selectedDay].map((e, idx) => (
                  <DayEventRow key={idx} event={e} onOpen={() => {
                    const full = WORK_ORDERS.find(w => w.id === e.ot);
                    if (full) onOpen(full);
                  }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right rail: Próximos 7 días */}
        <aside className="card" style={{ padding: 18, alignSelf: 'start', position: 'sticky', top: 88 }}>
          <div className="row items-center justify-between mb-12">
            <div>
              <div className="t-eyebrow">Agenda</div>
              <div className="t-display" style={{ fontSize: 15, marginTop: 4, fontWeight: 600 }}>Próximos 7 días</div>
            </div>
          </div>
          <div className="col gap-10">
            {upcoming.map(([day, events]) => events.map((e, idx) => {
              const diff = parseInt(day) - today;
              const when = diff === 0 ? 'hoy' : diff === 1 ? 'mañana' : `en ${diff} días`;
              return (
                <div key={day + idx} style={{
                  padding: '10px 12px',
                  background: 'rgba(17,24,39,0.55)',
                  border: `1px solid ${TYPE_META[e.type].border}`,
                  borderLeft: `3px solid ${TYPE_META[e.type].color}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                }} onClick={() => {
                  const full = WORK_ORDERS.find(w => w.id === e.ot);
                  if (full) onOpen(full);
                }}>
                  <div className="row items-center justify-between mb-4">
                    <span className="t-mono" style={{ fontSize: 11, color: TYPE_META[e.type].color, fontWeight: 700, letterSpacing: '0.06em' }}>
                      {String(day).padStart(2, '0')}/04 · {e.time}
                    </span>
                    <span style={{
                      fontSize: 9, fontFamily: 'var(--f-mono)', fontWeight: 700,
                      color: diff <= 1 ? 'var(--solar-500)' : 'var(--text-2)',
                      padding: '1px 6px', borderRadius: 4,
                      background: diff <= 1 ? 'rgba(255,184,0,0.12)' : 'rgba(148,163,184,0.1)',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                    }}>{when}</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-0)' }}>{e.title}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-2)', marginTop: 2 }}>{e.inst}</div>
                  <div className="row items-center gap-4 mt-8">
                    <span style={{
                      width: 18, height: 18, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FFB800, #F59E0B)',
                      color: '#0A0E1A', fontSize: 8, fontWeight: 700,
                      display: 'grid', placeItems: 'center', fontFamily: 'var(--f-display)',
                    }}>{e.tech.split(' ').map(n => n[0]).join('')}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-2)' }}>{e.tech}</span>
                  </div>
                </div>
              );
            }))}
          </div>
          <button className="btn btn-ghost w-full mt-16" style={{ justifyContent: 'space-between', fontSize: 12 }}>
            Ver toda la agenda <Ic.chevRight />
          </button>
        </aside>
      </div>
    </div>
  );
}

function KPISmall({ label, value, color }) {
  const colorMap = { solar: 'var(--solar-500)', emerald: 'var(--emerald-500)', cyan: 'var(--cyan-500)', red: 'var(--red-500)' };
  return (
    <div className="card bracket" style={{ padding: 16 }}>
      <div className="t-eyebrow">{label}</div>
      <div className="t-display" style={{
        fontSize: 32, fontWeight: 700, marginTop: 8, lineHeight: 1,
        color: colorMap[color],
        textShadow: `0 0 16px ${colorMap[color]}99`,
      }}>{value}</div>
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <div className="row items-center gap-8">
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}` }} />
      <span style={{ fontSize: 11, color: 'var(--text-2)' }}>{label}</span>
    </div>
  );
}

function DayEventRow({ event, onOpen }) {
  const tm = TYPE_META[event.type];
  return (
    <div className="row items-center gap-12" style={{
      padding: '10px 12px',
      background: 'rgba(17,24,39,0.6)',
      border: '1px solid rgba(148,163,184,0.08)',
      borderLeft: `3px solid ${tm.color}`,
      borderRadius: 8,
    }}>
      <span className="t-mono" style={{ fontSize: 12, color: tm.color, fontWeight: 700, width: 48 }}>{event.time}</span>
      <div className="flex-1">
        <div className="row items-center gap-8">
          <span style={{
            fontSize: 9, fontFamily: 'var(--f-mono)', fontWeight: 700,
            padding: '2px 6px', borderRadius: 4,
            color: tm.color, background: tm.bg, border: `1px solid ${tm.border}`,
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>{tm.label}</span>
          <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)' }}>{event.ot}</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-0)', marginTop: 4, fontWeight: 500 }}>{event.title}</div>
        <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{event.inst} · {event.tech}</div>
      </div>
      <button className="btn btn-outline btn-sm" onClick={onOpen}>Ver</button>
    </div>
  );
}

// ============================================================
// Orders View
// ============================================================
function OrdersView({ orders, onOpen, onEdit, onDelete, onStatusChange, onCreate }) {
  const [status, setStatus] = React.useState('all');
  const [type, setType] = React.useState('all');
  const [q, setQ] = React.useState('');

  const filtered = orders.filter(o => {
    if (status !== 'all' && o.status !== status) return false;
    if (type !== 'all' && o.type !== type) return false;
    if (q && !(o.id + o.title + o.inst + o.tech).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="col gap-16">
      {/* Filter bar */}
      <div className="card" style={{ padding: 14 }}>
        <div className="row gap-12 items-center" style={{ flexWrap: 'wrap' }}>
          <div className="search-wrap" style={{ width: 260 }}>
            <span className="search-icon"><Ic.search /></span>
            <input className="input with-icon" placeholder="Buscar OT, instalación, técnico…" value={q} onChange={e => setQ(e.target.value)} />
          </div>
          <div className="row gap-6">
            {[
              { id: 'all',       label: 'Todas',       c: '#FFB800' },
              { id: 'pending',   label: 'Pendiente',   c: '#94A3B8' },
              { id: 'progress',  label: 'En Progreso', c: '#0EA5E9' },
              { id: 'done',      label: 'Completada',  c: '#10B981' },
              { id: 'overdue',   label: 'Vencida',     c: '#F97316' },
              { id: 'cancelled', label: 'Cancelada',   c: '#EF4444' },
            ].map(f => (
              <button key={f.id} className={`chip ${status === f.id ? 'active' : ''}`} onClick={() => setStatus(f.id)}>
                <span style={{ width: 6, height: 6, borderRadius: 50, background: f.c, boxShadow: `0 0 5px ${f.c}` }} />
                {f.label}
              </button>
            ))}
          </div>
          <span className="divider-v" style={{ height: 24 }} />
          <div className="row gap-6">
            {[
              { id: 'all', label: 'Todos los tipos', c: '#FFB800' },
              { id: 'preventive', label: 'Preventivo', c: '#0EA5E9' },
              { id: 'corrective', label: 'Correctivo', c: '#F97316' },
              { id: 'emergency',  label: 'Emergencia', c: '#EF4444' },
            ].map(f => (
              <button key={f.id} className={`chip ${type === f.id ? 'active' : ''}`} onClick={() => setType(f.id)}>
                <span style={{ width: 6, height: 6, borderRadius: 50, background: f.c, boxShadow: `0 0 5px ${f.c}` }} />
                {f.label}
              </button>
            ))}
          </div>
          <span className="flex-1" />
          <span className="t-mono" style={{ fontSize: 11, color: 'var(--text-2)' }}>{filtered.length}/{orders.length}</span>
        </div>
      </div>

      <div className="col gap-12">
        {filtered.length === 0 ? (
          <div className="card" style={{ padding: 40, textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: 'var(--text-2)' }}>No hay órdenes que coincidan con los filtros.</div>
          </div>
        ) : filtered.map(ot => (
          <OTCard
            key={ot.id}
            ot={ot}
            onOpen={() => onOpen(ot)}
            onEdit={() => onEdit(ot)}
            onDelete={() => onDelete(ot)}
            onStatusChange={(next) => onStatusChange(ot, next)}
          />
        ))}
      </div>
    </div>
  );
}

function OTCard({ ot, onOpen, onEdit, onDelete, onStatusChange }) {
  const tm = TYPE_META[ot.type];
  const sm = STATUS_MT[ot.status];
  const pm = PRIORITY_META[ot.priority];
  const [statusOpen, setStatusOpen] = React.useState(false);
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    if (!statusOpen) return;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setStatusOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [statusOpen]);

  // status transitions offered from the quick dropdown
  const STATUS_OPTIONS = ['pending', 'progress', 'done', 'cancelled'];

  return (
    <div className="card" style={{ padding: 18 }}>
      <div className="row items-center gap-16" style={{ flexWrap: 'wrap' }}>
        {/* OT number column */}
        <div style={{ flexShrink: 0, minWidth: 150 }}>
          <div className="t-mono" style={{
            fontSize: 13, fontWeight: 700, color: 'var(--solar-500)',
            textShadow: '0 0 10px rgba(255,184,0,0.5)',
            letterSpacing: '0.04em',
          }}>{ot.id}</div>
          <div className="row gap-6 mt-8" style={{ flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 9, fontFamily: 'var(--f-mono)', fontWeight: 700,
              padding: '2px 6px', borderRadius: 4,
              color: tm.color, background: tm.bg, border: `1px solid ${tm.border}`,
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>{tm.label}</span>

            {/* Inline status dropdown */}
            <div ref={wrapRef} style={{ position: 'relative' }}>
              <button
                onClick={(e) => { e.stopPropagation(); setStatusOpen(v => !v); }}
                style={{
                  fontSize: 9, fontFamily: 'var(--f-mono)', fontWeight: 700,
                  padding: '2px 6px', borderRadius: 4,
                  color: sm.color, background: sm.bg, border: `1px solid ${sm.border}`,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  textDecoration: ot.status === 'cancelled' ? 'line-through' : 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  cursor: 'pointer',
                  boxShadow: `0 0 0 0 ${sm.color}00`,
                  transition: 'box-shadow .15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 10px ${sm.color}55`}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                title="Cambiar estado"
              >
                {sm.pulse && <span style={{
                  width: 5, height: 5, borderRadius: '50%', background: sm.color,
                  boxShadow: `0 0 6px ${sm.color}`,
                  animation: 'pulseDim 1.2s ease-in-out infinite',
                }} />}
                {sm.label}
                <ChevDownIcon />
              </button>
              {statusOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 6px)', left: 0, minWidth: 150,
                  background: 'rgba(17,24,39,0.96)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,184,0,0.22)',
                  borderRadius: 8,
                  padding: 4,
                  boxShadow: '0 14px 32px rgba(0,0,0,0.55)',
                  zIndex: 50,
                  animation: 'modalIn .14s ease-out',
                }}>
                  {STATUS_OPTIONS.map(s => {
                    const m = STATUS_MT[s];
                    const active = s === ot.status;
                    return (
                      <button key={s} onClick={(e) => { e.stopPropagation(); setStatusOpen(false); if (!active) onStatusChange(s); }} style={{
                        display: 'flex', width: '100%', padding: '7px 10px',
                        alignItems: 'center', gap: 8,
                        background: active ? `${m.color}18` : 'transparent',
                        border: 0, borderRadius: 6, cursor: 'pointer',
                        fontFamily: 'var(--f-body)', fontSize: 11, fontWeight: 500,
                        color: active ? m.color : 'var(--text-1)',
                        textAlign: 'left',
                      }}
                      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'rgba(148,163,184,0.08)'; }}
                      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: m.color, boxShadow: `0 0 6px ${m.color}` }} />
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <style>{`@keyframes pulseDim { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }`}</style>
        </div>

        {/* Divider */}
        <span className="divider-v" style={{ height: 52 }} />

        {/* Main info */}
        <div className="flex-1" style={{ minWidth: 240 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-0)' }}>{ot.title}</div>
          <div className="row items-center gap-4 mt-4" style={{ fontSize: 11, color: 'var(--text-2)' }}>
            <Ic.pin /> <span>{ot.inst}, {ot.city}</span>
          </div>
        </div>

        {/* Technician */}
        <div className="col" style={{ minWidth: 140 }}>
          <div className="t-eyebrow">Técnico</div>
          <div className="row items-center gap-6 mt-6">
            <span style={{
              width: 24, height: 24, borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFB800, #F59E0B)',
              color: '#0A0E1A', fontSize: 10, fontWeight: 700,
              display: 'grid', placeItems: 'center', fontFamily: 'var(--f-display)',
              boxShadow: '0 0 8px rgba(255,184,0,0.35)',
            }}>{ot.techInit}</span>
            <span style={{ fontSize: 12, color: 'var(--text-0)', fontWeight: 500 }}>{ot.tech}</span>
          </div>
        </div>

        {/* Date */}
        <div className="col" style={{ minWidth: 100 }}>
          <div className="t-eyebrow">Programada</div>
          <div className="t-mono" style={{ fontSize: 13, color: 'var(--text-0)', fontWeight: 600, marginTop: 6 }}>{ot.date}</div>
        </div>

        {/* Priority */}
        <div className="col" style={{ minWidth: 80 }}>
          <div className="t-eyebrow">Prioridad</div>
          <div className="row items-center gap-6 mt-6">
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: pm.color, boxShadow: `0 0 6px ${pm.color}` }} />
            <span style={{ fontSize: 12, color: pm.color, fontWeight: 600 }}>{pm.label}</span>
          </div>
        </div>

        {/* Action icons */}
        <div className="row gap-4">
          <IconAction title="Ver detalle" color="#0EA5E9" onClick={onOpen}><EyeIcon /></IconAction>
          <IconAction title="Editar" color="#FFB800" onClick={onEdit}><PencilIcon /></IconAction>
          <IconAction title="Eliminar" color="#EF4444" onClick={onDelete}><TrashIcon /></IconAction>
        </div>
      </div>
    </div>
  );
}

function IconAction({ children, color, onClick, title }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 34, height: 34,
        display: 'grid', placeItems: 'center',
        background: hover ? `${color}18` : 'rgba(148,163,184,0.06)',
        border: `1px solid ${hover ? color + '55' : 'rgba(148,163,184,0.12)'}`,
        borderRadius: 8,
        color: hover ? color : 'var(--text-2)',
        cursor: 'pointer',
        transition: 'all .15s',
        boxShadow: hover ? `0 0 10px ${color}33` : 'none',
      }}>
      {children}
    </button>
  );
}

// ============================================================
// OT Detail panel (slide-in)
// ============================================================
function OTDetailPanel({ ot, onClose }) {
  const tm = TYPE_META[ot.type];
  const sm = STATUS_MT[ot.status];

  const timeline = [
    { step: 'Creada',       date: '02/04/2026 · 09:14', done: true  },
    { step: 'Asignada',     date: '02/04/2026 · 11:30', done: true  },
    { step: 'En progreso',  date: '18/04/2026 · 10:30', done: ot.status === 'progress' || ot.status === 'done' },
    { step: 'Completada',   date: ot.status === 'done' ? '—' : 'Pendiente', done: ot.status === 'done' },
  ];

  const checklist = [
    { t: 'Inspección visual general',   done: true  },
    { t: 'Medición de voltaje DC/AC',   done: true  },
    { t: 'Limpieza de superficie',      done: false },
    { t: 'Test de rendimiento',         done: false },
    { t: 'Registro fotográfico',        done: false },
  ];

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(5, 8, 16, 0.65)', backdropFilter: 'blur(4px)',
        animation: 'fadeIn .2s',
      }} />
      <aside style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 520,
        zIndex: 201,
        background: 'rgba(10,14,26,0.94)',
        backdropFilter: 'blur(20px) saturate(140%)',
        borderLeft: '1px solid rgba(255,184,0,0.22)',
        padding: '24px 26px 28px',
        overflowY: 'auto',
        animation: 'slideInR .3s ease-out',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
      }}>
        <style>{`@keyframes slideInR { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>

        <div className="row items-start justify-between mb-16">
          <div>
            <div className="t-eyebrow">Orden de Trabajo</div>
            <div className="t-display" style={{
              fontSize: 26, fontWeight: 700, marginTop: 4,
              color: 'var(--solar-500)',
              textShadow: '0 0 18px rgba(255,184,0,0.5)',
              letterSpacing: '0.02em',
            }}>{ot.id}</div>
            <div className="row gap-8 mt-10">
              <span style={{
                fontSize: 10, fontFamily: 'var(--f-mono)', fontWeight: 700,
                padding: '3px 8px', borderRadius: 4,
                color: tm.color, background: tm.bg, border: `1px solid ${tm.border}`,
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>{tm.label}</span>
              <span style={{
                fontSize: 10, fontFamily: 'var(--f-mono)', fontWeight: 700,
                padding: '3px 8px', borderRadius: 4,
                color: sm.color, background: sm.bg, border: `1px solid ${sm.border}`,
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>{sm.label}</span>
            </div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><Ic.close /></button>
        </div>

        <h3 className="t-display" style={{ fontSize: 17, fontWeight: 600, margin: '0 0 6px' }}>{ot.title}</h3>
        <div className="row items-center gap-6" style={{ color: 'var(--text-2)', fontSize: 12 }}>
          <Ic.pin /> {ot.inst}, {ot.city}
        </div>

        <hr className="divider mt-20" />

        {/* Timeline */}
        <div className="mt-20">
          <div className="t-eyebrow mb-12">Timeline</div>
          <div className="col" style={{ position: 'relative' }}>
            {timeline.map((t, i) => (
              <div key={i} className="row items-start gap-12" style={{ paddingBottom: i === timeline.length - 1 ? 0 : 16, position: 'relative' }}>
                {i < timeline.length - 1 && (
                  <span style={{
                    position: 'absolute', left: 7, top: 16, bottom: 0,
                    width: 1,
                    background: t.done ? 'linear-gradient(180deg, var(--solar-500), rgba(255,184,0,0.2))' : 'rgba(148,163,184,0.2)',
                  }} />
                )}
                <span style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: t.done ? 'var(--solar-500)' : 'rgba(148,163,184,0.2)',
                  border: t.done ? 'none' : '1px solid rgba(148,163,184,0.4)',
                  boxShadow: t.done ? '0 0 10px rgba(255,184,0,0.6)' : 'none',
                  flexShrink: 0,
                  marginTop: 2,
                  display: 'grid', placeItems: 'center',
                }}>
                  {t.done && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#0A0E1A' }} />}
                </span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.done ? 'var(--text-0)' : 'var(--text-2)' }}>{t.step}</div>
                  <div className="t-mono" style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{t.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="divider mt-20" />

        {/* Data grid */}
        <div className="mt-16">
          <div className="t-eyebrow mb-12">Datos</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <DataKV label="Instalación" value={ot.inst} />
            <DataKV label="Ubicación"   value={`${ot.city}, Córdoba`} />
            <DataKV label="Equipo"      value="Inversor Huawei SUN2000-100KTL" wide />
            <DataKV label="Técnico"     value={ot.tech} />
            <DataKV label="Programada"  value={ot.date} />
            <DataKV label="Prioridad"   value={PRIORITY_META[ot.priority].label} color={PRIORITY_META[ot.priority].color} />
            <DataKV label="Duración est." value="2 h 30 min" />
          </div>
        </div>

        <hr className="divider mt-20" />

        {/* Checklist */}
        <div className="mt-16">
          <div className="row items-center justify-between mb-12">
            <div className="t-eyebrow">Checklist de tareas</div>
            <span className="t-mono" style={{ fontSize: 11, color: 'var(--solar-500)', fontWeight: 600 }}>
              {checklist.filter(c => c.done).length}/{checklist.length}
            </span>
          </div>
          <div className="col gap-6">
            {checklist.map((c, i) => <ChecklistItem key={i} {...c} />)}
          </div>
          <div className="progress-bar mt-12">
            <span style={{ width: `${(checklist.filter(c => c.done).length / checklist.length) * 100}%` }} />
          </div>
        </div>

        <hr className="divider mt-20" />

        {/* Notes */}
        <div className="mt-16">
          <div className="t-eyebrow mb-12">Notas y comentarios</div>
          <textarea className="input" placeholder="Agregar comentario…" rows={3} style={{ resize: 'vertical', fontFamily: 'var(--f-body)' }} />
          <div style={{
            marginTop: 10, padding: 12,
            background: 'rgba(14,165,233,0.05)',
            border: '1px solid rgba(14,165,233,0.2)',
            borderRadius: 8,
          }}>
            <div className="row items-center gap-8 mb-4">
              <span style={{
                width: 20, height: 20, borderRadius: '50%',
                background: 'linear-gradient(135deg, #0EA5E9, #0284C7)',
                color: 'white', fontSize: 9, fontWeight: 700,
                display: 'grid', placeItems: 'center', fontFamily: 'var(--f-display)',
              }}>ML</span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>María López</span>
              <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)' }}>18/04 · 11:02</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-1)', lineHeight: 1.55 }}>
              Inversor responde correctamente pero se detecta caída en string 2. Se requiere segunda visita con multímetro de precisión.
            </div>
          </div>
        </div>

        <hr className="divider mt-20" />

        {/* Photos */}
        <div className="mt-16">
          <div className="row items-center justify-between mb-12">
            <div className="t-eyebrow">Registro fotográfico</div>
            <button className="btn btn-ghost btn-sm"><Ic.plus /> Agregar</button>
          </div>
          <div className="row gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                flex: 1, aspectRatio: '1 / 1',
                border: '1px dashed rgba(148,163,184,0.3)',
                borderRadius: 8,
                display: 'grid', placeItems: 'center',
                background: 'rgba(17,24,39,0.4)',
                color: 'var(--text-3)',
                fontSize: 10, fontFamily: 'var(--f-mono)', letterSpacing: '0.08em',
              }}>
                IMG-0{i}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="col gap-8 mt-24">
          <button className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>Marcar como completada</button>
          <div className="row gap-8">
            <button className="btn btn-outline flex-1" style={{ justifyContent: 'center' }}>Editar</button>
            <button className="btn btn-ghost flex-1" style={{ justifyContent: 'center', color: 'var(--red-500)' }}>Cancelar orden</button>
          </div>
        </div>
      </aside>
    </>
  );
}

function DataKV({ label, value, wide, color }) {
  return (
    <div style={{ gridColumn: wide ? 'span 2' : 'auto' }}>
      <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 13, color: color || 'var(--text-0)', fontWeight: 600, marginTop: 4 }}>{value}</div>
    </div>
  );
}

function ChecklistItem({ t, done }) {
  const [checked, setChecked] = React.useState(done);
  return (
    <label className="row items-center gap-10" style={{
      padding: '10px 12px',
      background: checked ? 'rgba(16,185,129,0.06)' : 'rgba(17,24,39,0.5)',
      border: '1px solid ' + (checked ? 'rgba(16,185,129,0.25)' : 'rgba(148,163,184,0.1)'),
      borderRadius: 8,
      cursor: 'pointer',
      transition: 'all .15s',
    }}>
      <span style={{
        width: 18, height: 18, borderRadius: 5,
        border: '1.5px solid ' + (checked ? 'var(--emerald-500)' : 'rgba(148,163,184,0.4)'),
        background: checked ? 'var(--emerald-500)' : 'transparent',
        display: 'grid', placeItems: 'center',
        flexShrink: 0,
        boxShadow: checked ? '0 0 8px rgba(16,185,129,0.5)' : 'none',
      }}>
        {checked && (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0A0E1A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5L20 7" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} style={{ display: 'none' }} />
      <span style={{
        fontSize: 13,
        color: checked ? 'var(--text-2)' : 'var(--text-0)',
        textDecoration: checked ? 'line-through' : 'none',
      }}>{t}</span>
    </label>
  );
}

Object.assign(window, { MaintenanceScreen });

// ============================================================
// Form Modal — Create / Edit
// ============================================================
function OTFormModal({ mode, ot, onClose, onSave }) {
  const isEdit = mode === 'edit';
  const today = new Date();
  const defaultDate = isEdit && ot?.date
    ? ot.date.split('/').reverse().join('-') // dd/mm/yyyy -> yyyy-mm-dd
    : `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const [form, setForm] = React.useState({
    inst: ot?.inst || PARKS[0].name,
    type: ot?.type || 'preventive',
    priority: ot?.priority || 'medium',
    tech: ot?.tech || TECHS[0].name,
    date: defaultDate,
    title: ot?.title || '',
    description: ot?.description || '',
  });

  React.useEffect(() => {
    const onEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [onClose]);

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = () => {
    if (!form.title.trim() && !form.description.trim()) return;
    // format date dd/mm/yyyy
    const [y, m, d] = form.date.split('-');
    const dateStr = `${d}/${m}/${y}`;
    onSave({ ...form, date: dateStr });
  };

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 250,
        background: 'rgba(5, 8, 16, 0.72)', backdropFilter: 'blur(6px)',
        animation: 'fadeIn .2s',
      }} />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 251,
        display: 'grid', placeItems: 'center',
        padding: 24, pointerEvents: 'none',
      }}>
        <div style={{
          pointerEvents: 'auto',
          width: '100%', maxWidth: 620,
          maxHeight: '88vh', overflowY: 'auto',
          background: 'rgba(10,14,26,0.96)',
          backdropFilter: 'blur(24px) saturate(150%)',
          border: '1px solid rgba(255,184,0,0.28)',
          borderRadius: 14,
          boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,184,0,0.08) inset',
          padding: '26px 28px 24px',
          animation: 'modalIn .22s cubic-bezier(0.2, 0.9, 0.3, 1.1)',
        }}>
          <div className="row items-start justify-between mb-20">
            <div>
              <div className="t-eyebrow" style={{ color: 'var(--solar-500)' }}>{isEdit ? 'Editar orden' : 'Nueva orden de trabajo'}</div>
              <h2 className="t-display" style={{
                fontSize: 22, fontWeight: 600, marginTop: 4,
                color: 'var(--solar-500)',
                textShadow: '0 0 16px rgba(255,184,0,0.4)',
                letterSpacing: '0.02em',
              }}>
                {isEdit ? ot.id : 'Crear OT'}
              </h2>
            </div>
            <button className="btn btn-ghost btn-icon" onClick={onClose}><Ic.close /></button>
          </div>

          <div className="col gap-14">
            {/* Instalación */}
            <FormField label="Instalación">
              <NativeSelect value={form.inst} onChange={v => set('inst', v)}>
                {PARKS.map(p => <option key={p.id} value={p.name}>{p.name} — {p.city}</option>)}
              </NativeSelect>
            </FormField>

            {/* Tipo + Prioridad */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <FormField label="Tipo">
                <SegmentedGroup
                  value={form.type}
                  onChange={v => set('type', v)}
                  options={[
                    { id: 'preventive', label: 'Preventivo', color: '#0EA5E9' },
                    { id: 'corrective', label: 'Correctivo', color: '#F97316' },
                    { id: 'emergency',  label: 'Emergencia', color: '#EF4444' },
                  ]}
                />
              </FormField>
              <FormField label="Prioridad">
                <SegmentedGroup
                  value={form.priority}
                  onChange={v => set('priority', v)}
                  options={[
                    { id: 'low',    label: 'Baja',    color: '#10B981' },
                    { id: 'medium', label: 'Media',   color: '#F59E0B' },
                    { id: 'high',   label: 'Alta',    color: '#EF4444' },
                    { id: 'critical', label: 'Crítica', color: '#DC2626' },
                  ]}
                />
              </FormField>
            </div>

            {/* Técnico + Fecha */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 14 }}>
              <FormField label="Técnico asignado">
                <NativeSelect value={form.tech} onChange={v => set('tech', v)}>
                  {TECHS.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                </NativeSelect>
              </FormField>
              <FormField label="Fecha programada">
                <input
                  type="date"
                  value={form.date}
                  onChange={e => set('date', e.target.value)}
                  style={inputStyle}
                />
              </FormField>
            </div>

            {/* Title */}
            <FormField label="Título breve">
              <input
                type="text"
                value={form.title}
                onChange={e => set('title', e.target.value)}
                placeholder="Ej: Limpieza de paneles — strings 1 a 4"
                style={inputStyle}
              />
            </FormField>

            {/* Description */}
            <FormField label="Descripción">
              <textarea
                rows={4}
                value={form.description}
                onChange={e => set('description', e.target.value)}
                placeholder="Detalle de tareas a realizar, observaciones…"
                style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--f-body)', lineHeight: 1.5 }}
              />
            </FormField>

            {/* Estado inicial note */}
            {!isEdit && (
              <div className="row items-center gap-10" style={{
                padding: '10px 12px',
                background: 'rgba(148,163,184,0.06)',
                border: '1px solid rgba(148,163,184,0.18)',
                borderRadius: 8,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#94A3B8', boxShadow: '0 0 6px #94A3B8' }} />
                <span style={{ fontSize: 12, color: 'var(--text-1)' }}>Estado inicial:</span>
                <span className="t-mono" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#94A3B8', textTransform: 'uppercase' }}>Pendiente</span>
              </div>
            )}
          </div>

          <div className="row gap-10 justify-end mt-24">
            <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
            <button className="btn btn-primary" onClick={submit}>
              {isEdit ? 'Guardar cambios' : 'Crear orden'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  width: '100%',
  background: 'rgba(17,24,39,0.7)',
  border: '1px solid rgba(148,163,184,0.18)',
  borderRadius: 8,
  padding: '10px 12px',
  color: 'var(--text-0)',
  fontSize: 13,
  fontFamily: 'var(--f-body)',
  outline: 'none',
  transition: 'border-color .15s, box-shadow .15s',
  colorScheme: 'dark',
};

function FormField({ label, children }) {
  return (
    <div className="col gap-6">
      <div className="t-eyebrow">{label}</div>
      {children}
    </div>
  );
}

function NativeSelect({ value, onChange, children }) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ ...inputStyle, appearance: 'none', paddingRight: 32, cursor: 'pointer' }}
      >
        {children}
      </select>
      <span style={{
        position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
        pointerEvents: 'none', color: 'var(--text-2)',
      }}><ChevDownIcon /></span>
    </div>
  );
}

function SegmentedGroup({ value, onChange, options }) {
  return (
    <div className="row gap-4" style={{ flexWrap: 'wrap' }}>
      {options.map(o => {
        const active = o.id === value;
        return (
          <button key={o.id} onClick={() => onChange(o.id)} style={{
            flex: 1, minWidth: 0,
            padding: '8px 10px',
            background: active ? `${o.color}20` : 'rgba(17,24,39,0.6)',
            border: `1px solid ${active ? o.color + '66' : 'rgba(148,163,184,0.14)'}`,
            borderRadius: 7,
            color: active ? o.color : 'var(--text-2)',
            fontSize: 11, fontWeight: 600,
            fontFamily: 'var(--f-body)',
            letterSpacing: '0.02em',
            cursor: 'pointer',
            boxShadow: active ? `0 0 12px ${o.color}33` : 'none',
            transition: 'all .15s',
          }}>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// Confirm Delete Modal
// ============================================================
function ConfirmDeleteModal({ ot, onCancel, onConfirm }) {
  React.useEffect(() => {
    const onEsc = (e) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [onCancel]);

  return (
    <>
      <div onClick={onCancel} style={{
        position: 'fixed', inset: 0, zIndex: 260,
        background: 'rgba(5, 8, 16, 0.75)', backdropFilter: 'blur(6px)',
        animation: 'fadeIn .2s',
      }} />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 261,
        display: 'grid', placeItems: 'center',
        padding: 24, pointerEvents: 'none',
      }}>
        <div style={{
          pointerEvents: 'auto',
          width: '100%', maxWidth: 440,
          background: 'rgba(10,14,26,0.96)',
          backdropFilter: 'blur(24px) saturate(150%)',
          border: '1px solid rgba(239,68,68,0.35)',
          borderRadius: 14,
          boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 32px rgba(239,68,68,0.12)',
          padding: '26px 28px 24px',
          animation: 'modalIn .2s cubic-bezier(0.2, 0.9, 0.3, 1.1)',
        }}>
          <div className="row items-center gap-12 mb-16">
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: 'rgba(239,68,68,0.12)',
              border: '1px solid rgba(239,68,68,0.35)',
              display: 'grid', placeItems: 'center',
              color: '#EF4444',
              boxShadow: '0 0 20px rgba(239,68,68,0.25)',
            }}>
              <TrashIcon width="20" height="20" />
            </div>
            <div>
              <div className="t-eyebrow" style={{ color: '#EF4444' }}>Eliminar orden</div>
              <div className="t-display" style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>
                Confirmar eliminación
              </div>
            </div>
          </div>

          <div style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.55 }}>
            ¿Eliminar la orden{' '}
            <span className="t-mono" style={{ color: 'var(--solar-500)', fontWeight: 700 }}>{ot.id}</span>?
            Esta acción no se puede deshacer.
          </div>

          <div className="row gap-10 justify-end mt-24">
            <button className="btn btn-ghost" onClick={onCancel}>Cancelar</button>
            <button
              onClick={onConfirm}
              style={{
                padding: '9px 18px',
                background: '#EF4444',
                border: '1px solid #EF4444',
                borderRadius: 8,
                color: '#fff',
                fontSize: 12, fontWeight: 600,
                fontFamily: 'var(--f-display)',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                boxShadow: '0 0 18px rgba(239,68,68,0.5)',
                transition: 'all .15s',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#DC2626'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#EF4444'}
            >
              <TrashIcon width="13" height="13" /> Eliminar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================
// Toast
// ============================================================
function Toast({ text, kind }) {
  const colors = {
    ok:  { c: '#10B981', bg: 'rgba(16,185,129,0.14)', border: 'rgba(16,185,129,0.4)' },
    del: { c: '#EF4444', bg: 'rgba(239,68,68,0.14)',  border: 'rgba(239,68,68,0.4)'  },
  }[kind] || { c: '#FFB800', bg: 'rgba(255,184,0,0.14)', border: 'rgba(255,184,0,0.4)' };

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24,
      zIndex: 300,
      background: 'rgba(10,14,26,0.95)',
      backdropFilter: 'blur(16px)',
      border: `1px solid ${colors.border}`,
      borderRadius: 10,
      padding: '12px 16px',
      boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 24px ${colors.c}33`,
      display: 'flex', alignItems: 'center', gap: 12,
      minWidth: 240,
      animation: 'toastIn .3s cubic-bezier(0.2, 0.9, 0.3, 1.1)',
    }}>
      <span style={{
        width: 24, height: 24, borderRadius: '50%',
        background: colors.bg, border: `1px solid ${colors.border}`,
        display: 'grid', placeItems: 'center',
        color: colors.c,
      }}>
        {kind === 'del' ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7"/></svg>
        )}
      </span>
      <span style={{ fontSize: 13, color: 'var(--text-0)', fontWeight: 500 }}>{text}</span>
    </div>
  );
}
