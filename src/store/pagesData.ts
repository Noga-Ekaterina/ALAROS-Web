import { makeAutoObservable } from "mobx";
import {
  IEventsByYear,
  IEventsDataYear,
  IFestival,
  IHomeData,
  IJury,
  INewsItem,
  INewsPages, IProject, IProjectsPage,
  IProtectionsDay, TDiploma
} from "../types/data";
import axios from "axios";
import {formaterDate} from "../utils/date/formaterDate";

const getNewsQueryStr=(page: number)=>(
    `
                newsAll(orderBy: date_DESC, first: ${10 * page}, skip: ${10 * (page - 1)}) {
              date
              description
              title
              slug
              body { html}
            }
    `
)

const getProjectsQueryStr= (year: null| string, diploma: null |string, page: number)=>{
  const diplomaFilter= diploma? `diploma: ${diploma}`:''
  const yearFilter= year? `year: ${year}, `:""

  return (`
    projectsConnection(
      stage: PUBLISHED,
      where: {${yearFilter}${diplomaFilter}},      first: ${10 * page}, skip: ${10 * (page - 1)}
    ) {
      aggregate {
        count
      }
    }
    projects(
      where: {${yearFilter}${diplomaFilter}},
      first: ${10 * page}, skip: ${10 * (page - 1)}
    ){
      name
      nomination
      number
      diploma
      year
      winner
    }
  `)
}
class Store {
  constructor() {
    makeAutoObservable(this);
  }

  homeData: IHomeData|null= null

  calendarEvents: IEventsDataYear[]|null= null

  newsPages: INewsPages={}

  festivalText: IFestival|null=null

  juries: IJury[]|null=null

  protectionsDays: IProtectionsDay[]|null=null

  projectsPages: IProjectsPage | null= null

  projects: IProject[] |null=null

  projectsCount=0

  fetchHomeData= async ()=>{
    axios({
      method: 'POST',
      url: process.env.NEXT_PUBLIC_API_URL,
      data: {
        query: `
          query MyQuery {
            homes {
              mainTitle
              mainSection {
                html
              }
              bannersDesktop
              bannersMobile
              events {
                html
              }
              newsTitle
            }
            eventsYears {
              year
              events {
                html
              }
            }
            ${getNewsQueryStr(1)}
          }`
      }
    }).then((resp) => {
      console.log(resp)
      const data=resp.data.data
      const {homes, eventsYears, newsAll}=data

      this.homeData= homes[0]

      this.calendarEvents= eventsYears

      this.newsPages[1] = newsAll.map((item: INewsItem) => ({
        ...item,
        date: formaterDate(item.date)
      }));
    });
  }

  fetchCalendarEvents= async ()=>{
    // this.calendarEvents= await fetchData("Pages/Home/Calendar-events/data.json")
  }

  fetchNewsPage = (page: number) => {
    if (!(page in this.newsPages)) {
      axios({
        method: 'POST',
        url: process.env.NEXT_PUBLIC_API_URL,
        data: {
          query: `
          query NewsAllQuery {
            ${getNewsQueryStr(page)}
          }`
        }
      }).then((resp) => {
        const news: INewsItem[] = resp.data.data.newsAll;

        // Здесь создаем массив новостей, чтобы он соответствовал типу
        this.newsPages[page] = news.map(item => ({
          ...item,
          date: formaterDate(item.date)
        }));
      });
    }
  }

  fetchFestivalText= async (view: string) =>{
    axios({
      method: 'POST',
      url: process.env.NEXT_PUBLIC_API_URL,
      data: {
        query: `
          query FestivalQuery {
            festivalS(stage: ${view.toUpperCase()}) {
              stage
              mainScreenLeftSection {
                html
              }
              mainScreenSections {
                html
              }
              premiyaTitle
              premiyaRightSignature{
                html
              }
              premiyaSteps {
                html
              }
              priceTitle
              priceTable {
                html
              }
              priceRunningLine{
                html
              }
              dateText {
                html
              }
              dateSections {
                html
              }
              bidTitle
              bidInputs(first: 100) {
                type
                placeholder
                values
              }
              bidButton
              documentsTitle
              documentsLinks {
                html
              }
              emails{
                html
              }
              diplomaTitle
              diplomaInputs(first: 100) {
                placeholder
                type
                values
              }
              juriesTitle
              protectionsTitle
              projectsTitle
              projectsRightSignature{
                html
              }
              projects {
                name
                nomination
                number
                diploma
                year
                winner
              }
              businessProgramDate
              businessProgramTime
              businessProgramTitle
              businessProgramRightSignature {
                html
              }
              businessProgramSessions {
                html
              }
              forumTitle
              forumRightSignature {
                html
              }
              forumImages
              forumDescriptionBlocks {
                html
              }
              forumRegistration {
                html
              }
              forumProgramTitle
              forumProgram {
                html
              }
              forumContactsTitle
              forumContactsImage
              forumContacts {
                html
              }
              forumSocials {
                html
              }
            }
            juries {
              name
              place
              image
              jobTitle {
                html
              }
            }
            protectionsDays(orderBy: date_ASC) {
              date
              protections {
                html
              }
            }
          }`
      }
    }).then((resp) => {
      console.log(resp)
      const data=resp.data.data
      const {festivalS, juries, protectionsDays}=data
      this.festivalText= festivalS[0]
      this.juries=juries
      this.protectionsDays=protectionsDays.map((item: IProtectionsDay) => ({
        ...item,
        date: formaterDate(item.date)
      }))
    });
  }

  fetchProjectsPage = (year: null| string, diploma: null |string, page: number)=>{
    axios({
      method: 'POST',
      url: process.env.NEXT_PUBLIC_API_URL,
      data: {
        query: `
          query NewsAllQuery {
            ${getProjectsQueryStr(year, diploma, page)}
            projectsPages {
              title
              years
            }
          }`
      }
    }).then((resp) => {
      const {projectsConnection, projects, projectsPages}= resp.data.data

      this.projectsCount= projectsConnection.aggregate.count
      this.projectsPages= projectsPages[0]
      this.projects= projects
    });
  }

  fetchProjects = (year: null| string, diploma: null |string, page: number)=>{
    axios({
      method: 'POST',
      url: process.env.NEXT_PUBLIC_API_URL,
      data: {
        query: `
          query NewsAllQuery {
            ${getProjectsQueryStr(year, diploma, page)}
          }`
      }
    }).then((resp) => {
      const {projectsConnection, projects}= resp.data.data

      this.projectsCount= projectsConnection.aggregate.count
      this.projects= projects
    });
  }
}

export default new Store()