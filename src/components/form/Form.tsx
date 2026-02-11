'use client'
import React, {Fragment, useEffect, useRef, useState} from 'react';
import "./form.scss"
import {Field, Form as FormikForm, Formik, FormikHelpers, useFormik} from "formik";
import {IField} from "@/types/tehnic";
import Input from "@/components/input/Input";
import {IFormInput, IFormRequest, IFestivalNomination, TypeForm} from "@/types/data";
import HtmlProcessing from "@/components/HtmlProcessing";
import cn from "classnames";
import {getInitialValues} from "@/components/form/getInitialValues";
import ReCAPTCHA from 'react-google-recaptcha';
import axios from "axios";
import Alert from "@/components/alert/Alert";
import {createDate} from "@/utils/date";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props{
  inputs: IFormInput[]
  note?: string|null
  nominations?: IFestivalNomination[]
  typeForm: TypeForm
  dateColumn?: string
  disabled?: boolean
}

const Form = ({inputs, note, nominations, typeForm, dateColumn, disabled}:Props) => {
  const nameKey= typeForm=="email"? "emailType" : typeForm=="bid"? "bidTableColumn" :"diplomaTableColumn"
  const [isSent, setIsSent] = useState(false)
  const [isError, setIsError] = useState(true)
  const [isErrorSubmit, setIsErrorSubmit] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [key, setKey] = useState(0)

  const initialValues = getInitialValues(inputs, nameKey, nominations);
  const handleSubmit = async (
      values: typeof initialValues,
      { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      const token = await recaptchaRef.current?.executeAsync().catch((error) => {
        throw new Error(`reCAPTCHA error: ${error.message}`);
      });

      // Добавляем проверку наличия токена
      if (!token) {
        throw new Error('reCAPTCHA не пройдена');
      }

      const request: IFormRequest={
        ...values,
        recaptcha: token,
        typeForm
      }

      if (dateColumn){
        const {dayNumber, monthNumber, yearShort}= createDate()

        request[dateColumn]= `${dayNumber}.${monthNumber}.${yearShort}`
      }

      // Исправляем типы и структуру запроса
      const response = await axios.post<{ ok: boolean }>(
          typeForm=="email"? '/api/contact':'/api/submit-form',
          request
      );

      console.log(response)

      // Правильная проверка ответа
      if (response.status !== 200 || !response.data.ok) {
        throw new Error('Ошибка сервера');
      }

      resetForm({values: initialValues})
      setKey(prevState => prevState+1)

      setIsSent(true);
      setTimeout(() => setIsSent(false), 4000);
    } catch (error) {
      setIsErrorSubmit(true);
      console.log(error)

      setTimeout(()=> setIsErrorSubmit(false), 3000)
    } finally {
      setSubmitting(false);
      recaptchaRef.current?.reset();
    }
  };

  const validate=(values: typeof initialValues)=> {
    const errors: { [key: string]: string } = {}

    for (const key in values) {
      const input = inputs.find(item => item[nameKey] == key)

      if (!input) continue
      const value = (key in values) ? input.type=="number"? values[key] : values[key]?.trim() || '' : '';

      const regexTel = /^\+[\d\s\-]*$/;
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (input.necessarily && value === "")
        errors[key] = "заполните поле"
      else if (value !=="" && ((input.type === "tel" && !regexTel.test(value)) || (input.type === "email" && !regexEmail.test(value))))
        errors[key] = "неверный формат"
      else if (input.maxValue && value.length>input.maxValue)
        errors[key]= `максимум ${input.maxValue} символов`
    }

    setIsError(Object.keys(errors).length > 0)

    console.log(errors)

    return errors
  }

  return (
      <>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
          {({ isSubmitting,  }) =>(
              <FormikForm className="form">
                <fieldset disabled={disabled}>
                  <div key={key}>
                    {
                      inputs.map((input) => {
                        if (input[nameKey]){
                          return (
                              <Fragment key={input[nameKey]}>
                                {
                                  (input.type !== "radios" && input.type !== "nominations" && input.type !== "dropdown") ?
                                      <Field
                                          name={input[nameKey]}
                                          render={({field}: IField) => (
                                              <Input input={input} field={field} form={typeForm}/>
                                          )}
                                      />
                                      :
                                      <Input input={input} field={{name: input[nameKey], value: '',}}
                                             nominations={nominations} form={typeForm}/>
                                }
                              </Fragment>
                          )
                        }
                      })
                    }
                  </div>

                  <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                      size="invisible" style={{display: "none"}}
                  />
                  <div className="form__row">
                    <div className="form__btn-and-warning">
                      <Field
                          type="submit"
                          value={disabled? "Набор закрыт": isSubmitting ? "Отправляется" : isSent ? "Успешно отправлено" : "Отправить"}
                          className={cn({
                            "form__btn": true,
                            "form__btn--submitting": isSubmitting,
                            "form__btn--error": isError && !isSent,
                            "form__btn--sent": isSent,
                          })}
                      />

                      <div className="form__warning">
                        Отправляя форму, <br/>
                        вы соглашаетесь на обработку <br/>
                        персональных данных
                      </div>
                    </div>

                    {
                        note &&
                        <div className="note">
                          {nonBreakingSpaces(note)}
                        </div>
                    }
                  </div>
                </fieldset>
              </FormikForm>

          )}
        </Formik>

        {
          isErrorSubmit && <Alert message="Ошибка отправки формы"/>
        }
      </>
  );
};

export default Form;
