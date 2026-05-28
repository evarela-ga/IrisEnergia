/* global React */
// Shared UI components, icons, and data for IRIS Solar Platform

const { useState, useEffect, useRef, useMemo } = React;

// ============================================================
// Icons — line / stroke 1.6px, rounded
// ============================================================
const Ic = {
  cart: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 4h2l2.4 11.3a2 2 0 0 0 2 1.7h7.8a2 2 0 0 0 2-1.6L21 8H6"/>
      <circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/>
    </svg>
  ),
  chart: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/>
    </svg>
  ),
  trophy: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4z"/><path d="M16 5h3v2a3 3 0 0 1-3 3M8 5H5v2a3 3 0 0 0 3 3"/>
      <path d="M10 14h4v3h-4zM9 21h6"/>
    </svg>
  ),
  dashboard: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="3" width="8" height="10" rx="1.5" /><rect x="13" y="3" width="8" height="6" rx="1.5" />
      <rect x="13" y="11" width="8" height="10" rx="1.5" /><rect x="3" y="15" width="8" height="6" rx="1.5" />
    </svg>
  ),
  map: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2Z" /><path d="M9 3v16" /><path d="M15 5v16" />
    </svg>
  ),
  solar: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 17h16l-2-10H6L4 17Z" /><path d="M9 7v10M15 7v10M4 12h16" />
    </svg>
  ),
  chip: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="5" y="5" width="14" height="14" rx="2" /><rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2" />
    </svg>
  ),
  wrench: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2.4-2.4 2.3-2.3Z" />
    </svg>
  ),
  sparkles: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  ),
  settings: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1A2 2 0 1 1 4.3 17l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1A2 2 0 1 1 7 4.3l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </svg>
  ),
  help: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7" /><circle cx="12" cy="17" r=".6" fill="currentColor" />
    </svg>
  ),
  bell: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" /><path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  ),
  search: (p = {}) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
    </svg>
  ),
  chev: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  chevRight: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  ),
  bolt: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M13 2 4 14h7l-2 8 9-12h-7l2-8Z" />
    </svg>
  ),
  sun: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  wave: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2 12c2 0 2-4 4-4s2 8 4 8 2-8 4-8 2 4 4 4 2-2 4-2" />
    </svg>
  ),
  grid: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 12h18M12 3v18M7 3v5M17 3v5M7 16v5M17 16v5M3 7h5M3 17h5M16 7h5M16 17h5" />
    </svg>
  ),
  alert: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3 2 21h20L12 3Z" /><path d="M12 10v5" /><circle cx="12" cy="18" r=".6" fill="currentColor" />
    </svg>
  ),
  pin: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z" /><circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  mic: (p = {}) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  ),
  send: (p = {}) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m5 12 14-7-5 16-3-7-6-2Z" />
    </svg>
  ),
  plus: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  filter: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 5h16l-6 8v6l-4-2v-4L4 5Z" />
    </svg>
  ),
  download: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  ),
  gridView: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  listView: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  layers: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" /><path d="M3 14l9 5 9-5M3 11l9 5 9-5" />
    </svg>
  ),
  close: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  users: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  slidersTweak: (p = {}) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h14M18 18h2" />
      <circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="16" cy="18" r="2" />
    </svg>
  ),
};

// ============================================================
// IRIS Logo — compact, matches brand
// ============================================================
function IrisLogo({ size = 32, withWordmark = true }) {
  return (
    <div className="row items-center gap-10">
      <div style={{
        width: size, height: size, borderRadius: 6,
        background: '#FFB800',
        display: 'grid', placeItems: 'center',
        boxShadow: '0 0 18px rgba(255,184,0,0.45)',
        flexShrink: 0,
      }}>
        <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3.2" fill="#fff" />
          {[...Array(12)].map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const x1 = 12 + Math.cos(a) * 5, y1 = 12 + Math.sin(a) * 5;
            const x2 = 12 + Math.cos(a) * 7.8, y2 = 12 + Math.sin(a) * 7.8;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />;
          })}
        </svg>
      </div>
      {withWordmark && (
        <div className="col" style={{ lineHeight: 1 }}>
          <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 15, letterSpacing: '0.06em', color: '#F8FAFC' }}>IRIS</div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 9, letterSpacing: '0.32em', color: '#FFB800', marginTop: 3 }}>ENERGÍA</div>
        </div>
      )}
    </div>
  );
}

