'use client'
import React, {JSX, useEffect, useState} from 'react';
import "./festival-bid.scss"
import {IFestival, IFestivalNomination} from "@/types/data";
import Form from "@/components/form/Form";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props{
  pageData: IFestival
}

const FestivalBid = ({pageData}: Props) => {


  return (
      <div className="festival-bid" id="bid">
        <div className="container">
          <div className="titles-block">
            <h2
                className="titles-block__title titles-block__title--small"
                style={{
                  color: pageData.bidDisabled? "var(--c-grey-bg)":""
                }}
            >
              {nonBreakingSpaces(pageData.bidTitle)}
            </h2>
          </div>
          <Form inputs={pageData.bidInputs} note={pageData.bidNote} nominations={pageData.nominations} typeForm="bid" disabled={pageData.bidDisabled} dateColumn={pageData.bidDateColumn}/>
        </div>
      </div>
  );
};

export default FestivalBid;
