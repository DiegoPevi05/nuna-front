import {Suspense,useEffect,useState} from 'react';
import Providers from './components/Providers';
import Home from './pages';
import UsSection from './pages/us';
import JoinUsSection from './pages/joinus';
import Specialists from './pages/specialists'
import Payment from './pages/payment';
import PaymentResponse from './pages/paymentResponse';
import  LoadingComponent from './components/ui/Loader';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import {getAuthCookies} from './lib/utils';
import {toast} from "react-hot-toast";
import { useDispatch } from 'react-redux';
import axios from 'axios';


function App() {

  const [Loading,setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  //axios to call api and get data
  const getUserFromServer = async (jwt_token:string) => {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer '+jwt_token,
        }
      }
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/auth/user-profile',config);
      if(response.data){
        dispatch({ type: 'SET_USER', payload: response.data })
      }
    }catch (err) {
      toast.error("Ha habido un error trayendo la información de usuario");
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    setLoading(true);
    const auth_cookies = getAuthCookies();
    if(Object.keys(auth_cookies).length > 0){
      getUserFromServer(auth_cookies['jwt_token']);
    } 
  },[])

  return (
    <Suspense fallback={<LoadingComponent isLoading={Loading}/>}>
      <Providers>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/us' element={<UsSection/>} />
            <Route path='/joinus' element={<JoinUsSection/>} />
            <Route path='/specialists' element={<Specialists/>} />
            <Route path='/payment' element={<Payment/>} />
            <Route path='/payment-response' element={<PaymentResponse/>} />
          </Routes>
        </Router>
      </Providers>
    </Suspense>
  )
}

export default App
