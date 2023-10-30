import {FC, useState } from "react";
import { styles } from "../styles";
import { JoinUs, LogoPink as Logo  } from "../assets/images"
import axios from "axios";
import {toast} from "react-hot-toast";
import {Button} from '../components/ui/Button';

interface FormProps {
  name:string;
  email:string;
  city:string;
  phone:string;
}

const JoinUsSection:FC = () => {

  const [Loading, setLoading] = useState<boolean>(false);


  const emptyData:FormProps = {
    name:"",
    email:"",
    city:"",
    phone:""
  }

  const [form, setForm] = useState<FormProps>(emptyData);

  const handleChange = (event:any) => {
    const { target } = event;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };


  //which is the type of React Event hanlder
  const handleSubmit = async() => {
    setLoading(true);

    if(form.name.length == 0){
      toast.error("Ingresa el nombre");
      setLoading(false);
      return;
    }

    if(form.email.length == 0){
      toast.error("Ingresa el correo electronico");
      setLoading(false);
      return;
    }

    if(form.city.length == 0){
      toast.error("Ingresa la ciudad");
      setLoading(false);
      return;
    }

    if(form.phone.length == 0){
      toast.error("Ingresa el telefono");
      setLoading(false);
      return;
    }

    try{
      const config = {
        headers: {
          Authorization: import.meta.env.VITE_FORM_UATH_TOKEN
        }
      }
      await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/web/join-us",form,config);
      setForm(emptyData);
      toast.success("Mensaje enviado con éxito");
    } catch(error){
      toast.error("No se ha podido enviar el mensaje");
    } finally{
      setLoading(false);
    }

  };
    return(
      <div className="flex flex-row w-full h-full">
        <img
            key={"JoinUsUs"}
            src={JoinUs}
          className="absolute lg:relative lg:flex w-full lg:w-1/2 h-screen object-cover opacity-20 lg:opacity-80 z-0"
          />

        <div className="w-full lg:w-1/2 h-screen sm:h-full flex flex-col justify-center items-center px-5 sm:px-20 md:px-40 py-4 sm:py-20 z-[10]">
            <a href="/">
              <img src={Logo} alt="logo" className="w-16 h-16 block rounded-full transition-all ease-in-out duration-1000"/> 
            </a>
            <h2  className={styles.sectionHeadText}>Nuna</h2>
            <p className={styles.sectionSubText}>Unete a nosotros</p>
            <div
              className='mt-0 flex flex-col gap-4 sm:gap-4 w-full'
            >
              <div className='flex flex-col'>
                <span className='font-body font-small sm:text-lg mb-2'>Nombre</span>
                <input
                  type='text'
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Cual es tu nombre?"
                  className='bg-secondary py-2 px-6 text-primary placeholder:text-white rounded-lg font-small sm:font-medium
                    transition-color focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2
                  '
                />
              </div>
              <div className='flex flex-col'>
                <span className='font-body font-small sm:text-lg mb-2'>Correo Electronico</span>
                <input
                  type='email'
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Cual es tu correo?"
                  className='bg-secondary py-2 px-6 text-primary placeholder:text-white rounded-lg font-small sm:font-medium
                    transition-color focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2
                  '
                />
              </div>

              <div className='flex flex-col'>
                <span className='font-body font-small sm:text-lg mb-2'>Ciudad</span>
                <input
                  type='text'
                  name='city'
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Cual es tu ciudad?"
                  className='bg-secondary py-2 px-6 text-primary placeholder:text-white rounded-lg font-small sm:font-medium
                    transition-color focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2
                  '
                />
              </div>

              <div className='flex flex-col'>
                <span className='font-body font-small sm:text-lg mb-2'>Telefono</span>
                <input
                  type='text'
                  name='phone'
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Cual es tu celular?"
                  className='bg-secondary py-2 px-6 text-primary placeholder:text-white rounded-lg font-small sm:font-medium
                    transition-color focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2
                  '
                />
              </div>
              <Button 
                type="submit" 
                isLoading={Loading} 
                className="text-lg mt-4"
                variant="dark"
                onClick={handleSubmit}
              >
                Enviar
              </Button>
        </div>
            
        </div>
      </div>
    )
}

export default JoinUsSection;
