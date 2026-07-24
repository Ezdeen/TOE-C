"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LoadingScreen } from "@/components/loading-screen";
import { SectionObserver } from "@/components/section-observer";
import { Dashboard } from "@/components/sections/dashboard";
import { ChartsSection } from "@/components/sections/charts";
import { SEMSection } from "@/components/sections/sem-model";
import { TOESection } from "@/components/sections/toe-framework";
import { KnowledgeMap } from "@/components/sections/knowledge-map";
import { Scrollytelling } from "@/components/sections/scrollytelling";
import { VisitorStats } from "@/components/sections/visitor-stats";
import { ConclusionsRecommendations } from "@/components/sections/conclusions";
import { QRSection } from "@/components/sections/qr-section";

export default function Home() {
  return (
    <div className="particle-bg min-h-screen flex flex-col">
      <LoadingScreen />
      <Header />
      <main className="flex-1">
        <Dashboard />
        <ChartsSection />
        <SEMSection />
        <TOESection />
        <KnowledgeMap />
        <Scrollytelling />
        <VisitorStats />
        <ConclusionsRecommendations />
        <QRSection />
      </main>
      <Footer />
      <SectionObserver />
    </div>
  );
}
