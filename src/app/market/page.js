"use client";
import Meteors from "@/components/magicui/meteors";
import { Nftmarketcard } from "@/components/NFTmarketcard";
import { NearContext } from "@/context";
import { useApprovedTokens } from "@/hooks/useApprovedTokens";
import { IconSearch } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { ShimmerThumbnail } from "react-shimmer-effects"; // Import shimmer effect

export default function Page() {
  const { wallet, signedAccountId } = useContext(NearContext);
  const [loading, setLoading] = useState(true);
  const salesObj = useApprovedTokens();

  useEffect(() => {
    if (salesObj && salesObj.length > 0) {
      setLoading(false);
    }
  }, [salesObj]);

  return (
    <main className="bg-black">
      <div className="absolute flex h-2/4 w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl ">
        <Meteors number={30} />
      </div>
      <div
        className={`self-stretch flex flex-col items-center justify-start py-[5rem] px-[1.25rem] box-border  max-w-full text-left text-[3.188rem] text-croc-primary-white font-segoe-ui mq450:pt-[3.25rem] mq450:pb-[3.25rem] mq450:box-border mq750:gap-[1.25rem] `}
      >
        <div className="w-[65.625rem] flex flex-col items-start justify-start gap-[1.875rem] max-w-full">
          <div className="self-stretch flex flex-col items-start justify-start gap-[0.625rem] shrink-0">
            <div className="self-stretch relative leading-[110%] capitalize font-semibold mq450:text-[1.938rem] mq450:leading-[2.125rem] mq1050:text-[2.563rem] mq1050:leading-[2.813rem]">
              Browse Marketplace
            </div>
            <div className="self-stretch relative text-[1.375rem] leading-[160%] mq450:text-[1.125rem] mq450:leading-[1.75rem]">
              Browse through more than 5k NFTs on the NFT Marketplace.
            </div>
          </div>
          <div className="self-stretch h-[3.875rem] rounded-xl box-border flex flex-col items-center justify-center py-[1.125rem] px-[0rem] max-w-full border-[1px] border-solid border-chocolate-100">
            <div className="self-stretch flex flex-row items-center justify-between py-[0rem] px-[1.25rem] box-border max-w-full gap-[1.25rem]">
              <input
                className="w-[60rem] [border:none] [outline:none] bg-[transparent] h-[1.375rem] flex flex-row items-center justify-start font-basebody-work-sans text-[1rem] text-caption-label-text max-w-[calc(100%_-_44px)] z-10"
                placeholder="Search your NFTs"
                type="text"
              />
              <IconSearch />
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch bg-chocolate-300 border-chocolate-200 flex flex-col items-start justify-start gap-[0.562rem] max-w-full">
        <div className="self-stretch h-[0.063rem] relative box-border border-t-[1px] border-solid border-background-secondary" />
        <div className="self-stretch flex flex-row items-start justify-center py-[0rem] px-[1.25rem] box-border max-w-full">
          <div className="w-[65.625rem] flex flex-row items-start justify-start max-w-full">
            <div className="flex-1 flex flex-row items-start justify-start max-w-full [row-gap:20px] text-white">
              <div className="flex-1 box-border flex flex-row items-center justify-center pt-[0.875rem] px-[1.25rem] pb-[0.687rem] gap-[1rem] max-w-full border-b-[2px] border-solid border-dimgray-200 mq450:flex-wrap mq450:min-w-full">
                <h3 className="m-0 relative text-inherit leading-[1.938rem] capitalize font-semibold font-inherit inline-block min-w-[3.375rem] mq450:text-[1.125rem] mq450:leading-[1.563rem]">
                  NFTs
                </h3>
                <div className="rounded-xl bg-caption-label-text flex flex-row items-center justify-start py-[0.312rem] px-[0.625rem] text-left text-[1rem] font-caption-space-mono">
                  <div className="relative leading-[140%] inline-block min-w-[1.875rem]">
                    {salesObj.length}
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-row items-center justify-center py-[0.875rem] px-[1.25rem] box-border gap-[1rem]  max-w-full mq450:flex-wrap mq450:min-w-full">
                <h3 className="m-0 relative text-inherit leading-[1.938rem] capitalize font-semibold font-inherit inline-block min-w-[7.625rem] mq450:text-[1.125rem] mq450:leading-[1.563rem]">
                  Collections
                </h3>
                <div className="rounded-xl bg-dimgray-100 flex flex-row items-center justify-start py-[0.312rem] px-[0.625rem] text-left text-[1rem] text-croc-primary-white font-caption-space-mono">
                  <div className="relative leading-[140%] inline-block min-w-[1.25rem]">
                    67
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen flex flex-col justify-center items-center">
        <section className="flex items-center justify-center flex-wrap gap-4 p-20 max-[600px]:p-4 text-white md:w-11/12">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <ShimmerThumbnail width={300} height={400} />
                </div>
              ))
            : salesObj.map((token, index) => (
                <Nftmarketcard
                  key={index}
                  token={token}
                  metadata={token.metadata}
                  index={index}
                  signedAccountId={signedAccountId}
                  wallet={wallet}
                />
              ))}
        </section>
      </div>
    </main>
  );
}
