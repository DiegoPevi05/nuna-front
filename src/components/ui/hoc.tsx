import { motion } from "framer-motion";

import { styles } from "../../styles";
import { staggerContainer } from "../../lib/motions";

export const SectionWrapper = (Component:any, idName:string, globalClass?:string) =>
  function HOC(props:any) {
    return (
      <motion.section
        id={idName} 
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} ${globalClass} max-w-7xl mx-auto relative z-2 `}
      >
        <span className='hash-span'>
          &nbsp;
        </span>

        <Component {...props}/>
      </motion.section>
    );
  };

