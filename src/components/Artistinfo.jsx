"use client";
import { useCallback, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaInstagram, FaRegCopy } from "react-icons/fa";
import { RxDiscordLogo } from "react-icons/rx";
import { FaXTwitter } from "react-icons/fa6";
import { NearContext } from "@/context";
import { useTokens } from "@/hooks/useTokens";
import { useOwnerListings } from "@/hooks/useOwnerListings";

const ArtistInfo = ({ className = "" }) => {
  const onGlobeIconClick = useCallback(() => {
    window.open("https://www.google.com");
  }, []);
  
  const { signedAccountId } = useContext(NearContext);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  const tokenzz = useTokens();
  const listedTokens = useOwnerListings();
  
  // Simulating loading delay for demonstration
  useEffect(() => {
    if (tokenzz && listedTokens) {
      setIsLoading(false);
    }
  }, [tokenzz, listedTokens]);

  const profileData = {
    address: signedAccountId,
    tokensCount: tokenzz.length,
    listedTokensCount: listedTokens.length,
  };

  // Shimmer effect CSS
  const shimmerStyles = {
    background: "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite"
  };

  return (
    <section
      className={`self-stretch flex flex-col items-center justify-start py-10 mx-2 bg-[url('/artist-info@3x.png')] bg-cover bg-no-repeat bg-top max-w-full text-left text-[1.375rem] text-croc-primary-white font-segoe-ui ${className}`}
    >
      <div className="w-full max-w-5xl flex flex-col items-start justify-start">
        <div className="w-full flex flex-col sm:flex-row items-start justify-between gap-5">
          <div className="flex flex-col gap-6 min-w-[16rem] sm:w-full">
            <h1
              className={`text-[2.5rem] font-semibold capitalize leading-[110%] w-full sm:text-[2.563rem] sm:leading-10 text-left ${isLoading ? "bg-transparent" : ""}`}
              style={isLoading ? shimmerStyles : {}}
            >
              {isLoading ? "." :signedAccountId}
            </h1>
            <div className="flex gap-5 text-[1.75rem] sm:flex-wrap">
              <div className="flex flex-col items-start justify-start min-w-[7.375rem]">
                <b className={isLoading ? "bg-transparent" : ""} style={isLoading ? shimmerStyles : {}}>
                  {isLoading ? "." : profileData.tokensCount}
                </b>
                <h3 className="text-[1.375rem] font-normal capitalize">Tokens</h3>
              </div>
              <div className="flex flex-col items-start justify-start min-w-[7.375rem]">
                <b className={isLoading ? "bg-transparent" : ""} style={isLoading ? shimmerStyles : {}}>
                  {isLoading ? "." :profileData.listedTokensCount}
                </b>
                <h3 className="text-[1.375rem] font-normal capitalize">NFTs listed</h3>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold capitalize">Bio</h3>
              <h3 className="font-normal capitalize">
                {"The internet's friendliest designer kid."}
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="capitalize">Links</h3>
              <div className="flex gap-2">
                <RxDiscordLogo
                  className={`h-8 w-8 cursor-pointer ${isLoading ? "bg-transparent" : ""}`}
                  onClick={onGlobeIconClick}
                />
                <FaXTwitter
                  className={`h-8 w-8 cursor-pointer ${isLoading ? "bg-transparent" : ""}`}
                  onClick={onGlobeIconClick}
                />
                <FaInstagram
                  className={`h-8 w-8 cursor-pointer ${isLoading ? "bg-transparent" : ""}`}
                  onClick={onGlobeIconClick}
                />
              </div>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <button
              className={`flex items-center gap-2 py-4 px-5 bg-chocolate-300 rounded-xl border border-chocolate-200 hover:bg-coral-200 ${isLoading ? "bg-transparent" : ""}`}
              style={isLoading ? shimmerStyles : {}}
            >
              <FaRegCopy className="h-5 w-5" />
              <div className="text-sm font-semibold">{isLoading ? "..." : "0xc0E3...B79C"}</div>
            </button>
            <button
              className={`flex items-center gap-2 py-4 px-7 border-2 border-chocolate-200 rounded-xl hover:bg-coral-300 ${isLoading ? "bg-transparent" : ""}`}
              style={isLoading ? shimmerStyles : {}}
            >
              <img className="h-5 w-5" alt="" src="/plus.svg" />
              <div className="text-sm font-semibold">{isLoading ? "Loading..." : "Follow"}</div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

ArtistInfo.propTypes = {
  className: PropTypes.string,
};

export default ArtistInfo;
