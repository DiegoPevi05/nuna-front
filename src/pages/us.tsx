import Navbar from '../components/Navbar';
import BlockText from '../components/BlockText';
import Footer from '../components/Footer';
import {Video} from '../assets/images'
import { motion } from "framer-motion";
import { styles } from "../styles";
import {slideIn ,staggerContainer } from "../lib/motions";
import { Draw5  } from "../assets/images"

const UsSection = () => {
    return(
      <>
        <Navbar/>
        <video
            key={"VideoUs"}
            src={Video}
            className="w-full h-screen object-cover"
            autoPlay
            loop
          />

        <motion.section 
          variants={staggerContainer()}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.25 }}
          className="w-full h-full flex flex-col sm:flex-row overflow-hidden mt-20">
          <div className="w-full h-full flex-col">
            <motion.div
              variants={slideIn("left", "tween", 0.2, 1)}
              className='w-full flex items-center justify-center py-4 sm:py-0'
            >
              <img src={Draw5} alt='ImageAbout' className='relative w-full sm:w-[640px] h-[250px] sm:h-[500px] object-contain' />
            </motion.div>
          </div>

          <motion.div 
            variants={slideIn("right", "tween", 0.2, 1)}
            className="w-full h-auto sm:h-[600px] flex flex-col p-4 sm:p-1 bg-transparent gap-4">
            <h2 className={`${styles.sectionHeadText}`}>Te presentamos nuna</h2>
            <p className={`${styles.sectionSubText}`}>Quienes somos? </p>
            <motion.div 
              key={"card_us"}
              initial={{ opacity: 0, translateX:  -100  }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 2 }}
              className=" w-full sm:w-[80%] h-auto bg-secondary rounded-lg p-4 flex flex-col">
              <p className="text-white text-sm lg:text-xl">{"Somos el espacio que tu salud mental necesita, donde encontrarás al profesional que te acompañará en este camino hacia tu 'estar bien'. Tu salud mental es holistica y nosotros lo sabemos. Nuestro objetivo es brindarle un servicio integral de bienestar que fomente una adecuada salud mental en la persona, familia y sociedad. Garantizando calidad y actualización de conocimientos junto a un equipo humano cálido y calificado.Estamos para acompañarte en este camino hacia tu bienestar.Conócenos."}</p>
            </motion.div>
          </motion.div>
        </motion.section>
        <BlockText 
          id="find"
          header="Encuentra la especialidad que necesitas"
          body="Escríbenos al whatsapp para brindarte una asesoría personalizada para que puedas conectar con el especialista adecuado para lo que necesitas"
        />
        <Footer/>
      </>
    )
}

export default UsSection;
