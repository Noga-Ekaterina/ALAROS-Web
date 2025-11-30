import React from 'react';
import "./contacts-main-screen.scss"
import {IContacts} from "@/types/data";
import HtmlProcessing from "@/components/HtmlProcessing";

interface Props{
  data: IContacts
}

const ContactsMainScreen = ({data}: Props) => {
  return (
      <div className="contacts-main-screen">
        <img src="/Assets/Pages/Contacts/bg.svg" alt="" className="contacts-main-screen__bg"/>
        <div className="container">
          <h1 className="contacts-main-screen__title">{data.title}</h1>

          <div className="contacts-main-screen__addresses">
            {
              data.addressesColumns.map(({html}, index) => (
                  <div className="contacts-main-screen__column" key={index}>
                    <HtmlProcessing html={html}/>
                  </div>
              ))
            }
          </div>
        </div>

        <div className="contacts-main-screen__images">
          {
            data.images.map((img, index) => (
                <div
                    className={`contacts-main-screen__img contacts-main-screen__img--${index + 1}`} key={index}>
                  <img src={`/Assets/Pages/Contacts/${img}`} alt="" loading="lazy"/>
                </div>
            ))
          }
        </div>
      </div>
  );
};

export default ContactsMainScreen;
