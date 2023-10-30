import {ClassValue,clsx} from 'clsx'
import { twMerge } from 'tailwind-merge'
import {SpecialistProps,TimsheetsProps, ServicesProps, ServiceOptionProps, ServicesPropsSpecialist,Session} from './interfaces';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const FilterProductsInList = () => {

}

export const getCurrentDays = (N:number, K:number) => {
  const today = new Date();
  const days = [];

  // Calculate the starting point based on K
  const startDay = new Date(today.getTime() + K * N * 24 * 60 * 60 * 1000);

  for (let i = 0; i < N; i++) {
    const day = new Date(startDay.getTime() + i * 24 * 60 * 60 * 1000);
    days.push(day);
  }

  return days;
}

interface responseSerialized {
  timesheets:TimsheetsProps[];
  specialists:SpecialistProps[];
  services:ServicesProps[]
}

const convertDateFromUTC = (utcDateStr:string) => {

  const utcDate = new Date(utcDateStr);
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = new Date(utcDate.toLocaleString('en-US', { timeZone: localTimeZone }));

  return localDate;
}

export const serializedDataTimeSheets = (data:any) => {
  var response:responseSerialized = {
    timesheets:[],
    specialists:[],
    services:[]
  } 


  for(let i=0; i < data.time_sheets.length; i++){
      var timesheet:TimsheetsProps  = { specialist_id:0, start_date:new Date(), end_date: new Date() };
      timesheet.specialist_id       = data.time_sheets[i].specialist_id;
      timesheet.start_date          = convertDateFromUTC(data.time_sheets[i].start_date);
      timesheet.end_date            = convertDateFromUTC(data.time_sheets[i].end_date);
      response.timesheets.push(timesheet);
  }

  for(let i=0; i < data.specialist.length; i++){
      var specialist:SpecialistProps = { id:0, name:"",sex:"",services:[],profile_image:"",summary:"",experiences:[],educations:[],awards:[],evaluated_rate:1 };
      specialist.id                  = data.specialist[i].id;
      specialist.name                = "Diego Pena Vicente";
      specialist.sex                 = data.specialist[i].sex;
      var raw_services:any           = Object.keys(data.specialist[i].services).length > 0  ?  Object.values(data.specialist[i].services) : [];
      for(let j=0; j < raw_services.length; j++){
        let service:ServicesPropsSpecialist = { id_service:0, name_service:"" }
        service.id_service =  Number(raw_services[j].id_service);
        service.name_service = raw_services[j].name_service;
        specialist.services.push(service);
      }

      specialist.profile_image       = data.specialist[i].profile_image ? data.specialist[i].profile_image : "";
      specialist.summary             = data.specialist[i].summary ? data.specialist[i].summary : "";
      specialist.experiences          = Object.keys(data.specialist[i].experiences) ? Object.values(data.specialist[i].experiences) : [] ;
      specialist.educations           = Object.keys(data.specialist[i].educations) ? Object.values(data.specialist[i].educations) : [];
      specialist.awards              = Object.keys(data.specialist[i].awards) ? Object.values(data.specialist[i].awards) : [];
      specialist.evaluated_rate      = data.specialist[i].evaluated_rate ? data.specialists[i].evaluated_rate : 1;

      response.specialists.push(specialist);
  }

  var services:ServicesProps[] = [];

  for(let i=0; i < data.services.length; i++){
    let service:ServicesProps = { id:0, name:"",options:[] }
    service.id                       =  Number(data.services[i].id);
    service.name                     =  data.services[i].name;
    var parsedOptions                =  JSON.parse(data.services[i].options);
    parsedOptions                    =  Object.keys(parsedOptions).length > 0  ?  Object.values(parsedOptions) : []; 
    for(let j=0; j < parsedOptions.length; j++){
        let Option:ServiceOptionProps = {id:0, price:0, duration:0};
        Option.id = Number(parsedOptions[j].id);
        Option.price = Number(parsedOptions[j].price)
        Option.duration = Number(parsedOptions[j].duration)
        service.options.push(Option);
    }
    services.push(service);
  }


  response.services = services;

  return response;
}

export const formatTimeinString = (time:Date) => {

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const formattedHours = hours < 10 ? "0" + hours : hours;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedTime = formattedHours + ":" + formattedMinutes;

  return  formattedTime;
} 

export const formatDayinString = (date:Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Note: Months are zero-based, so we add 1.
    const year = date.getFullYear();

    // Format the components with leading zeros if necessary
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');

    // Create the formatted date string in DD-MM-YYYY format
    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

    return formattedDate 
}

export const serializedTimes = (timesSheets:TimsheetsProps[]) => {

  var times:string[] = [];

  for(let i=0; i < timesSheets.length; i++){
    const start:Date = timesSheets[i].start_date;
    const end:Date = timesSheets[i].end_date;

    const currentHour = new Date(start);
    while (currentHour < end) {
      const time = formatTimeinString(currentHour);
      times.push(time);
      currentHour.setMinutes(currentHour.getMinutes() + 60); // Assuming 30-minute intervals
    }
  }

  return times
}


export const calculateTotalAmount = (sessions:Session[]) =>{
  var totalAmount = 0;

  for(let i=0; i < sessions.length; i++ ){
    totalAmount += sessions[i].option.price;
  }

  return totalAmount;
}

export const getAuthCookies = () => {
    const cookies:any = document.cookie.split(';');
    const specificCookies:any = {};

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        // Check if the cookie starts with the specified names
        if (cookie.startsWith('nuna_session=') || cookie.startsWith('XSRF-TOKEN=')) {
            const [name, value] = cookie.split('=');
            specificCookies[name] = value;
        }
    }

    return specificCookies;
}

export const deleteAuthCookies = () => {
    const cookies = getAuthCookies();

    for (const cookieName in cookies) {
        if (cookies.hasOwnProperty(cookieName)) {
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
    }
}
