/* global React, Ic */
// Investor Mode — 6 screens: Home, Panels, Wallet, Marketplace, Achievements, Reports

const { useState, useEffect, useRef } = React;

const INVESTOR = {
  name: 'Alejandra',
  fullName: 'Alejandra Méndez',
  init: 'AM',
  tokens: 3847,
  tokenValueArs: 85,  // 1 token = 1 kWh = $85
  totalGain: 847320,
  todayGain: 12450,
  monthGain: 187200,
  invested: 1245000,
  recoveryPct: 68,
  co2tons: 2.4,
  trees: 120,
  panelsTotal: 14,
  generationToday: 67.3,
};

// ==== Header for investor mode ====
function InvestorHeader({ current, onNavigate, role, setRole, assignedRoles, onLogout }) {
  const [notifOpen, setNotifOpen] = useState(false);
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 10,
      padding: '14px 24px',
      background: 'rgba(10,14,26,0.85)',
      backdropFilter: 'blur(16px) saturate(140%)',
      borderBottom: '1px solid rgba(255,184,0,0.08)',
      display: 'flex', alignItems: 'center', gap: 18,
    }}>
      <div>
        <div style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>Hola, <span style={{ color: 'var(--solar-500)', fontWeight: 700 }}>{INVESTOR.name}</span> 👋</div>
        <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.16em', textTransform: 'uppercase', marginTop: 2 }}>
          {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>
      <span style={{ flex: 1 }} />

      {/* Token balance */}
      <button className="btn" onClick={() => onNavigate('inv-wallet')} style={{
        background: 'linear-gradient(135deg, rgba(255,184,0,0.18), rgba(245,158,11,0.08))',
        border: '1px solid rgba(255,184,0,0.4)',
        padding: '8px 14px',
        boxShadow: '0 0 18px rgba(255,184,0,0.18), inset 0 0 8px rgba(255,184,0,0.08)',
      }}>
        <span style={{ color: 'var(--solar-500)', fontSize: 16, textShadow: '0 0 6px rgba(255,184,0,0.7)' }}>⚡</span>
        <span className="t-mono" style={{
          color: 'var(--solar-500)', fontWeight: 700, fontSize: 14,
          textShadow: '0 0 8px rgba(255,184,0,0.5)',
        }}>{INVESTOR.tokens.toLocaleString('es-AR')} tokens</span>
      </button>

      <button className="btn btn-ghost btn-icon" style={{ position: 'relative' }} onClick={() => setNotifOpen(o => !o)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/>
        </svg>
        <span style={{
          position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%',
          background: '#EF4444', boxShadow: '0 0 6px #EF4444',
        }} />
      </button>

      {setRole && <RoleDropdown role={role} setRole={setRole} assignedRoles={assignedRoles} onLogout={onLogout} />}

      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: 'linear-gradient(135deg, #FFB800, #F59E0B)',
        display: 'grid', placeItems: 'center',
        color: '#0A0E1A', fontWeight: 700, fontSize: 13,
        fontFamily: 'var(--f-display)',
        boxShadow: '0 0 12px rgba(255,184,0,0.35)',
      }}>{INVESTOR.init}</div>
    </header>
  );
}

// ============================================================
// Screen router
// ============================================================
function InvestorApp({ screen, onNavigate }) {
  return (
    <>
      {screen === 'inv-home'    && <InvestorHome onNavigate={onNavigate} />}
      {screen === 'inv-panels'  && <InvestorPanels />}
      {screen === 'inv-wallet'  && <InvestorWallet />}
      {screen === 'inv-market'  && <InvestorMarket />}
      {screen === 'inv-reports' && <InvestorReports />}
      {screen === 'inv-achieve' && <InvestorAchievements />}
      {screen === 'inv-profile' && <InvestorProfile />}
    </>
  );
}

