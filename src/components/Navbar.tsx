import { FC, useState,useEffect, Fragment} from 'react';
import {LogoWhite as Logo} from '../assets/images';
import { Menu as MenuIcon, X,ChevronDown } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { styles } from "../styles";
import {Link} from "./ui/Button";
import { Menu, Transition } from '@headlessui/react'
// @ts-ignore
import { animateScroll as scroll } from 'react-scroll';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {toast} from "react-hot-toast";
import axios from 'axios';


interface INavigation {
  name: string;
  label: string;
  href: string;
}

const navigation:INavigation[] = [
  { name: 'Home',label:'Inicio', href: '/'},
  { name: 'Us', label:'Nosotros',href: '/#us'},
  { name: 'Specialist', label:'Nuestros Especialistas',href: '/#specialists'},
  { name: 'Join Us', label:'Unete a nosotros',href: '/#joinus'},
  { name: 'Register', label:'Registrate',href: import.meta.env.VITE_BACKEND_URL+"/register"},
]

interface userINavigation {
  label:string;
  href:string;
}

const navigationUser:userINavigation[] = [
  { label:'Panel de Usuario', href: import.meta.env.VITE_BACKEND_URL+"/home"},
  { label:'Mis Sesiones',href: import.meta.env.VITE_BACKEND_URL+"/user-meets"},
  { label:'Calendario',href: import.meta.env.VITE_BACKEND_URL+"/calendars"},
]

