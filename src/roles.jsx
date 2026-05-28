/* global React, Ic */
// Técnico + Cooperativa role screens

const { useState: useStR, useEffect: useEfR, useMemo: useMemoR } = React;

// ============================================================
// TÉCNICO — HOME (Mis Órdenes)
// ============================================================
const TEC_OTS = [
  { id: 'OT-2847', park: 'MetalCor Industries', city: 'Córdoba Capital', type: 'Correctivo', priority: 'critical', status: 'en-ruta', eta: '14 min', desc: 'Inversor fallando — pérdida de string 3', km: 8, pts: 'Inv #3, caja de conexiones', assigned: 'Hoy 09:40', due: 'Hoy 12:00' },
  { id: 'OT-2846', park: 'Agro San Marcos', city: 'Jesús María', type: 'Correctivo', priority: 'high', status: 'asignada', eta: null, desc: 'Eficiencia <72% — inspección de paneles', km: 38, pts: 'Sector norte, paneles 45-82', assigned: 'Hoy 08:15', due: 'Hoy 18:00' },
  { id: 'OT-2841', park: 'Coop. Oncativo', city: 'Oncativo', type: 'Preventivo', priority: 'medium', status: 'programada', eta: null, desc: 'Limpieza trimestral de paneles', km: 52, pts: '164 paneles · agua desmineralizada', assigned: 'Mañana 07:00', due: 'Mañana 14:00' },
  { id: 'OT-2835', park: 'Coop. Las Varillas', city: 'Las Varillas', type: 'Preventivo', priority: 'medium', status: 'programada', eta: null, desc: 'Revisión de conexiones DC', km: 78, pts: 'Cabina principal', assigned: '23 Abr', due: '23 Abr' },
  { id: 'OT-2830', park: 'Lácteos Línea Dorada', city: 'Río Primero', type: 'Inspección', priority: 'low', status: 'completada', eta: null, desc: 'Verificación post-instalación', km: 44, pts: '200 paneles', assigned: '19 Abr', due: '19 Abr' },
];

const PR = {
  critical: { c: '#EF4444', bg: 'rgba(239,68,68,0.14)', br: 'rgba(239,68,68,0.45)', l: 'Crítica' },
  high:     { c: '#F59E0B', bg: 'rgba(245,158,11,0.14)', br: 'rgba(245,158,11,0.45)', l: 'Alta' },
  medium:   { c: '#FFB800', bg: 'rgba(255,184,0,0.14)', br: 'rgba(255,184,0,0.4)',  l: 'Media' },
  low:      { c: '#64748B', bg: 'rgba(100,116,139,0.14)', br: 'rgba(100,116,139,0.3)', l: 'Baja' },
};
const ST = {
  'en-ruta':     { c: '#0EA5E9', bg: 'rgba(14,165,233,0.14)', br: 'rgba(14,165,233,0.4)', l: '● EN RUTA', dot: true },
  'asignada':    { c: '#FFB800', bg: 'rgba(255,184,0,0.12)',  br: 'rgba(255,184,0,0.35)', l: 'ASIGNADA' },
  'programada':  { c: '#64748B', bg: 'rgba(100,116,139,0.14)', br: 'rgba(100,116,139,0.3)', l: 'PROGRAMADA' },
  'completada':  { c: '#10B981', bg: 'rgba(16,185,129,0.12)', br: 'rgba(16,185,129,0.35)', l: '✓ COMPLETADA' },
};

