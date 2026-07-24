"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";
import { useVisitor } from "@/lib/visitor-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Eye,
  CalendarDays,
  Clock,
  Activity,
  TrendingUp,
} from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export function VisitorStats() {
  const { t, lang } = useI18n();
  const { stats, isClient } = useVisitor();

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const sparklineData = stats.last7Days.map((d) => ({
    date: d.date.slice(5),
    visits: d.count,
  }));

  // Most visited section label
  const mostVisitedLabel = (() => {
    if (!stats.mostVisited || stats.mostVisited === "—") return "—";
    const map: Record<string, { ar: string; en: string }> = {
      dashboard: { ar: "لوحة البيانات", en: "Dashboard" },
      charts: { ar: "الرسوم البيانية", en: "Charts" },
      sem: { ar: "نموذج SEM", en: "SEM" },
      toe: { ar: "إطار TOE-C", en: "TOE-C" },
      knowledge: { ar: "الخريطة المعرفية", en: "Knowledge Map" },
      story: { ar: "القصة التفاعلية", en: "Story" },
      qr: { ar: "رمز QR", en: "QR Code" },
    };
    const found = map[stats.mostVisited];
    return found ? (lang === "ar" ? found.ar : found.en) : stats.mostVisited;
  })();

  const cards = [
    {
      icon: Eye,
      labelAr: "إجمالي الزوار",
      labelEn: "Total Visitors",
      value: stats.total,
      color: "var(--chart-1)",
    },
    {
      icon: CalendarDays,
      labelAr: "زوار اليوم",
      labelEn: "Today's Visitors",
      value: stats.today,
      color: "var(--chart-2)",
    },
    {
      icon: Clock,
      labelAr: "وقت البقاء (دقيقة:ثانية)",
      labelEn: "Time on Site (m:s)",
      value: formatTime(stats.avgSeconds),
      color: "var(--chart-3)",
      isString: true,
    },
    {
      icon: TrendingUp,
      labelAr: "أكثر قسم زيارة",
      labelEn: "Most Visited Section",
      value: mostVisitedLabel,
      color: "var(--chart-4)",
      isString: true,
    },
  ];

  return (
    <section id="stats" className="section-anchor py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-3">
            <Activity className="w-4 h-4 text-[var(--gold)]" />
            <span className="text-xs font-medium">
              {t("إحصائيات الزوار", "Visitor Statistics")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t("بيانات الزوار في الوقت الفعلي", "Real-time Visitor Analytics")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "تُحفظ بيانات الزوار محلياً على جهازك لأغراض العرض التوضيحي. في النسخة المنشورة يمكن ربطها بـ Firebase أو Google Analytics.",
              "Visitor data is stored locally for demonstration. In production, can be connected to Firebase or Google Analytics."
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="glass h-full">
                <CardContent className="p-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{
                      background: `color-mix(in oklch, ${card.color} 20%, transparent)`,
                      color: card.color,
                    }}
                  >
                    <card.icon className="w-5 h-5" />
                  </div>
                  {card.isString ? (
                    <div
                      className="text-xl font-bold mb-1 truncate"
                      style={{ color: card.color }}
                    >
                      {card.value}
                    </div>
                  ) : (
                    <div
                      className="text-3xl font-bold mb-1 counter-num"
                      style={{ color: card.color }}
                    >
                      <AnimatedCounter value={card.value} />
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {t(card.labelAr, card.labelEn)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="w-5 h-5 text-[var(--gold)]" />
              {t("الزيارات خلال آخر 7 أيام", "Visits Over Last 7 Days")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isClient && sparklineData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={sparklineData}>
                  <defs>
                    <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--gold)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                    stroke="var(--border)"
                  />
                  <YAxis
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                    stroke="var(--border)"
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    labelStyle={{ color: "var(--foreground)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="visits"
                    stroke="var(--gold)"
                    strokeWidth={2}
                    fill="url(#sparkGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-sm text-muted-foreground">
                {t(
                  "ستظهر البيانات بعد التصفح لفترة.",
                  "Data will appear after browsing for a while."
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
