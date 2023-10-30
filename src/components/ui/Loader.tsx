import {Loader2} from "lucide-react";

const LoadingComponent = ({ isLoading }:any) => {
  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-primary z-50">
          <Loader2 className="text-center animate-spin text-tertiary h-[60px] w-[60px]"/>
        </div>
      )}
    </>
  );
};

export default LoadingComponent;
