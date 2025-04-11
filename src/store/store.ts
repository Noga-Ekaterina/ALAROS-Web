import { makeAutoObservable } from 'mobx';

class Store {
  isMenuOpened = false;
  isLoading= false

  constructor() {
    makeAutoObservable(this);
  }

  togleMenu =()=>{
    this.isMenuOpened= !this.isMenuOpened
  }

  togleLoading=(value: boolean)=>{
    this.isLoading= value
  }
}

export default new Store();