import Lottie from 'react-lottie';

import animationData from '~/lottie/001_LOGIN-600px.json';

const LoginLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return <Lottie options={defaultOptions} />;
};

export default LoginLottie;
