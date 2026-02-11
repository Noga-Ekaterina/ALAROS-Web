'use client'
import React, {useEffect, useState} from 'react';
import "./festival-diploma.scss";
import Detalis from "../../detalis/Detalis";
import Input from "../../input/Input";
import {IFestival, IFestivalNomination} from "@/types/data";
import Form from "@/components/form/Form";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props{
  pageData: IFestival
}

const FestivalDiploma = ({pageData}: Props) => {
  return (
      <div className="festival-diploma" id="diploma">
        <Detalis
            title={<span>{nonBreakingSpaces(pageData.diplomaTitle)}</span>}
            hash="diploma"
            isBigGray={true}
        >
          <div className="container">
            <Form inputs={pageData.diplomaInputs} note={pageData.diplomaNote} nominations={pageData.nominations} typeForm="diploma"/>
          </div>
        </Detalis>
      </div>
  );
};

export default FestivalDiploma;
