/* global React */
// Auth (Login + Role Selector) + Investors Management Module

const { useState: useSt, useEffect: useEf } = React;

// ============================================================
// LOGIN SCREEN
// ============================================================
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useSt('');
  const [pass, setPass] = useSt('');
  const [showPass, setShowPass] = useSt(false);
  const [remember, setRemember] = useSt(true);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1.22fr 1fr',
      background: '#0A0E1A',
    }}>
      {/* LEFT — HERO */}
      <div style={{
        position: 'relative',
        padding: '56px 60px',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 80% 20%, rgba(255,184,0,0.15) 0%, rgba(10,14,26,0) 50%), #0A0E1A',
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,184,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,184,0,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
          pointerEvents: 'none',
        }} />

        {/* Decorative solar composition */}
        <svg width="100%" height="100%" viewBox="0 0 800 600" style={{
          position: 'absolute', inset: 0, opacity: 0.55, pointerEvents: 'none',
        }}>
          <defs>
            <linearGradient id="panelGrad" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#FFB800" stopOpacity="0.35"/>
              <stop offset="1" stopColor="#0C1A3E" stopOpacity="0.6"/>
            </linearGradient>
            <linearGradient id="rayGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#FFB800" stopOpacity="0"/>
              <stop offset="0.4" stopColor="#FFB800" stopOpacity="0.9"/>
              <stop offset="1" stopColor="#FFD669" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {/* Abstract panel array in perspective */}
          <g transform="translate(380 360) skewX(-24) scale(1.4 0.7)">
            {[0, 1, 2, 3].map(r => [0, 1, 2, 3, 4].map(c => (
              <rect key={`${r}-${c}`} x={c * 56 - 140} y={r * 46 - 92} width="52" height="42" fill="url(#panelGrad)" stroke="rgba(255,184,0,0.55)" strokeWidth="0.8" />
            )))}
          </g>
          {/* Sun */}
          <circle cx="620" cy="130" r="44" fill="#FFB800" opacity="0.9" style={{ filter: 'drop-shadow(0 0 40px rgba(255,184,0,0.85))' }} />
          <circle cx="620" cy="130" r="80" fill="none" stroke="#FFB800" strokeWidth="0.8" opacity="0.4"/>
          <circle cx="620" cy="130" r="120" fill="none" stroke="#FFB800" strokeWidth="0.4" opacity="0.25"/>
          {/* Rays flowing down */}
          {[0, 1, 2, 3, 4].map(i => (
            <path key={i} d={`M ${620 - 20 + i * 10} 180 Q ${400 + i * 30} ${280 + i * 20} ${300 - i * 40} ${400 + i * 30}`}
                  stroke="url(#rayGrad)" strokeWidth="1.5" fill="none" opacity={0.8 - i * 0.1} />
          ))}
        </svg>

        {/* Logo top */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <IrisLogo size={40} />
        </div>

        <div style={{ flex: 1 }} />

        {/* Main copy */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 560 }}>
          <div className="t-eyebrow" style={{ color: 'var(--solar-500)' }}>◈ Bienvenido</div>
          <h1 style={{
            fontFamily: 'var(--f-display)',
            fontSize: 54, fontWeight: 700, letterSpacing: '-0.02em',
            lineHeight: 1.08, margin: '14px 0 20px',
            color: 'var(--text-0)',
          }}>
            La energía del sol,<br/>
            <span style={{ color: 'var(--solar-500)', textShadow: '0 0 24px rgba(255,184,0,0.45)' }}>en tus manos.</span>
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.6, maxWidth: 480 }}>
            Plataforma integral de gestión de parques solares con inteligencia artificial. Monitoreá, operá e invertí en energía limpia desde un solo lugar.
          </p>

          {/* Floating stat cards */}
          <div className="row gap-10 mt-24" style={{ flexWrap: 'wrap' }}>
            {[
              { n: '4.87', u: 'MW', label: 'Gestionados' },
              { n: '30', u: '', label: 'Parques activos' },
              { n: '$47M', u: '', label: 'Generados para inversores' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '12px 16px',
                background: 'rgba(17,24,39,0.6)',
                backdropFilter: 'blur(14px) saturate(140%)',
                border: '1px solid rgba(255,184,0,0.22)',
                borderRadius: 10,
                minWidth: 140,
                boxShadow: '0 0 20px rgba(255,184,0,0.06)',
              }}>
                <div className="row items-baseline gap-4">
                  <span className="t-display" style={{ fontSize: 22, fontWeight: 700, color: 'var(--solar-500)', textShadow: '0 0 8px rgba(255,184,0,0.4)' }}>{s.n}</span>
                  <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-2)' }}>{s.u}</span>
                </div>
                <div className="t-mono" style={{ fontSize: 9, color: 'var(--text-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* Footer — GoodApps */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'var(--f-mono)' }}>Desarrollado por</div>
          <div style={{
            fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 14,
            letterSpacing: '0.04em', color: 'var(--text-1)',
            filter: 'grayscale(1) opacity(0.75)',
          }}>GoodApps</div>
        </div>
      </div>

      {/* RIGHT — LOGIN CARD */}
      <div style={{
        padding: '40px 50px',
        display: 'grid', placeItems: 'center',
        background: 'linear-gradient(180deg, rgba(10,14,26,0.6) 0%, rgba(17,24,39,0.9) 100%)',
        borderLeft: '1px solid rgba(255,184,0,0.08)',
      }}>
        <div style={{
          width: '100%', maxWidth: 420,
          padding: '36px 34px',
          background: 'rgba(17,24,39,0.7)',
          backdropFilter: 'blur(18px) saturate(140%)',
          border: '1px solid rgba(255,184,0,0.25)',
          borderRadius: 14,
          boxShadow: '0 24px 60px rgba(0,0,0,0.55), 0 0 40px rgba(255,184,0,0.06)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 22 }}>
            <div style={{ display: 'inline-block' }}><IrisLogo size={32} /></div>
          </div>
          <h2 className="t-display" style={{ fontSize: 22, fontWeight: 600, textAlign: 'center', margin: '0 0 6px' }}>Iniciá sesión</h2>
          <div style={{ fontSize: 13, color: 'var(--text-2)', textAlign: 'center', marginBottom: 22 }}>Accedé a tu panel de control</div>

          {/* Social login */}
          <div className="col gap-8">
            <button onClick={onLogin} style={{
              display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center',
              width: '100%', padding: '11px 14px',
              background: '#FFFFFF', color: '#0A0E1A',
              border: 0, borderRadius: 8, cursor: 'pointer',
              fontSize: 13, fontWeight: 600, fontFamily: 'var(--f-body)',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.28-4.75 3.28-8.09Z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.76c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.2 1.64l3.15-3.15A10.98 10.98 0 0 0 12 1a11 11 0 0 0-9.82 6.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"/></svg>
              Continuar con Google
            </button>
            <button onClick={onLogin} style={{
              display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center',
              width: '100%', padding: '11px 14px',
              background: '#000000', color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, cursor: 'pointer',
              fontSize: 13, fontWeight: 600,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.1-.46-2.1-.48-3.26 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              Continuar con Apple
            </button>
            <button onClick={onLogin} style={{
              display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center',
              width: '100%', padding: '11px 14px',
              background: '#2F2F2F', color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, cursor: 'pointer',
              fontSize: 13, fontWeight: 600,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24"><rect x="2" y="2" width="9" height="9" fill="#F25022"/><rect x="13" y="2" width="9" height="9" fill="#7FBA00"/><rect x="2" y="13" width="9" height="9" fill="#00A4EF"/><rect x="13" y="13" width="9" height="9" fill="#FFB900"/></svg>
              Continuar con Microsoft
            </button>
          </div>

          {/* Separator */}
          <div className="row items-center gap-10" style={{ margin: '22px 0' }}>
            <span style={{ flex: 1, height: 1, background: 'rgba(148,163,184,0.15)' }} />
            <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.12em' }}>o</span>
            <span style={{ flex: 1, height: 1, background: 'rgba(148,163,184,0.15)' }} />
          </div>

          {/* Email + password */}
          <div className="col gap-10">
            <div>
              <label className="t-eyebrow" style={{ display: 'block', marginBottom: 6 }}>Email</label>
              <div style={{ position: 'relative' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }}>
                  <rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>
                </svg>
                <input className="input" type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)}
                       style={{ width: '100%', paddingLeft: 36 }} />
              </div>
            </div>
            <div>
              <label className="t-eyebrow" style={{ display: 'block', marginBottom: 6 }}>Contraseña</label>
              <div style={{ position: 'relative' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }}>
                  <rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>
                </svg>
                <input className="input" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)}
                       style={{ width: '100%', paddingLeft: 36, paddingRight: 36 }} />
                <button onClick={() => setShowPass(s => !s)} style={{
                  position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                  background: 'transparent', border: 0, cursor: 'pointer', color: 'var(--text-3)',
                  padding: 4, borderRadius: 4,
                }}>
                  {showPass
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="m3 3 18 18"/><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/><path d="M9.4 5.1A9.9 9.9 0 0 1 12 5c5 0 9 4.5 10 7-0.4 1-1.3 2.4-2.7 3.8"/><path d="M6.6 6.6C3.9 8.4 2 11 2 12c1 2.5 5 7 10 7 1.8 0 3.5-.6 5-1.4"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>}
                </button>
              </div>
            </div>
            <label className="row items-center gap-8" style={{ marginTop: 4, cursor: 'pointer', userSelect: 'none' }}>
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                     style={{ width: 15, height: 15, accentColor: 'var(--solar-500)' }} />
              <span style={{ fontSize: 12, color: 'var(--text-1)' }}>Recordar mi sesión</span>
            </label>
            <button onClick={onLogin} className="btn btn-primary" style={{
              width: '100%', justifyContent: 'center', padding: '12px', fontSize: 14,
              marginTop: 6,
            }}>Iniciar sesión</button>
            <a href="#" style={{
              textAlign: 'center', fontSize: 12, color: 'var(--cyan-500)',
              textDecoration: 'none', marginTop: 4,
            }}>¿Olvidaste tu contraseña?</a>
          </div>

          <div style={{ marginTop: 22, paddingTop: 16, borderTop: '1px solid rgba(148,163,184,0.1)' }}>
            <div style={{ fontSize: 12, color: 'var(--text-2)', textAlign: 'center' }}>
              ¿Sos inversor y querés sumarte? <a href="#" style={{ color: 'var(--cyan-500)', textDecoration: 'none', fontWeight: 600 }}>Solicitar acceso</a>
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-3)', textAlign: 'center', marginTop: 10, lineHeight: 1.5 }}>
              Al continuar aceptás los <a href="#" style={{ color: 'var(--text-2)' }}>Términos</a> y la <a href="#" style={{ color: 'var(--text-2)' }}>Política de Privacidad</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ROLE SELECTOR
// ============================================================
function RoleSelectorScreen({ onSelect }) {
  const roles = [
    {
      id: 'Supervisor', color: 'var(--solar-500)', glow: 'rgba(255,184,0,0.35)',
      title: 'Supervisor', sub: 'Acceso completo a toda la plataforma',
      items: ['Dashboard', 'Mapa', 'Parques', 'Equipos', 'Mantenimiento', 'Inversores', 'IA'],
      icon: (
        <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M24 4 8 10v10c0 9 6.5 17.5 16 22 9.5-4.5 16-13 16-22V10L24 4Z"/>
          <circle cx="24" cy="22" r="5" fill="currentColor" opacity="0.2"/>
          <path d="M24 15v3M24 26v3M17 22h3M28 22h3M19 17l2 2M27 25l2 2M19 27l2-2M27 19l2-2"/>
        </svg>
      ),
    },
    {
      id: 'Técnico', color: 'var(--cyan-500)', glow: 'rgba(14,165,233,0.35)',
      title: 'Técnico de Mantenimiento', sub: 'Gestión de órdenes y equipos',
      items: ['Órdenes de trabajo', 'Stock', 'Equipos', 'Alertas asignadas'],
      icon: (
        <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M30 12a8 8 0 0 0-10.8 10.8L8 34l6 6 11.2-11.2A8 8 0 0 0 36 18l-4.4 4.4-4.8-4.8L30 12Z"/>
          <circle cx="12" cy="36" r="1.5" fill="currentColor"/>
        </svg>
      ),
    },
    {
      id: 'Cooperativa', color: 'var(--emerald-500)', glow: 'rgba(16,185,129,0.35)',
      title: 'Cooperativa Eléctrica', sub: 'Monitoreo de generación e inyección',
      items: ['Mis parques', 'Generación', 'Inyección a red', 'Reportes', 'IA'],
      icon: (
        <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="8" y="20" width="12" height="20"/><rect x="28" y="14" width="12" height="26"/>
          <path d="M11 25h6M11 30h6M11 35h6M31 19h6M31 24h6M31 29h6M31 34h6"/>
          <path d="M24 6 20 12h8L24 6Z" fill="currentColor"/>
        </svg>
      ),
    },
    {
      id: 'Inversor', color: '#F59E0B', glow: 'rgba(245,158,11,0.4)',
      title: 'Inversor', sub: 'Tu portafolio solar y ganancias',
      items: ['Mi panel', 'Mis paneles', 'Billetera', 'Marketplace', 'Logros'],
      icon: (
        <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 38h36M10 30l7-8 6 5 8-12 7 9"/>
          <circle cx="38" cy="14" r="4" fill="currentColor" opacity="0.3"/>
          <path d="M38 10v8M34 14h8"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, rgba(255,184,0,0.08) 0%, #0A0E1A 60%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '48px 24px',
    }}>
      {/* Grid bg */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,184,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,184,0,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1060, textAlign: 'center' }}>
        <div style={{ display: 'inline-block', marginBottom: 24 }}><IrisLogo size={40} /></div>
        <div className="t-display" style={{ fontSize: 32, fontWeight: 600, color: 'var(--text-0)' }}>
          Hola, <span style={{ color: 'var(--solar-500)', textShadow: '0 0 16px rgba(255,184,0,0.4)' }}>Martín</span> 👋
        </div>
        <div style={{ fontSize: 15, color: 'var(--text-2)', marginTop: 8 }}>¿Con qué perfil querés ingresar hoy?</div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)', gap: 18,
          marginTop: 40,
        }}>
          {roles.map(r => (
            <RoleCard key={r.id} r={r} onSelect={() => onSelect(r.id)} />
          ))}
        </div>

        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 30 }}>
          Podés cambiar de perfil en cualquier momento desde el menú superior
        </div>
      </div>
    </div>
  );
}

