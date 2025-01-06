'use client'

import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';

import logger from '@/lib/logger';

const ProfileLottie = () => {
  const [animationData, setAnimationData] = useState<any>();

  useEffect(() => {
    fetch("https://media.drizycraft.com/002_EDIT_MY_ACCOUNT-600px.json")
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

export default ProfileLottie;
