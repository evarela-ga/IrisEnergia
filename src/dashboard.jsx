/* global React, AreaChart, BarChart, Sparkline, gen24hData, Ic, PARKS, STATUS_META, TOTAL_KWP, TOTAL_GEN_TODAY */
// Dashboard — Centro de Control Solar

function Dashboard({ onOpenMap, onOpenAI, onOpenPark }) {
  const { data, labels, nowIndex } = React.useMemo(() => gen24hData(14), []);
  const monthly = [
    { label: 'OCT', value: 412 }, { label: 'NOV', value: 468 },
    { label: 'DIC', value: 521 }, { label: 'ENE', value: 558 },
    { label: 'FEB', value: 548 }, { label: 'MAR', value: 532 }, { label: 'ABR', value: 487, current: true },
  ];

  const sparkData = [420, 435, 460, 512, 498, 520, 548, 561, 590, 612];
  const okCount = PARKS.filter(p => p.status === 'ok').length;
  const warnCount = PARKS.filter(p => p.status === 'warn').length;
  const alertCount = PARKS.filter(p => p.status === 'alert').length;
  const installCount = PARKS.filter(p => p.status === 'install').length;

  const alerts = [
    { sev: 'alert', label: 'CRÍTICA',  time: 'hace 2h',  msg: 'Bajo rendimiento detectado',     inst: 'Agro San Marcos · Jesús María' },
    { sev: 'warn',  label: 'MEDIA',    time: 'hace 5h',  msg: 'Mantenimiento preventivo vencido', inst: 'Coop. Oncativo' },
    { sev: 'alert', label: 'ALTA',     time: 'hace 8h',  msg: 'Panel string 3 desconectado',     inst: 'MetalCor Industries' },
    { sev: 'warn',  label: 'BAJA',     time: 'hace 1d',  msg: 'Temperatura inversor +68 °C',      inst: 'Lácteos Línea Dorada' },
    { sev: 'info',  label: 'INFO',     time: 'hace 1d',  msg: 'Instalación completada',           inst: 'TechHub Córdoba' },
  ];

  return (
    <div className="col gap-20">
      {/* Title strip */}
      <div className="row items-end justify-between" style={{ padding: '6px 2px' }}>
        <div>
          <div className="t-eyebrow" style={{ color: 'var(--solar-500)' }}>◉ Centro de Control — Live</div>
          <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>
            Buen día, Martín. <span style={{ color: 'var(--text-2)', fontWeight: 400 }}>La red está</span> <span style={{ color: 'var(--emerald-500)', textShadow: '0 0 18px rgba(16,185,129,0.5)' }}>en línea</span>.
          </h1>
        </div>
        <div className="row gap-8 items-center">
          <div className="row items-center gap-8" style={{ padding: '8px 12px', background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.25)', borderRadius: 999 }}>
            <span className="pulse-dot" style={{ background: 'var(--cyan-500)' }}></span>
            <span className="t-mono" style={{ fontSize: 12, color: 'var(--cyan-500)' }}>SYNC · 20 ABR 2026 · 14:23:07</span>
          </div>
          <button className="btn btn-outline btn-sm"><Ic.download /> Exportar</button>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
        <KpiCard icon="sun"   color="solar"   num="30" unit=""        label="Instalaciones Activas"   sub="↑ 2 este mes" subColor="emerald" />
        <KpiCard icon="bolt"  color="solar"   num="4.87" unit="MW"    label="Potencia Total Instalada" spark={sparkData} />
        <KpiCard icon="wave"  color="cyan"    num="18,432" unit="kWh" label="Generación Hoy"          sub="+12% vs ayer"  subColor="emerald" />
        <KpiCard icon="grid"  color="emerald" num="12,891" unit="kWh" label="Inyección a Red"         sub="70% del total" subColor="muted" />
        <KpiCard icon="alert" color="red"     num="4" unit=""          label="Alertas Activas"        sub="2 críticas"     subColor="red" pulse />
      </div>

      {/* Row 2: charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 16 }}>
        <div className="card bracket live-scan">
          <div className="row items-start justify-between mb-16">
            <div>
              <div className="t-eyebrow">Generación Solar</div>
              <div className="t-display" style={{ fontSize: 18, marginTop: 4, fontWeight: 600 }}>Últimas 24 horas</div>
            </div>
            <div className="row gap-16 items-center" style={{ fontSize: 11 }}>
              <Legend color="#FFB800" label="Real" />
              <Legend color="#0EA5E9" label="Esperada" dashed />
            </div>
          </div>
          <AreaChart data={data} xLabels={labels} nowIndex={nowIndex} width={780} height={260} />
          <div className="row justify-between mt-12" style={{ padding: '12px 2px 0', borderTop: '1px solid rgba(148,163,184,0.08)' }}>
            <StatMini label="Pico del día" value="612 kWh" time="13:00" color="var(--solar-500)" />
            <StatMini label="Generado ahora" value="483 kWh" time="14:23" color="var(--solar-500)" live />
            <StatMini label="vs esperado"     value="+3.1%"   color="var(--emerald-500)" />
            <StatMini label="Proyección día"  value="18,820 kWh" color="var(--text-0)" />
          </div>
        </div>

        <div className="card bracket">
          <div className="row items-start justify-between mb-16">
            <div>
              <div className="t-eyebrow">Generación Mensual</div>
              <div className="t-display" style={{ fontSize: 18, marginTop: 4, fontWeight: 600 }}>MWh · Últimos 7 meses</div>
            </div>
            <span className="badge info"><span className="dot"></span>ABR EN CURSO</span>
          </div>
          <BarChart data={monthly} width={420} height={240} />
          <div className="row justify-between mt-12" style={{ padding: '12px 2px 0', borderTop: '1px solid rgba(148,163,184,0.08)' }}>
            <StatMini label="Acumulado YTD" value="3,526 MWh" color="var(--solar-500)" />
            <StatMini label="vs. año pasado" value="+18.4%" color="var(--emerald-500)" />
          </div>
        </div>
      </div>

      {/* Row 3 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Alerts */}
        <div className="card">
          <div className="row items-center justify-between mb-16">
            <div>
              <div className="t-eyebrow">System Log</div>
              <div className="t-display" style={{ fontSize: 18, marginTop: 4, fontWeight: 600 }}>Alertas Recientes</div>
            </div>
            <span className="badge alert"><span className="dot"></span>{alertCount + warnCount} ACTIVAS</span>
          </div>
          <div className="col gap-4">
            {alerts.map((a, i) => <AlertRow key={i} {...a} />)}
          </div>
          <button className="btn btn-ghost w-full mt-16" style={{ justifyContent: 'space-between' }}>
            Ver todas las alertas <Ic.chevRight />
          </button>
        </div>

        {/* Mini map */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="row items-center justify-between" style={{ padding: 22 }}>
            <div>
              <div className="t-eyebrow">Estado Global</div>
              <div className="t-display" style={{ fontSize: 18, marginTop: 4, fontWeight: 600 }}>Mapa de Instalaciones</div>
            </div>
            <button className="btn btn-outline btn-sm" onClick={onOpenMap}>Abrir mapa completo <Ic.chevRight /></button>
          </div>
          <MiniMap onClick={onOpenMap} />
          <div style={{ padding: '14px 22px', borderTop: '1px solid rgba(148,163,184,0.08)' }}>
            <div className="row justify-between">
              <LegendChip color="#10B981" label="Operativo" count={okCount} />
              <LegendChip color="#F59E0B" label="Mant."     count={warnCount} />
              <LegendChip color="#EF4444" label="Alerta"    count={alertCount} />
              <LegendChip color="#0EA5E9" label="Instalac." count={installCount} />
            </div>
          </div>
        </div>
      </div>

      {/* Row 4 — Top generation today */}
      <div className="card">
        <div className="row items-center justify-between mb-16">
          <div>
            <div className="t-eyebrow">Ranking</div>
            <div className="t-display" style={{ fontSize: 18, marginTop: 4, fontWeight: 600 }}>Top Generación — Hoy</div>
          </div>
          <div className="row gap-8"><button className="chip active">Hoy</button><button className="chip">Semana</button><button className="chip">Mes</button></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[...PARKS].sort((a,b) => b.genToday - a.genToday).slice(0, 4).map((p, i) => (
            <TopParkCard key={p.id} park={p} rank={i + 1} onClick={() => onOpenPark && onOpenPark(p)} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// KPI Card
// ============================================================
function KpiCard({ icon, color, num, unit, label, sub, subColor = 'muted', spark, pulse }) {
  const Icon = Ic[icon];
  const subColorMap = { emerald: 'var(--emerald-500)', red: 'var(--red-500)', muted: 'var(--text-2)', cyan: 'var(--cyan-500)' };
  return (
    <div className="card bracket" style={{ padding: 20, minHeight: 150 }}>
      <div className="row items-center justify-between mb-12">
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          background: color === 'red' ? 'rgba(239,68,68,0.1)' : color === 'cyan' ? 'rgba(14,165,233,0.1)' : color === 'emerald' ? 'rgba(16,185,129,0.1)' : 'rgba(255,184,0,0.1)',
          border: `1px solid ${color === 'red' ? 'rgba(239,68,68,0.25)' : color === 'cyan' ? 'rgba(14,165,233,0.25)' : color === 'emerald' ? 'rgba(16,185,129,0.25)' : 'rgba(255,184,0,0.25)'}`,
          color: color === 'red' ? 'var(--red-500)' : color === 'cyan' ? 'var(--cyan-500)' : color === 'emerald' ? 'var(--emerald-500)' : 'var(--solar-500)',
          display: 'grid', placeItems: 'center',
          filter: `drop-shadow(0 0 8px ${color === 'red' ? 'rgba(239,68,68,0.45)' : color === 'cyan' ? 'rgba(14,165,233,0.45)' : color === 'emerald' ? 'rgba(16,185,129,0.4)' : 'rgba(255,184,0,0.45)'})`,
          animation: pulse ? 'counterTick 1.6s ease-in-out infinite' : 'none',
        }}>
          <Icon />
        </div>
        {spark && <Sparkline values={spark} width={80} height={28} color="#FFB800" />}
      </div>
      <div className={`kpi-num ${color}`} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        {num}
        {unit && <span style={{ fontSize: 16, fontWeight: 400, color: 'var(--text-2)', textShadow: 'none', fontFamily: 'var(--f-body)' }}>{unit}</span>}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 6, letterSpacing: '0.02em' }}>{label}</div>
      {sub && <div style={{ fontSize: 11, marginTop: 8, color: subColorMap[subColor], fontFamily: 'var(--f-mono)', fontWeight: 600 }}>{sub}</div>}
    </div>
  );
}

function Legend({ color, label, dashed }) {
  return (
    <span className="row items-center gap-8" style={{ color: 'var(--text-2)' }}>
      <span style={{
        width: 18, height: 2,
        background: dashed ? `repeating-linear-gradient(90deg, ${color} 0 4px, transparent 4px 8px)` : color,
        boxShadow: `0 0 6px ${color}`,
      }} />
      {label}
    </span>
  );
}

function StatMini({ label, value, time, color = 'var(--text-0)', live }) {
  return (
    <div className="col">
      <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>{label}</div>
      <div className="row items-baseline gap-6 mt-8">
        <span className="t-mono" style={{ fontSize: 16, color, fontWeight: 600 }}>{value}</span>
        {time && <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)' }}>{time}</span>}
        {live && <span className="pulse-dot" style={{ background: 'var(--solar-500)', width: 6, height: 6 }}></span>}
      </div>
    </div>
  );
}

function AlertRow({ sev, label, time, msg, inst }) {
  const sevColor = sev === 'alert' ? '#EF4444' : sev === 'warn' ? '#F59E0B' : '#0EA5E9';
  return (
    <div className="row items-start gap-12" style={{
      padding: '12px 10px',
      borderRadius: 8,
      borderLeft: `2px solid ${sevColor}`,
      background: 'linear-gradient(90deg, rgba(17,24,39,0.7), transparent)',
      transition: 'background .15s',
    }}
    onMouseEnter={e => e.currentTarget.style.background = `linear-gradient(90deg, ${sevColor}11, transparent)`}
    onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(90deg, rgba(17,24,39,0.7), transparent)'}
    >
      <span className={`pulse-dot ${sev === 'alert' ? 'alert' : sev === 'warn' ? 'warn' : 'install'}`} style={{ marginTop: 5 }}></span>
      <div className="flex-1">
        <div className="row items-center gap-8 mb-4">
          <span style={{
            fontSize: 9, fontFamily: 'var(--f-mono)', fontWeight: 700, letterSpacing: '0.1em',
            color: sevColor, padding: '1px 5px',
            background: `${sevColor}1a`, borderRadius: 3, border: `1px solid ${sevColor}55`,
          }}>{label}</span>
          <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)' }}>{time}</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-0)', fontWeight: 500 }}>{msg}</div>
        <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{inst}</div>
      </div>
    </div>
  );
}

