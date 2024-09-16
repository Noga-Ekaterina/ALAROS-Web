import { makeAutoObservable } from "mobx";
import {fetchData} from "../utils/fetchData";
import {IHomeData} from "../types/data";


class Store {
  constructor() {
    makeAutoObservable(this);
  }

  homeData: IHomeData|null= null

  fetchHomeData= async ()=>{
    this.homeData= await fetchData("Pages/Home/data.json")
  }
}

export default new Store()