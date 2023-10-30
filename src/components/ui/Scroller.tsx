// @ts-ignore
import { Link,Events, Element } from 'react-scroll';
import { useState, useEffect } from 'react';

interface sectionProps {
  name:string;
  offset:number;
}
const Sections:sectionProps[] = [
  {name:"hero", offset:0},
  {name:"find", offset:-100},
  {name:"instructions", offset:0},
  {name:"benefits", offset:0},
  {name:"triada", offset:0},
  {name:"questions", offset:0}
]

const Scroller = () => {
  const [activeLink, setActiveLink] = useState('hero'); // Initialize with the default active link

  const handleSetActive = (to:any) => {
    setActiveLink(to);
  };

  useEffect(() => {
    Events.scrollEvent.register('begin', handleSetActive);
    return () => {
      Events.scrollEvent.remove('begin');
    };
  }, []);

  return (
    <div className="hidden sm:flex fixed bottom-1/2 right-2 w-10 h-auto flex-col gap-2 justify-center items-center z-50">
      
      {Sections.map((section, index:number) => {
        return(
        <Link 
            key={"Link_scroll"+index}
            to={section.name}
            spy={true}
            offset={section.offset}
            activeClass="active"
            className={`h-5 w-5 ${activeLink === section.name ? 'bg-tertiary border-2 border-primary scale-[1.4]' : 'bg-secondary'} hover:bg-tertiary hover:scale-[1.2] hover:border-2 hover:border-primary rounded-full transition-all ease-in-out duration-300`}
         >
          </Link>
        ) 
        })}
    </div>
  );
};

export default Scroller;
