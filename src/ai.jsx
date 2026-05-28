/* global React, Ic, AISun, IrisLogo */
// Asistente IA — Chat futurista

function AIScreen() {
  const [input, setInput] = React.useState('');
  const history = [
    { id: 1, title: 'Resumen matutino', time: 'Hoy · 08:12', active: true },
    { id: 2, title: 'Análisis Lácteos Línea Dorada', time: 'Ayer · 17:30' },
    { id: 3, title: 'Comparativa mensual', time: '15/04 · 11:00' },
    { id: 4, title: 'Causas de baja gen. MetalCor', time: '14/04 · 09:22' },
    { id: 5, title: 'Proyección abril', time: '12/04 · 16:45' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', height: 'calc(100vh - var(--header-h))' }}>
      {/* History rail */}
      <aside style={{
        borderRight: '1px solid rgba(148,163,184,0.08)',
        padding: '18px 14px',
        overflowY: 'auto',
        background: 'rgba(10,14,26,0.45)',
      }}>
        <button className="btn btn-primary w-full mb-16" style={{ justifyContent: 'center' }}><Ic.plus /> Nueva conversación</button>
        <div className="t-eyebrow mb-12">Historial</div>
        <div className="col gap-4">
          {history.map(h => (
            <button key={h.id} style={{
              padding: '10px 10px',
              background: h.active ? 'rgba(255,184,0,0.08)' : 'transparent',
              border: h.active ? '1px solid rgba(255,184,0,0.3)' : '1px solid transparent',
              borderRadius: 8,
              textAlign: 'left',
              cursor: 'pointer',
              color: h.active ? 'var(--solar-500)' : 'var(--text-1)',
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.title}</div>
              <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{h.time}</div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main chat */}
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 880, width: '100%', margin: '0 auto', padding: '0 24px', minWidth: 0 }}>
        {/* Header */}
        <div className="row items-center gap-16" style={{ padding: '20px 0 14px', borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
          <AISun size={56} />
          <div className="flex-1">
            <div className="row items-center gap-10">
              <h2 className="t-display" style={{ fontSize: 20, margin: 0, fontWeight: 600 }}>IRIS AI Assistant</h2>
              <span className="badge ok"><span className="dot"></span>Conectado a 30 instalaciones</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 4 }}>
              Powered by inteligencia artificial <span className="dot-sep">·</span> Datos actualizados hace 2 min
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1" style={{ overflowY: 'auto', padding: '20px 0' }}>
          <UserMsg text="Dame el resumen ejecutivo de hoy" />
          <AIMsg>
            <div className="t-display" style={{ fontSize: 17, fontWeight: 600, marginBottom: 12 }}>
              <span style={{ color: 'var(--solar-500)' }}>☀</span> Resumen Ejecutivo — 20 de abril de 2026
            </div>

            <SectionTitle icon="📊" text="Estado General del Portafolio" />
            <ul style={bulletStyle}>
              <li><Mono>28</Mono> de <Mono>30</Mono> instalaciones operativas <span className="t-muted">(93.3%)</span></li>
              <li><Mono>2</Mono> instalaciones con alertas activas</li>
              <li>Potencia total en línea: <Mono color="solar">4.65 MW</Mono> de 4.87 MW</li>
            </ul>

            <SectionTitle icon="⚡" text="Generación del Día" />
            <ul style={bulletStyle}>
              <li>Total generado: <Mono color="solar">18,432 kWh</Mono> <span style={{ color: 'var(--emerald-500)' }}>(+12% vs ayer)</span></li>
              <li>Inyección a red: <Mono color="emerald">12,891 kWh</Mono> (70%)</li>
              <li>Ahorro estimado: <Mono color="solar">$1,566,720 ARS</Mono></li>
            </ul>

            <SectionTitle icon="🏆" text="Top 3 Instalaciones Hoy" />
            <div className="col gap-6" style={{ margin: '8px 0 12px' }}>
              <TopLine rank={1} name="Frigorífico del Centro" city="Río Cuarto" value="1,247 kWh" />
              <TopLine rank={2} name="Lácteos Línea Dorada" city="Río Primero" value="1,089 kWh" />
              <TopLine rank={3} name="Coop. Eléctrica V. María" city="Villa María" value="987 kWh" />
            </div>

            <SectionTitle icon="⚠" text="Alertas que requieren atención" />
            <div className="col gap-8" style={{ margin: '8px 0 12px' }}>
              <AIAlert sev="alert" inst="Agro San Marcos" msg="Rendimiento 23% por debajo del esperado" rec="Inspección de string 4" />
              <AIAlert sev="warn" inst="MetalCor Industries" msg="Panel desconectado en string 3" rec="Verificar conexiones" />
            </div>

            <SectionTitle icon="📈" text="Pronóstico" />
            <p style={{ margin: '4px 0 0', color: 'var(--text-1)', fontSize: 13, lineHeight: 1.65 }}>
              Mañana se esperan condiciones parcialmente nubladas. Generación estimada:
              {' '}<Mono color="solar">~16,200 kWh</Mono> <span style={{ color: 'var(--red-500)' }}>(-12%)</span>. No se requieren acciones preventivas.
            </p>
          </AIMsg>

          <UserMsg text="¿Cuánto lleva generado Lácteos Línea Dorada este mes?" />
          <AIMsg>
            <div className="row items-center gap-8 mb-12">
              <Ic.pin /> <span className="t-display" style={{ fontSize: 16, fontWeight: 600 }}>Lácteos Línea Dorada — Río Primero</span>
            </div>
            <div className="row items-baseline gap-8 mb-8">
              <span style={{ fontSize: 12, color: 'var(--text-2)' }}>Generación acumulada abril 2026:</span>
              <span className="t-display" style={{ fontSize: 22, fontWeight: 700, color: 'var(--solar-500)', textShadow: '0 0 14px rgba(255,184,0,0.5)' }}>21,847 kWh</span>
            </div>
            <InlineBars />
            <div style={{ marginTop: 14, padding: '12px 14px', background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.2)', borderRadius: 8 }}>
              <div className="t-eyebrow" style={{ color: 'var(--cyan-500)' }}>Comparativa</div>
              <div className="row gap-20 mt-8">
                <div className="col">
                  <span style={{ fontSize: 11, color: 'var(--text-2)' }}>vs. marzo 2026</span>
                  <Mono color="emerald">+8.3%</Mono>
                  <span style={{ fontSize: 10, color: 'var(--text-3)' }}>Mejor irradiancia</span>
                </div>
                <div className="col">
                  <span style={{ fontSize: 11, color: 'var(--text-2)' }}>vs. abril 2025</span>
                  <Mono color="emerald">+3.1%</Mono>
                  <span style={{ fontSize: 10, color: 'var(--text-3)' }}>Rendimiento estable</span>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 12, color: 'var(--text-2)' }}>
                ROI acumulado desde instalación: <Mono color="solar">$12,450,000 ARS</Mono>
                <br />
                Payback estimado: <Mono>4.2 años</Mono> <span className="t-muted">(recuperado el 68%)</span>
              </div>
              <div className="progress-bar mt-8" style={{ maxWidth: 280 }}><span style={{ width: '68%' }}></span></div>
            </div>
            <div style={{ marginTop: 14, fontSize: 13, color: 'var(--text-1)' }}>¿Querés que genere un reporte detallado en PDF?</div>
            <div className="row gap-8 mt-12">
              <button className="btn btn-primary btn-sm">Generar PDF</button>
              <button className="btn btn-ghost btn-sm">Más tarde</button>
            </div>
          </AIMsg>

          <TypingIndicator />
        </div>

        {/* Input area */}
        <div style={{ padding: '14px 0 20px', borderTop: '1px solid rgba(148,163,184,0.08)' }}>
          <div className="row gap-8 mb-12" style={{ flexWrap: 'wrap' }}>
            <button className="chip">📊 Resumen del día</button>
            <button className="chip">⚠ Alertas activas</button>
            <button className="chip">🏆 Top generación</button>
            <button className="chip">🔧 Próximos mantenimientos</button>
          </div>
          <div style={{
            position: 'relative',
            padding: '10px 12px 10px 16px',
            background: 'rgba(17,24,39,0.7)',
            border: '1px solid rgba(255,184,0,0.22)',
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 0 28px rgba(255,184,0,0.06)',
          }}>
            <input value={input} onChange={e => setInput(e.target.value)}
              placeholder="Preguntale a IRIS AI sobre tus instalaciones…"
              style={{
                flex: 1, border: 0, outline: 0, background: 'transparent',
                color: 'var(--text-0)', fontSize: 14, fontFamily: 'var(--f-body)',
                padding: '8px 0',
              }} />
            <button className="btn btn-ghost btn-icon"><Ic.mic /></button>
            <button style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFC93D, #F59E0B)',
              border: '1px solid rgba(255,184,0,0.5)',
              display: 'grid', placeItems: 'center',
              color: '#0A0E1A', cursor: 'pointer',
              boxShadow: '0 0 18px rgba(255,184,0,0.45)',
            }}><Ic.send /></button>
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 8, textAlign: 'center', fontFamily: 'var(--f-mono)', letterSpacing: '0.08em' }}>
            IRIS AI PUEDE CONSULTAR DATOS EN TIEMPO REAL DE 30 INSTALACIONES
          </div>
        </div>
      </div>
    </div>
  );
}

