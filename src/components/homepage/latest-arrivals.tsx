
import React from 'react'
import { LatestArrivalsCarousel } from './latest-arrivals-carousel';
import { ClassifiedStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getSourceId } from '@/lib/source-id';
import { redis } from '@/lib/redis-store';
import { Favourites } from '@/config/types';


const LatestArrivals = async () => {
    const classified = await prisma.classified.findMany({
        where:{status: ClassifiedStatus.LIVE},
        take: 6,
        include: {images: true}
    })
    const sourceId = await getSourceId();
    const favourites = await redis.get<Favourites>(sourceId || "");
  return (
   <section className='py-16 sm:py-24 bg-gray-800 border-b border-gray-700'>
    <div className='container mx-auto max-w-[80vw]'>
        <h2 className='mt-2 uppercase text-2xl font-bold tracking-tight text-gray-100 sm:text-4xl'>Latest Arrivals</h2>
        <LatestArrivalsCarousel classifieds={classified} favourites={favourites ? favourites.ids : []}
        
        />
    </div>
   </section>
  )
}

export default LatestArrivals