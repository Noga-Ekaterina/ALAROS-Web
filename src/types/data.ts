export interface IHomeData {
  announcements:{
    title:string
    text: string
    slides:null
  }
}

export interface ILink {
  text: string
  href: string
}

export interface IEventDate {
  start: string;
  end: string;
};

export interface IEvent {
  date: IEventDate;
  link: ILink
  description: string;
  place: string;
};

export interface IEventsByYear {
  [year: string]: IEvent[];
};