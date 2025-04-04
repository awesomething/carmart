import { imageSources } from '@/config/constants'
import { imgixLoader } from '@/lib/imgix-loader'
import React from 'react'
import { HomepageTaxonomyFilters } from './homepage-filters'
import { AwaitedPageProps } from '@/config/types'
import { SearchButton } from './search-button'
import { prisma } from '@/lib/prisma'
import { buildClassifiedFilterQuery } from '@/lib/utils'

const HeroSection = async (props: AwaitedPageProps) => {
    const { searchParams } = props;
    const totalFiltersApplied = Object.keys(searchParams || {}).length;
    const isFiltersApplied = totalFiltersApplied > 0;
    const classifiedCount = await prisma.classified.count({where: buildClassifiedFilterQuery(searchParams)});
  return (
    <section className="relative flex items-center justify-center h-[calc(100vh-4rem)] bg-cover bg-center" style={{
        backgroundImage: `url(${imgixLoader({src: imageSources.carLineup, width: 1280, quality: 100})})`
      }}>
        <div className="absolute inset-0 bg-black opacity-75"/>
<div className="container lg:grid space-y-12 grid-cols-2 items-center relative z-10">
  <div className="px-10 lg:px-0">
  <h1 className="text-2xl text-center lg:text-left md:text-4xl lg:text-8xl uppercase font-extrabold text-white">Unbeatable Deals on New & Used Cars</h1>
<h2 className="mt-4 uppercase text-center lg:text-left text-base md:text-3xl lg:text-4xl text-white">Discover your dream car today!</h2>
  </div>
  <div className="max-w-md w-full mx-auto p-6 bg-black sm:rounded-xl shadow-lg">
    <div className="space-y-4">
      <div className="space-y-2 flex-col w-full gap-x-4">
      <HomepageTaxonomyFilters searchParams={searchParams} />
      </div>
      <SearchButton count={classifiedCount}/>
    </div>
  </div>
</div>
      </section>
  )
}

export default HeroSection