const bulletStyle = { margin: '8px 0 10px', paddingLeft: 22, color: 'var(--text-1)', fontSize: 13, lineHeight: 1.8 };

function SectionTitle({ icon, text }) {
  return (
    <div className="row items-center gap-8" style={{ marginTop: 14, marginBottom: 2 }}>
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span className="t-display" style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--solar-500)', fontWeight: 600 }}>{text}</span>
      <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(255,184,0,0.3), transparent)' }} />
    </div>
  );
}

function Mono({ children, color }) {
  const colorMap = { solar: 'var(--solar-500)', emerald: 'var(--emerald-500)', cyan: 'var(--cyan-500)', red: 'var(--red-500)' };
  return <span className="t-mono" style={{ color: colorMap[color] || 'var(--text-0)', fontWeight: 600 }}>{children}</span>;
}

function UserMsg({ text }) {
  return (
    <div className="row" style={{ justifyContent: 'flex-end', marginBottom: 16 }}>
      <div style={{
        maxWidth: '75%',
        padding: '12px 16px',
        background: 'linear-gradient(135deg, rgba(14,165,233,0.14), rgba(14,165,233,0.06))',
        border: '1px solid rgba(14,165,233,0.3)',
        borderRadius: '14px 14px 4px 14px',
        color: 'var(--text-0)',
        fontSize: 14,
      }}>{text}</div>
    </div>
  );
}

