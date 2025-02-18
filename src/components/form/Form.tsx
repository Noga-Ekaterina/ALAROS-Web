import React, {Fragment, useEffect, useState} from 'react';
import "./form.scss"
import {Field, Form as FormikForm, Formik} from "formik";
import {IField} from "@/types/tehnic";
import Input from "@/components/input/Input";
import {IFormInput, INomination} from "@/types/data";
import HtmlProcessing from "@/components/HtmlProcessing";

interface Props{
  inputs: IFormInput[]
  btn: string
  note: string
  nominations: INomination[]
}

const Form = ({inputs, btn, note, nominations}:Props) => {
  const [inputsObj, setInputsObj] = useState<{ [key: string]: string }|null>(null)

  const validate=(values:{ [key: string]: string })=>{
    const errors:{ [key: string]: string }={}

    for (const key in values) {
      const value= values[key]
      const input= inputs[Number(key)]
      const regexTel = /^\+[\d\s\-]*$/;
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (input.necessarily && value==="")
        errors[key]= "заполните поле"
      else if ((input.type==="tel" && !regexTel.test(value)) || (input.type==="email" && !regexEmail.test(value)))
        errors[key]= "неверный формат"
    }

    return errors
  }

  useEffect(() => {
    const result: {[key: string]: string}={}

    inputs.forEach((input, index)=>{
      if (input.values.length==0 && input.type!=='nominations'){
        result[index]=''
      }else if (input.type==='nominations')
        result[index]=nominations[0].value
      else
        result[index]=input.values[0]
    })

    setInputsObj(result)
  }, [])

  if (!inputsObj) return <div/>
  return (
      <Formik initialValues={inputsObj} onSubmit={()=>{}} validate={validate}>
        <FormikForm className="form">
          <div>
            {
              inputs.map((input, index)=>(
                  <Fragment key={index}>
                    {
                      input.type!=="radios"?
                          <Field
                              name={index}
                              render={({field}: IField)=> (
                                  <Input input={input} field={field} nominations={nominations}/>
                              )}
                          />:
                          <Input input={input} field={{name: String(index), value:''}}/>
                    }
                  </Fragment>
              ))
            }
          </div>
          <div className="form__row">
            <Field type="submit" value={btn} className="form__btn"/>
            <div className="note">
              <HtmlProcessing html={note}/>
            </div>
          </div>
        </FormikForm>
      </Formik>

  );
};

export default Form;
