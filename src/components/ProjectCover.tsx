type ProjectCoverProps = { id: string; number: string };

/** Original abstract project diagrams, not screenshots or performance charts. */
export default function ProjectCover({ id, number }: ProjectCoverProps) {
  return (
    <div className={`project-cover cover-${id}`} aria-hidden="true">
      <span className="cover-index mono">STUDY / {number}</span>
      <svg viewBox="0 0 420 240" fill="none" focusable="false">
        {id === "git-guardian" ? <>
          <path className="cover-trace" d="M210 64V108M210 108H82V165M210 108H166V165M210 108H254V165M210 108H338V165" stroke="currentColor" strokeWidth="1.5" />
          <path d="m210 21 29 17v34l-29 17-29-17V38Z" stroke="currentColor" fill="currentColor" fillOpacity=".08" />
          <path d="m201 53 6 6 13-14" stroke="currentColor" strokeWidth="2" />
          {[82, 166, 254, 338].map((x, i) => <g key={x}><rect x={x - 26} y="165" width="52" height="44" rx="2" stroke="currentColor" /><text x={x} y="192" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="monospace">0{i + 1}</text></g>)}
        </> : id === "churn" ? <>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => <ellipse key={i} cx="210" cy="125" rx={38 + i * 17} ry={18 + i * 12} transform={`rotate(${i * 8 - 24} 210 125)`} stroke="currentColor" strokeOpacity={.2 + i * .1} />)}
          <path className="cover-trace" d="M65 175 128 145 174 155 234 93 285 109 355 55" stroke="currentColor" strokeWidth="2" />
          {[ [128, 145], [174,155], [234,93], [285,109] ].map(([x,y]) => <circle key={x} cx={x} cy={y} r="5" fill="currentColor" />)}
        </> : <>
          {Array.from({ length: 37 }, (_, i) => { const height = 12 + Math.abs(Math.sin(i * .48) * Math.cos(i * .17)) * 130; return <line className="wave-bar" style={{ animationDelay: `${i * -100}ms` }} key={i} x1={30 + i * 10} x2={30 + i * 10} y1={120 - height / 2} y2={120 + height / 2} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />; })}
          <path d="M30 199H390M30 41H390" stroke="currentColor" strokeOpacity=".25" />
        </>}
      </svg>
      <span className="cover-caption mono">{id === "git-guardian" ? "PARALLEL THINKING" : id === "churn" ? "PATTERNS → PREDICTIONS" : "A CONVERSATION, REMEMBERED"}</span>
    </div>
  );
}
