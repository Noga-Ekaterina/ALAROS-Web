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

export interface ILinkColor extends ILink{
  color: string
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

export interface INewsItem {
  title: string
  description: string
  slug: string
  date: string
  place: string| null
  body:{
    html: string
  }
}

export interface INewsPages {
  [pages: string]: INewsItem[]
}

export interface ITitlesBlock{
  title: string
  section?: string | ILink
}

export interface IStep{
  text: string
  links: ILinkColor[]
  note?: string[]
}

export interface IFestivalPremiya extends ITitlesBlock{
  steps: IStep[]
}

export interface IFestival{
  premiya: IFestivalPremiya
}