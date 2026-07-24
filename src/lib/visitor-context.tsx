"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

interface VisitorStats {
  total: number;
  today: number;
  todayDate: string;
  avgSeconds: number;
  mostVisited: string;
  last7Days: { date: string; count: number }[];
  sectionHits: Record<string, number>;
}

interface VisitorContextValue {
  stats: VisitorStats;
  recordSectionVisit: (id: string) => void;
  isClient: boolean;
}

const VisitorContext = createContext<VisitorContextValue | null>(null);

const TOTAL_KEY = "aig-visitors-total";
const TODAY_KEY = "aig-visitors-today";
const TODAY_DATE_KEY = "aig-visitors-today-date";
const HISTORY_KEY = "aig-visitors-7days";
const SESSION_START_KEY = "aig-session-start";
const SECTIONS_KEY = "aig-section-hits";

const todayStr = () => new Date().toISOString().slice(0, 10);

function loadNumber(key: string, fallback: number): number {
  if (typeof window === "undefined") return fallback;
  const v = localStorage.getItem(key);
  if (v == null) return fallback;
  const n = Number(v);
  return isNaN(n) ? fallback : n;
}

function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function VisitorProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<VisitorStats>({
    total: 1,
    today: 1,
    todayDate: todayStr(),
    avgSeconds: 0,
    mostVisited: "—",
    last7Days: [],
    sectionHits: {},
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Use a session flag so a single page load doesn't inflate counter
    const sessionFlag = sessionStorage.getItem("aig-session-counted");
    let total = loadNumber(TOTAL_KEY, 0);
    let today = loadNumber(TODAY_KEY, 0);
    let todayDate = localStorage.getItem(TODAY_DATE_KEY) || todayStr();

    // Reset today if new day
    if (todayDate !== todayStr()) {
      today = 0;
      todayDate = todayStr();
    }

    if (!sessionFlag) {
      total += 1;
      today += 1;
      sessionStorage.setItem("aig-session-counted", "1");
      localStorage.setItem(TOTAL_KEY, String(total));
      localStorage.setItem(TODAY_KEY, String(today));
      localStorage.setItem(TODAY_DATE_KEY, todayDate);
    }

    // Update 7-day history
    let history = loadJSON<{ date: string; count: number }[]>(HISTORY_KEY, []);
    const todayEntry = history.find((h) => h.date === todayDate);
    if (todayEntry) {
      if (!sessionFlag) todayEntry.count += 1;
    } else {
      history.push({ date: todayDate, count: 1 });
      history = history.slice(-7);
    }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

    // Track session start time for avg time
    let sessionStart = loadNumber(SESSION_START_KEY, Date.now());
    if (!sessionStart) {
      sessionStart = Date.now();
      localStorage.setItem(SESSION_START_KEY, String(sessionStart));
    }

    const sectionHits = loadJSON<Record<string, number>>(SECTIONS_KEY, {});

    setStats({
      total,
      today,
      todayDate,
      avgSeconds: Math.floor((Date.now() - sessionStart) / 1000),
      mostVisited:
        Object.entries(sectionHits).sort((a, b) => b[1] - a[1])[0]?.[0] || "—",
      last7Days: history,
      sectionHits,
    });

    const interval = setInterval(() => {
      const start = loadNumber(SESSION_START_KEY, Date.now());
      setStats((prev) => ({
        ...prev,
        avgSeconds: Math.floor((Date.now() - start) / 1000),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const recordSectionVisit = useCallback((id: string) => {
    if (typeof window === "undefined") return;
    const hits = loadJSON<Record<string, number>>(SECTIONS_KEY, {});
    hits[id] = (hits[id] || 0) + 1;
    localStorage.setItem(SECTIONS_KEY, JSON.stringify(hits));
    setStats((prev) => ({
      ...prev,
      sectionHits: hits,
      mostVisited:
        Object.entries(hits).sort((a, b) => b[1] - a[1])[0]?.[0] || "—",
    }));
  }, []);

  return (
    <VisitorContext.Provider value={{ stats, recordSectionVisit, isClient }}>
      {children}
    </VisitorContext.Provider>
  );
}

export function useVisitor() {
  const ctx = useContext(VisitorContext);
  if (!ctx) throw new Error("useVisitor must be used within VisitorProvider");
  return ctx;
}
