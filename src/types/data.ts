import {HTMLInputTypeAttribute} from "react";

export interface IHtmlString{
  html: string
}

export interface IHomeData {
  announcements:{
    title:string
    text: string
    slides:number
  }
  partners: IPartner[]
}

export interface IPartner {
  title: string;
  href: string;
}

export interface ILink {
  text: string
  href: string
}

export interface ILinkColor extends ILink{
  color: string
}

export interface IFormInput{
  name: string
  type: HTMLInputTypeAttribute |"radios"|"dropdown"
  placeholder: string
  note?: string
  values: string[]
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

export interface IFestivalPriceRow{
  count: string
  price: string|number
}

export interface IFestivalPrice extends ITitlesBlock {
  table:{
    titles: IFestivalPriceRow
    rows: IFestivalPriceRow[]
  }
  runningLine: {
    text: string
    white: string[]
  }
}

export interface IFestivalDateSection{
  title: string
  date: string
}

export interface IFestivalBid extends ITitlesBlock{
  form:{
    inputs: IFormInput[]
  }
}

export interface IFestival {
  mainScreenLeftSection: IHtmlString
  mainScreenSections: IHtmlString
  premiyaTitle: string
  premiyaSection: string
  premiyaSteps: IHtmlString[]
  priceTitle: string
  priceTable: IHtmlString
  priceRunningLine: IHtmlString
  dateText: IHtmlString
  dateSections: IHtmlString[]
  bidTitle: string
  bidInputs: IFormInput[]
  bidButton: string
}