function RoleCard({ r, onSelect }) {
  const [hover, setHover] = useSt(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={onSelect}
      style={{
        padding: 26,
        background: 'rgba(17,24,39,0.6)',
        backdropFilter: 'blur(14px) saturate(140%)',
        border: `1.5px solid ${hover ? r.color : `${r.color}55`}`,
        borderRadius: 14,
        boxShadow: hover
          ? `0 0 34px ${r.glow}, 0 16px 32px rgba(0,0,0,0.5)`
          : `0 0 14px ${r.glow}33, 0 8px 20px rgba(0,0,0,0.3)`,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.18s ease',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        position: 'relative',
        overflow: 'hidden',
      }}>
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 160, height: 160, borderRadius: '50%',
        background: `radial-gradient(circle, ${r.color}22 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div className="row items-start gap-16" style={{ position: 'relative' }}>
        <div style={{
          width: 68, height: 68, borderRadius: 12,
          background: `linear-gradient(135deg, ${r.color}28, ${r.color}08)`,
          border: `1px solid ${r.color}55`,
          display: 'grid', placeItems: 'center',
          color: r.color,
          boxShadow: hover ? `0 0 20px ${r.glow}` : 'none',
          flexShrink: 0,
        }}>{r.icon}</div>
        <div className="flex-1">
          <div className="t-display" style={{ fontSize: 20, fontWeight: 600, color: r.color, textShadow: `0 0 10px ${r.glow}` }}>{r.title}</div>
          <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>{r.sub}</div>
          <div className="row gap-4" style={{ flexWrap: 'wrap', marginTop: 14 }}>
            {r.items.map(i => (
              <span key={i} style={{
                fontSize: 10, fontFamily: 'var(--f-mono)',
                padding: '3px 8px', borderRadius: 4,
                background: 'rgba(148,163,184,0.1)',
                border: '1px solid rgba(148,163,184,0.18)',
                color: 'var(--text-2)',
                letterSpacing: '0.04em',
              }}>{i}</span>
            ))}
          </div>
        </div>
      </div>
      <button style={{
        width: '100%', marginTop: 20, padding: '10px',
        background: hover ? `linear-gradient(135deg, ${r.color}, ${r.color}cc)` : `${r.color}22`,
        color: hover ? '#0A0E1A' : r.color,
        border: `1px solid ${r.color}`,
        borderRadius: 8, cursor: 'pointer',
        fontFamily: 'var(--f-display)', fontSize: 12, fontWeight: 700,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        boxShadow: hover ? `0 0 16px ${r.glow}` : 'none',
        transition: 'all 0.18s ease',
      }}>Ingresar como {r.title.split(' ')[0]} →</button>
    </div>
  );
}

// ============================================================
// SIDEBAR NAV BY ROLE
// ============================================================
const NAV_BY_ROLE = {
  Supervisor: [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'map', label: 'Mapa de Instalaciones', icon: 'map' },
    { id: 'parks', label: 'Parques Solares', icon: 'solar' },
    { id: 'equipment', label: 'Equipos e Inventario', icon: 'chip' },
    { id: 'maintenance', label: 'Mantenimiento', icon: 'wrench' },
    { id: 'investors', label: 'Inversores', icon: 'users', badge: 'NEW' },
    { id: 'ai', label: 'Asistente IA', icon: 'sparkles', badge: 'AI' },
  ],
  'Técnico': [
    { id: 'tec-home', label: 'Mis Órdenes de Trabajo', icon: 'wrench' },
    { id: 'tec-stock', label: 'Stock y Repuestos', icon: 'cart' },
    { id: 'tec-alerts', label: 'Alertas Asignadas', icon: 'bell', badge: '3' },
    { id: 'map', label: 'Mapa de Rutas', icon: 'map' },
    { id: 'ai', label: 'Asistente IA', icon: 'sparkles', badge: 'AI' },
  ],
  Cooperativa: [
    { id: 'coop-home', label: 'Dashboard de Generación', icon: 'dashboard' },
    { id: 'coop-parks', label: 'Mis Parques', icon: 'solar' },
    { id: 'coop-grid', label: 'Inyección a Red', icon: 'bolt' },
    { id: 'coop-reports', label: 'Reportes', icon: 'chart' },
    { id: 'coop-members', label: 'Socios', icon: 'users' },
    { id: 'ai', label: 'Asistente IA', icon: 'sparkles', badge: 'AI' },
  ],
  Inversor: [
    { id: 'inv-home', label: 'Mi Panel Principal', icon: 'solar' },
    { id: 'inv-panels', label: 'Mis Paneles', icon: 'dashboard' },
    { id: 'inv-wallet', label: 'Mi Billetera', icon: 'bolt' },
    { id: 'inv-market', label: 'Marketplace', icon: 'cart' },
    { id: 'inv-reports', label: 'Mis Reportes', icon: 'chart' },
    { id: 'inv-achieve', label: 'Logros y Beneficios', icon: 'trophy' },
    { id: 'ai', label: 'Asistente IA', icon: 'sparkles', badge: 'AI' },
    { id: 'inv-profile', label: 'Mi Perfil', icon: 'settings' },
  ],
};

const ROLE_HOME = {
  Supervisor: 'dashboard',
  'Técnico': 'tec-home',
  Cooperativa: 'coop-home',
  Inversor: 'inv-home',
};

// ============================================================
// INVESTORS MODULE (Supervisor) — Dashboard + List + Profile
// ============================================================
const INVESTORS_DATA = [
  { id: 1, name: 'Alejandra Ruiz',      email: 'alejandra.ruiz@gmail.com',  phone: '+54 351 555-1234', type: 'crowd', panels: 22, capital: 4070000, tokens: 12340, level: 'master',  status: 'active', login: 'google',    join: '03/2023', last: 'Hoy' },
  { id: 2, name: 'Carlos Medina',        email: 'carlos.medina@outlook.com', phone: '+54 351 555-5678', type: 'mixed', panels: 18, capital: 3330000, tokens: 9876,  level: 'expert',  status: 'active', login: 'microsoft', join: '05/2023', last: 'Hoy' },
  { id: 3, name: 'María José Torres',    email: 'mj.torres@gmail.com',       phone: '+54 351 555-2341', type: 'crowd', panels: 15, capital: 2780000, tokens: 8234,  level: 'expert',  status: 'active', login: 'google',    join: '07/2023', last: 'Ayer' },
  { id: 4, name: 'Roberto Sánchez',      email: 'rsanchez@icloud.com',       phone: '+54 351 555-9012', type: 'own',   panels: 14, capital: 2590000, tokens: 7891,  level: 'pioneer', status: 'active', login: 'apple',     join: '09/2023', last: 'Hoy' },
  { id: 5, name: 'Laura Gutiérrez',      email: 'lgutierrez@gmail.com',      phone: '+54 351 555-3456', type: 'mixed', panels: 12, capital: 2220000, tokens: 6543,  level: 'pioneer', status: 'active', login: 'google',    join: '10/2023', last: 'Hace 2 días' },
  { id: 6, name: 'Martín Córdoba',       email: 'm.cordoba@gmail.com',       phone: '+54 351 555-6789', type: 'crowd', panels: 10, capital: 1850000, tokens: 5678,  level: 'pioneer', status: 'active', login: 'google',    join: '11/2023', last: 'Hoy' },
  { id: 7, name: 'Ana Belén Paz',        email: 'abpaz@outlook.com',         phone: '+54 351 555-0123', type: 'crowd', panels: 8,  capital: 1480000, tokens: 4321,  level: 'starter', status: 'active', login: 'microsoft', join: '12/2023', last: 'Ayer' },
  { id: 8, name: 'Diego Fernández',      email: 'dfernandez@gmail.com',      phone: '+54 351 555-4567', type: 'mixed', panels: 8,  capital: 1480000, tokens: 4210,  level: 'starter', status: 'active', login: 'google',    join: '01/2024', last: 'Hoy' },
  { id: 9, name: 'Valentina López',      email: 'vlopez@gmail.com',          phone: '+54 351 555-7890', type: 'crowd', panels: 6,  capital: 1110000, tokens: 3456,  level: 'starter', status: 'active', login: 'google',    join: '02/2024', last: 'Hace 3 días' },
  { id: 10, name: 'Jorge Bustos',        email: 'jbustos@yahoo.com.ar',      phone: '+54 351 555-1122', type: 'crowd', panels: 4,  capital: 740000,  tokens: 2109,  level: 'seed',    status: 'active', login: 'apple',     join: '06/2024', last: 'Hace 5 días' },
  { id: 11, name: 'Sofía Ramírez',       email: 's.ramirez@gmail.com',       phone: '+54 351 555-3344', type: 'crowd', panels: 3,  capital: 555000,  tokens: 1543,  level: 'seed',    status: 'pending', login: 'google', join: '03/2026', last: '—' },
  { id: 12, name: 'Mateo Villanueva',    email: 'mvillanueva@outlook.com',   phone: '+54 351 555-5566', type: 'crowd', panels: 5,  capital: 925000,  tokens: 2890,  level: 'starter', status: 'inactive', login: 'microsoft', join: '04/2024', last: 'Hace 2 meses' },
];

const LEVEL_INFO = {
  master:  { icon: '👑', label: 'Master',  color: '#FFB800' },
  expert:  { icon: '🚀', label: 'Expert',  color: '#F59E0B' },
  pioneer: { icon: '⭐', label: 'Pioneer', color: '#FBBF24' },
  starter: { icon: '☀️', label: 'Starter', color: '#FCD34D' },
  seed:    { icon: '🌱', label: 'Seed',    color: '#10B981' },
};

// ---- 4A: Dashboard ----
function InvestorsDashboard({ onOpenList, onOpenProfile }) {
  return (
    <div className="col gap-20">
      <div className="row items-end justify-between">
        <div>
          <div className="t-eyebrow" style={{ color: 'var(--solar-500)' }}>Módulo</div>
          <h1 className="t-display" style={{ fontSize: 28, margin: '6px 0 0', fontWeight: 600 }}>Inversores</h1>
          <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>Gestión integral de la comunidad de inversores</div>
        </div>
        <div className="row gap-8">
          <button className="btn btn-outline">Exportar reporte</button>
          <button className="btn btn-primary" onClick={onOpenList}>Ver listado completo →</button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        <InvKpi icon="👥" label="Total Inversores Activos" value="142" trend="+12 este mes" trendColor="var(--emerald-500)" />
        <InvKpi icon="💰" label="Capital Total Invertido" value="$178.4M" sub="ARS" trend="+$14.2M este mes" trendColor="var(--emerald-500)" />
        <InvKpi icon="🏗️" label="Paneles Vendidos (crowdfunding)" value="1,847" sub="/ 2,200" progress={84} trend="356 disponibles" />
        <InvKpi icon="⚡" label="Tokens en Circulación" value="547,832" sub="⚡" trend="= $46.5M ARS" trendColor="var(--solar-500)" />
        <InvKpi icon="💸" label="Tokens Retirados Este Mes" value="23,450" sub="⚡" trend="$1.99M pagados a inversores" trendColor="var(--cyan-500)" />
        <InvKpi icon="⭐" label="NPS / Satisfacción" value="4.7" sub="/ 5.0" trend="basado en 89 encuestas" />
      </div>

      {/* Chart 1 — Evolution */}
      <div className="card" style={{ padding: 22 }}>
        <div className="t-eyebrow">12 meses</div>
        <div className="t-display" style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Evolución de Inversores</div>
        <InvEvolutionChart />
      </div>

      {/* Chart row 2 — Donut + Bars */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div className="card" style={{ padding: 22 }}>
          <div className="t-eyebrow">Segmentación</div>
          <div className="t-display" style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Distribución por tipo de inversión</div>
          <div className="row items-center gap-24 mt-16">
            <DonutWithCenter data={[
              { label: 'Crowdfunding', value: 62, color: '#FFB800' },
              { label: 'Parque propio', value: 28, color: '#0EA5E9' },
              { label: 'Mixto', value: 10, color: '#10B981' },
            ]} center={{ top: '142', bottom: 'inversores' }} />
            <div className="col gap-10 flex-1">
              {[
                { l: 'Crowdfunding', v: '88', p: '62%', c: '#FFB800' },
                { l: 'Parque propio', v: '40', p: '28%', c: '#0EA5E9' },
                { l: 'Mixto',         v: '14', p: '10%', c: '#10B981' },
              ].map((d, i) => (
                <div key={i} className="row items-center gap-8">
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: d.c, boxShadow: `0 0 6px ${d.c}` }} />
                  <span style={{ fontSize: 13, color: 'var(--text-0)', fontWeight: 500 }}>{d.l}</span>
                  <span className="flex-1" />
                  <span className="t-mono" style={{ fontSize: 12, color: 'var(--text-2)' }}>{d.v}</span>
                  <span className="t-mono" style={{ fontSize: 13, color: d.c, fontWeight: 700, minWidth: 44, textAlign: 'right' }}>{d.p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card" style={{ padding: 22 }}>
          <div className="t-eyebrow">Por parque</div>
          <div className="t-display" style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Capital Invertido por Parque</div>
          <div className="col gap-10 mt-16">
            {[
              { l: 'C. Solar Alta Gracia', v: 42.3 },
              { l: 'C. Solar Villa María', v: 38.1 },
              { l: 'C. Solar Jesús María', v: 31.7 },
              { l: 'C. Solar Río Cuarto',  v: 28.4 },
              { l: 'C. Solar Cruz del Eje', v: 22.1 },
              { l: 'Otros',                v: 15.8 },
            ].map((d, i) => (
              <div key={i}>
                <div className="row items-center justify-between" style={{ fontSize: 12 }}>
                  <span style={{ color: 'var(--text-1)' }}>{d.l}</span>
                  <span className="t-mono" style={{ color: 'var(--solar-500)', fontWeight: 700 }}>${d.v}M</span>
                </div>
                <div style={{ height: 8, background: 'rgba(148,163,184,0.1)', borderRadius: 4, overflow: 'hidden', marginTop: 4 }}>
                  <div style={{
                    width: `${(d.v / 42.3) * 100}%`, height: '100%',
                    background: 'linear-gradient(90deg, #FFB800, #F59E0B)',
                    boxShadow: '0 0 6px rgba(255,184,0,0.4)',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart 3 — Tokens */}
      <div className="card" style={{ padding: 22 }}>
        <div className="t-eyebrow">6 meses</div>
        <div className="t-display" style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Tokens: Acreditación vs Retiro</div>
        <TokenFlowChart />
      </div>

      {/* Chart 4 — Levels */}
      <div className="card" style={{ padding: 22 }}>
        <div className="t-eyebrow">Gamificación</div>
        <div className="t-display" style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Distribución de Niveles</div>
        <div className="row items-end gap-16" style={{ marginTop: 24, height: 200 }}>
          {[
            { l: 'Seed',    v: 23, c: '#10B981', icon: '🌱' },
            { l: 'Starter', v: 45, c: '#FCD34D', icon: '☀️' },
            { l: 'Pioneer', v: 38, c: '#FBBF24', icon: '⭐' },
            { l: 'Expert',  v: 27, c: '#F59E0B', icon: '🚀' },
            { l: 'Master',  v: 9,  c: '#FFB800', icon: '👑' },
          ].map((b, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <div className="t-mono" style={{ fontSize: 14, color: b.c, fontWeight: 700, textShadow: `0 0 6px ${b.c}66`, marginBottom: 6 }}>{b.v}</div>
              <div style={{
                width: '100%', maxWidth: 80,
                height: `${(b.v / 45) * 150}px`,
                background: `linear-gradient(180deg, ${b.c}, ${b.c}77)`,
                border: `1px solid ${b.c}`,
                borderRadius: '6px 6px 0 0',
                boxShadow: `0 0 14px ${b.c}55`,
              }} />
              <div style={{ fontSize: 20, marginTop: 8 }}>{b.icon}</div>
              <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-2)', letterSpacing: '0.08em', marginTop: 4 }}>{b.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 10 */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="row items-center justify-between" style={{ padding: '16px 22px', borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
          <div>
            <div className="t-eyebrow">Ranking</div>
            <div className="t-display" style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Top 10 Inversores</div>
          </div>
          <button className="btn btn-outline btn-sm" onClick={onOpenList}>Ver todos →</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(17,24,39,0.5)' }}>
              {['#', 'Nombre', 'Paneles', 'Capital', 'Tokens', 'Nivel', 'Último acceso'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 22px', fontFamily: 'var(--f-display)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INVESTORS_DATA.slice(0, 10).map((inv, i) => {
              const L = LEVEL_INFO[inv.level];
              return (
                <tr key={inv.id} onClick={() => onOpenProfile(inv)} style={{ borderTop: '1px solid rgba(148,163,184,0.06)', cursor: 'pointer' }}>
                  <td style={{ padding: '10px 22px', fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--solar-500)', fontWeight: 700 }}>#{i + 1}</td>
                  <td style={{ padding: '10px 22px', fontSize: 13, color: 'var(--text-0)', fontWeight: 500 }}>{inv.name}</td>
                  <td style={{ padding: '10px 22px', fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--text-1)' }}>{inv.panels}</td>
                  <td style={{ padding: '10px 22px', fontFamily: 'var(--f-mono)', fontSize: 13, color: 'var(--solar-500)', fontWeight: 700 }}>${(inv.capital / 1000000).toFixed(2)}M</td>
                  <td style={{ padding: '10px 22px', fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--text-1)' }}>⚡ {inv.tokens.toLocaleString('es-AR')}</td>
                  <td style={{ padding: '10px 22px', fontSize: 12 }}>
                    <span style={{ color: L.color, fontWeight: 600 }}>{L.icon} {L.label}</span>
                  </td>
                  <td style={{ padding: '10px 22px', fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--text-2)' }}>{inv.last}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InvKpi({ icon, label, value, sub, trend, trendColor, progress }) {
  return (
    <div className="card bracket" style={{ padding: 18 }}>
      <div className="row items-center justify-between">
        <div className="t-eyebrow">{label}</div>
        <span style={{ fontSize: 18 }}>{icon}</span>
      </div>
      <div className="row items-baseline gap-6 mt-10">
        <span className="t-display" style={{
          fontSize: 26, fontWeight: 700, lineHeight: 1,
          color: 'var(--solar-500)',
          textShadow: '0 0 12px rgba(255,184,0,0.4)',
        }}>{value}</span>
        {sub && <span className="t-mono" style={{ fontSize: 12, color: 'var(--text-2)' }}>{sub}</span>}
      </div>
      {progress != null && (
        <div className="progress-bar mt-8"><span style={{ width: `${progress}%` }} /></div>
      )}
      {trend && <div style={{ fontSize: 11, color: trendColor || 'var(--text-2)', marginTop: 8, fontWeight: trendColor ? 600 : 400 }}>{trend}</div>}
    </div>
  );
}

function InvEvolutionChart() {
  const W = 900, H = 200;
  const months = ['May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr'];
  const newPer = [6, 8, 10, 11, 12, 14, 16, 22, 12, 10, 9, 12];
  const cum = newPer.reduce((acc, v) => { acc.push((acc[acc.length - 1] || 0) + v); return acc; }, []);
  const max = Math.max(...cum);
  const xs = i => 30 + (i / (months.length - 1)) * (W - 60);
  const ys = v => H - 40 - (v / max) * (H - 60);
  const path = cum.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xs(i)} ${ys(v)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ marginTop: 12 }}>
      <defs>
        <linearGradient id="evoGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFB800" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#FFB800" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* Bars behind */}
      {newPer.map((v, i) => {
        const bw = 24;
        const bh = (v / 25) * (H - 60);
        return <rect key={i} x={xs(i) - bw/2} y={H - 40 - bh} width={bw} height={bh} fill="rgba(14,165,233,0.2)" stroke="rgba(14,165,233,0.5)" strokeWidth="0.8"/>;
      })}
      {/* Line */}
      <path d={`${path} L ${xs(months.length - 1)} ${H - 40} L ${xs(0)} ${H - 40} Z`} fill="url(#evoGrad)" />
      <path d={path} fill="none" stroke="var(--solar-500)" strokeWidth="2.2" style={{ filter: 'drop-shadow(0 0 4px rgba(255,184,0,0.6))' }} />
      {cum.map((v, i) => (
        <circle key={i} cx={xs(i)} cy={ys(v)} r="3" fill="var(--solar-500)" />
      ))}
      {/* Annotations */}
      <g>
        <line x1={xs(7)} x2={xs(7)} y1={ys(cum[7]) - 8} y2={ys(cum[7]) - 32} stroke="var(--emerald-500)" strokeWidth="1" />
        <rect x={xs(7) - 84} y={ys(cum[7]) - 50} width="168" height="20" rx="4" fill="rgba(16,185,129,0.2)" stroke="var(--emerald-500)" strokeWidth="1"/>
        <text x={xs(7)} y={ys(cum[7]) - 36} fill="var(--emerald-500)" fontSize="10" textAnchor="middle" fontFamily="var(--f-mono)" fontWeight="700">Lanzamiento Alta Gracia</text>
      </g>
      <g>
        <line x1={xs(11)} x2={xs(11)} y1={ys(cum[11]) - 8} y2={ys(cum[11]) - 32} stroke="var(--cyan-500)" strokeWidth="1" />
        <rect x={xs(11) - 90} y={ys(cum[11]) - 50} width="100" height="20" rx="4" fill="rgba(14,165,233,0.2)" stroke="var(--cyan-500)" strokeWidth="1"/>
        <text x={xs(11) - 40} y={ys(cum[11]) - 36} fill="var(--cyan-500)" fontSize="10" textAnchor="middle" fontFamily="var(--f-mono)" fontWeight="700">Campaña referidos</text>
      </g>
      {months.map((m, i) => (
        <text key={i} x={xs(i)} y={H - 16} fill="rgba(148,163,184,0.6)" fontSize="10" textAnchor="middle" fontFamily="var(--f-mono)">{m}</text>
      ))}
    </svg>
  );
}

function DonutWithCenter({ data, center }) {
  const size = 170, r = 60, cx = size / 2, cy = size / 2, circ = 2 * Math.PI * r;
  const total = data.reduce((s, d) => s + d.value, 0);
  let offset = 0;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
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
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="t-display" style={{ fontSize: 28, fontWeight: 700, color: 'var(--solar-500)' }}>{center.top}</div>
        <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-2)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>{center.bottom}</div>
      </div>
    </div>
  );
}

function TokenFlowChart() {
  const W = 900, H = 180;
  const months = ['Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr'];
  const credited = [85000, 92000, 88000, 94000, 98000, 105000];
  const withdrawn = [18000, 22000, 19000, 25000, 21000, 23450];
  const max = Math.max(...credited);
  const xs = i => 30 + (i / (months.length - 1)) * (W - 60);
  const ys = v => H - 40 - (v / max) * (H - 60);
  const pathC = credited.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xs(i)} ${ys(v)}`).join(' ');
  const pathW = withdrawn.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xs(i)} ${ys(v)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ marginTop: 12 }}>
      <defs>
        <linearGradient id="creditGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#10B981" stopOpacity="0.4"/><stop offset="1" stopColor="#10B981" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="wdGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#EF4444" stopOpacity="0.35"/><stop offset="1" stopColor="#EF4444" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={`${pathC} L ${xs(months.length - 1)} ${H - 40} L ${xs(0)} ${H - 40} Z`} fill="url(#creditGrad)" />
      <path d={pathC} fill="none" stroke="var(--emerald-500)" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 4px rgba(16,185,129,0.5))' }} />
      <path d={`${pathW} L ${xs(months.length - 1)} ${H - 40} L ${xs(0)} ${H - 40} Z`} fill="url(#wdGrad)" />
      <path d={pathW} fill="none" stroke="#EF4444" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 4px rgba(239,68,68,0.5))' }} />
      {months.map((m, i) => (
        <text key={i} x={xs(i)} y={H - 16} fill="rgba(148,163,184,0.6)" fontSize="10" textAnchor="middle" fontFamily="var(--f-mono)">{m}</text>
      ))}
      {/* Legend */}
      <g transform={`translate(${W - 240}, 12)`}>
        <rect x="0" y="0" width="10" height="10" fill="var(--emerald-500)"/>
        <text x="14" y="9" fill="var(--text-1)" fontSize="10" fontFamily="var(--f-mono)">Acreditados</text>
        <rect x="110" y="0" width="10" height="10" fill="#EF4444"/>
        <text x="124" y="9" fill="var(--text-1)" fontSize="10" fontFamily="var(--f-mono)">Retirados</text>
      </g>
    </svg>
  );
}

