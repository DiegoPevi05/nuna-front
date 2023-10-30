import { useState,useEffect } from 'react';
import {motion} from 'framer-motion';
import { staggerContainer, fadeIn } from "../lib/motions";
import { ChevronRight } from 'lucide-react';
import {Link} from '../components/ui/Button';
import {
  Hero1,
  Hero2,
  Hero3,
  Hero4,
  Hero5 
} from "../assets/images";

const ImageCarousel = [
  Hero1,
  Hero2,
  Hero3,
  Hero4,
  Hero5 
]

interface TitleProps {
  header:string;
  message:string;
} 

const MessageInImages:TitleProps[] = [
  { header:"Conoce a nuestros especialistas" , message:"Siempre dispuestos a brindarte la mejor atención."},
  { header:"Conoce a nuestros especialistas" , message:"Siempre dispuestos a brindarte la mejor atención."},
  { header:"Conoce a nuestros especialistas" , message:"Siempre dispuestos a brindarte la mejor atención."},
  { header:"Conoce a nuestros especialistas" , message:"Siempre dispuestos a brindarte la mejor atención."},
  { header:"Conoce a nuestros especialistas" , message:"Siempre dispuestos a brindarte la mejor atención."},
]



const Hero = () => {

  const [CurrentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % ImageCarousel.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const SelectOption = (option:number) => {
    setCurrentImage(option);
  } 

  return(
      <motion.section 
        id={"hero"}
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className="relative flex flex-col lg:flex-row w-full h-auto lg:h-screen mx-auto overflow-hidden">
        <motion.div 
          className="w-full h-1/2 lg:h-full sm:h-full flex justify-center items-center overflow-hidden">
            {ImageCarousel.map((img, index:number) => {
              if (index === CurrentImage) {
                return(
                  <div key={"motion_video"+index} className="w-screen h-[240px] sm:h-full">
                    <motion.img
                      key={index}
                      src={img}
                      className="w-full h-full object-cover object-top"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                )
              }
            })}

        </motion.div>
        <ul className="hidden lg:flex absolute bottom-20 h-auto w-full  flex-row items-center justify-center gap-2">
          {MessageInImages.map((_, index:number) => {
            return(
              <span key={"Bullet_"+index} onClick={()=>SelectOption(index)} className={`${ index === CurrentImage ?'bg-primary':' bg-secondary'} h-8 w-8 rounded-full  hover:bg-primary  transition-all ease-in-out duration-300`}></span>
            )
          })}
        </ul>
        {MessageInImages.map((msg, index:number) => {
          if (index === CurrentImage) {
            return(
              <motion.div
                key={index}
                initial='hidden'
                whileInView='show'
                variants={index % 2 === 0 ? fadeIn("right", "spring", 0.2, 1) : fadeIn("left", "spring", 0.2, 1)}
                className={`${index % 2 === 0 ? 'lg:left-24' : 'lg:right-24' } relative lg:absolute  lg:bottom-24 h-1/2 lg:h-auto w-full lg:w-[480px] bg-primary
                flex flex-col p-10 `}
              >
                <h1 className="text-xl xl:text-2xl font-heading text-secondary">{msg.header}</h1>
                <h1 className="text-2xl xl:text-3xl font-body mt-4 pr-4 ">{msg.message}</h1>
                <Link href="/#specialists" variant="dark" size="sm" className="mt-8">Agenda tu Cita <ChevronRight /></Link>
              </motion.div>
            )
          }
        })}
      </motion.section>
  )
}

export default Hero;
