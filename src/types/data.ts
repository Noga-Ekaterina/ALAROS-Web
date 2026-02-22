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

export interface IImageFormats  {
  xxl?: IImageFormat;
  xl?: IImageFormat;
  large?: IImageFormat;
  medium?: IImageFormat;
  small?: IImageFormat;
  xs?: IImageFormat;
  thumbnail?: IImageFormat;
}

export interface IFile{
  id: number;
  url: string;
  size: number; // размер оригинала в байтах
  updatedAt: string
}

export interface IImage extends IFile{
  alternativeText?: string;
  caption?: string;
  name?: string;
  width: number;
  height: number;
  formats: null | IImageFormats;
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
  mainSection: string
  projects: IProject[]
}

export interface IHomeBaners{
  bannersDesktop: IImage[]
  bannersBigDesktop: IImage[],
  bannersMobile: IImage[]
  events: string
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
  infopartnersText: string
  infopartners: IPartner[]
}

export interface IIconLink {
  link: string;
  icon: IImage
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

export interface IContentComponent {
  __component?: string;
  id: number;
  text?: string;
  images?: IImage[];
}

export interface INewsItem {
  title: string
  cover: IImage
  description: string
  slug: string
  date: string
  place: string | null
  body: IContentComponent[]
}

export interface INewsPages {
  [pages: string]: INewsItem[]
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
  juries: IWorker[]
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

export interface IFestivalProgramEvent {
  time: string
  title: string
  place: string
  businessProgram: string|null
  fullVersionBusinessProgram: string|null
}

export interface IFestivalProgramDay {
  date: string
  events: IFestivalProgramEvent[]
}

export interface IBusinessProgramSession{
  time: string
  title: string
  description: string
  moderatorTitle: string
  moderator: IHuman
  speakersTitle: string
  speakers: IHuman[]
}

export interface IBusinessProgramDay {
  date: string
  sections: IBusinessProgramSession[]
}

export interface IFestivalDetails extends IInfopartnersSlider{
  mainScreenLeftSection: string
  mainScreenPhoto: IImage
  isShowAllContent: boolean
  isShowFestivalProgram: boolean|null
  festivalProgramTitle: string
  festivalProgramColumns: string
  festivalProgram: IFestivalProgramDay[]
  businessProgramTitle: string
  businessProgram: IBusinessProgramDay[]
  isShowProtectionsDays: boolean
  protectionsTitle: string
  protectionsRightSignature: string
  protectionsColumns: string[]
  protectionsDays: IProtectionsDay[]
  isShowForum: boolean
  isShowInfopartners: boolean
  forumTitle: string
  forumRightSignature: string
  forumDescriptionBlocks: IHtml[]
  forumImages: IImage[]
  forumRegistration: string
  forumProgramTitle: string
  forumProgram: IHtml[]
  forumContactsTitle: string
  forumContact: IHumanContact
  forumSocials: IHtml[]
}

export interface IFestivalNomination {
  number: number
  title: string
  file: IFile|null
}

export interface IHuman {
  name: string
  image: IImage
  jobTitle: string
}

export interface IWorker extends IHuman{
  place: string
}

export interface IHumanContact extends IHuman{
  links: IHtml[]
}

interface IProtectionBase {
  time: string;
}

interface IProtectionBreak extends IProtectionBase {
  isBreak: true;
  breakTitle: string
}

interface IProtectionWork extends IProtectionBase {
  isBreak: false;
  isOnline: boolean
  number: number
  nomination: number
  name: string
  winner: string
}

type Protection = IProtectionBreak | IProtectionWork;

export interface IProtectionsDay {
  date: string
  place: string
  protections: Protection[]
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

export interface IContacts extends IMapCoordinates{
  title: string;
  addressesColumns: IHtml[];
  images: IImage[];
  contactsColumns: IHtml[];
  socialsIcons: IIconLink[];
  formTitle: string
  formInputs: IFormInput[]
}

export interface ILifeItem{
  image: IImage;
  size: 'horizontal' |'horizontal-small' | 'vertical' | 'square'
}

export interface IPress{
  image: IImage,
  caption: string,
  link: string
}

export interface IAbout {
  mainScreenLeftSection: string
  mainScreenProject: IProject

  // Main About Section
  mainAboutTitle: string;
  mainAboutImage: IImage;
  mainAboutText: string
  mainAboutLinks: IHtml[]; // Multiple values

  documentsLinks: IButtonBlock[]
  // Membership Section
  membership: IButtonBlock;
  membershipLinks: IHtml[]; // Multiple values
  membershipDisabled: boolean

  // History Section
  historyTitle: string;

  // People Section
  peopleTitle: string;

  // Management Section
  managementTitle: string;
  management: IHtmlString[]; // Multiple values

  // Presidium Section
  presidiumTitle: string;
  presidium: IWorker[];

  lifeTitle: string;
  lifeSignature: string
  life: ILifeItem[]

  // Press Section
  pressTitle: string;
  press: IPress[];

  // Map Section
  mapTitle: string;
  mapTopColumns: IHtml[]; // Multiple values
  map: IImage
  mapInfoColumns: IHtml[]; // Multiple values
  mapBottom: string
}
export interface IHistoryAdditionComponent {
  __component?: string
  id: number
  text?: string
  image?: IImage
  link: string
}

export interface IHistoryAddition {
  id: number
  body: IHistoryAdditionComponent[]
}

export interface IHistoryYear{
  year: number
  body: IContentComponent[]
  additions?: IHistoryAddition[]
}

export interface IDetails{
  title: string
  content: string
}

export interface IManagement extends IHuman{
  id: number
  signature: string
  description: string
  details: IDetails[]
}