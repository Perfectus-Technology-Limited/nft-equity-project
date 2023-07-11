import { ethers, utils } from 'ethers';
import { configs } from './web3.config';

export const getTokenDecimals = async () => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_BSC_RPC_PROVIDER
    );
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
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_BSC_RPC_PROVIDER
    );
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

export const getUserNft = async (address) => {
  let userNftIdsArray = [];
  let userNftDataArray = [];
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_BSC_RPC_PROVIDER
    );
    const contractAddress = configs.nftContractAddress;
    const contractABI = JSON.parse(configs.nftContractABI);
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    userNftIdsArray = await contractInstance.getMyNfts(address);

    if (userNftIdsArray) {
      for (const element of userNftIdsArray) {
        const userNftDetails = await contractInstance.nftDetails(element);
        const tierDetails = await contractInstance.tiersDetails(
          userNftDetails?.category
        );

        const price = tierDetails.price.toString();
        const priceFormattedString = utils.formatUnits(price, 18);
        const priceFormattedNumber = Number(priceFormattedString); // NFT price as a number

        const sharedRevenue = tierDetails.revenueShare.toString();
        const sharedRevenueString = utils.formatUnits(sharedRevenue, 2);
        const sharedRevenueNumber = Number(sharedRevenueString); // shared revenue percentage

        const aprString = utils.formatUnits(sharedRevenue, 3);
        const aprNumber = Number(aprString); // APR

        const equityShare = tierDetails.equityShare.toString();
        const equityShareString = utils.formatUnits(equityShare, 2);
        const equityShareNumber = Number(equityShareString); // equity share percentage

        let type = 'gold';

        switch (userNftDetails.category) {
          case 1:
            type = 'silver';
            break;
          case 2:
            type = 'bronze';
            break;
          case 3:
            type = 'standard';
            break;
          default:
            break;
        }

        let nftDataObject = {
          uri: userNftDetails.uri,
          type: type,
          nftId: element.toString(),
          price: priceFormattedNumber,
          sharedRevenue: sharedRevenueNumber,
          apr: aprNumber,
          equityShare: equityShareNumber,
        };

        userNftDataArray.push(nftDataObject);
      }
    }
    console.log('userNftDataArray: ', userNftDataArray);
    return userNftDataArray;
  } catch (error) {
    let errorMessage =
      'Something went wrong while trying to fetch your NFTs. Please try again';
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
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_BSC_RPC_PROVIDER
    );
    const contractAddress = configs.nftContractAddress;
    const contractABI = JSON.parse(configs.nftContractABI);
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const isPublicResponse = await contractInstance.isPublic();
    return isPublicResponse;
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
};

export const isWalletWhitelisted = async (address) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_BSC_RPC_PROVIDER
    );
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
};

export const mintNft = async (tierId, referralAddress, signer) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_BSC_RPC_PROVIDER
    );
    const contractAddress = configs.nftContractAddress;
    const contractABI = JSON.parse(configs.nftContractABI);
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const contractInstanceWithSigner = contractInstance.connect(signer);
    const nftMintReceipt = await contractInstanceWithSigner.mintNft(
      tierId,
      referralAddress
    );
    const result = await nftMintReceipt.wait();
    return result;
  } catch (error) {
    let errorMessage =
      'Something went wrong while trying to mint NFT. Please try again';
    if (error && error.message) {
      errorMessage = error.message;
    }
    if (error && error.reason && error.reason !== '') {
      errorMessage = error.reason;
    }
    throw errorMessage;
  }
};

export const fetchAllowance = async (address) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_BSC_RPC_PROVIDER
    );
    const contractAddress = configs.busdTokenAddress;
    const contractABI = configs.commonERC20ContractABI;
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const spenderAddress = configs.nftContractAddress;
    const allowanceResponse = await contractInstance.allowance(
      address,
      spenderAddress
    );
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
};

export const approveTokens = async (tokenAmount, signer) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_BSC_RPC_PROVIDER
    );
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
};
