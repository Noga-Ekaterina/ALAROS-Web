import {HTMLInputTypeAttribute} from "react";

export interface IHtmlString{
  html: string
}

export interface IHomeData {
  mainTitle: string
  mainSection: IHtmlString
  bannersDesktop: string[]
  bannersMobile: string[]
  events: IHtmlString
  newsTitle: string
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
  title: string
  description: string;
  place: string;
};

export interface IEventsDataYear {
  year: number
  events: IHtmlString
}

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
  premiyaRightSignature: IHtmlString
  premiyaSteps: IHtmlString[]
  priceTitle: string
  priceTable: IHtmlString
  priceRunningLine: IHtmlString
  dateText: IHtmlString
  dateSections: IHtmlString[]
  bidTitle: string
  bidInputs: IFormInput[]
  bidButton: string
  documentsTitle: string
  documentsLinks: IHtmlString[]
  emails: IHtmlString[]
  diplomaTitle: string
  diplomaInputs: IFormInput[]
  juriesTitle: string
  protectionsTitle: string
  projectsTitle: string
  projectsRightSignature: IHtmlString
  projects: IProject[]
  businessProgramDate: string
  businessProgramTitle: string
  businessProgramTime: string
  businessProgramRightSignature: IHtmlString
  businessProgramSessions: IHtmlString[]
  forumTitle: string
  forumRightSignature: IHtmlString
  forumDescriptionBlocks: IHtmlString[]
  forumImages: string[]
  forumRegistration: IHtmlString
  forumProgramTitle: string
  forumProgram: IHtmlString[]
  forumContactsTitle: string
  forumContactsImage: string
  forumContacts: IHtmlString
  forumSocials: IHtmlString[]
}

export interface IJury{
  name: string
  place: string
  image: string
  jobTitle: IHtmlString
}

export interface IProtectionsDay {
  date: string
  protections: IHtmlString
}

export interface IProject{
  number: number
  year: number
  name: string
  diploma: "gold" |"silver"|"bronze"|"president"|"grandPrix"
  winner: string
  nomination: string|null
}