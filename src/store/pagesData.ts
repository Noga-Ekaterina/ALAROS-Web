import { makeAutoObservable } from "mobx";
import {fetchData} from "../utils/fetchData";
import {IEventsByYear, IHomeData} from "../types/data";


class Store {
  constructor() {
    makeAutoObservable(this);
  }

  homeData: IHomeData|null= null

  calendarEvents: IEventsByYear|null= null

  fetchHomeData= async ()=>{
    this.homeData= await fetchData("Pages/Home/data.json")
  }

  fetchCalendarEvents= async ()=>{
    this.calendarEvents= await fetchData("Pages/Home/Calendar-events/data.json")
  }
}

export default new Store()