/* global React, Ic */
// Equipos e Inventario — 3 tabs: Paneles, Inversores, Stock

const PANELS = [
  { sn: 'JKS-TN550-2023-00142', model: 'Jinko Tiger Neo 550W', brand: 'Jinko', power: '550W', inst: 'Lácteos Línea Dorada', city: 'Río Primero', status: 'op',   warranty: '03/2028', wstatus: 'ok' },
  { sn: 'JKS-TN550-2023-00143', model: 'Jinko Tiger Neo 550W', brand: 'Jinko', power: '550W', inst: 'Lácteos Línea Dorada', city: 'Río Primero', status: 'op',   warranty: '03/2028', wstatus: 'ok' },
  { sn: 'JKS-TP540-2022-00087', model: 'Jinko Tiger Pro 540W', brand: 'Jinko', power: '540W', inst: 'Criadero Montechiari', city: 'Córdoba',     status: 'deg',  warranty: '11/2027', wstatus: 'ok' },
  { sn: 'JKS-TN550-2024-00201', model: 'Jinko Tiger Neo 550W', brand: 'Jinko', power: '550W', inst: 'Frigorífico del Centro', city: 'Río Cuarto', status: 'op',   warranty: '06/2029', wstatus: 'ok' },
  { sn: 'JKS-TN550-2021-00034', model: 'Jinko Tiger Neo 550W', brand: 'Jinko', power: '550W', inst: 'Agro San Marcos',      city: 'Jesús María',  status: 'dmg',  warranty: '09/2026', wstatus: 'soon' },
  { sn: 'JKS-TP540-2022-00102', model: 'Jinko Tiger Pro 540W', brand: 'Jinko', power: '540W', inst: 'Cooperativa Oncativo', city: 'Oncativo',    status: 'op',   warranty: '04/2027', wstatus: 'ok' },
  { sn: 'JKS-TN550-2023-00298', model: 'Jinko Tiger Neo 550W', brand: 'Jinko', power: '550W', inst: 'Bodega Los Aromos',    city: 'C. Caroya',   status: 'op',   warranty: '07/2026', wstatus: 'soon' },
  { sn: 'JKS-TN550-2024-00315', model: 'Jinko Tiger Neo 550W', brand: 'Jinko', power: '550W', inst: 'Hotel Sierras',        city: 'V. C. Paz',   status: 'op',   warranty: '01/2029', wstatus: 'ok' },
];
const INVERTERS = [
  { sn: 'SGW-110CX-2023-0012', brand: 'Sungrow', model: 'SG110CX',          power: '110 kW', inst: 'Frigorífico del Centro', status: 'on',  fw: 'v3.2.1', latest: true  },
  { sn: 'HWI-100KTL-2023-0008', brand: 'Huawei', model: 'SUN2000-100KTL',   power: '100 kW', inst: 'Lácteos Línea Dorada',   status: 'on',  fw: 'v8.1.0', latest: true  },
  { sn: 'SGW-50CX-2022-0003',  brand: 'Sungrow', model: 'SG50CX',           power: '50 kW',  inst: 'Cooperativa Oncativo',   status: 'deg', fw: 'v3.1.8', latest: false },
  { sn: 'HWI-30KTL-2023-0015', brand: 'Huawei',  model: 'SUN2000-30KTL',    power: '30 kW',  inst: 'Criadero Montechiari',   status: 'on',  fw: 'v8.0.5', latest: false },
  { sn: 'SGW-110CX-2024-0019', brand: 'Sungrow', model: 'SG110CX',          power: '110 kW', inst: 'Agro San Marcos',        status: 'off', fw: 'v3.2.0', latest: false },
  { sn: 'SGW-50CX-2024-0021',  brand: 'Sungrow', model: 'SG50CX',           power: '50 kW',  inst: 'Bodega Los Aromos',      status: 'on',  fw: 'v3.2.1', latest: true  },
];
const STOCK = [
  { name: 'Jinko Tiger Neo 550W',    qty: 45,  unit: 'u',      kind: 'panel',     max: 60 },
  { name: 'Jinko Tiger Pro 540W',    qty: 12,  unit: 'u',      kind: 'panel',     max: 40 },
  { name: 'Sungrow SG110CX',         qty: 2,   unit: 'u',      kind: 'inverter',  max: 15, low: true  },
  { name: 'Sungrow SG50CX',          qty: 3,   unit: 'u',      kind: 'inverter',  max: 15, low: true  },
  { name: 'Huawei SUN2000-100KTL',   qty: 1,   unit: 'u',      kind: 'inverter',  max: 10, low: true, label: 'Reponer' },
  { name: 'Huawei SUN2000-30KTL',    qty: 4,   unit: 'u',      kind: 'inverter',  max: 15 },
  { name: 'Cable solar 6mm²',        qty: 850, unit: 'm',      kind: 'other',     max: 1000 },
  { name: 'Conectores MC4',          qty: 234, unit: 'pares',  kind: 'other',     max: 300 },
];
const MOVEMENTS = [
  { kind: 'in',  qty: '+20', item: 'Jinko Tiger Neo 550W', date: '18/04/2026', note: 'Recepción pedido #PO-2026-089' },
  { kind: 'out', qty: '-4',  item: 'Jinko Tiger Neo 550W', date: '17/04/2026', note: 'Instalación Hotel Sierras, Villa Carlos Paz' },
  { kind: 'out', qty: '-1',  item: 'Sungrow SG50CX',        date: '15/04/2026', note: 'Reemplazo en Cooperativa Oncativo' },
  { kind: 'in',  qty: '+50', item: 'Conectores MC4',        date: '14/04/2026', note: 'Recepción pedido #PO-2026-088' },
  { kind: 'out', qty: '-1',  item: 'Jinko Tiger Neo 550W', date: '12/04/2026', note: 'Reemplazo panel dañado Agro San Marcos' },
  { kind: 'res', qty: '~2',  item: 'Sungrow SG110CX',       date: '10/04/2026', note: 'Reservado para nueva instalación Monte Cristo' },
];

