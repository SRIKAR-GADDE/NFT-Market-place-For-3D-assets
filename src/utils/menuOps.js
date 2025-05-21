import { utils } from "near-api-js";


export async function transferNft(wallet,MintContract,tokenId,receiverId){
    const tx = await wallet.callMethod({
        contractId : MintContract,
        method : "nft_transfer",
        args : {
            receiver_id : `${receiverId}`,
            token_id : `${tokenId}`,
            
        },
        deposit : `${utils.format.parseNearAmount("0.000000000000000000000001")}` 
    })
}

export async function removeNftListing(wallet,MintContract,MarketContract,tokenId){
    const tx = await wallet.callMethod({
        contractId : MarketContract,
        method : "remove_sale",
        args : {
            nft_contract_id : `${MintContract}`,
            token_id : `${tokenId}`,
        },
        deposit : `${utils.format.parseNearAmount("0.000000000000000000000001")}` 
    })
}

export async function sellNft(
    wallet,
    signedAccountId,
    MintContract,
    MarketplaceContract,
    tokenId,
    price
) {
    try {
        const depositTx = 
            {
                receiverId: MarketplaceContract,
                actions: [
                    {
                        type: "FunctionCall",
                        params: {
                            methodName: "storage_deposit",
                            args: { account_id: signedAccountId },
                            gas: "300000000000000",
                            deposit: utils.format.parseNearAmount("0.01"),
                        },
                    },
                ],
            }
        const approveTx =
            {
                receiverId: MintContract,
                actions: [
                    {
                        type: "FunctionCall",
                        params: {
                            methodName: "nft_approve",
                            args: {
                                token_id: tokenId,
                                account_id: MarketplaceContract,
                                msg: JSON.stringify({
                                    sale_conditions: `${price}`,
                                }),
                            },
                            gas: "300000000000000",
                            deposit: utils.format.parseNearAmount("0.001"), 
                        },
                    },
                ],
            }
        
        
        const response = await wallet.signAndSendTransactions({transactions : [depositTx, approveTx]});
        console.log("Transactions successfully sent:", response);
    } catch (error) {
        console.error("Error while listing NFT for sale:", error);
        throw error;
    }
}

export async function updatePrice(wallet,MintContract,MarketplaceContract,tokenId, price){
    const transaction =  await wallet.callMethod({
        contractId : MarketplaceContract,
        method : "update_price",
        args : {
            nft_contract_id : `${MintContract}`,
            token_id : `${tokenId}`,
            price : `${price}`
            
        },
        deposit : `${utils.format.parseNearAmount("0.000000000000000000000001")}`,
    }) 
    
}

export async function buyNFT(wallet,MintContract,MarketplaceContract,tokenId,price){
    const transaction =  await wallet.callMethod({
        contractId : MarketplaceContract,
        method : "offer",
        args : {
            nft_contract_id : `${MintContract}`,
            token_id : `${tokenId}`,
            
        },
        deposit : `${utils.format.parseNearAmount(`${price}`)}`,
        gas : "200000000000000"
    }) 
    
}