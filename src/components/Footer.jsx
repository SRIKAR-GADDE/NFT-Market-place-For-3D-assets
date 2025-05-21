import {
  IconBrandDiscord,
  IconBrandDiscordFilled,
  IconBrandInstagram,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { useCallback } from "react";
const Footer = ({ className = "" }) => {
  const onDiscordLogoIconClick = useCallback(() => {
    window.open("https://discord.com/");
  }, []);

  const onYoutubeLogoIconClick = useCallback(() => {
    window.open("https://www.youtube.com/");
  }, []);

  const onTwitterLogoIconClick = useCallback(() => {
    window.open("https://twitter.com/");
  }, []);

  const onInstagramLogoIconClick = useCallback(() => {
    window.open("https://www.instagram.com/");
  }, []);

  return (
    <footer
      className={`self-stretch bg-[#080B14] flex flex-col items-center justify-start py-[2.5rem] px-[1.25rem] box-border gap-[1.875rem] max-w-full text-left text-[1.375rem] text-croc-primary-white font-segoe-ui ${className}`}
    >
      <div className="flex flex-row items-start justify-start py-[0rem] pr-[2rem] pl-[1.937rem] box-border max-w-full">
        <div className="flex-1 flex flex-row items-start justify-between [row-gap:20px] max-w-full gap-[0rem] flex-wrap">
          <div className="w-[20.463rem] flex flex-col items-start justify-start py-[0rem] pr-[5.562rem] pl-[0rem] box-border gap-[1.875rem] max-w-full text-[1rem] text-lightgray font-basebody-work-sans mq450:gap-[0.938rem] mq450:pr-[1.25rem] mq450:box-border">
            {/* <img
              className="w-[12.463rem] h-[1.238rem] relative"
              alt=""
              src="/logo.svg"
            /> */}
            <div className="self-stretch flex flex-col items-start justify-start gap-[1.25rem]">
              <div className="self-stretch relative leading-[140%] text-2xl font-segoe-ui">
                NFT marketplace
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[0.625rem] font-segoe-ui">
                <div className="self-stretch relative leading-[1.438rem]">
                  Join our community
                </div>
                <div className="flex flex-row items-start justify-start gap-[0.625rem]">
                  <IconBrandDiscord onClick={onDiscordLogoIconClick} />
                  <IconBrandYoutube onClick={onYoutubeLogoIconClick} />
                  <IconBrandX onClick={onTwitterLogoIconClick} />

                  <IconBrandInstagram onClick={onInstagramLogoIconClick} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[0rem] pr-[7.687rem] pl-[0rem] gap-[1.562rem]">
            <b className="relative leading-[160%] capitalize inline-block min-w-[4.875rem] mq450:text-[1.125rem] mq450:leading-[1.75rem]">
              Explore
            </b>
            <div className="flex flex-col items-start justify-start gap-[1.25rem] text-[1rem] text-lightgray">
              <div className="relative leading-[140%] inline-block min-w-[5.5rem]">
                Marketplace
              </div>
              <div className="relative leading-[140%] inline-block min-w-[4rem]">
                Rankings
              </div>
              <div className="relative leading-[140%] inline-block min-w-[7.313rem]">
                Connect a wallet
              </div>
            </div>
          </div>
          <div className="w-[26.25rem] flex flex-col items-start justify-start gap-[1.562rem] max-w-full">
            <b className="relative leading-[160%] capitalize mq450:text-[1.125rem] mq450:leading-[1.75rem]">
              Join our weekly digest
            </b>
            <div className="self-stretch flex flex-col items-start justify-start gap-[1.25rem] max-w-full text-[1rem] text-lightgray">
              <div className="w-[20.625rem] relative leading-[140%] inline-block max-w-full">{`Get exclusive promotions & updates straight to your inbox.`}</div>
              <div className="self-stretch rounded-xl bg-gray-100 flex flex-row items-center justify-start py-[0rem] pr-[0rem] pl-[1.25rem] gap-[0.75rem] text-background font-basebody-work-sans mq450:flex-wrap mq450:pt-[1.25rem] mq450:pr-[1.25rem] mq450:pb-[1.25rem] mq450:box-border">
                <input
                  className="flex-1 relative leading-[140%] inline-block min-w-[8.5rem] w-full p-4 bg-transparent outline-none"
                  placeholder="Enter your email here"
                />
                <button className="cursor-pointer py-[1.062rem] px-[3.062rem] bg-chocolate-300 min-w-10 rounded-xl flex flex-row items-center justify-end gap-[0.75rem] border-[1px] border-solid border-chocolate-200 hover:bg-coral-200 hover:box-border hover:border-[1px] hover:border-solid hover:border-coral-100">
                  <img
                    className="h-[1.25rem] w-[1.25rem] relative hidden"
                    alt=""
                    src="/envelopesimple.svg"
                  />
                  <div className="relative text-[1rem] leading-[140%] font-semibold font-basebody-work-sans text-croc-primary-white text-center inline-block  w-14">
                    Subscribe
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[65.588rem] flex flex-col items-start justify-start gap-[1.187rem] max-w-full text-[0.75rem] text-lightgray">
        <div className="self-stretch h-[0.063rem] relative box-border border-t-[1px] border-solid border-caption-label-text border-tomato-100" />
        <div className="self-stretch relative leading-[110%]">
          Ⓒ NFT Market. By Campus to Crypto.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
