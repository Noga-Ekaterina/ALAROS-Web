'use client'
import React from 'react';
import "./festival-forum.scss"
import HtmlProcessing from "../../HtmlProcessing";
import {Swiper, SwiperSlide} from "swiper/react";
import {IFestival} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props{
  festivalText: IFestival
}

const FestivalForum = ({festivalText}:Props) => {
  return (
      <div className="festival-forum" id="forum">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title">{nonBreakingSpaces(festivalText.forumTitle)}</h2>
            <div className="titles-block__section">
              <HtmlProcessing html={festivalText.forumRightSignature.html}/>
            </div>
          </div>
          <div className="festival-forum__descriptions">
            {
              festivalText.forumDescriptionBlocks.map((block, index)=>(
                  <div key={index} className="festival-forum__block-text">
                    <HtmlProcessing html={block.html}/>
                  </div>
              ))
            }
          </div>
        </div>
        <Swiper
            slidesPerView="auto"
            spaceBetween={"10rem"}
            className="festival-forum__slider"
        >
          {
            festivalText.forumImages.map((img, index)=>(
                <SwiperSlide key={index} className="festival-forum__slide">
                  <img src={`/Assets/Pages/Festival/Images/Forum/${img}`} alt=""/>
                </SwiperSlide>
            ))
          }
        </Swiper>

        <div className="container">
          <div className="festival-forum__registraion-and-program">
            <div className="festival-forum__registraion festival-forum__block-text">
              <HtmlProcessing html={festivalText.forumRegistration.html}/>
            </div>
            <div className="">
              <h3>{nonBreakingSpaces(festivalText.forumProgramTitle)}</h3>
              <div className="festival-forum__program">
                {
                  festivalText.forumProgram.map((block, index)=>(
                      <div key={index} className="festival-forum__block-text">
                        <HtmlProcessing html={block.html}/>
                      </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        
        <div className="festival-forum__contacts-and-socials-wrap">
          <div className="container">
            <h3>{nonBreakingSpaces(festivalText.forumContactsTitle)}</h3>
            <div className="festival-forum__contacts-and-socials">
              <div className="festival-forum__contacts">
                <img src={`/Assets/Pages/Festival/Images/People/${festivalText.forumContactsImage}`} alt=""/>
                <div className="festival-forum__block-text">
                  <HtmlProcessing html={festivalText.forumContacts.html}/>-
                </div>
              </div>

              <div className="festival-forum__socials">
                {
                  festivalText.forumSocials.map((block, index)=>(
                      <div key={index} className="festival-forum__block-text">
                        <HtmlProcessing html={block.html}/>
                      </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default FestivalForum;
