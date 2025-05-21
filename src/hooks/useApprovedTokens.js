"use client"
import React, { useContext, useState,useEffect } from 'react'
import { MarketplaceContract, MintContract } from '@/config';
import { NearContext } from '@/context';
import { useAllTokens } from './useAllTokens';

export  function useApprovedTokens() {
    const {wallet,signedAccountId} = useContext(NearContext)
    const [salesObj,setSalesObj] = useState([])
    const tokenzz = useAllTokens()
    
    useEffect(()=>{
        async function fetch(){

            const approved = await wallet.viewMethod({
                contractId : MarketplaceContract,
                method : "get_sales_by_nft_contract_id",
                args : {
                  nft_contract_id : `${MintContract}`,
                }
              })
              const metadataMap = tokenzz.reduce((map, token) => {
                map[token.token_id] = token.metadata;
                return map;
            }, {});

            // Add metadata to each sale object
            const salesWithMetadata = approved.map(sale => {
                const tokenId = sale.token_id; // Ensure this matches the property name in your sale object
                const metadata = metadataMap[tokenId];
                return {
                    ...sale,
                    metadata,
                };
            });

            setSalesObj(salesWithMetadata);
        }

        if (wallet && signedAccountId && tokenzz.length > 0) {
            fetch();
        }

  
      },[wallet,signedAccountId,tokenzz]) 

      return salesObj
  
}
