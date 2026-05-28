/* global React, Ic, AreaChart, BarChart, Sparkline, Gauge, gen24hData, PARKS, STATUS_META */
// Detalle de parque + Listado de parques

function ParkDetail({ park: paramPark, onBack }) {
  const park = paramPark || PARKS[0];
  const m = STATUS_META[park.status];
  const [tab, setTab] = React.useState('gen');
  const { data, labels, nowIndex } = React.useMemo(() => gen24hData(14), []);
  const monthly = [
    { label: 'MAY', value: 412 }, { label: 'JUN', value: 380 }, { label: 'JUL', value: 358 },
    { label: 'AGO', value: 402 }, { label: 'SEP', value: 445 }, { label: 'OCT', value: 491 },
    { label: 'NOV', value: 528 }, { label: 'DIC', value: 574 }, { label: 'ENE', value: 598 },
    { label: 'FEB', value: 567 }, { label: 'MAR', value: 542 }, { label: 'ABR', value: 487, current: true },
  ];
  const hourRows = [
    ['06:00', 12, 14, -14], ['07:00', 48, 52, -8], ['08:00', 122, 128, -5],
    ['09:00', 228, 240, -5], ['10:00', 342, 355, -4], ['11:00', 428, 440, -3],
    ['12:00', 512, 520, -2], ['13:00', 578, 580, 0], ['14:00', 548, 555, -1],
  ];

  return (
    <div className="col gap-20">
      {/* Hero */}
      <div className="card" style={{
        padding: '28px 28px 24px', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(30,42,58,0.9), rgba(10,14,26,0.85)), radial-gradient(circle at 100% 0%, rgba(255,184,0,0.12), transparent 50%)',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,184,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,184,0,0.05) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          mask: 'radial-gradient(ellipse at 100% 50%, black 30%, transparent 75%)',
        }} />
        <button className="btn btn-ghost btn-sm mb-16" onClick={onBack}>← Volver al listado</button>
        <div className="row items-start justify-between" style={{ flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="row items-center gap-12 mb-8">
              <span className={`badge ${m.badge}`}><span className="dot"></span>{m.label}</span>
              <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--f-mono)', letterSpacing: '0.14em' }}>ID · IRIS-{String(park.id).padStart(4, '0')}</span>
            </div>
            <h1 className="t-display" style={{ fontSize: 36, margin: 0, fontWeight: 700, letterSpacing: '0.01em' }}>{park.name}</h1>
            <div className="row items-center gap-6 mt-8" style={{ color: 'var(--text-2)', fontSize: 13 }}>
              <Ic.pin /> <span>{park.city}, Córdoba</span> <span className="dot-sep">·</span>
              <span>{park.type}</span>
            </div>
            <div className="row gap-20 mt-16" style={{ flexWrap: 'wrap' }}>
              <HeroStat label="Potencia" value={`${park.kWp}`} unit="kWp" accent />
              <HeroStat label="Paneles" value={park.panels} />
              <HeroStat label="Inversor" value={park.inverter.split(' ')[0]} sub={park.inverter.split(' ').slice(1).join(' ')} />
              <HeroStat label="Desde" value={park.installed} />
            </div>
          </div>
          <div className="col gap-8">
            <button className="btn btn-primary"><Ic.sparkles /> Consultar a IA</button>
            <button className="btn btn-outline"><Ic.wrench /> Orden de mantenimiento</button>
            <button className="btn btn-ghost"><Ic.download /> Exportar informe</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="row gap-4" style={{ borderBottom: '1px solid rgba(148,163,184,0.12)' }}>
        {[
          { id: 'gen', label: 'Generación' },
          { id: 'eq',  label: 'Equipos' },
          { id: 'mt',  label: 'Mantenimiento' },
          { id: 'fin', label: 'Financiero' },
        ].map(t => (
          <button key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '12px 20px',
              background: 'transparent', border: 0, cursor: 'pointer',
              color: tab === t.id ? 'var(--solar-500)' : 'var(--text-2)',
              fontFamily: 'var(--f-display)', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
              borderBottom: tab === t.id ? '2px solid var(--solar-500)' : '2px solid transparent',
              transition: 'all .15s',
              filter: tab === t.id ? 'drop-shadow(0 0 6px rgba(255,184,0,0.5))' : 'none',
            }}>{t.label}</button>
        ))}
      </div>

      {tab === 'gen' && (
        <>
          {/* Period selector + KPIs */}
          <div className="card">
            <div className="row items-center justify-between mb-16">
              <div>
                <div className="t-eyebrow">Generación</div>
                <div className="t-display" style={{ fontSize: 18, marginTop: 4, fontWeight: 600 }}>Últimas 24 horas</div>
              </div>
              <div className="row gap-4" style={{ padding: 4, background: 'rgba(17,24,39,0.7)', borderRadius: 8, border: '1px solid rgba(148,163,184,0.14)' }}>
                {['Hoy', 'Semana', 'Mes', 'Año'].map((p, i) => (
                  <button key={p} className={`btn btn-sm ${i === 0 ? 'btn-primary' : 'btn-ghost'}`} style={{ padding: '6px 14px' }}>{p}</button>
                ))}
              </div>
            </div>
            <AreaChart data={data} xLabels={labels} nowIndex={nowIndex} width={1000} height={280} />
            <div className="row mt-20" style={{ gap: 16 }}>
              <BigKpi label="Gen. del período" value={park.genToday.toLocaleString('es-AR')} unit="kWh" color="solar" />
              <BigKpi label="Inyección" value={Math.round(park.genToday * 0.7).toLocaleString('es-AR')} unit="kWh" color="emerald" />
              <BigKpi label="Autoconsumo" value={Math.round(park.genToday * 0.3).toLocaleString('es-AR')} unit="kWh" color="cyan" />
              <BigKpi label="Eficiencia" value={park.efficiency} unit="%" color="solar" />
              <BigKpi label="Ahorro" value="$41,300" unit="ARS" color="emerald" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
            <div className="card">
              <div className="row items-center justify-between mb-16">
                <div className="t-display" style={{ fontSize: 16, fontWeight: 600 }}>Generación mensual · 12 meses</div>
                <span className="badge info">MWh</span>
              </div>
              <BarChart data={monthly} width={720} height={240} />
            </div>

            <div className="card">
              <div className="row items-center justify-between mb-16">
                <div className="t-display" style={{ fontSize: 16, fontWeight: 600 }}>Performance en tiempo real</div>
              </div>
              <div className="row items-center justify-center" style={{ padding: '10px 0' }}>
                <Gauge value={park.efficiency} size={180} label="Eficiencia" />
              </div>
              <hr className="divider" />
              <div className="col gap-12 mt-16">
                <RowLine label="Temperatura ambiente" value="28.4 °C" />
                <RowLine label="Temperatura panel" value="52.1 °C" />
                <RowLine label="Irradiancia" value="782 W/m²" color="solar" />
                <RowLine label="Strings activos" value="8 / 8" color="emerald" />
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 0 }}>
            <div className="row items-center justify-between" style={{ padding: 20, borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
              <div>
                <div className="t-eyebrow">Datos horarios</div>
                <div className="t-display" style={{ fontSize: 16, marginTop: 4, fontWeight: 600 }}>Hoy · 20 abr 2026</div>
              </div>
              <button className="btn btn-ghost btn-sm"><Ic.download /> CSV</button>
            </div>
            <div style={{ maxHeight: 280, overflowY: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Hora</th><th>Gen. Real (kWh)</th><th>Gen. Esperada (kWh)</th><th>Δ</th><th>Irradiancia</th><th>Temp. panel</th><th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {hourRows.map(([t, r, e, d]) => (
                    <tr key={t}>
                      <td className="t-mono" style={{ color: 'var(--text-2)' }}>{t}</td>
                      <td className="t-mono" style={{ color: 'var(--solar-500)', fontWeight: 600 }}>{r}</td>
                      <td className="t-mono">{e}</td>
                      <td className="t-mono" style={{ color: d < -5 ? 'var(--red-500)' : d < 0 ? 'var(--orange-500)' : 'var(--emerald-500)' }}>{d > 0 ? '+' : ''}{d}%</td>
                      <td className="t-mono">{Math.round(r * 1.45)} W/m²</td>
                      <td className="t-mono">{(38 + r / 50).toFixed(1)} °C</td>
                      <td><span className="badge ok"><span className="dot"></span>OK</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab !== 'gen' && (
        <div className="card" style={{ padding: 60, textAlign: 'center' }}>
          <div className="t-eyebrow mb-12">Próximamente</div>
          <div style={{ color: 'var(--text-2)' }}>Esta vista aún no está implementada en el prototipo.</div>
        </div>
      )}
    </div>
  );
}

function HeroStat({ label, value, unit, sub, accent }) {
  return (
    <div className="col">
      <div className="t-eyebrow">{label}</div>
      <div className="row items-baseline gap-4 mt-4">
        <span className="t-display" style={{ fontSize: accent ? 28 : 20, fontWeight: 700, color: accent ? 'var(--solar-500)' : 'var(--text-0)', textShadow: accent ? '0 0 14px rgba(255,184,0,0.5)' : 'none' }}>{value}</span>
        {unit && <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{unit}</span>}
      </div>
      {sub && <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function BigKpi({ label, value, unit, color = 'solar' }) {
  const colorMap = { solar: 'var(--solar-500)', emerald: 'var(--emerald-500)', cyan: 'var(--cyan-500)' };
  return (
    <div className="col flex-1" style={{ padding: '12px 14px', background: 'rgba(17,24,39,0.5)', borderRadius: 10, border: '1px solid rgba(148,163,184,0.1)' }}>
      <div className="t-eyebrow">{label}</div>
      <div className="row items-baseline gap-4 mt-6">
        <span className="t-mono" style={{ fontSize: 22, fontWeight: 700, color: colorMap[color] }}>{value}</span>
        <span style={{ fontSize: 11, color: 'var(--text-2)' }}>{unit}</span>
      </div>
    </div>
  );
}

function RowLine({ label, value, color }) {
  const colorMap = { solar: 'var(--solar-500)', emerald: 'var(--emerald-500)' };
  return (
    <div className="row justify-between items-center">
      <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{label}</span>
      <span className="t-mono" style={{ fontSize: 13, color: colorMap[color] || 'var(--text-0)', fontWeight: 600 }}>{value}</span>
    </div>
  );
}

// ============================================================
// Parks list screen
// ============================================================
function ParksScreen({ onOpenPark }) {
  const [view, setView] = React.useState('grid');
  const [query, setQuery] = React.useState('');
  const [statusF, setStatusF] = React.useState('all');

  const filtered = PARKS.filter(p => {
    if (statusF !== 'all' && p.status !== statusF) return false;
    if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="col gap-20">
      <div className="row items-end justify-between">
        <div>
          <div className="t-eyebrow" style={{ color: 'var(--solar-500)' }}>Portafolio</div>
          <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>Parques Solares <span className="t-mono" style={{ fontSize: 20, color: 'var(--text-2)', fontWeight: 400 }}>· {PARKS.length}</span></h1>
        </div>
        <button className="btn btn-primary"><Ic.plus /> Nueva instalación</button>
      </div>

      {/* Toolbar */}
      <div className="card" style={{ padding: 14 }}>
        <div className="row gap-12 items-center" style={{ flexWrap: 'wrap' }}>
          <div className="search-wrap" style={{ width: 280 }}>
            <span className="search-icon"><Ic.search /></span>
            <input className="input with-icon" placeholder="Buscar parque…" value={query} onChange={e => setQuery(e.target.value)} />
          </div>
          <div className="row gap-6">
            {[
              { id: 'all',   label: 'Todos',      c: '#FFB800' },
              { id: 'ok',    label: 'Operativo',  c: '#10B981' },
              { id: 'warn',  label: 'Mant.',      c: '#F59E0B' },
              { id: 'alert', label: 'Alerta',     c: '#EF4444' },
            ].map(f => (
              <button key={f.id} className={`chip ${statusF === f.id ? 'active' : ''}`} onClick={() => setStatusF(f.id)}>
                <span style={{ width: 6, height: 6, borderRadius: 50, background: f.c, boxShadow: `0 0 6px ${f.c}` }} />
                {f.label}
              </button>
            ))}
          </div>
          <span className="flex-1" />
          <button className="btn btn-ghost btn-sm"><Ic.filter /> Filtros</button>
          <div className="row gap-4" style={{ padding: 4, background: 'rgba(17,24,39,0.7)', borderRadius: 8, border: '1px solid rgba(148,163,184,0.14)' }}>
            <button className={`btn btn-sm ${view === 'grid' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setView('grid')} style={{ padding: '6px 10px' }}><Ic.gridView /></button>
            <button className={`btn btn-sm ${view === 'table' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setView('table')} style={{ padding: '6px 10px' }}><Ic.listView /></button>
          </div>
        </div>
      </div>

      {view === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {filtered.map(p => <ParkCard key={p.id} park={p} onClick={() => onOpenPark(p)} />)}
        </div>
      ) : (
        <div className="card" style={{ padding: 0 }}>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th><th>Ciudad</th><th>Tipo</th><th>Potencia</th><th>Paneles</th><th>Gen. Hoy</th><th>Eficiencia</th><th>Estado</th><th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const m = STATUS_META[p.status];
                return (
                  <tr key={p.id} onClick={() => onOpenPark(p)} style={{ cursor: 'pointer' }}>
                    <td style={{ fontWeight: 600, color: 'var(--text-0)' }}>{p.name}</td>
                    <td>{p.city}</td>
                    <td><span className="badge ghost">{p.type}</span></td>
                    <td className="t-mono" style={{ color: 'var(--solar-500)', fontWeight: 600 }}>{p.kWp} kWp</td>
                    <td className="t-mono">{p.panels}</td>
                    <td className="t-mono" style={{ color: 'var(--text-0)', fontWeight: 600 }}>{p.genToday.toLocaleString('es-AR')} kWh</td>
                    <td className="t-mono">{p.efficiency}%</td>
                    <td><span className={`badge ${m.badge}`}><span className="dot"></span>{m.label}</span></td>
                    <td><button className="btn btn-ghost btn-sm"><Ic.chevRight /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ParkCard({ park, onClick }) {
  const m = STATUS_META[park.status];
  const spark = React.useMemo(() => {
    const pts = [];
    for (let h = 6; h <= 20; h++) {
      pts.push(Math.max(0, Math.sin(((h - 6) / 14) * Math.PI)) * park.kWp * 0.8 + Math.random() * 10);
    }
    return pts;
  }, [park.id]);

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }} onClick={onClick}>
      <div style={{ height: 4, background: m.color, boxShadow: `0 0 12px ${m.color}` }} />
      <div style={{ padding: 20 }}>
        <div className="row items-start justify-between mb-12">
          <div className="flex-1">
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-0)' }}>{park.name}</div>
            <div className="row items-center gap-4" style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 4 }}>
              <Ic.pin /> <span>{park.city}</span>
            </div>
          </div>
          <span className={`badge ${m.badge}`}><span className="dot"></span>{m.label}</span>
        </div>
        <div className="row justify-between mb-12" style={{ padding: '10px 0', borderTop: '1px solid rgba(148,163,184,0.08)', borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
          <CardStat label="Potencia" value={`${park.kWp}`} unit="kWp" highlight />
          <CardStat label="Paneles" value={park.panels} />
          <CardStat label="Tipo" value={park.type} />
        </div>
        <div className="row items-end justify-between">
          <div>
            <div className="t-eyebrow">Gen. hoy</div>
            <div className="row items-baseline gap-4 mt-4">
              <span className="t-mono" style={{ fontSize: 20, color: 'var(--solar-500)', fontWeight: 700 }}>{park.genToday.toLocaleString('es-AR')}</span>
              <span style={{ fontSize: 10, color: 'var(--text-2)' }}>kWh</span>
            </div>
          </div>
          <Sparkline values={spark} width={120} height={40} color={m.color} />
        </div>
        <button className="btn btn-ghost w-full mt-16" style={{ justifyContent: 'space-between', fontSize: 12 }}>
          Ver detalle <Ic.chevRight />
        </button>
      </div>
    </div>
  );
}

function CardStat({ label, value, unit, highlight }) {
  return (
    <div className="col">
      <div className="t-eyebrow" style={{ fontSize: 9 }}>{label}</div>
      <div className="row items-baseline gap-3 mt-4">
        <span className="t-mono" style={{ fontSize: 13, color: highlight ? 'var(--solar-500)' : 'var(--text-0)', fontWeight: 600 }}>{value}</span>
        {unit && <span style={{ fontSize: 10, color: 'var(--text-3)' }}>{unit}</span>}
      </div>
    </div>
  );
}

Object.assign(window, { ParkDetail, ParksScreen });
