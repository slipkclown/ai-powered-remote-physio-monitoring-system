import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";

interface RecoveryCompassProps {
  movementQuality: number;
  confidence: number;
  adherence: number;
  reflection: number;
  painCheck: number;
  overallProgress: number;
  onNavigate?: (page: string) => void;
}

const MAX = 100;

export function RecoveryCompass({
  movementQuality, confidence, adherence, reflection, painCheck, overallProgress, onNavigate,
}: RecoveryCompassProps) {
  const data = [
    { axis: "Movement", value: movementQuality },
    { axis: "Confidence", value: confidence },
    { axis: "Adherence", value: adherence },
    { axis: "Reflection", value: reflection },
    { axis: "Comfort", value: 100 - painCheck },
    { axis: "Progress", value: overallProgress },
  ];

  const overall = Math.round((movementQuality + confidence + adherence + reflection + (100 - painCheck) + overallProgress) / 6);

  const statusColor = overall >= 75 ? "#EDE7D3" : overall >= 55 ? "#b07c5a" : "#b94040";
  const statusLabel = overall >= 75 ? "On Track" : overall >= 55 ? "Needs Attention" : "Review Recommended";
  const statusEmoji = overall >= 75 ? "🟢" : overall >= 55 ? "🟡" : "🔴";

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-foreground font-semibold">Recovery Compass</h3>
        <span className="text-muted-foreground text-xs">Holistic recovery overview</span>
      </div>
      <p className="text-muted-foreground text-xs mb-4">Combines movement, confidence, adherence, reflection, and comfort into one picture.</p>

      <div className="flex items-center gap-6">
        {/* Radar */}
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke="rgba(46,44,38,0.12)" />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 10, fill: "#6b6860" }} />
              <Tooltip
                contentStyle={{ background: "#F5EED6", border: "1px solid rgba(46,44,38,0.15)", borderRadius: 10, fontSize: 11 }}
                formatter={(v: number) => [`${v}%`, ""]}
              />
              <Radar dataKey="value" stroke="#305066" fill="#EDE7D3" fillOpacity={0.35} strokeWidth={2} dot={{ r: 3, fill: "#305066" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Score + breakdown */}
        <div className="w-44 flex-shrink-0">
          <div className="text-center mb-4">
            <div className="text-4xl font-extrabold text-foreground leading-none">{overall}</div>
            <div className="text-muted-foreground text-xs mt-1">Recovery Score</div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: `${statusColor}18`, color: statusColor }}>
              {statusEmoji} {statusLabel}
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: "Movement", value: movementQuality, page: "monitor" },
              { label: "Confidence", value: confidence, page: "confidence" },
              { label: "Adherence", value: adherence, page: "progress-history" },
              { label: "Reflection", value: reflection, page: "journal" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-0.5">
                  <button
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => onNavigate?.(item.page)}
                  >
                    {item.label}
                  </button>
                  <span className="text-foreground font-medium">{item.value}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
