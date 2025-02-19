'use client'
import React, {useEffect, useState} from 'react';
import "./festival-diploma.scss";
import Detalis from "../../detalis/Detalis";
import Input from "../../input/Input";
import {IFestival, INomination} from "@/types/data";
import Form from "@/components/form/Form";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props{
  festivalText: IFestival
  nominations: INomination[]
}

const FestivalDiploma = ({festivalText, nominations}: Props) => {
  return (
      <div className="festival-diploma" id="diploma">
        <Detalis
            title={<span>{nonBreakingSpaces(festivalText.diplomaTitle)}</span>}
        >
          <div className="container">
            <Form inputs={festivalText.diplomaInputs} btn={festivalText.bidButton} note={festivalText.diplomaNote.html} nominations={nominations}/>
          </div>
        </Detalis>
      </div>
  );
};

export default FestivalDiploma;
