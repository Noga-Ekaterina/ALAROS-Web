import {HTMLInputTypeAttribute} from "react";

export interface IHtmlString{
  html: string
}

export interface IFooter{
  columns: IHtmlString[]
  mobileColumns: number[]
  socials: IHtmlString
  socialsColumn: number
}

export interface IHomeMainScreen{
  mainTitle: string
  mainSection: IHtmlString
  projects: IProject[]
}

export interface IHomeBaners{
  bannersDesktop: string[]
  bannersMobile: string[]
  events: IHtmlString
}

export interface IHomeData extends IHomeMainScreen, IHomeBaners{
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
  type: HTMLInputTypeAttribute |"radios"|"dropdown"|"nominations"
  placeholder: string
  necessarily: null|boolean
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
  cover: string
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

export interface INews{
  title: string
  mainScreenProject: IProject
  allNews: IHtmlString
}

export interface IFestival {
  mainScreenLeftSection: IHtmlString
  mainScreenSections: IHtmlString
  mainScreenPhoto: string
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
  bidNote: IHtmlString
  documentsTitle: string
  documentsLinks: IHtmlString[]
  templates: IHtmlString
  templatesDownload: IHtmlString
  emails: IHtmlString[]
  diplomaTitle: string
  diplomaInputs: IFormInput[]
  diplomaNote: IHtmlString
  juriesTitle: string
  projectsTitle: string
  projectsRightSignature: IHtmlString
  projects: IProject[]
}

export interface IFestivalProgramDay {
  date: string
  schedule: IHtmlString
  businessProgram: IHtmlString|null
  businessProgramPosition: number|null
  fullVersionBusinessProgram: IHtmlString|null
}

export interface IFestivalToPeople {
  mainScreenLeftSection: IHtmlString
  mainScreenProject: IProject
  isShowFestivalProgram: boolean|null
  festivalProgramTitle: string
  festivalProgramColumns: IHtmlString
  isShowProtectionsDays: boolean
  protectionsTitle: string
  businessProgramTitle: string
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

export interface INomination{
  number: string
  title: string
  link: string
  value: string
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

export type TDiploma= "gold" |"silver"|"bronze"|"president"|"grandPrix"

export interface IProject{
  number: number
  year: number
  name: string
  diploma: TDiploma
  winner: string
  nomination: string|null
  nominationId: string|null
  cover: string
  images: string[]
  signature: null|string
}

export interface IProjectsPage{
  title: string
  years: string
  nominations: IHtmlString
}

export interface ICompetitionResults{
  mainScreenLeftSection: IHtmlString
  mainScreenProject: IProject
  resultsTitle: string
  results: IHtmlString
}