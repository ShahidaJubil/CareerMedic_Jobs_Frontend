import React from "react";
import "./Partners.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Keyboard, Scrollbar,Pagination } from "swiper";
import { Link } from "react-router-dom";
import { PartnersData } from "./PartnersData";

function Partners() {
  return (
    <div className="partnersDiv">
      <br /><br />
      <h2>Our Partners</h2>

      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        slidesPerGroupSkip={3}
        grabCursor={true}
        spaceBetween={0}
        loop={true}
        keyboard={{
          enabled: true,
        }}
        rewind={true}
        breakpoints={{
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          768: {
            spaceBetween: 0,
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          425: {
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          320: {
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          280: {
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Keyboard,Pagination, Scrollbar]}
        className="partnersSwiper"
      >
        {PartnersData &&
          PartnersData.map((partners, index) => {
            return (
              <SwiperSlide key={index}>
                <Link to="/partners">
                  <img src={partners.img} alt="" className="partnersImage"/>
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

export default Partners;
