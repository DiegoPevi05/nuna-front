import {Tilt} from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "./ui/hoc";
import { fadeIn, textVariant } from "../lib/motions";
import {Draw1,Draw2,Draw3,Draw4} from "../assets/images";

const contextData = [
  {
    title:"Context1",
    text: "Podrás realizar la consulta médica desde cualquier dispositivo con conexión a internet.",
    icon: Draw1,
  },
  {
    title:"Context2",
    text: "Implementa nuevos hábitos sanos y saludables que eleven tu vida a otro nivel.",
    icon: Draw2,
  },
  {
    title:"Context3",
    text: "Realiza consultas desde la comodidad de tu hogar y accede a una orientación en línea.",
    icon: Draw3,
  },
  {
    title:"Context4",
    text: "Mejora tu estilo de vida tomando las mejores recomendaciones de nuestros profesionales.",
    icon: Draw4,
  }
];

const BenfitCard = ({ index, text, icon }:any) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full bg-fifth p-[1px] rounded-[20px] shadow-card'
    >
      <div
        className='bg-fourth rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-24 h-24 object-contain'
        />

        <p className='text-secondary text-[14px] font-bold text-center'>
          {text}
        </p>
      </div>
    </motion.div>
  </Tilt>
);

const Benefits = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Beneficios</p>
        <h2 className={styles.sectionHeadText}>Beneficios de una consulta en línea con Nuna</h2>
      </motion.div>
      <div className='mt-20 flex flex-wrap gap-10'>
        {contextData.map((context, index) => (
          <BenfitCard key={context.title} index={index} {...context} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Benefits, "benefits");
