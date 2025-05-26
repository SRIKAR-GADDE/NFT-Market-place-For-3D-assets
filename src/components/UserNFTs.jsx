"use client"
import { MarketplaceContract, MintContract } from '@/config'
import { NearContext } from '@/context'
import React, { useContext, useEffect, useState } from 'react'
import {HiMenu} from 'react-icons/hi'
import { removeNftListing, sellNft, transferNft } from '@/utils/menuOps'
import { MdOutlineSell } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import { MdOutlineBackspace } from "react-icons/md";
import { SellModal } from './SellModal'
import { TransferModaal } from './TransferModaal'
import { useRouter } from 'next/navigation'
import ModelViewer from './ModelViewer'

export default function UserNFTs() {
    const { signedAccountId, wallet } = useContext(NearContext)
    const [ownedTokens, setOwnedTokens] = useState([])
    const [menuOpen, setMenuOpen] = useState(null); 
    const [openSellModal, setOpenSellModal] = useState(false);
    const [openTransferModal, setOpenTransferModal] = useState(false);
    const [tokenId,setTokenId] = useState(null)
    const [saleStatus, setSaleStatus] = useState({});
    const router = useRouter() 

    const handleOpenSellModal = (token) => {
      setOpenSellModal(true)
      setTokenId(token)
    };
  
    const handleOpenTransferModal = (token) => {
      setOpenTransferModal(true)
      setTokenId(token)
    };
  
    const handleClose = () => {
      setOpenSellModal(false)
      setOpenTransferModal(false)
    };

    const toggleMenu = (index) => {
        setMenuOpen(menuOpen === index ? null : index);
      };

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
    
    const renderdata = (metadata,token,index) => {
        const { title, description, media } = metadata;
        const is3DModel = media && media.endsWith('.glb');
        return (
                <div onClick={()=> router.push(`/nft/${token.owner_id}/${token.token_id}`)} className="cursor-pointer flex flex-col h-full shadow bg-gray-950 text-white overflow-hidden rounded-lg group" >
                <div className='relative h-6/7 h-full overflow-hidden'>
                    {media && (
                        is3DModel ? (
                                <ModelViewer modelUrl={media} />
                            ) : (
                                <img src={media} alt='null' className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110" />
                            )
                    )}
                    <div className="absolute top-2 right-2 flex space-x-2">
                        {!saleStatus[token.token_id] && <button onClick={(e) => { e.stopPropagation(); handleOpenSellModal(`${token.token_id}`) }} className="bg-gray-950 text-white px-2 py-1 rounded hover:bg-gray-900">
                            Sell
                        </button>}
                        <button onClick={(e) => {e.stopPropagation();  toggleMenu(index) }} className="bg-gray-950 text-white px-2 py-1 rounded hover:bg-gray-900">
                            <HiMenu />
                        {menuOpen === index && (
                            <div className="absolute right-0 mt-4 bg-gray-900  w-40 shadow-lg sm:w-38 md:w-30 lg:w-40 z-10">
                            <div className="py-2 text-white">
                                {!saleStatus[token.token_id] && <button onClick={()=>handleOpenSellModal(`${token.token_id}`)} className="flex items-center justify-start gap-2 w-full px-2 py-2 hover:bg-gray-700 transition-colors duration-300"><MdOutlineSell/> Sell</button>}
                                <button onClick={()=>handleOpenTransferModal(`${token.token_id}`)} className="flex items-center justify-start gap-2 w-full px-2 py-2 hover:bg-gray-700 transition-colors duration-300"><BiTransfer/> Transfer</button>
                                {saleStatus[token.token_id] && <button onClick={()=>removeNftListing(wallet,MintContract,MarketplaceContract,token.token_id)} className="flex items-center justify-start gap-2 w-full px-2 py-2 hover:bg-gray-700 transition-colors duration-300"><MdOutlineBackspace/> Remove Listing</button>}
                            </div>
                            </div>
                        )}
                        </button>
                    </div>
                </div>
                <footer className='h-1/7 p-4 flex flex-col justify-between bg-gray-900 transition-colors duration-300 group-hover:bg-gray-800'>
                    <div className="text-sm text-truncate ">{token.owner_id}</div>
                    <div className="text-lg font-bold text-truncate">{typeof title === 'string' ? title : 'No title available'}</div>
                    {   
                        saleStatus[token.token_id] ? (
                            <div className="text-sm  text-gray-500 text-truncate"> Listed</div>
                            ) : (
                                <div className="text-sm  text-gray-500 text-truncate">Not Listed</div>
                            )
                        
                    }
                    
                </footer>
            </div>
        )
    }


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

    return (
        <div className="container  p-5">
            {console.log(ownedTokens)}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {ownedTokens && ownedTokens.map((token, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                {token.metadata && renderdata(token.metadata,token,index)} 
                            </div>
                    ))}
                </div>
                <SellModal open={openSellModal} handleClose={handleClose} tokenId={tokenId} sellNft={sellNft} />
                <TransferModaal open={openTransferModal} handleClose={handleClose} tokenId={tokenId} transferNft={transferNft} />

        </div>

    )
}