function LegendChip({ color, label, count }) {
  return (
    <div className="row items-center gap-8">
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}` }}></span>
      <span style={{ fontSize: 12, color: 'var(--text-1)' }}>{label}</span>
      <span className="t-mono" style={{ fontSize: 12, color: 'var(--text-0)', fontWeight: 600 }}>{count}</span>
    </div>
  );
}

function TopParkCard({ park, rank, onClick }) {
  const m = STATUS_META[park.status];
  return (
    <div className="glass" style={{ padding: 14, cursor: 'pointer' }} onClick={onClick}>
      <div className="row items-center gap-10 mb-8">
        <span className="t-display" style={{
          fontSize: 20, color: 'var(--solar-500)',
          textShadow: '0 0 12px rgba(255,184,0,0.5)',
          fontWeight: 700,
        }}>#{rank}</span>
        <div className="col flex-1" style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{park.name}</div>
          <div style={{ fontSize: 10, color: 'var(--text-2)' }}>{park.city}</div>
        </div>
      </div>
      <div className="row items-baseline gap-6">
        <span className="t-mono" style={{ fontSize: 20, color: 'var(--solar-500)', fontWeight: 600 }}>{park.genToday.toLocaleString('es-AR')}</span>
        <span style={{ fontSize: 10, color: 'var(--text-2)' }}>kWh</span>
      </div>
      <div className="progress-bar mt-8"><span style={{ width: `${Math.min(100, park.genToday / 12.5)}%` }}></span></div>
    </div>
  );
}

// ============================================================
// Mini map — Córdoba
// ============================================================
function MiniMap({ onClick }) {
  return (
    <div onClick={onClick} style={{
      position: 'relative', aspectRatio: '16 / 10',
      background:
        'radial-gradient(ellipse at 40% 50%, rgba(14,165,233,0.08), transparent 60%), ' +
        'radial-gradient(ellipse at 60% 50%, rgba(255,184,0,0.05), transparent 60%), ' +
        'linear-gradient(180deg, #0A0E1A, #050810)',
      cursor: 'pointer',
      overflow: 'hidden',
    }}>
      {/* grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage:
          'linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), ' +
          'linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />
      {/* Córdoba province outline (stylized) */}
      <svg viewBox="0 0 100 62" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="prov" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#FFB800" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path d="M15,8 L80,6 L88,22 L82,40 L72,55 L50,58 L28,54 L12,38 L10,22 Z"
              fill="url(#prov)" stroke="rgba(255,184,0,0.25)" strokeWidth="0.25" strokeDasharray="0.5 0.5" />
      </svg>
      {/* Markers */}
      {PARKS.map(p => {
        const m = STATUS_META[p.status];
        const sz = 6 + (p.kWp / 220) * 6;
        return (
          <div key={p.id} style={{
            position: 'absolute',
            left: `${p.x}%`, top: `${p.y}%`,
            width: sz, height: sz, borderRadius: '50%',
            background: m.color,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${p.status === 'alert' ? 14 : 6}px ${m.color}`,
            border: '1.5px solid rgba(255,255,255,0.6)',
          }} />
        );
      })}
      {/* Overlay stats */}
      <div style={{
        position: 'absolute', left: 16, bottom: 16,
        padding: '10px 14px',
        background: 'rgba(10,14,26,0.75)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,184,0,0.2)',
        borderRadius: 8,
        fontFamily: 'var(--f-mono)',
        fontSize: 11,
      }}>
        <div style={{ color: 'var(--solar-500)', fontWeight: 600 }}>{PARKS.length} instalaciones · 25 ciudades</div>
        <div style={{ color: 'var(--text-2)', marginTop: 2 }}>Potencia total: <span style={{ color: 'var(--solar-500)', fontWeight: 600 }}>4.87 MW</span></div>
      </div>
      <div style={{
        position: 'absolute', right: 16, top: 16,
        fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--f-mono)',
      }}>PROVINCIA DE CÓRDOBA</div>
    </div>
  );
}

Object.assign(window, { Dashboard });