// ---- 4B: List ----
function InvestorsList({ onBack, onOpenProfile }) {
  const [q, setQ] = useSt('');
  const [lvl, setLvl] = useSt('all');
  const [type, setType] = useSt('all');
  const [stat, setStat] = useSt('all');

  const filtered = INVESTORS_DATA.filter(i => {
    if (q && !i.name.toLowerCase().includes(q.toLowerCase()) && !i.email.toLowerCase().includes(q.toLowerCase())) return false;
    if (lvl !== 'all' && i.level !== lvl) return false;
    if (type !== 'all' && i.type !== type) return false;
    if (stat !== 'all' && i.status !== stat) return false;
    return true;
  });

  return (
    <div className="col gap-20">
      <div className="row items-center gap-10">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>← Dashboard</button>
        <span style={{ color: 'var(--text-3)' }}>/</span>
        <span className="t-eyebrow">Inversores</span>
      </div>
      <div className="row items-end justify-between">
        <div>
          <h1 className="t-display" style={{ fontSize: 28, margin: 0, fontWeight: 600 }}>Listado de Inversores</h1>
          <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>{INVESTORS_DATA.length} inversores · {filtered.length} coinciden</div>
        </div>
        <div className="row gap-8">
          <button className="btn btn-outline">Exportar CSV</button>
          <button className="btn btn-primary">+ Invitar inversor</button>
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: 14 }}>
        <div className="row items-center gap-10" style={{ flexWrap: 'wrap' }}>
          <input className="input" placeholder="Buscar por nombre o email..." value={q} onChange={e => setQ(e.target.value)} style={{ flex: 1, minWidth: 220 }}/>
          <select className="input" value={lvl} onChange={e => setLvl(e.target.value)}>
            <option value="all">Todos los niveles</option>
            <option value="seed">🌱 Seed</option>
            <option value="starter">☀️ Starter</option>
            <option value="pioneer">⭐ Pioneer</option>
            <option value="expert">🚀 Expert</option>
            <option value="master">👑 Master</option>
          </select>
          <select className="input" value={type} onChange={e => setType(e.target.value)}>
            <option value="all">Todos los tipos</option>
            <option value="crowd">Crowdfunding</option>
            <option value="own">Parque propio</option>
            <option value="mixed">Mixto</option>
          </select>
          <select className="input" value={stat} onChange={e => setStat(e.target.value)}>
            <option value="all">Todos los estados</option>
            <option value="active">🟢 Activo</option>
            <option value="inactive">⚪ Inactivo</option>
            <option value="pending">🟡 Pendiente</option>
          </select>
          <select className="input"><option>Ordenar: Capital ↓</option><option>Paneles ↓</option><option>Tokens ↓</option><option>Último acceso</option></select>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1400 }}>
            <thead>
              <tr style={{ background: 'rgba(17,24,39,0.5)' }}>
                {['Nombre', 'Email', 'Tipo', 'Paneles', 'Capital', 'Tokens', 'Nivel', 'Estado', 'Alta', 'Último acceso', 'Acciones'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 14px', fontFamily: 'var(--f-display)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(inv => {
                const L = LEVEL_INFO[inv.level];
                const statusColor = inv.status === 'active' ? 'var(--emerald-500)' : inv.status === 'pending' ? '#F59E0B' : 'var(--text-3)';
                const statusLabel = inv.status === 'active' ? '🟢 Activo' : inv.status === 'pending' ? '🟡 Pendiente' : '⚪ Inactivo';
                return (
                  <tr key={inv.id} style={{ borderTop: '1px solid rgba(148,163,184,0.06)' }}>
                    <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text-0)', fontWeight: 500 }}>{inv.name}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--text-2)' }}>{inv.email}</td>
                    <td style={{ padding: '10px 14px', fontSize: 11 }}>
                      <span style={{ padding: '2px 7px', borderRadius: 4, background: 'rgba(148,163,184,0.1)', border: '1px solid rgba(148,163,184,0.2)', color: 'var(--text-1)', fontFamily: 'var(--f-mono)' }}>
                        {inv.type === 'crowd' ? '👥 Crowd' : inv.type === 'own' ? '🏠 Propio' : '🔀 Mixto'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px', fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--text-1)' }}>{inv.panels}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'var(--f-mono)', fontSize: 13, color: 'var(--solar-500)', fontWeight: 700 }}>${(inv.capital / 1000000).toFixed(2)}M</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--text-1)' }}>⚡{inv.tokens.toLocaleString('es-AR')}</td>
                    <td style={{ padding: '10px 14px', fontSize: 12, color: L.color, fontWeight: 600 }}>{L.icon} {L.label}</td>
                    <td style={{ padding: '10px 14px', fontSize: 11, color: statusColor }}>{statusLabel}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--text-2)' }}>{inv.join}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--text-2)' }}>{inv.last}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <div className="row gap-4">
                        <button className="btn btn-outline btn-sm" onClick={() => onOpenProfile(inv)}>Ver perfil</button>
                        <button className="btn btn-ghost btn-sm">···</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="row items-center justify-between" style={{ padding: '14px 22px', borderTop: '1px solid rgba(148,163,184,0.08)' }}>
          <span style={{ fontSize: 12, color: 'var(--text-2)' }}>Mostrando 1-{filtered.length} de {INVESTORS_DATA.length} inversores</span>
          <div className="row gap-4">
            <button className="btn btn-ghost btn-sm">←</button>
            <button className="btn btn-outline btn-sm" style={{ background: 'rgba(255,184,0,0.1)' }}>1</button>
            <button className="btn btn-ghost btn-sm">2</button>
            <button className="btn btn-ghost btn-sm">→</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- 4C: Profile ----
