/* global React */
// Charts & small visualizations for IRIS Solar Platform

// ============================================================
// Area chart — generation over 24 hours (solar bell curve)
// ============================================================
function AreaChart({
  data,            // [{ x, real, expected }]
  width = 720,
  height = 260,
  showExpected = true,
  showNowMarker = true,
  nowIndex,        // index of "now"
  xLabels,         // array of labels for x axis
  yLabel = 'kWh',
  gradientColor = '#FFB800',
}) {
  const padL = 44, padR = 16, padT = 18, padB = 32;
  const w = width - padL - padR;
  const h = height - padT - padB;
  const maxY = Math.max(...data.map(d => Math.max(d.real || 0, d.expected || 0))) * 1.1 || 1;

  const xAt = (i) => padL + (i / (data.length - 1)) * w;
  const yAt = (v) => padT + h - (v / maxY) * h;

  const pathArea = data.reduce((acc, d, i) => acc + (i === 0 ? `M ${xAt(i)} ${yAt(d.real)}` : ` L ${xAt(i)} ${yAt(d.real)}`), '');
  const fullArea = pathArea + ` L ${xAt(data.length - 1)} ${padT + h} L ${xAt(0)} ${padT + h} Z`;
  const pathExpected = data.reduce((acc, d, i) => acc + (i === 0 ? `M ${xAt(i)} ${yAt(d.expected)}` : ` L ${xAt(i)} ${yAt(d.expected)}`), '');

  const gridLines = 4;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={gradientColor} stopOpacity="0.55" />
          <stop offset="60%" stopColor={gradientColor} stopOpacity="0.15" />
          <stop offset="100%" stopColor={gradientColor} stopOpacity="0" />
        </linearGradient>
        <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Grid */}
      {[...Array(gridLines + 1)].map((_, i) => {
        const y = padT + (i / gridLines) * h;
        const val = maxY - (i / gridLines) * maxY;
        return (
          <g key={i}>
            <line x1={padL} x2={padL + w} y1={y} y2={y} stroke="rgba(148,163,184,0.1)" strokeDasharray="2 4" />
            <text x={padL - 8} y={y + 3} fill="rgba(148,163,184,0.55)" fontSize="10" textAnchor="end" fontFamily="var(--f-mono)">{Math.round(val)}</text>
          </g>
        );
      })}

      {/* Vertical grid (every N points) */}
      {data.map((d, i) => {
        if (i % Math.max(1, Math.floor(data.length / 8)) !== 0) return null;
        return (
          <line key={'v' + i} x1={xAt(i)} x2={xAt(i)} y1={padT} y2={padT + h} stroke="rgba(148,163,184,0.05)" />
        );
      })}

      {/* Filled area */}
      <path d={fullArea} fill="url(#areaGrad)" />

      {/* Expected dashed line */}
      {showExpected && (
        <path d={pathExpected} fill="none" stroke="#0EA5E9" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.85" />
      )}

      {/* Real solid line with glow */}
      <path d={pathArea} fill="none" stroke={gradientColor} strokeWidth="2.2" filter="url(#glow-line)" />

      {/* Now marker */}
      {showNowMarker && nowIndex != null && (
        <g>
          <line x1={xAt(nowIndex)} x2={xAt(nowIndex)} y1={padT} y2={padT + h} stroke="#FFB800" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
          <circle cx={xAt(nowIndex)} cy={yAt(data[nowIndex].real)} r="5" fill="#FFB800" filter="url(#glow-line)">
            <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx={xAt(nowIndex)} cy={yAt(data[nowIndex].real)} r="3" fill="#0A0E1A" />
        </g>
      )}

      {/* X labels */}
      {(xLabels || []).map((lbl, i) => (
        <text key={i} x={padL + (i / (xLabels.length - 1)) * w} y={height - 10}
              fill="rgba(148,163,184,0.7)" fontSize="10" textAnchor="middle" fontFamily="var(--f-mono)">{lbl}</text>
      ))}

      <text x={padL} y={padT - 6} fill="rgba(148,163,184,0.6)" fontSize="10" fontFamily="var(--f-mono)">{yLabel}</text>
    </svg>
  );
}

