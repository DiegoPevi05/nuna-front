interface ExperienceProps {
  header: string;
  subheader: string;
  from: string;
  to: string;
  is_active: boolean;
}

interface EducationProps {
  header: string;
  subheader: string;
  from: string;
  to: string;
  is_active: boolean;
}

interface AwardProps {
  header: string;
  subheader: string;
  date: string;
}

export interface ServicesPropsSpecialist {
  id_service: number;
  name_service: string;
}

export interface SpecialistProps {
  id: number;
  name: string;
  services: ServicesPropsSpecialist[];
  sex: string;
  profile_image: string;
  summary: string;
  experiences: ExperienceProps[];
  educations: EducationProps[];
  awards: AwardProps[];
  evaluated_rate: number;
}

export interface TimsheetsProps {
  specialist_id: number;
  start_date: Date;
  end_date: Date;
}

export interface Session {
  service_id: number;
  specialist_id: number;
  specialist_name: string;
  service_name: string;
  option: ServiceOptionProps;
  datetime: Date;
}

export interface ServicesProps {
  id: number;
  name: string;
  options: ServiceOptionProps[];
}

export interface ServiceOptionProps {
  id: number;
  price: number;
  duration: number;
}
