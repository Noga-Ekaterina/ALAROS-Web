import React from 'react';
import "./not-found-sample.scss"

interface Props{
  title: string
  subtitle?: string
  mainText: string
  mainTextMobile: string
}

const NotFoundSample = ({title, subtitle, mainText, mainTextMobile}:Props) => {
  return (
      <div className="not-found-sample">
        <div className="container">
          <div className="not-found-sample__title">{title}</div>

          {
              subtitle &&
              <div className="not-found-sample__subtitle">{subtitle}</div>
          }
        </div>

        <div className="not-found-sample__main-text">{mainText}</div>
        <div className="not-found-sample__main-text not-found-sample__main-text--sm">{mainTextMobile}</div>
      </div>
  );
};

export default NotFoundSample;
