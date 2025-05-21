"use client"
import UserNFTs from "@/components/UserNFTs";
import React from "react";
import Ownerlistings from "@/components/OwnedListings";
import ParticlesSty from "@/components/particles";
import { ScrollLogo } from "@/components/Scrolling";
import TrendingThisWeek from "@/components/TredingThisWeek";
import BrowseCategories from "@/components/Browse";
import { NFTBrowse } from "@/components/MFTBrowse";
import { NftCircleAction } from "@/components/Orbatingcircle";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-5 bg-black">
      <ParticlesSty></ParticlesSty>
      <ScrollLogo />
      <TrendingThisWeek />
      <BrowseCategories />
      <NFTBrowse />
      <div className="self-stretch flex flex-col items-center justify-start bg-[url('/toplisted.png')] bg-cover bg-no-repeat bg-[top] max-w-full z-[7] text-[3.188rem] font-segoe-ui">
        <div className="self-stretch [background:linear-gradient(180deg,_rgba(162,_89,_255,_0),_#020202_78.38%)] flex flex-row items-end justify-center py-[3.75rem] px-[1.25rem] box-border min-h-[40rem] max-w-full">
          <div className="w-[65.625rem] flex flex-col items-center justify-center max-w-full [row-gap:20px] mq1050:flex-wrap text-white sm:flex-row">
            <div className="flex-1 flex flex-col items-start justify-center gap-[1.875rem]  max-w-full mq750:min-w-full">
              <button className="cursor-pointer py-[0.5rem] px-[1.187rem] bg-chocolate-300 rounded-xl flex flex-row items-center justify-start gap-[0.75rem] border-[1px] border-solid border-chocolate-200">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-[1.5rem] w-[1.5rem] relative object-cover rounded-full"
                    alt=""
                    src="/Tnft1.png"
                  />
                </div>
                <div className="relative text-[1rem] leading-[140%] font-basebody-work-sans text-croc-primary-white text-left inline-block min-w-[4.688rem]">
                  Shroomie
                </div>
              </button>
              <h1 className="m-0 self-stretch relative text-inherit leading-[110%] capitalize font-semibold font-inherit mq450:text-[1.938rem] mq450:leading-[2.125rem] mq1050:text-[2.563rem] mq1050:leading-[2.813rem]">
                Magic Mashrooms
              </h1>
              <button className="cursor-pointer py-[1rem] px-[3rem] bg-chocolate-300 w-[11.875rem] rounded-xl box-border flex flex-row items-center justify-center gap-[0.75rem] whitespace-nowrap border-[2px] border-solid border-chocolate-200 hover:bg-coral-200 hover:box-border hover:border-[2px] hover:border-solid hover:border-coral-100">
                <img
                  className="h-[1.25rem] w-[1.25rem] relative"
                  alt=""
                  src="/eye.svg"
                />
                <div className="relative text-[1rem] leading-[140%] font-segoe-ui text-croc-primary-white text-center inline-block min-w-[3.625rem]">
                  See NFT
                </div>
              </button>
            </div>
            <div className="w-[18.438rem] [backdrop-filter:blur(10px)] rounded-xl bg-chocolate-300 box-border flex flex-col items-center justify-center py-[1.75rem] px-[1.812rem] gap-[0.625rem] min-w-[18.438rem] text-[0.75rem] font-caption-space-mono border-[1px] border-solid border-chocolate-200 mq1050:flex-1">
              <div className="self-stretch relative leading-[110%]">
                Auction ends in:
              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-[0.625rem] text-[2.375rem]">
                <div className="flex-1 flex flex-col items-start justify-start gap-[0.312rem]">
                  <b className="self-stretch relative leading-[2.875rem] capitalize mq450:text-[1.438rem] mq450:leading-[1.688rem] mq1050:text-[1.875rem] mq1050:leading-[2.25rem]">
                    59
                  </b>
                  <div className="self-stretch relative text-[0.75rem] leading-[110%]">
                    Hours
                  </div>
                </div>
                <h2 className="m-0 w-[1.125rem] relative text-[1.75rem] leading-[140%] capitalize font-bold font-inherit inline-block mq450:text-[1.375rem] mq450:leading-[1.938rem]">
                  :
                </h2>
                <div className="flex-1 flex flex-col items-start justify-start gap-[0.312rem]">
                  <b className="self-stretch relative leading-[2.875rem] capitalize mq450:text-[1.438rem] mq450:leading-[1.688rem] mq1050:text-[1.875rem] mq1050:leading-[2.25rem]">
                    59
                  </b>
                  <div className="relative text-[0.75rem] leading-[110%] inline-block min-w-[3.313rem]">
                    Minutes
                  </div>
                </div>
                <h2 className="m-0 w-[1.125rem] relative text-[1.75rem] leading-[140%] capitalize font-bold font-inherit inline-block mq450:text-[1.375rem] mq450:leading-[1.938rem]">
                  :
                </h2>
                <div className="flex-1 flex flex-col items-start justify-start gap-[0.312rem]">
                  <b className="self-stretch relative leading-[2.875rem] capitalize mq450:text-[1.438rem] mq450:leading-[1.688rem] mq1050:text-[1.875rem] mq1050:leading-[2.25rem]">
                    59
                  </b>
                  <div className="relative text-[0.75rem] leading-[110%] inline-block min-w-[3.313rem]">
                    Seconds
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NftCircleAction />
    </main>
  );
}

 const metadata = {
  title: "NFT Marketplace",
  description: "NFT Marketplace",
};
