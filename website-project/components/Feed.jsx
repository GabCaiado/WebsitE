import Link from '@node_modules/next/link'
import React from 'react'
import Image from 'next/image'
import Slideshow from './Slideshow'
import { Exo } from 'next/font/google';

const exo = Exo({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

const Feed = () => {
  return (
    <>
      <section className="bg-gray-600/50 outline outline-white outline-1 outline-offset-4 relative z-10 py-4 px-6 rounded-2xl max-w-[1400px] mx-auto max-h-[500px] overflow-hidden">
        <div className="grid grid-cols-3 gap-4 py-2 pb-2">
          <div className="bg-gray-600/50 p-6 ml-16 rounded-md w-full max-w-[1000px] ">
            <Slideshow />
          </div>

          <div className="grid grid-cols-2 gap-6 col-span-2">
            <div className='overflow-hidden max-w-64 ml-48'>
                <Link href="/minecraft" className='text-3xl block w-full h-full'>
                    <Image
                      src="/images/minecraft.webp"
                      width={200}
                      height={800}
                      className="rounded-lg w-full max-w-64 h-[210px] object-cover"
                      alt="minecraft"
                  />
                </Link>
            </div>
            <div className='overflow-hidden max-w-64'>
                <Link href="/valorant" className='text-3xl block w-full h-full'>
                    <Image
                      src="/images/valorant.webp"
                      width={200}
                      height={800}
                      className="rounded-lg w-full max-w-64 h-[210px] object-cover"
                      alt="valorant"
                  />
                </Link>
            </div>

            <div className='overflow-hidden max-w-64 ml-48'>
                <Link href="/genshin" className='text-3xl block w-full h-full'>
                    <Image
                      src="/images/genshin.jpg"
                      width={200}
                      height={800}
                      className="rounded-lg w-full max-w-64 h-[210px] object-cover"
                      alt="genshin"
                  />
                </Link>
            </div>

            <div className='overflow-hidden max-w-64'>
                <Link href="/roblox" className='text-3xl block w-full h-full'>
                    <Image
                      src="/images/roblox.webp"
                      width={200}
                      height={800}
                      className="rounded-lg w-full max-w-64 h-[210px] object-cover"
                      alt="roblox"
                  />
                </Link>
            </div>
          </div>
          
          <div className="relative min-h-[470px] flex items-center mt-8">

            <div className="absolute top-[-500px] left-[280%] w-[1px] h-[130px] bg-lime-500" />

              <div className={`${exo.className} absolute top-[-305px] left-[267%] text-[16px] tracking-widest rotate-90 font-normal`}>
                <div className="whitespace-nowrap">
                  <span className="text-gray-300">BEST </span>
                  <span className="text-lime-400">SELLERS</span>
                </div>
              </div>

            <div className="absolute top-[-210px] left-[280%] w-[1px] h-[130px] bg-lime-500" />
            
          </div>
        </div>
      </section>

      <section className="bg-black py-20">
         <div className="grid grid-cols-3 gap-4 py-7 pb-60">

          </div>
      </section>
    </>
  );
}

export default Feed
