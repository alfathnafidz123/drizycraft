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
}

const PixelEventsHooks = () => {
  const { dataUser } = useAppSelector(state => state.user);
  const trackEvent = async (event: EventsEnum, data: any) => {
    const { default: ReactPixel } = await import("react-facebook-pixel");
    const defaultData = {
      id: dataUser?.id,
      email: dataUser?.email,
      username: dataUser?.username,
      displayName: dataUser?.displayName,
    }
    ReactPixel.init(`${process.env.NEXT_PUBLIC_META_PIXEL}`);
    ReactPixel.track(event, { ...defaultData, ...data });
  };

  return {
    trackEvent
  }
};

export default PixelEventsHooks;