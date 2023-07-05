import { ethers, utils } from 'ethers';
import { getProvider } from '@wagmi/core';
import { configs } from './web3.config';

export const getTokenDecimals = async () => {
  try {
    const provider = getProvider();
    const contractAddress = configs.busdTokenAddress;
    const contractABI = configs.commonERC20ContractABI;
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const decimalsResponse = await contractInstance.decimals();
    const tokenDecimals = parseInt(decimalsResponse);
    return tokenDecimals;
  } catch (error) {
    let errorMessage =
      'Something went wrong while trying to fetch BUSD decimals. Please try again';
    if (error && error.message) {
      errorMessage = error.message;
    }
    if (error && error.reason && error.reason !== '') {
      errorMessage = error.reason;
    }
    throw errorMessage;
  }
};

export const getTierData = async (tierId) => {
  try {
    const provider = getProvider();
    const contractAddress = configs.nftContractAddress;
    const contractABI = JSON.parse(configs.nftContractABI);
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const tierData = await contractInstance.tiersDetails(tierId);
    return tierData;
  } catch (error) {
    let errorMessage =
      'Something went wrong while trying to fetch NFT data. Please try again';
    if (error && error.message) {
      errorMessage = error.message;
    }
    if (error && error.reason && error.reason !== '') {
      errorMessage = error.reason;
    }
    throw errorMessage;
  }
};
