import React, {Fragment, JSX, useEffect, useState} from 'react';
import "./input.scss"
import {IFormInput, INomination, TypeForm} from "../../types/data";
import parse from "html-react-parser";
import Dropdown from "../dropdown/Dropdown";
import {IField} from "../../types/tehnic";
import {ErrorMessage, Field, useFormikContext} from "formik";
import {geNextLetter} from "@/utils/getNextLetter";

interface IProps extends IField{
  input: IFormInput
  nominations?: INomination[]
  form: TypeForm
}

const InputDropdown = ({input, field, nominations, form}: IProps) => {
  // Убираем локальное состояние, используем Formik values
  const values = nominations
      ? nominations.map(nomination => nomination.value)
      : input.values;
  const [value, setValue] = useState(nominations? nominations[0].value:input.type[0])

  // Получаем текущие значения из Formik
  const { setFieldValue } = useFormikContext();

  const handleChange = (selectedValue: string) => {
    setValue(selectedValue)
    const selectedNomination = nominations?.find(n => n.value === selectedValue);

    if (selectedNomination) {
      // Обновляем оба поля в Formik
      setFieldValue(field.name, selectedNomination.number.replaceAll(".", ","));
      setFieldValue(geNextLetter(field.name), selectedNomination.title);
    }else
      setFieldValue(field.name, selectedValue);
  };

  return(
      <div className="input input--dropdown">
        <span className="input__placeholder">{input.placeholder}</span>

        <Dropdown
            value={value}
            values={values}
            handleCheck={e => handleChange(e.target.value)}
            nominations={nominations}
            arrow={true}
            className="input__dropdown"
            id={`${form}-${input.name}`}
        />
      </div>
  );
};

const Input = ({input, field, nominations, form}: IProps) => {
  return (
      <>
        {
          (input.type==="text" || input.type==="tel" || input.type==='email' || input.type=="number") ?(
                  <div className="input">
                    <input {...field}
                        placeholder={input.placeholder}
                           type={input.type}
                           className="input__text"
                           autoComplete={
                            (input.type==="email" || input.type==="tel")? input.type
                                :                                 input.placeholder.includes("ФИО")? "username name"
                                    : "off"
                           }
                    />

                    <ErrorMessage name={field.name} component="span" className="red input__error"/>
                    <span className="input__clue">{input.clue}</span>
                  </div>
              )
              :
              input.type=="radios" ?(
                      <div className="input">
                        <span className="input__placeholder">{input.placeholder}</span>

                        <div className="input__radios">
                          {
                            input.values.map((value, valueIndex) => (
                                <Fragment key={`${field.name}-${valueIndex}`}>
                                  <Field name={field.name}
                                      value={value} type="radio" id={`${field.name}-${valueIndex}`}/>
                                  <label htmlFor={`${field.name}-${valueIndex}`}>{value}</label>

                                  {input.values? valueIndex< input.values.length-1 && <span className="input__radios-line"></span> :<></>}
                                </Fragment>
                            ))
                          }
                        </div>
                      </div>
                  )
                  :
                  input.type=="dropdown" ? <InputDropdown input={input} field={field} form={form}/>:
                      input.type=="nominations" && <InputDropdown input={input} field={field} nominations={nominations} form={form}/>
        }
      </>

  );
};

export default Input;
