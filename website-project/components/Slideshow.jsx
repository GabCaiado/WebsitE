'use client';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const products = [
  {
    id: 1,
    name: "Minecraft",
    image: "/images/minecraft.webp",
    url: "/buy/minecraft"
  },
  {
    id: 2,
    name: "Valorant",
    image: "/images/valorant.webp",
    url: "/buy/valorant"
  },
]

const CustomNextArrow = ({ onClick }) => (
  <div
    className="absolute -right-20 top-[40%] z-20"
    onClick={onClick}
  >
    <div className="relative flex flex-col items-center">

      <div className="absolute top-[-140px] w-[1px] h-[130px] bg-lime-500" />

      <div className='text-lime-500 text-2xl bg-black/60 p-1 rounded-xl hover:bg-black cursor-pointer -mb-4'>
        <MdNavigateNext />
      </div>
    </div>
  </div>
);

const CustomPrevArrow = ({ onClick }) => (
  <div
    className="absolute -right-20 top-[55%] z-10"
    onClick={onClick}
  >
    <div className="relative flex flex-col items-center">

      <div className='text-lime-500 text-2xl bg-black/60 p-1 rounded-xl hover:bg-black cursor-pointer -mt-4'>
        <GrFormPrevious />
      </div>

      <div className="absolute bottom-[-140px] w-[1px] h-[130px] bg-lime-500" />
    </div>
  </div>
);

const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };


  return (
    <div className="relative w-full h-full max-w-[1200px] mx-auto">
      <Slider 
      {...settings}
      >
        {products.map(product => (
          <div key={product.id} className="h-[400px]">
            <a href={product.url}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover cursor-pointer rounded-md"
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;
