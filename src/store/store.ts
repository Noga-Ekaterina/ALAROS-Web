import { makeAutoObservable } from 'mobx';

class Store {
  isMenuOpened = false;
  isLoading= false;
  noIsFirstOpen= false

  constructor() {
    makeAutoObservable(this);
  }

  togleMenu =()=>{
    this.isMenuOpened= !this.isMenuOpened
  }

  togleLoading=(value: boolean)=>{
    this.isLoading= value
  }

  chekedIsFirstOpen=()=>{
    this.noIsFirstOpen=true
  }
}

export default new Store();