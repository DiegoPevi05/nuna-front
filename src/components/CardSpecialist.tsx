import {
  SpecialistProps,
  TimsheetsProps,
  Session,
  ServicesPropsSpecialist,
  ServiceOptionProps,
  ServicesProps,
} from "../lib/interfaces.ts";
import { useState, useEffect, useCallback } from "react";
import { fadeIn } from "../lib/motions";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { styles } from "../styles";
import {
  Brain,
  Briefcase,
  GraduationCap,
  Award,
  XCircle,
  Star,
  Clock,
  Banknote,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { serializedTimes, formatTimeinString } from "../lib/utils";

interface SpecialistPropsCard {
  index: number;
  specialist: SpecialistProps;
  timesheets: TimsheetsProps[];
  activeDay: Date;
  services: ServicesProps[];
  onClickSpeciality: (item: number) => void;
  sessions: Session[];
  onSetSession: (item: Session) => void;
}

const SpecialistsCard = (props: SpecialistPropsCard) => {
  const {
    index,
    specialist,
    timesheets,
    activeDay,
    services,
    onClickSpeciality,
    sessions,
    onSetSession,
  } = props;
  const [isShownCardDetail, setIsShownCardDetail] = useState<boolean>(false);

  const [Times, setTimes] = useState<string[]>([]);

  useEffect(() => {
    setTimes(serializedTimes(timesheets));
  }, [timesheets]);

  const [isShownCardHours, setIsShownCardHours] = useState<boolean>(false);

  const openHours = () => {
    setIsShownCardHours(!isShownCardHours);
  };

  const [UnitSession, setUnitSession] = useState<Session>({
    service_id: 0,
    service_name: "",
    specialist_id: 0,
    specialist_name: "",
    datetime: new Date(),
    option: { id: 0, price: 0, duration: 0 },
  });

  const [serviceSelected, setServiceSelected] = useState<number>(0);
  const [OptionsShown, setOptionsShown] = useState<ServiceOptionProps[]>([]);

  const setService = useCallback(
    (service: ServicesPropsSpecialist) => {
      setUnitSession((prevUnitSession: any) => ({
        ...prevUnitSession,
        service_id: service.id_service,
        service_name: service.name_service,
        specialist_name: specialist.name,
        specialist_id: specialist.id,
      }));
      setServiceSelected(service.id_service);
    },
    [setUnitSession],
  );

  useEffect(() => {
    if (services) {
      const service = services.find((sv) => sv.id === serviceSelected);
      if (service) {
        setOptionsShown(service.options);
      }
    }
  }, [serviceSelected, services]);

  const setOption = useCallback(
    (option: ServiceOptionProps) => {
      setUnitSession((prevUnitSession: any) => ({
        ...prevUnitSession,
        option: option,
      }));
    },
    [setUnitSession],
  );

  const setDatetime = useCallback(
    (hour: string) => {
      const [hours, minutes] = hour.split(":").map(Number);
      const newDatetime = new Date(activeDay);
      newDatetime.setHours(hours);
      newDatetime.setMinutes(minutes);
      newDatetime.setSeconds(0);
      setUnitSession((prevUnitSession: any) => ({
        ...prevUnitSession,
        datetime: newDatetime,
      }));
    },
    [setUnitSession, activeDay],
  );

  const addSession = useCallback(() => {
    if (UnitSession.service_id === 0) {
      toast.error("Selecciona una especialidad");
      return;
    }
    if (UnitSession.option.id === 0) {
      toast.error("Selecciona una opcion");
      return;
    }

    const sessionExists = sessions.some(
      (session) =>
        session.service_id === UnitSession.service_id &&
        session.datetime.getTime() === UnitSession.datetime.getTime(),
    );

    if (!sessionExists) {
      onSetSession(UnitSession);
      setUnitSession({
        service_id: 0,
        specialist_id: 0,
        specialist_name: "",
        service_name: "",
        datetime: new Date(),
        option: { id: 0, price: 0, duration: 0 },
      });
    } else {
      toast.error("Ya has agregado esa cita a tu carrito");
    }
    setIsShownCardHours(false);
  }, [UnitSession, onSetSession, setUnitSession]);

  const handleSpeciality = useCallback(
    (service_id: number) => {
      onClickSpeciality(service_id);
      setIsShownCardDetail(false);
    },
    [onClickSpeciality],
  );

  return (
    <>
      <motion.div
        key={"card_user_" + index}
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className="relative w-[250px] min-w-[250px] max-w-[250px] w-full h-[320px] bg-secondary p-[1px] rounded-[10px] shadow-lg z-[15] mx-auto"
      >
        <div className="relative bg-white rounded-[10px] py-10 px-0 h-[318px] flex flex-col">
          <img
            src={specialist.profile_image}
            alt="web-development"
            className="absolute w-36 h-36 top-[-35px] place-self-center rounded-full border-4 border-secondary object-contain"
          />
          <div className="flex flex-col items-center mt-20 px-4">
            <h4 className="text-center text-tertiary text-[16px] font-bold">
              {specialist.name}
            </h4>
            <div className="flex flex-row items-center">
              {Array.from({ length: specialist.evaluated_rate }).map(
                (_, index) => (
                  <p
                    key={index}
                    className="text-center text-secondary text-[16px] font-bold"
                  >
                    <Star />
                  </p>
                ),
              )}
            </div>

            <Button
              onClick={() => setIsShownCardDetail(!isShownCardDetail)}
              variant="dark"
              size="sm"
              className="my-2"
            >
              Ver Especialista
            </Button>
            <ul className="flex flex-row flex-wrap gap-1 justify-start mt-2 mx-auto">
              {Times.slice(0, 4).map((time, index: number) => {
                return (
                  <li
                    key={"times_specialist_" + specialist.id + "_" + index}
                    onClick={() => openHours()}
                    className={`${
                      UnitSession.datetime !== undefined &&
                      formatTimeinString(UnitSession.datetime) == time
                        ? styles.cardTimeDark
                        : styles.cardTime
                    }`}
                  >
                    {time}
                  </li>
                );
              })}
              <li
                onClick={() => openHours()}
                className={`${styles.cardSpeciality}`}
              >
                {"Ver más"}
              </li>
            </ul>
          </div>
        </div>

        <div
          key={"card_user_hours" + index}
          className={`${
            isShownCardHours
              ? "flex h-auto opacity-100 bg-secondary mt-0 shadow-lg"
              : "block mt-[-800px] h-[0] opacity-0"
          } absolute top-1/3 sm:top-1/3  left-0  right-0 sm:left-0 right-0  mx-auto  w-[300px] sm:w-[400px] rounded-[10px]  transition-all ease-in-out duration-1000 z-[50]  flex-col p-6 overflow-y-auto`}
        >
          <div
            className="absolute top-0 right-0 text-primary p-2"
            onClick={() => setIsShownCardHours(false)}
          >
            <XCircle className="h-8 w-8 hover:text-tertiary cursor-pointer transition ease-in-out duration-300" />
          </div>
          <h2 className={`${styles.cardHeadText}`}>Selecciona tu horario</h2>
          <ul className="flex flex-wrap w-full gap-2 mt-2">
            {specialist.services.map((service, index: number) => {
              return (
                <li
                  key={"specialist_services_" + index}
                  onClick={() => setService(service)}
                  className={`${
                    UnitSession.service_id !== undefined &&
                    UnitSession.service_id == service.id_service
                      ? styles.cardSpecialityDark
                      : styles.cardSpeciality
                  }`}
                >
                  {service.name_service}
                </li>
              );
            })}
          </ul>
          <h2 className={`${styles.cardHeadText}`}>Escoge una opcion</h2>
          <ul className="flex flex-wrap w-full gap-2 mt-2">
            {OptionsShown.map((option, index: number) => {
              return (
                <li
                  key={"specialist_service_option_" + index}
                  onClick={() => setOption(option)}
                  className={`${
                    UnitSession.option.id !== undefined &&
                    UnitSession.option.id == option.id
                      ? styles.cardSpecialityDark
                      : styles.cardSpeciality
                  }`}
                >
                  <div className="flex flex-row">
                    <Banknote />
                    <p>{option.price}</p>
                    <Clock />
                    <p>{option.duration}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className={`${styles.cardBodyText}`}>
            *Los precios estan en soles y el tiempo en minutos
          </p>
          <h3 className={`${styles.cardSubHeadText} `}>
            <Clock /> Horas
          </h3>
          <ul className="flex flex-row flex-wrap justify-start mt-2 mx-1 gap-2">
            {Times.map((time, index: number) => {
              return (
                <li
                  key={"times_specialist_" + specialist.id + "_" + index}
                  onClick={() => setDatetime(time)}
                  className={`${
                    UnitSession.datetime !== undefined &&
                    formatTimeinString(UnitSession.datetime) == time
                      ? styles.cardTimeDark
                      : styles.cardTime
                  }`}
                >
                  {time}
                </li>
              );
            })}
          </ul>
          <Button onClick={() => addSession()} className="mt-4">
            Agregar Session
          </Button>
        </div>
      </motion.div>
      <div
        key={"card_user_detail" + index}
        className={`${
          isShownCardDetail
            ? "flex h-auto opacity-100 bg-secondary mt-0 shadow-lg"
            : "block mt-[-800px] h-auto opacity-0"
        } absolute top-1/4 sm:top-1/4 left-0 right-0  mx-5 sm:mx-auto  max-w-[450px] max-h-[500px] sm:w-full rounded-[10px]  transition-all ease-in-out duration-1000 z-[50]  flex-col p-6 overflow-y-auto`}
      >
        <div
          className="absolute top-0 right-0 text-primary p-2"
          onClick={() => setIsShownCardDetail(false)}
        >
          <XCircle className="h-8 w-8 hover:text-tertiary cursor-pointer transition ease-in-out duration-300" />
        </div>
        <h2 className={`${styles.cardHeadText}`}>{specialist.name}</h2>
        <p className={`${styles.cardBodyText}`}>{specialist.summary}</p>

        <h3 className={`${styles.cardSubHeadText} `}>
          <Brain /> Servicios
        </h3>
        <ul className="flex flex-wrap w-full gap-2 mt-2">
          {specialist.services.map((service, index: number) => {
            return (
              <li
                key={"specialist_services_" + index}
                onClick={() => handleSpeciality(service.id_service)}
                className={`${styles.cardSpeciality}`}
              >
                {service.name_service}
              </li>
            );
          })}
        </ul>
        <h3 className={`${styles.cardSubHeadText}`}>
          <Briefcase /> Experiencia
        </h3>
        <ol className="flex flex-col w-full gap-2 mt-2">
          {specialist.experiences.map((experience, index: number) => {
            return (
              <li
                key={"specialist_experience_" + index}
                className="rounded-md bg-secondary border-primary border-2 w-full h-full shadow-lg px-2 py-1 transition-all ease-in-out duration-300"
              >
                <div className="flex flex-row gap-2">
                  <p className={`${styles.cardBodyText}`}>{experience.from}</p>
                  <p className={`${styles.cardBodyText}`}>{"-"}</p>
                  <p className={`${styles.cardBodyText}`}>
                    {experience.is_active ? "Actualmente" : experience.to}
                  </p>
                </div>
                <p className={`${styles.cardBodyText} font-bold`}>
                  {experience.header}
                </p>
                <p className={`${styles.cardBodyText}`}>
                  {experience.subheader}
                </p>
              </li>
            );
          })}
        </ol>
        <h3 className={`${styles.cardSubHeadText}`}>
          <GraduationCap /> Educacion
        </h3>
        <ul className="flex flex-wrap w-full gap-2 mt-2">
          {specialist.educations.map((education, index: number) => {
            return (
              <li
                key={"specialist_experience_" + index}
                className="rounded-md bg-secondary border-primary border-2 w-full h-full shadow-lg px-2 py-1 transition-all ease-in-out duration-300"
              >
                <div className="flex flex-row gap-2">
                  <p className={`${styles.cardBodyText}`}>{education.from}</p>
                  <p className={`${styles.cardBodyText}`}>{"-"}</p>
                  <p className={`${styles.cardBodyText}`}>
                    {education.is_active ? "Actualmente" : education.to}
                  </p>
                </div>
                <p className={`${styles.cardBodyText} font-bold`}>
                  {education.header}
                </p>
                <p className={`${styles.cardBodyText}`}>
                  {education.subheader}
                </p>
              </li>
            );
          })}
        </ul>

        <h3 className={`${styles.cardSubHeadText}`}>
          <Award /> Premios
        </h3>
        <ul className="flex flex-wrap w-full gap-2 mt-2">
          {specialist.awards.map((award, index: number) => {
            return (
              <li
                key={"specialist_experience_" + index}
                className="rounded-md bg-secondary border-primary border-2 w-full h-full shadow-lg px-2 py-1 transition-all ease-in-out duration-300"
              >
                <p className={`${styles.cardBodyText}`}>{award.date}</p>
                <p className={`${styles.cardBodyText} font-bold`}>
                  {award.header}
                </p>
                <p className={`${styles.cardBodyText}`}>{award.subheader}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SpecialistsCard;