// ============================================================
// 1. HOME
// ============================================================
function InvestorHome({ onNavigate }) {
  const [gain, setGain] = useState(INVESTOR.totalGain);
  // Ticker animation
  useEffect(() => {
    const iv = setInterval(() => {
      setGain(g => g + Math.round(Math.random() * 80 + 30));
    }, 2500);
    return () => clearInterval(iv);
  }, []);

  const parks = [
    { kind: 'own',   name: 'Instalación Residencial — Villa Allende', tag: '🏠 MI PARQUE',         tagColor: 'var(--solar-500)', tagBg: 'rgba(255,184,0,0.14)', tagBr: 'rgba(255,184,0,0.4)',
      meta: '8 paneles · 4.4 kWp · Sungrow SG5.0RS',                   kwh: 38.7, ars: 3289 },
    { kind: 'crowd', name: 'Comunidad Solar Alta Gracia',              tag: '👥 COMUNIDAD SOLAR',   tagColor: 'var(--cyan-500)',  tagBg: 'rgba(14,165,233,0.12)', tagBr: 'rgba(14,165,233,0.4)',
      meta: '4 de 200 paneles totales (2% del parque)',                kwh: 19.8, ars: 1683 },
    { kind: 'crowd', name: 'Comunidad Solar Villa María',              tag: '👥 COMUNIDAD SOLAR',   tagColor: 'var(--cyan-500)',  tagBg: 'rgba(14,165,233,0.12)', tagBr: 'rgba(14,165,233,0.4)',
      meta: '2 de 150 paneles totales (1.3% del parque)',              kwh: 8.8, ars: 748 },
  ];

  const activity = [
    { when: 'Hace 2 horas', text: 'Tus paneles en Alta Gracia generaron un nuevo récord diario', emoji: '🏆', color: '#F59E0B' },
    { when: 'Hace 5 horas', text: 'Se acreditaron 38 tokens a tu cuenta', emoji: '⚡', color: 'var(--solar-500)' },
    { when: 'Ayer',          text: 'Tarifa actualizada: $85/kWh (+2.4%)',   emoji: '📈', color: 'var(--emerald-500)' },
    { when: 'Hace 2 días',  text: 'Alcanzaste el logro: 1,000 kWh generados este mes', emoji: '🎉', color: 'var(--solar-500)' },
  ];

  return (
    <div className="col gap-24">
      {/* HERO */}
      <div className="card bracket" style={{
        padding: '32px 32px',
        background: 'linear-gradient(135deg, rgba(255,184,0,0.06) 0%, rgba(17,24,39,0.8) 60%)',
        border: '1px solid rgba(255,184,0,0.3)',
        boxShadow: '0 0 40px rgba(255,184,0,0.08), inset 0 0 60px rgba(255,184,0,0.03)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative grid */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.4,
          backgroundImage: 'radial-gradient(circle at 85% 15%, rgba(255,184,0,0.12), transparent 40%)',
          pointerEvents: 'none',
        }} />
        <div className="t-eyebrow mb-8" style={{ color: 'var(--solar-500)', textAlign: 'center' }}>Tu energía, tu ganancia</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 32, alignItems: 'center', position: 'relative' }}>
          {/* Left: sparkline */}
          <div>
            <div className="t-eyebrow">30 días</div>
            <GainSparkline />
            <div className="row items-center gap-8 mt-8">
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--solar-500)', boxShadow: '0 0 6px var(--solar-500)' }} />
              <span style={{ fontSize: 11, color: 'var(--text-2)' }}>Ganancia diaria — siempre ascendente</span>
            </div>
          </div>

          {/* Center: BIG NUMBER */}
          <div style={{ textAlign: 'center', minWidth: 380 }}>
            <div className="t-display" style={{
              fontSize: 68, fontWeight: 700,
              color: 'var(--solar-500)',
              textShadow: '0 0 32px rgba(255,184,0,0.6), 0 0 80px rgba(255,184,0,0.22)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
            }}>
              ${gain.toLocaleString('es-AR')}
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-1)', marginTop: 8 }}>Ganancia acumulada total</div>
            <div className="row items-center gap-12" style={{ justifyContent: 'center', marginTop: 12 }}>
              <span className="row items-center gap-4" style={{
                fontSize: 15, color: 'var(--emerald-500)', fontWeight: 700,
                padding: '4px 10px', borderRadius: 6,
                background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="m3 17 6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>
                +${INVESTOR.todayGain.toLocaleString('es-AR')} hoy <span style={{ opacity: 0.7 }}>(+1.5%)</span>
              </span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--emerald-500)', marginTop: 8, opacity: 0.85 }}>
              +${INVESTOR.monthGain.toLocaleString('es-AR')} este mes
            </div>
          </div>

          {/* Right: gauge */}
          <div style={{ textAlign: 'center' }}>
            <RecoveryGauge pct={INVESTOR.recoveryPct} />
            <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 10 }}>Recuperás tu inversión en</div>
            <div className="t-display" style={{ fontSize: 18, color: 'var(--solar-500)', fontWeight: 700 }}>~1.4 años</div>
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <InvKpiCard icon="☀️" label="Mis Paneles" value="14" unit="paneles" sub="en 3 parques" />
        <InvKpiCard icon="⚡" label="Generación Hoy" value="67.3" unit="kWh" sub="+8% vs ayer" subColor="var(--emerald-500)" />
        <InvKpiCard icon="💰" label="Tokens Disponibles" value="3,847" unit="⚡" sub="= $326,995 ARS" action="Retirar" onAction={() => onNavigate('inv-wallet')} />
        <InvKpiCard icon="🌱" label="Impacto Ambiental" value="2.4" unit="ton CO₂" sub="= 120 árboles 🌳" subColor="var(--emerald-500)" />
      </div>

      {/* Today's energy chart */}
      <div className="card" style={{ padding: 24 }}>
        <div className="row items-center justify-between mb-16">
          <div>
            <div className="t-eyebrow">Hoy</div>
            <div className="t-display" style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>Mi Energía en Tiempo Real</div>
          </div>
          <div className="row items-center gap-8" style={{
            padding: '6px 12px', borderRadius: 6,
            background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.28)',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--emerald-500)', boxShadow: '0 0 6px var(--emerald-500)', animation: 'pulseDotInv 1.2s ease-in-out infinite' }} />
            <span className="t-mono" style={{ fontSize: 11, color: 'var(--emerald-500)', fontWeight: 700, letterSpacing: '0.06em' }}>EN VIVO</span>
          </div>
        </div>
        <style>{`@keyframes pulseDotInv { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }`}</style>
        <TodayGenChart />
        {/* Ticker */}
        <div className="row items-center gap-14" style={{
          marginTop: 16, padding: '10px 14px',
          background: 'linear-gradient(90deg, rgba(17,24,39,0.7), rgba(255,184,0,0.05))',
          border: '1px solid rgba(255,184,0,0.2)',
          borderRadius: 8, overflow: 'hidden', position: 'relative',
        }}>
          <span className="t-mono" style={{ fontSize: 11, color: 'var(--solar-500)', fontWeight: 700, letterSpacing: '0.08em' }}>⚡ TARIFA EPEC</span>
          <span className="t-mono" style={{ fontSize: 14, color: 'var(--solar-500)', fontWeight: 700, textShadow: '0 0 8px rgba(255,184,0,0.5)' }}>$85.00/kWh</span>
          <span className="divider-v" style={{ height: 16 }} />
          <span style={{ fontSize: 11, color: 'var(--text-2)' }}>Actualizado hace 3 min</span>
          <span className="divider-v" style={{ height: 16 }} />
          <span style={{ fontSize: 11, color: 'var(--text-2)' }}>Próxima actualización: <span style={{ color: 'var(--text-0)', fontFamily: 'var(--f-mono)' }}>15:00</span></span>
        </div>
      </div>

      {/* My parks */}
      <div>
        <div className="row items-center justify-between mb-12">
          <div>
            <div className="t-eyebrow">Mis inversiones</div>
            <div className="t-display" style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>Mis Parques</div>
          </div>
          <span className="t-mono" style={{ fontSize: 12, color: 'var(--text-2)' }}>3 activos</span>
        </div>
        <div className="col gap-12">
          {parks.map((p, i) => <ParkInvestCard key={i} p={p} />)}
        </div>
        <div className="row items-center justify-center mt-16" style={{
          padding: '14px', borderRadius: 10,
          background: 'linear-gradient(90deg, rgba(255,184,0,0.06), rgba(255,184,0,0.02))',
          border: '1px dashed rgba(255,184,0,0.3)',
        }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-0)' }}>
            Total generando hoy: <span className="t-mono" style={{ color: 'var(--solar-500)', textShadow: '0 0 8px rgba(255,184,0,0.4)' }}>67.3 kWh</span>
            <span style={{ color: 'var(--text-2)', margin: '0 6px' }}>=</span>
            <span className="t-mono" style={{ color: 'var(--solar-500)', textShadow: '0 0 8px rgba(255,184,0,0.4)' }}>$5,720 ARS</span>
            <span style={{ marginLeft: 6 }}>☀️</span>
          </span>
        </div>
      </div>

      {/* Activity feed */}
      <div className="card" style={{ padding: 22 }}>
        <div className="row items-center justify-between mb-16">
          <div>
            <div className="t-eyebrow">Actividad</div>
            <div className="t-display" style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>Últimas novedades</div>
          </div>
          <button className="btn btn-ghost btn-sm">Ver todo</button>
        </div>
        <div className="col gap-10">
          {activity.map((a, i) => (
            <div key={i} className="row items-center gap-12" style={{
              padding: '12px 14px',
              background: 'rgba(17,24,39,0.5)',
              border: '1px solid rgba(148,163,184,0.08)',
              borderLeft: `3px solid ${a.color}`,
              borderRadius: 8,
            }}>
              <span style={{ fontSize: 20 }}>{a.emoji}</span>
              <div className="flex-1">
                <div style={{ fontSize: 13, color: 'var(--text-0)', fontWeight: 500 }}>{a.text}</div>
                <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{a.when}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InvKpiCard({ icon, label, value, unit, sub, subColor, action, onAction }) {
  return (
    <div className="card bracket" style={{ padding: 18 }}>
      <div className="row items-center justify-between">
        <div className="t-eyebrow">{label}</div>
        <span style={{ fontSize: 18, filter: 'drop-shadow(0 0 6px rgba(255,184,0,0.3))' }}>{icon}</span>
      </div>
      <div className="row items-baseline gap-6 mt-10">
        <span className="t-display" style={{
          fontSize: 28, fontWeight: 700, lineHeight: 1,
          color: 'var(--solar-500)',
          textShadow: '0 0 14px rgba(255,184,0,0.45)',
        }}>{value}</span>
        <span className="t-mono" style={{ fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{unit}</span>
      </div>
      <div className="row items-center justify-between mt-8">
        <span style={{ fontSize: 11, color: subColor || 'var(--text-2)', fontWeight: subColor ? 600 : 400 }}>{sub}</span>
        {action && <button className="btn btn-outline btn-sm" onClick={onAction}>{action}</button>}
      </div>
    </div>
  );
}

function ParkInvestCard({ p }) {
  // Fake 7-day sparkline
  const points = [38, 41, 37, 43, 40, 42, p.kwh].map((v, i, a) => {
    const x = (i / (a.length - 1)) * 120;
    const y = 26 - (v / 45) * 22;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="card" style={{
      padding: 18,
      borderLeft: `3px solid ${p.kind === 'own' ? 'var(--solar-500)' : 'var(--cyan-500)'}`,
    }}>
      <div className="row items-center gap-14" style={{ flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div className="row items-center gap-8 mb-6">
            <span style={{
              fontSize: 9, fontFamily: 'var(--f-mono)', fontWeight: 700,
              padding: '3px 8px', borderRadius: 4,
              color: p.tagColor, background: p.tagBg, border: `1px solid ${p.tagBr}`,
              letterSpacing: '0.08em',
            }}>{p.tag}</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-0)' }}>{p.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4 }}>{p.meta}</div>
        </div>

        <div style={{ minWidth: 120 }}>
          <div className="t-eyebrow">Hoy</div>
          <div className="t-mono" style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-0)', marginTop: 4 }}>{p.kwh} kWh</div>
          <div className="t-mono" style={{ fontSize: 14, fontWeight: 700, color: 'var(--solar-500)', textShadow: '0 0 8px rgba(255,184,0,0.4)' }}>${p.ars.toLocaleString('es-AR')}</div>
        </div>

        <svg width="120" height="30" viewBox="0 0 120 30">
          <polyline points={points} fill="none" stroke="var(--solar-500)" strokeWidth="1.5" />
        </svg>

        <div className="row items-center gap-8" style={{
          padding: '3px 8px', borderRadius: 4,
          background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--emerald-500)', boxShadow: '0 0 5px var(--emerald-500)' }} />
          <span style={{ fontSize: 10, color: 'var(--emerald-500)', fontFamily: 'var(--f-mono)', fontWeight: 700 }}>OPERATIVO</span>
        </div>

        <button className="btn btn-outline btn-sm">Ver detalle →</button>
      </div>
    </div>
  );
}

function GainSparkline() {
  const pts = Array.from({ length: 30 }, (_, i) => 20 + i * 1.6 + Math.sin(i / 3) * 4);
  const max = Math.max(...pts);
  const path = pts.map((v, i) => {
    const x = (i / (pts.length - 1)) * 180;
    const y = 56 - (v / max) * 50;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  return (
    <svg width="180" height="60" viewBox="0 0 180 60" style={{ marginTop: 6 }}>
      <defs>
        <linearGradient id="gainGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFB800" stopOpacity="0.35"/>
          <stop offset="1" stopColor="#FFB800" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={`${path} L 180 60 L 0 60 Z`} fill="url(#gainGrad)" />
      <path d={path} fill="none" stroke="var(--solar-500)" strokeWidth="1.8" style={{ filter: 'drop-shadow(0 0 4px rgba(255,184,0,0.5))' }} />
    </svg>
  );
}

function RecoveryGauge({ pct }) {
  const size = 140, r = 56, cx = size/2, cy = size/2;
  const circ = 2 * Math.PI * r;
  const filled = (pct / 100) * circ * 0.75; // 3/4 arc
  const total = circ * 0.75;
  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(135deg)' }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="10" strokeDasharray={`${total} ${circ}`} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--solar-500)" strokeWidth="10" strokeDasharray={`${filled} ${circ}`} strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 8px rgba(255,184,0,0.7))' }} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <div className="t-display" style={{ fontSize: 30, fontWeight: 700, color: 'var(--solar-500)', textShadow: '0 0 10px rgba(255,184,0,0.5)' }}>{pct}%</div>
        <div style={{ fontSize: 10, color: 'var(--text-2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>recuperado</div>
      </div>
    </div>
  );
}

function TodayGenChart() {
  // Solar curve — 24h
  const W = 900, H = 200;
  const now = 14; // 2pm
  const data = Array.from({ length: 24 }, (_, h) => {
    const peak = Math.max(0, Math.sin(((h - 6) / 12) * Math.PI));
    return { h, v: peak * (9 + Math.random() * 1.5) };
  });
  const maxV = 10;
  const xs = (h) => (h / 23) * (W - 40) + 20;
  const ys = (v) => H - 30 - (v / maxV) * (H - 50);
  const areaPath = `M ${xs(0)} ${H - 30} ` + data.map(d => `L ${xs(d.h)} ${ys(d.v)}`).join(' ') + ` L ${xs(23)} ${H - 30} Z`;
  const linePath = `M ${xs(0)} ${ys(data[0].v)} ` + data.slice(1).map(d => `L ${xs(d.h)} ${ys(d.v)}`).join(' ');

  return (
    <div style={{ width: '100%' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none">
        <defs>
          <linearGradient id="todayGen" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#FFB800" stopOpacity="0.4"/>
            <stop offset="1" stopColor="#FFB800" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {/* Grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
          <line key={i} x1={20} x2={W - 20} y1={H - 30 - p * (H - 50)} y2={H - 30 - p * (H - 50)} stroke="rgba(148,163,184,0.08)" strokeWidth="0.5" />
        ))}
        {/* Tariff reference */}
        <line x1={20} x2={W - 20} y1={ys(7.5)} y2={ys(7.5)} stroke="var(--emerald-500)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
        <text x={W - 24} y={ys(7.5) - 4} fill="var(--emerald-500)" fontSize="10" textAnchor="end" fontFamily="var(--f-mono)">Tarifa: $85/kWh</text>

        <path d={areaPath} fill="url(#todayGen)" />
        <path d={linePath} fill="none" stroke="var(--solar-500)" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 4px rgba(255,184,0,0.5))' }} />

        {/* NOW marker */}
        <line x1={xs(now)} x2={xs(now)} y1={10} y2={H - 30} stroke="var(--cyan-500)" strokeWidth="1.5" strokeDasharray="3 3" style={{ filter: 'drop-shadow(0 0 3px rgba(14,165,233,0.7))' }}>
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
        </line>
        <circle cx={xs(now)} cy={ys(data[now].v)} r="5" fill="var(--cyan-500)" style={{ filter: 'drop-shadow(0 0 8px rgba(14,165,233,1))' }} />
        <text x={xs(now)} y={14} fill="var(--cyan-500)" fontSize="10" textAnchor="middle" fontFamily="var(--f-display)" fontWeight="700" letterSpacing="2">AHORA</text>

        {/* X labels */}
        {[0, 6, 12, 18, 23].map(h => (
          <text key={h} x={xs(h)} y={H - 10} fill="rgba(148,163,184,0.6)" fontSize="10" textAnchor="middle" fontFamily="var(--f-mono)">{String(h).padStart(2, '0')}:00</text>
        ))}
      </svg>
      {/* Tooltip placeholder */}
      <div style={{
        marginTop: 8, padding: '8px 12px',
        background: 'rgba(14,165,233,0.08)',
        border: '1px solid rgba(14,165,233,0.25)',
        borderRadius: 8,
        fontSize: 12, color: 'var(--text-1)',
      }}>
        A las <span className="t-mono" style={{ color: 'var(--cyan-500)', fontWeight: 600 }}>13:00</span> tus paneles generaron <span className="t-mono" style={{ color: 'var(--solar-500)', fontWeight: 700 }}>8.2 kWh</span> = <span className="t-mono" style={{ color: 'var(--solar-500)', fontWeight: 700 }}>$697 ARS</span>
      </div>
    </div>
  );
}

// ============================================================
// 2. PANELS
// ============================================================
function InvestorPanels() {
  const rows = [
    { sn: 'JKS-00142', park: 'Mi Parque Villa Allende', kind: 'own',   kwh: 187, ars: 15895, status: 'op' },
    { sn: 'JKS-00143', park: 'Mi Parque Villa Allende', kind: 'own',   kwh: 191, ars: 16235, status: 'op' },
    { sn: 'JKS-00144', park: 'Mi Parque Villa Allende', kind: 'own',   kwh: 184, ars: 15640, status: 'op' },
    { sn: 'JKS-00145', park: 'Mi Parque Villa Allende', kind: 'own',   kwh: 188, ars: 15980, status: 'op' },
    { sn: 'JKS-00146', park: 'Mi Parque Villa Allende', kind: 'own',   kwh: 179, ars: 15215, status: 'op' },
    { sn: 'JKS-00147', park: 'Mi Parque Villa Allende', kind: 'own',   kwh: 192, ars: 16320, status: 'op' },
    { sn: 'JKS-00148', park: 'Mi Parque Villa Allende', kind: 'own',   kwh: 182, ars: 15470, status: 'op' },
    { sn: 'JKS-00149', park: 'Mi Parque Villa Allende', kind: 'own',   kwh: 186, ars: 15810, status: 'op' },
    { sn: 'JKS-00567', park: 'C.Solar Alta Gracia',     kind: 'crowd', kwh: 172, ars: 14620, status: 'op' },
    { sn: 'JKS-00568', park: 'C.Solar Alta Gracia',     kind: 'crowd', kwh: 168, ars: 14280, status: 'op' },
    { sn: 'JKS-00569', park: 'C.Solar Alta Gracia',     kind: 'crowd', kwh: 174, ars: 14790, status: 'op' },
    { sn: 'JKS-00570', park: 'C.Solar Alta Gracia',     kind: 'crowd', kwh: 170, ars: 14450, status: 'op' },
    { sn: 'JKS-00789', park: 'C.Solar Villa María',     kind: 'crowd', kwh: 155, ars: 13175, status: 'op' },
    { sn: 'JKS-00790', park: 'C.Solar Villa María',     kind: 'crowd', kwh: 149, ars: 12665, status: 'op' },
  ];

  return (
    <div className="col gap-20">
      <div>
        <div className="t-eyebrow" style={{ color: 'var(--solar-500)' }}>Portafolio</div>
        <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>Mis Paneles</h1>
      </div>

      {/* Portfolio hero */}
      <div className="card bracket" style={{ padding: 24, background: 'linear-gradient(135deg, rgba(255,184,0,0.05), rgba(17,24,39,0.8))' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) 1.4fr', gap: 24, alignItems: 'center' }}>
          <div>
            <div className="t-eyebrow">Total invertido</div>
            <div className="t-display" style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>${(INVESTOR.invested).toLocaleString('es-AR')}</div>
          </div>
          <div>
            <div className="t-eyebrow">Ganancia acumulada</div>
            <div className="t-display" style={{ fontSize: 22, fontWeight: 700, marginTop: 6, color: 'var(--solar-500)', textShadow: '0 0 10px rgba(255,184,0,0.4)' }}>${INVESTOR.totalGain.toLocaleString('es-AR')}</div>
          </div>
          <div>
            <div className="t-eyebrow">Recupero</div>
            <div className="row items-baseline gap-6 mt-6">
              <span className="t-display" style={{ fontSize: 22, fontWeight: 700, color: 'var(--emerald-500)' }}>68%</span>
            </div>
            <div className="progress-bar mt-6"><span style={{ width: '68%', background: 'linear-gradient(90deg, var(--emerald-500), var(--solar-500))' }} /></div>
          </div>
          <div>
            <div className="t-eyebrow">Rendimiento mensual</div>
            <div className="t-display" style={{ fontSize: 22, fontWeight: 700, marginTop: 6, color: 'var(--emerald-500)' }}>$62,400</div>
            <div style={{ fontSize: 11, color: 'var(--text-2)' }}>5.01% mensual</div>
          </div>
          <InvestGrowthChart />
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="row items-center justify-between" style={{ padding: '14px 18px', borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
          <div className="t-display" style={{ fontSize: 15, fontWeight: 600 }}>Detalle de paneles</div>
          <div className="row gap-6">
            <button className="chip active">Todos ({rows.length})</button>
            <button className="chip">🏠 Propios (8)</button>
            <button className="chip">👥 Crowdfunding (6)</button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
            <thead>
              <tr style={{ background: 'rgba(17,24,39,0.5)' }}>
                {['Panel', 'Parque', 'Tipo', 'Generación Mes', 'Ganancia Mes', 'Estado', 'Acciones'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '12px 14px',
                    fontFamily: 'var(--f-display)', fontSize: 10, fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(148,163,184,0.06)' }}>
                  <td style={{ padding: '10px 14px', fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--text-2)' }}>{r.sn}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text-0)' }}>{r.park}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{
                      fontSize: 9, fontFamily: 'var(--f-mono)', fontWeight: 700,
                      padding: '2px 7px', borderRadius: 4,
                      color: r.kind === 'own' ? 'var(--solar-500)' : 'var(--cyan-500)',
                      background: r.kind === 'own' ? 'rgba(255,184,0,0.12)' : 'rgba(14,165,233,0.12)',
                      border: `1px solid ${r.kind === 'own' ? 'rgba(255,184,0,0.35)' : 'rgba(14,165,233,0.35)'}`,
                      letterSpacing: '0.08em',
                    }}>{r.kind === 'own' ? '🏠 PROPIO' : '👥 CROWD'}</span>
                  </td>
                  <td style={{ padding: '10px 14px', fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--text-1)' }}>{r.kwh} kWh</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'var(--f-mono)', fontSize: 13, fontWeight: 700, color: 'var(--solar-500)', textShadow: '0 0 6px rgba(255,184,0,0.3)' }}>${r.ars.toLocaleString('es-AR')}</td>
                  <td style={{ padding: '10px 14px' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--emerald-500)', boxShadow: '0 0 6px var(--emerald-500)', display: 'inline-block' }} /></td>
                  <td style={{ padding: '10px 14px' }}>
                    <div className="row gap-4">
                      <button className="btn btn-outline btn-sm">Detalle</button>
                      {r.kind === 'crowd' && <button className="btn btn-ghost btn-sm" style={{ color: 'var(--cyan-500)' }}>Vender</button>}
                      <button className="btn btn-ghost btn-sm">Transferir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: 'linear-gradient(90deg, rgba(255,184,0,0.06), rgba(255,184,0,0.01))', borderTop: '1px solid rgba(255,184,0,0.25)' }}>
                <td style={{ padding: '14px', fontWeight: 700, color: 'var(--solar-500)', fontFamily: 'var(--f-display)', fontSize: 13 }}>14 paneles</td>
                <td style={{ padding: '14px' }} colSpan={2}></td>
                <td style={{ padding: '14px', fontFamily: 'var(--f-mono)', fontWeight: 700, color: 'var(--text-0)' }}>2,384 kWh</td>
                <td style={{ padding: '14px', fontFamily: 'var(--f-mono)', fontWeight: 700, color: 'var(--solar-500)', textShadow: '0 0 8px rgba(255,184,0,0.4)', fontSize: 14 }}>$187,200</td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

function InvestGrowthChart() {
  const W = 300, H = 110;
  const invested = 1245000;
  const points = [0, 60, 130, 200, 280, 360, 440, 530, 620, 720, 820, 847].map(v => v * 1000);
  const max = Math.max(...points, invested);
  const path = points.map((v, i) => {
    const x = (i / (points.length - 1)) * (W - 20) + 10;
    const y = H - 20 - (v / max) * (H - 30);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  const investY = H - 20 - (invested / max) * (H - 30);
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} height={H}>
      <defs>
        <linearGradient id="ig" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFB800" stopOpacity="0.35"/>
          <stop offset="1" stopColor="#FFB800" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <line x1={10} x2={W - 10} y1={investY} y2={investY} stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" opacity="0.6"/>
      <text x={W - 12} y={investY - 4} fill="#94A3B8" fontSize="9" textAnchor="end" fontFamily="var(--f-mono)">Inversión</text>
      <path d={`${path} L ${W-10} ${H-20} L 10 ${H-20} Z`} fill="url(#ig)" />
      <path d={path} fill="none" stroke="var(--solar-500)" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 4px rgba(255,184,0,0.5))' }} />
    </svg>
  );
}

// ============================================================
// 3. WALLET
// ============================================================
function InvestorWallet() {
  const moves = [
    { k: 'in',  qty: '+187',   desc: 'Generación diaria — Mi Parque Villa Allende', date: '20/04/2026', bal: 3847 },
    { k: 'in',  qty: '+43',    desc: 'Generación diaria — C.Solar Alta Gracia',      date: '20/04/2026', bal: 3660 },
    { k: 'in',  qty: '+19',    desc: 'Generación diaria — C.Solar Villa María',      date: '20/04/2026', bal: 3617 },
    { k: 'out', qty: '-500',   desc: 'Pago factura EPEC — Abril 2026',                date: '18/04/2026', bal: 3598 },
    { k: 'in',  qty: '+245',   desc: 'Generación diaria acumulada',                   date: '17/04/2026', bal: 4098 },
    { k: 'xfer',qty: '-200',   desc: 'Transferencia a Juan Pérez',                    date: '15/04/2026', bal: 3853 },
    { k: 'bonus',qty: '+1,200',desc: 'Bonificación: logro Eco Warrior desbloqueado 🏆', date: '10/04/2026', bal: 4053 },
  ];

  return (
    <div className="col gap-24">
      <div>
        <div className="t-eyebrow" style={{ color: 'var(--solar-500)' }}>Cuenta corriente</div>
        <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>Mi Billetera</h1>
      </div>

      {/* Big balance */}
      <div className="card bracket" style={{
        padding: 32,
        background: 'linear-gradient(135deg, rgba(255,184,0,0.08), rgba(17,24,39,0.9))',
        border: '1px solid rgba(255,184,0,0.3)',
        textAlign: 'center',
        boxShadow: '0 0 40px rgba(255,184,0,0.08)',
      }}>
        <div className="t-eyebrow">Saldo disponible</div>
        <div className="row items-center gap-14" style={{ justifyContent: 'center', marginTop: 14 }}>
          <span style={{ fontSize: 48, filter: 'drop-shadow(0 0 12px rgba(255,184,0,0.7))' }}>⚡</span>
          <span className="t-display" style={{
            fontSize: 64, fontWeight: 700,
            color: 'var(--solar-500)',
            textShadow: '0 0 28px rgba(255,184,0,0.65)',
            lineHeight: 1,
          }}>{INVESTOR.tokens.toLocaleString('es-AR')}</span>
          <span className="t-display" style={{ fontSize: 22, color: 'var(--text-2)', fontWeight: 500 }}>tokens</span>
        </div>
        <div style={{ fontSize: 16, color: 'var(--text-1)', marginTop: 10 }}>= <span className="t-mono" style={{ color: 'var(--solar-500)', fontWeight: 700 }}>${(INVESTOR.tokens * INVESTOR.tokenValueArs).toLocaleString('es-AR')} ARS</span></div>
        <div className="row gap-12" style={{ justifyContent: 'center', marginTop: 24 }}>
          <button className="btn btn-primary" style={{ fontSize: 14, padding: '10px 22px' }}>Retirar tokens</button>
          <button className="btn btn-outline" style={{ fontSize: 14, padding: '10px 22px' }}>Historial completo</button>
        </div>
      </div>

      {/* Action grid */}
      <div>
        <div className="row items-center mb-14">
          <div className="t-display" style={{ fontSize: 18, fontWeight: 600 }}>¿Qué querés hacer con tus tokens?</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          <ActionCard icon="💡" title="Pagar mi luz" desc="Usá tus tokens para pagar tu factura de EPEC o cooperativa." badge="Automático disponible" cta="Pagar factura" />
          <ActionCard icon="💸" title="Canjear por dinero" desc="Transferí el equivalente en pesos a tu cuenta bancaria." badge="CBU/alias configurado ✓" badgeColor="emerald" cta="Canjear" />
          <ActionCard icon="🔄" title="Transferir tokens" desc="Enviá tokens a otro usuario de IRIS Solar Platform." cta="Transferir" />
          <ActionCard icon="🛒" title="Comprar más paneles" desc="Reinvertí tus tokens en nuevos paneles y multiplicá tu ganancia." cta="Ir al Marketplace" ctaPrimary />
        </div>
      </div>

      {/* Movements */}
      <div className="card" style={{ padding: 22 }}>
        <div className="row items-center justify-between mb-16" style={{ flexWrap: 'wrap', gap: 10 }}>
          <div>
            <div className="t-eyebrow">Extracto</div>
            <div className="t-display" style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>Movimientos</div>
          </div>
          <div className="row gap-6">
            {['Hoy', 'Semana', 'Mes', 'Todo'].map((p, i) => <button key={p} className={`chip ${i === 2 ? 'active' : ''}`}>{p}</button>)}
            <span className="divider-v" style={{ height: 22 }} />
            {['Todos', 'Ingresos', 'Egresos'].map((p, i) => <button key={p} className={`chip ${i === 0 ? 'active' : ''}`}>{p}</button>)}
            <button className="btn btn-outline btn-sm">Descargar PDF</button>
          </div>
        </div>

        {/* Saldo chart */}
        <div style={{
          padding: 14, marginBottom: 18,
          background: 'rgba(17,24,39,0.5)',
          border: '1px solid rgba(148,163,184,0.08)',
          borderRadius: 8,
        }}>
          <div className="t-eyebrow mb-8">Evolución del saldo — 90 días</div>
          <BalanceChart />
        </div>

        <div className="col gap-6">
          {moves.map((m, i) => {
            const col = m.k === 'in' ? 'var(--emerald-500)' : m.k === 'out' ? '#EF4444' : m.k === 'xfer' ? 'var(--cyan-500)' : 'var(--solar-500)';
            const icon = m.k === 'in' ? '🟢' : m.k === 'out' ? '🔴' : m.k === 'xfer' ? '🔵' : '🏆';
            return (
              <div key={i} className="row items-center gap-14" style={{
                padding: '12px 14px',
                background: 'rgba(17,24,39,0.5)',
                border: '1px solid rgba(148,163,184,0.06)',
                borderLeft: `3px solid ${col}`,
                borderRadius: 8,
              }}>
                <span style={{ fontSize: 14 }}>{icon}</span>
                <span className="t-mono" style={{ fontSize: 15, fontWeight: 700, color: col, width: 80, textShadow: `0 0 6px ${col}55` }}>{m.qty}</span>
                <span style={{ color: 'var(--text-2)', fontSize: 13 }}>⚡</span>
                <span className="flex-1" style={{ fontSize: 13, color: 'var(--text-0)' }}>{m.desc}</span>
                <span className="t-mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>{m.date}</span>
                <span className="t-mono" style={{ fontSize: 11, color: 'var(--text-2)', minWidth: 90, textAlign: 'right' }}>Saldo: <b style={{ color: 'var(--solar-500)' }}>{m.bal.toLocaleString('es-AR')}</b></span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon, title, desc, badge, badgeColor, cta, ctaPrimary }) {
  const badgeCol = badgeColor === 'emerald' ? 'var(--emerald-500)' : 'var(--cyan-500)';
  return (
    <div className="card" style={{ padding: 20 }}>
      <div className="row items-center gap-12 mb-10">
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: 'linear-gradient(135deg, rgba(255,184,0,0.18), rgba(255,184,0,0.04))',
          border: '1px solid rgba(255,184,0,0.3)',
          display: 'grid', placeItems: 'center', fontSize: 22,
          boxShadow: '0 0 12px rgba(255,184,0,0.15)',
        }}>{icon}</div>
        <div className="flex-1">
          <div className="t-display" style={{ fontSize: 15, fontWeight: 600 }}>{title}</div>
          {badge && <span style={{
            fontSize: 9, fontFamily: 'var(--f-mono)', fontWeight: 700,
            color: badgeCol, letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>{badge}</span>}
        </div>
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.55, marginBottom: 14 }}>{desc}</div>
      <button className={ctaPrimary ? 'btn btn-primary' : 'btn btn-outline'} style={{ width: '100%', justifyContent: 'center' }}>{cta}</button>
    </div>
  );
}

function BalanceChart() {
  const W = 860, H = 100;
  // Ascending w/ dips
  const pts = Array.from({ length: 90 }, (_, i) => {
    let v = 2400 + i * 20;
    if (i === 45 || i === 70) v -= 500;
    if (i === 50 || i === 75) v -= 200;
    return v + Math.sin(i / 6) * 40;
  });
  const max = Math.max(...pts);
  const path = pts.map((v, i) => {
    const x = (i / (pts.length - 1)) * W;
    const y = H - 8 - (v / max) * (H - 16);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none">
      <defs>
        <linearGradient id="balg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFB800" stopOpacity="0.32"/>
          <stop offset="1" stopColor="#FFB800" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={`${path} L ${W} ${H} L 0 ${H} Z`} fill="url(#balg)" />
      <path d={path} fill="none" stroke="var(--solar-500)" strokeWidth="1.8" style={{ filter: 'drop-shadow(0 0 4px rgba(255,184,0,0.4))' }} />
    </svg>
  );
}

// ============================================================
// 4. MARKETPLACE
// ============================================================
function InvestorMarket() {
  const [tab, setTab] = useState('buy');
  const offers = [
    { name: 'Comunidad Solar Jesús María', avail: 23, total: 300, sold: 92, monthly: 14200, roi: 3.8, price: 185000, tokens: 2176, featured: true, irr: 5.6 },
    { name: 'Comunidad Solar Río Cuarto',  avail: 45, total: 200, sold: 78, monthly: 13800, roi: 4.1, price: 178000, tokens: 2094, irr: 5.4 },
    { name: 'Comunidad Solar Cruz del Eje', avail: 80, total: 150, sold: 47, monthly: 15100, roi: 3.5, price: 192000, tokens: 2259, isNew: true, irr: 5.9 },
    { name: 'Panel en C.Solar Alta Gracia', avail: 1,  total: 1,  sold: 100, monthly: 14000, roi: 3.9, price: 165000, tokens: 1941, resale: true, irr: 5.7, history: '2,847 kWh' },
  ];

  return (
    <div className="col gap-20">
      <div>
        <div className="t-eyebrow" style={{ color: 'var(--solar-500)' }}>Red IRIS</div>
        <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>Marketplace Solar ☀️</h1>
        <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 6 }}>Comprá, vendé o alquilá paneles en la red IRIS</div>
      </div>

      <div className="row gap-4" style={{ borderBottom: '1px solid rgba(148,163,184,0.12)' }}>
        {[{ id: 'buy', l: 'Comprar' }, { id: 'sell', l: 'Vender mis paneles' }, { id: 'rent', l: 'Alquilar' }, { id: 'ops', l: 'Mis operaciones' }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '12px 20px', background: 'transparent', border: 0, cursor: 'pointer',
            color: tab === t.id ? 'var(--solar-500)' : 'var(--text-2)',
            fontFamily: 'var(--f-display)', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            borderBottom: tab === t.id ? '2px solid var(--solar-500)' : '2px solid transparent',
            filter: tab === t.id ? 'drop-shadow(0 0 6px rgba(255,184,0,0.5))' : 'none',
          }}>{t.l}</button>
        ))}
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: 14 }}>
        <div className="row items-center gap-12" style={{ flexWrap: 'wrap' }}>
          <select className="input" style={{ width: 180 }}><option>Toda Córdoba</option><option>Sierras</option><option>Valle</option></select>
          <select className="input" style={{ width: 180 }}><option>Todos los precios</option><option>Hasta $180k</option><option>$180-200k</option></select>
          <span className="flex-1" />
          <span style={{ fontSize: 12, color: 'var(--text-2)' }}>Ordenar por:</span>
          <div className="row gap-6">
            {['Rendimiento', 'Precio', 'ROI', 'Popularidad'].map((s, i) => <button key={s} className={`chip ${i === 0 ? 'active' : ''}`}>{s}</button>)}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {offers.map((o, i) => <OfferCard key={i} o={o} />)}
      </div>
    </div>
  );
}

function OfferCard({ o }) {
  const soldPct = o.sold;
  return (
    <div className="card" style={{
      padding: 0, overflow: 'hidden',
      border: o.featured ? '1.5px solid rgba(255,184,0,0.55)' : undefined,
      boxShadow: o.featured ? '0 0 24px rgba(255,184,0,0.15)' : undefined,
      position: 'relative',
    }}>
      {o.featured && (
        <div style={{
          position: 'absolute', top: 12, right: 12, zIndex: 2,
          padding: '3px 10px', borderRadius: 4,
          background: 'linear-gradient(135deg, #FFB800, #F59E0B)',
          color: '#0A0E1A', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
          fontFamily: 'var(--f-display)',
          boxShadow: '0 0 10px rgba(255,184,0,0.5)',
        }}>🔥 POPULAR</div>
      )}
      {o.isNew && (
        <div style={{
          position: 'absolute', top: 12, right: 12, zIndex: 2,
          padding: '3px 10px', borderRadius: 4,
          background: 'rgba(14,165,233,0.25)', color: 'var(--cyan-500)', border: '1px solid var(--cyan-500)',
          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
        }}>🆕 NUEVO PARQUE</div>
      )}
      {o.resale && (
        <div style={{
          position: 'absolute', top: 12, right: 12, zIndex: 2,
          padding: '3px 10px', borderRadius: 4,
          background: 'rgba(14,165,233,0.2)', color: 'var(--cyan-500)', border: '1px solid rgba(14,165,233,0.45)',
          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
        }}>🔄 REVENTA</div>
      )}

      {/* Visual */}
      <div style={{
        height: 120, position: 'relative',
        background: 'linear-gradient(135deg, #FFB800 0%, #F59E0B 40%, #0C1A3E 100%)',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(10,14,26,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(10,14,26,0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />
        <svg width="100%" height="100%" viewBox="0 0 300 120" style={{ position: 'absolute', inset: 0, opacity: 0.85 }}>
          <rect x="40" y="30" width="220" height="60" fill="rgba(10,14,26,0.7)" stroke="rgba(255,184,0,0.6)" strokeWidth="1"/>
          {[...Array(6)].map((_, c) => [...Array(3)].map((_, r) => (
            <rect key={`${c}-${r}`} x={45 + c * 35} y={35 + r * 18} width={32} height={15} fill="none" stroke="rgba(255,184,0,0.4)" strokeWidth="0.5"/>
          )))}
        </svg>
        <div style={{
          position: 'absolute', left: 12, bottom: 10,
          color: '#0A0E1A', fontFamily: 'var(--f-display)', fontWeight: 700,
        }}>
          <div style={{ fontSize: 8, letterSpacing: '0.16em', opacity: 0.7 }}>IRRADIANCIA ZONA</div>
          <div style={{ fontSize: 14 }}>☀️ {o.irr} kWh/m²/día</div>
        </div>
      </div>

      <div style={{ padding: 18 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-0)' }}>{o.name}</div>

        {!o.resale ? (
          <>
            <div className="row items-center justify-between mt-10">
              <span className="t-mono" style={{ fontSize: 11, color: 'var(--text-2)' }}>Disponibles</span>
              <span className="t-mono" style={{ fontSize: 12, color: 'var(--solar-500)', fontWeight: 700 }}>{o.avail}/{o.total}</span>
            </div>
            <div className="progress-bar mt-6"><span style={{ width: `${soldPct}%` }} /></div>
            <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 4 }}>{soldPct}% vendido</div>
          </>
        ) : (
          <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-2)' }}>
            Vendedor: Usuario verificado ✓ · 14 meses de operación · Generación histórica: <span className="t-mono" style={{ color: 'var(--text-0)' }}>{o.history}</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14, padding: 12, background: 'rgba(17,24,39,0.5)', borderRadius: 8 }}>
          <div>
            <div className="t-eyebrow">Rendimiento est.</div>
            <div className="t-mono" style={{ fontSize: 13, color: 'var(--emerald-500)', fontWeight: 700, marginTop: 4 }}>${o.monthly.toLocaleString('es-AR')}/mes</div>
          </div>
          <div>
            <div className="t-eyebrow">ROI</div>
            <div className="t-mono" style={{ fontSize: 13, color: 'var(--solar-500)', fontWeight: 700, marginTop: 4 }}>{o.roi} años</div>
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div className="row items-baseline gap-8">
            <span className="t-display" style={{
              fontSize: 22, fontWeight: 700, color: 'var(--solar-500)',
              textShadow: '0 0 10px rgba(255,184,0,0.5)',
            }}>${o.price.toLocaleString('es-AR')}</span>
            <span style={{ fontSize: 11, color: 'var(--text-2)' }}>ARS</span>
          </div>
          <div className="t-mono" style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>o {o.tokens.toLocaleString('es-AR')} tokens ⚡</div>
        </div>

        <button className="btn btn-primary mt-14" style={{ width: '100%', justifyContent: 'center' }}>
          {o.resale ? 'Comprar' : 'Comprar panel'}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// 5. ACHIEVEMENTS
// ============================================================
function InvestorAchievements() {
  const levels = [
    { name: 'Solar Seed',    icon: '🌱', xp: '0–500',       benefit: 'Dashboard básico' },
    { name: 'Solar Starter', icon: '☀️',  xp: '500–1,500',   benefit: 'Reportes mensuales' },
    { name: 'Solar Pioneer', icon: '⭐',  xp: '1,500–3,000', benefit: 'Descuentos en compra', current: true },
    { name: 'Solar Expert',  icon: '🚀',  xp: '3,000–5,000', benefit: 'Preventa de nuevos parques' },
    { name: 'Solar Master',  icon: '👑',  xp: '5,000+',      benefit: 'Comisiones por referidos + VIP' },
  ];
  const unlocked = [
    { name: 'Primer kWh',        desc: 'Generaste tu primer kilowatt', date: '15/03/2023' },
    { name: '1,000 kWh Club',    desc: 'Generaste 1,000 kWh acumulados', date: '22/08/2023' },
    { name: 'Eco Warrior',       desc: 'Evitaste 1 tonelada de CO₂',     date: '10/04/2026', bonus: '+1,200 tokens' },
    { name: 'Diversificado',     desc: 'Paneles en 3+ parques',          date: '05/01/2026' },
    { name: 'Racha 30 días',     desc: 'Entraste 30 días seguidos',      date: '28/03/2026' },
  ];
  const locked = [
    { name: '10,000 kWh Club',   desc: 'Generá 10,000 kWh acumulados',   prog: 72, prog_txt: '7,234/10,000' },
    { name: 'Referidor Solar',   desc: 'Invitá a 3 amigos que inviertan', prog: 33, prog_txt: '1/3' },
    { name: 'Full Solar',        desc: 'Cubrí 100% de tu consumo',        prog: 78, prog_txt: '78%' },
    { name: 'Solar Master',      desc: 'Alcanzá el nivel máximo',         prog: 48, prog_txt: '2,400/5,000 XP' },
  ];
  const challenges = [
    { name: 'Entrá 5 días seguidos esta semana', prog: 3, max: 5, reward: '50 tokens' },
    { name: 'Comprá un panel nuevo',              prog: 0, max: 1, reward: '200 tokens + badge' },
    { name: 'Referí a un amigo',                  prog: 0, max: 1, reward: '500 tokens' },
  ];

  return (
    <div className="col gap-24">
      <div>
        <div className="t-eyebrow" style={{ color: 'var(--solar-500)' }}>Gamificación</div>
        <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>Tus Logros ☀️🏆</h1>
      </div>

      {/* Current level */}
      <div className="card bracket" style={{
        padding: 24,
        background: 'linear-gradient(135deg, rgba(255,184,0,0.08), rgba(17,24,39,0.9))',
        border: '1px solid rgba(255,184,0,0.35)',
      }}>
        <div className="row items-center gap-20">
          <div style={{
            width: 90, height: 90, borderRadius: '50%',
            background: 'radial-gradient(circle, #FFB800 0%, #F59E0B 55%, #0A0E1A 100%)',
            display: 'grid', placeItems: 'center', fontSize: 40,
            boxShadow: '0 0 26px rgba(255,184,0,0.6), inset 0 0 14px rgba(255,184,0,0.5)',
            border: '2px solid var(--solar-500)',
            flexShrink: 0,
          }}>⭐</div>
          <div className="flex-1">
            <div className="t-eyebrow">Nivel actual</div>
            <div className="t-display" style={{ fontSize: 26, fontWeight: 700, marginTop: 4 }}>Solar Pioneer <span style={{ color: 'var(--solar-500)' }}>⭐⭐⭐</span><span style={{ color: 'var(--text-3)' }}>⭐⭐</span></div>
            <div className="row items-center justify-between mt-12">
              <span style={{ fontSize: 12, color: 'var(--text-2)' }}>XP para Solar Expert</span>
              <span className="t-mono" style={{ fontSize: 12, color: 'var(--solar-500)', fontWeight: 700 }}>2,400 / 3,000 XP</span>
            </div>
            <div className="progress-bar mt-6" style={{ height: 10 }}><span style={{ width: '80%' }} /></div>
            <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 6 }}>Próximo nivel: <b style={{ color: 'var(--cyan-500)' }}>Solar Expert 🚀</b> → Acceso a preventa de nuevos parques</div>
          </div>
        </div>
      </div>

      {/* Level path */}
      <div className="card" style={{ padding: 24 }}>
        <div className="t-eyebrow mb-16">Tu camino solar</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 32, left: 40, right: 40, height: 2,
            background: 'linear-gradient(90deg, var(--solar-500) 0%, var(--solar-500) 50%, rgba(148,163,184,0.2) 50%)',
          }} />
          {levels.map((lv, i) => (
            <div key={i} style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%', margin: '0 auto',
                background: lv.current ? 'linear-gradient(135deg, #FFB800, #F59E0B)' : i < 2 ? 'rgba(255,184,0,0.2)' : 'rgba(17,24,39,0.9)',
                border: `2px solid ${lv.current ? 'var(--solar-500)' : i < 2 ? 'rgba(255,184,0,0.5)' : 'rgba(148,163,184,0.2)'}`,
                display: 'grid', placeItems: 'center', fontSize: 24,
                boxShadow: lv.current ? '0 0 20px rgba(255,184,0,0.7)' : 'none',
                filter: i > 2 ? 'grayscale(0.8) opacity(0.6)' : 'none',
              }}>{lv.icon}</div>
              <div className="t-display" style={{
                fontSize: 12, fontWeight: lv.current ? 700 : 500, marginTop: 10,
                color: lv.current ? 'var(--solar-500)' : i < 2 ? 'var(--text-0)' : 'var(--text-3)',
              }}>{lv.name}</div>
              <div className="t-mono" style={{ fontSize: 9, color: 'var(--text-3)', marginTop: 2 }}>{lv.xp} XP</div>
              <div style={{ fontSize: 10, color: 'var(--text-2)', marginTop: 4, minHeight: 28 }}>{lv.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Unlocked badges */}
      <div>
        <div className="row items-center justify-between mb-14">
          <div>
            <div className="t-eyebrow">Insignias</div>
            <div className="t-display" style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>Logros desbloqueados</div>
          </div>
          <span className="t-mono" style={{ fontSize: 12, color: 'var(--solar-500)' }}>{unlocked.length}/{unlocked.length + locked.length}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
          {unlocked.map((b, i) => <BadgeCard key={i} b={b} unlocked />)}
          {locked.map((b, i) => <BadgeCard key={`l${i}`} b={b} />)}
        </div>
      </div>

      {/* Challenges */}
      <div className="card" style={{ padding: 22 }}>
        <div className="t-eyebrow">Esta semana</div>
        <div className="t-display" style={{ fontSize: 18, fontWeight: 600, marginTop: 4, marginBottom: 14 }}>Desafíos Activos</div>
        <div className="col gap-10">
          {challenges.map((c, i) => (
            <div key={i} className="row items-center gap-14" style={{
              padding: '12px 14px',
              background: 'rgba(17,24,39,0.5)',
              border: '1px solid rgba(148,163,184,0.08)',
              borderLeft: `3px solid ${c.prog === c.max ? 'var(--emerald-500)' : 'var(--solar-500)'}`,
              borderRadius: 8,
            }}>
              <div className="flex-1">
                <div style={{ fontSize: 13, color: 'var(--text-0)', fontWeight: 500 }}>{c.name}</div>
                <div className="row items-center gap-10 mt-6">
                  <div style={{ flex: 1, height: 4, background: 'rgba(148,163,184,0.15)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${(c.prog / c.max) * 100}%`, height: '100%', background: c.prog === c.max ? 'var(--emerald-500)' : 'var(--solar-500)', boxShadow: `0 0 6px ${c.prog === c.max ? 'var(--emerald-500)' : 'var(--solar-500)'}` }} />
                  </div>
                  <span className="t-mono" style={{ fontSize: 11, color: 'var(--text-2)' }}>{c.prog}/{c.max} {c.prog === c.max && '✅'}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="t-eyebrow">Recompensa</div>
                <div className="t-mono" style={{ fontSize: 13, color: 'var(--solar-500)', fontWeight: 700, marginTop: 4 }}>{c.reward}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact */}
      <div className="card bracket" style={{
        padding: 28,
        background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(17,24,39,0.9))',
        border: '1px solid rgba(16,185,129,0.3)',
      }}>
        <div className="t-eyebrow" style={{ color: 'var(--emerald-500)' }}>Tu impacto positivo</div>
        <div className="t-display" style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}>Estás cambiando el mundo 🌍</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginTop: 20 }}>
          {[
            { icon: '🌍', n: '2.4', u: 'ton CO₂', sub: 'evitadas (= 1 auto x 6 meses)' },
            { icon: '🌳', n: '120', u: 'árboles', sub: 'equivalentes plantados' },
            { icon: '💡', n: '8,234', u: 'horas LED', sub: 'de luz generada' },
            { icon: '🏠', n: '3', u: 'hogares', sub: 'por un mes (energía equivalente)' },
          ].map((m, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.4))' }}>{m.icon}</div>
              <div className="t-display" style={{ fontSize: 26, fontWeight: 700, color: 'var(--emerald-500)', textShadow: '0 0 12px rgba(16,185,129,0.4)' }}>{m.n}</div>
              <div className="t-mono" style={{ fontSize: 10, color: 'var(--emerald-500)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{m.u}</div>
              <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 4 }}>{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BadgeCard({ b, unlocked }) {
  return (
    <div className="card" style={{
      padding: 18, textAlign: 'center', position: 'relative',
      opacity: unlocked ? 1 : 0.75,
      overflow: 'hidden',
    }}>
      {unlocked && (
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.4,
          background: 'radial-gradient(circle at 50% 20%, rgba(255,184,0,0.2), transparent 60%)',
          pointerEvents: 'none',
        }} />
      )}
      <div style={{
        width: 64, height: 64, borderRadius: '50%', margin: '0 auto',
        background: unlocked ? 'linear-gradient(135deg, #FFB800, #F59E0B)' : 'rgba(17,24,39,0.9)',
        border: `2px solid ${unlocked ? 'var(--solar-500)' : 'rgba(148,163,184,0.2)'}`,
        display: 'grid', placeItems: 'center', fontSize: 28,
        boxShadow: unlocked ? '0 0 18px rgba(255,184,0,0.5)' : 'none',
        filter: unlocked ? 'none' : 'grayscale(1) opacity(0.5)',
        position: 'relative',
      }}>
        {unlocked ? '🏆' : '🔒'}
      </div>
      <div className="t-display" style={{
        fontSize: 13, fontWeight: 600, marginTop: 10,
        color: unlocked ? 'var(--solar-500)' : 'var(--text-2)',
      }}>{b.name}</div>
      <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 6, lineHeight: 1.4 }}>{b.desc}</div>
      {unlocked ? (
        <>
          <div className="t-mono" style={{ fontSize: 10, color: 'var(--emerald-500)', marginTop: 8 }}>✅ {b.date}</div>
          {b.bonus && <div className="t-mono" style={{ fontSize: 10, color: 'var(--solar-500)', marginTop: 4, fontWeight: 700 }}>{b.bonus}</div>}
        </>
      ) : (
        <>
          <div className="progress-bar mt-10" style={{ height: 5 }}><span style={{ width: `${b.prog}%` }} /></div>
          <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 6 }}>{b.prog_txt}</div>
        </>
      )}
    </div>
  );
}

// ============================================================
// 6. REPORTS
// ============================================================
function InvestorReports() {
  const [period, setPeriod] = useState('month');
  return (
    <div className="col gap-20">
      <div className="row items-end justify-between">
        <div>
          <div className="t-eyebrow" style={{ color: 'var(--solar-500)' }}>Análisis</div>
          <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>Mis Reportes</h1>
        </div>
        <div className="row gap-8">
          <button className="btn btn-outline">Enviar por email</button>
          <button className="btn btn-primary">Descargar PDF</button>
        </div>
      </div>

      <div className="row gap-6">
        {[['day', 'Hoy'], ['week', 'Semana'], ['month', 'Este mes'], ['q', 'Trimestre'], ['y', 'Año'], ['c', 'Personalizado']].map(([id, l]) => (
          <button key={id} className={`chip ${period === id ? 'active' : ''}`} onClick={() => setPeriod(id)}>{l}</button>
        ))}
      </div>

      {/* 2x2 grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Donut */}
        <div className="card" style={{ padding: 22 }}>
          <div className="t-eyebrow">Distribución</div>
          <div className="t-display" style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Generación por parque</div>
          <div className="row items-center gap-24 mt-16">
            <DonutChart data={[
              { label: 'Villa Allende', value: 58, color: '#FFB800' },
              { label: 'Alta Gracia',   value: 29, color: '#0EA5E9' },
              { label: 'Villa María',   value: 13, color: '#10B981' },
            ]} />
            <div className="col gap-10 flex-1">
              {[
                { label: 'Villa Allende 🏠', value: '1,389 kWh', pct: '58%', color: '#FFB800' },
                { label: 'Alta Gracia 👥',    value: '691 kWh',   pct: '29%', color: '#0EA5E9' },
                { label: 'Villa María 👥',    value: '304 kWh',   pct: '13%', color: '#10B981' },
              ].map((d, i) => (
                <div key={i}>
                  <div className="row items-center gap-8">
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: d.color, boxShadow: `0 0 6px ${d.color}` }} />
                    <span style={{ fontSize: 12, color: 'var(--text-0)', fontWeight: 500 }}>{d.label}</span>
                    <span className="flex-1" />
                    <span className="t-mono" style={{ fontSize: 12, color: 'var(--solar-500)', fontWeight: 700 }}>{d.pct}</span>
                  </div>
                  <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-2)', marginLeft: 18, marginTop: 2 }}>{d.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line chart */}
        <div className="card" style={{ padding: 22 }}>
          <div className="t-eyebrow">12 meses</div>
          <div className="t-display" style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Evolución de ganancias</div>
          <MonthlyGainChart />
          <div className="row gap-20 mt-10">
            <div><div className="t-eyebrow">Promedio/mes</div><div className="t-mono" style={{ fontSize: 15, color: 'var(--solar-500)', fontWeight: 700 }}>$62,400</div></div>
            <div><div className="t-eyebrow">Mejor mes</div><div className="t-mono" style={{ fontSize: 15, color: 'var(--emerald-500)', fontWeight: 700 }}>$74,200 · Dic</div></div>
            <div><div className="t-eyebrow">Total 12m</div><div className="t-mono" style={{ fontSize: 15, color: 'var(--solar-500)', fontWeight: 700 }}>$748,800</div></div>
          </div>
        </div>

        {/* Detail table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 22px' }}>
            <div className="t-eyebrow">Abril 2026</div>
            <div className="t-display" style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Detalle de ingresos</div>
          </div>
          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(17,24,39,0.6)', position: 'sticky', top: 0 }}>
                  {['Día', 'Generación', 'Tarifa', 'Ganancia'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 22px', fontFamily: 'var(--f-display)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 20 }, (_, i) => {
                  const day = i + 1;
                  const kwh = 75 + Math.sin(i / 3) * 8 + Math.random() * 5;
                  const gain = kwh * 85;
                  return (
                    <tr key={i} style={{ borderTop: '1px solid rgba(148,163,184,0.06)' }}>
                      <td style={{ padding: '8px 22px', fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--text-2)' }}>{String(day).padStart(2, '0')}/04</td>
                      <td style={{ padding: '8px 22px', fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--text-0)' }}>{kwh.toFixed(1)} kWh</td>
                      <td style={{ padding: '8px 22px', fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--text-2)' }}>$85.00</td>
                      <td style={{ padding: '8px 22px', fontFamily: 'var(--f-mono)', fontSize: 13, color: 'var(--solar-500)', fontWeight: 700 }}>${Math.round(gain).toLocaleString('es-AR')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Projection */}
        <div className="card" style={{ padding: 22 }}>
          <div className="t-eyebrow">Futuro</div>
          <div className="t-display" style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Proyección de ganancias</div>
          <ProjectionChart />
          <div className="row gap-20 mt-10">
            {[
              { l: '12 meses', v: '$748,800' },
              { l: '24 meses', v: '$1,572,480' },
              { l: '36 meses', v: '$2,475,420' },
            ].map((p, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div className="t-eyebrow">{p.l}</div>
                <div className="t-mono" style={{ fontSize: 16, color: 'var(--solar-500)', fontWeight: 700, textShadow: '0 0 6px rgba(255,184,0,0.3)', marginTop: 2 }}>{p.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DonutChart({ data }) {
  const size = 160, r = 58, cx = size/2, cy = size/2, circ = 2 * Math.PI * r;
  const total = data.reduce((s, d) => s + d.value, 0);
  let offset = 0;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="14" />
      {data.map((d, i) => {
        const frac = d.value / total;
        const len = frac * circ;
        const el = <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={d.color} strokeWidth="14"
                          strokeDasharray={`${len} ${circ}`} strokeDashoffset={-offset}
                          style={{ filter: `drop-shadow(0 0 6px ${d.color}88)` }} />;
        offset += len;
        return el;
      })}
    </svg>
  );
}

function MonthlyGainChart() {
  const months = ['May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr'];
  const vals = [48, 52, 56, 59, 62, 65, 68, 74, 65, 60, 58, 63].map(v => v * 1000);
  const W = 420, H = 140;
  const max = Math.max(...vals);
  const path = vals.map((v, i) => {
    const x = (i / (vals.length - 1)) * (W - 30) + 15;
    const y = H - 30 - (v / max) * (H - 50);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ marginTop: 12 }}>
      <defs>
        <linearGradient id="mgc" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFB800" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#FFB800" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={`${path} L ${W-15} ${H-30} L 15 ${H-30} Z`} fill="url(#mgc)" />
      <path d={path} fill="none" stroke="var(--solar-500)" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 4px rgba(255,184,0,0.5))' }} />
      {months.map((m, i) => (
        <text key={m} x={(i / (months.length - 1)) * (W - 30) + 15} y={H - 10} fill="rgba(148,163,184,0.6)" fontSize="9" textAnchor="middle" fontFamily="var(--f-mono)">{m}</text>
      ))}
      {vals.map((v, i) => (
        <circle key={i} cx={(i / (vals.length - 1)) * (W - 30) + 15} cy={H - 30 - (v / max) * (H - 50)} r={i === vals.length - 1 ? 4 : 2} fill="var(--solar-500)"
                style={{ filter: i === vals.length - 1 ? 'drop-shadow(0 0 6px var(--solar-500))' : 'none' }} />
      ))}
    </svg>
  );
}

function ProjectionChart() {
  const W = 420, H = 140;
  // past 6 months + projection 30 months
  const past = Array.from({ length: 12 }, (_, i) => 60 + i * 3);
  const future = Array.from({ length: 24 }, (_, i) => past[past.length - 1] + (i + 1) * 3);
  const all = [...past, ...future];
  const max = Math.max(...all);
  const toP = (arr, start) => arr.map((v, i) => {
    const x = ((i + start) / (all.length - 1)) * (W - 30) + 15;
    const y = H - 30 - (v / max) * (H - 50);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ marginTop: 12 }}>
      <defs>
        <linearGradient id="projg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFB800" stopOpacity="0.25"/>
          <stop offset="1" stopColor="#FFB800" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={toP(past, 0) + ` L ${((past.length - 1) / (all.length - 1)) * (W - 30) + 15} ${H-30} L 15 ${H-30} Z`} fill="url(#projg)" />
      <path d={toP(past, 0)} fill="none" stroke="var(--solar-500)" strokeWidth="2" />
      <path d={toP(future, past.length - 1)} fill="none" stroke="var(--solar-500)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
      {/* Markers */}
      {[{ m: 11, l: 'Hoy', c: 'var(--cyan-500)' }, { m: 23, l: '12m', c: 'var(--solar-500)' }, { m: 35, l: '36m', c: 'var(--emerald-500)' }].map((p, i) => (
        <g key={i}>
          <line x1={(p.m / (all.length - 1)) * (W - 30) + 15} x2={(p.m / (all.length - 1)) * (W - 30) + 15} y1={15} y2={H - 30} stroke={p.c} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5"/>
          <text x={(p.m / (all.length - 1)) * (W - 30) + 15} y={12} fill={p.c} fontSize="9" textAnchor="middle" fontFamily="var(--f-mono)" fontWeight="700">{p.l}</text>
        </g>
      ))}
    </svg>
  );
}

// ============================================================
// 7. PROFILE (simple placeholder)
// ============================================================
function InvestorProfile() {
  return (
    <div className="col gap-20">
      <div>
        <div className="t-eyebrow" style={{ color: 'var(--solar-500)' }}>Configuración</div>
        <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>Mi Perfil</h1>
      </div>
      <div className="card" style={{ padding: 24 }}>
        <div className="row items-center gap-16">
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFB800, #F59E0B)',
            display: 'grid', placeItems: 'center',
            color: '#0A0E1A', fontWeight: 700, fontSize: 24,
            fontFamily: 'var(--f-display)',
            boxShadow: '0 0 18px rgba(255,184,0,0.5)',
          }}>{INVESTOR.init}</div>
          <div>
            <div className="t-display" style={{ fontSize: 20, fontWeight: 600 }}>{INVESTOR.fullName}</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)' }}>Inversora · Miembro desde Marzo 2023</div>
            <div className="t-mono" style={{ fontSize: 11, color: 'var(--solar-500)', marginTop: 6 }}>alejandra.mendez@mail.com</div>
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: 60, textAlign: 'center' }}>
        <div className="t-eyebrow mb-12">Placeholder</div>
        <div className="t-display" style={{ fontSize: 18 }}>Ajustes de cuenta, notificaciones y preferencias</div>
      </div>
    </div>
  );
}

// Role switcher for investor header (small, matches existing style)
function InvRoleDropdown({ role, setRole }) {
  const [open, setOpen] = useState(false);
  const roles = ['Supervisor', 'Técnico', 'Cooperativa', 'Inversor'];
  return (
    <div style={{ position: 'relative' }}>
      <button className="btn btn-ghost btn-sm" onClick={() => setOpen(o => !o)} style={{ fontFamily: 'var(--f-body)' }}>
        <span style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Rol</span>
        <span style={{ fontWeight: 600 }}>{role}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', right: 0,
          minWidth: 160, padding: 6,
          background: 'rgba(17,24,39,0.98)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,184,0,0.25)',
          borderRadius: 8, boxShadow: '0 12px 30px rgba(0,0,0,0.55)',
          zIndex: 20,
        }}>
          {roles.map(r => (
            <button key={r} onClick={() => { setRole(r); setOpen(false); }} style={{
              display: 'block', width: '100%', padding: '8px 10px',
              background: role === r ? 'rgba(255,184,0,0.12)' : 'transparent',
              color: role === r ? 'var(--solar-500)' : 'var(--text-1)',
              border: 0, textAlign: 'left', borderRadius: 6, cursor: 'pointer',
              fontSize: 13, fontFamily: 'var(--f-body)',
            }}>{r}</button>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { InvestorApp, InvestorHeader });
