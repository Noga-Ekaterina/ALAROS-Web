'use client'
import React, {useEffect, useState} from 'react';
import "./festival-diploma.scss";
import Detalis from "../../detalis/Detalis";
import {Field, Form, Formik} from "formik";
import {IField} from "../../../types/tehnic";
import Input from "../../input/Input";
import {IFestival} from "@/types/data";

interface Props{
  festivalText: IFestival
}

const FestivalDiploma = ({festivalText}: Props) => {
  const [inputsObj, setInputsObj] = useState<{ [key: string]: string }|null>(null)

  useEffect(() => {
    const result: {[key: string]: string}={}

    festivalText.bidInputs.forEach((input, index)=>{
      if (input.values.length==0){
        result[index]=''
      }else
        result[index]=input.values[0]
    })

    console.log(result)

    setInputsObj(result)
  }, [festivalText])

  if (!inputsObj) return <div/>

  return (
      <div className="festival-diploma" id="diploma">
        <Detalis
            title={<span>{festivalText.diplomaTitle}</span>}
        >
          <Formik initialValues={inputsObj} onSubmit={()=>{}}>
            <Form className='container'>
              <div>
                {
                  festivalText.diplomaInputs.map((input, index)=>(
                      <Field
                          key={index}
                          name={index}
                          render={({field}: IField)=> (
                              <Input input={input} field={field}/>
                          )}
                      />
                  ))
                }
              </div>
              <Field type="submit" value={festivalText.bidButton} className="festival-bid__btn"/>
            </Form>
          </Formik>
        </Detalis>
      </div>
  );
};

export default FestivalDiploma;
