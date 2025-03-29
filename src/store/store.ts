import { makeAutoObservable } from 'mobx';

class Store {
  isMenuOpened = false;

  constructor() {
    makeAutoObservable(this);
  }

  togleMenu =()=>{
    this.isMenuOpened= !this.isMenuOpened
  }
}

export default new Store();