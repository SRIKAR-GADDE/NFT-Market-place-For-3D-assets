"use client";
import { useApprovedTokens } from "@/hooks/useApprovedTokens";
import { Nftmarketcard } from "./NFTmarketcard";
import { useContext, useEffect, useState } from "react";
import { NearContext } from "@/context";
import { ShimmerBadge, ShimmerText, ShimmerThumbnail } from "react-shimmer-effects"; // Import shimmer effect
import { useRouter } from "next/navigation";
import Link from "next/link";

export function NFTBrowse() {
  const { wallet, signedAccountId } = useContext(NearContext);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const salesObj = useApprovedTokens();
  
  useEffect(() => {
    if (wallet && signedAccountId ) {
      setLoading(false);
    }
    console.log(wallet, signedAccountId);
    if(!salesObj){
      setLoading(true)
    }
  }, [wallet, signedAccountId, salesObj]);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 4); // Load 4 more NFTs when the button is clicked
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-start py-[5rem] px-[1.25rem] box-border gap-[3.75rem] max-w-full z-[5] text-left text-[2.375rem] text-croc-primary-white font-segoe-ui lg:gap-[1.875rem]">
      <div className="w-full h-full absolute !m-[0] top-[0rem] bottom-[0rem] rounded-[50%] [background:radial-gradient(50%_50%_at_50%_50%,_rgba(255,_107,_47,_0.5),_rgba(6,_19,_45,_0))] z-[-1]" />
      <div className="w-[65.625rem] flex flex-row items-start justify-start max-w-full">
        <div className="w-[48rem] flex flex-col items-start justify-start gap-[0.625rem] max-w-full flex-wrap">
          <h1 className="m-0 self-stretch relative text-inherit leading-[2.875rem] capitalize font-semibold font-inherit mq450:text-[1.438rem] mq450:leading-[1.688rem] mq1050:text-[1.875rem] mq1050:leading-[2.25rem]">
            Discover More NFTs
          </h1>
          <h3 className="m-0 self-stretch relative text-[1.375rem] leading-[160%] capitalize font-normal font-inherit mq450:text-[1.125rem] mq450:leading-[1.75rem]">
            Explore new trending NFTs
          </h3>
        </div>
        <button className="cursor-pointer py-[1rem] px-[3rem] bg-tomato-400 w-[11.375rem] rounded-xl box-border flex flex-row items-center justify-center gap-[0.75rem] whitespace-nowrap border-[2px] border-solid border-tomato-100 hover:bg-orangered-300 hover:box-border hover:border-[2px] hover:border-solid hover:border-orangered-100">
          <img className="h-[1.25rem] w-[1.25rem] relative" alt="" src="/eye.svg" />
            <div className="w-[3.125rem] relative text-[1rem] leading-[140%] font-semibold font-segoe-ui text-croc-primary-white text-center inline-block min-w-[3.125rem]">
              <Link href={"/market"}>
                  See All
              </Link>
            </div>
        </button>
      </div>

      <div className="relative flex items-center justify-center flex-wrap gap-4 md:w-4/5">
        {loading ? (
          // Show shimmer placeholders while loading
          Array.from({ length: salesObj.slice(0, visibleCount).length > salesObj.length ? salesObj.length : visibleCount }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <ShimmerThumbnail width={350} height={500} />
              {/* <ShimmerText width={200} height={30} className="mt-2" />
              <ShimmerBadge width={120} height={24} className="mt-2" /> */}
            </div>
          ))
        ) : (
          // Render NFTs once salesObj is available, limited by visibleCount
          salesObj.slice(0, visibleCount).map((token, index) => (
            <Nftmarketcard
              key={index}
              token={token}
              metadata={token.metadata}
              index={index}
              signedAccountId={signedAccountId}
              wallet={wallet}
            />
          ))
        )}
      </div>

      {/* View More button */}
      {salesObj && visibleCount < salesObj.length && (
        <button
          onClick={handleViewMore}
          className="mt-6 py-[1rem] px-[2rem] bg-tomato-400 rounded-xl border-[2px] border-solid border-tomato-100 text-white hover:bg-orangered-300"
        >
          View More
        </button>
      )}
    </div>
  );
}
