const nftMintContract = {
  mainnet: 'nft.chaitunear.testnet',
  testnet: 'nft.chaitunear.testnet',
};
const marketplaceContract = {
  mainnet: 'marketplace.chaitunear.testnet',
  testnet: 'marketplace.chaitunear.testnet',
};

export const NetworkId = 'testnet';
export const MintContract = nftMintContract[NetworkId];
export const MarketplaceContract = marketplaceContract[NetworkId];