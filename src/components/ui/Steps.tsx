import { useState } from "react";
import { Link } from "./Button";
import { useSelector } from "react-redux";
import CartMenu from "./Cart";

interface StepProp {
  step: number;
}

const StepsComponent = (props: StepProp) => {
  const sessions = useSelector((state: any) => state.cart.cart);

  const { step } = props;
  return (
    <div className="w-full h-32 sm:h-24">
      <div className="w-full h-auto py-4 sm:py-0 flex justify-between">
        {step === 1 && sessions.length > 0 && (
          <>
            <Link href="/#specialists" variant="disabled">
              {" "}
              Atras{" "}
            </Link>
            <div className="flex w-auto flex-row justify-between">
              <CartMenu />
              <Link href="/#payment" variant="dark" className="px-6 text-xs">
                Ir a Pagar
              </Link>
            </div>
          </>
        )}

        {step === 1 && sessions.length === 0 && (
          <>
            <Link href="/#specialists" variant="disabled">
              {" "}
              Atras{" "}
            </Link>

            <div className="flex w-auto flex-row justify-between">
              <CartMenu />
              <Link
                href="/#payment"
                variant="disabled"
                className="px-6 text-xs"
              >
                Ir a Pagar
              </Link>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <Link href="/#specialists" variant="dark">
              Atras{" "}
            </Link>
          </>
        )}
      </div>
      <ul className="w-full h-auto flex justify-center items-center">
        <li className="w-10 h-1 border-tertiary border-2"></li>
        <li
          className={`${
            step == 1
              ? "bg-secondary text-primary"
              : "bg-primary text-secondary"
          } h-10 w-10 rounded-full  border-secondary border-2  text-center flex items-center justify-center`}
        >
          {1}
        </li>
        <li className="w-4 sm:w-16 h-1 border-tertiary border-2"></li>
        <li
          className={`${
            step == 2
              ? "bg-secondary text-primary"
              : "bg-primary text-secondary"
          } h-10 w-10 rounded-full  border-secondary border-2  text-center flex items-center justify-center`}
        >
          {2}
        </li>
        <li className="w-4 sm:w-16 h-1 border-tertiary border-2"></li>
        <li
          className={`${
            step == 3
              ? "bg-secondary text-primary"
              : "bg-primary text-secondary"
          } h-10 w-10 rounded-full  border-secondary border-2  text-center flex items-center justify-center`}
        >
          {3}
        </li>
        <li className="w-10 h-1 border-tertiary border-2"></li>
      </ul>
    </div>
  );
};

export default StepsComponent;
