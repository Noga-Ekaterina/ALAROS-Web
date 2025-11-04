import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import React from "react";
import {IUser} from "@/types/data";

interface IProps{
  user: Omit<IUser, "place">
}

const UserCard=({user}: IProps)=>{
  return(
      <div className="session-user">
        <img src={`/Assets/Pages/People/${user.image}`} alt="" className="session-user__img"/>
        <div className="session-user__name">
          <p>{nonBreakingSpaces(user.name)}</p>
        </div>
        <div className="session-user__jobTitle">
          <p>{nonBreakingSpaces(user.jobTitle)}</p>
        </div>
      </div>
  )
}

export default UserCard