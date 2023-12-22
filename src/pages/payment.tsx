import { useState, useEffect, useCallback } from "react";
import { Loader2, X } from "lucide-react";
import Navbar from "../components/Navbar";
import LayoutComponent from "../components/ui/layoutSpecialists";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/motions";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  formatDayinString,
  formatTimeinString,
  calculateTotalAmount,
} from "../lib/utils";
import { Button, Link } from "../components/ui/Button";
import axios from "axios";

interface DiscountProps {
  discount_id: number;
  discount_code: string;
  discount_amount: number;
}

const Payment = () => {
  const [LoadingState, setLoadingState] = useState<boolean>(true);
  const [LoadingProcess, setLoadingProcess] = useState<boolean>(false);
  const dispatch = useDispatch();
  const sessions = useSelector((state: any) => state.cart.cart);
  const user = useSelector((state: any) => state.user.user);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoadingState(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleRemoveSession = useCallback(
    (IndexSession: number) => {
      dispatch({ type: "REMOVE_FROM_CART", payload: IndexSession });
    },
    [sessions],
  );

  const makePayment = useCallback(() => {
    setLoadingProcess(true);
    if (!sessions || sessions.length === 0) {
      toast.error("Tienes que tener almenos una sesion para proceder a pagar");
      return;
    }

    /*if (!user) {
      toast.error("Tienes que Iniciar Session para poder pagar");
      return;
    }*/

    createOrderToServer();
  }, [sessions]);

  const [discountCode, setDiscountCode] = useState<DiscountProps>({
    discount_id: 0,
    discount_code: "",
    discount_amount: 0,
  });

  const handleChangeDiscount = (event: any) => {
    const { target } = event;
    const { value } = target;
    setDiscountCode({ ...discountCode, discount_code: value });
  };

  const [LoadingDiscount, setLoadingDiscount] = useState<boolean>(false);

  const checkDiscount = async () => {
    setLoadingDiscount(true);

    if (discountCode.discount_code.length == 0) {
      toast.error("Ingresa el codigo de descuento");
      setLoadingDiscount(false);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: import.meta.env.VITE_FORM_UATH_TOKEN,
        },
      };
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/web/discount-code",
        { discount_code: discountCode.discount_code },
        config,
      );
      setDiscountCode(response.data);
      toast.success("Codigo de Descuento Valido");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Ha habido un problem validando el codigo de descuento");
        }
      }
    } finally {
      setLoadingDiscount(false);
    }
  };

  const createOrderToServer = async () => {
    //const jwt_token = localStorage.getItem("jwt_token");
    try {
      /*const config = {
        headers: {
          Authorization: "Bearer " + jwt_token,
        },
      };*/

      const body = {
        sessions: sessions,
        discount: discountCode,
      };

      console.log(body);

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/web/make-order",
        body,
        // config,
      );
      //toast.success("Procesando");
      const redirectUrl = response.data.init_point; // assuming this is the URL you want to redirect to
      if (redirectUrl) {
        window.location.href = redirectUrl; // This will redirect to the external URL
        // or use history.push('/your-internal-route') for internal navigation
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.message);
          console.log(error.response.data);
        } else {
          toast.error("Ha habido un problema validando la solicitud");
        }
      }
    } finally {
      setLoadingProcess(false);
    }
  };

  const calculateTotalAmountWithDiscount = () => {
    let discountedPrice = Number(calculateTotalAmount(sessions));

    if (discountCode.discount_amount < 100) {
      discountedPrice =
        discountedPrice * (1 - discountCode.discount_amount / 100);
    } else {
      discountedPrice = 0;
    }
    return discountedPrice;
  };

  return (
    <>
      <Navbar />
      <LayoutComponent step={2}>
        {LoadingState ? (
          <div className="w-full h-full flex flex-row justify-center items-center">
            <Loader2 className="text-secondary h-16 w-16 animate-spin" />
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn("up", "", 0.5, 0.75)}
            className={`${styles.padding} max-w-7xl mx-auto relative z-2 flex flex-col sm:flex-row w-full h-auto bg-tertiary rounded-md`}
          >
            <div className="w-full sm:w-1/2 h-auto flex flex-col">
              <h2 className={`${styles.heroSubText}`}>Hola </h2>
              {!user ? (
                <>
                  <p className={`${styles.cardSubHeadText} text-secondary`}>
                    {"Aplica un codigo de descuento si tienes"}
                  </p>
                  <div className="flex flex-row mt-2 w-full gap-2">
                    <input
                      type="text"
                      name="name"
                      value={discountCode.discount_code}
                      onChange={handleChangeDiscount}
                      placeholder="Codigo"
                      className="bg-secondary py-2 px-6 text-primary placeholder:text-white rounded-lg font-small sm:font-medium
                          transition-color focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2
                        "
                    />
                    <Button
                      variant="dark"
                      onClick={() => checkDiscount()}
                      isLoading={LoadingDiscount}
                    >
                      Aplicar
                    </Button>
                  </div>
                  <h2 className={`${styles.heroBlockText} font-bold`}>
                    {user?.name}
                  </h2>
                  <p className={`${styles.cardSubHeadText} text-secondary`}>
                    {"Aqui puedes ver el total de tu pedido"}
                  </p>
                  <h2 className={`${styles.cardSubHeadText} text-secondary`}>
                    El Total es
                  </h2>
                  <h2 className={`${styles.heroSubText}`}>
                    {"S/." + calculateTotalAmountWithDiscount() + ".00"}
                  </h2>
                  <p className={`${styles.cardSubHeadText} text-secondary`}>
                    {"Haz click en ir a pagar para realizar el pago"}
                  </p>
                  <div className="w-full flex justify-start items-center mx-auto">
                    <Button
                      onClick={() => makePayment()}
                      variant="dark"
                      className="mt-2"
                      isLoading={LoadingProcess}
                    >
                      Ir a Pagar
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className={`${styles.cardSubHeadText} text-secondary`}>
                    {"Primero Inicia Sesion antes de completar tu pedido"}
                  </p>
                  <div className="w-full flex justify-start items-center mx-auto">
                    <Link
                      href={import.meta.env.VITE_BACKEND_URL + "/login"}
                      variant="dark"
                      className="mt-2"
                    >
                      Inicia Sesion
                    </Link>
                  </div>
                </>
              )}
            </div>
            <div className="w-full sm:w-1/2 h-auto flex flex-col">
              <h2 className={`${styles.cardSubHeadText} text-secondary`}>
                Tus Sesiones
              </h2>
              <ul className="w-full max-h-[400px] overflow-y-auto">
                {sessions.map((session: any, index: number) => {
                  return (
                    <li
                      key={"session_item_" + index}
                      className="relative rounded-md bg-secondary border-primary border-2 w-full h-auto shadow-lg px-3 py-2 transition-all ease-in-out duration-300"
                    >
                      <div
                        className="absolute top-1 right-1 text-primary hover:text-tertiary cursor-pointer hover:scale-110 transition-all ease-in-out duration-300"
                        onClick={() => handleRemoveSession(index)}
                      >
                        <X />
                      </div>
                      <div className="flex flex-row gap-2">
                        <p className={`${styles.cardBodyText} font-bold`}>
                          {"Consultor:"}
                        </p>
                        <p className={`${styles.cardBodyText}`}>
                          {session.specialist_name}
                        </p>
                      </div>
                      <div className="flex flex-row gap-2">
                        <p className={`${styles.cardBodyText} font-bold`}>
                          {"Servicio:"}
                        </p>
                        <p className={`${styles.cardBodyText}`}>
                          {session.service_name}
                        </p>
                      </div>
                      <div className="flex flex-row gap-2">
                        <p className={`${styles.cardBodyText} font-bold`}>
                          {"Tiempo del Servicio:"}
                        </p>
                        <p className={`${styles.cardBodyText}`}>
                          {session.option.duration + " Minutos"}{" "}
                        </p>
                      </div>
                      <div className="flex flex-row gap-2">
                        <p className={`${styles.cardBodyText} font-bold`}>
                          {"Fecha de Sesion:"}
                        </p>
                        <p className={`${styles.cardBodyText}`}>
                          {formatDayinString(session.datetime)}
                        </p>
                      </div>
                      <div className="flex flex-row gap-2">
                        <p className={`${styles.cardBodyText} font-bold`}>
                          {"Hora de Sesion:"}
                        </p>
                        <p className={`${styles.cardBodyText}`}>
                          {formatTimeinString(session.datetime)}
                        </p>
                      </div>
                      <div className="flex flex-row gap-2">
                        <p className={`${styles.cardBodyText} font-bold`}>
                          {"Costo del Servicio:"}
                        </p>
                        <p className={`${styles.cardBodyText}`}>
                          {"S/." + session.option.price + ".00"}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </LayoutComponent>
    </>
  );
};

export default Payment;
