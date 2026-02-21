import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import React from "react";
import {IHuman} from "@/types/data";
import Image from "@/components/Image";

interface IProps{
  user: IHuman
  isBig?: boolean
}

const UserCard=({user, isBig}: IProps)=>{
  return(
      <div className="session-user">
        <Image
            image={user.image}
            size='xs'
            mediaSizes={isBig? {bigDesktop: "small"} : undefined}
            className="session-user__img"/>
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