import React from 'react';
import "./project.scss"
import {IProject} from "../../types/data";
import {Link} from "react-router-dom";

const diplomas={
  gold:{
    text: "золотой диплом",
    color: "#bfa100"
  },
  silver:{
    text: "серебряный диплом",
    color: "#a6a2a4"
  },
  bronze:{
    text: 'бронзовый диплом',
    color: "#be806e"
  },
  president:{
    text: "диплом президен",
    color: "#cd1619"
  },
  grandPrix:{
    text:"диплом гран-при",
    color: "#018b9a"
  }
}

interface Props{
  project: IProject
}

const Project = ({project}: Props) => {
  const {text, color}=diplomas[project.diploma]
  return (
      <Link to={`/`} className="project">
        <p style={{color}}>{text}</p>

        <div className="project__img">
          <img src={`/Assets/Projects/${project.year}/Project_${project.number}/cover.jpg`} alt=""/>

          <p className="project__year">{project.year}</p>

          <div className="project__info">
            <p className="project__winner">{project.winner}</p>
            <p>{project.name}</p>
          </div>
        </div>
        <p className="project__nomination">{project.nomination && project.nomination}</p>
      </Link>
  );
};

export default Project;