// ============================================================
// Bar chart — monthly
// ============================================================
function BarChart({
  data, // [{ label, value, current }]
  width = 380, height = 260,
}) {
  const padL = 30, padR = 10, padT = 24, padB = 30;
  const w = width - padL - padR;
  const h = height - padT - padB;
  const maxY = Math.max(...data.map(d => d.value)) * 1.15;
  const barW = w / data.length * 0.6;
  const step = w / data.length;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="barGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFC93D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <filter id="barGlow"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>

      {[...Array(4)].map((_, i) => {
        const y = padT + (i / 3) * h;
        return <line key={i} x1={padL} x2={padL + w} y1={y} y2={y} stroke="rgba(148,163,184,0.08)" strokeDasharray="2 4" />;
      })}

      {data.map((d, i) => {
        const barH = (d.value / maxY) * h;
        const x = padL + i * step + (step - barW) / 2;
        const y = padT + h - barH;
        return (
          <g key={i}>
            {d.current && (
              <rect x={x - 3} y={y - 3} width={barW + 6} height={barH + 6}
                    fill="none" stroke="#FFB800" strokeWidth="1" opacity="0.5" rx="5" />
            )}
            <rect x={x} y={y} width={barW} height={barH} fill="url(#barGrad)" rx="3"
                  style={{ filter: d.current ? 'drop-shadow(0 0 12px rgba(255,184,0,0.55))' : 'none' }} />
            <text x={x + barW / 2} y={y - 6} textAnchor="middle" fill="#FFB800" fontSize="10" fontFamily="var(--f-mono)" fontWeight="600">{d.value}</text>
            <text x={x + barW / 2} y={height - 10} textAnchor="middle" fill="rgba(148,163,184,0.7)" fontSize="10" fontFamily="var(--f-mono)">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ============================================================
// Sparkline
// ============================================================
function Sparkline({ values, width = 100, height = 32, color = '#FFB800', fill = true }) {
  const maxV = Math.max(...values, 1);
  const minV = Math.min(...values, 0);
  const range = maxV - minV || 1;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - ((v - minV) / range) * height * 0.88 - 2;
    return [x, y];
  });
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  const dFill = d + ` L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={`sparkFill-${color.slice(1)}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={dFill} fill={`url(#sparkFill-${color.slice(1)})`} />}
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 4px ${color}88)` }} />
    </svg>
  );
}

// ============================================================
// Circular gauge — efficiency %
// ============================================================
function Gauge({ value = 94, size = 140, label = 'Eficiencia' }) {
  const r = size * 0.38;
  const cx = size / 2, cy = size / 2;
  const start = -Math.PI * 0.75, end = Math.PI * 0.75;
  const total = end - start;
  const angle = start + total * (value / 100);
  const largeArc = value > 50 ? 1 : 0;
  const bgStart = { x: cx + r * Math.cos(start), y: cy + r * Math.sin(start) };
  const bgEnd   = { x: cx + r * Math.cos(end),   y: cy + r * Math.sin(end) };
  const valEnd  = { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="gaugeGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#F59E0B" /><stop offset="100%" stopColor="#FFB800" />
        </linearGradient>
      </defs>
      <path d={`M ${bgStart.x} ${bgStart.y} A ${r} ${r} 0 1 1 ${bgEnd.x} ${bgEnd.y}`}
            fill="none" stroke="rgba(148,163,184,0.14)" strokeWidth="8" strokeLinecap="round" />
      <path d={`M ${bgStart.x} ${bgStart.y} A ${r} ${r} 0 ${largeArc} 1 ${valEnd.x} ${valEnd.y}`}
            fill="none" stroke="url(#gaugeGrad)" strokeWidth="8" strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 6px rgba(255,184,0,0.6))' }} />
      <text x={cx} y={cy + 2} textAnchor="middle" fill="#FFB800" fontSize={size * 0.26} fontFamily="var(--f-display)" fontWeight="700"
            style={{ filter: 'drop-shadow(0 0 10px rgba(255,184,0,0.5))' }}>{value}%</text>
      <text x={cx} y={cy + size * 0.22} textAnchor="middle" fill="rgba(148,163,184,0.7)" fontSize="9" fontFamily="var(--f-body)" letterSpacing="2">{label.toUpperCase()}</text>
    </svg>
  );
}

// ============================================================
// Mini solar curve (for side panel)
// ============================================================
function SolarCurveMini({ width = 320, height = 80 }) {
  const pts = [];
  for (let h = 6; h <= 20; h++) {
    const v = Math.max(0, Math.sin(((h - 6) / 14) * Math.PI)) * 100;
    pts.push({ x: h, real: v + (Math.random() * 8 - 4) });
  }
  const padL = 20, padR = 10, padT = 6, padB = 16;
  const w = width - padL - padR;
  const hpx = height - padT - padB;
  const xAt = (i) => padL + (i / (pts.length - 1)) * w;
  const yAt = (v) => padT + hpx - (v / 110) * hpx;
  const d = pts.reduce((acc, p, i) => acc + (i === 0 ? `M ${xAt(i)} ${yAt(p.real)}` : ` L ${xAt(i)} ${yAt(p.real)}`), '');
  const fillD = d + ` L ${xAt(pts.length - 1)} ${padT + hpx} L ${xAt(0)} ${padT + hpx} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="miniArea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFB800" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill="url(#miniArea)" />
      <path d={d} fill="none" stroke="#FFB800" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 3px rgba(255,184,0,0.6))' }} />
      <text x={padL} y={height - 4} fill="rgba(148,163,184,0.6)" fontSize="9" fontFamily="var(--f-mono)">06h</text>
      <text x={padL + w / 2} y={height - 4} textAnchor="middle" fill="rgba(148,163,184,0.6)" fontSize="9" fontFamily="var(--f-mono)">13h</text>
      <text x={padL + w} y={height - 4} textAnchor="end" fill="rgba(148,163,184,0.6)" fontSize="9" fontFamily="var(--f-mono)">20h</text>
    </svg>
  );
}

// ============================================================
// Helper: generate 24h solar data
// ============================================================
function gen24hData(nowHour = 14) {
  const data = [];
  const labels = [];
  for (let h = 0; h < 24; h++) {
    const base = h >= 6 && h <= 20 ? Math.sin(((h - 6) / 14) * Math.PI) * 420 : 0;
    const real = Math.max(0, base * (0.88 + Math.random() * 0.2));
    const expected = Math.max(0, base);
    data.push({ x: h, real, expected });
    if (h % 3 === 0) labels.push(`${String(h).padStart(2, '0')}:00`);
  }
  return { data, labels, nowIndex: nowHour };
}

Object.assign(window, { AreaChart, BarChart, Sparkline, Gauge, SolarCurveMini, gen24hData });
