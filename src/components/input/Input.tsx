import React, {JSX, useEffect, useState} from 'react';
import "./input.scss"
import {IFormInput} from "../../types/data";
import parse from "html-react-parser";
import Dropdown from "../dropdown/Dropdown";
import {IField} from "../../types/tehnic";

interface IProps extends IField{
  input: IFormInput
}

const InputDropdown=({input, field}: IProps)=>{
  const [value, setValue] = useState('')
  const [labels, setLabels] = useState<JSX.Element[]>([])

  useEffect(() => {
    if (!input.values) return

    setValue(input.values[0])

    const result: JSX.Element[]=[]

    input.values.forEach(value=>{
      const str= value.replace(/([0-9]+\.[0-9]+) (.*)/, "<span>$1</span><span>$2</span>")

      result.push(
          <span className="input__dropdown-item">{parse(str)}</span>
      )
    })

    setLabels(result)
  }, []);

  if (!input.values) return <div/>

  return(
      <div className="input">
        <span className="input__placeholder">{input.placeholder}</span>
        <input {...field}
            name={input.name} value={value} style={{display: "none"}}/>
        <Dropdown value={value} values={input.values} handleCheck={e => setValue(e.target.value)} elements={labels} arrow={true} className="input__dropdown"/>
      </div>
  )
}

const Input = ({input, field}: IProps) => {
  return (
      <>
        {
          input.values.length==0 ?(
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
                                <>
                                  <input {...field}
                                      value={value} type="radio" id={`bid-radio-${valueIndex}`}/>
                                  <label htmlFor={`bid-radio-${valueIndex}`}>{value}</label>

                                  {input.values? valueIndex< input.values.length-1 && <span>|</span> :<></>}
                                </>
                            ))
                          }
                        </div>
                      </div>
                  )
                  :
                  input.type=="dropdown" && <InputDropdown input={input} field={field}/>
        }
      </>

  );
};

export default Input;
