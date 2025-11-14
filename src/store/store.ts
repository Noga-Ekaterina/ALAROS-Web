import { makeAutoObservable } from 'mobx';

class Store {
  isMenuOpened = false;
  isLoading= false;
  noIsFirstOpen= false
  isCookie = false
  isBack= false

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

  setIsCookie=(value: boolean)=>{
    this.isCookie=value
  }

  setIsBack=(value: boolean)=>{
    this.isBack=value
  }
}

export default new Store();