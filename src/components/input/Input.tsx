import React, {Fragment, JSX, useEffect, useState} from 'react';
import "./input.scss"
import {IFormInput, INomination} from "../../types/data";
import parse from "html-react-parser";
import Dropdown from "../dropdown/Dropdown";
import {IField} from "../../types/tehnic";

interface IProps extends IField{
  input: IFormInput
  nominations?: INomination[]
}

const InputDropdown=({input, field, nominations}: IProps)=>{
  const [value, setValue] = useState('')
  const [values, setValues] = useState<string[]>(input.values)
  const [labels, setLabels] = useState<JSX.Element[]|undefined>(undefined)

  useEffect(() => {
    setValue(nominations? `${nominations[0].number} ${nominations[0].title}`: input.values[0])

    if (!nominations) return

    const resultValues: string[]=[]
    const result: JSX.Element[]=[]

    nominations.forEach(nomination=>{
      resultValues.push( `${nomination.number} ${nomination.title}`)

      result.push(
          <span className="input__dropdown-item" key={nomination.number}>
            <span>{nomination.number}</span>
            <span>{nomination.title}</span>
          </span>
      )
    })

    console.log(result)

    setValues(resultValues)
    setLabels(result)
  }, []);

  useEffect(() => {
    console.log(labels)
  }, [labels]);

  return(
      <div className="input">
        <span className="input__placeholder">{input.placeholder}</span>
        <input {...field}
            name={input.name} value={value} style={{display: "none"}}/>
        <Dropdown value={value} values={values} handleCheck={e => setValue(e.target.value)} elements={labels} arrow={true} className="input__dropdown"/>
      </div>
  )
}

const Input = ({input, field, nominations}: IProps) => {
  return (
      <>
        {
          input.type==="text" ?(
                  <div className="input">
                    <input {...field}
                        placeholder={input.placeholder} type={input.type} className="input__text"/>
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
                                  <input {...field}
                                      value={value} type="radio" id={`bid-radio-${valueIndex}`}/>
                                  <label htmlFor={`bid-radio-${valueIndex}`}>{value}</label>

                                  {input.values? valueIndex< input.values.length-1 && <span>|</span> :<></>}
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
