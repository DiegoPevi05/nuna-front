import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../components/ui/hoc";
import {slideIn } from "../lib/motions";
import { Draw4  } from "../assets/images"

interface cardProps {
  header:string;
  body:string;
}

const Cards:cardProps[] = [
  {
    header:"Mente",
    body:"Todos los pensamientos que tenemos influyen en nuestro desenvolvimiento cotidiano, cuando tenemos pensamientos que perturban nuestro día a día, significa que hay algo que debemos trabajar."
  },
  {
    header:"Cuerpo",
    body:"Es importante trabajar en el bienestar físico, ya que al ejercitarnos nuestro cuerpo libera energía negativa y activa neurotransmisores que contribuyen a nuestro bienestar. "
  },
  {
    header:"Alimentacion",
    body:"Ciertos alimentos que ingerimos generan desgano, sensación de pesadez que provocan en nosotros un desequilibrio emocional, es por ello que es importante cultivar hábitos saludables en relación a nuestros alimentos. "
  }
]

const Triada = () => {

  return (
    <>
      <div className="w-full h-full flex flex-col sm:flex-row overflow-hidden mt-20">
        <div className="w-full h-full flex-col">
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className='w-full flex items-center justify-center py-4 sm:py-0'
          >
            <img src={Draw4} alt='ImageAbout' className='relative w-full sm:w-[640px] h-[250px] sm:h-[500px] object-contain' />
          </motion.div>
        </div>
        <motion.div 
          variants={slideIn("right", "tween", 0.2, 1)}
          className="w-full h-auto sm:h-[600px] flex flex-col p-4 sm:p-1 bg-transparent gap-4">
          <h2 className={`${styles.sectionHeadText}`}> Triada Nuna</h2>
          <p className={`${styles.sectionSubText}`}> Nos preocupamos por ti de distitnas maneras </p>
          {Cards.map((card, index) => (
              <motion.div 
                key={"card_triada"+index}
                initial={{ opacity: 0, translateX: index % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: index+2 }}
                className={`${index % 2 === 0 ? 'sm:ml-0' : 'sm:ml-10'} w-full sm:w-[80%] h-auto bg-secondary rounded-lg p-4 flex flex-col`}>
                <h3 className="font-heading text-primary">{card.header}</h3>
                <p className="text-white text-sm">{card.body}</p>
              </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Triada, "triada");
