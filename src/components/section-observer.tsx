"use client";

import { useEffect } from "react";
import { useVisitor } from "@/lib/visitor-context";

const sectionIds = [
  "dashboard",
  "charts",
  "sem",
  "toe",
  "knowledge",
  "story",
  "qr",
];

export function SectionObserver() {
  const { recordSectionVisit } = useVisitor();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            recordSectionVisit(entry.target.id);
          }
        });
      },
      { threshold: [0.4] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [recordSectionVisit]);

  return null;
}
