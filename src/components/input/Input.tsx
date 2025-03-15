import React, {Fragment, JSX, useEffect, useState} from 'react';
import "./input.scss"
import {IFormInput, INomination} from "../../types/data";
import parse from "html-react-parser";
import Dropdown from "../dropdown/Dropdown";
import {IField} from "../../types/tehnic";
import {ErrorMessage, Field} from "formik";

interface IProps extends IField{
  input: IFormInput
  nominations?: INomination[]
}

const InputDropdown=({input, field, nominations}: IProps)=>{
  const [value, setValue] = useState(nominations? nominations[0].value:input.type[0])
  const values = nominations? nominations.map(nomination=> nomination.value):input.values
  return(
      <div className="input input--dropdown">
        <span className="input__placeholder">{input.placeholder}</span>
        <input {...field}
            name={input.name} value={value} style={{display: "none"}}/>
        <Dropdown value={value} values={values} handleCheck={e => setValue(e.target.value)} nominations={nominations} arrow={true} className="input__dropdown" id={Math.random()}/>
      </div>
  )
}

const Input = ({input, field, nominations}: IProps) => {
  return (
      <>
        {
          (input.type==="text" || input.type==="tel" || input.type==='email') ?(
                  <div className="input">
                    <input {...field}
                        placeholder={input.placeholder} type={input.type} className="input__text"/>

                    <ErrorMessage name={field.name} component="span" className="red input__error"/>
                  </div>
              )
              :
              input.type=="radios" ?(
                      <div className="input">
                        <span className="input__placeholder">{input.placeholder}</span>

                        <div className="input__radios">
                          {
                            input.values.map((value, valueIndex) => (
                                <Fragment key={`bid-radio-${valueIndex}`}>
                                  <Field name={field.name}
                                      value={value} type="radio" id={`bid-radio-${valueIndex}`}/>
                                  <label htmlFor={`bid-radio-${valueIndex}`}>{value}</label>

                                  {input.values? valueIndex< input.values.length-1 && <span className="input__radios-line"></span> :<></>}
                                </Fragment>
                            ))
                          }
                        </div>
                      </div>
                  )
                  :
                  input.type=="dropdown" ? <InputDropdown input={input} field={field}/>:
                      input.type=="nominations" && <InputDropdown input={input} field={field} nominations={nominations}/>
        }
      </>

  );
};

export default Input;
