import { ethers, utils } from 'ethers';
import { configs } from './web3.config';

export const getNFTContractABIWriteFunctions = () => {
  let writeFunctionList = [];
  const nftContractABI = JSON.parse(configs.nftContractABI);

  writeFunctionList = nftContractABI.filter(
    (item) =>
      item.type === 'function' &&
      item.stateMutability !== 'view' &&
      item.name !== 'approve' &&
      item.name !== 'changeFeePercentages' &&
      item.name !== 'changeTierDetails' &&
      item.name !== 'initialize' &&
      item.name !== 'mintNft' &&
      item.name !== 'safeTransferFrom' &&
      item.name !== 'setApprovalForAll' &&
      item.name !== 'transferFrom' &&
      item.name !== 'whitelistUsers' &&
      item.name !== 'withdrawBusd'
  );

  return writeFunctionList;
};

export const changeFeePercentages = async (signer, devFee, expencesFee) => {
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

    const devFeeFormatted = utils.parseUnits(
      devFee.toString(),
      1
    )

    const expencesFeeFormatted = utils.parseUnits(
      expencesFee.toString(),
      1
    )

    const receipt =  await contractInstanceWithSigner.changeFeePercentages(
      devFeeFormatted,
      expencesFeeFormatted
    )

    const result = await receipt.wait();
    return result;
  } catch (error) {
    let errorMessage =
      'Something went wrong while trying to write. Please try again';
    if (error && error.message) {
      errorMessage = error.message;
    }
    if (error && error.reason && error.reason !== '') {
      errorMessage = error.reason;
    }
    throw errorMessage;
  }
}

export const whitelistUsers = async (signer, address, status) => {
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
    const receipt =  await contractInstanceWithSigner.whitelistUsers(
      address,
      status
    )
    const result = await receipt.wait();
    return result;
  } catch (error) {
    let errorMessage =
      'Something went wrong while trying to write. Please try again';
    if (error && error.message) {
      errorMessage = error.message;
    }
    if (error && error.reason && error.reason !== '') {
      errorMessage = error.reason;
    }
    throw errorMessage;
  }
}

export const withdrawBusd = async (signer, amount) => {
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
    const busdAmountFormatted = utils.parseUnits(
      amount.toString(),
      18
    )
    const receipt =  await contractInstanceWithSigner.withdrawBusd(
      busdAmountFormatted
    )
    const result = await receipt.wait();
    return result;
  } catch (error) {
    let errorMessage =
      'Something went wrong while trying to write. Please try again';
    if (error && error.message) {
      errorMessage = error.message;
    }
    if (error && error.reason && error.reason !== '') {
      errorMessage = error.reason;
    }
    throw errorMessage;
  }
}