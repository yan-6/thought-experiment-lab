import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thought Experiment Lab",
  description: "改变一个变量，运行另一个世界。A world simulation interface for structured thought experiments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-lab-bg text-lab-text min-h-screen bg-grid bg-noise scanlines antialiased">
        {children}
      </body>
    </html>
  );
}