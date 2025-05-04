import React, {Fragment, useEffect, useRef, useState} from 'react';
import "./form.scss"
import {Field, Form as FormikForm, Formik, FormikHelpers, useFormik} from "formik";
import {IField} from "@/types/tehnic";
import Input from "@/components/input/Input";
import {IFormInput, IFormRequest, INomination, TypeForm} from "@/types/data";
import HtmlProcessing from "@/components/HtmlProcessing";
import cn from "classnames";
import {getInitialValues} from "@/components/form/getInitialValues";
import ReCAPTCHA from 'react-google-recaptcha';
import axios from "axios";

interface Props{
  inputs: IFormInput[]
  note: string
  nominations: INomination[]
  typeForm: TypeForm
  bidNumberProjectColumn?: string
}

const Form = ({inputs, note, nominations, typeForm}:Props) => {
  const nameKey= typeForm=="bid"? "bidTableColumn" :"diplomaTableColumn"
  const [isSent, setIsSent] = useState(false)
  const [isError, setIsError] = useState(true)
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const initialValues = getInitialValues(inputs, nominations, nameKey);
  const handleSubmit = async (
      values: typeof initialValues,
      { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      const token = await recaptchaRef.current?.executeAsync();

      // Добавляем проверку наличия токена
      if (!token) {
        throw new Error('reCAPTCHA не пройдена');
      }

      // Исправляем типы и структуру запроса
      const response = await axios.post<{ ok: boolean }>(
          '/api/submit-form',
          {
            ...values,
            recaptcha: token,
            typeForm
          } as IFormRequest
      );

      // Правильная проверка ответа
      if (response.status !== 200 || !response.data.ok) {
        throw new Error('Ошибка сервера');
      }

      resetForm({values: initialValues})

      setIsSent(true);
      setTimeout(() => setIsSent(false), 4000);
    } catch (error) {
      setIsError(true);
    } finally {
      setSubmitting(false);
      recaptchaRef.current?.reset();
    }
  };



  const validate=(values: typeof initialValues)=> {
    const errors: { [key: string]: string } = {}

    for (const key in values) {
      const value = values[key]
      const input = inputs.find(item => item[nameKey] == key)

      if (!input) continue

      const regexTel = /^\+[\d\s\-]*$/;
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (input.necessarily && value === "")
        errors[key] = "заполните поле"
      else if ((input.type === "tel" && !regexTel.test(value)) || (input.type === "email" && !regexEmail.test(value)))
        errors[key] = "неверный формат"
    }

    setIsError(Object.keys(errors).length > 0)

    return errors
  }

  return (
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
        {({ isSubmitting,  }) =>(
            <FormikForm className="form">
              <div>
                {
                  inputs.map((input)=>(
                      <Fragment key={input[nameKey]}>
                        {
                          (input.type!=="radios" && input.type!=="nominations")?
                              <Field
                                  name={input[nameKey]}
                                  render={({field}: IField)=> (
                                      <Input input={input} field={field} />
                                  )}
                              />:
                              <Input input={input} field={{name: input[nameKey], value:'',}} nominations={nominations}/>
                        }
                      </Fragment>
                  ))
                }
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    size="invisible"
                />
              </div>
              <div className="form__row">
                <Field
                    type="submit"
                    value={ isSubmitting? "Отправляется": isSent? "Успешно отправлено": "Отправить"}
                    className={cn({
                      "btn-grey": true,
                      "form__btn": true,
                      "form__btn--submitting": isSubmitting,
                      "form__btn--error": isError && !isSent,
                      "form__btn--sent": isSent,
                    })}/>
                <div className="note">
                  <HtmlProcessing html={note}/>
                </div>
              </div>
            </FormikForm>

        )}
      </Formik>

  );
};

export default Form;
