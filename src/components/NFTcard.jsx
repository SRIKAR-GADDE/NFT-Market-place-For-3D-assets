import PropTypes from "prop-types";
import classNames from "classnames";
import ModelViewer from "./ModelViewer";
import { MdOutlineBackspace, MdOutlineSell } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import { UpdatePriceModal } from "./UpdatePriceModal";
import { buyNFT, transferNft, updatePrice } from "@/utils/menuOps";
import { useContext, useState } from "react";
import { NearContext } from "@/context";
import { MarketplaceContract, MintContract } from "@/config";

const NFTCardOneInfo = ({
  className = "",
  key,
  token,
  image,
  owner,
  NFT,
  isListed,
  onClick,
  handleOpenSellModal,
  handleOpenTransferModal,
  removeNftListing,
  handleClose,
}) => {
  const is3DModel = image && image.endsWith(".glb");
  const { wallet, signedAccountId } = useContext(NearContext);
  const [tokenId, setTokenId] = useState(null);
  const [openPriceModal, setOpenPriceModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);

  const handleOpenPriceModal = (token) => {
    setOpenPriceModal(true);
    setTokenId(token);
  };

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  return (
    <div
      onClick={onClick}
      className={classNames(
        "relative cursor-pointer bg-chocolate-400 shadow-lg rounded-lg overflow-hidden",
        className
      )}
      style={{ height: "400px", width: "100%" }}
    >
      {image &&
        (is3DModel ? (
          <ModelViewer modelUrl={image} />
        ) : (
          <img
            src={image}
            alt="NFT image"
            loading="lazy"
            className="relative object-cover w-full h-full"
          />
        ))}
      <div className="absolute bottom-0 left-0 w-full  rounded-lg bg-gray-300 box-border flex md:flex-row items-start md:items-center justify-between p-4 gap-4 z-10 border border-solid border-gray-500 backdrop-filter backdrop-blur-md">
        <div className="flex flex-col items-start justify-start ">
          <div className="flex flex-col items-start justify-start">
            <div className="relative tracking-wide leading-none font-semibold text-lg md:text-xl z-20">
              {NFT}
            </div>
            <div className="relative text-sm md:text-base text-gray-400 z-20">
              {owner}
            </div>
          </div>
          <b className="relative text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-300 z-20">
            {isListed}
          </b>
        </div>
        {owner !== signedAccountId && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              buyNFT(
                wallet,
                MintContract,
                MarketplaceContract,
                token.token_id,
                token.sale_conditions
              );
            }}
          >
            Buy
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu(key);
          }}
          className="cursor-pointer py-2 px-6 bg-transparent rounded-full bg-gradient-to-r from-blue-200 to-orange-400 flex items-center justify-center z-20 border border-solid border-tomato-100 hover:bg-orange-500"
        >
          <div className="relative text-lg font-medium text-white ">Options</div>
          {menuOpen === key && (
            <div className="absolute mt-4 bg-chocolate-700 w-40 shadow-lg z-10 rounded backdrop-filter backdrop-blur-lg"
            style={{ transform: 'translateY(-7rem) translateX(-0.75rem)' }}>
              {isListed == "Not Listed" ? (
                <div className="py-2 text-white">
                  {owner === signedAccountId && (
                    <button
                      onClick={() => handleOpenSellModal(token.token_id)}
                      className="flex items-center justify-start gap-2 w-full px-2 py-2 hover:bg-chocolate-500 transition-colors duration-300"
                    >
                      <MdOutlineBackspace /> Sell
                    </button>
                  )}
                  {owner === signedAccountId && (
                    <button
                      onClick={() =>
                        handleOpenTransferModal(`${token.token_id}`)
                      }
                      className="flex items-center justify-start gap-2 w-full px-2 py-2 hover:bg-chocolate-500 transition-colors duration-300 rounded-b"
                    >
                      <BiTransfer /> Transfer
                    </button>
                  )}
                </div>
              ) : (
                <div className="py-2 text-white">
                  {owner !== signedAccountId && (
                    <button
                      onClick={() =>
                        buyNFT(
                          wallet,
                          MintContract,
                          MarketplaceContract,
                          token.token_id,
                          token.sale_conditions
                        )
                      }
                      className="flex items-center justify-start gap-2 w-full px-2 py-2 hover:bg-chocolate-500 transition-colors duration-300 rounded-t"
                    >
                      <MdOutlineSell /> Buy
                    </button>
                  )}
                  {owner === signedAccountId && (
                    <button
                      onClick={() =>
                        removeNftListing(
                          wallet,
                          MintContract,
                          MarketplaceContract,
                          token.token_id
                        )
                      }
                      className="flex items-center justify-start gap-2 w-full px-2 py-2 hover:bg-chocolate-500 transition-colors duration-300"
                    >
                      <MdOutlineBackspace /> Remove Listing
                    </button>
                  )}
                  {owner === signedAccountId && (
                    <button
                      onClick={() => handleOpenPriceModal(`${token.token_id}`)}
                      className="flex items-center justify-start gap-2 w-full px-2 py-2 hover:bg-chocolate-500 transition-colors duration-300 rounded-b"
                    >
                      <BiTransfer /> Update Price
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </button>
      </div>
      <UpdatePriceModal
        open={openPriceModal}
        handleClose={handleClose}
        tokenId={tokenId}
        updatePrice={updatePrice}
      />
    </div>
  );
};

NFTCardOneInfo.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  NFT: PropTypes.string.isRequired,
  Eth: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  menuOpen: PropTypes.bool,
  toggleMenu: PropTypes.func,
  handleOpenSellModal: PropTypes.func,
  handleOpenTransferModal: PropTypes.func,
  removeNftListing: PropTypes.func,
};

export default NFTCardOneInfo;
