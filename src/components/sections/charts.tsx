"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Gauge,
  Radar as RadarIcon,
  Grid3x3,
  ScatterChart as ScatterIcon,
  PieChart as PieIcon,
  Filter,
} from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import {
  hypotheses,
  constructs,
  findConstruct,
  dimensionsMeta,
  companies,
  correlationMatrix,
  type Dimension,
} from "@/lib/research-data";
import { useState, useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
  LabelList,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const dimensionColors: Record<Dimension, string> = {
  technology: "var(--chart-1)",
  organization: "var(--chart-2)",
  environment: "var(--chart-3)",
  cost: "var(--chart-4)",
};

export function ChartsSection() {
  const { t, lang } = useI18n();
  const [dimensionFilter, setDimensionFilter] = useState<Dimension | "all">("all");

  const filteredHypotheses = useMemo(() => {
    if (dimensionFilter === "all") return hypotheses;
    return hypotheses.filter((h) => {
      const c = findConstruct(h.fromId);
      return c?.dimension === dimensionFilter;
    });
  }, [dimensionFilter]);

  // Bar chart data: Path Coefficients
  const barData = filteredHypotheses.map((h) => {
    const from = findConstruct(h.fromId);
    return {
      name: h.id,
      labelAr: `${from?.name.ar} → AIG`,
      labelEn: `${from?.name.en} → AIG`,
      beta: h.beta,
      t: h.t,
      p: h.p,
      direction: h.direction,
      color:
        h.direction === "positive" ? "var(--emerald-accent)" : "var(--destructive)",
      dimension: from?.dimension || "technology",
    };
  });

  // Radar data: TOE-C dimensions average effect
  const radarData = useMemo(() => {
    const dims: Dimension[] = ["technology", "organization", "environment", "cost"];
    return dims.map((dim) => {
      const hyps = hypotheses.filter((h) => {
        const c = findConstruct(h.fromId);
        return c?.dimension === dim;
      });
      const avgBeta =
        hyps.reduce((s, h) => s + Math.abs(h.beta), 0) / hyps.length;
      const avgT = hyps.reduce((s, h) => s + h.t, 0) / hyps.length;
      return {
        dimension: dimensionsMeta[dim].labelEn,
        dimensionAr: dimensionsMeta[dim].labelAr,
        avgBeta: Number(avgBeta.toFixed(3)),
        avgT: Number(avgT.toFixed(2)),
      };
    });
  }, []);

  // Heatmap correlation matrix data
  const heatmapCells = useMemo(() => {
    const cells: { x: number; y: number; value: number; label: string }[] = [];
    for (let i = 0; i < correlationMatrix.values.length; i++) {
      for (let j = 0; j < correlationMatrix.values[i].length; j++) {
        const v = correlationMatrix.values[i][j];
        cells.push({
          x: j,
          y: i,
          value: v,
          label: `${correlationMatrix.fullLabels[i]} ↔ ${correlationMatrix.fullLabels[j]}: ${v.toFixed(3)}`,
        });
      }
    }
    return cells;
  }, []);

  // Pie data: companies (just count = 1 each, showing distribution)
  const pieData = companies.map((c, i) => ({
    name: lang === "ar" ? c.ar : c.en,
    value: 1,
    color: `hsl(${(i * 36) % 360}, 70%, 55%)`,
  }));

  // Scatter data: |beta| vs T-statistic
  const scatterData = hypotheses.map((h) => {
    const from = findConstruct(h.fromId);
    return {
      x: Math.abs(h.beta),
      y: h.t,
      z: 1,
      name: h.id,
      labelAr: from?.name.ar || "",
      labelEn: from?.name.en || "",
      p: h.p,
      direction: h.direction,
    };
  });

  const formatP = (p: number) =>
    p < 0.001 ? "p < 0.001" : `p = ${p.toFixed(3)}`;

  const renderTooltip = (active: any, payload: any) => {
    if (!active || !payload || !payload.length) return null;
    const d = payload[0].payload;
    return (
      <div className="glass-strong rounded-lg p-3 text-xs border border-[var(--gold)]/20 max-w-xs">
        <div className="font-bold mb-1">{d.labelAr || d.name || d.dimension}</div>
        {d.labelEn && <div className="text-muted-foreground mb-1">{d.labelEn}</div>}
        {d.beta !== undefined && (
          <div>β = <span className="font-bold">{d.beta.toFixed(3)}</span></div>
        )}
        {d.t !== undefined && (
          <div>T = <span className="font-bold">{d.t.toFixed(3)}</span></div>
        )}
        {d.p !== undefined && <div>{formatP(d.p)}</div>}
        {d.avgBeta !== undefined && (
          <div>
            {t("متوسط |β|", "Avg |β|")}: <span className="font-bold">{d.avgBeta}</span>
          </div>
        )}
        {d.avgT !== undefined && (
          <div>
            {t("متوسط T", "Avg T")}: <span className="font-bold">{d.avgT}</span>
          </div>
        )}
        {d.value !== undefined && d.label && <div>{d.label}</div>}
      </div>
    );
  };

  return (
    <section id="charts" className="section-anchor py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-3">
            <BarChart3 className="w-4 h-4 text-[var(--gold)]" />
            <span className="text-xs font-medium">
              {t("الرسوم البيانية التفاعلية", "Interactive Charts")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t("استكشاف النتائج بصرياً", "Explore Results Visually")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "ستة أنواع من الرسوم البيانية التفاعلية تعرض نتائج نموذج PLS-SEM. مرّر مؤشر الفأرة فوق العناصر لرؤية التفاصيل، واستخدم الفلاتر للتركيز على بُعد معين.",
              "Six interactive chart types displaying PLS-SEM model results. Hover over elements for details, and use filters to focus on a specific dimension."
            )}
          </p>
        </motion.div>

        {/* Dimension filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Filter className="w-4 h-4" />
            {t("تصفية حسب البُعد:", "Filter by dimension:")}
          </span>
          <ToggleGroup
            type="single"
            value={dimensionFilter}
            onValueChange={(v) => v && setDimensionFilter(v as Dimension | "all")}
            className="glass rounded-lg p-1"
          >
            <ToggleGroupItem value="all" className="text-xs">
              {t("الكل", "All")}
            </ToggleGroupItem>
            <ToggleGroupItem value="technology" className="text-xs">
              {t("تقني", "Tech")}
            </ToggleGroupItem>
            <ToggleGroupItem value="organization" className="text-xs">
              {t("تنظيمي", "Org")}
            </ToggleGroupItem>
            <ToggleGroupItem value="environment" className="text-xs">
              {t("بيئي", "Env")}
            </ToggleGroupItem>
            <ToggleGroupItem value="cost" className="text-xs">
              {t("تكلفة", "Cost")}
            </ToggleGroupItem>
          </ToggleGroup>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 1. Bar Chart: Path Coefficients */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="w-5 h-5 text-[var(--gold)]" />
                {t(
                  "معاملات المسار (β) للفرضيات",
                  "Path Coefficients (β) for Hypotheses"
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={340}>
                <BarChart data={barData} margin={{ top: 20, right: 20, bottom: 60, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    angle={-30}
                    textAnchor="end"
                    height={50}
                  />
                  <YAxis
                    domain={[-0.3, 0.3]}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    label={{
                      value: "β",
                      angle: -90,
                      position: "insideLeft",
                      style: { fill: "var(--muted-foreground)" },
                    }}
                  />
                  <Tooltip content={({ active, payload }: any) => renderTooltip(active, payload)} />
                  <ReferenceLine y={0} stroke="var(--foreground)" strokeWidth={1} />
                  <Bar dataKey="beta" radius={[6, 6, 0, 0]}>
                    {barData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                    <LabelList
                      dataKey="beta"
                      position="top"
                      formatter={(v: number) => v.toFixed(3)}
                      style={{ fill: "var(--foreground)", fontSize: 11, fontWeight: 600 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 2. Gauge Chart: R² */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Gauge className="w-5 h-5 text-[var(--gold)]" />
                {t(
                  "مقياس R² للمتغير التابع",
                  "Gauge: R² for Dependent Variable"
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-[340px]">
                <GaugeChart value={0.835} label="R²" max={1} />
                <div className="mt-4 text-center">
                  <div className="text-3xl font-bold text-[var(--gold)]">0.835</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {t(
                      "قوة تفسيرية كبيرة (83.5%)",
                      "Large explanatory power (83.5%)"
                    )}
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                    <div className="glass rounded-lg p-2">
                      <div className="font-bold text-[var(--emerald-accent)]">0.19</div>
                      <div className="text-muted-foreground">{t("ضعيف", "Weak")}</div>
                    </div>
                    <div className="glass rounded-lg p-2">
                      <div className="font-bold text-[var(--chart-3)]">0.33</div>
                      <div className="text-muted-foreground">{t("متوسط", "Moderate")}</div>
                    </div>
                    <div className="glass rounded-lg p-2 ring-1 ring-[var(--gold)]/40">
                      <div className="font-bold text-[var(--gold)]">0.67</div>
                      <div className="text-muted-foreground">{t("كبير", "Substantial")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Radar Chart: TOE-C dimensions */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <RadarIcon className="w-5 h-5 text-[var(--gold)]" />
                {t(
                  "مقارنة أبعاد TOE-C الأربعة",
                  "Comparison of 4 TOE-C Dimensions"
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={340}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis
                    dataKey={lang === "ar" ? "dimensionAr" : "dimension"}
                    tick={{ fill: "var(--foreground)", fontSize: 11 }}
                  />
                  <PolarRadiusAxis
                    domain={[0, 0.25]}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                  />
                  <Radar
                    name={t("متوسط |β|", "Avg |β|")}
                    dataKey="avgBeta"
                    stroke="var(--gold)"
                    fill="var(--gold)"
                    fillOpacity={0.4}
                    strokeWidth={2}
                  />
                  <Tooltip content={({ active, payload }: any) => renderTooltip(active, payload)} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 4. Heatmap: Correlation Matrix */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Grid3x3 className="w-5 h-5 text-[var(--gold)]" />
                {t(
                  "مصفوفة الارتباط بين المتغيرات",
                  "Correlation Matrix Between Variables"
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Heatmap
                data={heatmapCells}
                rows={correlationMatrix.values.length}
                cols={correlationMatrix.fullLabels.length}
                rowLabels={correlationMatrix.fullLabels.map((l) =>
                  l.length > 18 ? l.slice(0, 16) + "…" : l
                )}
                colLabels={correlationMatrix.fullLabels.map((l) =>
                  l.length > 10 ? l.slice(0, 8) + "…" : l
                )}
              />
            </CardContent>
          </Card>

          {/* 5. Scatter Plot: |beta| vs T */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ScatterIcon className="w-5 h-5 text-[var(--gold)]" />
                {t(
                  "|β| مقابل T (قوة الأثر والدلالة)",
                  "|β| vs T-statistic (Effect & Significance)"
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={340}>
                <ScatterChart margin={{ top: 20, right: 30, bottom: 30, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="|β|"
                    domain={[0, 0.3]}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                    label={{
                      value: "|β|",
                      position: "insideBottom",
                      offset: -10,
                      style: { fill: "var(--muted-foreground)", fontSize: 12 },
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="T"
                    domain={[0, 5]}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                    label={{
                      value: "T-statistic",
                      angle: -90,
                      position: "insideLeft",
                      style: { fill: "var(--muted-foreground)", fontSize: 12 },
                    }}
                  />
                  <ZAxis type="number" dataKey="z" range={[200, 200]} />
                  <Tooltip content={({ active, payload }: any) => renderTooltip(active, payload)} cursor={{ strokeDasharray: "3 3" }} />
                  <ReferenceLine y={1.96} stroke="var(--destructive)" strokeDasharray="4 4">
                  </ReferenceLine>
                  <Scatter data={scatterData} fill="var(--gold)">
                    {scatterData.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={
                          entry.direction === "positive"
                            ? "var(--emerald-accent)"
                            : "var(--destructive)"
                        }
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
              <div className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-[var(--emerald-accent)]" />
                  {t("إيجابي", "Positive")}
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-[var(--destructive)]" />
                  {t("سلبي", "Negative")}
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-4 h-0.5 bg-[var(--destructive)]" style={{ borderTop: "2px dashed" }} />
                  {t("T = 1.96", "T = 1.96")}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* 6. Pie/Donut Chart: Companies distribution */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <PieIcon className="w-5 h-5 text-[var(--gold)]" />
                {t(
                  "الشركات المشاركة في الدراسة",
                  "Companies Participating in Study"
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={340}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={110}
                    innerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    labelStyle={{ color: "var(--foreground)" }}
                  />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    wrapperStyle={{ fontSize: 10, color: "var(--muted-foreground)", maxWidth: 130 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// === Custom Gauge Chart (SVG) ===
function GaugeChart({
  value,
  label,
  max = 1,
}: {
  value: number;
  label: string;
  max?: number;
}) {
  const pct = value / max;
  const angle = -120 + pct * 240; // -120 to 120 degrees
  const radius = 90;
  const cx = 120;
  const cy = 130;

  const startAngle = -120;
  const endAngle = 120;
  const segments = [
    { from: 0, to: 0.19, color: "var(--chart-1)" },
    { from: 0.19, to: 0.33, color: "var(--chart-3)" },
    { from: 0.33, to: 0.67, color: "var(--emerald-accent)" },
    { from: 0.67, to: 1, color: "var(--gold)" },
  ];

  const polarToCartesian = (cx: number, cy: number, r: number, deg: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const arcPath = (start: number, end: number, r: number) => {
    const startPt = polarToCartesian(cx, cy, r, end);
    const endPt = polarToCartesian(cx, cy, r, start);
    const largeArc = end - start <= 180 ? 0 : 1;
    return `M ${startPt.x} ${startPt.y} A ${r} ${r} 0 ${largeArc} 0 ${endPt.x} ${endPt.y}`;
  };

  return (
    <svg viewBox="0 0 240 180" className="w-full max-w-xs">
      {segments.map((seg, i) => {
        const segStart = startAngle + seg.from * (endAngle - startAngle);
        const segEnd = startAngle + seg.to * (endAngle - startAngle);
        return (
          <path
            key={i}
            d={arcPath(segStart, segEnd, radius)}
            stroke={seg.color}
            strokeWidth={18}
            fill="none"
            strokeLinecap="butt"
            opacity={0.85}
          />
        );
      })}
      {/* Needle */}
      <line
        x1={cx}
        y1={cy}
        x2={polarToCartesian(cx, cy, radius - 10, angle).x}
        y2={polarToCartesian(cx, cy, radius - 10, angle).y}
        stroke="var(--foreground)"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={8} fill="var(--foreground)" />
      <text
        x={cx}
        y={cy + 40}
        textAnchor="middle"
        className="fill-current text-foreground"
        style={{ fontSize: 12, fill: "var(--muted-foreground)" }}
      >
        {label}
      </text>
    </svg>
  );
}

// === Custom Heatmap (SVG) ===
function Heatmap({
  data,
  rows,
  cols,
  rowLabels,
  colLabels,
}: {
  data: { x: number; y: number; value: number; label: string }[];
  rows: number;
  cols: number;
  rowLabels: string[];
  colLabels: string[];
}) {
  const cellSize = 28;
  const labelWidth = 130;
  const labelHeight = 50;
  const width = labelWidth + cols * cellSize + 20;
  const height = labelHeight + rows * cellSize + 20;

  const getColor = (v: number) => {
    // Diverging color: 0 = transparent, 1 = gold
    if (v >= 0.99) return "var(--gold)";
    const intensity = Math.min(Math.abs(v), 1);
    const hue = v > 0.7 ? 80 : v > 0.4 ? 60 : 220;
    return `hsla(${hue}, 65%, ${30 + intensity * 35}%, ${0.3 + intensity * 0.7})`;
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[600px]">
        {/* Column labels */}
        {colLabels.map((label, i) => (
          <text
            key={i}
            x={labelWidth + i * cellSize + cellSize / 2}
            y={labelHeight - 10}
            textAnchor="end"
            transform={`rotate(-40 ${labelWidth + i * cellSize + cellSize / 2} ${labelHeight - 10})`}
            style={{ fontSize: 9, fill: "var(--muted-foreground)" }}
          >
            {label}
          </text>
        ))}
        {/* Row labels */}
        {rowLabels.map((label, i) => (
          <text
            key={i}
            x={labelWidth - 8}
            y={labelHeight + i * cellSize + cellSize / 2 + 3}
            textAnchor="end"
            style={{ fontSize: 9, fill: "var(--muted-foreground)" }}
          >
            {label}
          </text>
        ))}
        {/* Cells */}
        {data.map((cell, i) => (
          <g key={i}>
            <rect
              x={labelWidth + cell.x * cellSize}
              y={labelHeight + cell.y * cellSize}
              width={cellSize - 1}
              height={cellSize - 1}
              fill={getColor(cell.value)}
              stroke="var(--border)"
              strokeWidth={0.3}
              rx={2}
            >
              <title>{cell.label}</title>
            </rect>
            {cell.value >= 0.99 && (
              <text
                x={labelWidth + cell.x * cellSize + cellSize / 2}
                y={labelHeight + cell.y * cellSize + cellSize / 2 + 3}
                textAnchor="middle"
                style={{ fontSize: 8, fill: "white", fontWeight: "bold" }}
              >
                1.0
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
