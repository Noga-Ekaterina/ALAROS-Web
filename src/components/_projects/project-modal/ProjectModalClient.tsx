// components/ProjectModalClient.tsx
'use client'

import React, {useCallback, useEffect, useRef, useState} from 'react'
import { IProject } from "@/types/data"
import ProjectImagesSlider from "@/components/_projects/project-modal/project-images-slider/ProjectImagesSlider"
import { diplomas } from "@/variables"
import { nonBreakingSpaces } from "@/utils/nonBreakingSpaces"
import SmoothScrolling from "@/app/SmoothScrolling"
import "./project-modal.scss"
import AnimationPage from "@/app/AnimationPage";
import {ReactSVG} from "react-svg";
import {useSearchParamsControl} from "@/hoocs/useSearchParamsControl";
import ProjectText from "@/components/_projects/project-modal/project-text/ProjectText";
import {useSearchParams} from "next/navigation";
import {debounce} from "next/dist/server/utils";

interface ClientProps {
  project?: IProject | null | string
  startIsOpened: boolean
  isInvalidParams: boolean
}

const ProjectModalClient = ({ project, startIsOpened, isInvalidParams }: ClientProps) => {
  const searchParams= useSearchParams()
  const projectYear= searchParams.get("projectYear")
  const projectSearch= searchParams.get("project")
  const [isOpened, setIsOpened] = useState(!!(projectSearch && projectYear &&startIsOpened))
  const [scale, setScale] =useState(1)
  const {setMultipleParams}=useSearchParamsControl()
  const timer= useRef<null | ReturnType<typeof setTimeout>>(null)
  const [upEvent, setUpEve ] = useState(false)

  function handleBack(){
    if (scale>1)
      setScale(1)
    else {
      setIsOpened(false)
      timer.current= setTimeout(()=> {
        setMultipleParams({project: null, projectYear: null}, {scroll: false})
      }, 500)
    }
  }

  function handleClick(e:  React.MouseEvent<HTMLDivElement, MouseEvent>){
    const el= e.target as HTMLDivElement
    console.log(el)

    if(!el.matches(".project-text, .project-text *, span, project-images-slider__scale-img-wrap, .project-images-slider__scale-img-wrap *, button, button *, img"))
      handleBack()
  }

  const handleClickEsc=useCallback(debounce((event: KeyboardEvent) => {
    if (event.code === 'Escape') {
      console.log("esc")
      handleBack()
    };
  }, 300), [upEvent])

  useEffect(() => {
    console.log("mount")
    return () => { // <-- функция очистки
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null; // просто очищаем значение, не возвращаем его
      }
    };
  }, []);

  useEffect(() => {
    document.removeEventListener('keyup', handleClickEsc)
    setUpEve(prevState => !prevState)
  }, [scale]);

  useEffect(() => {
    document.addEventListener('keyup', handleClickEsc );
  }, [handleClickEsc]);

  useEffect(() => {
    if (projectSearch && projectYear)
      setIsOpened(true)
  }, [projectSearch, projectYear]);

  useEffect(() => {
    !isOpened && document.removeEventListener('keyup', handleClickEsc)
  }, [isOpened]);

  return (
      <AnimationPage isNoWait={true} conditions={isOpened} className="project-modal" onClick={handleClick}>
        <SmoothScrolling>
          <button
              className="project-images-slider__btn project-images-slider__btn--back"
              onClick={handleBack}
          >
            <ReactSVG src="/Assets/Icons/close.svg"/>
          </button>
          {isInvalidParams ? (
              <div key="invalid-params" className="project-modal__error">
                Некорректные параметры запроса
              </div>
          ) : project === undefined ? (
              <div key="not-found" className="project-modal__error">
                <span>Проект не найден</span>
              </div>
          ) : typeof project === "string" || project === null  ? (
              <div key="error" className="project-modal__error">
                Произошла ошибка{project && `: ${project}`}, перезагрузите страницу
              </div>
          ) : (
              <>
                <ProjectImagesSlider project={project} scale={scale} handleScale={setScale}/>
                <div className="project-modal__content">
                  <ProjectText project={project}/>
                </div>
              </>

          )}
        </SmoothScrolling>
      </AnimationPage>

  )
}

export default ProjectModalClient