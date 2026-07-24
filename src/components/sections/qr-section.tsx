"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";
import { Card, CardContent } from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, QrCode, Copy, Check } from "lucide-react";

export function QRSection() {
  const { t, lang } = useI18n();
  const [url, setUrl] = useState("https://example.com/aig-research");
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const handleDownload = () => {
    const svg = svgRef.current?.querySelector("svg");
    if (!svg) return;

    // Convert SVG to PNG via canvas
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const size = 1024;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // White background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    const img = new Image();
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const urlObj = URL.createObjectURL(blob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(urlObj);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const link = document.createElement("a");
        link.download = "aig-research-qr.png";
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 2000);
      });
    };
    img.src = urlObj;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="qr" className="section-anchor py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-3">
            <QrCode className="w-4 h-4 text-[var(--gold)]" />
            <span className="text-xs font-medium">
              {t("رمز QR للمشاركة", "QR Code for Sharing")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t("امسح الرمز لمشاركة البحث", "Scan to Share the Research")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "اطبع هذا الرمز على البوستر العلمي ليتمكن الحضور من الوصول إلى الإنفوجرافيك التفاعلي مباشرةً من هواتفهم.",
              "Print this code on the academic poster so attendees can access the interactive infographic directly from their phones."
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* QR Code */}
          <Card className="glass">
            <CardContent className="p-6 flex flex-col items-center">
              <div
                ref={svgRef}
                className="bg-white p-4 rounded-2xl shadow-lg"
                style={{ width: 280, height: 280 }}
              >
                <QRCodeSVG
                  value={url}
                  size={248}
                  level="H"
                  fgColor="#1a1a2e"
                  bgColor="#ffffff"
                  marginSize={0}
                  imageSettings={{
                    src:
                      "data:image/svg+xml;base64," +
                      btoa(
                        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="#d4af37"/><text x="20" y="27" text-anchor="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold">AI</text></svg>'
                      ),
                    height: 40,
                    width: 40,
                    excavate: true,
                  }}
                />
              </div>
              <div className="mt-4 text-center">
                <div className="text-xs text-muted-foreground mb-2">
                  {t("رابط الموقع", "Site URL")}
                </div>
                <div className="font-mono text-xs glass rounded-lg px-3 py-1.5 max-w-full overflow-hidden text-ellipsis">
                  {url}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customization & Actions */}
          <Card className="glass">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">
                  {t("خيارات التخصيص", "Customization Options")}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {t(
                    "الرمز مُحسّن بدقة عالية (1024×1024 بكسل) للطباعة على البوسترات العلمية. يحتوي على شعار «AI» في المنتصف ويعمل في وضع التصحيح العالي (H) لضمان قابلية القراءة حتى عند الطباعة بأحجام صغيرة.",
                    "The code is high-resolution (1024×1024 px) for printing on academic posters. Contains an «AI» logo in the center and uses high error correction (H) to ensure readability even at small print sizes."
                  )}
                </p>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleDownload}
                  className="w-full"
                  size="lg"
                  variant={downloaded ? "secondary" : "default"}
                >
                  {downloaded ? (
                    <>
                      <Check className="w-4 h-4" />
                      {t("تم التحميل!", "Downloaded!")}
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      {t("تحميل رمز QR (PNG)", "Download QR (PNG)")}
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      {t("تم النسخ!", "Copied!")}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      {t("نسخ الرابط", "Copy URL")}
                    </>
                  )}
                </Button>
              </div>

              <div className="border-t pt-4 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>{t("مستوى التصحيح:", "Error Correction:")}</span>
                  <span className="font-mono font-bold">H (30%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t("الدقة:", "Resolution:")}</span>
                  <span className="font-mono font-bold">1024 × 1024 px</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t("شعار مركز:", "Center Logo:")}</span>
                  <span className="font-mono font-bold">AI (gold)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t("الترميز:", "Encoding:")}</span>
                  <span className="font-mono font-bold">UTF-8</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
