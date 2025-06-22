import React from 'react';
import "./contacts-addresses-socials.scss"
import {IContacts} from "@/types/data";
import HtmlProcessing from "@/components/HtmlProcessing";
// import Map from "@/components/map/Map";
import {getLinks} from "@/components/_contacts/contacts-addresses-socials/getLinks";
import dynamic from "next/dynamic";

const Map = dynamic(
    () => import('@/components/map/Map'),
    {
      ssr: false,
      loading: () => <div className="h-[400px] bg-gray-200 animate-pulse rounded-md" />
    }
);

interface Props{
  data: IContacts
}

const ContactsAddressesSocials = ({data}: Props) => {
  const links= getLinks(data.socialsIcons.html)

  return (
      <div className="contacts-addresses-socials">
        <div className="contacts-addresses-socials__item">
          <div className="contacts-addresses-socials__text">
            <HtmlProcessing html={data.contactsColumns[0].html}/>
          </div>

          <div className="contacts-addresses-socials__icons">
            {
              links.map(({link, icon})=>(
                  <a href={link} target="_blank" key={icon} className="contacts-addresses-socials__icon">
                    <img src={`/Assets/Icons/${icon}`} alt=""/>
                  </a>
              ))
            }
          </div>
        </div>

        <div className="contacts-addresses-socials__item contacts-addresses-socials__item--dark">
          <div className="contacts-addresses-socials__text">
            <HtmlProcessing html={data.contactsColumns[1].html}/>
          </div>
        </div>

        <Map coordinatesObj={data.mapCoordinates} className="contacts-addresses-socials__map"/>
      </div>
  );
};

export default ContactsAddressesSocials;
