"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";
import { conclusions, recommendations, researchMeta } from "@/lib/research-data";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Lightbulb, BookMarked } from "lucide-react";

export function ConclusionsRecommendations() {
  const { t, lang } = useI18n();

  return (
    <section id="conclusions" className="section-anchor py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-3">
            <BookMarked className="w-4 h-4 text-[var(--gold)]" />
            <span className="text-xs font-medium">
              {t("الاستنتاجات والتوصيات", "Conclusions & Recommendations")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t("خلاصة البحث", "Research Summary")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Conclusions */}
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--emerald-accent)]/20 text-[var(--emerald-accent)] flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">
                  {t("الاستنتاجات الرئيسية", "Key Conclusions")}
                </h3>
              </div>
              <div className="space-y-3">
                {conclusions.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-3 p-3 rounded-lg bg-muted/20 border border-border/40"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--emerald-accent)]/20 text-[var(--emerald-accent)] flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {lang === "ar" ? c.ar : c.en}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/20 text-[var(--gold)] flex items-center justify-center">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">
                  {t("التوصيات", "Recommendations")}
                </h3>
              </div>
              <div className="space-y-3">
                {recommendations.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-3 p-3 rounded-lg bg-muted/20 border border-border/40"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--gold)]/20 text-[var(--gold)] flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {lang === "ar" ? r.ar : r.en}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Citation block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 max-w-3xl mx-auto"
        >
          <Card className="glass border-[var(--gold)]/30">
            <CardContent className="p-5 text-center">
              <div className="text-xs text-muted-foreground mb-2">
                {t("للاقتباس", "Cite as")}
              </div>
              <div className="font-mono text-sm leading-relaxed">
                {lang === "ar"
                  ? `${researchMeta.authorAr} (${new Date().getFullYear()}). ${researchMeta.titleAr}. ${researchMeta.affiliationAr}.`
                  : `${researchMeta.authorEn} (${new Date().getFullYear()}). ${researchMeta.titleEn}. ${researchMeta.affiliationEn}.`}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
