import { Loader } from "lucide-react";

const LoadingComponent = () => {
  return <div className="flex w-screen h-screen items-center justify-center">
    <Loader className="animate-spin" />
  </div>
}

export default LoadingComponent;