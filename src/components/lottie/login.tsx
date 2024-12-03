import logger from '@/lib/logger';
import { useState, useEffect } from 'react';
import Lottie from 'react-lottie';

const LoginLottie = () => {
  const [animationData, setAnimationData] = useState<any>();

  useEffect(() => {
    fetch("https://media.drizycraft.com/001_LOGIN-600px.json")
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

export default LoginLottie;
