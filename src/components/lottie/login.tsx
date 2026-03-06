import logger from "@/lib/logger";
import { useState, useEffect } from "react";
import Lottie from "react-lottie";

let cachedAnimation: any = null;
let loadingPromise: Promise<any> | null = null;

export const preloadLoginLottie = async () => {
  if (cachedAnimation) return cachedAnimation;

  if (!loadingPromise) {
    loadingPromise = fetch("https://media.drizycraft.com/001_LOGIN-600px.json")
      .then((res) => res.json())
      .then((json) => {
        cachedAnimation = json;
        return json;
      })
      .catch((err) => {
        logger(err);
      });
  }

  return loadingPromise;
};

const LoginLottie = () => {
  const [animationData, setAnimationData] = useState<any>(cachedAnimation);

  useEffect(() => {
    if (cachedAnimation) return;

    preloadLoginLottie().then((json) => {
      if (json) setAnimationData(json);
    });
  }, []);

  if (!animationData) return null;

  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      }}
    />
  );
};

export default LoginLottie;