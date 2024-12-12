import React, {useEffect, useState} from 'react';
import "./festival-diploma.scss"
import pagesData from "../../../store/pagesData";
import Detalis from "../../detalis/Detalis";
import {Field, Form, Formik} from "formik";
import {IField} from "../../../types/tehnic";
import Input from "../../input/Input";

const FestivalDiploma = () => {
  const {festivalText}=pagesData
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

    console.log(result)

    setInputsObj(result)
  }, [festivalText])

  if (!festivalText||!inputsObj) return <div/>

  return (
      <div className="festival-diploma">
        <Detalis
            title={<span>{festivalText.diplomaTitle}</span>}
        >
          <Formik initialValues={inputsObj} onSubmit={()=>{}}>
            <Form className='container'>
              <div>
                {
                  festivalText.diplomaInputs.map((input, index)=>(
                      <Field
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
