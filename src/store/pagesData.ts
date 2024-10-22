import { makeAutoObservable } from "mobx";
import {fetchData} from "../utils/fetchData";
import {IEventsByYear, IHomeData, INewsItem, INewsPages} from "../types/data";
import axios from "axios";


class Store {
  constructor() {
    makeAutoObservable(this);
  }

  homeData: IHomeData|null= null

  calendarEvents: IEventsByYear|null= null

  newsPages: INewsPages={}

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
}

export default new Store()