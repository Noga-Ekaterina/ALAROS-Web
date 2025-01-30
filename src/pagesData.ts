import {
  IEventsDataYear,
  IFestival,
  IHomeData,
  IJury,
  INews,
  INewsItem,
  INewsPages, IProjectsPage,
  IProtectionsDay
} from "@/types/data";

interface IData{
  home?:{
    homeData: IHomeData
    calendarEvents: IEventsDataYear[]
    news: INewsItem[]
  }
  newsPages: INewsPages
  news?: INews
  festival?:{
    festivalText: IFestival
    juries: IJury[]
    protectionsDays: IProtectionsDay[]
  }
  projectsPage?: IProjectsPage
}

export const pagesData: IData={
  newsPages:{}
}