const Navbar: FC = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrollNav, setScrollNav] = useState(true)
  const dispatch = useDispatch();
  const user = useSelector((state:any) => state.user.user);

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, [])

  const changeNav = () => {
    if (window.scrollY >= 120) {
      setScrollNav(false)
    } else {
      setScrollNav(true)
    }
  }

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const closeSessionInServer = async (jwt_token:string|null) => {
    if(jwt_token === null){
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: 'Bearer '+jwt_token,
        }
      }
      await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/auth/logout',config);
      localStorage.removeItem("jwt_token");
      toast.success("Se ha cerrado la Sesion Correctamente");
    }catch (err) {
      toast.error("Ha habido un error trayendo la información de usuario");
    } 
  }

  const closeSesion = () => {
    const token = localStorage.getItem('jwt_token');
    closeSessionInServer(token)
    dispatch({ type: 'CLEAR_USER' })
  }


  return(
    <div className={`${ scrollNav ? 'h-[50px] sm:h-[80px]' : 'h-[50px] sm:h-[50px] hover:h-[80px] bg-primary'} fixed top-0  w-full z-10  drop-shadow-lg transition-all ease-in-out duration-1000`} onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
      <nav className="flex flex-row items-center w-full h-full px-8 sm:px-16 lg:px-24 ">
        <div className="flex flex-row items-center py-4 w-full lg:w-1/5 gap-4">
          <button
            onClick={scrollToTop}
            className={`${ scrollNav ? 'w-12 lg:w-16' : isHovered ? 'w-12 lg:w-16' : 'w-10 lg:w-10' } block  h-full mt-2 sm:mt-0 cursor-pointer flex items-center transition-all ease-in-out duration-1000 `}>
            <img src={Logo} alt="logo" className="w-auto h-full block rounded-full transition-all ease-in-out duration-1000"/> 
          </button>
          <p className="hidden sm:block font-heading text-3xl">nuna</p>
        </div>
        <ul className="hidden lg:flex flex-row justify-end items-center gap-12 w-4/5">
          {scrollNav ?
            <>
              {navigation.map((item,index)=>(
                <a key={"Link_"+index} href={item.href}>
                  <li key={"Link_"+item.name} className={`${styles.NavBarText}`}>{item.label}</li>
                </a>
              ))}

              {user ? 
                <Menu as="div" className="w-auto mx-0 flex relative inline-block text-left">
                        <Menu.Button className="inline-flex w-auto justify-center gap-x-1.5 rounded-full bg-tertiary px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-primary hover:bg-primary hover:text-secondary">
                          {user.name} 
                          <ChevronDown className="-mr-1 h-5 w-5 text-primary hover:text-secondary" aria-hidden="true" />
                        </Menu.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items as="div" className="absolute z-[60] mt-2 w-56 py-1 rounded-lg top-6 origin-top-right bg-primary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {navigationUser.map((navUser,index) => (
                                <Menu.Item key={"nav_user_item_"+index} >
                                  <div className="w-full h-auto bg-primary font-bold text-sm px-2 py-1 hover:bg-tertiary ease-in-out transition-all duration-300">
                                    <a href={navUser.href} className="h-full w-full hover:underline">
                                      {navUser.label}
                                    </a>
                                  </div>
                                </Menu.Item>
                              ))}
                                <Menu.Item key={"nav_user_item_close_session"} >
                                  <div className="w-full h-auto bg-primary font-bold text-sm px-2 py-1 hover:bg-tertiary ease-in-out transition-all duration-300">
                                    <button onClick={()=>closeSesion()} className="h-full w-full text-left hover:underline">
                                      Cerrar Sesion
                                    </button>
                                  </div>
                                </Menu.Item>
                          </Menu.Items>
                        </Transition>
                </Menu>
              :
                <Link key={"Link_LogIn"} href={import.meta.env.VITE_BACKEND_URL+"/login"}>Iniciar Sesion</Link>
              }
            </>
          :
            isHovered ? 
            <>
              {navigation.map((item,index)=>(
                <a key={"Link_"+index} href={item.href}>
                  <li key={"Link_"+item.name} className={`${styles.NavBarTextDark}`}>{item.label}</li>
                </a>
              ))}
              {user ? 
                <Menu as="div" className="w-auto mx-0 flex relative inline-block text-left">
                        <Menu.Button className="inline-flex w-auto justify-center gap-x-1.5 rounded-full bg-tertiary px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-tertiary hover:bg-primary hover:text-secondary">
                          {user.name} 
                          <ChevronDown className="-mr-1 h-5 w-5 text-primary hover:text-secondary" aria-hidden="true" />
                        </Menu.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items as="div" className="absolute z-[60] mt-2 w-56 py-1 rounded-lg top-6 origin-top-right bg-primary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {navigationUser.map((navUser,index) => (
                                <Menu.Item key={"nav_user_item_"+index} >
                                  <div className="w-full h-auto bg-primary font-bold text-sm px-2 py-1 hover:bg-tertiary ease-in-out transition-all duration-300">
                                    <a href={navUser.href} className="h-full w-full hover:underline">
                                      {navUser.label}
                                    </a>
                                  </div>
                                </Menu.Item>
                              ))}
                              <Menu.Item key={"nav_user_item_close_session"} >
                                <div className="w-full h-auto bg-primary font-bold text-sm px-2 py-1 hover:bg-tertiary ease-in-out transition-all duration-300">
                                  <button onClick={()=>closeSesion()} className="h-full w-full text-left hover:underline">
                                    Cerrar Sesion
                                  </button>
                                </div>
                              </Menu.Item>
                          </Menu.Items>
                        </Transition>
                </Menu>

              :
                <Link key={"Link_LogIn"} variant="dark" href="#">Iniciar Sesion</Link>
              }
            </>
              :
              <MenuIcon className="h-6 w-6 sm:h-10 sm:w-10 text-secondary hover:text-secondary ease-in-out duration-300" aria-hidden="true" />
          }
        </ul>
        <div className="flex justify-end lg:hidden w-auto gap-4">
          <button
            type="button"
            className="inline-flex items-center justify-center text-fifth"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir Menu Principal</span>
            <MenuIcon className="h-6 w-6 sm:h-10 sm:w-10 text-secondary hover:text-secondary ease-in-out duration-300" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Nuna</span>
              <img
              className="h-12 w-auto rounded-full"
                src={Logo}
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Cerrar Menu</span>
              <X className="h-10 w-10 text-secondary hover:text-tertiary" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6">
              <div className="space-y-2 py-6">

                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-fifth text-lg font-semibold leading-7 hover:bg-gray-50"
                  >
                    {item.label}
                  </a>
                ))}
                {user ? 
                  <>
                  <h3 className="font-body text-secondary text-lg"> Hola {user.name}</h3>
                  <div className="flex flex-col py-1 gap-2">
                      {navigationUser.map((navUser,index) => (
                        <a
                          key={"nav_user_item_"+index}
                          href={navUser.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-fifth text-lg font-semibold leading-7 hover:bg-gray-50"
                        >
                          {navUser.label}
                        </a>
                      ))}
                      <button 
                          onClick={()=>closeSesion()} 
                          className="-mx-3 block rounded-lg px-3 py-2 text-fifth text-left text-lg font-semibold leading-7 hover:bg-gray-50">
                        Cerrar Sesion
                      </button>
                  </div>
                  </>
                :
                  <Link key={"Link_LogIn"} href={import.meta.env.VITE_BACKEND_URL+"/login"} size="lg" variant="dark" className="mt-2">Iniciar Sesion</Link>
                }
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}

export default Navbar;
