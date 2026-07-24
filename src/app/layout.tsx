import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n-context";
import { VisitorProvider } from "@/lib/visitor-context";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "حوكمة الذكاء الاصطناعي | AI Governance Research",
  description:
    "إنفوجرافيك تفاعلي لبحث: توجهات استخدام الحوكمة بالذكاء الاصطناعي لدى شركات القطاع الصناعي المدرجة في بورصة فلسطين - نموذج TOE-C",
  keywords: [
    "AI Governance",
    "TOE-C",
    "PLS-SEM",
    "Palestine Stock Exchange",
    "حوكمة الذكاء الاصطناعي",
    "بورصة فلسطين",
  ],
  authors: [{ name: "Izzeldeen Sameer Mohammad Basha" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${inter.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <I18nProvider>
            <VisitorProvider>
              {children}
              <Toaster />
            </VisitorProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
