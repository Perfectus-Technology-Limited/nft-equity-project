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

export const isNftPublic = async () => {
  try {
    const provider = getProvider(); 
    const contractAddress = configs.nftContractAddress;
    const contractABI = JSON.parse(configs.nftContractABI);
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const isPublicResponse = await contractInstance.isPublic();
    return isPublicResponse
  } catch (error) {
    let errorMessage =
      'Something went wrong while trying to fetch if NFT is public or not. Please try again';
    if (error && error.message) {
      errorMessage = error.message;
    }
    if (error && error.reason && error.reason !== '') {
      errorMessage = error.reason;
    }
    throw errorMessage;
  }
}

export const isWalletWhitelisted = async (address) => {
  try {
    const provider = getProvider(); 
    const contractAddress = configs.nftContractAddress;
    const contractABI = JSON.parse(configs.nftContractABI);
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const isWhitelistedResponse = await contractInstance.isWhitelisted(address);
    return isWhitelistedResponse;
  } catch (error) {
    let errorMessage =
      'Something went wrong while trying to fetch if wallet is whitelisted or not. Please try again';
    if (error && error.message) {
      errorMessage = error.message;
    }
    if (error && error.reason && error.reason !== '') {
      errorMessage = error.reason;
    }
    throw errorMessage;
  }
}

export const fetchAllowance = async (address) => {
  try {
    const provider = getProvider();
    const contractAddress = configs.busdTokenAddress;
    const contractABI = configs.commonERC20ContractABI;
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const spenderAddress = configs.nftContractAddress;
    const allowanceResponse = await contractInstance.allowance(address, spenderAddress)
    return allowanceResponse;
  } catch (error) {
    let errorMessage =
      'Something went wrong while trying to fetch allowance. Please try again';
    if (error && error.message) {
      errorMessage = error.message;
    }
    if (error && error.reason && error.reason !== '') {
      errorMessage = error.reason;
    }
    throw errorMessage;
  }
}

export const approveTokens = async (tokenAmount, signer) => {
  try {
    console.log('calledd.....')
    const provider = getProvider();
    const contractAddress = configs.busdTokenAddress;
    const contractABI = configs.commonERC20ContractABI;
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const contractInstanceWithSigner = contractInstance.connect(signer);
    const spenderAddress = configs.nftContractAddress;
    const actualAmountForApproval = utils.parseUnits(
      tokenAmount.toString(),
      18
    );
    const approveTokenReceipt = await contractInstanceWithSigner.approve(
      spenderAddress,
      actualAmountForApproval
    );

    const result = await approveTokenReceipt.wait();
    return result;

  } catch (error) {
    let errorMessage =
      'Something went wrong while trying to approve the token. Please try again';
    if (error && error.message) {
      errorMessage = error.message;
    }
    if (error && error.reason && error.reason !== '') {
      errorMessage = error.reason;
    }
    throw errorMessage;
  }
}