function InvestorProfileView({ investor, onBack }) {
  const inv = investor;
  const L = LEVEL_INFO[inv.level];
  const init = inv.name.split(' ').map(s => s[0]).slice(0, 2).join('');
  const gain = inv.capital * 0.7;

  const panels = [
    { sn: 'JKS-00142', park: 'Mi Parque (propio)',     type: 'own',   date: '15/03/2023', kwh: 4234, ars: 359890 },
    { sn: 'JKS-00567', park: 'C.Solar Alta Gracia',    type: 'crowd', date: '10/06/2023', kwh: 3891, ars: 330735 },
    { sn: 'JKS-00568', park: 'C.Solar Alta Gracia',    type: 'crowd', date: '10/06/2023', kwh: 3855, ars: 327675 },
    { sn: 'JKS-00789', park: 'C.Solar Villa María',    type: 'crowd', date: '22/08/2023', kwh: 3412, ars: 290020 },
    { sn: 'JKS-00790', park: 'C.Solar Villa María',    type: 'crowd', date: '22/08/2023', kwh: 3389, ars: 288065 },
    { sn: 'JKS-01023', park: 'C.Solar Jesús María',    type: 'crowd', date: '14/11/2023', kwh: 2870, ars: 243950 },
  ];

  const tokens = [
    { k: 'in',  q: '+187',   d: 'Generación diaria — C.Solar Alta Gracia', t: '20/04/2026 14:32' },
    { k: 'in',  q: '+245',   d: 'Generación diaria acumulada',              t: '19/04/2026 14:30' },
    { k: 'out', q: '-500',   d: 'Canje a pesos — Transferencia CBU',        t: '18/04/2026 10:15' },
    { k: 'in',  q: '+190',   d: 'Generación diaria — Villa María',          t: '18/04/2026 14:28' },
    { k: 'bonus', q: '+1,200', d: 'Bonus logro Eco Warrior 🏆',              t: '10/04/2026 09:12' },
    { k: 'in',  q: '+178',   d: 'Generación diaria',                        t: '09/04/2026 14:25' },
  ];

  const loginIcon = { google: '🅖', apple: '', microsoft: '🗔' }[inv.login] || '✉';

  return (
    <div className="col gap-20">
      <div className="row items-center gap-10">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>← Listado</button>
        <span style={{ color: 'var(--text-3)' }}>/</span>
        <span className="t-eyebrow">Perfil del inversor</span>
      </div>

      {/* Header */}
      <div className="card bracket" style={{ padding: 26, background: 'linear-gradient(135deg, rgba(255,184,0,0.05), rgba(17,24,39,0.8))' }}>
        <div className="row items-start gap-20" style={{ flexWrap: 'wrap' }}>
          <div style={{
            width: 92, height: 92, borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFB800, #F59E0B)',
            display: 'grid', placeItems: 'center',
            color: '#0A0E1A', fontWeight: 700, fontSize: 30,
            fontFamily: 'var(--f-display)',
            boxShadow: '0 0 24px rgba(255,184,0,0.5)',
            flexShrink: 0,
          }}>{init}</div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <div className="row items-center gap-10" style={{ flexWrap: 'wrap' }}>
              <h1 className="t-display" style={{ fontSize: 24, margin: 0, fontWeight: 600 }}>{inv.name}</h1>
              <span style={{
                padding: '3px 10px', borderRadius: 4, fontSize: 11, fontWeight: 700,
                background: `${L.color}22`, border: `1px solid ${L.color}`, color: L.color,
                fontFamily: 'var(--f-display)', letterSpacing: '0.08em',
              }}>{L.icon} Solar {L.label}</span>
              <span style={{
                padding: '3px 10px', borderRadius: 4, fontSize: 10, fontWeight: 700,
                background: 'rgba(16,185,129,0.15)', border: '1px solid var(--emerald-500)', color: 'var(--emerald-500)',
                fontFamily: 'var(--f-display)',
              }}>🟢 ACTIVA</span>
            </div>
            <div className="row gap-18 mt-10" style={{ flexWrap: 'wrap' }}>
              <div>
                <div className="t-eyebrow">Email</div>
                <div className="t-mono" style={{ fontSize: 12, color: 'var(--text-1)', marginTop: 2 }}>{inv.email}</div>
              </div>
              <div>
                <div className="t-eyebrow">Teléfono</div>
                <div className="t-mono" style={{ fontSize: 12, color: 'var(--text-1)', marginTop: 2 }}>{inv.phone}</div>
              </div>
              <div>
                <div className="t-eyebrow">Login</div>
                <div className="t-mono" style={{ fontSize: 12, color: 'var(--text-1)', marginTop: 2 }}>{loginIcon} {inv.login}</div>
              </div>
              <div>
                <div className="t-eyebrow">Miembro desde</div>
                <div className="t-mono" style={{ fontSize: 12, color: 'var(--text-1)', marginTop: 2 }}>{inv.join}</div>
              </div>
            </div>
          </div>
          <div className="row gap-8" style={{ flexWrap: 'wrap' }}>
            <button className="btn btn-outline btn-sm">Editar perfil</button>
            <button className="btn btn-primary btn-sm">Acreditar tokens</button>
            <button className="btn btn-outline btn-sm">Mensaje</button>
            <button className="btn btn-ghost btn-sm" style={{ color: '#EF4444' }}>Suspender</button>
          </div>
        </div>
      </div>

      {/* Financial summary */}
      <div>
        <div className="t-eyebrow mb-10">Resumen financiero</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <InvKpi icon="💰" label="Capital invertido" value={`$${(inv.capital / 1000000).toFixed(2)}M`} sub="ARS" />
          <InvKpi icon="📈" label="Ganancia acumulada" value={`$${(gain / 1000000).toFixed(2)}M`} sub="ARS" trend={`ROI: 70%`} trendColor="var(--emerald-500)" />
          <InvKpi icon="🎯" label="Recupero" value="70%" progress={70} trend="~1.4 años restantes" />
          <InvKpi icon="⚡" label="Tokens actuales" value={inv.tokens.toLocaleString('es-AR')} sub="⚡" trend={`= $${(inv.tokens * 85).toLocaleString('es-AR')} ARS`} trendColor="var(--solar-500)" />
        </div>
      </div>

      {/* Panels portfolio */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 22px', borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
          <div className="t-eyebrow">Portafolio</div>
          <div className="t-display" style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Paneles ({inv.panels})</div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(17,24,39,0.5)' }}>
              {['Panel', 'Parque', 'Tipo', 'Adquirido', 'Generación total', 'Ganancia total', 'Estado'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 22px', fontFamily: 'var(--f-display)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {panels.map((p, i) => (
              <tr key={i} style={{ borderTop: '1px solid rgba(148,163,184,0.06)' }}>
                <td style={{ padding: '10px 22px', fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--text-2)' }}>{p.sn}</td>
                <td style={{ padding: '10px 22px', fontSize: 12, color: 'var(--text-0)' }}>{p.park}</td>
                <td style={{ padding: '10px 22px' }}>
                  <span style={{
                    fontSize: 9, padding: '2px 7px', borderRadius: 4, letterSpacing: '0.08em',
                    fontFamily: 'var(--f-mono)', fontWeight: 700,
                    background: p.type === 'own' ? 'rgba(255,184,0,0.12)' : 'rgba(14,165,233,0.12)',
                    color: p.type === 'own' ? 'var(--solar-500)' : 'var(--cyan-500)',
                    border: `1px solid ${p.type === 'own' ? 'rgba(255,184,0,0.35)' : 'rgba(14,165,233,0.35)'}`,
                  }}>{p.type === 'own' ? '🏠 PROPIO' : '👥 CROWD'}</span>
                </td>
                <td style={{ padding: '10px 22px', fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--text-2)' }}>{p.date}</td>
                <td style={{ padding: '10px 22px', fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--text-1)' }}>{p.kwh.toLocaleString('es-AR')} kWh</td>
                <td style={{ padding: '10px 22px', fontFamily: 'var(--f-mono)', fontSize: 13, color: 'var(--solar-500)', fontWeight: 700 }}>${p.ars.toLocaleString('es-AR')}</td>
                <td style={{ padding: '10px 22px' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--emerald-500)', boxShadow: '0 0 6px var(--emerald-500)', display: 'inline-block' }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tokens history + Platform activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14 }}>
        <div className="card" style={{ padding: 22 }}>
          <div className="t-eyebrow">Últimos movimientos</div>
          <div className="t-display" style={{ fontSize: 16, fontWeight: 600, marginTop: 4, marginBottom: 14 }}>Historial de Tokens</div>
          <div className="col gap-6">
            {tokens.map((t, i) => {
              const col = t.k === 'in' ? 'var(--emerald-500)' : t.k === 'out' ? '#EF4444' : 'var(--solar-500)';
              return (
                <div key={i} className="row items-center gap-12" style={{
                  padding: '10px 12px', background: 'rgba(17,24,39,0.5)',
                  border: '1px solid rgba(148,163,184,0.06)', borderLeft: `3px solid ${col}`,
                  borderRadius: 8,
                }}>
                  <span className="t-mono" style={{ fontSize: 14, fontWeight: 700, color: col, width: 70, textShadow: `0 0 6px ${col}55` }}>{t.q}</span>
                  <span style={{ color: 'var(--text-2)', fontSize: 12 }}>⚡</span>
                  <span className="flex-1" style={{ fontSize: 12, color: 'var(--text-1)' }}>{t.d}</span>
                  <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)' }}>{t.t}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card" style={{ padding: 22 }}>
          <div className="t-eyebrow">En plataforma</div>
          <div className="t-display" style={{ fontSize: 16, fontWeight: 600, marginTop: 4, marginBottom: 14 }}>Actividad</div>
          <div className="col gap-12">
            {[
              { l: 'Días activos este mes', v: '24 / 20', badge: '🔥 Muy activa' },
              { l: 'Sesiones por semana', v: '5.2' },
              { l: 'Último login', v: 'Hoy 09:34' },
              { l: 'Logros desbloqueados', v: '12 / 15' },
              { l: 'Referidos activos', v: '3 personas' },
            ].map((r, i) => (
              <div key={i} className="row items-center justify-between" style={{ padding: '10px 0', borderBottom: i < 4 ? '1px solid rgba(148,163,184,0.08)' : 'none' }}>
                <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{r.l}</span>
                <div className="row items-center gap-8">
                  <span className="t-mono" style={{ fontSize: 13, color: 'var(--solar-500)', fontWeight: 700 }}>{r.v}</span>
                  {r.badge && <span style={{
                    fontSize: 9, padding: '2px 6px', borderRadius: 4,
                    background: 'rgba(245,158,11,0.15)', color: '#F59E0B', border: '1px solid #F59E0B',
                    fontFamily: 'var(--f-mono)', fontWeight: 700,
                  }}>{r.badge}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending ops */}
      <div className="card" style={{ padding: 22, borderLeft: '3px solid #F59E0B' }}>
        <div className="t-eyebrow" style={{ color: '#F59E0B' }}>Acción requerida</div>
        <div className="t-display" style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Operaciones Pendientes</div>
        <div className="col gap-10 mt-14">
          {[
            { t: 'Solicitud de retiro de tokens', d: '2,500 tokens ⚡ = $212,500 ARS → CBU xxx-4521', when: 'Hace 2 horas' },
            { t: 'Compra de panel adicional',       d: 'C.Solar Jesús María · 1 panel · $192,000', when: 'Ayer' },
          ].map((o, i) => (
            <div key={i} className="row items-center gap-14" style={{
              padding: '14px 16px', background: 'rgba(245,158,11,0.06)',
              border: '1px solid rgba(245,158,11,0.25)', borderRadius: 8,
            }}>
              <div className="flex-1">
                <div style={{ fontSize: 13, color: 'var(--text-0)', fontWeight: 600 }}>{o.t}</div>
                <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{o.d}</div>
                <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{o.when}</div>
              </div>
              <button className="btn btn-primary btn-sm" style={{ background: 'var(--emerald-500)', color: '#0A0E1A' }}>Aprobar</button>
              <button className="btn btn-outline btn-sm" style={{ borderColor: '#EF4444', color: '#EF4444' }}>Rechazar</button>
            </div>
          ))}
        </div>
      </div>

      {/* Internal notes */}
      <div className="card" style={{ padding: 22 }}>
        <div className="row items-center justify-between">
          <div>
            <div className="t-eyebrow">Solo supervisor</div>
            <div className="t-display" style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Notas Internas</div>
          </div>
          <span style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--f-mono)', letterSpacing: '0.08em' }}>🔒 NO VISIBLE PARA EL INVERSOR</span>
        </div>
        <textarea className="input" placeholder="Agregar nota sobre este inversor..." style={{ width: '100%', minHeight: 70, marginTop: 14, resize: 'vertical' }}></textarea>
        <div className="row justify-end mt-8">
          <button className="btn btn-primary btn-sm">Guardar nota</button>
        </div>
        <div className="col gap-8 mt-14">
          {[
            { a: 'Ing. Martín Quiroga', t: 'Cliente muy activa. Interesada en expandir a C.Solar Cruz del Eje. Llamar en 2 semanas.', d: '15/04/2026' },
            { a: 'Ana Galván (Soporte)', t: 'Consultó por bonificación de referidos. Tiene 3 referidos activos, calificada para bonus.', d: '02/04/2026' },
          ].map((n, i) => (
            <div key={i} style={{
              padding: '12px 14px', background: 'rgba(17,24,39,0.5)',
              border: '1px solid rgba(148,163,184,0.08)', borderRadius: 8,
            }}>
              <div className="row items-center justify-between mb-6">
                <span style={{ fontSize: 12, color: 'var(--solar-500)', fontWeight: 600 }}>{n.a}</span>
                <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)' }}>{n.d}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-1)', lineHeight: 1.5 }}>{n.t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Exports
// ============================================================
Object.assign(window, {
  LoginScreen, RoleSelectorScreen,
  NAV_BY_ROLE, ROLE_HOME,
  InvestorsDashboard, InvestorsList, InvestorProfileView,
});
