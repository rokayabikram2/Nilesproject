import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";

function Slider() {
  // const images = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg']
  const options = {
    items: 3,
    loop: true,
    autoplay: true,
    dots: false,
    autoplayTimeout: 5000,
    responsive: {
      0: {
        items: 1,
      },
    },
  };

  const [slider, setSlider] = useState([]);

  // Axios GET request to fetch data
  const SliderData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/navigations/"
      );
     
      const sliderDatas = response.data.filter(
        (item) => item.status === "Publish" && item.page_type === "Slider"
      );
      setSlider(sliderDatas);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    SliderData();
  }, []);
  // console.log(slider);
  

  return (
    <section className="relative lg:py-[250px] md:py-[180px] sm:py-[146px] py-[141px] slider-section">
      <div className="absolute w-full h-full top-0 left-0">
        <OwlCarousel className="owl-theme h-full" {...options}>
          {slider.map((image, index) => (
            <div className="item" key={index}>
              <img src={image.slider_image} alt="slider" />
              <div className="bg-gradient-to-t from-black to-transparent opacity-60 absolute w-full z-10 h-full top-0 left-0"></div>
              <div
                className="container absolute inset-0 text-white z-20 text-center flex flex-col justify-center items-center"
                data-aos="zoom-in"
                data-aos-duration="1000"
                data-aos-once="true"
              >
                <h1 className="text-white font-extrabold lg:text-5xl md:text-4xl sm:text-3xl text-2xl mb-2">
                  {image.title}
                </h1>
                <h2 className="text-white font-semibold md:text-3xl sm:text-xl text-lg">
                  {image.caption}
                </h2>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </section>
  );
}

export default Slider;
