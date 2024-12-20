import React, {useEffect, useRef, useState} from 'react';
import './festival-business-program.scss'
import pagesData from "../../../store/pagesData";
import HtmlProcessing from "../../HtmlProcessing";
import {IHtmlString} from "../../../types/data";
import {formaterDate} from "../../../utils/date/formaterDate";
import {useMediaQuery} from "react-responsive";
import {Swiper, SwiperSlide} from "swiper/react";
import {SwiperRef} from "swiper/swiper-react";
import {SwiperNavigation} from "../../../utils/SwiperNavigation";
import {Mousewheel} from "swiper/modules";

interface ISessionProps{
  data: string
}

interface IUser{
  name: string
  image: string
  jobTitle: string
}

interface IUserCardProps{
  user: IUser
}

const UserCard=({user}: IUserCardProps)=>{
  return(
      <div className="session-user">
        <img src={`/Assets/Pages/Festival/Images/People/${user.image}`} alt="" className="session-user__img"/>
        <p className="session-user__name">{user.name}</p>
        <p>{user.jobTitle}</p>
      </div>
  )
}

const Session = ({data}: ISessionProps) => {
  const [title, setTitle] = useState("")
  const [moderatorsTitle, setModeratorsTitle] = useState('')
  const [moderators, setModerators] = useState<IUser[]>([])
  const [speakersTitle, setSpeakersTitle] = useState("")
  const [speakers, setSpeakers] = useState<IUser[]>([])
  const mobileScreen = useMediaQuery({maxWidth: 660});
  const usersSwiperRef=useRef<SwiperRef | null>(null);
  const rolleSwiperRef=useRef<SwiperRef | null>(null);
  const rolleSwiperNav= new SwiperNavigation(rolleSwiperRef)

  const getUsers=(rows: string)=>{
    const rowsArr=Array.from(rows.matchAll(/<tr>(.*?)<\/tr>/gs)).map(m=>m[1])

    console.log(rowsArr)

    return rowsArr.map(row=>{
      const [name, jobTitle, image] = Array.from(row.matchAll(/<td>(?:<p>)?(.*?)(?:<\/p>)?<\/td>/gs)).map(m => m[1]);

      return {name, jobTitle, image}
    })
  }

  const handleSwiper=()=>{
    if (!usersSwiperRef.current) return

    const activeUser= usersSwiperRef.current.swiper.activeIndex

    console.log(activeUser)
    if (activeUser+1>moderators.length){
      rolleSwiperNav.goToSlide(2)
    }else {
      rolleSwiperNav.goToSlide(0)
    }
  }

  useEffect(() => {
    const [mainTitle]=Array.from(data.matchAll(/<h1>(.*?)<\/h1>/gs)).map(m => m[1])
    const [moderatorRows, speakersRows]=Array.from(data.matchAll(/<tbody>(.*?)<\/tbody>/gs)).map(m => m[1])
    const [moderatorTitle, speakerTitle]=Array.from(data.matchAll(/<h3>(.*?)<\/h3>/gs)).map(m => m[1])

    setTitle(mainTitle)
    setModeratorsTitle(moderatorTitle)
    setSpeakersTitle(speakerTitle)
    setModerators(getUsers(moderatorRows))
    setSpeakers(getUsers(speakersRows))
  }, []);

  return(
      <div className="festival-business-program__session">
        <div className="container">
          <h3 className="festival-business-program__title">{title}</h3>

          {
            !mobileScreen ?
                <div className="festival-business-program__content">
                  <div className="">
                    <h4 className="festival-business-program__rolle">{moderatorsTitle}</h4>
                    <div className="festival-business-program__moderators">
                      {
                        moderators.map(moderator => (
                            <UserCard user={moderator}/>
                        ))
                      }
                    </div>
                  </div>
                  <div className="">
                    <h4 className="festival-business-program__rolle">{speakersTitle}</h4>
                    <div className="festival-business-program__speakers">
                      {
                        speakers.map(speaker => (
                            <UserCard user={speaker}/>
                        ))
                      }
                    </div>
                  </div>
                </div>
                :
                <>
                  <Swiper
                      slidesPerView="auto"
                      allowTouchMove={false}
                      spaceBetween="10rem"
                      ref={rolleSwiperRef}
                  >
                    <SwiperSlide className="festival-business-program__slide">
                      <h4 className="festival-business-program__rolle">{moderatorsTitle}</h4>

                    </SwiperSlide>
                    <SwiperSlide className="festival-business-program__slide">
                      <h4 className="festival-business-program__rolle">{speakersTitle}</h4>

                    </SwiperSlide>
                    <SwiperSlide className="festival-business-program__slide"/>
                  </Swiper>
                  <Swiper
                      slidesPerView="auto"
                      spaceBetween="10rem"
                      ref={usersSwiperRef}
                      modules={[Mousewheel]}
                      onActiveIndexChange={handleSwiper}
                  >
                    {
                      moderators.map(moderator => (
                          <SwiperSlide className="festival-business-program__slide">
                            <UserCard user={moderator}/>
                          </SwiperSlide>
                      ))
                    }
                    {
                      speakers.map(speaker => (
                          <SwiperSlide className="festival-business-program__slide">
                            <UserCard user={speaker}/>
                          </SwiperSlide>
                      ))
                    }
                  </Swiper>
                </>
          }
        </div>
      </div>
  )
}

const FestivalBusinessProgram = () => {
  const {festivalText} = pagesData

  if (!festivalText) return <div/>

  return (
      <div className="festival-business-program">
        <div className="container titles-block">
          <div>
            <p className="festival-business-program__date">{formaterDate(festivalText.businessProgramDate)} | {festivalText.businessProgramTime}</p>
            <h2 className="titles-block__title">{festivalText.businessProgramTitle}</h2>
          </div>
          <div className="titles-block__section">
            <HtmlProcessing html={festivalText.businessProgramRightSignature.html}/>
          </div>
        </div>
        {
          festivalText.businessProgramSessions.map(session => (
              <Session data={session.html}/>
          ))
        }
      </div>
  );
};

export default FestivalBusinessProgram;
