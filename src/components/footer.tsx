"use client";

import { useI18n } from "@/lib/i18n-context";
import { researchMeta } from "@/lib/research-data";

export function Footer() {
  const { t, lang } = useI18n();

  return (
    <footer className="mt-auto border-t border-border/40 glass-strong">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-bold mb-1">
              {t("الباحث", "Researcher")}
            </div>
            <div className="text-muted-foreground text-xs">
              {lang === "ar" ? researchMeta.authorAr : researchMeta.authorEn}
            </div>
            <div className="text-muted-foreground text-xs mt-1">
              {lang === "ar" ? researchMeta.affiliationAr : researchMeta.affiliationEn}
            </div>
          </div>
          <div>
            <div className="font-bold mb-1">
              {t("المنهجية", "Methodology")}
            </div>
            <div className="text-muted-foreground text-xs">
              {researchMeta.method} · SmartPLS 4
            </div>
            <div className="text-muted-foreground text-xs mt-1">
              {t("إطار", "Framework")}: {researchMeta.framework}
            </div>
          </div>
          <div className="md:text-end">
            <div className="font-bold mb-1">
              {t("الملحق الرقمي", "Digital Companion")}
            </div>
            <div className="text-muted-foreground text-xs">
              {t(
                "إنفوجرافيك تفاعلي لبوستر مؤتمر علمي",
                "Interactive Infographic for Academic Conference Poster"
              )}
            </div>
            <div className="text-muted-foreground text-xs mt-1">
              © {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
