'use client'
import React from 'react';
import "./festival-forum.scss"
import HtmlProcessing from "../../HtmlProcessing";
import {Swiper, SwiperSlide} from "swiper/react";
import {IFestival, IFestivalDetails} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import Image from "@/components/Image";
import HumanContact from "@/components/human-contact/HumanContact";

interface Props{
  pageData: IFestivalDetails
}

const FestivalForum = ({pageData}:Props) => {
  return (
      <div className="festival-forum" id="forum">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title">{nonBreakingSpaces(pageData.forumTitle)}</h2>
            <div className="titles-block__section">
              <HtmlProcessing html={pageData.forumRightSignature}/>
            </div>
          </div>
          <div className="festival-forum__descriptions">
            {
              pageData.forumDescriptionBlocks.map((block, index)=>(
                  <div key={index} className="festival-forum__block-text">
                    <HtmlProcessing html={block.text}/>
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
            pageData.forumImages.map((img, index)=>(
                <SwiperSlide key={index} className="festival-forum__slide">
                  <Image image={img}/>
                </SwiperSlide>
            ))
          }
        </Swiper>

        <div className="container">
          <div className="festival-forum__registraion-and-program">
            <div className="festival-forum__registraion festival-forum__block-text">
              <HtmlProcessing html={pageData.forumRegistration}/>
            </div>
            <div className="">
              <h3>{nonBreakingSpaces(pageData.forumProgramTitle)}</h3>
              <div className="festival-forum__program">
                {
                  pageData.forumProgram.map((block, index)=>(
                      <div key={index} className="festival-forum__block-text">
                        <HtmlProcessing html={block.text}/>
                      </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        
        <div className="festival-forum__contacts-and-socials-wrap">
          <div className="container">
            <h3>{nonBreakingSpaces(pageData.forumContactsTitle)}</h3>
            <div className="festival-forum__contacts-and-socials">
              <HumanContact {...pageData.forumContact}/>

              <div className="festival-forum__socials">
                {
                  pageData.forumSocials.map((block, index)=>(
                      <div key={index} className="festival-forum__block-text">
                        <HtmlProcessing html={block.text}/>
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
