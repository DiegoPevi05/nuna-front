import { FC, ReactNode } from 'react'
import { styles } from "../../styles";
import StepsComponent from './Steps';
import { ChevronRight } from 'lucide-react';

interface LayoutProps {
  step:number;
  children: ReactNode;
}

const LayoutComponent: FC<LayoutProps> = ({step, children }) => {

  return(
    <div className={`${styles.padding} max-w-7xl mx-auto relative z-2 mt-[50px] sm:mt-[80px]`}>
      <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-4">
        <li key={"Breadcrumb_home"}>
          <div className="flex items-center">
            <a href="/#" className="mr-2 text-sm font-medium text-secondary hover:text-tertiary">
               Inicio
            </a>
            <ChevronRight className="text-secondary "/>
          </div>
        </li>
        <li className="text-sm">
          <a href="/#specialists" aria-current="page" className="font-medium text-secondary hover:text-tertiary">
              Especialistas 
          </a>
        </li>
      </ol>
      <div className={`sm:px-16 px-6 py-1 max-w-7xl mx-auto relative z-2`}>
        <StepsComponent step={step}/>
      </div>
      {children}
    </div>
  )
}

export default LayoutComponent;
