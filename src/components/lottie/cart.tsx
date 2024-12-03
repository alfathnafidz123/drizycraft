import logger from '@/lib/logger';
import { useState, useEffect } from 'react';
import Lottie from 'react-lottie';

const CartLottie = () => {
  const [animationData, setAnimationData] = useState<any>();

  useEffect(() => {
    fetch("https://media.drizycraft.com/005_CHECKOUT-600px.json")
      .then((data) => data.json())
      .then((json) => {
        setAnimationData(json);
      })
      .catch((err) => {
        logger('err');
      });
  }, []);

  if (!animationData) return null;

  return <Lottie options={{
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }} />;
};

export default CartLottie;
