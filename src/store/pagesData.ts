import { makeAutoObservable } from "mobx";
import {fetchData} from "../utils/fetchData";
import {IEventsByYear, IFestival, IHomeData, INewsItem, INewsPages} from "../types/data";
import axios from "axios";


class Store {
  constructor() {
    makeAutoObservable(this);
  }

  homeData: IHomeData|null= null

  calendarEvents: IEventsByYear|null= null

  newsPages: INewsPages={}

  festivalText: IFestival|null=null

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
              premiyaSection
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
            }
          }`
      }
    }).then((resp) => {
      console.log(resp)
      this.festivalText= resp.data.data.festivalS[0]
    });
  }
}

export default new Store()