const PSTAT = {
  op:  { label: 'Operativo',   dot: '#10B981' },
  deg: { label: 'Degradado',   dot: '#F59E0B' },
  dmg: { label: 'Dañado',      dot: '#EF4444' },
  rep: { label: 'Reemplazado', dot: '#94A3B8' },
};
const ISTAT = {
  on:  { label: 'Online',     dot: '#10B981' },
  deg: { label: 'Degradado',  dot: '#F59E0B' },
  off: { label: 'Offline',    dot: '#EF4444' },
};

function EquipmentScreen() {
  const [tab, setTab] = React.useState('panels');
  const [detail, setDetail] = React.useState(null);

  return (
    <div className="col gap-20">
      <div className="row items-end justify-between">
        <div>
          <div className="t-eyebrow" style={{ color: 'var(--solar-500)' }}>Operaciones</div>
          <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>Equipos e Inventario</h1>
        </div>
        <button className="btn btn-primary">
          <Ic.plus /> {tab === 'panels' ? 'Registrar Panel' : tab === 'inverters' ? 'Registrar Inversor' : 'Registrar ingreso'}
        </button>
      </div>

      <div className="row gap-4" style={{ borderBottom: '1px solid rgba(148,163,184,0.12)' }}>
        {[
          { id: 'panels',    label: 'Paneles Solares' },
          { id: 'inverters', label: 'Inversores' },
          { id: 'stock',     label: 'Stock y Movimientos' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '12px 20px', background: 'transparent', border: 0, cursor: 'pointer',
            color: tab === t.id ? 'var(--solar-500)' : 'var(--text-2)',
            fontFamily: 'var(--f-display)', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            borderBottom: tab === t.id ? '2px solid var(--solar-500)' : '2px solid transparent',
            filter: tab === t.id ? 'drop-shadow(0 0 6px rgba(255,184,0,0.5))' : 'none',
          }}>{t.label}</button>
        ))}
      </div>

      {tab === 'panels'    && <PanelsTab onOpen={setDetail} />}
      {tab === 'inverters' && <InvertersTab onOpen={setDetail} />}
      {tab === 'stock'     && <StockTab />}

      {detail && <EquipmentDetail item={detail} onClose={() => setDetail(null)} />}
    </div>
  );
}

