/* global React, Ic, PARKS, STATUS_META, SolarCurveMini, Gauge */
// Map — Mapa de Instalaciones (hero screen)

const { useState: useMapState } = React;

function MapScreen() {
  const [selected, setSelected] = React.useState(PARKS[0]);
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [typeFilter, setTypeFilter] = React.useState('Todos');
  const [power, setPower] = React.useState([0, 250]);
  const [query, setQuery] = React.useState('');
  const [showIrradiance, setShowIrradiance] = React.useState(false);

  const okCount = PARKS.filter(p => p.status === 'ok').length;
  const warnCount = PARKS.filter(p => p.status === 'warn').length;
  const alertCount = PARKS.filter(p => p.status === 'alert').length;
  const installCount = PARKS.filter(p => p.status === 'install').length;

  const filtered = PARKS.filter(p => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (typeFilter !== 'Todos' && p.type !== typeFilter) return false;
    if (p.kWp < power[0] || p.kWp > power[1]) return false;
    if (query && !p.name.toLowerCase().includes(query.toLowerCase()) && !p.city.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ position: 'relative', height: 'calc(100vh - var(--header-h))', overflow: 'hidden' }}>
      {/* Map canvas */}
      <MapCanvas parks={filtered} selected={selected} onSelect={setSelected} showIrradiance={showIrradiance} />

      {/* Top floating filter bar */}
      <div className="glass" style={{
        position: 'absolute', top: 18, left: 18, right: selected ? 416 : 18,
        padding: 14, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
        background: 'rgba(10,14,26,0.72)',
        borderColor: 'rgba(255,184,0,0.22)',
        transition: 'right .3s ease',
      }}>
        <div className="row gap-6 items-center">
          {[
            { id: 'all',     label: 'Todos',         count: PARKS.length, color: '#FFB800' },
            { id: 'ok',      label: 'Operativo',     count: okCount,      color: '#10B981' },
            { id: 'warn',    label: 'Mantenimiento', count: warnCount,    color: '#F59E0B' },
            { id: 'alert',   label: 'Alerta',        count: alertCount,   color: '#EF4444' },
            { id: 'install', label: 'Instalación',   count: installCount, color: '#0EA5E9' },
          ].map(f => (
            <button key={f.id}
              className={`chip ${statusFilter === f.id ? 'active' : ''}`}
              onClick={() => setStatusFilter(f.id)}>
              <span style={{ width: 6, height: 6, borderRadius: 50, background: f.color, boxShadow: `0 0 6px ${f.color}` }} />
              {f.label} <span className="count">{f.count}</span>
            </button>
          ))}
        </div>
        <span className="divider-v" />
        <select className="input" style={{ width: 160, padding: '8px 12px' }} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          {['Todos', 'Comercial', 'Industrial', 'Agro', 'Cooperativa', 'Comunidad'].map(t => <option key={t}>{t}</option>)}
        </select>
        <div className="col gap-4" style={{ width: 180 }}>
          <div className="row justify-between t-mono" style={{ fontSize: 10, color: 'var(--text-2)' }}>
            <span>POTENCIA</span>
            <span>{power[0]}–{power[1]} kWp</span>
          </div>
          <input type="range" min="0" max="250" value={power[1]}
            onChange={e => setPower([0, parseInt(e.target.value)])}
            style={{ accentColor: '#FFB800' }} />
        </div>
        <div className="search-wrap flex-1" style={{ minWidth: 200 }}>
          <span className="search-icon"><Ic.search /></span>
          <input className="input with-icon" placeholder="Buscar por nombre o ciudad…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <span className="t-mono" style={{ fontSize: 11, color: 'var(--text-2)', whiteSpace: 'nowrap' }}>
          {filtered.length}/{PARKS.length}
        </span>
      </div>

      {/* Bottom-left irradiance toggle */}
      <div className="glass" style={{
        position: 'absolute', bottom: 18, left: 18,
        padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
        background: 'rgba(10,14,26,0.72)',
      }}>
        <Ic.layers />
        <div className="col">
          <div style={{ fontSize: 12, fontWeight: 600 }}>Capa de irradiancia</div>
          <div style={{ fontSize: 10, color: 'var(--text-3)' }}>kWh/m²/día · media anual</div>
        </div>
        <label style={{ position: 'relative', display: 'inline-block', width: 38, height: 22 }}>
          <input type="checkbox" checked={showIrradiance} onChange={e => setShowIrradiance(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
          <span style={{
            position: 'absolute', cursor: 'pointer', inset: 0,
            background: showIrradiance ? 'var(--solar-500)' : 'rgba(148,163,184,0.2)',
            borderRadius: 22,
            transition: '.2s',
            boxShadow: showIrradiance ? '0 0 12px rgba(255,184,0,0.5)' : 'none',
          }}>
            <span style={{
              position: 'absolute', height: 16, width: 16, left: showIrradiance ? 20 : 3, top: 3,
              background: 'white', borderRadius: '50%', transition: '.2s',
            }} />
          </span>
        </label>
        {showIrradiance && (
          <div className="row items-center gap-4" style={{ marginLeft: 8, fontSize: 10, fontFamily: 'var(--f-mono)' }}>
            <span style={{ color: '#0EA5E9' }}>4.2</span>
            <span style={{ width: 70, height: 8, background: 'linear-gradient(90deg, #0EA5E9, #10B981, #FFB800, #F97316, #EF4444)', borderRadius: 4 }} />
            <span style={{ color: '#EF4444' }}>6.8</span>
          </div>
        )}
      </div>

      {/* Bottom-right zoom controls */}
      <div className="glass" style={{ position: 'absolute', bottom: 18, right: selected ? 416 : 18, padding: 6, transition: 'right .3s' }}>
        <div className="col gap-4">
          <button className="btn btn-ghost btn-icon">+</button>
          <button className="btn btn-ghost btn-icon">–</button>
        </div>
      </div>

      {/* Right-side detail panel */}
      {selected && <DetailPanel park={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

// ============================================================
// Map canvas
// ============================================================
function MapCanvas({ parks, selected, onSelect, showIrradiance }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background:
        'radial-gradient(ellipse at 40% 50%, rgba(14,165,233,0.06), transparent 55%), ' +
        'linear-gradient(180deg, #080B14, #020308)',
      overflow: 'hidden',
    }}>
      {/* Lon/Lat grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage:
          'linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), ' +
          'linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage:
          'linear-gradient(rgba(148,163,184,0.025) 1px, transparent 1px), ' +
          'linear-gradient(90deg, rgba(148,163,184,0.025) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />

      {/* Coordinate labels */}
      {['31°00\'S', '32°00\'S', '33°00\'S', '34°00\'S'].map((lbl, i) => (
        <div key={lbl} style={{
          position: 'absolute', left: 20, top: `${15 + i * 20}%`,
          fontFamily: 'var(--f-mono)', fontSize: 10, color: 'rgba(148,163,184,0.35)',
        }}>{lbl}</div>
      ))}
      {['65°00\'W', '64°00\'W', '63°00\'W', '62°00\'W'].map((lbl, i) => (
        <div key={lbl} style={{
          position: 'absolute', top: 20, left: `${15 + i * 20}%`,
          fontFamily: 'var(--f-mono)', fontSize: 10, color: 'rgba(148,163,184,0.35)',
        }}>{lbl}</div>
      ))}

      {/* Córdoba province */}
      <svg viewBox="0 0 100 62" preserveAspectRatio="xMidYMid meet" style={{
        position: 'absolute', inset: '5% 8%', width: '84%', height: '90%',
      }}>
        <defs>
          <linearGradient id="province" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#FFB800" stopOpacity="0.04" />
          </linearGradient>
          {showIrradiance && (
            <radialGradient id="irr" cx="55%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.35" />
              <stop offset="40%" stopColor="#FFB800" stopOpacity="0.28" />
              <stop offset="75%" stopColor="#10B981" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.05" />
            </radialGradient>
          )}
        </defs>
        {/* Province shape */}
        <path d="M12,6 L85,5 L92,18 L90,32 L86,46 L78,56 L50,60 L22,56 L8,42 L6,24 Z"
              fill="url(#province)" stroke="rgba(255,184,0,0.3)" strokeWidth="0.25" strokeDasharray="1 1" />
        {/* Major rivers (stylized) */}
        <path d="M20,16 Q40,22 62,18 T92,20" fill="none" stroke="rgba(14,165,233,0.15)" strokeWidth="0.3" />
        <path d="M14,42 Q30,36 48,42 T86,44" fill="none" stroke="rgba(14,165,233,0.15)" strokeWidth="0.3" />
        {/* Sierra ridges */}
        <path d="M18,14 L22,22 L19,30 L24,38 L20,48" fill="none" stroke="rgba(148,163,184,0.2)" strokeWidth="0.25" strokeDasharray="0.5 0.5" />
        {showIrradiance && <rect x="0" y="0" width="100" height="62" fill="url(#irr)" />}
      </svg>

      {/* City labels */}
      {[
        { n: 'Córdoba Capital', x: 42, y: 44 },
        { n: 'Río Cuarto',      x: 32, y: 73 },
        { n: 'Villa María',     x: 46, y: 59 },
        { n: 'San Francisco',   x: 72, y: 36 },
        { n: 'Villa Dolores',   x: 14, y: 58 },
        { n: 'Jesús María',     x: 48, y: 30 },
      ].map((c, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${c.x}%`, top: `${c.y + 3}%`,
          transform: 'translateX(-50%)',
          fontFamily: 'var(--f-mono)', fontSize: 10,
          color: 'rgba(203,213,225,0.55)',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          pointerEvents: 'none',
        }}>{c.n}</div>
      ))}

      {/* Markers */}
      {parks.map(p => (
        <MapMarker key={p.id} park={p} selected={selected?.id === p.id} onClick={() => onSelect(p)} />
      ))}
    </div>
  );
}

function MapMarker({ park, selected, onClick }) {
  const [hover, setHover] = React.useState(false);
  const m = STATUS_META[park.status];
  const size = 10 + (park.kWp / 220) * 18;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'absolute',
        left: `${park.x}%`, top: `${park.y}%`,
        width: size, height: size,
        transform: 'translate(-50%, -50%)',
        background: 'transparent',
        border: 0, padding: 0, cursor: 'pointer',
      }}
    >
      {/* Pulsing ring for alerts */}
      {(park.status === 'alert' || selected) && (
        <>
          <span style={{
            position: 'absolute', inset: -size * 0.5,
            border: `1.5px solid ${m.color}`,
            borderRadius: '50%', opacity: 0.5,
            animation: 'pulseRing 1.8s ease-out infinite',
          }} />
          <span style={{
            position: 'absolute', inset: -size * 0.25,
            border: `1px solid ${m.color}`,
            borderRadius: '50%', opacity: 0.3,
            animation: 'pulseRing 1.8s ease-out infinite .9s',
          }} />
        </>
      )}
      {/* Core */}
      <span style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle, ${m.color} 0%, ${m.color}aa 60%, ${m.color}00 100%)`,
        borderRadius: '50%',
        boxShadow: `0 0 ${park.status === 'alert' ? 20 : 10}px ${m.color}`,
      }} />
      <span style={{
        position: 'absolute', inset: '25%',
        background: m.color,
        border: `1.5px solid rgba(255,255,255,0.8)`,
        borderRadius: '50%',
      }} />
      {(hover || selected) && (
        <div style={{
          position: 'absolute', bottom: size + 8, left: '50%', transform: 'translateX(-50%)',
          padding: '8px 12px',
          background: 'rgba(10,14,26,0.92)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${m.color}55`,
          borderRadius: 8,
          whiteSpace: 'nowrap',
          zIndex: 5,
          boxShadow: `0 6px 24px rgba(0,0,0,0.5), 0 0 16px ${m.color}33`,
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-0)' }}>{park.name}</div>
          <div className="row items-center gap-8" style={{ fontSize: 10, color: 'var(--text-2)', marginTop: 2 }}>
            <span className="t-mono" style={{ color: m.color }}>{park.kWp} kWp</span>
            <span className="dot-sep">·</span>
            <span>{m.label}</span>
          </div>
        </div>
      )}
    </button>
  );
}

// ============================================================
// Detail panel
// ============================================================
function DetailPanel({ park, onClose }) {
  const m = STATUS_META[park.status];
  const injected = Math.round(park.genToday * 0.7);
  const self = Math.round(park.genToday - injected);
  return (
    <aside style={{
      position: 'absolute', top: 0, right: 0, bottom: 0,
      width: 400,
      background: 'rgba(10, 14, 26, 0.88)',
      backdropFilter: 'blur(18px) saturate(140%)',
      borderLeft: '1px solid rgba(255,184,0,0.2)',
      padding: '22px 22px 28px',
      overflowY: 'auto',
      animation: 'slideIn .3s ease-out',
    }}>
      <style>{`@keyframes slideIn { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>

      <div className="row items-start justify-between mb-12">
        <div className="flex-1">
          <span className={`badge ${m.badge}`}><span className="dot"></span>{m.label}</span>
          <h3 className="t-display" style={{ fontSize: 22, fontWeight: 600, margin: '10px 0 4px' }}>{park.name}</h3>
          <div className="row items-center gap-6" style={{ color: 'var(--text-2)', fontSize: 12 }}>
            <Ic.pin /> <span>{park.city}, Córdoba</span>
          </div>
        </div>
        <button className="btn btn-ghost btn-icon" onClick={onClose}><Ic.close /></button>
      </div>

      <hr className="divider" />

      {/* Data grid */}
      <div className="mt-16">
        <div className="t-eyebrow mb-12">Datos del Parque</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <DataItem label="Potencia"    value={`${park.kWp} kWp`} highlight />
          <DataItem label="Paneles"     value={`${park.panels}`} sub="Jinko Tiger Neo 550W" />
          <DataItem label="Inversor"    value={park.inverter} wide />
          <DataItem label="Instalado"   value={park.installed} />
          <DataItem label="Últ. mant."  value="15/02/2026" />
        </div>
      </div>

      <hr className="divider mt-20" />

      {/* Generation today */}
      <div className="mt-16">
        <div className="row justify-between items-center mb-12">
          <div className="t-eyebrow">Generación Hoy</div>
          <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)' }}>20 ABR · 14:23</span>
        </div>
        <div className="row items-baseline gap-8 mb-8">
          <span className="t-display" style={{ fontSize: 28, fontWeight: 700, color: 'var(--solar-500)', textShadow: '0 0 16px rgba(255,184,0,0.5)' }}>{park.genToday.toLocaleString('es-AR')}</span>
          <span style={{ color: 'var(--text-2)', fontSize: 13 }}>kWh</span>
        </div>
        <SolarCurveMini width={356} height={72} />
        <div className="row gap-16 mt-12">
          <FlowItem label="Inyección" value={`${injected.toLocaleString('es-AR')} kWh`} pct="70%" color="#10B981" />
          <FlowItem label="Autoconsumo" value={`${self.toLocaleString('es-AR')} kWh`} pct="30%" color="#FFB800" />
        </div>
        <div className="progress-bar mt-12">
          <span style={{ width: '70%', background: 'linear-gradient(90deg, #FFB800, #10B981)' }}></span>
        </div>
      </div>

      <hr className="divider mt-20" />

      {/* Performance gauge */}
      <div className="mt-16">
        <div className="t-eyebrow mb-12">Performance</div>
        <div className="row items-center gap-16">
          <Gauge value={park.efficiency} size={120} label="Eficiencia" />
          <div className="col gap-8">
            <div>
              <div className="t-mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>ESPERADO</div>
              <div className="t-mono" style={{ fontSize: 18, color: 'var(--text-0)', fontWeight: 600 }}>96%</div>
            </div>
            <div>
              <div className="t-mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>DELTA</div>
              <div className="t-mono" style={{ fontSize: 18, color: park.efficiency < 90 ? 'var(--red-500)' : 'var(--emerald-500)', fontWeight: 600 }}>
                {park.efficiency - 96 >= 0 ? '+' : ''}{park.efficiency - 96}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="col gap-8 mt-24">
        <button className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>Ver detalle completo</button>
        <button className="btn btn-outline cyan w-full" style={{ justifyContent: 'center' }}><Ic.sparkles /> Consultar al Asistente IA</button>
        <button className="btn btn-ghost w-full" style={{ justifyContent: 'center' }}><Ic.wrench /> Crear orden de mantenimiento</button>
      </div>
    </aside>
  );
}

function DataItem({ label, value, sub, highlight, wide }) {
  return (
    <div style={{ gridColumn: wide ? 'span 2' : 'auto' }}>
      <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</div>
      <div className="t-mono" style={{ fontSize: highlight ? 16 : 13, color: highlight ? 'var(--solar-500)' : 'var(--text-0)', fontWeight: 600, marginTop: 4 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function FlowItem({ label, value, pct, color }) {
  return (
    <div className="col flex-1">
      <div className="row items-center gap-6">
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}` }}></span>
        <span style={{ fontSize: 11, color: 'var(--text-2)' }}>{label}</span>
      </div>
      <div className="t-mono" style={{ fontSize: 14, color: 'var(--text-0)', fontWeight: 600, marginTop: 4 }}>{value}</div>
      <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)' }}>{pct}</div>
    </div>
  );
}

Object.assign(window, { MapScreen });
