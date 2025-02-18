'use client'
import React, {JSX, useEffect, useState} from 'react';
import "./festival-bid.scss"
import {IFestival, INomination} from "@/types/data";
import Form from "@/components/form/Form";

interface Props{
  festivalText: IFestival
  nominations: INomination[]
}

const FestivalBid = ({festivalText, nominations}: Props) => {


  return (
      <div className="festival-bid" id="bid">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title titles-block__title--small">{festivalText.bidTitle}</h2>
          </div>
          <Form inputs={festivalText.bidInputs} btn={festivalText.bidButton} note={festivalText.bidNote.html} nominations={nominations}/>-
        </div>
      </div>
  );
};

export default FestivalBid;
