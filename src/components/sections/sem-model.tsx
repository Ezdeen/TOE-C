"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useI18n } from "@/lib/i18n-context";
import {
  constructs,
  hypotheses,
  findConstruct,
  dimensionsMeta,
  type Construct,
} from "@/lib/research-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Network, ArrowRight, Info } from "lucide-react";

export function SEMSection() {
  const { t, lang, dir } = useI18n();
  const [selectedVar, setSelectedVar] = useState<Construct | null>(null);
  const [selectedHyp, setSelectedHyp] = useState<
    (typeof hypotheses)[0] | null
  >(null);

  // Layout: 4 IV groups on left (2x2 grid), DV on right
  // But we'll arrange as: IVs spread across top, DV in center, recommendations at bottom
  const ivConstructs = constructs.filter((c) => !c.isDependent);
  const dvConstruct = constructs.find((c) => c.isDependent)!;

  // Group IVs by dimension
  const byDimension = {
    technology: ivConstructs.filter((c) => c.dimension === "technology"),
    organization: ivConstructs.filter((c) => c.dimension === "organization"),
    environment: ivConstructs.filter((c) => c.dimension === "environment"),
    cost: ivConstructs.filter((c) => c.dimension === "cost"),
  };

  const dimensionOrder: (keyof typeof byDimension)[] = [
    "technology",
    "organization",
    "environment",
    "cost",
  ];

  // Layout positions (percentages in viewBox 0-100)
  // Each IV is positioned in 4 rows (one per dimension)
  const ivPositions: Record<string, { x: number; y: number }> = {};
  dimensionOrder.forEach((dim, dimIdx) => {
    byDimension[dim].forEach((c, i) => {
      const totalInDim = byDimension[dim].length;
      const spacing = 100 / (totalInDim + 1);
      ivPositions[c.id] = {
        x: spacing * (i + 1),
        y: 12 + dimIdx * 18,
      };
    });
  });

  // DV position (right side)
  const dvPos = { x: 50, y: 90 };

  return (
    <section id="sem" className="section-anchor py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-3">
            <Network className="w-4 h-4 text-[var(--gold)]" />
            <span className="text-xs font-medium">
              {t("النموذج الهيكلي التفاعلي", "Interactive Structural Model")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t(
              "نموذج SmartPLS للمعادلات الهيكلية",
              "SmartPLS Structural Equation Model"
            )}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "انقر على أي متغير لعرض مؤشراته وقيم الأحمال الخارجية وAVE وكرونباخ ألفا. انقر على أي سهم لعرض إحصائية t وقيمة p وحالة الفرضية.",
              "Click any variable to view its indicators, outer loadings, AVE, and Cronbach's Alpha. Click any arrow to view t-statistic, p-value, and hypothesis status."
            )}
          </p>
        </motion.div>

        <Card className="glass overflow-hidden">
          <CardContent className="p-4">
            <div className="w-full overflow-x-auto">
              <svg
                viewBox="0 0 100 115"
                className="w-full min-w-[700px]"
                style={{ maxHeight: "640px" }}
              >
                {/* Definitions */}
                <defs>
                  {/* Arrow markers */}
                  <marker
                    id="arrow-pos"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--emerald-accent)" />
                  </marker>
                  <marker
                    id="arrow-neg"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--destructive)" />
                  </marker>
                  <marker
                    id="arrow-selected"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--gold)" />
                  </marker>
                </defs>

                {/* Dimension group background bands */}
                {dimensionOrder.map((dim, dimIdx) => {
                  const meta = dimensionsMeta[dim];
                  const yPos = 5 + dimIdx * 18;
                  return (
                    <g key={dim}>
                      <rect
                        x="0"
                        y={yPos}
                        width="100"
                        height="16"
                        fill={meta.color}
                        opacity={0.08}
                        rx={2}
                      />
                      <text
                        x={lang === "ar" ? 98 : 2}
                        y={yPos + 4}
                        textAnchor={lang === "ar" ? "end" : "start"}
                        style={{ fontSize: 2.4, fill: meta.color, fontWeight: "bold" }}
                      >
                        {lang === "ar" ? meta.labelAr : meta.labelEn}
                      </text>
                    </g>
                  );
                })}

                {/* Arrows: from each IV to DV */}
                {hypotheses.map((h) => {
                  const fromPos = ivPositions[h.fromId];
                  const toPos = dvPos;
                  if (!fromPos) return null;

                  // Adjust endpoints so arrow doesn't go inside circle
                  const dx = toPos.x - fromPos.x;
                  const dy = toPos.y - fromPos.y;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  const r1 = 5;
                  const r2 = 4;
                  const startX = fromPos.x + (dx / dist) * r1;
                  const startY = fromPos.y + (dy / dist) * r1;
                  const endX = toPos.x - (dx / dist) * r2;
                  const endY = toPos.y - (dy / dist) * r2;

                  // Mid point for label
                  const midX = (startX + endX) / 2;
                  const midY = (startY + endY) / 2;

                  const isSelected = selectedHyp?.id === h.id;
                  const color =
                    isSelected ? "var(--gold)" :
                    h.direction === "positive"
                      ? "var(--emerald-accent)"
                      : "var(--destructive)";
                  const marker = isSelected ? "url(#arrow-selected)" : h.direction === "positive" ? "url(#arrow-pos)" : "url(#arrow-neg)";
                  const strokeWidth = isSelected ? 0.8 : 0.4;

                  return (
                    <g
                      key={h.id}
                      className="cursor-pointer"
                      onClick={() => setSelectedHyp(h)}
                    >
                      <line
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeOpacity={isSelected ? 1 : 0.7}
                        markerEnd={marker}
                      />
                      {/* Beta label background */}
                      <rect
                        x={midX - 4}
                        y={midY - 1.6}
                        width="8"
                        height="3.2"
                        fill="var(--card)"
                        stroke={color}
                        strokeWidth="0.15"
                        rx="0.5"
                      />
                      <text
                        x={midX}
                        y={midY + 0.6}
                        textAnchor="middle"
                        style={{ fontSize: 1.8, fill: color, fontWeight: "bold" }}
                      >
                        {h.beta.toFixed(3)}
                      </text>
                      <text
                        x={midX}
                        y={midY + 3.3}
                        textAnchor="middle"
                        style={{ fontSize: 1.2, fill: "var(--muted-foreground)" }}
                      >
                        {h.id}
                      </text>
                      {/* Hover area */}
                      <line
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke="transparent"
                        strokeWidth={3}
                      />
                    </g>
                  );
                })}

                {/* Independent Variable nodes */}
                {ivConstructs.map((c) => {
                  const pos = ivPositions[c.id];
                  const dimColor = dimensionsMeta[c.dimension].color;
                  const isSelected = selectedVar?.id === c.id;
                  return (
                    <g
                      key={c.id}
                      className="cursor-pointer transition-all"
                      onClick={() => setSelectedVar(c)}
                    >
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={5}
                        fill="var(--card)"
                        stroke={isSelected ? "var(--gold)" : dimColor}
                        strokeWidth={isSelected ? 0.8 : 0.5}
                      />
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={5}
                        fill={dimColor}
                        opacity={0.15}
                      />
                      <text
                        x={pos.x}
                        y={pos.y - 1.2}
                        textAnchor="middle"
                        style={{ fontSize: 2, fill: "var(--foreground)", fontWeight: "bold" }}
                      >
                        {c.code}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y + 1.4}
                        textAnchor="middle"
                        style={{ fontSize: 1.4, fill: "var(--muted-foreground)" }}
                      >
                        {lang === "ar" ? c.name.ar : c.name.en}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y + 3.4}
                        textAnchor="middle"
                        style={{ fontSize: 1.2, fill: dimColor, fontWeight: "600" }}
                      >
                        α={c.cronbach.toFixed(2)} | AVE={c.ave.toFixed(2)}
                      </text>
                    </g>
                  );
                })}

                {/* Dependent Variable node */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedVar(dvConstruct)}
                >
                  <circle
                    cx={dvPos.x}
                    cy={dvPos.y}
                    r={9}
                    fill="var(--gold)"
                    opacity={0.15}
                  />
                  <circle
                    cx={dvPos.x}
                    cy={dvPos.y}
                    r={9}
                    fill="var(--card)"
                    stroke={selectedVar?.id === dvConstruct.id ? "var(--gold)" : "var(--gold)"}
                    strokeWidth={selectedVar?.id === dvConstruct.id ? 1.2 : 0.8}
                  />
                  <text
                    x={dvPos.x}
                    y={dvPos.y - 3.2}
                    textAnchor="middle"
                    style={{ fontSize: 2.4, fill: "var(--gold)", fontWeight: "bold" }}
                  >
                    {dvConstruct.code}
                  </text>
                  <text
                    x={dvPos.x}
                    y={dvPos.y - 0.4}
                    textAnchor="middle"
                    style={{ fontSize: 1.6, fill: "var(--foreground)", fontWeight: "600" }}
                  >
                    {lang === "ar" ? "توجهات الحوكمة" : "Gov. Trends"}
                  </text>
                  <text
                    x={dvPos.x}
                    y={dvPos.y + 1.8}
                    textAnchor="middle"
                    style={{ fontSize: 1.6, fill: "var(--gold)", fontWeight: "bold" }}
                  >
                    R² = {dvConstruct.rSquared?.toFixed(3)}
                  </text>
                  <text
                    x={dvPos.x}
                    y={dvPos.y + 3.8}
                    textAnchor="middle"
                    style={{ fontSize: 1.4, fill: "var(--emerald-accent)", fontWeight: "600" }}
                  >
                    Q² = {dvConstruct.qSquared?.toFixed(3)}
                  </text>
                </g>

                {/* Legend */}
                <g>
                  <line
                    x1="2"
                    y1="105"
                    x2="6"
                    y2="105"
                    stroke="var(--emerald-accent)"
                    strokeWidth="0.5"
                    markerEnd="url(#arrow-pos)"
                  />
                  <text
                    x="7"
                    y="105.8"
                    textAnchor="start"
                    style={{ fontSize: 1.8, fill: "var(--foreground)" }}
                  >
                    {t("علاقة إيجابية معنوية", "Significant Positive")}
                  </text>
                  <line
                    x1="40"
                    y1="105"
                    x2="44"
                    y2="105"
                    stroke="var(--destructive)"
                    strokeWidth="0.5"
                    markerEnd="url(#arrow-neg)"
                  />
                  <text
                    x="45"
                    y="105.8"
                    textAnchor="start"
                    style={{ fontSize: 1.8, fill: "var(--foreground)" }}
                  >
                    {t("علاقة سلبية معنوية", "Significant Negative")}
                  </text>
                  <text
                    x="80"
                    y="105.8"
                    textAnchor="start"
                    style={{ fontSize: 1.6, fill: "var(--muted-foreground)" }}
                  >
                    {t("انقر للتفاصيل", "Click for details")}
                  </text>
                </g>
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Quick info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="glass rounded-xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-[var(--gold)] flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-sm mb-1">
                {t("المتغيرات الكامنة", "Latent Variables")}
              </div>
              <div className="text-xs text-muted-foreground">
                {t(
                  "9 متغيرات كامنة: 8 مستقلة (عوامل TOE-C) + 1 تابعة (تبني الحوكمة).",
                  "9 latent variables: 8 independent (TOE-C factors) + 1 dependent (governance adoption)."
                )}
              </div>
            </div>
          </div>
          <div className="glass rounded-xl p-4 flex items-start gap-3">
            <ArrowRight className="w-5 h-5 text-[var(--emerald-accent)] flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-sm mb-1">
                {t("العلاقات الهيكلية", "Structural Relationships")}
              </div>
              <div className="text-xs text-muted-foreground">
                {t(
                  "8 مسارات مباشرة من العوامل المستقلة إلى المتغير التابع، جميعها معنوية إحصائياً.",
                  "8 direct paths from independent factors to the dependent variable, all statistically significant."
                )}
              </div>
            </div>
          </div>
          <div className="glass rounded-xl p-4 flex items-start gap-3">
            <Network className="w-5 h-5 text-[var(--chart-2)] flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-sm mb-1">
                {t("جودة النموذج", "Model Quality")}
              </div>
              <div className="text-xs text-muted-foreground">
                {t(
                  "R² = 0.835 (كبير)، Q² = 0.797، GoF = 0.602 (كبير).",
                  "R² = 0.835 (large), Q² = 0.797, GoF = 0.602 (large)."
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Variable detail dialog */}
      <Dialog
        open={!!selectedVar}
        onOpenChange={(open) => !open && setSelectedVar(null)}
      >
        <DialogContent className="glass-strong max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: dimensionsMeta[selectedVar?.dimension || "technology"].color }}
              />
              {selectedVar && (lang === "ar" ? selectedVar.name.ar : selectedVar.name.en)}
              <span className="text-sm font-normal text-muted-foreground">
                ({selectedVar?.code})
              </span>
            </DialogTitle>
          </DialogHeader>
          {selectedVar && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Metric label={t("كرونباخ α", "Cronbach α")} value={selectedVar.cronbach.toFixed(3)} />
                <Metric label="AVE" value={selectedVar.ave.toFixed(3)} />
                {selectedVar.vif && (
                  <Metric label="VIF" value={selectedVar.vif.toFixed(3)} />
                )}
                {selectedVar.fSquare !== undefined && (
                  <Metric label="f²" value={selectedVar.fSquare.toFixed(3)} />
                )}
                {selectedVar.rSquared !== undefined && (
                  <Metric label="R²" value={selectedVar.rSquared.toFixed(3)} highlight />
                )}
                {selectedVar.qSquared !== undefined && (
                  <Metric label="Q²" value={selectedVar.qSquared.toFixed(3)} highlight />
                )}
              </div>

              <div>
                <div className="text-sm font-semibold mb-2">
                  {t("الأحمال الخارجية (Outer Loadings)", "Outer Loadings")}
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("المؤشر", "Indicator")}</TableHead>
                      <TableHead>{t("قيمة التحميل", "Loading")}</TableHead>
                      <TableHead>{t("الحالة", "Status")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedVar.factorLoadings.map((fl) => (
                      <TableRow key={fl.indicator}>
                        <TableCell className="font-mono">{fl.indicator}</TableCell>
                        <TableCell className="font-bold">{fl.loading.toFixed(3)}</TableCell>
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              fl.loading >= 0.7
                                ? "bg-[var(--emerald-accent)]/20 text-[var(--emerald-accent)]"
                                : "bg-[var(--chart-3)]/20 text-[var(--chart-3)]"
                            }`}
                          >
                            {fl.loading >= 0.7 ? t("مقبول", "Acceptable") : t("حدودي", "Marginal")}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="text-xs text-muted-foreground border-t pt-3">
                <strong>{t("البُعد:", "Dimension:")}</strong>{" "}
                {dimensionsMeta[selectedVar.dimension].labelEn} /{" "}
                {dimensionsMeta[selectedVar.dimension].labelAr}
                {selectedVar.isDependent && (
                  <span className="block mt-1">
                    {t(
                      "هذا هو المتغير التابع في النموذج. يشير R² إلى أن 83.5% من التباين يفسر بواسطة العوامل الثمانية المستقلة.",
                      "This is the dependent variable in the model. R² indicates that 83.5% of the variance is explained by the 8 independent factors."
                    )}
                  </span>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Hypothesis detail dialog */}
      <Dialog
        open={!!selectedHyp}
        onOpenChange={(open) => !open && setSelectedHyp(null)}
      >
        <DialogContent className="glass-strong max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedHyp?.id}
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedHyp?.supported
                    ? "bg-[var(--emerald-accent)]/20 text-[var(--emerald-accent)]"
                    : "bg-[var(--destructive)]/20 text-[var(--destructive)]"
                }`}
              >
                {selectedHyp?.supported ? t("مقبولة", "Supported") : t("مرفوضة", "Rejected")}
              </span>
            </DialogTitle>
          </DialogHeader>
          {selectedHyp && (
            <div className="space-y-3">
              {(() => {
                const from = findConstruct(selectedHyp.fromId);
                const to = findConstruct(selectedHyp.toId);
                return (
                  <div className="text-sm">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold">
                        {from && (lang === "ar" ? from.name.ar : from.name.en)}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <span className="font-bold">
                        {to && (lang === "ar" ? to.name.ar : to.name.en)}
                      </span>
                    </div>
                  </div>
                );
              })()}
              <div className="grid grid-cols-3 gap-2">
                <Metric label="β" value={selectedHyp.beta.toFixed(3)} highlight />
                <Metric label="T" value={selectedHyp.t.toFixed(3)} />
                <Metric label="P" value={selectedHyp.p < 0.001 ? "<0.001" : selectedHyp.p.toFixed(3)} />
              </div>
              <div
                className={`p-3 rounded-lg ${
                  selectedHyp.direction === "positive"
                    ? "bg-[var(--emerald-accent)]/10 border border-[var(--emerald-accent)]/30"
                    : "bg-[var(--destructive)]/10 border border-[var(--destructive)]/30"
                }`}
              >
                <div className="text-xs font-semibold mb-1">
                  {selectedHyp.direction === "positive"
                    ? t("اتجاه العلاقة: إيجابي", "Relationship Direction: Positive")
                    : t("اتجاه العلاقة: سلبي", "Relationship Direction: Negative")}
                </div>
                <div className="text-xs text-muted-foreground">
                  {selectedHyp.direction === "positive"
                    ? t(
                        `زيادة المتغير المستقل بنسبة 1% تؤدي إلى زيادة في تبني الحوكمة بنسبة ${selectedHyp.effectPercent}%.`,
                        `A 1% increase in the independent variable leads to a ${selectedHyp.effectPercent}% increase in governance adoption.`
                      )
                    : t(
                        `انخفاض المتغير المستقل بنسبة 1% يؤدي إلى زيادة في تبني الحوكمة بنسبة ${selectedHyp.effectPercent}%.`,
                        `A 1% decrease in the independent variable leads to a ${selectedHyp.effectPercent}% increase in governance adoption.`
                      )}
                </div>
              </div>
              <div className="text-xs text-muted-foreground border-t pt-3">
                {t(
                  `T = ${selectedHyp.t.toFixed(3)} > 1.96 (قيمة حرجة عند مستوى دلالة 0.05)، لذلك الفرضية مقبولة.`,
                  `T = ${selectedHyp.t.toFixed(3)} > 1.96 (critical value at α = 0.05), so the hypothesis is supported.`
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function Metric({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg p-2 text-center ${
        highlight ? "bg-[var(--gold)]/10 ring-1 ring-[var(--gold)]/30" : "bg-muted/30"
      }`}
    >
      <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
      <div
        className={`text-lg font-bold counter-num ${
          highlight ? "text-[var(--gold)]" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}
