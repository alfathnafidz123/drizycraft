import Lottie from 'react-lottie';

import animationData from '~/lottie/006_CUSTOMER SUPPORT-600px.json';

const CustomerSupportLottie = () => {
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

export default CustomerSupportLottie;
