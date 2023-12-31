import { useState, useEffect, useCallback, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Loader2, ChevronDown, FilterX } from "lucide-react";
import Navbar from "../components/Navbar";
import LayoutComponent from "../components/ui/layoutSpecialists";
import SpecialistsCard from "../components/CardSpecialist";
import WeekDayComponent from "../components/ui/WeekDays";
import { staggerContainer } from "../lib/motions";
import { motion } from "framer-motion";
import {
  SpecialistProps,
  TimsheetsProps,
  ServicesProps,
  Session,
} from "../lib/interfaces.ts";
import { serializedDataTimeSheets } from "../lib/utils";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Specialists = () => {
  const dispatch = useDispatch();

  const [LoadingState, setLoadingState] = useState<boolean>(false);
  const [activeDay, setActiveDay] = useState<Date>(new Date());

  const [activeWeek, setActiveWeek] = useState<number>(0);
  const [DaysShow, setDaysShow] = useState<number>(7);

  useEffect(() => {
    if (window.innerWidth < 640) {
      setDaysShow(3);
    } else {
      setDaysShow(7);
    }
  }, [window.innerWidth]);

  const ChangeActiveWeek = useCallback((week: number) => {
    setActiveWeek(week);
  }, []);

  const handleChangeDay = useCallback(
    (date: Date) => {
      setLoadingState(true);
      setActiveDay(date);
    },
    [setActiveDay],
  );

  //Call Api Data
  const [Specialists, setSpecialists] = useState<SpecialistProps[]>([]);
  const [TimeSheets, setTimeSheets] = useState<TimsheetsProps[]>([]);
  const [Services, setServices] = useState<ServicesProps[]>([]);
  //axios to call api and get data
  const getDataFromServer = async (page: number, range: number) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL +
          "/api/web/timesheets?page=" +
          page +
          "&range=" +
          range,
      );
      const mappedData = serializedDataTimeSheets(response.data);
      setTimeSheets(mappedData.timesheets);
      setSpecialists(mappedData.specialists);
      setServices(mappedData.services);
    } catch (err) {
      toast.error("Ha habido un error trayendo la información del servidor");
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    setLoadingState(true);
    getDataFromServer(activeWeek, DaysShow);
  }, [activeWeek, DaysShow]);

  const [selectedSpeciality, setSelectedSpeciality] = useState<
    ServicesProps | undefined | null
  >(null);

  const handleChangeSpeciality = useCallback(
    (event: any) => {
      setLoadingState(true);
      const id = event.id;
      const service_id = id.split("_")[1];
      const service = Services.find(
        (service) => service.id === Number(service_id),
      );
      if (service === selectedSpeciality) {
        setSelectedSpeciality(null);
      } else {
        setSelectedSpeciality(service);
      }
    },
    [selectedSpeciality, Services],
  );

  const onClickChangeSpeciality = useCallback(
    (service_id: number) => {
      setLoadingState(true);
      const service = Services.find((service) => service.id === service_id);

      if (service === selectedSpeciality) {
        setSelectedSpeciality(null);
      } else {
        setSelectedSpeciality(service);
      }
    },
    [setSelectedSpeciality, Services, selectedSpeciality],
  );

  const cleanFilter = useCallback(() => {
    setSelectedSpeciality(null);
  }, []);

  const [ShowDataSpecialist, setShowDataSpecialist] = useState<
    SpecialistProps[]
  >([]);
  const [ShowDataTimeSheets, setShowDataTimeSheets] = useState<
    TimsheetsProps[]
  >([]);

  useEffect(() => {
    let timesheets: TimsheetsProps[] = [];
    let specialists: SpecialistProps[] = [];

    if (activeDay) {
      timesheets = TimeSheets.filter(
        (time) =>
          activeDay.getDate() == time.start_date.getDate() &&
          activeDay.getMonth() == time.start_date.getMonth() &&
          activeDay.getDate() == time.end_date.getDate() &&
          activeDay.getMonth() == time.end_date.getMonth(),
      );
    }

    const uniqueSpecialists = new Set();

    for (let i = 0; i < timesheets.length; i++) {
      const specialist = Specialists.find(
        (sp) => sp.id === timesheets[i].specialist_id,
      );
      if (specialist && !uniqueSpecialists.has(specialist.id)) {
        uniqueSpecialists.add(specialist.id);
        specialists.push(specialist);
      }
    }

    if (selectedSpeciality) {
      specialists = specialists.filter((specialist) =>
        specialist.services.some(
          (service) => service.id_service === selectedSpeciality.id,
        ),
      );
    }

    setShowDataTimeSheets(timesheets);
    setShowDataSpecialist(specialists);

    setTimeout(() => {
      setLoadingState(false);
    }, 1000);
  }, [selectedSpeciality, activeDay, TimeSheets, Specialists]);

  const Sessions = useSelector((state: any) => state.cart.cart);

  const handleAddSession = useCallback(
    (UnitSession: Session) => {
      dispatch({ type: "ADD_TO_CART", payload: UnitSession });
    },
    [dispatch],
  );

  return (
    <>
      <Navbar />
      <LayoutComponent step={1}>
        <WeekDayComponent
          activeDay={activeDay}
          onChangeDay={handleChangeDay}
          daysShow={DaysShow}
          activeWeek={activeWeek}
          onChangeActiveWeek={ChangeActiveWeek}
        />
        <Menu
          as="div"
          className="sm:mx-4 mt-4 px-8 w-full flex justify-start relative inline-block text-left"
        >
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-tertiary px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-primary hover:bg-primary hover:text-secondary">
              Especialidades
              <ChevronDown
                className="-mr-1 h-5 w-5 text-primary"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              as="div"
              className="absolute left-10 z-[60] mt-2 w-56 top-6 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-4">
                <div className="flex flex-row w-full justify-end px-4">
                  <button onClick={() => cleanFilter()}>
                    <FilterX className="text-secondary" />
                  </button>
                </div>
                {Services &&
                  Services.length > 0 &&
                  Services.map((service, index) => (
                    <Menu.Item key={"service_item_" + index}>
                      <div className="relative flex gap-x-3 mx-6">
                        <div className="flex h-6 items-center">
                          <input
                            id={"service_" + service.id}
                            name={"service_" + service.id}
                            type="checkbox"
                            className="h-4 w-4 rounded border-cyan-300 text-cyan-600 focus:ring-cyan-600"
                            onChange={(event) =>
                              handleChangeSpeciality(event.target)
                            }
                            checked={selectedSpeciality === service}
                          />
                        </div>
                        <div className="text-body leading-6">
                          <label
                            htmlFor={"service_" + service.id}
                            className="font-body text-secondary text-sm"
                          >
                            {service.name}
                          </label>
                        </div>
                      </div>
                    </Menu.Item>
                  ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        {LoadingState ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader2 className="text-secondary h-16 w-16 animate-spin" />
          </div>
        ) : (
          <ul
            role="list"
            className="sm:mx-4 flex flex-col sm:flex-row  sm:flex-wrap max-w-2xl justify-center sm:justify-start  gap-10 sm:gap-12 px-4 sm:px-6 lg:max-w-5xl lg:px-8 py-4 mt-10 lg:py-8 w-full"
          >
            {ShowDataSpecialist.map((specialist, index: number) => {
              const filteredTimeSheets = ShowDataTimeSheets.filter(
                (timeSheet) => timeSheet.specialist_id === specialist.id,
              );
              return (
                <li key={"specialist_" + index}>
                  <motion.section
                    variants={staggerContainer()}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                  >
                    <SpecialistsCard
                      index={index}
                      specialist={specialist}
                      timesheets={filteredTimeSheets}
                      activeDay={activeDay}
                      services={Services}
                      onClickSpeciality={onClickChangeSpeciality}
                      sessions={Sessions}
                      onSetSession={handleAddSession}
                    />
                  </motion.section>
                </li>
              );
            })}
          </ul>
        )}
      </LayoutComponent>
    </>
  );
};

export default Specialists;