// ============================================================
// Panels Tab
// ============================================================
function PanelsTab({ onOpen }) {
  return (
    <div className="col gap-16">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <KCard label="Total de paneles" value="2,847"    unit="unidades" color="solar" />
        <KCard label="Potencia total"   value="1,565.8"  unit="kWp"      color="solar" />
        <KCard label="En garantía vigente" value="2,690" unit="94%"      color="emerald" />
        <KCard label="Requieren atención" value="12"     unit="paneles"  color="amber" />
      </div>

      <div className="card" style={{ padding: 14 }}>
        <div className="row gap-12 items-center" style={{ flexWrap: 'wrap' }}>
          <div className="search-wrap" style={{ width: 240 }}>
            <span className="search-icon"><Ic.search /></span>
            <input className="input with-icon" placeholder="Buscar N° de serie…" />
          </div>
          <select className="input" style={{ width: 180 }}>
            <option>Todas las instalaciones</option>
            <option>Lácteos Línea Dorada</option>
            <option>Frigorífico del Centro</option>
            <option>Bodega Los Aromos</option>
          </select>
          <div className="row gap-6">
            {[['all', 'Estado', '#FFB800'], ['op', 'Operativo', '#10B981'], ['deg', 'Degradado', '#F59E0B'], ['dmg', 'Dañado', '#EF4444'], ['rep', 'Reemplazado', '#94A3B8']].map(([id, l, c]) => (
              <button key={id} className={`chip ${id === 'all' ? 'active' : ''}`}>
                <span style={{ width: 6, height: 6, borderRadius: 50, background: c, boxShadow: `0 0 5px ${c}` }} />{l}
              </button>
            ))}
          </div>
          <span className="divider-v" style={{ height: 22 }} />
          <div className="row gap-6">
            {[['v', 'Vigente', '#10B981'], ['s', 'Por vencer 90d', '#F59E0B'], ['e', 'Vencida', '#EF4444']].map(([id, l, c]) => (
              <button key={id} className="chip">
                <span style={{ width: 6, height: 6, borderRadius: 50, background: c, boxShadow: `0 0 5px ${c}` }} />{l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
            <thead>
              <tr style={{ background: 'rgba(17,24,39,0.6)' }}>
                <THc>N° Serie</THc><THc>Modelo</THc><THc>Potencia</THc>
                <THc>Instalación</THc><THc>Ciudad</THc><THc>Estado</THc>
                <THc>Garantía hasta</THc><THc align="right">Acciones</THc>
              </tr>
            </thead>
            <tbody>
              {PANELS.map((p, i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(148,163,184,0.06)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,184,0,0.03)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <TDc mono dim>{p.sn}</TDc>
                  <TDc>{p.model}</TDc>
                  <TDc mono color="var(--solar-500)">{p.power}</TDc>
                  <TDc>{p.inst}</TDc>
                  <TDc dim>{p.city}</TDc>
                  <TDc><StatusBadge s={PSTAT[p.status]} /></TDc>
                  <TDc><WarrantyBadge date={p.warranty} wstatus={p.wstatus} /></TDc>
                  <TDc align="right">
                    <div className="row gap-6" style={{ justifyContent: 'flex-end' }}>
                      <button className="btn btn-outline btn-sm" onClick={() => onOpen({ ...p, kind: 'panel' })}>Ver</button>
                      <button className="btn btn-ghost btn-sm" title="Código QR">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <rect x="3" y="3" width="7" height="7" rx="1"/>
                          <rect x="14" y="3" width="7" height="7" rx="1"/>
                          <rect x="3" y="14" width="7" height="7" rx="1"/>
                          <path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20v1"/>
                        </svg>
                      </button>
                    </div>
                  </TDc>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row items-center justify-between" style={{ padding: '12px 18px', borderTop: '1px solid rgba(148,163,184,0.08)' }}>
          <span className="t-mono" style={{ fontSize: 11, color: 'var(--text-2)' }}>Mostrando 1-8 de 2,847 paneles</span>
          <div className="row gap-6">
            <button className="btn btn-ghost btn-sm" disabled style={{ opacity: 0.4 }}>‹ Anterior</button>
            <button className="chip active">1</button>
            <button className="chip">2</button>
            <button className="chip">3</button>
            <span style={{ color: 'var(--text-3)', fontSize: 12 }}>…</span>
            <button className="chip">356</button>
            <button className="btn btn-ghost btn-sm">Siguiente ›</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Inverters Tab
// ============================================================
function InvertersTab({ onOpen }) {
  return (
    <div className="col gap-16">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <KCard label="Total inversores"       value="34"   unit="unidades" color="solar" />
        <KCard label="Potencia nominal total" value="5.12" unit="MW"       color="solar" />
        <KCard label="Online"                 value="31"   unit="91%"      color="emerald" />
        <KCard label="Offline / con falla"    value="3"    unit="inversores" color="red" />
      </div>

      <div className="card" style={{ padding: 14 }}>
        <div className="row gap-12 items-center" style={{ flexWrap: 'wrap' }}>
          <div className="search-wrap" style={{ width: 240 }}>
            <span className="search-icon"><Ic.search /></span>
            <input className="input with-icon" placeholder="Buscar N° de serie o modelo…" />
          </div>
          <select className="input" style={{ width: 160 }}>
            <option>Todas las marcas</option>
            <option>Sungrow</option>
            <option>Huawei</option>
          </select>
          <div className="row gap-6">
            {[['all', 'Todos', '#FFB800'], ['on', 'Online', '#10B981'], ['deg', 'Degradado', '#F59E0B'], ['off', 'Offline', '#EF4444']].map(([id, l, c]) => (
              <button key={id} className={`chip ${id === 'all' ? 'active' : ''}`}>
                <span style={{ width: 6, height: 6, borderRadius: 50, background: c, boxShadow: `0 0 5px ${c}` }} />{l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
            <thead>
              <tr style={{ background: 'rgba(17,24,39,0.6)' }}>
                <THc>N° Serie</THc><THc>Marca</THc><THc>Modelo</THc>
                <THc>Potencia</THc><THc>Instalación</THc><THc>Estado</THc>
                <THc>Firmware</THc><THc align="right">Acciones</THc>
              </tr>
            </thead>
            <tbody>
              {INVERTERS.map((it, i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(148,163,184,0.06)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,184,0,0.03)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <TDc mono dim>{it.sn}</TDc>
                  <TDc>{it.brand}</TDc>
                  <TDc mono>{it.model}</TDc>
                  <TDc mono color="var(--solar-500)">{it.power}</TDc>
                  <TDc>{it.inst}</TDc>
                  <TDc><StatusBadge s={ISTAT[it.status]} pulse={it.status === 'on'} /></TDc>
                  <TDc>
                    <div className="col" style={{ gap: 2 }}>
                      <span className="t-mono" style={{ fontSize: 12 }}>{it.fw}</span>
                      {!it.latest && (
                        <span style={{
                          fontSize: 9, fontFamily: 'var(--f-mono)', fontWeight: 700,
                          padding: '1px 5px', borderRadius: 3,
                          color: 'var(--cyan-500)', background: 'rgba(14,165,233,0.12)',
                          border: '1px solid rgba(14,165,233,0.35)',
                          letterSpacing: '0.06em', textTransform: 'uppercase',
                          width: 'fit-content',
                        }}>Actualización disponible</span>
                      )}
                    </div>
                  </TDc>
                  <TDc align="right">
                    <div className="row gap-6" style={{ justifyContent: 'flex-end' }}>
                      <button className="btn btn-outline btn-sm" onClick={() => onOpen({ ...it, kind: 'inverter' })}>Ver</button>
                      <button className="btn btn-sm" style={{
                        background: 'rgba(14,165,233,0.12)',
                        border: '1px solid rgba(14,165,233,0.4)',
                        color: 'var(--cyan-500)',
                        textShadow: '0 0 8px rgba(14,165,233,0.5)',
                      }}>Diagnosticar</button>
                    </div>
                  </TDc>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row items-center justify-between" style={{ padding: '12px 18px', borderTop: '1px solid rgba(148,163,184,0.08)' }}>
          <span className="t-mono" style={{ fontSize: 11, color: 'var(--text-2)' }}>Mostrando 1-6 de 34 inversores</span>
          <div className="row gap-6">
            <button className="chip active">1</button>
            <button className="chip">2</button>
            <button className="chip">3</button>
            <button className="chip">4</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Stock Tab
// ============================================================
function StockTab() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {/* Stock cards */}
      <div className="card bracket" style={{ padding: 18 }}>
        <div className="row items-center justify-between mb-16">
          <div>
            <div className="t-eyebrow">Depósito central</div>
            <div className="t-display" style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Stock disponible</div>
          </div>
          <span className="t-mono" style={{ fontSize: 11, color: 'var(--text-2)' }}>{STOCK.length} items</span>
        </div>
        <div className="col gap-10">
          {STOCK.map((s, i) => <StockCard key={i} s={s} />)}
        </div>
        <button className="btn btn-primary w-full mt-16" style={{ justifyContent: 'center' }}>
          <Ic.plus /> Registrar ingreso
        </button>
      </div>

      {/* Movements timeline */}
      <div className="card" style={{ padding: 18 }}>
        <div className="row items-center justify-between mb-16">
          <div>
            <div className="t-eyebrow">Historial</div>
            <div className="t-display" style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Últimos movimientos</div>
          </div>
          <button className="btn btn-ghost btn-sm">Ver todos</button>
        </div>
        <div className="col" style={{ position: 'relative', paddingLeft: 6 }}>
          {MOVEMENTS.map((m, i) => {
            const color = m.kind === 'in' ? '#10B981' : m.kind === 'out' ? '#EF4444' : '#F59E0B';
            const label = m.kind === 'in' ? 'Ingreso' : m.kind === 'out' ? 'Egreso' : 'Reserva';
            return (
              <div key={i} className="row items-start gap-14" style={{ paddingBottom: i === MOVEMENTS.length - 1 ? 0 : 16, position: 'relative' }}>
                {i < MOVEMENTS.length - 1 && (
                  <span style={{ position: 'absolute', left: 6, top: 18, bottom: 0, width: 1, background: 'rgba(148,163,184,0.15)' }} />
                )}
                <span style={{
                  width: 13, height: 13, borderRadius: '50%',
                  background: color, boxShadow: `0 0 10px ${color}`,
                  flexShrink: 0, marginTop: 3,
                  border: '2px solid rgba(10,14,26,1)',
                  outline: `1px solid ${color}`,
                }} />
                <div className="flex-1" style={{
                  padding: '8px 12px',
                  background: 'rgba(17,24,39,0.55)',
                  border: '1px solid rgba(148,163,184,0.08)',
                  borderLeft: `3px solid ${color}`,
                  borderRadius: 8,
                }}>
                  <div className="row items-center justify-between">
                    <div className="row items-center gap-8">
                      <span style={{
                        fontSize: 9, fontFamily: 'var(--f-mono)', fontWeight: 700,
                        padding: '1px 6px', borderRadius: 4,
                        color: color, background: color + '22', border: `1px solid ${color}55`,
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                      }}>{label}</span>
                      <span className="t-mono" style={{ fontSize: 14, color: color, fontWeight: 700 }}>{m.qty}</span>
                      <span style={{ fontSize: 13, color: 'var(--text-0)', fontWeight: 500 }}>{m.item}</span>
                    </div>
                    <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)' }}>{m.date}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 4 }}>{m.note}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StockCard({ s }) {
  const pct = Math.min(100, (s.qty / s.max) * 100);
  const color = s.qty < 5 ? '#EF4444' : s.qty < 20 ? '#F59E0B' : '#10B981';
  const bg = color + '22';
  const iconSvg = s.kind === 'panel' ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="4" width="18" height="16" rx="1"/>
      <path d="M3 10h18M3 14h18M9 4v16M15 4v16"/>
    </svg>
  ) : s.kind === 'inverter' ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="3" width="16" height="18" rx="2"/>
      <path d="M8 8h8M8 12h8M8 16h5"/>
      <circle cx="17" cy="16" r="1.2" fill="currentColor"/>
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 7h16l-1 13H5L4 7zM9 7V4h6v3"/>
    </svg>
  );

  return (
    <div style={{
      padding: '12px 14px',
      background: 'rgba(17,24,39,0.55)',
      border: '1px solid rgba(148,163,184,0.08)',
      borderRadius: 10,
    }}>
      <div className="row items-center gap-12 mb-10">
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          background: bg, color: color,
          display: 'grid', placeItems: 'center',
          border: `1px solid ${color}44`,
          flexShrink: 0,
        }}>{iconSvg}</div>
        <div className="flex-1" style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-0)' }}>{s.name}</div>
          <div className="row items-center gap-8 mt-2">
            <span className="t-mono" style={{ fontSize: 15, fontWeight: 700, color: color, textShadow: `0 0 8px ${color}88` }}>{s.qty}</span>
            <span style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.unit}</span>
            {s.low && (
              <span style={{
                fontSize: 9, fontFamily: 'var(--f-mono)', fontWeight: 700,
                padding: '1px 6px', borderRadius: 3,
                color: '#EF4444', background: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(239,68,68,0.4)',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                marginLeft: 'auto',
              }}>{s.label || 'Stock bajo'}</span>
            )}
          </div>
        </div>
      </div>
      <div style={{
        height: 4, background: 'rgba(148,163,184,0.12)', borderRadius: 2, overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}, ${color}cc)`,
          boxShadow: `0 0 8px ${color}88`,
        }} />
      </div>
    </div>
  );
}

// ============================================================
// Helpers
// ============================================================
function KCard({ label, value, unit, color }) {
  const map = {
    solar:   'var(--solar-500)',
    emerald: 'var(--emerald-500)',
    cyan:    'var(--cyan-500)',
    amber:   '#F59E0B',
    red:     'var(--red-500)',
  };
  return (
    <div className="card bracket" style={{ padding: 16 }}>
      <div className="t-eyebrow">{label}</div>
      <div className="row items-baseline gap-8 mt-8">
        <span className="t-display" style={{
          fontSize: 28, fontWeight: 700, lineHeight: 1,
          color: map[color],
          textShadow: `0 0 14px ${map[color]}77`,
        }}>{value}</span>
        <span style={{ fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--f-mono)' }}>{unit}</span>
      </div>
    </div>
  );
}

function THc({ children, align }) {
  return <th style={{
    textAlign: align || 'left', padding: '12px 14px',
    fontFamily: 'var(--f-display)', fontSize: 10, fontWeight: 600,
    letterSpacing: '0.12em', textTransform: 'uppercase',
    color: 'var(--text-3)',
  }}>{children}</th>;
}
function TDc({ children, mono, dim, align, color }) {
  return <td style={{
    padding: '12px 14px', fontSize: 12.5,
    textAlign: align || 'left',
    fontFamily: mono ? 'var(--f-mono)' : 'var(--f-body)',
    color: color || (dim ? 'var(--text-2)' : 'var(--text-0)'),
    whiteSpace: 'nowrap',
  }}>{children}</td>;
}

function StatusBadge({ s, pulse }) {
  return (
    <span className="row items-center gap-6" style={{
      padding: '3px 8px', borderRadius: 4,
      background: s.dot + '1f',
      border: `1px solid ${s.dot}55`,
      width: 'fit-content',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: s.dot, boxShadow: `0 0 6px ${s.dot}`,
        animation: pulse ? 'pulseDot 1.4s ease-in-out infinite' : 'none',
      }} />
      <span style={{
        fontSize: 10, fontFamily: 'var(--f-mono)', fontWeight: 700,
        color: s.dot, letterSpacing: '0.06em', textTransform: 'uppercase',
      }}>{s.label}</span>
      <style>{`@keyframes pulseDot { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }`}</style>
    </span>
  );
}

function WarrantyBadge({ date, wstatus }) {
  if (wstatus === 'soon') {
    return (
      <span className="row items-center gap-6" style={{
        padding: '3px 8px', borderRadius: 4,
        background: 'rgba(245,158,11,0.14)',
        border: '1px solid rgba(245,158,11,0.45)',
        width: 'fit-content',
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
          <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
        </svg>
        <span className="t-mono" style={{ fontSize: 11, color: '#F59E0B', fontWeight: 600 }}>{date}</span>
        <span style={{ fontSize: 9, color: '#F59E0B', letterSpacing: '0.06em', textTransform: 'uppercase' }}>por vencer</span>
      </span>
    );
  }
  return <span className="t-mono" style={{ fontSize: 12, color: 'var(--text-1)' }}>{date}</span>;
}

// ============================================================
// Equipment detail panel
// ============================================================
function EquipmentDetail({ item, onClose }) {
  const isPanel = item.kind === 'panel';
  const STAT = isPanel ? PSTAT : ISTAT;
  const s = STAT[item.status];

  const specs = isPanel ? [
    ['Marca', 'Jinko Solar'],
    ['Modelo', item.model],
    ['Potencia nominal', item.power],
    ['Tecnología', 'N-Type TOPCon'],
    ['Dimensiones', '2274 × 1134 × 30 mm'],
    ['Peso', '27.5 kg'],
    ['Eficiencia', '21.33%'],
    ['Vmpp / Impp', '41.7 V / 13.19 A'],
  ] : [
    ['Marca', item.brand],
    ['Modelo', item.model],
    ['Potencia nominal', item.power],
    ['Entradas MPPT', '9'],
    ['Eficiencia máx.', '98.7%'],
    ['Rango DC', '180-1000 V'],
    ['Firmware', item.fw],
    ['Protección', 'IP66'],
  ];

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(5, 8, 16, 0.65)', backdropFilter: 'blur(4px)',
      }} />
      <aside style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 420,
        zIndex: 201,
        background: 'rgba(10,14,26,0.94)',
        backdropFilter: 'blur(20px) saturate(140%)',
        borderLeft: '1px solid rgba(255,184,0,0.22)',
        padding: '22px 22px 26px',
        overflowY: 'auto',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
        animation: 'slideInR .3s ease-out',
      }}>
        <style>{`@keyframes slideInR { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>

        <div className="row items-start justify-between mb-16">
          <div>
            <div className="t-eyebrow">{isPanel ? 'Panel solar' : 'Inversor'}</div>
            <div className="t-display" style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>{item.model}</div>
            <div className="t-mono" style={{
              fontSize: 12, color: 'var(--solar-500)', fontWeight: 700,
              textShadow: '0 0 8px rgba(255,184,0,0.4)', marginTop: 6, letterSpacing: '0.04em',
            }}>{item.sn}</div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><Ic.close /></button>
        </div>

        {/* Equipment illustration placeholder */}
        <div style={{
          height: 140, borderRadius: 10,
          background: 'linear-gradient(135deg, rgba(17,24,39,0.9), rgba(14,165,233,0.06))',
          border: '1px solid rgba(255,184,0,0.15)',
          display: 'grid', placeItems: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {isPanel ? (
            <svg width="160" height="100" viewBox="0 0 160 100">
              <defs>
                <linearGradient id="pnl" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#1E40AF"/>
                  <stop offset="1" stopColor="#0C1A3E"/>
                </linearGradient>
              </defs>
              <rect x="10" y="10" width="140" height="80" rx="2" fill="url(#pnl)" stroke="#FFB800" strokeOpacity="0.4"/>
              {[...Array(6)].map((_, c) => [...Array(4)].map((_, r) => (
                <rect key={`${c}-${r}`} x={15 + c * 23} y={15 + r * 18} width={21} height={16} fill="none" stroke="#FFB80055" strokeWidth="0.5"/>
              )))}
            </svg>
          ) : (
            <svg width="100" height="120" viewBox="0 0 100 120">
              <rect x="10" y="10" width="80" height="100" rx="6" fill="#0F172A" stroke="#FFB800" strokeOpacity="0.4"/>
              <rect x="20" y="20" width="60" height="8" rx="1" fill="#10B981" opacity="0.6"/>
              <text x="50" y="55" fill="#FFB800" fontSize="9" textAnchor="middle" fontFamily="monospace" opacity="0.9">{item.brand}</text>
              <rect x="20" y="65" width="60" height="2" fill="#0EA5E9" opacity="0.4"/>
              <rect x="20" y="70" width="40" height="2" fill="#0EA5E9" opacity="0.3"/>
              <circle cx="35" cy="95" r="3" fill="#10B981"/>
              <circle cx="50" cy="95" r="3" fill="#F59E0B"/>
              <circle cx="65" cy="95" r="3" fill="#0EA5E9"/>
            </svg>
          )}
        </div>

        <hr className="divider mt-20" />

        <div className="mt-16">
          <div className="t-eyebrow mb-12">Datos técnicos</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {specs.map(([k, v]) => (
              <div key={k}>
                <div className="t-mono" style={{ fontSize: 9, color: 'var(--text-3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{k}</div>
                <div style={{ fontSize: 12, color: 'var(--text-0)', fontWeight: 600, marginTop: 3 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <hr className="divider mt-20" />

        <div className="mt-16">
          <div className="t-eyebrow mb-12">Ubicación</div>
          <div style={{
            padding: 12,
            background: 'rgba(17,24,39,0.5)',
            border: '1px solid rgba(148,163,184,0.1)',
            borderRadius: 8,
          }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{item.inst}</div>
            <div className="row items-center gap-4 mt-4" style={{ fontSize: 11, color: 'var(--text-2)' }}>
              <Ic.pin /><span>{item.city || 'Córdoba'}, Córdoba</span>
            </div>
            <div style={{
              marginTop: 10, height: 80, borderRadius: 6,
              background: 'radial-gradient(circle at 60% 40%, rgba(14,165,233,0.2), transparent 60%), rgba(17,24,39,0.8)',
              border: '1px solid rgba(14,165,233,0.2)',
              position: 'relative', overflow: 'hidden',
            }}>
              <svg width="100%" height="100%" viewBox="0 0 300 80" preserveAspectRatio="none">
                <path d="M0 40 Q 75 20, 150 50 T 300 30" fill="none" stroke="rgba(14,165,233,0.3)" strokeWidth="0.8"/>
                <path d="M0 60 Q 100 45, 200 55 T 300 50" fill="none" stroke="rgba(14,165,233,0.2)" strokeWidth="0.6"/>
              </svg>
              <div style={{
                position: 'absolute', left: '60%', top: '45%', transform: 'translate(-50%, -50%)',
                width: 14, height: 14, borderRadius: '50%',
                background: 'var(--solar-500)',
                boxShadow: '0 0 12px rgba(255,184,0,0.9), 0 0 24px rgba(255,184,0,0.4)',
                border: '2px solid #0A0E1A',
              }} />
            </div>
          </div>
        </div>

        <hr className="divider mt-20" />

        <div className="mt-16">
          <div className="t-eyebrow mb-12">Estado</div>
          <StatusBadge s={s} />
          <div className="col mt-12" style={{ position: 'relative' }}>
            {[
              { t: 'Nuevo',     d: '15/03/2023', done: true },
              { t: 'Instalado', d: '22/03/2023', done: true },
              { t: 'Operativo', d: '22/03/2023 · Actual', done: true },
            ].map((e, i, arr) => (
              <div key={i} className="row items-start gap-10" style={{ paddingBottom: i === arr.length - 1 ? 0 : 10, position: 'relative' }}>
                {i < arr.length - 1 && <span style={{ position: 'absolute', left: 5, top: 14, bottom: 0, width: 1, background: 'rgba(255,184,0,0.3)' }} />}
                <span style={{
                  width: 11, height: 11, borderRadius: '50%',
                  background: 'var(--solar-500)', boxShadow: '0 0 8px rgba(255,184,0,0.5)',
                  flexShrink: 0, marginTop: 3,
                }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{e.t}</div>
                  <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 1 }}>{e.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="divider mt-20" />

        <div className="mt-16">
          <div className="t-eyebrow mb-12">Garantía</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <div className="t-mono" style={{ fontSize: 9, color: 'var(--text-3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Inicio</div>
              <div className="t-mono" style={{ fontSize: 13, color: 'var(--text-0)', fontWeight: 600, marginTop: 3 }}>03/2023</div>
            </div>
            <div>
              <div className="t-mono" style={{ fontSize: 9, color: 'var(--text-3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Fin</div>
              <div className="t-mono" style={{ fontSize: 13, color: 'var(--solar-500)', fontWeight: 600, marginTop: 3 }}>{item.warranty || '03/2028'}</div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <div className="t-mono" style={{ fontSize: 9, color: 'var(--text-3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Proveedor</div>
              <div style={{ fontSize: 13, color: 'var(--text-0)', fontWeight: 600, marginTop: 3 }}>{isPanel ? 'Jinko Solar Argentina' : item.brand + ' Iberoamérica'}</div>
            </div>
          </div>
        </div>

        <hr className="divider mt-20" />

        {/* QR */}
        <div className="mt-16">
          <div className="t-eyebrow mb-12">Identificación QR</div>
          <div style={{
            display: 'grid', gridTemplateColumns: '120px 1fr', gap: 14,
            padding: 14,
            background: 'rgba(17,24,39,0.55)',
            border: '1px solid rgba(255,184,0,0.2)',
            borderRadius: 10,
          }}>
            <QRPlaceholder />
            <div>
              <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Serial</div>
              <div className="t-mono" style={{ fontSize: 11, color: 'var(--solar-500)', fontWeight: 700, marginTop: 4, wordBreak: 'break-all' }}>{item.sn}</div>
              <button className="btn btn-outline btn-sm mt-12">Descargar PNG</button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="col gap-8 mt-20">
          <button className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>Generar reporte</button>
          <button className="btn btn-outline w-full" style={{ justifyContent: 'center' }}>Crear orden de mantenimiento</button>
          <button className="btn btn-ghost w-full" style={{ justifyContent: 'center' }}>Registrar cambio de estado</button>
        </div>
      </aside>
    </>
  );
}

function QRPlaceholder() {
  // Deterministic pseudo-QR
  const cells = [];
  const size = 11;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const isCorner = (x < 3 && y < 3) || (x > size - 4 && y < 3) || (x < 3 && y > size - 4);
      const on = isCorner ? ((x + y) % 2 === 0 || (x === 1 && y === 1) || (x === size - 2 && y === 1) || (x === 1 && y === size - 2)) :
                 ((x * 7 + y * 3) % 4 === 0 || (x * y) % 5 === 0);
      cells.push({ x, y, on });
    }
  }
  return (
    <div style={{
      width: 120, height: 120,
      background: '#FFF',
      borderRadius: 6,
      padding: 6,
      display: 'grid',
      gridTemplateColumns: `repeat(${size}, 1fr)`,
      gridTemplateRows: `repeat(${size}, 1fr)`,
      gap: 1,
    }}>
      {cells.map((c, i) => (
        <span key={i} style={{
          background: c.on ? '#0A0E1A' : 'transparent',
          borderRadius: 0.5,
        }} />
      ))}
    </div>
  );
}

Object.assign(window, { EquipmentScreen });
