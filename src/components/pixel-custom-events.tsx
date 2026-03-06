"use client";

import { useAppSelector } from "@/lib/store";

// === 🔹 1. ENUM UNTUK META PIXEL ===
export enum EventsEnum {
  AddToCart = "Add To Cart",
  InitCheckout = "Initiate Checkout",
  InitCheckoutMembership = "Initiate Checkout Membership",
  Purchase = "Purchase",
  Search = "Search",
  Subscribe = "Subscribe",
  Lead = "Lead",
  Download = "Download",
  StartTrial = "Start Trial",
  CompleteRegistration = "Complete Registration",
  Contact = "Contact",
  AddPaymentInfo = "Add Payment Info",
}

// === 🔹 2. ENUM UNTUK REDDIT PIXEL ===
export enum RedditEventsEnum {
  PageVisit = "PageVisit",
  ViewContent = "ViewContent",
  AddToCart = "AddToCart",
  Purchase = "Purchase",
  Search = "Search",
  SignUp = "SignUp",
  Lead = "Lead",
  ViewCategory = "ViewCategory",
  CustomEvent = "CustomEvent",
}

// === 🔹 3. HOOK UTAMA ===
export default function PixelEventsHooks() {
  const { dataUser } = useAppSelector((state) => state.user);

  // === 🧩 Init Reddit Pixel ===
  const initRedditPixel = () => {
    if (typeof window === "undefined") return;

    if (!(window as any).rdt) {
      (function (w: any, d: any) {
        const r = (w.rdt = function (...args: any[]) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line prefer-spread
          r.sendEvent ? r.sendEvent.apply(r, args) : r.callQueue.push(args);
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        r.callQueue = [];
        const t = d.createElement("script");
        t.src = "https://www.redditstatic.com/ads/pixel.js";
        t.async = true;
        const s = d.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(t, s);
      })(window, document);
    }

    (window as any).rdt("init", process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID, {
      email: dataUser?.email
        ? dataUser.email.trim().toLowerCase()
        : undefined,
    });
  };

  // === 🧩 4. Fungsi trackEvent ===
  const trackEvent = async (
    event:
      | EventsEnum
      | RedditEventsEnum
      | { meta?: EventsEnum; reddit?: RedditEventsEnum },
    data: any = {}
  ) => {
    const defaultData = {
      id: dataUser?.id,
      email: dataUser?.email,
      username: dataUser?.username,
      displayName: dataUser?.displayName,
    };

    // Jika event dari Meta Pixel
    if (
      typeof event === "string" &&
      Object.values(EventsEnum).includes(event as EventsEnum)
    ) {
      const { default: ReactPixel } = await import("react-facebook-pixel");
      ReactPixel.init(`${process.env.NEXT_PUBLIC_META_PIXEL}`);
      ReactPixel.track(event, { ...defaultData, ...data });
      console.log("✅ Meta Pixel event sent:", event);
    }

    // Jika event dari Reddit Pixel
    if (
      typeof event === "string" &&
      Object.values(RedditEventsEnum).includes(event as RedditEventsEnum)
    ) {
      initRedditPixel();
      if (typeof window !== "undefined" && (window as any).rdt) {
        (window as any).rdt("track", event);
        console.log("✅ Reddit Pixel event sent:", event);
      }
    }

    // Jika kombinasi event { meta, reddit }
    if (typeof event === "object") {
      if (event.meta) {
        const { default: ReactPixel } = await import("react-facebook-pixel");
        ReactPixel.init(`${process.env.NEXT_PUBLIC_META_PIXEL}`);
        ReactPixel.track(event.meta, { ...defaultData, ...data });
        console.log("✅ Meta Pixel event sent:", event.meta);
      }
      if (event.reddit) {
        initRedditPixel();
        if (typeof window !== "undefined" && (window as any).rdt) {
          (window as any).rdt("track", event.reddit);
          console.log("✅ Reddit Pixel event sent:", event.reddit);
        }
      }
    }
  };

  return {
    trackEvent,
  };
};

// export default PixelEventsHooks;
