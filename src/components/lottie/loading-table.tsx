import Lottie from 'react-lottie';

import animationData from '~/lottie/empty.json'

const LoadingTable = () => {

  return <Lottie options={{
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }} />;
};

export default LoadingTable;
