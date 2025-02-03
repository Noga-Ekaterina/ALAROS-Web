'use client'
import React, {JSX, useEffect, useState} from 'react';
import "./festival-bid.scss"
import pagesData from "@/store/pagesData";
import {Form, Formik, Field} from "formik";
import Input from "../../input/Input";
import {IField} from "../../../types/tehnic";
import {IFestival, INomination} from "@/types/data";

interface Props{
  festivalText: IFestival
  nominations: INomination[]
}

const FestivalBid = ({festivalText, nominations}: Props) => {
  const [inputsObj, setInputsObj] = useState<{ [key: string]: string }|null>(null)

  useEffect(() => {
    if (!festivalText) return

    const result: {[key: string]: string}={}

    festivalText.bidInputs.forEach((input, index)=>{
      if (input.values.length==0){
        result[index]=''
      }else
        result[index]=input.values[0]
    })

    setInputsObj(result)
  }, [festivalText])

  if (!inputsObj) return <div/>

  return (
      <div className="festival-bid" id="bid">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title titles-block__title--small">{festivalText.bidTitle}</h2>
          </div>
          <Formik initialValues={inputsObj} onSubmit={()=>{}}>
            <Form>
              <div>
                {
                  festivalText.bidInputs.map((input, index)=>(
                      <Field
                          key={index}
                        name={index}
                        render={({field}: IField)=> (
                            <Input input={input} field={field} nominations={nominations}/>
                        )}
                      />
                  ))
                }
              </div>
              <Field type="submit" value={festivalText.bidButton} className="festival-bid__btn"/>
            </Form>
          </Formik>
        </div>
      </div>
  );
};

export default FestivalBid;
