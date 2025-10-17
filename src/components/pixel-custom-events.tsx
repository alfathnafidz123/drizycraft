"use client";

import { useAppSelector } from "@/lib/store";

export enum EventsEnum {
  AddToCart = "Add to Cart",
  InitCheckout = "Initiate Checkout",
  InitCheckoutMembership = "Initiate Checkout Membership",
  Purchase = "Purchase",
  Search = "Search",
  Subscribe = "Membership",
  Lead = "Lead",
  Download = "Download",
  StartTrial = "Start Trial",
  CompleteRegistration = "Complete Registration",
  Contact = "Contact",
  AddPaymentInfo = "Add payment info",

}

const PixelEventsHooks = () => {
  const { dataUser } = useAppSelector(state => state.user);

  // === 🔸 Kirim event ke Reddit Conversion API (langsung dari client) ===
  const redditConversionApi = async (event: EventsEnum, data: any) => {
    try {
      const res = await fetch("/api/reddit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pixelId: process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID,
          eventName: event,
          eventData: data,
        }),
      });
      const json = await res.json();
      console.log("✅ Reddit Pixel event sent:", json);
    } catch (error) {
      console.error("❌ Reddit Pixel error:", error);
    }
  };

  const trackEvent = async (event: EventsEnum, data: any) => {
    const { default: ReactPixel } = await import("react-facebook-pixel");
    const defaultData = {
      id: dataUser?.id,
      email: dataUser?.email,
      username: dataUser?.username,
      displayName: dataUser?.displayName,
    }
    const redditData = {
      email: dataUser?.email
    }
    ReactPixel.init(`${process.env.NEXT_PUBLIC_META_PIXEL}`);
    ReactPixel.track(event, { ...defaultData, ...data });
    await redditConversionApi(event, { ...redditData });
  };

  return {
    trackEvent
  }
};

export default PixelEventsHooks;