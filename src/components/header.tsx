"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Languages, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n-context";
import { useVisitor } from "@/lib/visitor-context";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { id: "dashboard", ar: "لوحة البيانات", en: "Dashboard" },
  { id: "charts", ar: "الرسوم البيانية", en: "Charts" },
  { id: "sem", ar: "نموذج SEM", en: "SEM Model" },
  { id: "toe", ar: "إطار TOE-C", en: "TOE-C" },
  { id: "knowledge", ar: "الخريطة المعرفية", en: "Knowledge Map" },
  { id: "story", ar: "القصة التفاعلية", en: "Story" },
  { id: "qr", ar: "رمز QR", en: "QR Code" },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const { lang, toggleLang, t } = useI18n();
  const { stats, isClient } = useVisitor();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg" : "glass"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo / Title */}
          <button
            onClick={() => handleNav("dashboard")}
            className="flex items-center gap-3 text-start"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--emerald-accent)] flex items-center justify-center text-white font-bold text-lg shadow-md">
              AI
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold leading-tight">
                {t("حوكمة الذكاء الاصطناعي", "AI Governance")}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("إطار TOE-C الموسع", "Extended TOE-C Framework")}
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="nav-link px-3 py-2 text-sm font-medium rounded-md hover:bg-accent/50 transition-colors"
              >
                {t(item.ar, item.en)}
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Visitor counter */}
            {isClient && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs">
                <span className="w-2 h-2 rounded-full bg-[var(--emerald-accent)] animate-pulse" />
                <span className="text-muted-foreground">
                  {t("الزوار:", "Visitors:")}
                </span>
                <span className="font-bold counter-num">
                  {stats.total.toLocaleString("en-US")}
                </span>
              </div>
            )}

            {/* Language toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLang}
              aria-label="Toggle language"
              className="rounded-full"
            >
              <Languages className="h-5 w-5" />
              <span className="sr-only">Toggle language</span>
            </Button>

            {/* Theme toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="rounded-full"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden rounded-full"
                  aria-label="Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side={lang === "ar" ? "left" : "right"}
                className="w-[280px] glass-strong"
              >
                <SheetHeader>
                  <SheetTitle>
                    {t("التنقل", "Navigation")}
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 mt-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className="text-start px-3 py-2 rounded-md hover:bg-accent/50 transition-colors text-sm font-medium"
                    >
                      {t(item.ar, item.en)}
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
