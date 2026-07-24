"use client";

import { motion } from "framer-motion";
import {
  Users,
  CheckCircle2,
  TrendingUp,
  Target,
  Building2,
  FileText,
  Cpu,
  Sparkles,
} from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { AnimatedCounter } from "@/components/animated-counter";
import { researchMeta } from "@/lib/research-data";
import { useEffect, useRef } from "react";

export function Dashboard() {
  const { t, lang } = useI18n();
  const ref = useRef<HTMLElement>(null);

  const kpis = [
    {
      icon: Users,
      labelAr: "حجم العينة الصالحة",
      labelEn: "Valid Sample Size",
      value: researchMeta.questionnairesValid,
      suffix: "",
      color: "var(--chart-1)",
    },
    {
      icon: Building2,
      labelAr: "الشركات المدرجة",
      labelEn: "Listed Companies",
      value: researchMeta.companiesCount,
      suffix: "",
      color: "var(--chart-2)",
    },
    {
      icon: CheckCircle2,
      labelAr: "الفرضيات المقبولة",
      labelEn: "Supported Hypotheses",
      value: 8,
      suffix: "/8",
      color: "var(--emerald-accent)",
    },
    {
      icon: TrendingUp,
      labelAr: "معامل التفسير R²",
      labelEn: "R² Coefficient",
      value: 0.835,
      decimals: 3,
      color: "var(--gold)",
    },
    {
      icon: Target,
      labelAr: "جودة التنبؤ Q²",
      labelEn: "Predictive Relevance Q²",
      value: 0.797,
      decimals: 3,
      color: "var(--chart-4)",
    },
    {
      icon: Sparkles,
      labelAr: "جودة المطابقة GoF",
      labelEn: "Goodness of Fit",
      value: 0.602,
      decimals: 3,
      color: "var(--chart-5)",
    },
    {
      icon: FileText,
      labelAr: "فقرات الاستبانة",
      labelEn: "Questionnaire Items",
      value: researchMeta.questionnaireItems,
      suffix: "",
      color: "var(--chart-3)",
    },
    {
      icon: Cpu,
      labelAr: "معامل كرونباخ العام",
      labelEn: "Overall Cronbach α",
      value: 0.8262,
      decimals: 4,
      color: "var(--primary)",
    },
  ];

  return (
    <section
      ref={ref}
      id="dashboard"
      className="section-anchor pt-8 pb-16"
    >
      <div className="container mx-auto px-4">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
            <span className="text-sm font-medium">
              {t(
                "ملحق رقمي تفاعلي لبوستر مؤتمر علمي",
                "Interactive Digital Companion for Academic Conference Poster"
              )}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            <span className="text-gold-gradient">
              {t(researchMeta.titleAr, researchMeta.titleEn)}
            </span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground mb-6">
            {t(
              "بحث أكاديمي يهدف إلى التعرف على العوامل المؤثرة في تبني الحوكمة بالذكاء الاصطناعي في شركات القطاع الصناعي المدرجة في بورصة فلسطين، باستخدام إطار TOE-C الموسع ومنهجية PLS-SEM.",
              "Academic research identifying factors influencing AI governance adoption in industrial companies listed on the Palestine Stock Exchange, using the extended TOE-C framework and PLS-SEM methodology."
            )}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
              <Users className="w-4 h-4 text-[var(--gold)]" />
              <span className="font-medium">
                {t(researchMeta.authorAr, researchMeta.authorEn)}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
              <Building2 className="w-4 h-4 text-[var(--emerald-accent)]" />
              <span className="font-medium">
                {t(researchMeta.affiliationAr, researchMeta.affiliationEn)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass rounded-2xl p-5 relative overflow-hidden group cursor-default"
            >
              <div
                className="absolute top-0 inset-x-0 h-1 opacity-80"
                style={{ background: kpi.color }}
              />
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                style={{
                  background: `color-mix(in oklch, ${kpi.color} 20%, transparent)`,
                  color: kpi.color,
                }}
              >
                <kpi.icon className="w-5 h-5" />
              </div>
              <div
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: kpi.color }}
              >
                <AnimatedCounter
                  value={kpi.value}
                  decimals={kpi.decimals ?? 0}
                  suffix={kpi.suffix ?? ""}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                {t(kpi.labelAr, kpi.labelEn)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Methodology badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { ar: "إطار TOE-C", en: "TOE-C Framework" },
            { ar: "PLS-SEM", en: "PLS-SEM" },
            { ar: "SmartPLS 4", en: "SmartPLS 4" },
            { ar: "Bootstrap 5000", en: "Bootstrap 5000" },
            { ar: `α = ${researchMeta.significanceLevel}`, en: `α = ${researchMeta.significanceLevel}` },
          ].map((badge, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-lg glass text-xs font-medium border border-[var(--gold)]/20"
            >
              {t(badge.ar, badge.en)}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
