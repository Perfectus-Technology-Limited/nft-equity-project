import { configs } from "./web3.config"

export const getNFTContractABIWriteFunctions = () => {
  let writeFunctionList = [];
  const nftContractABI = JSON.parse(configs.nftContractABI);

  writeFunctionList = nftContractABI.filter(item => item.type === 'function' && item.stateMutability !== 'view');

  return writeFunctionList
}