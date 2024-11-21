import Lottie from 'react-lottie';

import animationData from '~/lottie/005_CHECKOUT-600px.json';

const CartLottie = () => {
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

export default CartLottie;
