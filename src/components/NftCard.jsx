import { Button, Spin, Tooltip, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { getTierData, getTokenDecimals } from '@/Blockchain/web3.service';
import { utils } from 'ethers';

const nftProperties = {
  price: 0,
  available: 0,
  sharedRevenue: 0,
  APR: 0,
  equityShare: 0,
};

const NftCard = ({ tierData }) => {
  const { Title, Text } = Typography;
  const [count, setCount] = useState(1);
  const [nftData, setNftData] = useState(nftProperties);
  const [isNftDataLoading, setIsNftDataLoading] = useState(false);

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
  }, [tierData]);

  // this function will fetch NFT details for every tier
  const fetchTierData = async () => {
    try {
      setIsNftDataLoading(true);
      const result = await getTierData(tierData.tierId); // to fetch NFT tier data
      const tokenDecimals = await getTokenDecimals(); // BUSD token decimals

      const price = result.price.toString();
      const priceFormattedString = utils.formatUnits(price, tokenDecimals);
      const priceFormattedNumber = Number(priceFormattedString); // NFT price as a number

      const sharedRevenue = result.revenueShare.toString();
      const sharedRevenueString = utils.formatUnits(sharedRevenue, 2);
      const sharedRevenueNumber = Number(sharedRevenueString); // shared revenue percentage

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
        APR: 0,
        equityShare: equityShareNumber,
      };

      setNftData(nftPropertiesObject);
      setIsNftDataLoading(false);
    } catch (error) {
      setIsNftDataLoading(false);
      console.log(error);
    }
  };

  const getNFT = () => {
    switch (tierData.tierId) {
      case 0:
        return (
          <video
            src="/Gold.webm"
            alt="nft-img"
            className={`${tierData?.type}-nft-bg col-11 mt-4 mb-4`}
            autoPlay
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
            muted
            loop
          />
        );
      default:
        break;
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
            <Button className="count-button" onClick={handleDecrease}>
              -
            </Button>
            <Text className="my-auto">{count}</Text>
            <Button className="count-button" onClick={handleIncrease}>
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
            ≤ {isNftDataLoading ? <Spin size="small" /> : nftData.APR} %
          </Text>
        </div>

        <hr />
        <div className="d-flex justify-content-between">
          <Text type="secondary">Equity share</Text>
          <Text>
            {isNftDataLoading ? <Spin size="small" /> : nftData.equityShare} % / NFT
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
            type="ghost"
            className={`${tierData?.type}-nft-btn text-dark text-uppercase`}
          >
            Approve BUSD
          </Button>
          <Button disabled>MINT NOW</Button>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
