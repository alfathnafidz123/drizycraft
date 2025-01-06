'use client';

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ChristmasBanner = dynamic(() => import('@/components/modals/christmas-soon'));
const CampaignWrapper = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const to = setTimeout(() => {
      setShow(true);
    }, 15000);

    return () => clearTimeout(to);
  }, []);

  return show ? <ChristmasBanner onClose={() => setShow(false)} open={show} /> : null;
}

export default CampaignWrapper;