function AIMsg({ children }) {
  return (
    <div className="row items-start gap-12" style={{ marginBottom: 20 }}>
      <div style={{ flexShrink: 0, marginTop: 2 }}><AISun size={32} /></div>
      <div style={{
        maxWidth: '85%',
        padding: '16px 18px',
        background: 'rgba(17,24,39,0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,184,0,0.18)',
        borderRadius: '14px 14px 14px 4px',
        color: 'var(--text-1)',
        fontSize: 13,
        lineHeight: 1.6,
        position: 'relative',
      }}>
        {children}
      </div>
    </div>
  );
}

function TopLine({ rank, name, city, value }) {
  return (
    <div className="row items-center gap-12" style={{ padding: '8px 12px', background: 'rgba(255,184,0,0.04)', border: '1px solid rgba(255,184,0,0.12)', borderRadius: 8 }}>
      <span className="t-display" style={{ fontSize: 14, color: 'var(--solar-500)', fontWeight: 700, width: 22 }}>#{rank}</span>
      <div className="flex-1">
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-0)' }}>{name}</div>
        <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{city}</div>
      </div>
      <Mono color="solar">{value}</Mono>
    </div>
  );
}

function AIAlert({ sev, inst, msg, rec }) {
  const color = sev === 'alert' ? '#EF4444' : '#F59E0B';
  return (
    <div style={{
      padding: '10px 12px',
      background: `${color}10`,
      border: `1px solid ${color}35`,
      borderRadius: 8,
      borderLeft: `3px solid ${color}`,
    }}>
      <div className="row items-center gap-8 mb-4">
        <span className={`pulse-dot ${sev === 'alert' ? 'alert' : 'warn'}`} style={{ width: 7, height: 7 }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: color }}>{inst}</span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-1)' }}>{msg}</div>
      <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>→ Recomendación: {rec}</div>
    </div>
  );
}

function InlineBars() {
  const bars = [8.2, 9.1, 7.8, 10.2, 11.5, 10.8, 9.6, 11.1, 12.3, 11.8, 10.9, 11.6, 12.1, 11.3, 10.4, 11.9, 12.5, 11.2, 10.7, 11.4];
  const max = Math.max(...bars);
  return (
    <div className="row" style={{
      gap: 3, alignItems: 'flex-end',
      padding: '12px 10px', background: 'rgba(17,24,39,0.6)',
      border: '1px solid rgba(148,163,184,0.1)', borderRadius: 8, height: 64,
    }}>
      {bars.map((v, i) => (
        <div key={i} style={{
          flex: 1,
          height: `${(v / max) * 100}%`,
          background: 'linear-gradient(180deg, #FFC93D, #F59E0B)',
          borderRadius: '2px 2px 0 0',
          boxShadow: '0 0 6px rgba(255,184,0,0.3)',
        }} />
      ))}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="row items-center gap-10" style={{ marginLeft: 44, marginBottom: 20, opacity: 0.6 }}>
      <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--f-mono)' }}>IRIS AI procesando</span>
      <span className="row gap-4">
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 5, height: 5, borderRadius: '50%',
            background: 'var(--solar-500)',
            animation: `dotBlink 1.4s ease-in-out ${i * 0.18}s infinite`,
          }} />
        ))}
      </span>
      <style>{`@keyframes dotBlink { 0%,80%,100% { opacity: 0.2; } 40% { opacity: 1; } }`}</style>
    </div>
  );
}

Object.assign(window, { AIScreen });
