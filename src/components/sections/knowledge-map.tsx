"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useI18n } from "@/lib/i18n-context";
import { knowledgeNodes, knowledgeEdges, type KNode } from "@/lib/research-data";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, ZoomIn, ZoomOut, Maximize2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const typeColors: Record<KNode["type"], string> = {
  problem: "var(--gold)",
  literature: "var(--chart-2)",
  hypotheses: "var(--chart-5)",
  methodology: "var(--chart-3)",
  results: "var(--emerald-accent)",
  recommendations: "var(--chart-4)",
};

const typeLabels = {
  problem: { ar: "المشكلة البحثية", en: "Research Problem" },
  literature: { ar: "الأدبيات", en: "Literature" },
  hypotheses: { ar: "الفرضيات", en: "Hypotheses" },
  methodology: { ar: "المنهجية", en: "Methodology" },
  results: { ar: "النتائج", en: "Results" },
  recommendations: { ar: "التوصيات", en: "Recommendations" },
};

export function KnowledgeMap() {
  const { t, lang } = useI18n();
  const [selected, setSelected] = useState<KNode | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragNode, setDragNode] = useState<string | null>(null);
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>(
    () => {
      const pos: Record<string, { x: number; y: number }> = {};
      knowledgeNodes.forEach((n) => {
        pos[n.id] = { x: n.x, y: n.y };
      });
      return pos;
    }
  );
  const svgRef = useRef<SVGSVGElement>(null);

  // Pan handling
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0, panX: 0, panY: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragNode) return;
    setIsPanning(true);
    setPanStart({
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: panStart.panX + (e.clientX - panStart.x),
        y: panStart.panY + (e.clientY - panStart.y),
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Node dragging
  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setDragNode(nodeId);
  };

  const handleNodeMouseMove = (e: React.MouseEvent) => {
    if (!dragNode || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setNodePositions((prev) => ({
      ...prev,
      [dragNode]: { x, y },
    }));
  };

  const handleNodeMouseUp = () => {
    setDragNode(null);
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleNodeMouseUp);
    return () => window.removeEventListener("mouseup", handleNodeMouseUp);
  }, []);

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    const pos: Record<string, { x: number; y: number }> = {};
    knowledgeNodes.forEach((n) => {
      pos[n.id] = { x: n.x, y: n.y };
    });
    setNodePositions(pos);
  };

  return (
    <section id="knowledge" className="section-anchor py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-3">
            <Brain className="w-4 h-4 text-[var(--gold)]" />
            <span className="text-xs font-medium">
              {t("الخريطة المعرفية التفاعلية", "Interactive Knowledge Map")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t(
              "خريطة معرفية لتدفق البحث",
              "Knowledge Map of Research Flow"
            )}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "رسم شبكي يوضح العلاقة بين المشكلة البحثية والأدبيات والفرضيات والمنهجية والنتائج والتوصيات. اسحب العقد لإعادة ترتيبها، واستخدم أزرار التكبير، وانقر على أي عقدة لعرض التفاصيل.",
              "A network graph showing relationships between research problem, literature, hypotheses, methodology, results, and recommendations. Drag nodes to rearrange, use zoom controls, click any node for details."
            )}
          </p>
        </motion.div>

        <Card className="glass overflow-hidden">
          <CardContent className="p-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-3 border-b border-border/40 bg-muted/20">
              <div className="flex items-center gap-2 flex-wrap">
                {Object.entries(typeLabels).map(([type, label]) => (
                  <div key={type} className="flex items-center gap-1.5 text-xs">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ background: typeColors[type as KNode["type"]] }}
                    />
                    <span className="text-muted-foreground">
                      {lang === "ar" ? label.ar : label.en}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))}
                  className="h-8 w-8"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-xs text-muted-foreground w-12 text-center counter-num">
                  {(zoom * 100).toFixed(0)}%
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
                  className="h-8 w-8"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetView}
                  className="h-8 w-8"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Graph */}
            <div
              className="relative w-full overflow-hidden"
              style={{ height: "560px", cursor: isPanning ? "grabbing" : "grab" }}
              onMouseDown={handleMouseDown}
              onMouseMove={(e) => {
                handleMouseMove(e);
                handleNodeMouseMove(e);
              }}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <svg
                ref={svgRef}
                viewBox="0 0 100 100"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {Object.entries(typeColors).map(([type, color]) => (
                    <radialGradient key={type} id={`grad-${type}`}>
                      <stop offset="0%" stopColor={color} stopOpacity={0.5} />
                      <stop offset="100%" stopColor={color} stopOpacity={0.1} />
                    </radialGradient>
                  ))}
                </defs>

                <g
                  transform={`translate(${pan.x / 5} ${pan.y / 5}) scale(${zoom})`}
                  style={{ transformOrigin: "center" }}
                >
                  {/* Edges */}
                  {knowledgeEdges.map((edge, i) => {
                    const from = nodePositions[edge.from];
                    const to = nodePositions[edge.to];
                    if (!from || !to) return null;
                    const fromNode = knowledgeNodes.find((n) => n.id === edge.from);
                    const toNode = knowledgeNodes.find((n) => n.id === edge.to);
                    const color = typeColors[fromNode?.type || "problem"];
                    return (
                      <g key={i}>
                        <line
                          x1={from.x}
                          y1={from.y}
                          x2={to.x}
                          y2={to.y}
                          stroke={color}
                          strokeWidth={0.3}
                          strokeOpacity={0.6}
                          strokeDasharray="0.5 0.5"
                        />
                        {/* Animated pulse along edge */}
                        <circle r="0.4" fill={color} opacity={0.8}>
                          <animate
                            attributeName="cx"
                            values={`${from.x};${to.x}`}
                            dur={`${3 + i * 0.3}s`}
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="cy"
                            values={`${from.y};${to.y}`}
                            dur={`${3 + i * 0.3}s`}
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                    );
                  })}

                  {/* Nodes */}
                  {knowledgeNodes.map((node) => {
                    const pos = nodePositions[node.id];
                    const color = typeColors[node.type];
                    const isSelected = selected?.id === node.id;
                    const radius = node.type === "problem" ? 5 : 3.5;
                    return (
                      <g
                        key={node.id}
                        className="cursor-pointer"
                        onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(node);
                        }}
                        style={{ cursor: dragNode === node.id ? "grabbing" : "grab" }}
                      >
                        {/* Glow ring */}
                        {(isSelected || node.type === "problem") && (
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={radius + 1.5}
                            fill="none"
                            stroke={color}
                            strokeWidth={0.3}
                            strokeOpacity={0.5}
                          >
                            {node.type === "problem" && (
                              <animate
                                attributeName="r"
                                values={`${radius};${radius + 2};${radius}`}
                                dur="2s"
                                repeatCount="indefinite"
                              />
                            )}
                          </circle>
                        )}
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={radius}
                          fill={`url(#grad-${node.type})`}
                          stroke={color}
                          strokeWidth={isSelected ? 0.6 : 0.3}
                        />
                        <text
                          x={pos.x}
                          y={pos.y + radius + 2}
                          textAnchor="middle"
                          style={{
                            fontSize: node.type === "problem" ? 2 : 1.6,
                            fill: "var(--foreground)",
                            fontWeight: node.type === "problem" ? 700 : 500,
                            pointerEvents: "none",
                          }}
                        >
                          {lang === "ar" ? node.labelAr : node.labelEn}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>

              {/* Hint */}
              <div className="absolute bottom-3 left-3 text-xs text-muted-foreground glass rounded-lg px-3 py-1.5 flex items-center gap-2">
                <Info className="w-3 h-3" />
                {t("اسحب للتحريك · انقر للتفاصيل", "Drag to pan · Click for details")}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected node detail */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4"
            >
              <Card className="glass">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `color-mix(in oklch, ${typeColors[selected.type]} 20%, transparent)`,
                        color: typeColors[selected.type],
                      }}
                    >
                      <Brain className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: `color-mix(in oklch, ${typeColors[selected.type]} 20%, transparent)`,
                            color: typeColors[selected.type],
                          }}
                        >
                          {lang === "ar"
                            ? typeLabels[selected.type].ar
                            : typeLabels[selected.type].en}
                        </span>
                        <h3 className="text-lg font-bold">
                          {lang === "ar" ? selected.labelAr : selected.labelEn}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {lang === "ar" ? selected.detailAr : selected.detailEn}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
