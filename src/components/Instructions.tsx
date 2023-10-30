// @ts-ignore
import { VerticalTimeline, VerticalTimelineElement} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

// @ts-ignore
import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { SectionWrapper } from "./ui/hoc";
import { textVariant } from "../lib/motions";
import { User,GraduationCap, CreditCard } from 'lucide-react';

const stepsData = [
  {
    title: "1.-Regístrese",
    icon: <User/>,
    iconBg: "#ecdccc",
    description: "Cree una cuenta en Nuna.",
  },
  {
    title: "2.-Encuentre a su especialista",
    icon: <GraduationCap />,
    iconBg: "#ecdccc",
    description: "En Nuna, usted tendrá acceso a profesionales calificados independientemente de la distancia. Realice una búsqueda y use los filtros para encontrar los especialistas más adecuado a sus necesidades.",
  },
  {
    title: "3.-Agende su cita y proceda con el pago",
    icon: <CreditCard />,
    iconBg: "#ecdccc",
    description: "¡Listo! Iniciemos el camino a su bienestar",
  },
];

const InstructionStepCard = ({ step }:any) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#5e7b96",
        color: "#ecdccc",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #6669C6" }}
      iconStyle={{ background: step.iconBg, color: "#5e7b96" }}
      icon={step.icon}
    >
      <div>
        <h3 className='text-[24px] font-bold'>{step.title}</h3>
        <p className="text-[14px]">{step.description}</p>
      </div>
    </VerticalTimelineElement>
  );
};

const Instructions = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText}`}>
          Cómo funciona la terapia en nuna
        </h2>
        <p className={`${styles.sectionSubText}`}>
          Agende su consulta en solo 3 pasos
        </p>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {stepsData.map((step, index) => (
            <InstructionStepCard
              key={`step-${index}`}
              step={step}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Instructions, "instructions");
