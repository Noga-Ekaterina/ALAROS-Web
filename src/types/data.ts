import {HTMLInputTypeAttribute} from "react";

export interface IHtmlString{
  html: string
}

export interface IMapCoordinates {
  latitude: number;
  longitude: number;
}

export interface IFooter{
  navigationColumn: IHtmlString
  columns: IHtmlString[]
  mobileColumns: number[]
  socials: IHtmlString
  socialsColumn: number
}

export interface IMenuSection {
  section: IHtmlString;
  subsections: IHtmlString[];
  position: number;
  isAdditional: boolean
}

export interface IHomeMainScreen{
  mainTitle: string
  mainSection: IHtmlString
  projects: IProject[]
}

export interface IHomeBaners{
  bannersDesktop: string[]
  bannersBigDesktop: string[],
  bannersMobile: string[]
  events: IHtmlString
}

export interface IHomeData extends IHomeMainScreen, IHomeBaners{
  newsTitle: string
}

export interface IPartner {
  image: string;
  link: string;
}
export interface IPartnersSlider {
  title: string;
  partners: IHtmlString
}

export interface ILink {
  text: string
  href: string
}

export interface ILinkColor extends ILink{
  color: string
}

export type EmailInputType= "name"|"phone"|"city"|"email"|"message"|"subject"

export interface IFormInput{
  name: string
  type: HTMLInputTypeAttribute |"radios"|"dropdown"|"nominations"
  placeholder: string
  necessarily: null|boolean
  values: string[]
  bidTableColumn: string
  diplomaTableColumn: string
  clue: string
  emailType: EmailInputType
}

export type TypeForm = "bid"|"diploma"|"email"

export interface IFormData{
  [key: string]: string
}

export interface IFormRequest extends IFormData{
  typeForm: TypeForm
  recaptcha: string
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
  image: string
  link: string
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
  mainTitle: string
  calendarEventsTitle: string
  newsTitle: string
  mainScreenProject: IProject
  allNews: IHtmlString
}

export interface IFestival {
  mainScreenLeftSection: IHtmlString
  mainScreenSections: IHtmlString
  mainScreenPhoto: string
  premiyaTitle: string
  premiyaSteps: IHtmlString[]
  priceTitle: string
  priceTable: IHtmlString
  priceRunningLine: IHtmlString
  dateText: IHtmlString
  dateSections: IHtmlString[]
  bidTitle: string
  bidInputs: IFormInput[]
  bidNote: IHtmlString
  bidDateColumn: string
  bidDisabled: boolean
  documentsTitle: string
  documentsLinks: IHtmlString[]
  templates: IHtmlString
  templatesDownload: IHtmlString
  templatesDisabled: boolean
  emails: IHtmlString[]
  diplomaTitle: string
  diplomaInputs: IFormInput[]
  diplomaNote: IHtmlString
  juriesTitle: string
  juries: IHtmlString[]
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

export interface IFestivalDetails {
  mainScreenLeftSection: IHtmlString
  mainScreenPhoto: string
  isShowAllContent: boolean
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
  jobTitle: string
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

export interface IContacts {
  title: string;
  addressesColumns: IHtmlString[];
  images: string[];
  contactsColumns: IHtmlString[];
  socialsIcons: IHtmlString;
  mapCoordinates: IMapCoordinates;
  formTitle: string
  formInputs: IFormInput[]
}

export interface IAbout {
  mainScreenLeftSection: IHtmlString
  mainScreenProject: IProject

  // Main About Section
  mainAboutTitle: string;
  mainAboutImage: string;
  mainAboutText: IHtmlString;
  mainAboutLinks: IHtmlString[]; // Multiple values

  documentsLinks: IHtmlString[]
  // Membership Section
  membership: IHtmlString;
  membershipLinks: IHtmlString[]; // Multiple values

  // History Section
  historyTitle: string;
  historyContent: IHtmlString[]; // Multiple values
  historyAdditions: IHtmlString[]; // Multiple values

  // People Section
  peopleTitle: string;

  // Management Section
  managementTitle: string;
  management: IHtmlString[]; // Multiple values

  // Presidium Section
  presidiumTitle: string;
  presidium: IHtmlString;

  lifeTitle: string;
  life: IHtmlString;

  // Press Section
  pressTitle: string;
  press: IHtmlString;

  // Map Section
  mapTitle: string;
  mapTopColumns: IHtmlString[]; // Multiple values
  map: string
  mapBottomColumns: IHtmlString[]; // Multiple values
}