// Animated AI sun — atom/solar hybrid
function AISun({ size = 48 }) {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <div style={{
        position: 'absolute', inset: 0,
        animation: 'solarSpin 14s linear infinite',
        display: 'grid', placeItems: 'center',
      }}>
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <ellipse cx="24" cy="24" rx="22" ry="8" stroke="rgba(255,184,0,0.45)" strokeWidth="1" />
          <ellipse cx="24" cy="24" rx="22" ry="8" stroke="rgba(14,165,233,0.35)" strokeWidth="1" transform="rotate(60 24 24)" />
          <ellipse cx="24" cy="24" rx="22" ry="8" stroke="rgba(255,184,0,0.25)" strokeWidth="1" transform="rotate(-60 24 24)" />
        </svg>
      </div>
      <div style={{
        position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
      }}>
        <div style={{
          width: size * 0.36, height: size * 0.36, borderRadius: '50%',
          background: 'radial-gradient(circle, #FFD669 0%, #FFB800 55%, #F59E0B 100%)',
          boxShadow: '0 0 24px rgba(255,184,0,0.75), 0 0 50px rgba(255,184,0,0.3)',
        }} />
      </div>
    </div>
  );
}

// ============================================================
// Sidebar
// ============================================================
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'map', label: 'Mapa de Instalaciones', icon: 'map' },
  { id: 'parks', label: 'Parques Solares', icon: 'solar' },
  { id: 'equipment', label: 'Equipos', icon: 'chip' },
  { id: 'maintenance', label: 'Mantenimiento', icon: 'wrench' },
  { id: 'ai', label: 'Asistente IA', icon: 'sparkles', badge: 'AI' },
];
const NAV_FOOTER = [
  { id: 'settings', label: 'Configuración', icon: 'settings' },
  { id: 'help', label: 'Soporte', icon: 'help' },
];

const NAV_INVESTOR = [
  { id: 'inv-home',      label: 'Mi Panel Principal', icon: 'solar' },
  { id: 'inv-panels',    label: 'Mis Paneles',        icon: 'dashboard' },
  { id: 'inv-wallet',    label: 'Mi Billetera',       icon: 'bolt' },
  { id: 'inv-market',    label: 'Marketplace',        icon: 'cart' },
  { id: 'inv-reports',   label: 'Mis Reportes',       icon: 'chart' },
  { id: 'inv-achieve',   label: 'Logros y Beneficios', icon: 'trophy' },
  { id: 'ai',            label: 'Asistente IA',       icon: 'sparkles', badge: 'AI' },
  { id: 'inv-profile',   label: 'Mi Perfil',          icon: 'settings' },
];

function Sidebar({ current, onNavigate, mini = false, nav, footer, userName, userRole, userInit }) {
  const items = nav || NAV_ITEMS;
  const footerItems = footer !== undefined ? footer : NAV_FOOTER;
  const name = userName || 'Ing. Martín Quiroga';
  const sub = userRole || 'Supervisor';
  const init = userInit || 'MQ';
  return <SidebarInner current={current} onNavigate={onNavigate} mini={mini} items={items} footerItems={footerItems} name={name} sub={sub} init={init} />;
}

