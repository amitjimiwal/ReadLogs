import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface Props {
  number?: number;
}
const LoadingSkeleton: React.FC<Props> = ({ number }) => {
  return (
    <div className="bg-white p-4">
      <Skeleton height={40} baseColor="#f0f5f9" width="100%" />
      <Skeleton
        height={30}
        count={number || 5}
        width="100%"
        baseColor="#f0f5f9"
        className="my-3"
      />
    </div>
  );
};

export default LoadingSkeleton;
