"use client"
import ArtistInfo from "@/components/Artistinfo";
import { useTokens } from "@/hooks/useTokens";
import { useContext, useEffect, useState } from "react";
import { MarketplaceContract, MintContract } from '@/config'
import { NearContext } from '@/context'
import { buyNFT, removeNftListing, sellNft, transferNft, updatePrice } from '@/utils/menuOps'
import { BiTransfer } from 'react-icons/bi'
import { HiMenu } from 'react-icons/hi'
import { MdOutlineBackspace, MdOutlineSell } from "react-icons/md";
import { UpdatePriceModal } from '../../components/UpdatePriceModal'
import { useRouter } from 'next/navigation'
import { useOwnerListings } from '@/hooks/useOwnerListings'
import ModelViewer from '../../components/ModelViewer'
import { ShimmerThumbnail, ShimmerText, ShimmerBadge } from 'react-shimmer-effects';
import { useOneToken } from "@/hooks/useOneToken";
import { useTokensWithMetadata } from "@/hooks/useTokensWithMetadata";
import { TransferModaal } from "@/components/TransferModaal";
import { SellModal } from "@/components/SellModal";


const ArtistPageDesktop = () => {
  const { wallet, signedAccountId } = useContext(NearContext)
  const [menuOpen, setMenuOpen] = useState(null); 
  const [openPriceModal, setOpenPriceModal] = useState(false);
  const [openSellModal, setOpenSellModal] = useState(false)
  const [openTransferModal, setOpenTransferModal] = useState(false)
  const [tokenId, setTokenId] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    const [showListed, setShowListed] = useState(false);
    const [saleStatus, setSaleStatus] = useState({});
    const [ownedTokens, setOwnedTokens] = useState([])
    const tokenzz = useTokensWithMetadata()
    const salesObj = useOwnerListings()
    
    const handleTabToggle = () => {
      setShowListed(!showListed);
    };

    const handleOpenPriceModal = (token) => {
        setOpenPriceModal(true)
        setTokenId(token)
    };

    const handleOpenSellModal = (token) => {
      setOpenSellModal(true)
      setTokenId(token)
  }

  const handleOpenTransferModal = (token) => {
      setOpenTransferModal(true)
      setTokenId(token)
  }

    const checkSaleStatus = async (tokenId) => {
      const data = await wallet.viewMethod({
          contractId: MarketplaceContract,
          method: "get_sale",
          args: {
              nft_contract_token: `${MintContract}.${tokenId}`
          }
      });
      return data !== null;
  };


  const handleClose = () => {
        setOpenPriceModal(false)
        setOpenSellModal(false)
        setOpenTransferModal(false)
    };

    const toggleMenu = (index) => {
        setMenuOpen(menuOpen === index ? null : index);
    };

    useEffect(() => {
      async function fetch() {
          const data = await wallet.viewMethod({
              contractId: MintContract,
              method: "nft_tokens_for_owner",
              args: {
                  account_id: `${signedAccountId}`
              }
          })
          
          setOwnedTokens(data)
          const saleStatusObj = {};
          for (let token of data) {
              const isListed = await checkSaleStatus(token.token_id);
              saleStatusObj[token.token_id] = isListed;
          }
          setSaleStatus(saleStatusObj);
          
      }
      fetch()
  }, [wallet, signedAccountId,ownedTokens])

    useEffect(() => {
      if (tokenzz && salesObj ) {
        setIsLoading(false);
      }
    }, [tokenzz, salesObj]);

    const shimmerStyles = {
      background: "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite"
    };

    function renderData(metadata, token, index, price) {
      const { title, media } = metadata;
      const is3DModel = media && media.endsWith('.glb');

      return (
          <div 
              key={index} 
              className="flex flex-col h-full w-full rounded-xl bg-chocolate-300 border border-chocolate-200 cursor-pointer overflow-hidden"
              onClick={() => router.push(`/nft/${token.owner_id}/${token.token_id}`)}
                  style={{height:'550px', width : '100%' }}
              >
              <div 
                  className="relative w-full h-2/3 overflow-hidden rounded-t-xl"
              >
                  
                  {media && (
                      is3DModel ? (
                          <ModelViewer modelUrl={media}  />
                      ) : (
                          <img src={media} alt='NFT Media' className="relative w-full h-full object-cover rounded-t-xl " />
                      )
                  )}
                  <div className="absolute top-2 right-2 flex space-x-2">
                      {token.owner_id !== signedAccountId && (
                          <button 
                              onClick={(e) => { e.stopPropagation(); buyNFT(wallet, MintContract, MarketplaceContract, token.token_id, token.sale_conditions) }} 
                              className="bg-gray-950 text-white px-2 py-1 rounded hover:bg-gray-900"
                          >
                              Buy
                          </button>
                      )}
                      <button
                          onClick={(e) => {
                              e.stopPropagation();
                              toggleMenu(index);
                          }}
                          className="bg-chocolate-250 text-white px-2 py-1 hover:bg-chocolate-300 rounded-xl"
                      >
                          <HiMenu />
                          {menuOpen === index && (
                              <div
                                  className="absolute top-full right-0 mt-4 bg-chocolate-250 shadow-lg rounded-xl z-10 box-border border-[1px] border-solid border-chocolate-100 backdrop-filter backdrop-blur-2xl"
                                  style={{ transform: 'translateX(-0.5rem)' }}
                              >
                                  {!saleStatus[token.token_id] ? (
                                    <div className="py-2 text-white">
                                        {token.owner_id === signedAccountId && (
                                          <button
                                            onClick={() => handleOpenSellModal(token.token_id)}
                                            className="flex items-center justify-start gap-2 w-full px-2 py-2 hover:bg-chocolate-500 transition-colors duration-300"
                                          >
                                            <MdOutlineBackspace /> Sell
                                          </button>
                                        )}
                                        {token.owner_id === signedAccountId && (
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
                                  ):(
                                    <div className="text-white">
                                      {token.owner_id !== signedAccountId && (
                                          <button
                                              onClick={() =>
                                                  buyNFT(wallet, MintContract, MarketplaceContract, token.token_id, token.sale_conditions)
                                              }
                                              className="flex items-center justify-start gap-2 w-full px-2 py-2 hover:bg-chocolate-300 transition-colors duration-300"
                                          >
                                              <MdOutlineSell /> Buy
                                          </button>
                                      )}
                                      {token.owner_id === signedAccountId && (
                                          <>
                                              <button
                                                  onClick={() =>
                                                      removeNftListing(wallet, MintContract, MarketplaceContract, token.token_id)
                                                  }
                                                  className="flex items-center justify-start gap-2 w-full px-2 py-2 hover:bg-chocolate-300 transition-colors duration-300 rounded-t-xl"
                                              >
                                                  <MdOutlineBackspace /> Remove Listing
                                              </button>
                                              <button
                                                  onClick={() => handleOpenPriceModal(token.token_id)}
                                                  className="flex items-center justify-start gap-2 w-full px-2 py-2 hover:bg-chocolate-300 transition-colors duration-300 rounded-b-xl"
                                              >
                                                  <BiTransfer /> Update Price
                                              </button>
                                          </>
                                      )}
                                  </div>
                                  )}
                              </div>
                          )}
                      </button>

                  </div>
              </div>
              <div className="w-full p-5 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                      <h3 className="text-xl font-semibold capitalize">{title || "Distant Galaxy"}</h3>
                      <div className="flex items-center gap-3 text-sm font-mono">
                          <span>{token.owner_id}</span>
                      </div>
                  </div>
                  {   
                        !saleStatus[token.token_id] && (
                            <div className="font-mono text-caption-label-text text-white text-base">Not Listed</div>
                            )                        
                  }
                  {saleStatus[token.token_id] && 
                  <div className="flex justify-between text-sm font-mono text-caption-label-text">
                      <div>
                          <p>Price</p>
                          <p className="text-white text-base">{price} NEAR</p>
                          {token.owner_id==signedAccountId &&  <div className="text-white text-base text-truncate">Listed and Owned</div>}
                      </div>
                  </div>
                  }
              </div>
          </div>
      )
  }


  return (
    <div className="w-full relative bg-black flex flex-col items-start justify-start leading-[normal] tracking-[normal] text-center text-[1.375rem] text-caption-label-text font-basebody-work-sans">
      <section className="self-stretch flex flex-col items-center justify-start max-w-full">
      {isLoading ? (
          <ShimmerThumbnail className={isLoading ? "bg-transparent" : ""} height={200} width={100} rounded style={isLoading ? shimmerStyles : {}} />
        ) : (
          <img
            className="self-stretch relative max-w-full overflow-hidden max-h-full object-cover"
            alt="Artist Banner"
            src="/placeholder.png"
          />
        )}
        <div className="w-[68.125rem] flex flex-row items-start justify-start py-[0rem] px-[1.25rem] box-border max-w-full z-[1] mt-[-4.375rem]">
          <div className="rounded-xl flex flex-row items-start justify-start border-[2px] border-solid border-chocolate-200">
          {isLoading ? (
              <ShimmerThumbnail className={isLoading ? "bg-transparent" : ""} height={120} width={120} rounded style={isLoading ? shimmerStyles : {}} />
            ) : (
              <img
                className="h-[7.5rem] w-[7.5rem] relative object-cover"
                loading="lazy"
                alt="Artist Avatar"
                src="/asset1.png"
              />
            )}
          </div>
        </div>
      </section>
      {isLoading ? (
        <ShimmerText className={isLoading ? "bg-transparent" : ""} line={2} gap={10} style={isLoading ? shimmerStyles : {}} />
      ) : (
        <ArtistInfo />
      )}
      <div className="w-full flex flex-col gap-2">
        <div className="w-full border-t border-background-secondary"></div>
        <div className="w-full flex justify-center px-5">
          <div className="flex flex-wrap justify-start w-full max-w-[65rem]">
            <button 
              className={`flex-1 flex flex-col items-center py-3 px-5 border-b-2 border-caption-label-text min-w-[8.75rem] ${!showListed ? 'bg-gray-800 text-white' : 'text-gray-500'}`}
              disabled={!showListed}
              onClick={handleTabToggle}
            >
              <h3 className="text-white font-semibold capitalize text-lg">
                Owned
              </h3>
              <div className="bg-caption-label-text rounded-xl py-1 px-3">
                <span className="text-white text-sm">{tokenzz.length}</span>
              </div>
            </button>
            <button 
              className={`flex-1 flex flex-col items-center py-3 px-5 min-w-[8.75rem] ${showListed ? 'bg-gray-800 text-white' : 'text-gray-500'}`}
              disabled={showListed}
              onClick={handleTabToggle}
            >
              <h3 className="text-white font-semibold capitalize text-lg">
                Listed
              </h3>
              <div className="bg-background-secondary rounded-xl py-1 px-3">
                <span className="text-white text-sm">{salesObj.length}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    
      <section className="flex flex-col items-center justify-start py-20 px-5 gap-7 bg-[url('/nftcardsection.png')] bg-cover bg-no-repeat bg-center w-full text-left text-lg text-white font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {/* Brow i think NFT card ka alag componenets hai so please use that insted of creating new componenets*/}
          {isLoading ? (
            Array(6).fill().map((_, idx) => (
              <div key={idx} className="w-full">
                <ShimmerThumbnail className={isLoading ? "bg-transparent" : ""} height={350} rounded style={isLoading ? shimmerStyles : {}}/>
                <ShimmerText className={isLoading ? "bg-transparent" : ""} line={2} gap={10} style={isLoading ? shimmerStyles : {}}/>
                <ShimmerBadge className={isLoading ? "bg-transparent" : ""} width={100} style={isLoading ? shimmerStyles : {}}/>
              </div>
            ))
          ) : (
            showListed ? (
              salesObj && salesObj.map((token, index) => (
                <div key={index}>
                  {token.metadata && renderData(token.metadata, token, index,token.sale_conditions)}
                </div>
              ))
            ) : (
              tokenzz && tokenzz.map((token, index) => (
                <div key={index}>
                  {token.token.metadata && renderData(token.token.metadata, token.token, index, token.res ? token.res.sale_conditions : null )}
                </div>
              ))
            )
          )}
        </div>
      </section>
      <UpdatePriceModal open={openPriceModal} handleClose={handleClose} tokenId={tokenId} updatePrice={updatePrice} />
      <SellModal open={openSellModal} handleClose={handleClose} tokenId={tokenId} sellNft={sellNft} />
      <TransferModaal open={openTransferModal} handleClose={handleClose} tokenId={tokenId} transferNft={transferNft} />
    </div>
  );
};

export default ArtistPageDesktop;