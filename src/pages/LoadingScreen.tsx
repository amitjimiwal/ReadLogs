import { useEffect, useState } from "react";
export default function LoadingScreen() {
  const [loadingTime, setLoadingTime] = useState<number>(10);
  useEffect(() => {
    const intervalID = setInterval(() => {
      setLoadingTime((prev) => (prev + 10) % 100);
    }, 2000);
    return () => clearInterval(intervalID);
  }, []);
  return (
    <div className="w-full h-screen bg-black">
      <div className="flex flex-col items-center justify-center h-full">
        <MountainIcon className="h-16 w-16 text-white" />
        <p className="mt-4 text-white text-lg">Loading...</p>
        <div className="mt-8 w-44 h-1 bg-gray-700">
          <div className={`h-full bg-white w-[${loadingTime | 50}%]`}/>
        </div>
      </div>
    </div>
  );
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
