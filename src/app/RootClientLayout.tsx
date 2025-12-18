"use client";

import { useEffect } from "react";
import Script from "next/script";
import { disableConsole } from "@/lib/disableConsole";

export default function RootClientLayout({
                                           children,
                                         }: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Inisialisasi Reddit Pixel jika belum ada
    if (!window.rdt) {
      window.rdt = function (...args: any[]) {
        (window.rdt.q = window.rdt.q || []).push(args);
      };
    }

    // Ganti dengan Pixel ID kamu
    window.rdt("init", "a2_htzuvnir9v2p");

    // Kirim event PageVisit setiap kali halaman dimuat
    window.rdt("track", "PageVisit");
  }, []);

  disableConsole();

  return (
    <>
      <Script id="reddit-pixel" strategy="afterInteractive">
        {`
        !function (w, d) {
          if (!w.rdt) {
            var p = w.rdt = function (...args) {
              if (p.sendEvent) {
                p.sendEvent.apply(p, args);
              } else {
                p.callQueue.push(args);
              }
            };
            p.callQueue = [];
            var s = d.createElement("script");
            s.src = "https://www.redditstatic.com/ads/pixel.js";
            (d.head || d.body).appendChild(s);
          }
        }(window, document);
        `}
      </Script>
      {children}
    </>
  );
}
