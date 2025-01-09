import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

export const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1400);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <RotatingLines
            strokeColor="#4682B4"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      )}
    </>
  );
};