function SidebarInner({ current, onNavigate, mini, items, footerItems, name, sub, init }) {
  return (
    <aside style={{
      position: 'sticky', top: 0, alignSelf: 'start', height: '100vh',
      overflowY: 'auto', overflowX: 'hidden',
      padding: mini ? '18px 10px' : '18px 14px',
      background: 'rgba(10, 14, 26, 0.82)',
      backdropFilter: 'blur(18px) saturate(140%)',
      borderRight: '1px solid rgba(255, 184, 0, 0.08)',
      display: 'flex', flexDirection: 'column', gap: 6,
      zIndex: 5,
    }}>
      <div style={{ padding: mini ? '6px 4px 18px' : '8px 10px 20px', borderBottom: '1px solid rgba(148,163,184,0.08)', marginBottom: 10 }}>
        {mini ? <IrisLogo size={30} withWordmark={false} /> : (
          <div className="col gap-4">
            <IrisLogo size={34} />
            <div style={{ marginLeft: 44, fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Solar Platform</div>
          </div>
        )}
      </div>

      <div className="col gap-4">
        {items.map(it => (
          <NavItem key={it.id} item={it} active={current === it.id} mini={mini} onClick={() => onNavigate(it.id)} />
        ))}
      </div>

      {footerItems && footerItems.length > 0 && (
        <>
          <hr className="divider" style={{ margin: '14px 8px' }} />
          <div className="col gap-4">
            {footerItems.map(it => <NavItem key={it.id} item={it} active={false} mini={mini} onClick={() => onNavigate(it.id)} />)}
          </div>
        </>
      )}

      <div style={{ flex: 1 }} />

      <div style={{
        padding: mini ? 8 : 12,
        borderTop: '1px solid rgba(148,163,184,0.08)',
        marginTop: 12,
      }}>
        {mini ? (
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFB800, #F59E0B)',
            display: 'grid', placeItems: 'center',
            color: '#0A0E1A', fontWeight: 700, fontSize: 13,
            fontFamily: 'var(--f-display)',
            boxShadow: '0 0 14px rgba(255,184,0,0.4)',
          }}>{init}</div>
        ) : (
          <div className="row items-center gap-12">
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFB800, #F59E0B)',
              display: 'grid', placeItems: 'center',
              color: '#0A0E1A', fontWeight: 700, fontSize: 13,
              fontFamily: 'var(--f-display)',
              boxShadow: '0 0 14px rgba(255,184,0,0.35)',
              flexShrink: 0,
            }}>{init}</div>
            <div className="col" style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{sub}</div>
            </div>
          </div>
        )}
      </div>

      {/* Powered by GoodApps */}
      <div style={{
        borderTop: '1px solid rgba(148,163,184,0.06)',
        padding: mini ? '10px 4px' : '12px 14px',
        display: 'flex', flexDirection: 'column', alignItems: mini ? 'center' : 'flex-start', gap: 4,
      }}>
        {!mini && (
          <span style={{
            fontSize: 9, color: '#64748B',
            fontFamily: 'var(--f-display)', letterSpacing: '0.14em',
            textTransform: 'uppercase', fontWeight: 500,
          }}>Desarrollado por</span>
        )}
        <img
          src="assets/goodapps-white.png"
          alt="GoodApps"
          title="Desarrollado por GoodApps"
          style={{
            height: mini ? 14 : 18,
            width: 'auto',
            opacity: 0.55,
            filter: 'grayscale(1)',
          }}
        />
      </div>
    </aside>
  );
}

