import {HTMLInputTypeAttribute} from "react";

export interface IHtmlString{
  html: string
}
export type IImageSize = 'xxl' | 'xl' | 'large' | 'medium' | 'small' | 'xs' | 'thumbnail';

export interface IImageFormat {
  url: string;
  width: number;
  height: number;
  size: number; // в байтах
  mime?: string;
  ext?: string;
}

export interface IFile{
  id: number;
  url: string;
  size: number; // размер оригинала в байтах
}

export interface IImage extends IFile{
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats: {
    xxl?: IImageFormat;
    xl?: IImageFormat;
    large?: IImageFormat;
    medium?: IImageFormat;
    small?: IImageFormat;
    xs?: IImageFormat;
    thumbnail?: IImageFormat;
  };
}

export interface IMediaSizes {
  mobile?: IImageSize;
  tablet?: IImageSize;
  laptop?: IImageSize;
  desktop?: IImageSize;
  bigDesktop?: IImageSize;
}

export interface IHtml{
  text: string
}

export interface IButtonBlock{
  right: string
  left: string
}

export interface IMapCoordinates {
  latitude: number;
  longitude: number;
}

export interface IFooter{
  navigationColumn: string
  columns: IHtml[]
  mobileColumn: number
  socials: string
  socialsColumn: number
}

export interface IMenuSection {
  section: string;
  subsections: IHtml[];
}

export interface IMenu{
  sections: IMenuSection[]
  additionals: IHtml[]
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
  image: IImage;
  link: string|null;
}
export interface IPartnersSlider {
  title: string;
  partners: IPartner[]
}

export interface IInfopartnersSlider {
  infopartnersTitle: string;
  infopartnersText: IHtmlString
  infopartners: IHtmlString
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
  maxValue?: number
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
  start: string;
  end: string;
  title: string
  description: string;
  place: string;
  image: IImage
  link: string
};

export interface IEventsDataYear {
  year: number
  events: IEvent[]
}

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

export interface IPremiyaStep {
  text: string
  note?: string
}

export interface INews{
  mainTitle: string
  calendarEventsTitle: string
  newsTitle: string
  mainScreenProject: IProject
  allNews: IHtmlString
}

export interface IFestivalDate{
  title: string
  date: string
}

export interface IJuriesCommited{
  name: string
  note: string
  juries: IUser[]
}

export interface IFestival {
  mainScreenLeftSection: string
  mainScreenSections: IHtml[]
  mainScreenPhoto: IImage
  premiyaTitle: string
  premiyaSteps: IPremiyaStep[]
  priceTitle: string
  priceTable: string
  priceRunningLine: string
  dateText: string
  dateSections: IFestivalDate[]
  nominations: IFestivalNomination[]
  bidTitle: string
  bidInputs: IFormInput[]
  bidNote: string | null
  bidDateColumn: string
  bidDisabled: boolean
  documentsTitle: string
  documentsLinks: IButtonBlock[]
  templates: IButtonBlock
  templatesDownload: string
  templatesDisabled: boolean
  emails: IHtml[]
  diplomaTitle: string
  diplomaInputs: IFormInput[]
  diplomaNote: string|null
  juriesTitle: string
  juriesCommited: IJuriesCommited[]
  projectsTitle: string
  projectsRightSignature: string
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
  protectionsRightSignature: IHtmlString
  businessProgramTitle: string
  businessProgramSessions: IHtmlString[]
  isShowForum: boolean
  isShowInfopartners: boolean
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

export interface IFestivalNomination {
  number: number
  title: string
  file: IFile|null
}

export interface IUser {
  name: string
  place: string
  image: IImage
  jobTitle: string
}

export interface IProtectionsDay {
  date: string
  place: string
  table: IHtmlString
}

export type TDiploma= "gold" |"silver"|"bronze"|"president"|"grandPrix"

export interface IProject{
  number: number
  year: number
  name: string
  diploma: TDiploma
  winner: string
  nomination: null|{
    textInProjects: string|null
  }
  nominationId: string|null
  cover: IImage
  images: IImage[]
  signature: null|string
}

export interface INominationFilter{
  name: string
  id: number
}

export interface IProjectsPage{
  title: string
  years: string
  nominations: INominationFilter[]
}

export interface ICompetitionResultsYear{
  year: number
  link: string
}

export interface ICompetitionResults{
  mainScreenLeftSection: string
  mainScreenProject: IProject
  resultsTitle: string
  results: ICompetitionResultsYear[]
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
  membershipDisabled: boolean

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
  lifeSignature: IHtmlString
  life: IHtmlString;

  // Press Section
  pressTitle: string;
  press: IHtmlString;

  // Map Section
  mapTitle: string;
  mapTopColumns: IHtmlString[]; // Multiple values
  map: string
  mapInfoColumns: IHtmlString[]; // Multiple values
  mapBottom: IHtmlString
}