function TechnicianHome({ onNavigate }) {
  const [selectedOT, setSelectedOT] = useStR(null);
  const [filter, setFilter] = useStR('todas');

  const counts = {
    todas: TEC_OTS.length,
    hoy: TEC_OTS.filter(o => o.assigned.startsWith('Hoy')).length,
    completadas: TEC_OTS.filter(o => o.status === 'completada').length,
  };
  const visible = filter === 'todas' ? TEC_OTS : filter === 'hoy' ? TEC_OTS.filter(o => o.assigned.startsWith('Hoy')) : TEC_OTS.filter(o => o.status === 'completada');

  return (
    <div className="col gap-24">
      {/* HEADER */}
      <div className="row items-end justify-between">
        <div>
          <div className="t-eyebrow" style={{ color: 'var(--solar-500)' }}>◈ Técnico de Campo</div>
          <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>Mis Órdenes de Trabajo</h1>
          <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>Mariano Luna · Zona Centro · Turno 08:00 — 18:00</div>
        </div>
        <div className="row gap-8">
          <button className="btn btn-ghost btn-sm"><Ic.map /> Mapa de ruta</button>
          <button className="btn btn-primary btn-sm">+ Reportar incidencia</button>
        </div>
      </div>

      {/* KPIs del día */}
      <div className="grid-4 gap-16">
        <KpiTec label="OTs hoy" value="4" sub="2 críticas · 2 medias" color="#FFB800" icon="📋" />
        <KpiTec label="Km recorridos" value="127" sub="de 180 km estimados" color="#0EA5E9" icon="🚗" />
        <KpiTec label="Tiempo promedio" value="42 min" sub="–18% vs mes pasado" color="#10B981" icon="⏱" />
        <KpiTec label="Completadas mes" value="68" sub="97% dentro de SLA" color="#F59E0B" icon="✓" />
      </div>

      {/* FILTROS */}
      <div className="row items-center gap-8">
        {[['todas', `Todas (${counts.todas})`], ['hoy', `Hoy (${counts.hoy})`], ['completadas', `Completadas (${counts.completadas})`]].map(([k, l]) => (
          <button key={k} className={`btn btn-sm ${filter === k ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFilter(k)}>{l}</button>
        ))}
        <span className="flex-1" />
        <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.12em' }}>
          SLA COMPROMETIDO: 97% · ⚡ MES EN CURSO
        </div>
      </div>

      {/* LISTA */}
      <div className="col gap-12">
        {visible.map(ot => (
          <TecOTCard key={ot.id} ot={ot} onOpen={() => setSelectedOT(ot)} />
        ))}
      </div>

      {selectedOT && <OTDetailModal ot={selectedOT} onClose={() => setSelectedOT(null)} />}
    </div>
  );
}

function KpiTec({ label, value, sub, color, icon }) {
  return (
    <div className="card bracket" style={{ padding: 18, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 10, right: 14, fontSize: 22, opacity: 0.5 }}>{icon}</div>
      <div className="t-eyebrow" style={{ color }}>{label}</div>
      <div className="t-display" style={{ fontSize: 34, fontWeight: 700, color: 'var(--text-0)', marginTop: 6, letterSpacing: '-0.02em' }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 4 }}>{sub}</div>
    </div>
  );
}

function TecOTCard({ ot, onOpen }) {
  const p = PR[ot.priority];
  const s = ST[ot.status];
  return (
    <div className="card bracket" style={{
      padding: 18,
      borderLeft: `3px solid ${p.c}`,
      cursor: 'pointer',
      transition: 'all .15s',
    }}
    onClick={onOpen}
    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,184,0,0.03)'}
    onMouseLeave={e => e.currentTarget.style.background = ''}
    >
      <div className="row items-start gap-18">
        {/* Left block */}
        <div style={{ minWidth: 80 }}>
          <div className="t-mono" style={{ fontSize: 11, color: 'var(--solar-500)', fontWeight: 700, letterSpacing: '0.08em' }}>{ot.id}</div>
          <div style={{
            fontSize: 9, marginTop: 4, padding: '2px 6px', display: 'inline-block',
            background: p.bg, color: p.c, border: `1px solid ${p.br}`, borderRadius: 3,
            fontFamily: 'var(--f-mono)', letterSpacing: '0.1em', fontWeight: 700,
          }}>{p.l.toUpperCase()}</div>
        </div>

        {/* Main */}
        <div className="col gap-6 flex-1" style={{ minWidth: 0 }}>
          <div className="row items-center gap-10">
            <div className="t-display" style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-0)' }}>{ot.park}</div>
            <span style={{ fontSize: 11, color: 'var(--text-3)' }}>· {ot.city}</span>
            <span style={{
              fontSize: 9, padding: '2px 7px', background: 'rgba(148,163,184,0.1)', color: 'var(--text-2)',
              border: '1px solid rgba(148,163,184,0.18)', borderRadius: 3,
              fontFamily: 'var(--f-mono)', letterSpacing: '0.1em',
            }}>{ot.type.toUpperCase()}</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-1)' }}>{ot.desc}</div>
          <div className="row gap-14" style={{ fontSize: 11, color: 'var(--text-3)' }}>
            <span>📍 {ot.pts}</span>
            <span>🛣 {ot.km} km</span>
            <span>📅 {ot.assigned} → {ot.due}</span>
          </div>
        </div>

        {/* Right */}
        <div className="col items-end gap-8" style={{ minWidth: 140 }}>
          <span style={{
            fontSize: 10, padding: '4px 8px',
            background: s.bg, color: s.c, border: `1px solid ${s.br}`, borderRadius: 4,
            fontFamily: 'var(--f-mono)', letterSpacing: '0.1em', fontWeight: 700,
          }}>{s.l}</span>
          {ot.eta && (
            <div style={{ textAlign: 'right' }}>
              <div className="t-mono" style={{ fontSize: 9, color: 'var(--text-3)', letterSpacing: '0.1em' }}>ETA</div>
              <div className="t-display" style={{ fontSize: 18, fontWeight: 700, color: '#0EA5E9', lineHeight: 1 }}>{ot.eta}</div>
            </div>
          )}
          {!ot.eta && ot.status !== 'completada' && (
            <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); onOpen(); }}>Ver detalle →</button>
          )}
        </div>
      </div>
    </div>
  );
}

function OTDetailModal({ ot, onClose }) {
  const p = PR[ot.priority];
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(3,7,18,0.8)', backdropFilter: 'blur(4px)',
      zIndex: 50, display: 'grid', placeItems: 'center', padding: 40,
    }} onClick={onClose}>
      <div className="card bracket" style={{ width: 720, maxWidth: '90vw', padding: 28 }} onClick={e => e.stopPropagation()}>
        <div className="row items-start justify-between mb-18">
          <div>
            <div className="t-mono" style={{ fontSize: 11, color: 'var(--solar-500)', letterSpacing: '0.08em', fontWeight: 700 }}>{ot.id}</div>
            <h2 className="t-display" style={{ fontSize: 22, fontWeight: 600, marginTop: 4 }}>{ot.park}</h2>
            <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>{ot.city} · {ot.type}</div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><Ic.close /></button>
        </div>

        <div style={{
          padding: 14, marginBottom: 18,
          background: p.bg, border: `1px solid ${p.br}`, borderRadius: 8,
          borderLeft: `3px solid ${p.c}`,
        }}>
          <div className="t-mono" style={{ fontSize: 9, color: p.c, letterSpacing: '0.12em', fontWeight: 700 }}>PRIORIDAD {p.l.toUpperCase()}</div>
          <div style={{ fontSize: 14, color: 'var(--text-0)', marginTop: 4, fontWeight: 500 }}>{ot.desc}</div>
        </div>

        <div className="grid-2 gap-18 mb-18">
          <div>
            <div className="t-eyebrow">Ubicación</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>{ot.pts}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{ot.km} km · {Math.round(ot.km * 1.1)} min en ruta</div>
          </div>
          <div>
            <div className="t-eyebrow">SLA</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>{ot.assigned} → {ot.due}</div>
            <div style={{ fontSize: 11, color: 'var(--emerald-500)', marginTop: 2 }}>● Dentro del tiempo</div>
          </div>
        </div>

        <div className="mb-18">
          <div className="t-eyebrow mb-8">Checklist</div>
          <div className="col gap-6">
            {[
              'Verificar tensión DC en caja de conexión',
              'Inspeccionar visualmente inversor #3',
              'Medir eficiencia de string afectado',
              'Fotografiar hallazgos · subir a app',
              'Completar reporte antes de cerrar OT',
            ].map((t, i) => (
              <label key={i} className="row items-center gap-8" style={{ fontSize: 13, color: 'var(--text-1)', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: '#FFB800' }} />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-18">
          <div className="t-eyebrow mb-8">Repuestos pre-autorizados</div>
          <div className="row gap-8" style={{ flexWrap: 'wrap' }}>
            {['Fusible DC 1000V', 'Conector MC4', 'Sellador industrial', 'Multímetro digital'].map(r => (
              <span key={r} style={{
                fontSize: 11, padding: '4px 10px', borderRadius: 20,
                background: 'rgba(14,165,233,0.12)', color: '#0EA5E9', border: '1px solid rgba(14,165,233,0.3)',
              }}>{r}</span>
            ))}
          </div>
        </div>

        <div className="row justify-end gap-8">
          <button className="btn btn-ghost">Postponer</button>
          <button className="btn btn-ghost" style={{ color: '#0EA5E9', borderColor: 'rgba(14,165,233,0.4)' }}>📞 Llamar supervisor</button>
          <button className="btn btn-primary">▸ Iniciar trabajo</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// TÉCNICO — STOCK
// ============================================================
const STOCK_ITEMS = [
  { sku: 'FUS-DC-1000V', name: 'Fusible DC 1000V 15A',        cat: 'Eléctrico',    qty: 24, min: 10, unit: '$4.800',   status: 'ok' },
  { sku: 'MC4-CON-P',   name: 'Conector MC4 (par)',           cat: 'Conexión',     qty: 3,  min: 20, unit: '$1.200',   status: 'low' },
  { sku: 'OPT-TS4-A',   name: 'Optimizador Tigo TS4-A-O',      cat: 'Electrónica',  qty: 8,  min: 5,  unit: '$28.400',  status: 'ok' },
  { sku: 'SEL-IND-SKA', name: 'Sellador Sikaflex-521 UV',      cat: 'Insumos',      qty: 0,  min: 4,  unit: '$3.900',   status: 'out' },
  { sku: 'BOR-MEG-C',   name: 'Borne de tierra megador cobre', cat: 'Eléctrico',    qty: 18, min: 12, unit: '$2.200',   status: 'ok' },
  { sku: 'INV-HUA-100', name: 'Inversor Huawei SUN2000-100KTL',cat: 'Inversor',     qty: 1,  min: 1,  unit: '$4.250.000', status: 'critical' },
  { sku: 'CAB-SOL-4',   name: 'Cable solar H1Z2Z2-K 4mm² (m)', cat: 'Cable',        qty: 340, min: 200, unit: '$280',   status: 'ok' },
  { sku: 'PAN-JA-550',  name: 'Panel JA Solar 550W',           cat: 'Módulo',       qty: 14, min: 8,  unit: '$142.000', status: 'ok' },
];
const STOCK_ST = {
  ok:       { c: '#10B981', bg: 'rgba(16,185,129,0.12)', br: 'rgba(16,185,129,0.35)', l: '● Normal' },
  low:      { c: '#F59E0B', bg: 'rgba(245,158,11,0.14)',  br: 'rgba(245,158,11,0.4)',  l: '⚠ Bajo stock' },
  out:      { c: '#EF4444', bg: 'rgba(239,68,68,0.14)',   br: 'rgba(239,68,68,0.45)',  l: '● Sin stock' },
  critical: { c: '#EF4444', bg: 'rgba(239,68,68,0.14)',   br: 'rgba(239,68,68,0.45)',  l: '● Crítico' },
};

function TechnicianStock() {
  const [cat, setCat] = useStR('todas');
  const cats = ['todas', ...new Set(STOCK_ITEMS.map(s => s.cat))];
  const visible = cat === 'todas' ? STOCK_ITEMS : STOCK_ITEMS.filter(s => s.cat === cat);

  return (
    <div className="col gap-24">
      <div className="row items-end justify-between">
        <div>
          <div className="t-eyebrow" style={{ color: 'var(--solar-500)' }}>◈ Inventario Móvil</div>
          <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>Stock y Repuestos</h1>
          <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>Camioneta 4 · Actualizado hace 18 min</div>
        </div>
        <div className="row gap-8">
          <button className="btn btn-ghost btn-sm">📤 Solicitar reposición</button>
          <button className="btn btn-primary btn-sm">+ Agregar movimiento</button>
        </div>
      </div>

      <div className="grid-4 gap-16">
        <KpiTec label="Ítems totales" value="127" sub="en 8 categorías" color="#FFB800" icon="📦" />
        <KpiTec label="Valor total" value="$18.4M" sub="stock en camioneta" color="#10B981" icon="💰" />
        <KpiTec label="Alertas stock" value="3" sub="1 sin stock · 2 bajos" color="#F59E0B" icon="⚠" />
        <KpiTec label="Movimientos mes" value="142" sub="entradas + salidas" color="#0EA5E9" icon="⇄" />
      </div>

      <div className="row items-center gap-8">
        {cats.map(c => (
          <button key={c} className={`btn btn-sm ${cat === c ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setCat(c)}>{c.charAt(0).toUpperCase() + c.slice(1)}</button>
        ))}
      </div>

      <div className="card bracket" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Ítem</th>
              <th>Categoría</th>
              <th style={{ textAlign: 'right' }}>Stock</th>
              <th style={{ textAlign: 'right' }}>Mínimo</th>
              <th style={{ textAlign: 'right' }}>Precio unit.</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visible.map(it => {
              const s = STOCK_ST[it.status];
              return (
                <tr key={it.sku}>
                  <td><span className="t-mono" style={{ fontSize: 11, color: 'var(--solar-500)', fontWeight: 600 }}>{it.sku}</span></td>
                  <td style={{ fontWeight: 500 }}>{it.name}</td>
                  <td style={{ color: 'var(--text-2)' }}>{it.cat}</td>
                  <td style={{ textAlign: 'right' }} className="t-mono">
                    <span style={{ fontWeight: 700, color: it.qty < it.min ? s.c : 'var(--text-0)' }}>{it.qty}</span>
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--text-3)' }} className="t-mono">{it.min}</td>
                  <td style={{ textAlign: 'right' }} className="t-mono">{it.unit}</td>
                  <td>
                    <span style={{
                      fontSize: 10, padding: '3px 8px',
                      background: s.bg, color: s.c, border: `1px solid ${s.br}`, borderRadius: 4,
                      fontFamily: 'var(--f-mono)', letterSpacing: '0.08em', fontWeight: 600,
                    }}>{s.l}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn btn-ghost btn-sm">Detalle</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// TÉCNICO — ALERTAS ASIGNADAS
// ============================================================
function TechnicianAlerts() {
  const alerts = [
    { id: 'AL-1847', park: 'MetalCor Industries',   level: 'critical', title: 'Inversor #3 sin producción', when: 'Hace 12 min', detail: 'Caída total de string · pérdida estimada $4.800/hora', sla: '1h', status: 'nuevo' },
    { id: 'AL-1845', park: 'Agro San Marcos',       level: 'high',     title: 'Eficiencia <72% sostenida',  when: 'Hace 45 min', detail: 'Posible acumulación de polvo · 172 paneles afectados', sla: '4h', status: 'en-analisis' },
    { id: 'AL-1840', park: 'Coop. Las Varillas',    level: 'medium',   title: 'Temperatura inversor alta',  when: 'Hace 2 h',    detail: '68°C vs 55°C nominal · verificar ventilación', sla: '24h', status: 'programada' },
  ];

  return (
    <div className="col gap-24">
      <div className="row items-end justify-between">
        <div>
          <div className="t-eyebrow" style={{ color: '#EF4444' }}>◈ Prioridad alta</div>
          <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>Alertas Asignadas</h1>
          <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>3 alertas activas · SLA crítico: 1 hora</div>
        </div>
      </div>

      <div className="col gap-12">
        {alerts.map(a => {
          const p = PR[a.level];
          return (
            <div key={a.id} className="card bracket" style={{
              padding: 18, borderLeft: `3px solid ${p.c}`,
              boxShadow: a.level === 'critical' ? `0 0 30px ${p.c}22` : 'none',
            }}>
              <div className="row items-start gap-18">
                <div style={{
                  width: 44, height: 44, flexShrink: 0,
                  background: p.bg, border: `1px solid ${p.br}`, borderRadius: 10,
                  display: 'grid', placeItems: 'center', fontSize: 20,
                  color: p.c,
                }}>⚠</div>
                <div className="col gap-6 flex-1">
                  <div className="row items-center gap-10">
                    <span className="t-mono" style={{ fontSize: 11, color: p.c, fontWeight: 700, letterSpacing: '0.08em' }}>{a.id}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-3)' }}>·</span>
                    <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{a.park}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-3)' }}>·</span>
                    <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{a.when}</span>
                  </div>
                  <div className="t-display" style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-0)' }}>{a.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{a.detail}</div>
                </div>
                <div className="col items-end gap-8">
                  <div className="t-mono" style={{ fontSize: 10, color: p.c, fontWeight: 700, letterSpacing: '0.1em' }}>SLA: {a.sla}</div>
                  <button className="btn btn-primary btn-sm">Generar OT →</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// TÉCNICO — MAPA DE RUTA (simplified, routes-focused)
// ============================================================
function TechnicianRouteMap() {
  const pts = [
    { n: 1, name: 'MetalCor Industries', city: 'Córdoba Capital', x: 42, y: 44, time: '09:40', status: 'current' },
    { n: 2, name: 'Agro San Marcos',     city: 'Jesús María',     x: 48, y: 29, time: '11:20', status: 'next' },
    { n: 3, name: 'Coop. Oncativo',      city: 'Oncativo',        x: 48, y: 52, time: '14:10', status: 'pending' },
    { n: 4, name: 'Coop. Las Varillas',  city: 'Las Varillas',    x: 62, y: 45, time: '16:45', status: 'pending' },
  ];

  return (
    <div className="col gap-24">
      <div className="row items-end justify-between">
        <div>
          <div className="t-eyebrow" style={{ color: 'var(--solar-500)' }}>◈ Ruta Optimizada del Día</div>
          <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>Mapa de Rutas</h1>
          <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>4 paradas · 180 km · 8h estimadas · Ahorro: 34 km vs ruta manual</div>
        </div>
        <div className="row gap-8">
          <button className="btn btn-ghost btn-sm">🔄 Recalcular</button>
          <button className="btn btn-primary btn-sm">📱 Navegación GPS →</button>
        </div>
      </div>

      <div className="grid-3 gap-16" style={{ gridTemplateColumns: '1fr 320px' }}>
        {/* Map */}
        <div className="card bracket" style={{ padding: 0, overflow: 'hidden', height: 540, position: 'relative', background: 'radial-gradient(ellipse at 50% 50%, #0f1730 0%, #050811 70%)' }}>
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
            <defs>
              <pattern id="techgrid" width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M 5 0 L 0 0 L 0 5" fill="none" stroke="rgba(255,184,0,0.08)" strokeWidth="0.2"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#techgrid)" />
            {/* Route line */}
            <polyline points={pts.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#FFB800" strokeWidth="0.6" strokeDasharray="1.2 0.8" opacity="0.7" />
            {/* Route glow */}
            <polyline points={pts.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#FFB800" strokeWidth="1.4" opacity="0.25" filter="blur(1px)" />
            {/* Points */}
            {pts.map(p => {
              const c = p.status === 'current' ? '#0EA5E9' : p.status === 'next' ? '#FFB800' : '#64748B';
              return (
                <g key={p.n}>
                  <circle cx={p.x} cy={p.y} r={2.6} fill={c} opacity={0.3} />
                  <circle cx={p.x} cy={p.y} r={1.4} fill={c} />
                  <text x={p.x} y={p.y + 0.6} textAnchor="middle" fontSize="1.4" fontWeight="700" fill="#0A0E1A" fontFamily="'Orbitron', sans-serif">{p.n}</text>
                  <text x={p.x} y={p.y - 3} textAnchor="middle" fontSize="2" fill={c} fontFamily="'DM Sans', sans-serif" fontWeight="600">{p.name.split(' ')[0]}</text>
                </g>
              );
            })}
          </svg>
          <div style={{
            position: 'absolute', top: 14, left: 14,
            background: 'rgba(10,14,26,0.85)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,184,0,0.2)', borderRadius: 8, padding: 10,
            fontFamily: 'var(--f-mono)', fontSize: 11,
          }}>
            <div style={{ color: 'var(--text-3)', fontSize: 9, letterSpacing: '0.12em' }}>CÓRDOBA, ARGENTINA</div>
            <div style={{ color: '#FFB800', fontWeight: 700 }}>📍 Posición actual · 42 km/h</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="card bracket" style={{ padding: 18 }}>
          <div className="t-eyebrow mb-12">Itinerario</div>
          <div className="col gap-14">
            {pts.map((p, i) => {
              const c = p.status === 'current' ? '#0EA5E9' : p.status === 'next' ? '#FFB800' : '#64748B';
              const isLast = i === pts.length - 1;
              return (
                <div key={p.n} style={{ display: 'grid', gridTemplateColumns: '36px 1fr', gap: 10 }}>
                  <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: c, color: '#0A0E1A',
                      display: 'grid', placeItems: 'center',
                      fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 13,
                      boxShadow: p.status === 'current' ? `0 0 14px ${c}` : 'none',
                      zIndex: 1,
                    }}>{p.n}</div>
                    {!isLast && <div style={{ position: 'absolute', top: 28, bottom: -14, width: 2, background: 'rgba(148,163,184,0.15)' }} />}
                  </div>
                  <div className="col gap-2" style={{ paddingTop: 2 }}>
                    <div className="t-mono" style={{ fontSize: 11, color: c, fontWeight: 700 }}>{p.time}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-0)', fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{p.city}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <hr className="divider" style={{ margin: '16px 0' }} />
          <div className="row justify-between" style={{ fontSize: 11, color: 'var(--text-2)' }}>
            <span>Distancia total</span><span className="t-mono" style={{ color: 'var(--text-0)', fontWeight: 600 }}>180 km</span>
          </div>
          <div className="row justify-between mt-6" style={{ fontSize: 11, color: 'var(--text-2)' }}>
            <span>Combustible est.</span><span className="t-mono" style={{ color: 'var(--text-0)', fontWeight: 600 }}>14 L</span>
          </div>
          <div className="row justify-between mt-6" style={{ fontSize: 11, color: 'var(--text-2)' }}>
            <span>Ahorro vs manual</span><span className="t-mono" style={{ color: 'var(--emerald-500)', fontWeight: 600 }}>−34 km</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// COOPERATIVA — DASHBOARD
// ============================================================
function CoopDashboard({ onNavigate }) {
  const [live, setLive] = useStR(412.8);
  useEfR(() => {
    const iv = setInterval(() => setLive(l => +(l + (Math.random() - 0.5) * 8).toFixed(1)), 2400);
    return () => clearInterval(iv);
  }, []);

  const parks = [
    { name: 'Coop. Villa María',     gen: 987.3, inj: 720.8, cons: 266.5, bill: 61200, members: 842 },
    { name: 'Coop. Eléctrica Centro', gen: 712.5, inj: 518.2, cons: 194.3, bill: 44100, members: 612 },
    { name: 'Coop. Oncativo',        gen: 398.4, inj: 281.0, cons: 117.4, bill: 23900, members: 324 },
  ];

  return (
    <div className="col gap-24">
      <div className="row items-end justify-between">
        <div>
          <div className="t-eyebrow" style={{ color: '#10B981' }}>◈ Cooperativa Eléctrica Villa María</div>
          <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>Dashboard de Generación</h1>
          <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>3 parques · 1.778 socios · 448 kWp instalados</div>
        </div>
        <div className="row gap-8">
          <button className="btn btn-ghost btn-sm">📊 Reporte mensual</button>
          <button className="btn btn-primary btn-sm">📥 Liquidación abril</button>
        </div>
      </div>

      {/* LIVE METER */}
      <div className="card bracket" style={{ padding: '26px 28px', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(10,14,26,0.6))', borderColor: 'rgba(16,185,129,0.3)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 30%, rgba(16,185,129,0.15), transparent 60%)' }} />
        <div className="row items-center gap-28" style={{ position: 'relative' }}>
          <div>
            <div className="t-eyebrow" style={{ color: '#10B981' }}>Inyectando ahora mismo</div>
            <div className="t-display" style={{ fontSize: 58, fontWeight: 700, color: 'var(--text-0)', letterSpacing: '-0.02em', lineHeight: 1, marginTop: 6 }}>
              {live.toFixed(1)}
              <span style={{ fontSize: 20, color: '#10B981', marginLeft: 8, fontWeight: 500 }}>kW</span>
            </div>
            <div className="row items-center gap-6 mt-6">
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
              <span className="t-mono" style={{ fontSize: 11, color: '#10B981', letterSpacing: '0.12em', fontWeight: 700 }}>LIVE · ACTUALIZADO CADA 3s</span>
            </div>
          </div>
          <div style={{ height: 60, width: 1, background: 'rgba(148,163,184,0.15)' }} />
          <div className="grid-3 gap-28" style={{ flex: 1 }}>
            {[
              { l: 'Hoy', v: '2.098', u: 'kWh', d: '+12% vs ayer', c: '#10B981' },
              { l: 'Esta semana', v: '14.632', u: 'kWh', d: '87% del objetivo', c: '#FFB800' },
              { l: 'Inyección mes', v: '58.4', u: 'MWh', d: '$4.96M facturados', c: '#0EA5E9' },
            ].map(k => (
              <div key={k.l}>
                <div className="t-eyebrow" style={{ color: k.c }}>{k.l}</div>
                <div className="t-display" style={{ fontSize: 26, fontWeight: 700, color: 'var(--text-0)', marginTop: 4 }}>
                  {k.v}<span style={{ fontSize: 13, color: 'var(--text-3)', marginLeft: 4 }}>{k.u}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{k.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SPLIT */}
      <div className="grid-2 gap-18" style={{ gridTemplateColumns: '1fr 420px' }}>
        {/* Curva inyección */}
        <div className="card bracket" style={{ padding: 22 }}>
          <div className="row items-center justify-between mb-16">
            <div>
              <div className="t-eyebrow">Curva de inyección · Hoy</div>
              <div className="t-display" style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Generación vs Consumo vs Inyección</div>
            </div>
            <div className="row gap-6">
              {['Hoy', '7d', '30d'].map((p, i) => (
                <button key={p} className={`btn btn-sm ${i === 0 ? 'btn-primary' : 'btn-ghost'}`}>{p}</button>
              ))}
            </div>
          </div>
          <CoopCurve />
          <div className="row gap-18 mt-14" style={{ fontSize: 11 }}>
            <span className="row items-center gap-6"><span style={{ width: 10, height: 2, background: '#FFB800' }} /> Generación</span>
            <span className="row items-center gap-6"><span style={{ width: 10, height: 2, background: '#EF4444' }} /> Consumo interno</span>
            <span className="row items-center gap-6"><span style={{ width: 10, height: 2, background: '#10B981' }} /> Inyección a red</span>
          </div>
        </div>

        {/* Facturación mes */}
        <div className="card bracket" style={{ padding: 22 }}>
          <div className="t-eyebrow mb-6">Facturación · Abril 2026</div>
          <div className="t-display" style={{ fontSize: 36, fontWeight: 700, color: 'var(--text-0)' }}>$4.96M</div>
          <div style={{ fontSize: 12, color: 'var(--emerald-500)', marginTop: 2 }}>+18% vs marzo · meta 95% cumplida</div>
          <hr className="divider" style={{ margin: '18px 0' }} />
          <div className="col gap-12">
            {[
              { l: 'Tarifa promedio', v: '$85/kWh', c: 'var(--text-0)' },
              { l: 'Bonus por hora pico', v: '+$340k', c: 'var(--solar-500)' },
              { l: 'Créditos Red+', v: '+$127k', c: 'var(--cyan-500)' },
              { l: 'Distribución a socios', v: '—$612k', c: 'var(--text-2)' },
              { l: 'Retenido / fondo', v: '$4.11M', c: 'var(--emerald-500)' },
            ].map(r => (
              <div key={r.l} className="row justify-between" style={{ fontSize: 13 }}>
                <span style={{ color: 'var(--text-2)' }}>{r.l}</span>
                <span className="t-mono" style={{ color: r.c, fontWeight: 600 }}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PARQUES */}
      <div>
        <div className="row items-center justify-between mb-12">
          <div className="t-eyebrow">Mis parques · Inyección del día</div>
          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('coop-parks')}>Ver todos →</button>
        </div>
        <div className="grid-3 gap-16">
          {parks.map(p => (
            <div key={p.name} className="card bracket" style={{ padding: 18 }}>
              <div className="row items-center justify-between mb-10">
                <div className="t-display" style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                <span style={{
                  fontSize: 9, padding: '2px 7px', background: 'rgba(16,185,129,0.12)', color: '#10B981',
                  border: '1px solid rgba(16,185,129,0.35)', borderRadius: 3, fontFamily: 'var(--f-mono)', letterSpacing: '0.1em',
                }}>● LIVE</span>
              </div>
              {/* Mini split bar */}
              <div style={{ height: 10, borderRadius: 3, background: 'rgba(148,163,184,0.1)', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: `${(p.inj / p.gen) * 100}%`, background: 'linear-gradient(90deg, #10B981, #059669)' }} />
                <div style={{ width: `${(p.cons / p.gen) * 100}%`, background: 'linear-gradient(90deg, #F59E0B, #D97706)' }} />
              </div>
              <div className="row gap-14 mt-10" style={{ fontSize: 11 }}>
                <div>
                  <div className="t-mono" style={{ color: 'var(--text-3)', fontSize: 9, letterSpacing: '0.1em' }}>INYECCIÓN</div>
                  <div className="t-mono" style={{ color: '#10B981', fontWeight: 700, fontSize: 13 }}>{p.inj.toFixed(1)} kWh</div>
                </div>
                <div>
                  <div className="t-mono" style={{ color: 'var(--text-3)', fontSize: 9, letterSpacing: '0.1em' }}>CONSUMO</div>
                  <div className="t-mono" style={{ color: '#F59E0B', fontWeight: 700, fontSize: 13 }}>{p.cons.toFixed(1)} kWh</div>
                </div>
                <div>
                  <div className="t-mono" style={{ color: 'var(--text-3)', fontSize: 9, letterSpacing: '0.1em' }}>SOCIOS</div>
                  <div className="t-mono" style={{ color: 'var(--text-0)', fontWeight: 700, fontSize: 13 }}>{p.members}</div>
                </div>
              </div>
              <hr className="divider" style={{ margin: '12px 0' }} />
              <div className="row justify-between" style={{ fontSize: 11 }}>
                <span style={{ color: 'var(--text-2)' }}>Facturado hoy</span>
                <span className="t-mono" style={{ color: 'var(--text-0)', fontWeight: 700 }}>${p.bill.toLocaleString('es-AR')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoopCurve() {
  // Sample sinusoidal-like curve simulating a day
  const hours = [...Array(24)].map((_, i) => {
    const t = i / 23;
    const gen = Math.max(0, Math.sin((i - 5) / 12 * Math.PI)) * 520;
    const cons = 40 + Math.sin(i / 23 * Math.PI * 2) * 12 + (i > 18 ? 30 : 0);
    const inj = Math.max(0, gen - cons);
    return { i, gen, cons, inj };
  });
  const maxY = 540;
  const W = 680, H = 220, pad = 24;
  const x = i => pad + (i / 23) * (W - pad * 2);
  const y = v => H - pad - (v / maxY) * (H - pad * 2);

  const genPath = hours.map((h, i) => `${i === 0 ? 'M' : 'L'} ${x(h.i)} ${y(h.gen)}`).join(' ');
  const consPath = hours.map((h, i) => `${i === 0 ? 'M' : 'L'} ${x(h.i)} ${y(h.cons)}`).join(' ');
  const injPath = hours.map((h, i) => `${i === 0 ? 'M' : 'L'} ${x(h.i)} ${y(h.inj)}`).join(' ');
  const injArea = `${injPath} L ${x(23)} ${y(0)} L ${x(0)} ${y(0)} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 220 }}>
      <defs>
        <linearGradient id="coopinj" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#10B981" stopOpacity="0.4"/>
          <stop offset="1" stopColor="#10B981" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* grid */}
      {[0.25, 0.5, 0.75].map(p => (
        <line key={p} x1={pad} x2={W - pad} y1={pad + (H - pad * 2) * p} y2={pad + (H - pad * 2) * p} stroke="rgba(148,163,184,0.1)" strokeDasharray="2 3" />
      ))}
      {/* x axis */}
      {[0, 6, 12, 18, 23].map(i => (
        <g key={i}>
          <line x1={x(i)} x2={x(i)} y1={H - pad} y2={H - pad + 4} stroke="rgba(148,163,184,0.2)" />
          <text x={x(i)} y={H - pad + 16} textAnchor="middle" fontSize="10" fill="rgba(148,163,184,0.6)" fontFamily="JetBrains Mono">{i}:00</text>
        </g>
      ))}
      {/* area */}
      <path d={injArea} fill="url(#coopinj)" />
      {/* lines */}
      <path d={genPath} fill="none" stroke="#FFB800" strokeWidth="2" />
      <path d={consPath} fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d={injPath} fill="none" stroke="#10B981" strokeWidth="2.2" />
      {/* Now marker */}
      <line x1={x(13)} x2={x(13)} y1={pad} y2={H - pad} stroke="rgba(255,184,0,0.4)" strokeDasharray="2 2" />
      <text x={x(13)} y={pad + 8} textAnchor="middle" fontSize="9" fill="#FFB800" fontFamily="JetBrains Mono">AHORA</text>
    </svg>
  );
}

// ============================================================
// COOPERATIVA — MIS PARQUES
// ============================================================
function CoopParks() {
  const parks = [
    { name: 'Coop. Villa María',      city: 'Villa María',  kWp: 180, panels: 328, status: 'ok',    gen: 987,  inj: 720, eff: 95, members: 842, since: 'Feb 2024' },
    { name: 'Coop. Eléctrica Centro', city: 'Córdoba',      kWp: 160, panels: 290, status: 'ok',    gen: 712,  inj: 518, eff: 95, members: 612, since: 'Jul 2024' },
    { name: 'Coop. Oncativo',         city: 'Oncativo',     kWp: 108, panels: 164, status: 'warn',  gen: 398,  inj: 281, eff: 88, members: 324, since: 'Oct 2023' },
  ];

  return (
    <div className="col gap-24">
      <div className="row items-end justify-between">
        <div>
          <div className="t-eyebrow" style={{ color: '#10B981' }}>◈ Infraestructura</div>
          <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>Mis Parques Solares</h1>
        </div>
      </div>

      <div className="col gap-16">
        {parks.map(p => (
          <div key={p.name} className="card bracket" style={{ padding: 22 }}>
            <div className="row items-start gap-18">
              {/* Visual panel rows */}
              <div style={{
                width: 120, height: 80,
                background: 'linear-gradient(135deg, #0C1A3E, #030712)',
                borderRadius: 8, padding: 6,
                display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 2,
                border: '1px solid rgba(255,184,0,0.15)',
                flexShrink: 0,
              }}>
                {[...Array(32)].map((_, i) => (
                  <div key={i} style={{
                    background: i % 7 === 0 ? 'linear-gradient(135deg, #FFB800, #F59E0B)' : 'linear-gradient(135deg, #1e3a8a, #0f172a)',
                    borderRadius: 1,
                    boxShadow: i % 7 === 0 ? '0 0 3px rgba(255,184,0,0.8)' : 'none',
                  }} />
                ))}
              </div>
              <div className="col gap-4 flex-1">
                <div className="row items-center gap-10">
                  <div className="t-display" style={{ fontSize: 18, fontWeight: 600 }}>{p.name}</div>
                  <span style={{
                    fontSize: 9, padding: '2px 6px', borderRadius: 3,
                    background: p.status === 'ok' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.14)',
                    color: p.status === 'ok' ? '#10B981' : '#F59E0B',
                    border: `1px solid ${p.status === 'ok' ? 'rgba(16,185,129,0.35)' : 'rgba(245,158,11,0.4)'}`,
                    fontFamily: 'var(--f-mono)', letterSpacing: '0.1em', fontWeight: 700,
                  }}>{p.status === 'ok' ? '● OPERATIVO' : '⚠ REVISIÓN'}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{p.city} · {p.kWp} kWp · {p.panels} paneles · Operando desde {p.since}</div>
                <div className="grid-4 gap-16 mt-10">
                  <KpiLine label="Generación hoy" val={`${p.gen} kWh`} c="#FFB800" />
                  <KpiLine label="Inyectado" val={`${p.inj} kWh`} c="#10B981" />
                  <KpiLine label="Eficiencia" val={`${p.eff}%`} c={p.eff >= 90 ? '#10B981' : '#F59E0B'} />
                  <KpiLine label="Socios" val={p.members.toLocaleString()} c="#0EA5E9" />
                </div>
              </div>
              <div className="col items-end gap-8" style={{ minWidth: 160 }}>
                <button className="btn btn-ghost btn-sm">Detalle →</button>
                <button className="btn btn-ghost btn-sm">📈 Histórico</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KpiLine({ label, val, c }) {
  return (
    <div>
      <div className="t-mono" style={{ fontSize: 9, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
      <div className="t-display" style={{ fontSize: 18, fontWeight: 700, color: c, marginTop: 2 }}>{val}</div>
    </div>
  );
}

// ============================================================
// COOPERATIVA — INYECCIÓN A RED
// ============================================================
function CoopGridInjection() {
  return (
    <div className="col gap-24">
      <div className="row items-end justify-between">
        <div>
          <div className="t-eyebrow" style={{ color: '#10B981' }}>◈ Red Eléctrica</div>
          <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>Inyección a Red</h1>
          <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>Acuerdo Net-Metering con EPEC · Vigencia hasta Dic 2028</div>
        </div>
      </div>

      {/* Flow diagram */}
      <div className="card bracket" style={{ padding: 28 }}>
        <div className="t-eyebrow mb-20">Flujo energético · Tiempo real</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr', alignItems: 'center', gap: 16 }}>
          {/* Generación */}
          <FlowNode icon="☀" label="Generación" value="412 kW" c="#FFB800" sub="3 parques activos" />
          {/* Flow arrow */}
          <div style={{ position: 'relative', height: 80 }}>
            <svg viewBox="0 0 300 80" style={{ width: '100%', height: 80 }}>
              <defs>
                <linearGradient id="flowgrad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#FFB800" />
                  <stop offset="1" stopColor="#10B981" />
                </linearGradient>
              </defs>
              <path d="M 0 40 L 280 40" stroke="url(#flowgrad)" strokeWidth="2" strokeDasharray="6 4">
                <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="280,34 292,40 280,46" fill="#10B981" />
              <text x="150" y="30" textAnchor="middle" fontSize="11" fill="#FFB800" fontFamily="JetBrains Mono">▸ 285 kW</text>
              <text x="150" y="58" textAnchor="middle" fontSize="9" fill="rgba(148,163,184,0.7)" fontFamily="JetBrains Mono">INYECTANDO</text>
            </svg>
          </div>
          <FlowNode icon="⚡" label="Red EPEC" value="285 kW" c="#10B981" sub="Medidor bidireccional" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr', marginTop: 20 }}>
          <div style={{ gridColumn: '1 / 2' }}>
            <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.1em' }}>AUTOCONSUMO</div>
            <div className="t-display" style={{ fontSize: 22, fontWeight: 700, color: '#F59E0B' }}>127 kW</div>
            <div style={{ fontSize: 11, color: 'var(--text-2)' }}>Socios conectados</div>
          </div>
        </div>
      </div>

      {/* Tarifas */}
      <div className="grid-2 gap-18">
        <div className="card bracket" style={{ padding: 22 }}>
          <div className="row items-center justify-between mb-14">
            <div className="t-eyebrow">Tarifa de inyección · Día</div>
            <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)' }}>ACTUALIZADA 20 ABR 2026</span>
          </div>
          <div className="col gap-10">
            {[
              { band: 'Pico (18-22h)',   rate: 112, best: true },
              { band: 'Llano (8-18h)',   rate: 85,  best: false },
              { band: 'Valle (22-8h)',   rate: 54,  best: false },
            ].map(t => (
              <div key={t.band} className="row items-center gap-14" style={{ padding: '10px 14px', background: t.best ? 'rgba(255,184,0,0.08)' : 'rgba(17,24,39,0.4)', border: `1px solid ${t.best ? 'rgba(255,184,0,0.3)' : 'rgba(148,163,184,0.08)'}`, borderRadius: 8 }}>
                <div className="flex-1">
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-0)' }}>{t.band}</div>
                  {t.best && <div style={{ fontSize: 10, color: 'var(--solar-500)' }}>⚡ Banda óptima para inyección</div>}
                </div>
                <div className="t-display" style={{ fontSize: 22, fontWeight: 700, color: t.best ? 'var(--solar-500)' : 'var(--text-0)' }}>${t.rate}<span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 2 }}>/kWh</span></div>
              </div>
            ))}
          </div>
        </div>

        <div className="card bracket" style={{ padding: 22 }}>
          <div className="t-eyebrow mb-14">Balance mensual · kWh</div>
          <div style={{ height: 180, display: 'flex', alignItems: 'flex-end', gap: 6, padding: '0 4px' }}>
            {[
              { m: 'Ene', inj: 42, cons: 12 },
              { m: 'Feb', inj: 51, cons: 14 },
              { m: 'Mar', inj: 48, cons: 13 },
              { m: 'Abr', inj: 58, cons: 15 },
            ].map(d => (
              <div key={d.m} className="col items-center flex-1 gap-2" style={{ justifyContent: 'flex-end' }}>
                <div style={{ width: '80%', height: `${d.inj * 2.4}px`, background: 'linear-gradient(180deg, #10B981, #059669)', borderRadius: '3px 3px 0 0', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontSize: 10, color: '#10B981', fontFamily: 'var(--f-mono)', fontWeight: 700 }}>{d.inj}</span>
                </div>
                <div style={{ width: '80%', height: `${d.cons * 2.4}px`, background: 'linear-gradient(180deg, #F59E0B, #D97706)' }} />
                <div style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--f-mono)' }}>{d.m}</div>
              </div>
            ))}
          </div>
          <div className="row gap-18 mt-10" style={{ fontSize: 10 }}>
            <span className="row items-center gap-4"><span style={{ width: 10, height: 10, background: '#10B981' }} /> Inyección (MWh)</span>
            <span className="row items-center gap-4"><span style={{ width: 10, height: 10, background: '#F59E0B' }} /> Consumo (MWh)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowNode({ icon, label, value, c, sub }) {
  return (
    <div style={{
      padding: 18,
      background: `linear-gradient(135deg, ${c}11, rgba(17,24,39,0.6))`,
      border: `1px solid ${c}55`,
      borderRadius: 12,
      textAlign: 'center',
    }}>
      <div style={{
        width: 56, height: 56, margin: '0 auto 8px',
        borderRadius: '50%', background: c, color: '#0A0E1A',
        display: 'grid', placeItems: 'center',
        fontSize: 28, fontWeight: 700,
        boxShadow: `0 0 20px ${c}66`,
      }}>{icon}</div>
      <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{label}</div>
      <div className="t-display" style={{ fontSize: 24, fontWeight: 700, color: c, marginTop: 2 }}>{value}</div>
      <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{sub}</div>
    </div>
  );
}

// ============================================================
// COOPERATIVA — REPORTES
// ============================================================
function CoopReports() {
  const reports = [
    { name: 'Liquidación abril 2026',  type: 'Financiero',   date: '01 May 2026', status: 'draft',    sz: '—' },
    { name: 'Generación Q1 2026',      type: 'Producción',   date: '05 Abr 2026', status: 'firmado',  sz: '2.4 MB' },
    { name: 'Balance socios marzo',    type: 'Socios',       date: '01 Abr 2026', status: 'firmado',  sz: '640 kB' },
    { name: 'Auditoría ENRE 2025',     type: 'Regulatorio',  date: '10 Feb 2026', status: 'firmado',  sz: '8.2 MB' },
    { name: 'Cierre fiscal 2025',      type: 'Financiero',   date: '15 Ene 2026', status: 'firmado',  sz: '4.1 MB' },
  ];

  return (
    <div className="col gap-24">
      <div className="row items-end justify-between">
        <div>
          <div className="t-eyebrow" style={{ color: '#10B981' }}>◈ Documentación</div>
          <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>Reportes de la Cooperativa</h1>
        </div>
        <div className="row gap-8">
          <button className="btn btn-ghost btn-sm">📅 Programar envío automático</button>
          <button className="btn btn-primary btn-sm">+ Generar nuevo</button>
        </div>
      </div>

      <div className="grid-4 gap-16">
        <KpiTec label="Reportes totales" value="48" sub="histórico 2023–2026" color="#10B981" icon="📑" />
        <KpiTec label="Pendientes de firma" value="1" sub="liquidación abril" color="#F59E0B" icon="⏳" />
        <KpiTec label="Enviados a socios" value="36" sub="este año" color="#0EA5E9" icon="📤" />
        <KpiTec label="Promedio generación" value="54 MWh" sub="mensual · 2026" color="#FFB800" icon="⚡" />
      </div>

      <div className="card bracket" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Reporte</th>
              <th>Tipo</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th style={{ textAlign: 'right' }}>Tamaño</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reports.map(r => (
              <tr key={r.name}>
                <td style={{ fontWeight: 500 }}>📄 {r.name}</td>
                <td style={{ color: 'var(--text-2)' }}>{r.type}</td>
                <td className="t-mono" style={{ fontSize: 11, color: 'var(--text-2)' }}>{r.date}</td>
                <td>
                  <span style={{
                    fontSize: 10, padding: '3px 8px',
                    background: r.status === 'firmado' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.14)',
                    color: r.status === 'firmado' ? '#10B981' : '#F59E0B',
                    border: `1px solid ${r.status === 'firmado' ? 'rgba(16,185,129,0.35)' : 'rgba(245,158,11,0.4)'}`,
                    borderRadius: 4, fontFamily: 'var(--f-mono)', letterSpacing: '0.08em', fontWeight: 600,
                  }}>{r.status === 'firmado' ? '● FIRMADO' : '○ BORRADOR'}</span>
                </td>
                <td style={{ textAlign: 'right' }} className="t-mono">{r.sz}</td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn btn-ghost btn-sm">{r.status === 'firmado' ? 'Descargar' : 'Completar'}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// COOPERATIVA — SOCIOS
// ============================================================
function CoopMembers() {
  const members = [
    { name: 'Juan Carlos Méndez',   dni: '25.847.392', since: 'Mar 2021', plan: 'Residencial', cons: 385, cred: 128, status: 'active' },
    { name: 'María Elena Sosa',     dni: '30.112.847', since: 'Ene 2023', plan: 'Residencial', cons: 295, cred: 62,  status: 'active' },
    { name: 'Panadería Don Oscar',  dni: '20-11847392-5', since: 'Jul 2022', plan: 'Comercial', cons: 1847, cred: 420, status: 'active' },
    { name: 'Familia Quiroga',      dni: '32.587.104', since: 'Nov 2024', plan: 'Residencial', cons: 214, cred: 0,   status: 'new' },
    { name: 'Agro San Justo SA',    dni: '30-45841785-2', since: 'Feb 2022', plan: 'Industrial', cons: 8420, cred: 2840, status: 'active' },
    { name: 'Carlos Reynoso',       dni: '18.457.821', since: 'Jun 2020', plan: 'Residencial', cons: 312, cred: 89,  status: 'atraso' },
  ];

  return (
    <div className="col gap-24">
      <div className="row items-end justify-between">
        <div>
          <div className="t-eyebrow" style={{ color: '#10B981' }}>◈ Comunidad</div>
          <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>Socios</h1>
          <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>1.778 socios activos · 842 residenciales · 612 comerciales · 324 industriales</div>
        </div>
        <div className="row gap-8">
          <button className="btn btn-ghost btn-sm">📊 Exportar padrón</button>
          <button className="btn btn-primary btn-sm">+ Alta de socio</button>
        </div>
      </div>

      <div className="grid-4 gap-16">
        <KpiTec label="Socios activos" value="1.778" sub="+47 este trimestre" color="#10B981" icon="👥" />
        <KpiTec label="Consumo mensual" value="124 MWh" sub="promedio comunidad" color="#FFB800" icon="⚡" />
        <KpiTec label="Crédito distribuido" value="$612k" sub="abril 2026" color="#0EA5E9" icon="💳" />
        <KpiTec label="En atraso" value="23" sub="1.3% del total" color="#F59E0B" icon="⚠" />
      </div>

      <div className="card bracket" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
          <div className="row items-center gap-10">
            <div className="search-wrap" style={{ flex: 1, maxWidth: 320 }}>
              <span className="search-icon"><Ic.search /></span>
              <input className="input with-icon" placeholder="Buscar socio por nombre o DNI/CUIT…" />
            </div>
            <div className="row gap-6">
              {['Todos', 'Residencial', 'Comercial', 'Industrial', 'En atraso'].map((f, i) => (
                <button key={f} className={`btn btn-sm ${i === 0 ? 'btn-primary' : 'btn-ghost'}`}>{f}</button>
              ))}
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Socio</th>
              <th>DNI / CUIT</th>
              <th>Plan</th>
              <th>Desde</th>
              <th style={{ textAlign: 'right' }}>Cons. mes (kWh)</th>
              <th style={{ textAlign: 'right' }}>Crédito</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {members.map(m => {
              const st = m.status === 'active' ? { c: '#10B981', bg: 'rgba(16,185,129,0.12)', br: 'rgba(16,185,129,0.35)', l: '● ACTIVO' }
                : m.status === 'new' ? { c: '#0EA5E9', bg: 'rgba(14,165,233,0.14)', br: 'rgba(14,165,233,0.35)', l: 'NUEVO' }
                : { c: '#F59E0B', bg: 'rgba(245,158,11,0.14)', br: 'rgba(245,158,11,0.4)', l: 'ATRASO' };
              return (
                <tr key={m.dni}>
                  <td style={{ fontWeight: 500 }}>{m.name}</td>
                  <td className="t-mono" style={{ color: 'var(--text-2)', fontSize: 11 }}>{m.dni}</td>
                  <td style={{ color: 'var(--text-2)' }}>{m.plan}</td>
                  <td className="t-mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>{m.since}</td>
                  <td className="t-mono" style={{ textAlign: 'right', fontWeight: 600 }}>{m.cons.toLocaleString()}</td>
                  <td className="t-mono" style={{ textAlign: 'right', color: m.cred > 0 ? '#10B981' : 'var(--text-3)', fontWeight: 600 }}>${m.cred.toLocaleString()}</td>
                  <td>
                    <span style={{
                      fontSize: 10, padding: '3px 8px', background: st.bg, color: st.c, border: `1px solid ${st.br}`,
                      borderRadius: 4, fontFamily: 'var(--f-mono)', letterSpacing: '0.08em', fontWeight: 700,
                    }}>{st.l}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}><button className="btn btn-ghost btn-sm">Perfil</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// Exports
// ============================================================
Object.assign(window, {
  TechnicianHome, TechnicianStock, TechnicianAlerts, TechnicianRouteMap,
  CoopDashboard, CoopParks, CoopGridInjection, CoopReports, CoopMembers,
});
