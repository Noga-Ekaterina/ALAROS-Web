import React from 'react';
import './festival-main-screen.scss'
const FestivalMainScreen = () => {
  return (
      <div className="main-screen festival-main-screen">
        <div className="festival-main-screen__block-text">
          <h1 className="festival-main-screen__title">Национальная премия России по ландшафтной архитектуре <br/>
            и садово-парковому искусству — главное событие года в отрасли</h1>
        </div>

        <div className="festival-main-screen__img-wrapp">
          <img src="/Assets/Pages/Festival/Images/Main.png" alt="" className="main-screen__img festival-main-screen__img"/>
        </div>
      </div>
  );
};

export default FestivalMainScreen