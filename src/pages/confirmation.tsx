import { useState, useEffect } from "react";
import { Loader2, BadgeCheck, BadgeX } from "lucide-react";
import Navbar from "../components/Navbar";
import LayoutComponent from "../components/ui/layoutSpecialists";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/motions";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { formatDayinString, formatTimeinString } from "../lib/utils";
import { Link } from "../components/ui/Button";
import axios from "axios";

interface ResponseSessions {
  specialist_name: string;
  service_name: string;
  date_meet: Date;
  duration: number;
  link_meet: string;
}

const Confirmation = () => {
  const [LoadingState, setLoadingState] = useState<boolean>(true);
  const user = useSelector((state: any) => state.user.user);
  const [sessions, setSessions] = useState<ResponseSessions[]>([]);
  const [paymentStatus, setPaymentStatus] = useState<string>("");

  // useLocation hook to access the current URL
  const location = useLocation();

  // Function to parse query parameters
  const getQueryParams = (query: any) => {
    return new URLSearchParams(query);
  };

  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    const status = queryParams.get("status");

    if (status) {
      setPaymentStatus(status);
    }

    const externalReference = queryParams.get("externalReference");
    if (status == "approved" && externalReference) {
      getSessionsCreated(externalReference);
    } else {
      const timeoutId = setTimeout(() => {
        setLoadingState(false);
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [location.search]);

  const getSessionsCreated = async (externalReference: string) => {
    const jwt_token = localStorage.getItem("jwt_token");
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + jwt_token,
        },
      };

      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL +
          "/api/web/sessions?" +
          externalReference,
        config,
      );
      setSessions(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.messages);
          console.log(error.response.data);
        } else {
          toast.error("Ha habido un problema trayendo tus sesiones");
        }
      }
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <>
      <Navbar />
      <LayoutComponent step={3}>
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
              <h2 className={`${styles.heroBlockText} font-bold`}>
                {user?.name}
              </h2>
              <h2 className={`${styles.heroSubText}`}>
                {paymentStatus == "approved" ? (
                  <BadgeCheck className="h-10 w-10" />
                ) : (
                  <BadgeX className="h-10 w-10" />
                )}
              </h2>
              <p className={`${styles.cardSubHeadText} text-secondary`}>
                {paymentStatus == "approved"
                  ? "Felicidades tu compra ha sido exitosa"
                  : "Tu compra ha sido rechazada, intenta otro medio de pago"}
              </p>
              {paymentStatus == "approved" ? (
                <>
                  <p className={`${styles.cardSubHeadText} text-secondary`}>
                    {
                      "Muchas gracias por tu compra, puedes ver tus sesiones en el panel de sesiones"
                    }
                  </p>
                  <div className="w-full flex justify-start items-center mx-auto">
                    <Link
                      href={import.meta.env.VITE_BACKEND_URL + "/user-meets"}
                      variant="dark"
                      className="mt-2"
                    >
                      Mis Sesiones
                    </Link>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="w-full sm:w-1/2 h-auto flex flex-col">
              <h2 className={`${styles.cardSubHeadText} text-secondary`}>
                Tus Sesiones
              </h2>
              <ul className="w-full max-h-[400px] overflow-y-auto">
                {sessions?.map((session: any, index: number) => {
                  return (
                    <li
                      key={"session_item_" + index}
                      className="relative rounded-md bg-secondary border-primary border-2 w-full h-auto shadow-lg px-3 py-2 transition-all ease-in-out duration-300"
                    >
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
                          {session.duration + " Minutos"}{" "}
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
                          {"Link de la Reunion:"}
                        </p>
                        <p className={`${styles.cardBodyText}`}>
                          {session.link_meet}
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

export default Confirmation;
