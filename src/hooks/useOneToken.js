import { MarketplaceContract, MintContract } from "@/config";
import { NearContext } from "@/context";
import { useContext, useEffect, useState } from "react";

export function useOneToken(tokenId) {
    const {wallet,signedAccountId} = useContext(NearContext);
    const [token,setToken] = useState()
    const [metadata, setMetadata] = useState()
    const [sale, setsale] = useState()
    useEffect(() => {
            async function fetch(){
                const data = await wallet.viewMethod({
                    contractId: MintContract,
                    method: "nft_token",
                    args: {
                        token_id : `${tokenId}`
                    }
                })
                const saleDetails = await wallet.viewMethod({
                    contractId : MarketplaceContract,
                    method : "get_sale",
                    args : {
                        nft_contract_token : `${MintContract}.${tokenId}`
                    }
                })
                setsale(saleDetails)
                if (data) {
                    const { metadata, ...rest } = data;
                    setToken(rest);
                    setMetadata(metadata);
                }
            }
            fetch()
    }, [wallet, signedAccountId,token])

    return {token,metadata,sale}

}
