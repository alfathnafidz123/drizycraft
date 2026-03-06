import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface DownloadProgressModalProps {
  open: boolean;
  progress: number;
}

const DownloadProgressModal = ({
                                 open,
                                 progress,
                               }: DownloadProgressModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
        <h3 className="text-lg font-semibold text-center">
          Downloading File
        </h3>

        <p className="text-sm text-gray-500 text-center mt-1">
          Please wait, do not close this tab
        </p>

        <div className="mt-5">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-sm text-center text-gray-600">
            {progress}%
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DownloadProgressModal;
