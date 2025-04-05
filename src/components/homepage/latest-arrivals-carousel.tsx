"use client"
import { Prisma } from "@prisma/client";
import { ClassifiedCardSkeleton } from "../inventory/classified-card-skeleton";
import dynamic from "next/dynamic";
import { Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { ClassifiedCard } from "../inventory/classified-card";
import { SwiperButtons } from "../shared/swiper-button";

import "swiper/css"

interface CarouselProps {
  classifieds: Prisma.ClassifiedGetPayload<{ include: { images: true } }>[];
  favourites: number[];
}

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((index) => (
        <ClassifiedCardSkeleton key={index} />
      ))}
    </div>
  ),
});

export const LatestArrivalsCarousel = (props: CarouselProps) => {
  const { classifieds, favourites } = props;
  return (
    <div className="mt-8 relative">
      <Swiper
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        loop={true}
        spaceBetween={30}
        fadeEffect={{ crossFade: true }}
        modules={[Navigation]}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1536: {
            slidesPerView: 4,
          },
        }}
        pagination={{ clickable: true }}
      >
        {classifieds.map((classified) => {
            return (
                <SwiperSlide key={classified.id}>
                    <ClassifiedCard
                        classified={classified}
                        favourites={favourites}
                    />
                </SwiperSlide>
            )
        })}

      </Swiper>
      <SwiperButtons
        prevClassName="-left-16 border border-2 border-white bg-white hidden lg:flex hover:border-primary"
        nextClassName="-right-16 border border-2 border-white bg-white text-white hidden lg:flex hover:border-primary"
      />
    </div>
  );
};
