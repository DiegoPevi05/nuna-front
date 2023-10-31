import { FC, useState, useEffect, useCallback } from 'react'
import {getCurrentDays} from "../../lib/utils.ts";
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface WeekProps {
  activeDay:Date;
  daysShow:number;
  activeWeek:number;
  onChangeActiveWeek:(item:number) => void
  onChangeDay: (itemt: Date) => void;
}

const DAYS_OF_THE_WEEK = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];

const WeekDayComponent: FC<WeekProps> = ({activeDay,onChangeDay,daysShow,activeWeek,onChangeActiveWeek }) => {

  const [WeekDays,setWeekDays] = useState<Date[]>([]);

  useEffect(() => {
    setWeekDays(getCurrentDays(daysShow,activeWeek));
  }, [activeWeek,daysShow]);

  const previousWeek = useCallback(() => {
    onChangeActiveWeek((activeWeek - 1) < 0 ? activeWeek : activeWeek - 1 );
  },[activeWeek])

  const nextWeek = useCallback(() => {
    onChangeActiveWeek(activeWeek + 1);
  },[activeWeek])


  return(
    <div className="w-full h-auto flex flex-row justify-center gap-2">
      <button onClick={()=>previousWeek()}>
        <ChevronLeft className="h-10 w-10 transition ease-in-out hover:-translate-y-1 text-secondary hover:text-tertiary hover:scale-110  duration-300"/>
      </button>
      {WeekDays.map((day, index:number) => {
        return(
          <button key={"button_day_"+index} onClick={()=>onChangeDay(day)} className={`${activeDay.getDate() == day.getDate() && activeDay.getMonth() == day.getMonth()  ? 'bg-tertiary text-secondary': 'bg-secondary text-primary'} transition ease-in-out delay-150  hover:-translate-y-1  hover:text-secondary hover:scale-110 hover:bg-tertiary duration-300 px-6 py-1 rounded-md flex flex-col items-center`}>

            <span className="font-body font-bold text-sm">{DAYS_OF_THE_WEEK[day.getDay()]}</span>
            <span className="text-sm">{day.getDate()}</span>
          </button>
        )
      })}
      <button onClick={()=>nextWeek()}>
        <ChevronRight className="h-10 w-10 transition ease-in-out hover:-translate-y-1 text-secondary hover:text-tertiary hover:scale-110  duration-300"/>
      </button>
    </div>
  )
}

export default WeekDayComponent;
