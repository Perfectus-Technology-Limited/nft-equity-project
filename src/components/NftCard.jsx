import { Button, Spin, Tooltip, Typography, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import {
  getTierData,
  isNftPublic,
  isWalletWhitelisted,
  fetchAllowance,
  approveTokens,
  mintNft,
} from '@/Blockchain/web3.service';
import { utils } from 'ethers';
import { useAccount, useSigner } from 'wagmi';
import { useRouter } from 'next/router';

const nftProperties = {
  price: 0,
  available: 0,
  sharedRevenue: 0,
  APR: 0,
  equityShare: 0,
};

const NftCard = ({ tierData }) => {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const { Title, Text } = Typography;
  const [count, setCount] = useState(1);
  const [nftData, setNftData] = useState(nftProperties);
  const [isNftDataLoading, setIsNftDataLoading] = useState(false);

  const [isAllowanceLoading, setIsAllowanceLoading] = useState(false);
  const [allowance, setAllowance] = useState(0);

  const router = useRouter();
  const { ref } = router.query;

  const [isPublic, setIsPublic] = useState(false);
  const [isPublicLoading, setIsPublicLoading] = useState(false);

  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [isWhitelistedLoading, setIsWhitelistedLoading] = useState(false);

  const [isApproved, setIsApproved] = useState(false);
  const [isApprovalLoading, setIsApprovalLoading] = useState(false);
  const [approveButtonDisabled, setApproveButtonDisabled] = useState(true);

  const [isMinting, setIsMinting] = useState(false);
  const [mintButtonDisabled, setMintButtonDisabled] = useState(true);

  const fetchNftDataNofiticationKey = 'fetch_nft_data';
  const fetchNftIsPublicNofiticationKey = 'fetch_is_public';
  const fetchWalletWhitelistedNotificationKey = 'fetch_is_whitelisted';

  const handleDecrease = () => {
    if (count > 1) {
      setCount((count) => count - 1);
    }
  };

  const handleIncrease = () => {
    setCount((count) => count + 1);
  };

  useEffect(() => {
    fetchTierData();
    isNFTPublic();
  }, [tierData]);

  useEffect(() => {
    if (address) {
      getAllowance();
    }
  }, [address]);

  const getAllowance = async () => {
    try {
      setIsAllowanceLoading(true);
      const result = await fetchAllowance(address);
      const allowance = result.toString();
      const allowanceFormattedString = utils.formatUnits(allowance, 18);
      const allowanceFormattedNumber = Number(allowanceFormattedString);
      setAllowance(allowanceFormattedNumber);
      setIsAllowanceLoading(false);
    } catch (error) {
      setIsAllowanceLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (isPublic || isWhitelisted) {
      if (isApproved) {
        setApproveButtonDisabled(true);
        setMintButtonDisabled(false);
      } else {
        setApproveButtonDisabled(false);
        setMintButtonDisabled(true);
      }
    } else {
      setApproveButtonDisabled(true);
      setMintButtonDisabled(true);
    }
  }, [isPublic, isWhitelisted, isApproved]);

  useEffect(() => {
    if (address) {
      isWhitelistedAccount();
    }
  }, [address]);

  useEffect(() => {
    if (allowance >= count * nftData.price) {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  }, [allowance, count, nftData.price]);

  const isWhitelistedAccount = async () => {
    try {
      setIsWhitelistedLoading(true);
      const result = await isWalletWhitelisted(address);
      setIsWhitelisted(result);
      setIsWhitelistedLoading(false);
    } catch (error) {
      setIsWhitelistedLoading(false);
      console.log(error);
      // notification['error']({
      //   key: fetchWalletWhitelistedNotificationKey,
      //   message: 'Error',
      //   description: error,
      // });
    }
  };

  // this function will fetch NFT details for each tier
  const fetchTierData = async () => {
    try {
      setIsNftDataLoading(true);
      const result = await getTierData(tierData.tierId); // to fetch NFT tier data

      const price = result.price.toString();
      const priceFormattedString = utils.formatUnits(price, 18);
      const priceFormattedNumber = Number(priceFormattedString); // NFT price as a number

      const sharedRevenue = result.revenueShare.toString();
      const sharedRevenueString = utils.formatUnits(sharedRevenue, 2);
      const sharedRevenueNumber = Number(sharedRevenueString); // shared revenue percentage

      const aprString = utils.formatUnits(sharedRevenue, 3);
      const aprNumber = Number(aprString); // APR

      const equityShare = result.equityShare.toString();
      const equityShareString = utils.formatUnits(equityShare, 2);
      const equityShareNumber = Number(equityShareString); // equity share percentage

      const lastMintedId = result.lastId.toString();
      const lastMintedIdNumber = Number(lastMintedId);

      let availableCount; // minted NFT count

      switch (tierData.tierId) {
        case 0:
          availableCount = 10 - lastMintedIdNumber; // gold
          break;
        case 1:
          availableCount = 20 - (lastMintedIdNumber - 10); // silver
          break;
        case 2:
          availableCount = 30 - (lastMintedIdNumber - 30); // bronze
          break;
        case 3:
          availableCount = 40 - (lastMintedIdNumber - 60); // standard
          break;
        default:
          break;
      }

      let nftPropertiesObject = {
        price: priceFormattedNumber,
        available: availableCount,
        sharedRevenue: sharedRevenueNumber,
        APR: aprNumber,
        equityShare: equityShareNumber,
      };

      setNftData(nftPropertiesObject);
      setIsNftDataLoading(false);
    } catch (error) {
      setIsNftDataLoading(true);
      console.log(error);
      // notification['error']({
      //   key: fetchNftDataNofiticationKey,
      //   message: 'Error',
      //   description: error,
      // });
    }
  };

  // this function will return NFT webm for each tier
  const getNFT = () => {
    switch (tierData.tierId) {
      case 0:
        return (
          <video
            src="/Gold.webm"
            alt="nft-img"
            className={`${tierData?.type}-nft-bg col-11 mt-4 mb-4`}
            autoPlay
            playsInline
            muted
            loop
          />
        );
      case 1:
        return (
          <video
            src="/Silver.webm"
            alt="nft-img"
            className={`${tierData?.type}-nft-bg col-11 mt-4 mb-4`}
            autoPlay
            playsInline
            muted
            loop
          />
        );
      case 2:
        return (
          <video
            src="/Bronze.webm"
            alt="nft-img"
            className={`${tierData?.type}-nft-bg col-11 mt-4 mb-4`}
            autoPlay
            playsInline
            muted
            loop
          />
        );
      case 3:
        return (
          <video
            src="/Standard.webm"
            alt="nft-img"
            className={`${tierData?.type}-nft-bg col-11 mt-4 mb-4`}
            autoPlay
            playsInline
            muted
            loop
          />
        );
      default:
        break;
    }
  };

  const isNFTPublic = async () => {
    try {
      setIsPublicLoading(true);
      const result = await isNftPublic();
      setIsPublic(result);
      setIsPublicLoading(false);
    } catch (error) {
      setIsPublicLoading(false);
      console.log(error);
      // notification['error']({
      //   key: fetchNftIsPublicNofiticationKey,
      //   message: 'Error',
      //   description: error,
      // });
    }
  };

  const handleApprove = async () => {
    try {
      setIsApprovalLoading(true);
      const tokenAmount = count * nftData.price;
      const approvalResult = await approveTokens(tokenAmount, signer);

      if (approvalResult) {
        setIsApprovalLoading(false);
        getAllowance();
      } else {
        setIsApprovalLoading(false);
      }
    } catch (error) {
      setIsApprovalLoading(false);
      console.log(error);
      notification['error']({
        key: 'approve',
        message: 'Oops!',
        description: error,
      });
    }
  };

  const handleMint = async () => {
    try {
      setIsMinting(true);
      let referralAddress = '0x0000000000000000000000000000000000000000';
      if (ref) {
        referralAddress = ref.toString();
        if (ref.toString().toLowerCase() === address.toString().toLowerCase()) {
          setIsMinting(false);
          return notification['error']({
            key: 'nft_mint',
            message: 'Error!',
            description: 'Referral Address and Wallet Address cannot be same!',
          });
        }
      }

      const mintResult = await mintNft(
        tierData.tierId,
        referralAddress,
        signer
      );

      if (mintResult) {
        setIsMinting(false);
        fetchTierData();
        getAllowance();
        notification['success']({
          key: 'nft_mint',
          message: 'Success!',
          description: 'NFT minted successfully!',
        });
      }
    } catch (error) {
      setIsMinting(false);
      console.log(error);
      notification['error']({
        key: 'nft_mint',
        message: 'Error!',
        description: error,
      });
    }
  };

  return (
    <div className={`${tierData?.type}-nft-card`}>
      <div className="main-div p-3" style={{ margin: '2px' }}>
        <Title level={5}>
          <span className={`${tierData?.type}-text text-uppercase`}>
            {tierData.type}
          </span>
          <span>{` `}NFT</span>
        </Title>

        {getNFT()}

        <div>
          <Title level={5}>
            <span
              className={`${tierData?.type}-text`}
              style={{ cursor: 'pointer' }}
            >
              {isNftDataLoading ? (
                <Spin size="small" />
              ) : (
                <Tooltip title="Available NFTs">{nftData.available}</Tooltip>
              )}
            </span>
            {` `}/{` `}
            {tierData.total}
          </Title>
        </div>

        <div className="mt-4 count-container">
          <div className="d-flex justify-content-between">
            <Button className="count-button" onClick={handleDecrease} disabled>
              -
            </Button>
            <Text className="my-auto">{count}</Text>
            <Button className="count-button" onClick={handleIncrease} disabled>
              +
            </Button>
          </div>
        </div>

        <hr />
        <div className="d-flex justify-content-between">
          <Text type="secondary">Price</Text>
          <Text>
            {isNftDataLoading ? <Spin size="small" /> : nftData.price} BUSD
          </Text>
        </div>

        <hr />
        <div className="d-flex justify-content-between">
          <Text type="secondary">Shared revenue</Text>
          <Text>
            {isNftDataLoading ? <Spin size="small" /> : nftData.sharedRevenue} %
          </Text>
        </div>

        <hr />
        <div className="d-flex justify-content-between">
          <Text type="secondary">APR</Text>
          <Text>
            Up to {isNftDataLoading ? <Spin size="small" /> : nftData.APR} % /
            NFT
          </Text>
        </div>

        <hr />
        <div className="d-flex justify-content-between">
          <Text type="secondary">Equity share</Text>
          <Text>
            {isNftDataLoading ? <Spin size="small" /> : nftData.equityShare} % /
            NFT
          </Text>
        </div>

        <hr />
        <div className="d-flex justify-content-between">
          <Text type="secondary">Total</Text>
          <Text>
            {isNftDataLoading ? <Spin size="small" /> : count * nftData.price}{' '}
            BUSD
          </Text>
        </div>

        <hr />
        <div className="d-flex justify-content-around">
          <Button
            className={`${tierData?.type}-nft-btn ${approveButtonDisabled ? 'text-secondary': 'text-dark'} text-uppercase`}
            loading={
              isPublicLoading ||
              isWhitelistedLoading ||
              isApprovalLoading ||
              isAllowanceLoading
            }
            disabled={approveButtonDisabled}
            onClick={() => handleApprove()}
          >
            Approve BUSD
          </Button>
          <Button
            className={`${tierData?.type}-nft-btn ${mintButtonDisabled ? 'text-secondary' : 'text-dark'} text-secondary text-uppercase`}
            loading={isMinting}
            disabled={mintButtonDisabled}
            onClick={() => handleMint()}
          >
            MINT NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