function NavItem({ item, active, mini, onClick }) {
  const Icon = Ic[item.icon];
  return (
    <button
      onClick={onClick}
      title={mini ? item.label : ''}
      style={{
        position: 'relative',
        display: 'flex', alignItems: 'center', gap: 12,
        padding: mini ? '10px' : '10px 12px',
        justifyContent: mini ? 'center' : 'flex-start',
        background: active ? 'linear-gradient(90deg, rgba(255,184,0,0.14), rgba(255,184,0,0.02))' : 'transparent',
        color: active ? 'var(--solar-500)' : 'var(--text-1)',
        border: 0, borderRadius: 8,
        cursor: 'pointer',
        fontFamily: 'var(--f-body)',
        fontSize: 13, fontWeight: active ? 600 : 500,
        textAlign: 'left',
        transition: 'all .15s',
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      {active && <span style={{
        position: 'absolute', left: -14, top: 8, bottom: 8, width: 3,
        background: 'var(--solar-500)', borderRadius: 3,
        boxShadow: '0 0 10px rgba(255,184,0,0.65)',
      }} />}
      <span style={{
        display: 'grid', placeItems: 'center',
        filter: active ? 'drop-shadow(0 0 6px rgba(255,184,0,0.6))' : 'none',
      }}>
        <Icon />
      </span>
      {!mini && <span className="flex-1" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>}
      {!mini && item.badge && (
        <span style={{
          fontSize: 9, fontWeight: 700, padding: '2px 6px',
          background: 'rgba(14,165,233,0.18)', color: 'var(--cyan-500)',
          border: '1px solid rgba(14,165,233,0.4)',
          borderRadius: 4, fontFamily: 'var(--f-display)', letterSpacing: '0.08em',
        }}>{item.badge}</span>
      )}
    </button>
  );
}

// ============================================================
// Header
// ============================================================
function Header({ breadcrumb, onNavigate, role, setRole, assignedRoles, onLogout }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 4,
      height: 'var(--header-h)',
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '0 28px',
      background: 'rgba(10, 14, 26, 0.7)',
      backdropFilter: 'blur(16px) saturate(140%)',
      borderBottom: '1px solid rgba(148,163,184,0.08)',
    }}>
      <div className="row items-center gap-8" style={{ fontSize: 13 }}>
        {breadcrumb.map((b, i) => (
          <React.Fragment key={i}>
            <span style={{ color: i === breadcrumb.length - 1 ? 'var(--text-0)' : 'var(--text-2)', fontWeight: i === breadcrumb.length - 1 ? 600 : 500 }}>{b}</span>
            {i < breadcrumb.length - 1 && <span style={{ color: 'var(--text-4)' }}>/</span>}
          </React.Fragment>
        ))}
      </div>

      <div className="flex-1" />

      <div className="search-wrap" style={{ width: 360, maxWidth: '30vw' }}>
        <span className="search-icon"><Ic.search /></span>
        <input className="input with-icon" placeholder="Buscar instalación, equipo, alerta…" />
      </div>

      <button className="btn btn-ghost btn-icon" style={{ position: 'relative' }} title="Notificaciones">
        <Ic.bell />
        <span style={{
          position: 'absolute', top: 4, right: 4,
          width: 16, height: 16, borderRadius: '50%',
          background: 'var(--red-500)',
          color: 'white', fontSize: 9, fontWeight: 700,
          display: 'grid', placeItems: 'center',
          boxShadow: '0 0 10px rgba(239,68,68,0.7)',
          fontFamily: 'var(--f-mono)',
        }}>4</span>
      </button>

      <RoleDropdown role={role} setRole={setRole} assignedRoles={assignedRoles} onLogout={onLogout} />

      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: 'linear-gradient(135deg, #FFB800, #F59E0B)',
        display: 'grid', placeItems: 'center',
        color: '#0A0E1A', fontWeight: 700, fontSize: 12,
        fontFamily: 'var(--f-display)',
        boxShadow: '0 0 12px rgba(255,184,0,0.35)',
      }}>{role === 'Técnico' ? 'ML' : role === 'Cooperativa' ? 'CV' : 'MQ'}</div>
    </header>
  );
}

