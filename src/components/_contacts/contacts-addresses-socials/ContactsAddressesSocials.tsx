import React from 'react';
import "./contacts-addresses-socials.scss"
import {IContacts} from "@/types/data";
import HtmlProcessing from "@/components/HtmlProcessing";
// import Map from "@/components/map/Map";
import dynamic from "next/dynamic";
import Image from '@/components/Image';

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
  return (
      <div className="contacts-addresses-socials">
        <div className="contacts-addresses-socials__item">
          <div className="contacts-addresses-socials__text">
            <HtmlProcessing html={data.contactsColumns[0].text}/>
          </div>

          <div className="contacts-addresses-socials__icons">
            {
              data.socialsIcons.map(({link, icon})=>(
                  <a href={link} target="_blank" key={icon.id} className="contacts-addresses-socials__icon">
                    <Image image={icon} size='thumbnail'/>
                  </a>
              ))
            }
          </div>
        </div>

        <div className="contacts-addresses-socials__item contacts-addresses-socials__item--dark">
          <div className="contacts-addresses-socials__text">
            <HtmlProcessing html={data.contactsColumns[1].text}/>
          </div>
        </div>

        {/* <Map coordinatesObj={data.mapCoordinates} className="contacts-addresses-socials__map"/> */}
      </div>
  );
};

export default ContactsAddressesSocials;
