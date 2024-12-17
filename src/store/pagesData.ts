import { makeAutoObservable } from "mobx";
import {fetchData} from "../utils/fetchData";
import {IEventsByYear, IFestival, IHomeData, IJury, INewsItem, INewsPages, IProtectionsDay} from "../types/data";
import axios from "axios";


class Store {
  constructor() {
    makeAutoObservable(this);
  }

  homeData: IHomeData|null= null

  calendarEvents: IEventsByYear|null= null

  newsPages: INewsPages={}

  festivalText: IFestival|null=null

  juries: IJury[]|null=null

  protectionsDays: IProtectionsDay[]|null=null

  fetchHomeData= async ()=>{
    this.homeData= await fetchData("Pages/Home/data.json")
  }

  fetchCalendarEvents= async ()=>{
    this.calendarEvents= await fetchData("Pages/Home/Calendar-events/data.json")
  }

  fetchNewsPage = (page: number) => {
    if (!(page in this.newsPages)) {
      axios({
        method: 'POST',
        url: process.env.REACT_APP_API_URL,
        data: {
          query: `
          query NewsAllQuery {
            newsAll(orderBy: date_DESC, first: ${10 * page}, skip: ${10 * (page - 1)}) {
              date
              description
              title
              slug
              body { html}
            }
          }`
        }
      }).then((resp) => {
        const news: INewsItem[] = resp.data.data.newsAll;

        // Здесь создаем массив новостей, чтобы он соответствовал типу
        this.newsPages[page] = news.map(item => ({
          ...item,
          date: new Date(item.date).toLocaleDateString("ru-RU", { year: 'numeric', month: '2-digit', day: '2-digit' })
        }));
      });
    }
  }

  fetchFestivalText= async (view: string) =>{
    axios({
      method: 'POST',
      url: process.env.REACT_APP_API_URL,
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
        date: new Date(item.date).toLocaleDateString("ru-RU", { year: 'numeric', month: '2-digit', day: '2-digit' })
      }))
    });
  }
}

export default new Store()