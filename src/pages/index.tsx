import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Scroller from "../components/ui/Scroller";
import Instructions from "../components/Instructions";
import Benefits from "../components/Benefits";
import Triada from "../components/Triada";
import BlockText from "../components/BlockText";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Scroller />
      <Navbar />
      <Hero />
      <BlockText
        id="find"
        header="Encuentra la especialidad que necesitas"
        body="Escríbenos al whatsapp para brindarte una asesoría personalizada para que puedas conectar con el especialista adecuado para lo que necesitas"
      />
      <Instructions />
      <Benefits />
      <Triada />
      <BlockText
        id="questions"
        header="¿Alguna Duda?"
        body="Escríbenos a nuestro Whatsapp para brindarte más información"
      />
      <Footer />
    </>
  );
};

export default Home;
