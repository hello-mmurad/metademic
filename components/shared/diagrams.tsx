import type { ResearchArea } from "@/types/content";

const MONO = { fontFamily: "var(--font-mono), ui-monospace, monospace" } as const;

export function CoordinationDiagram({ dark = false }: { dark?: boolean }) {
  const stroke = dark ? "rgba(143,214,205,0.5)" : "#DED9BD";
  const label = dark ? "rgba(255,253,236,0.6)" : "#66736E";
  const dash = dark ? "rgba(143,214,205,0.45)" : "rgba(15,118,110,0.45)";
  const nodes = [
    { x: 100, y: 42, l: "node-01" }, { x: 385, y: 55, l: "node-02" },
    { x: 452, y: 178, l: "node-03" }, { x: 335, y: 272, l: "node-04" },
    { x: 118, y: 264, l: "node-05" }, { x: 50, y: 152, l: "node-06" }
  ];
  return (
    <svg viewBox="0 0 520 320" role="img" aria-label="Schematic of a RACoN coordination network: one coordinator connected to six compute nodes" className="h-auto w-full">
      {nodes.map(n => (
        <line key={n.l} x1="255" y1="158" x2={n.x} y2={n.y} stroke={dash} strokeDasharray="3 5" />
      ))}
      <circle cx="255" cy="158" r="38" fill="none" stroke="rgba(15,118,110,0.35)" />
      <circle cx="255" cy="158" r="30" fill="#0F766E" />
      <text x="255" y="162" textAnchor="middle" fontSize="10" fill="#fff" style={MONO}>coord</text>
      {nodes.map(n => (
        <g key={n.l}>
          <rect x={n.x - 23} y={n.y - 16} width="46" height="32" rx="6" fill={dark ? "#16302B" : "#FFFEF7"} stroke={stroke} />
          <circle cx={n.x - 13} cy={n.y - 5} r="2.6" fill="#0F766E" />
          <rect x={n.x - 5} y={n.y - 7} width="18" height="3" rx="1.5" fill={dark ? "rgba(255,253,236,0.25)" : "#EEE9D9"} />
          <rect x={n.x - 5} y={n.y} width="12" height="3" rx="1.5" fill={dark ? "rgba(255,253,236,0.18)" : "#EEE9D9"} />
          <text x={n.x} y={n.y + 31} textAnchor="middle" fontSize="9" fill={label} style={MONO}>{n.l}</text>
        </g>
      ))}
      <text x="255" y="214" textAnchor="middle" fontSize="9" fill={dash} style={MONO}>resource-aware scheduling</text>
    </svg>
  );
}

export function AreaDiagram({ kind }: { kind: ResearchArea["diagram"] }) {
  const s = "#0F766E";
  const f = "#DED9BD";
  const common = "h-24 w-full";
  switch (kind) {
    case "network":
      return (
        <svg viewBox="0 0 200 88" className={common} aria-hidden="true">
          <path d="M40 24 100 44 160 24M40 64 100 44 160 64M40 24 40 64M160 24 160 64" stroke={f} fill="none" />
          {[[40,24],[100,44],[160,24],[40,64],[160,64]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="5.5" fill={i===2?s:"#FFFEF7"} stroke={s} strokeWidth="1.5" />)}
        </svg>
      );
    case "control":
      return (
        <svg viewBox="0 0 200 88" className={common} aria-hidden="true">
          <rect x="72" y="30" width="56" height="28" rx="5" fill="#FFFEF7" stroke={s} strokeWidth="1.5" />
          <text x="100" y="47" textAnchor="middle" fontSize="9" fill="#1A2421" style={MONO}>plant</text>
          <path d="M72 44H30v-24h42M128 44h42v24h-42" stroke={s} strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
          <path d="M72 20l6-4-6-4M128 68l-6 4 6 4" stroke={s} strokeWidth="1.5" fill="none" />
        </svg>
      );
    case "ml":
      return (
        <svg viewBox="0 0 200 88" className={common} aria-hidden="true">
          {[[30,20],[30,44],[30,68],[170,32],[170,56]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5" fill={i===4?s:"#FFFEF7"} stroke={s} strokeWidth="1.5" />)}
          {[[100,24],[100,44],[100,64]].map(([x,y],i)=><circle key={`h${i}`} cx={x} cy={y} r="5" fill="#FFFEF7" stroke={s} strokeWidth="1.5" />)}
          <path d="M35 22 95 25M35 44h60M35 66l60-20M105 25l60 8M105 44l60 11M105 63l60-6" stroke={f} fill="none" />
        </svg>
      );
    case "automotive":
      return (
        <svg viewBox="0 0 200 88" className={common} aria-hidden="true">
          <path d="M20 70c40-24 120 24 160-14" stroke={f} strokeDasharray="4 5" fill="none" />
          <rect x="70" y="34" width="60" height="20" rx="9" fill="#FFFEF7" stroke={s} strokeWidth="1.5" />
          <circle cx="86" cy="56" r="6" fill="#FFFEF7" stroke={s} strokeWidth="1.5" />
          <circle cx="114" cy="56" r="6" fill="#FFFEF7" stroke={s} strokeWidth="1.5" />
          <circle cx="150" cy="42" r="3" fill={s} />
        </svg>
      );
    case "trust":
      return (
        <svg viewBox="0 0 200 88" className={common} aria-hidden="true">
          <path d="M100 12l30 12v24c0 18-13 26-30 32-17-6-30-14-30-32V24z" fill="#FFFEF7" stroke={s} strokeWidth="1.5" />
          <path d="M87 44l9 9 17-19" stroke={s} strokeWidth="2" fill="none" />
          <path d="M138 30h34M138 44h26M138 58h30" stroke={f} strokeWidth="1.5" />
        </svg>
      );
  }
}