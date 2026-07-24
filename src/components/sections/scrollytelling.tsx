"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n-context";
import { storySections } from "@/lib/research-data";
import {
  BookOpen,
  AlertCircle,
  Target,
  Microscope,
  BarChart3,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  AlertCircle,
  Target,
  Microscope,
  BarChart3,
  Lightbulb,
};

export function Scrollytelling() {
  const { t, lang } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="story" className="section-anchor py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-3">
            <BookOpen className="w-4 h-4 text-[var(--gold)]" />
            <span className="text-xs font-medium">
              {t("القصة التفاعلية", "Interactive Story")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t("رحلة البحث من البداية إلى النهاية", "Research Journey From Start to Finish")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "تمرّ عبر مراحل البحث الست مع كل تمريرة للأسفل. كل قسم يظهر تدريجياً مع أيقونة وإحصائية متحركة.",
              "Scroll through the six research stages. Each section appears progressively with an icon and animated statistic."
            )}
          </p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Vertical timeline line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-muted/40 rounded-full overflow-hidden"
            style={{ insetInlineStart: "calc(50% - 2px)" }}
          >
            <motion.div
              className="w-full bg-gradient-to-b from-[var(--gold)] via-[var(--emerald-accent)] to-[var(--chart-5)]"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Sections */}
          <div className="space-y-16">
            {storySections.map((section, i) => {
              const Icon = iconMap[section.icon] || BookOpen;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex items-center gap-6 ${
                    isEven ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div className="flex-1">
                    <div
                      className={`glass rounded-2xl p-6 ${
                        isEven ? "text-start" : "text-start"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            i === 0
                              ? "bg-[var(--chart-1)]/20 text-[var(--chart-1)]"
                              : i === 1
                              ? "bg-[var(--destructive)]/20 text-[var(--destructive)]"
                              : i === 2
                              ? "bg-[var(--chart-3)]/20 text-[var(--chart-3)]"
                              : i === 3
                              ? "bg-[var(--chart-2)]/20 text-[var(--chart-2)]"
                              : i === 4
                              ? "bg-[var(--emerald-accent)]/20 text-[var(--emerald-accent)]"
                              : "bg-[var(--gold)]/20 text-[var(--gold)]"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">
                            {t("المرحلة", "Stage")} {i + 1} / {storySections.length}
                          </div>
                          <h3 className="text-xl font-bold">
                            {lang === "ar" ? section.titleAr : section.titleEn}
                          </h3>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {lang === "ar" ? section.bodyAr : section.bodyEn}
                      </p>

                      {section.stat && (
                        <div className="inline-flex items-baseline gap-2 px-4 py-2 rounded-lg bg-muted/30">
                          <span className="text-3xl font-bold text-[var(--gold)]">
                            <AnimatedCounter
                              value={
                                section.stat.value.includes("/") ||
                                isNaN(Number(section.stat.value))
                                  ? 0
                                  : Number(section.stat.value)
                              }
                              suffix={
                                section.stat.value.includes("/")
                                  ? section.stat.value
                                  : ""
                              }
                            />
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {lang === "ar" ? section.stat.labelAr : section.stat.labelEn}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Timeline node (center) */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-10 h-10 rounded-full glass-strong flex items-center justify-center">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          i === 0
                            ? "bg-[var(--chart-1)]"
                            : i === 1
                            ? "bg-[var(--destructive)]"
                            : i === 2
                            ? "bg-[var(--chart-3)]"
                            : i === 3
                            ? "bg-[var(--chart-2)]"
                            : i === 4
                            ? "bg-[var(--emerald-accent)]"
                            : "bg-[var(--gold)]"
                        }`}
                      />
                    </div>
                    {/* Stage label outside */}
                    <div className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-bold text-muted-foreground"
                      style={{
                        insetInlineStart: "calc(100% + 8px)",
                      }}
                    >
                      {section.id.toUpperCase()}
                    </div>
                  </div>

                  {/* Empty space for opposite side */}
                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
