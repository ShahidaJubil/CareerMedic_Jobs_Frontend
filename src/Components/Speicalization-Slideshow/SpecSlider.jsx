import React, { useEffect, useState } from "react";
import "../Slideshow/Slideshow.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, Keyboard } from "swiper";
import img from "../../Assets/img2.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

function SpecSlideshow() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getJobs();
  }, []);
  const getJobs = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get/jobs`);
    if (response.status === 200) {
      setData(response.data);
    }
  };
  console.log();

  return (
    <>
      <br />
      <h2 className="Title">Jobs based on Specialization</h2>

      <div className="slideshow">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          keyboard={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Keyboard, Autoplay]}
          className="premiumSwiper"
          breakpoints={{
            280: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            375: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            425: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
        >
          {data &&
            data.map((item, id) => {
              return (
                <SwiperSlide key={id}>
                  <div className="card">
                    <Link to={`/view/job/${item.id}`}>
                      <div className="image">
                        <img src={img} alt="" />
                      </div>
                      <div className="content">
                        <h5>{item.hospitalname}</h5>
                        <h6>{item.specialization}</h6>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </>
  );
}

export default SpecSlideshow;
