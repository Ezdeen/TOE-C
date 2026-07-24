"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useI18n } from "@/lib/i18n-context";
import {
  constructs,
  hypotheses,
  findConstruct,
  dimensionsMeta,
  type Dimension,
} from "@/lib/research-data";
import { Card, CardContent } from "@/components/ui/card";
import {
  Cpu,
  Building2,
  Globe,
  DollarSign,
  ChevronDown,
  Layers,
  Zap,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const dimIcons: Record<Dimension, any> = {
  technology: Cpu,
  organization: Building2,
  environment: Globe,
  cost: DollarSign,
};

const dimDescriptions: Record<
  Dimension,
  { ar: string; en: string }
> = {
  technology: {
    ar: "العوامل التقنية المتعلقة بخصائص التكنولوجيا ذاتها، مثل الميزة النسبية ودرجة التعقيد. تؤثر هذه العوامل على قابلية تبني التقنية وسهولة استخدامها في بيئة العمل.",
    en: "Technological factors related to the characteristics of the technology itself, such as relative advantage and complexity. These factors influence the adoptability and ease of use of the technology in the workplace.",
  },
  organization: {
    ar: "العوامل التنظيمية المتعلقة ببنية الشركة ومواردها، مثل دعم الإدارة العليا والاستعداد التنظيمي. تعكس قدرة المنظمة على استيعاب التغيير التقني.",
    en: "Organizational factors related to the company's structure and resources, such as top management support and organizational readiness. Reflect the organization's ability to absorb technological change.",
  },
  environment: {
    ar: "العوامل البيئية الخارجية المحيطة بالشركة، مثل الضغط التنافسي والتشجيع الحكومي. تمثل القوى الخارجية التي تدفع أو تساعد على التبني.",
    en: "Environmental factors surrounding the company, such as competitive pressure and government support. Represent external forces that drive or assist adoption.",
  },
  cost: {
    ar: "العوامل الاقتصادية المتعلقة بالتكاليف المالية، مثل التكاليف الاستثمارية والتشغيلية. هذا البُعد هو إضافة الباحث لتوسيع إطار TOE الأصلي إلى TOE-C.",
    en: "Economic factors related to financial costs, such as investment and operational costs. This dimension is the researcher's extension of the original TOE framework to TOE-C.",
  },
};

export function TOESection() {
  const { t, lang } = useI18n();
  const [activeDim, setActiveDim] = useState<Dimension | null>(null);
  const [enabled, setEnabled] = useState<Record<Dimension, boolean>>({
    technology: true,
    organization: true,
    environment: true,
    cost: true,
  });

  const dimensionOrder: Dimension[] = [
    "technology",
    "organization",
    "environment",
    "cost",
  ];

  const toggleDim = (dim: Dimension) => {
    setEnabled((prev) => ({ ...prev, [dim]: !prev[dim] }));
  };

  // Calculate combined effect on dependent variable
  const totalBeta = hypotheses
    .filter((h) => enabled[findConstruct(h.fromId)?.dimension || "technology"])
    .reduce((sum, h) => sum + h.beta, 0);

  const totalPositive = hypotheses
    .filter((h) => enabled[findConstruct(h.fromId)?.dimension || "technology"])
    .filter((h) => h.direction === "positive")
    .reduce((sum, h) => sum + h.beta, 0);

  const totalNegative = hypotheses
    .filter((h) => enabled[findConstruct(h.fromId)?.dimension || "technology"])
    .filter((h) => h.direction === "negative")
    .reduce((sum, h) => sum + Math.abs(h.beta), 0);

  return (
    <section id="toe" className="section-anchor py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-3">
            <Layers className="w-4 h-4 text-[var(--gold)]" />
            <span className="text-xs font-medium">
              {t("إطار عمل TOE-C الموسع", "Extended TOE-C Framework")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t(
              "الأبعاد الأربعة المؤثرة على تبني الحوكمة",
              "Four Dimensions Influencing Governance Adoption"
            )}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "إطار TOE-C يوسع إطار TOE التقليدي بإضافة البُعد الاقتصادي (التكلفة). كل بُعد قابل للنقر لعرض العوامل الفرعية، ويمكن تفعيل/تعطيل كل بُعد لرؤية تأثيره المنفرد على المتغير التابع.",
              "The TOE-C framework extends the traditional TOE by adding the economic (Cost) dimension. Each dimension is clickable to view sub-factors, and can be enabled/disabled to see its individual effect on the dependent variable."
            )}
          </p>
        </motion.div>

        {/* Framework Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Dimensions */}
          <div className="lg:col-span-2 space-y-3">
            {dimensionOrder.map((dim, i) => {
              const meta = dimensionsMeta[dim];
              const Icon = dimIcons[dim];
              const dimConstructs = constructs.filter((c) => c.dimension === dim && !c.isDependent);
              const isActive = activeDim === dim;
              const isEnabled = enabled[dim];

              const dimHypotheses = hypotheses.filter((h) => {
                const c = findConstruct(h.fromId);
                return c?.dimension === dim;
              });
              const dimAvgBeta =
                dimHypotheses.reduce((s, h) => s + Math.abs(h.beta), 0) /
                dimHypotheses.length;

              return (
                <motion.div
                  key={dim}
                  initial={{ opacity: 0, x: lang === "ar" ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card
                    className={`glass overflow-hidden transition-all ${
                      isActive ? "ring-2" : ""
                    } ${isEnabled ? "" : "opacity-50"}`}
                    style={{
                      // @ts-ignore
                      "--tw-ring-color": meta.color,
                    }}
                  >
                    <CardContent className="p-0">
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer"
                        onClick={() => setActiveDim(isActive ? null : dim)}
                        style={{
                          background: `linear-gradient(135deg, color-mix(in oklch, ${meta.color} 15%, transparent), transparent)`,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{
                              background: `color-mix(in oklch, ${meta.color} 25%, transparent)`,
                              color: meta.color,
                            }}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-base">
                              {lang === "ar" ? meta.labelAr : meta.labelEn}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {dimConstructs.length} {t("عوامل", "factors")} ·{" "}
                              {t("متوسط |β|", "avg |β|")}: {dimAvgBeta.toFixed(3)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDim(dim);
                            }}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              isEnabled ? "bg-[var(--emerald-accent)]" : "bg-muted"
                            }`}
                            aria-label="Toggle dimension"
                          >
                            <span
                              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                                isEnabled
                                  ? lang === "ar"
                                    ? "translate-x-0.5"
                                    : "translate-x-6"
                                  : lang === "ar"
                                  ? "translate-x-6"
                                  : "translate-x-0.5"
                              }`}
                            />
                          </button>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${
                              isActive ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 border-t border-border/40">
                              <p className="text-sm text-muted-foreground mb-3">
                                {lang === "ar" ? dimDescriptions[dim].ar : dimDescriptions[dim].en}
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {dimConstructs.map((c) => {
                                  const hyp = hypotheses.find((h) => h.fromId === c.id);
                                  return (
                                    <div
                                      key={c.id}
                                      className="rounded-lg p-3 bg-muted/20 border border-border/40"
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="font-semibold text-sm">
                                          {lang === "ar" ? c.name.ar : c.name.en}
                                        </div>
                                        <span
                                          className="text-xs px-2 py-0.5 rounded-full font-mono"
                                          style={{
                                            background: `color-mix(in oklch, ${meta.color} 20%, transparent)`,
                                            color: meta.color,
                                          }}
                                        >
                                          {c.code}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-3 gap-1 text-xs">
                                        <div>
                                          <div className="text-muted-foreground">β</div>
                                          <div className="font-bold" style={{ color: hyp?.direction === "positive" ? "var(--emerald-accent)" : "var(--destructive)" }}>
                                            {hyp?.beta.toFixed(3)}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-muted-foreground">T</div>
                                          <div className="font-bold">{hyp?.t.toFixed(2)}</div>
                                        </div>
                                        <div>
                                          <div className="text-muted-foreground">P</div>
                                          <div className="font-bold">
                                            {hyp && hyp.p < 0.001 ? "<.001" : hyp?.p.toFixed(3)}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="mt-2 flex items-center gap-1 text-xs">
                                        {hyp?.direction === "positive" ? (
                                          <>
                                            <TrendingUp className="w-3 h-3 text-[var(--emerald-accent)]" />
                                            <span className="text-[var(--emerald-accent)]">
                                              {t("تأثير إيجابي", "Positive effect")}
                                            </span>
                                          </>
                                        ) : (
                                          <>
                                            <TrendingDown className="w-3 h-3 text-[var(--destructive)]" />
                                            <span className="text-[var(--destructive)]">
                                              {t("تأثير سلبي", "Negative effect")}
                                            </span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Summary & DV */}
          <div className="space-y-4">
            <Card className="glass sticky top-24">
              <CardContent className="p-5">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--gold)]/15 mb-3">
                    <Zap className="w-8 h-8 text-[var(--gold)]" />
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">
                    {t("المتغير التابع", "Dependent Variable")}
                  </div>
                  <div className="font-bold text-sm">
                    {t(
                      "توجهات استخدام الحوكمة بالذكاء الاصطناعي",
                      "AI Governance Adoption Trends"
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="rounded-lg p-3 bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-center">
                    <div className="text-xs text-muted-foreground mb-1">
                      {t("التأثير الصافي المُفعّل", "Net Effect (Enabled)")}
                    </div>
                    <div className="text-3xl font-bold text-[var(--gold)] counter-num">
                      {totalBeta >= 0 ? "+" : ""}
                      {totalBeta.toFixed(3)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">β (sum)</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg p-2 bg-[var(--emerald-accent)]/10 text-center">
                      <TrendingUp className="w-4 h-4 mx-auto text-[var(--emerald-accent)] mb-1" />
                      <div className="text-lg font-bold text-[var(--emerald-accent)] counter-num">
                        +{totalPositive.toFixed(3)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t("إيجابي", "Positive")}
                      </div>
                    </div>
                    <div className="rounded-lg p-2 bg-[var(--destructive)]/10 text-center">
                      <TrendingDown className="w-4 h-4 mx-auto text-[var(--destructive)] mb-1" />
                      <div className="text-lg font-bold text-[var(--destructive)] counter-num">
                        -{totalNegative.toFixed(3)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t("سلبي", "Negative")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="text-xs text-muted-foreground mb-2">
                    {t("حالة الأبعاد:", "Dimensions Status:")}
                  </div>
                  <div className="space-y-1.5">
                    {dimensionOrder.map((dim) => {
                      const meta = dimensionsMeta[dim];
                      return (
                        <div
                          key={dim}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ background: meta.color }}
                            />
                            {lang === "ar" ? meta.labelAr : meta.labelEn}
                          </span>
                          <span
                            className={`font-mono ${
                              enabled[dim] ? "text-[var(--emerald-accent)]" : "text-muted-foreground"
                            }`}
                          >
                            {enabled[dim] ? "ON" : "OFF"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t text-xs text-muted-foreground">
                  {t(
                    "R² الكلي = 0.835 — التأثير الصافي الإيجابي يفسر التبني المتزايد للحوكمة رغم المقاومة الاقتصادية.",
                    "Total R² = 0.835 — The positive net effect explains the increased adoption of governance despite economic resistance."
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
