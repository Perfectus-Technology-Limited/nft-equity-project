import React, { useEffect, useState } from 'react';
import { Card, notification, Alert, Skeleton, Typography } from 'antd';
import { Col, Row } from 'reactstrap';
import { getUserNft } from '@/Blockchain/web3.service';
import { useAccount } from 'wagmi';
import UserNFTsLoading from '@/components/UserNFTsLoading';

const UserNftPage = () => {
  const [userNfts, setUserNfts] = useState([]);
  const [isUserNftsLoading, setIsUserNftsLoading] = useState(false);
  const { address: account } = useAccount();
  const { Title, Text } = Typography;

  useEffect(() => {
    if (account) {
      fetchUserNfts();
    }
  }, [account]);

  const fetchUserNfts = async () => {
    try {
      setIsUserNftsLoading(true);
      const result = await getUserNft(account);
      if (result) {
        setUserNfts(result);
      }
      setIsUserNftsLoading(false);
    } catch (error) {
      setIsUserNftsLoading(false);
      notification['error']({
        message: 'Error',
        description: error,
      });
    }
  };

  // this function will return NFT webm for each tier
  const getNFT = (type) => {
    switch (type) {
      case 'gold':
        return (
          <video
            src="/Gold.webm"
            alt="nft-img"
            className={`${type}-nft-bg w-100 mt-3 mb-3`}
            autoPlay
            playsInline
            muted
            loop
          />
        );
      case 'silver':
        return (
          <video
            src="/Silver.webm"
            alt="nft-img"
            className={`${type}-nft-bg w-100 mt-3 mb-3`}
            autoPlay
            playsInline
            muted
            loop
          />
        );
      case 'bronze':
        return (
          <video
            src="/Bronze.webm"
            alt="nft-img"
            className={`${type}-nft-bg w-100 mt-3 mb-3`}
            autoPlay
            playsInline
            muted
            loop
          />
        );
      case 'standard':
        return (
          <video
            src="/Standard.webm"
            alt="nft-img"
            className={`${type}-nft-bg w-100 mt-3 mb-3`}
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

  const getAPR = (type) => {
    switch (type) {
      case 'gold':
        return '23%';
      case 'silver':
        return '13%';
      case 'bronze':
        return '10%';
      default:
        return '6%';
    }
  };

  return (
    <div className="mt-5 mb-5">
      <div className="text-center mb-4">
        <Title level={3}>
          YOUR <span className="text-primary">NFTS</span>
        </Title>
      </div>

      {userNfts.length === 0 && !isUserNftsLoading && account && (
        <Alert
          message="You don't have NFTs for this wallet!"
          type="info"
          style={{
            background: 'rgba(1, 180, 126, 0.4)',
            border: '1px solid #01b47e',
          }}
        />
      )}

      {userNfts.length === 0 && !isUserNftsLoading && !account && (
        <Alert
          message="Please connect your wallet to see your NFTs!"
          type="info"
          style={{
            background: 'rgba(1, 180, 126, 0.4)',
            border: '1px solid #01b47e',
          }}
        />
      )}

      {isUserNftsLoading && (
        <UserNFTsLoading isUserNftsLoading={isUserNftsLoading} />
      )}

      {userNfts.length !== 0 && !isUserNftsLoading && (
        <Row>
          {userNfts.map((nft, index) => (
            <Col
              xxl="3"
              xl="3"
              lg="3"
              md="6"
              sm="12"
              xs="12"
              key={index}
              className="mt-3"
            >
              <Card className="nft-square-card nft-dark-card">
                <div className="text-center">
                  <Title level={5}>
                    <span className={`${nft?.type}-text text-uppercase`}>
                      {nft.type}
                    </span>
                    <span>{` `}NFT</span>
                  </Title>
                </div>

                {/* <img
                  src={nft.uri}
                  alt="nft"
                  className={`${nft?.type}-nft-bg w-100 p-4`}
                /> */}
                {getNFT(nft?.type)}

                <hr className="mt-1" />
                <div className="d-flex justify-content-between">
                  <Text type="secondary">NFT ID</Text>
                  <Text>{nft.nftId}</Text>
                </div>
                <hr className="mt-1" />
                <div className="d-flex justify-content-between">
                  <Text type="secondary">Price</Text>
                  <Text>{nft.price} BUSD</Text>
                </div>
                <hr className="mt-1" />
                <div className="d-flex justify-content-between">
                  <Text type="secondary">Shared revenue</Text>
                  <Text>{nft.sharedRevenue} %</Text>
                </div>
                <hr className="mt-1" />
                {/* <div className="d-flex justify-content-between">
                  <Text type="secondary">APR</Text>
                  <Text>Up to {nft.apr} % / NFT</Text>
                </div> */}
                <div className="d-flex justify-content-between">
                  <Text type="secondary">APR</Text>
                  <Text>Up to {getAPR(nft?.type)} / NFT</Text>
                </div>
                <hr className="mt-1" />
                <div className="d-flex justify-content-between">
                  <Text type="secondary">Equity share</Text>
                  <Text>{nft.equityShare} % / NFT</Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default UserNftPage;
