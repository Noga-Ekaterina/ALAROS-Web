import React, {JSX, useEffect, useState} from 'react';
import "./festival-bid.scss"
import pagesData from "../../../store/pagesData";
import {Form, Formik, Field} from "formik";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {IFormInput} from "../../../types/data";
import Dropdown from "../../dropdown/Dropdown";
import parse from "html-react-parser";

interface InputDropdownProps{
  input: IFormInput
}

const InputDropdown=({input}: InputDropdownProps)=>{
  const [value, setValue] = useState('')
  const [labels, setLabels] = useState<JSX.Element[]>([])

  useEffect(() => {
    if (!input.values) return

    setValue(input.values[0])

    const result: JSX.Element[]=[]

    input.values.forEach(value=>{
      const str= value.replace(/([0-9]+\.[0-9]+) (.*)/, "<span>$1</span><span>$2</span>")

      result.push(
          <span className="festival-bid__dropdown-item">{parse(str)}</span>
      )
    })

    setLabels(result)
  }, []);

  if (!input.values) return <div/>

  return(
      <div className="festival-bid__input-wrapp">
        <span className="festival-bid__placeholder">{input.placeholder}</span>
        <Field name={input.name} value={value} style={{display: "none"}}/>
        <Dropdown value={value} values={input.values} handleCheck={e => setValue(e.target.value)} elements={labels} arrow={true} className="festival-bid__dropdown"/>
      </div>
  )
}

const FestivalBid = () => {
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
      <div className="festival-bid">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title titles-block__title--small">{festivalText.bidTitle}</h2>
          </div>
          <Formik initialValues={inputsObj} onSubmit={()=>{}}>
            <Form>
              <div>
                {
                  festivalText.bidInputs.map((input, index)=>(
                      <>
                        {
                          input.values.length==0 ?(
                                  <div className="festival-bid__input-wrapp">
                                    <Field placeholder={input.placeholder} type={input.type} name={index} className="festival-bid__input-text"/>
                                  </div>
                              )
                              :
                              input.type=="radios" ?(
                                      <div className="festival-bid__input-wrapp">
                                        <span className="festival-bid__placeholder">{input.placeholder}</span>

                                        <div className="festival-bid__radios">
                                          {
                                            input.values.map((value, valueIndex) => (
                                                <>
                                                  <Field name={index} value={value} type="radio" id={`bid-radio-${index}-${valueIndex}`}/>
                                                  <label htmlFor={`bid-radio-${index}-${valueIndex}`}>{value}</label>

                                                  {input.values? valueIndex< input.values.length-1 && <span>|</span> :<></>}
                                                </>
                                            ))
                                          }
                                        </div>
                                      </div>
                                  )
                                  :
                                  input.type=="dropdown" && <InputDropdown input={input}/>
                        }
                      </>
                  ))
                }
              </div>
              <Field type="submit" value={festivalText.bidButton} className="festival-bid__btn"/>
            </Form>
          </Formik>
        </div>
      </div>
  );
};

export default FestivalBid;
