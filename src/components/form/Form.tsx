import React, {Fragment, useEffect, useState} from 'react';
import "./form.scss"
import {Field, Form as FormikForm, Formik, FormikHelpers} from "formik";
import {IField} from "@/types/tehnic";
import Input from "@/components/input/Input";
import {IFormInput, INomination} from "@/types/data";
import HtmlProcessing from "@/components/HtmlProcessing";
import cn from "classnames";

interface Props{
  inputs: IFormInput[]
  note: string
  nominations: INomination[]
}

const Form = ({inputs, note, nominations}:Props) => {
  const [inputsObj, setInputsObj] = useState<{ [key: string]: string }|null>(null)
  const [isSent, setIsSent] = useState(false)
  const [isError, setIsError] = useState(true)

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

    setIsError(Object.keys(errors).length>0)

    return errors
  }

  const handleSubmit=(values: {   [p: string]: string }, {resetForm}: FormikHelpers<{   [p: string]: string }>)=>{
    resetForm()
    setIsSent(true)
    setIsError(true)
    setTimeout(()=> setIsSent(false), 3000)
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
      <Formik initialValues={inputsObj} onSubmit={handleSubmit} validate={validate}>
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
            <Field type="submit" value={isSent? "Успешно отправлено": "Отправить"} className={cn({"btn-grey": true,"form__btn": true, "form__btn--error": isError && !isSent, "form__btn--sent": isSent})}/>
            <div className="note">
              <HtmlProcessing html={note}/>
            </div>
          </div>
        </FormikForm>
      </Formik>

  );
};

export default Form;
