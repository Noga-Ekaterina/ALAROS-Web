'use client'
import React, {useRef, useState, useEffect, ChangeEvent, JSX, ReactNode} from 'react';
import "./dropdown.scss"
import {useClose} from "../../hoocs/useClose";
import classNames from "classnames";
import {IWithClass} from "../../types/tehnic";
import {ReactSVG} from "react-svg";
import {IFestivalNomination} from "@/types/data";
import SmoothScrolling from "@/app/SmoothScrolling";
import HtmlProcessing from "@/components/HtmlProcessing";

type DataProps = IWithClass & {
  isNoForm?: false;
  id?: string | number;
  value: string;
  values: string[];
  name?: string;
  elements?: JSX.Element[];
  arrow?: boolean;
  rightElement?: JSX.Element|string
  years?: boolean;
  handleCheck: (e: ChangeEvent<HTMLInputElement>) => void;
  nominations?: IFestivalNomination[];
};

type ChildrenProps = IWithClass & {
  isNoForm: true;
  title: ReactNode
  children: ReactNode;
  arrow?: boolean;
  rightElement?: JSX.Element|string
};

type Props = DataProps | ChildrenProps;

function Dropdown(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Проверяем тип пропсов
  const isNoForm = props.isNoForm === true;

  // Обработка номинаций только для DataProps
  const nominationsElements = !isNoForm && props.nominations
      ? props.nominations.map((nomination: IFestivalNomination) => (
          <span className="dropdown__nomination-item" key={nomination.number}>
          <span>{nomination.number}</span>
          <HtmlProcessing html={`<span>${nomination.title}</span>`}/>
        </span>
      ))
      : null;

  useClose({ref: dropdownRef, isOpen, setIsOpen});

  // Функция для получения содержимого заголовка
  const getTitleContent = () => {
    if (isNoForm) {
      return props.title;
    } else {
      // Для DataProps
      if (props.elements) {
        return props.elements[props.values.indexOf(props.value)];
      } else if (props.years) {
        return props.value.replace(/(год)$/, "");
      } else if (props.nominations) {
        return nominationsElements?.[props.values.indexOf(props.value)];
      } else {
        return props.value;
      }
    }
  };

  return (
      <div className={classNames("dropdown", isOpen && "open", props.className)} ref={dropdownRef}>
        <button type="button" className="dropdown__title" onClick={() => setIsOpen(!isOpen)}>
        <span className="dropdown__title-text">
          {getTitleContent()}
        </span>

          {props.arrow && (
              <>
                <span className="dropdown__line"></span>
                <ReactSVG src='/Assets/Icons/arrow.svg' className="dropdown__arrow"/>
              </>
          )}

          {props.rightElement}
        </button>
        <div className="dropdown__content">
          <SmoothScrolling>
            {isNoForm ? (
                props.children
            ) : (
                props.values.map((item, index) => (
                    <div key={item} className="dropdown__item">
                      <input
                          type='radio'
                          checked={item === props.value}
                          name={props.name ?? ""}
                          id={`${item}_${props.id}`}
                          onChange={e => {
                            props.handleCheck(e);
                            setIsOpen(false);
                          }}
                          value={item}
                      />
                      <label
                          htmlFor={`${item}_${props.id}`}
                          onClick={(e) => e.stopPropagation()}
                      >
                        {props.elements
                            ? props.elements[index]
                            : props.nominations
                                ? nominationsElements?.[index]
                                : item}
                      </label>
                    </div>
                ))
            )}
          </SmoothScrolling>
        </div>
      </div>
  );
}

export default Dropdown;