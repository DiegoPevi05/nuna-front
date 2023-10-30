import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../components/ui/hoc";
import {fadeIn } from "../lib/motions";
import {Link} from "./ui/Button";

interface BlockProps {
  id:string;
  header:string;
  body:string;
}


const BlockText = (props:BlockProps) => {

  const {header,body,id} = props;

  return (
      <div id={id} className="w-full h-full flex overflow-hidden border-2 p-2 sm:p-4 rounded-lg">
          <motion.div
            variants={fadeIn("up", "", 0.2, 1)}
            className='w-full h-auto flex flex-col items-center justify-center text-center py-2 sm:py-0 gap-4'
          >
            <h2 className={`${styles.heroBlockText}`}> {header}</h2>
            <p className={`${styles.sectionSubText}`}> {body} </p>
            <Link href="#specialists" variant="dark">Encontrar mi Especialista</Link>
          </motion.div>
      </div>
  );
};

export default SectionWrapper(BlockText, "");
