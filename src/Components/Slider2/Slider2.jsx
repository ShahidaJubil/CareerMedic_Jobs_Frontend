import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import "./Slider2.css";
import { Link } from "react-router-dom";

function Slider2() {
  return (
    <div className="sliderContainer">
      <h1 className="slidertitle">Global Medical Careers</h1>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="slider2"
        breakpoints={{
          425: {
            spaceBetween: 0,
          },
        }}
      >
        <SwiperSlide>
          <div className="slider">
            <h2>Medical Careers in India</h2>
            <h3>Lorem</h3>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              laborum iste ad aliquid quo deserunt necessitatibus exercitationem
              ullam asperiores ex vitae,
            </p>
            <br />
            <Link to="/jobs">
              <img
                src="https://t3.ftcdn.net/jpg/02/11/15/66/360_F_211156620_CeBr5etdTNXLb231sFcQ8M9YD1OY5IW8.jpg"
                alt=""
              />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider">
            <h2>Medical Careers in UK</h2>

            <h3>Lorem</h3>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              laborum iste ad aliquid quo deserunt necessitatibus exercitationem
              ullam asperiores ex vitae, minus et maxime molestiae cupiditate
              amet est? Ab, doloremque!
            </p>
            <br />
            <Link to="/jobs">
              <img
                src="https://cdn.britannica.com/72/126772-050-BC651FF5/Norwich-University-Hospital-Norfolk-England-National-Health.jpg"
                alt=""
              />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider">
            <h2>Medical Careers in UAE</h2>

            <h3>Lorem</h3>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              laborum iste ad aliquid quo deserunt necessitatibus exercitationem
              ullam asperiores ex vitae, minus et maxime molestiae cupiditate
              amet est? Ab, doloremque!
            </p>
            <br />
            <Link to="/jobs">
              <img
                src="https://pbs.twimg.com/media/DtK0RVeWwAIwiAs.jpg:large"
                alt=""
              />
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider2;
