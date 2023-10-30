import { useState } from 'react';
import { Loader2, BadgeCheck, BadgeX  } from "lucide-react";
import Navbar from '../components/Navbar';
import LayoutComponent from '../components/ui/layoutSpecialists';
import { styles } from "../styles";
import {motion} from 'framer-motion';
import { fadeIn } from "../lib/motions";
import {Link} from '../components/ui/Button';


const PaymentResponse = () => {

    const [LoadingState] = useState<boolean>(false);
    const [isSuccessPayment] = useState<boolean>(false);

    return(
      <>
        <Navbar/>
        <LayoutComponent step={3}>
          {LoadingState ?
            <div className="w-full h-full flex flex-row justify-center items-center">
              <Loader2 className='text-secondary h-16 w-16 animate-spin' />
            </div>
          :
            isSuccessPayment ?

            <motion.div
              initial='hidden'
              whileInView='show'
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeIn("up", "", 0.5, 0.75)}
              className={`${styles.padding} max-w-7xl mx-auto relative z-2 flex flex-col sm:flex-row w-full h-auto bg-tertiary rounded-md`}>
              <div className="w-full sm:w-full h-auto flex flex-col justify-center items-center">
                  <h2 className={`${styles.heroSubText}`}><BadgeCheck className="h-10 w-10"/></h2>
                  <h2 className={`${styles.heroSubText}`}>Felicidades!</h2>
                  <h2 className={`${styles.heroBlockText} font-bold`}>{"Diego"}</h2>
                  <p className={`${styles.cardSubHeadText} text-secondary`}>Tu pago ha sido exitoso</p>
                <p className={`${styles.cardSubHeadText} text-secondary px-2 sm:px-20 text-center`}>Si deseas seguir comprando puedes buscar mas citas con nuestros especialistas o ir al panel para ver tus citas programadas</p>
                <div className="w-full flex flex-col sm:flex-row justify-center items-center mx-auto gap-2 sm:gap-10 mt-4">
                    <Link href="/#specialists" variant="dark" className="mt-2">Ver mas Sesiones</Link>
                    <Link href="/#" variant="dark" className="mt-2">Ir al Panel</Link>
                  </div>
              </div>
            </motion.div>
            :
            <motion.div
              initial='hidden'
              whileInView='show'
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeIn("up", "", 0.5, 0.75)}
              className={`${styles.padding} max-w-7xl mx-auto relative z-2 flex flex-col sm:flex-row w-full h-auto bg-tertiary rounded-md`}>
              <div className="w-full sm:w-full h-auto flex flex-col justify-center items-center">
                <h2 className={`${styles.heroSubText}`}><BadgeX className="h-10 w-10"/></h2>
                <h2 className={`${styles.heroSubText}`}>Lo Sentimos</h2>
                <h2 className={`${styles.heroBlockText} font-bold`}>{"Diego"}</h2>
                <p className={`${styles.cardSubHeadText} text-secondary`}>Tu pago no se ha procesado</p>
                <p className={`${styles.cardSubHeadText} text-secondary px-2 sm:px-20 text-center`}>Ponte en contacto con nosotros o vuelve a intentarlo en un momento</p>
                <div className="w-full flex flex-col sm:flex-row justify-center items-center mx-auto gap-2 sm:gap-10 mt-4">
                    <Link href="/#specialists" variant="dark" className="mt-2">Ver mas Sesiones</Link>
                    <Link href="/#" variant="dark" className="mt-2">Ir al Panel</Link>
                  </div>
              </div>
            </motion.div>
          }
        </LayoutComponent>
      </>
    )
}

export default PaymentResponse;