function RoleDropdown({ role, setRole, assignedRoles, onLogout }) {
  const [open, setOpen] = useState(false);
  const roles = assignedRoles || ['Supervisor', 'Técnico', 'Cooperativa', 'Inversor'];
  const ROLE_META = {
    Supervisor:   { icon: '🛡️', color: '#FFB800', sub: 'Acceso completo' },
    'Técnico':    { icon: '🔧', color: '#0EA5E9', sub: 'Operación y mantenimiento' },
    Cooperativa:  { icon: '⚡', color: '#10B981', sub: 'Generación y red' },
    Inversor:     { icon: '📈', color: '#F59E0B', sub: 'Portafolio e inversiones' },
  };
  const meta = ROLE_META[role] || ROLE_META.Supervisor;
  return (
    <div style={{ position: 'relative' }}>
      <button className="btn btn-ghost btn-sm" onClick={() => setOpen(o => !o)} style={{ fontFamily: 'var(--f-body)', padding: '6px 12px', borderRadius: 8 }}>
        <span style={{ fontSize: 14 }}>{meta.icon}</span>
        <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
          <div style={{ fontSize: 9, color: 'var(--text-3)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--f-mono)' }}>Perfil activo</div>
          <div style={{ fontWeight: 600, fontSize: 12, color: meta.color }}>{role}</div>
        </div>
        <Ic.chev />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', right: 0, minWidth: 260,
          background: 'rgba(17,24,39,0.95)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,184,0,0.25)',
          borderRadius: 10,
          padding: 6,
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          zIndex: 10,
        }}>
          <div style={{ padding: '8px 10px 4px', fontSize: 9, color: 'var(--text-3)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--f-mono)' }}>Cambiar de perfil</div>
          {roles.map(r => {
            const m = ROLE_META[r] || {};
            const active = role === r;
            return (
              <button key={r} onClick={() => { setRole(r); setOpen(false); }} style={{
                display: 'flex', width: '100%', padding: '10px 10px',
                alignItems: 'center', gap: 10,
                background: active ? `${m.color}15` : 'transparent',
                border: active ? `1px solid ${m.color}55` : '1px solid transparent',
                borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                fontFamily: 'var(--f-body)',
              }}>
                <span style={{ fontSize: 16 }}>{m.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: active ? m.color : 'var(--text-0)' }}>{r}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{m.sub}</div>
                </div>
                {active && <span style={{ fontSize: 9, color: m.color, fontFamily: 'var(--f-mono)', fontWeight: 700, letterSpacing: '0.08em' }}>ACTIVO</span>}
              </button>
            );
          })}
          {onLogout && (
            <>
              <div style={{ height: 1, background: 'rgba(148,163,184,0.12)', margin: '6px 6px' }} />
              <button onClick={() => { setOpen(false); onLogout(); }} style={{
                display: 'flex', width: '100%', padding: '10px 10px',
                alignItems: 'center', gap: 10,
                background: 'transparent', border: 0, borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                color: '#EF4444', fontSize: 12, fontFamily: 'var(--f-body)', fontWeight: 600,
              }}>
                <span style={{ fontSize: 14 }}>⎋</span> Cerrar sesión
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// DATA — Parks (30 installations across Córdoba)
// ============================================================
const PARKS = [
  { id: 1,  name: 'Lácteos Línea Dorada', city: 'Río Primero',         type: 'Industrial',   kWp: 114, panels: 200, inverter: 'Huawei SUN2000-100KTL', installed: 'Mar 2023', status: 'ok',      genToday: 487.2, efficiency: 94, x: 57, y: 38 },
  { id: 2,  name: 'Agro San Marcos',       city: 'Jesús María',        type: 'Agro',         kWp: 95,  panels: 172, inverter: 'SMA Sunny Tripower',    installed: 'Nov 2022', status: 'alert',   genToday: 289.5, efficiency: 72, x: 48, y: 29 },
  { id: 3,  name: 'Frigorífico del Centro',city: 'Río Cuarto',         type: 'Industrial',   kWp: 220, panels: 400, inverter: 'Huawei SUN2000-215KTL', installed: 'Ago 2024', status: 'ok',      genToday: 1247,  efficiency: 97, x: 32, y: 72 },
  { id: 4,  name: 'Coop. Eléctrica V. María', city: 'Villa María',     type: 'Cooperativa',  kWp: 180, panels: 328, inverter: 'Fronius Symo',          installed: 'Feb 2024', status: 'ok',      genToday: 987,   efficiency: 95, x: 46, y: 58 },
  { id: 5,  name: 'MetalCor Industries',   city: 'Córdoba Capital',    type: 'Industrial',   kWp: 145, panels: 264, inverter: 'Huawei SUN2000-100KTL', installed: 'Jul 2023', status: 'alert',   genToday: 412,   efficiency: 78, x: 42, y: 44 },
  { id: 6,  name: 'Coop. Oncativo',        city: 'Oncativo',           type: 'Cooperativa',  kWp: 90,  panels: 164, inverter: 'Fronius Symo',          installed: 'Oct 2023', status: 'warn',    genToday: 398,   efficiency: 88, x: 48, y: 52 },
  { id: 7,  name: 'Viñedos Traslasierra',  city: 'Villa Dolores',      type: 'Agro',         kWp: 45,  panels: 82,  inverter: 'SMA Sunny Tripower',    installed: 'May 2024', status: 'ok',      genToday: 196,   efficiency: 93, x: 14, y: 58 },
  { id: 8,  name: 'Comunidad Solar CBA',   city: 'Córdoba Capital',    type: 'Comunidad',    kWp: 75,  panels: 136, inverter: 'Huawei SUN2000-50KTL',  installed: 'Ene 2025', status: 'ok',      genToday: 334,   efficiency: 96, x: 41, y: 43 },
  { id: 9,  name: 'Supermercado El Sol',   city: 'Alta Gracia',        type: 'Comercial',    kWp: 38,  panels: 69,  inverter: 'Fronius Primo',         installed: 'Jun 2024', status: 'ok',      genToday: 165,   efficiency: 94, x: 33, y: 52 },
  { id: 10, name: 'Molinos La Estrella',   city: 'Bell Ville',         type: 'Industrial',   kWp: 130, panels: 236, inverter: 'Huawei SUN2000-100KTL', installed: 'Abr 2023', status: 'ok',      genToday: 578,   efficiency: 95, x: 58, y: 65 },
  { id: 11, name: 'Coop. Morteros',        city: 'Morteros',           type: 'Cooperativa',  kWp: 200, panels: 364, inverter: 'SMA Sunny Central',     installed: 'Sep 2022', status: 'ok',      genToday: 890,   efficiency: 96, x: 68, y: 28 },
  { id: 12, name: 'Avícola La Pampa',      city: 'San Francisco',      type: 'Agro',         kWp: 85,  panels: 154, inverter: 'Fronius Symo',          installed: 'Dic 2023', status: 'ok',      genToday: 378,   efficiency: 95, x: 72, y: 35 },
  { id: 13, name: 'TechHub Córdoba',       city: 'Córdoba Capital',    type: 'Comercial',    kWp: 52,  panels: 94,  inverter: 'Huawei SUN2000-50KTL',  installed: 'Mar 2025', status: 'install', genToday: 0,     efficiency: 0,  x: 42, y: 42 },
  { id: 14, name: 'Agro Cañada de Gómez',  city: 'Marcos Juárez',      type: 'Agro',         kWp: 110, panels: 200, inverter: 'SMA Sunny Tripower',    installed: 'Feb 2024', status: 'ok',      genToday: 489,   efficiency: 96, x: 78, y: 62 },
  { id: 15, name: 'Hotel Sierras Hotel',   city: 'La Cumbre',          type: 'Comercial',    kWp: 28,  panels: 51,  inverter: 'Fronius Primo',         installed: 'Ene 2024', status: 'ok',      genToday: 124,   efficiency: 93, x: 28, y: 38 },
  { id: 16, name: 'Coop. Alta Córdoba',    city: 'Córdoba Capital',    type: 'Cooperativa',  kWp: 160, panels: 290, inverter: 'Huawei SUN2000-100KTL', installed: 'Jul 2024', status: 'ok',      genToday: 712,   efficiency: 95, x: 43, y: 41 },
  { id: 17, name: 'Molienda San Jorge',    city: 'General Cabrera',    type: 'Industrial',   kWp: 125, panels: 227, inverter: 'SMA Sunny Tripower',    installed: 'May 2023', status: 'ok',      genToday: 554,   efficiency: 94, x: 38, y: 68 },
  { id: 18, name: 'Coop. Las Varillas',    city: 'Las Varillas',       type: 'Cooperativa',  kWp: 140, panels: 254, inverter: 'Fronius Symo',          installed: 'Ago 2023', status: 'warn',    genToday: 580,   efficiency: 89, x: 62, y: 45 },
  { id: 19, name: 'Envases del Sur',       city: 'Río Cuarto',         type: 'Industrial',   kWp: 98,  panels: 178, inverter: 'Huawei SUN2000-100KTL', installed: 'Oct 2024', status: 'ok',      genToday: 438,   efficiency: 96, x: 33, y: 74 },
  { id: 20, name: 'Frutos del Valle',      city: 'Cruz del Eje',       type: 'Agro',         kWp: 62,  panels: 113, inverter: 'SMA Sunny Tripower',    installed: 'Mar 2024', status: 'ok',      genToday: 278,   efficiency: 94, x: 18, y: 30 },
  { id: 21, name: 'Comunidad Solar Río',   city: 'Río Tercero',        type: 'Comunidad',    kWp: 85,  panels: 155, inverter: 'Huawei SUN2000-50KTL',  installed: 'Nov 2024', status: 'ok',      genToday: 378,   efficiency: 95, x: 42, y: 60 },
  { id: 22, name: 'Curtiembre Central',    city: 'Villa Carlos Paz',   type: 'Industrial',   kWp: 75,  panels: 136, inverter: 'Fronius Symo',          installed: 'Jun 2023', status: 'ok',      genToday: 330,   efficiency: 93, x: 32, y: 46 },
  { id: 23, name: 'Coop. Deán Funes',      city: 'Deán Funes',         type: 'Cooperativa',  kWp: 105, panels: 191, inverter: 'Huawei SUN2000-100KTL', installed: 'Abr 2024', status: 'ok',      genToday: 468,   efficiency: 95, x: 30, y: 18 },
  { id: 24, name: 'Logística Cruz Alta',   city: 'Cruz Alta',          type: 'Industrial',   kWp: 155, panels: 282, inverter: 'SMA Sunny Central',     installed: 'Feb 2023', status: 'ok',      genToday: 688,   efficiency: 94, x: 72, y: 73 },
  { id: 25, name: 'Tambos del Centro',     city: 'Arroyito',           type: 'Agro',         kWp: 88,  panels: 160, inverter: 'Fronius Symo',          installed: 'Sep 2023', status: 'ok',      genToday: 392,   efficiency: 95, x: 56, y: 35 },
  { id: 26, name: 'Pymeco Laboulaye',      city: 'Laboulaye',          type: 'Comercial',    kWp: 42,  panels: 76,  inverter: 'Fronius Primo',         installed: 'Jul 2024', status: 'ok',      genToday: 188,   efficiency: 94, x: 48, y: 86 },
  { id: 27, name: 'Agro Serrezuela',       city: 'Serrezuela',         type: 'Agro',         kWp: 55,  panels: 100, inverter: 'SMA Sunny Tripower',    installed: 'Mar 2024', status: 'ok',      genToday: 245,   efficiency: 94, x: 12, y: 40 },
  { id: 28, name: 'Distrib. La Para',      city: 'La Para',            type: 'Comercial',    kWp: 32,  panels: 58,  inverter: 'Fronius Primo',         installed: 'Nov 2023', status: 'ok',      genToday: 142,   efficiency: 93, x: 52, y: 30 },
  { id: 29, name: 'Coop. Ballesteros',     city: 'Ballesteros',        type: 'Cooperativa',  kWp: 120, panels: 218, inverter: 'Huawei SUN2000-100KTL', installed: 'May 2024', status: 'ok',      genToday: 535,   efficiency: 95, x: 54, y: 67 },
  { id: 30, name: 'Agro El Tío',           city: 'El Tío',             type: 'Agro',         kWp: 70,  panels: 127, inverter: 'SMA Sunny Tripower',    installed: 'Ene 2024', status: 'ok',      genToday: 312,   efficiency: 94, x: 64, y: 32 },
];

const STATUS_META = {
  ok:      { label: 'Operativo',        color: '#10B981', badge: 'ok' },
  warn:    { label: 'Mantenimiento',    color: '#F59E0B', badge: 'warn' },
  alert:   { label: 'Alerta',           color: '#EF4444', badge: 'alert' },
  install: { label: 'En instalación',   color: '#0EA5E9', badge: 'install' },
};

// Totals
const TOTAL_KWP = PARKS.reduce((s, p) => s + p.kWp, 0);
const TOTAL_GEN_TODAY = Math.round(PARKS.reduce((s, p) => s + p.genToday, 0));

Object.assign(window, { Ic, IrisLogo, AISun, Sidebar, Header, NAV_ITEMS, NAV_INVESTOR, PARKS, STATUS_META, TOTAL_KWP, TOTAL_GEN_TODAY });
