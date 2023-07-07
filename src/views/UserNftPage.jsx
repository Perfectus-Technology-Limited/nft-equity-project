import React, { useEffect, useState } from 'react';
import { Card, notification, Alert, Skeleton, Typography } from 'antd';
import { Col, Row } from 'reactstrap';
import { getUserNft } from '@/Blockchain/web3.service';
import { useAccount } from 'wagmi';

const UserNftPage = () => {
  const [userNfts, setUserNfts] = useState([]);
  const [isUserNftsLoading, setIsUserNftsLoading] = useState(false);
  const { address: account } = useAccount();
  const { Title } = Typography;

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

  return (
    <div className="mt-5 mb-5">
      <div className="text-center mb-4">
        <Title level={3}>
          YOUR <span className="text-primary">NFTS</span>
        </Title>
      </div>

      {userNfts.length === 0 && !isUserNftsLoading && (
        <Alert
          message="You don't have NFTs for this wallet!"
          type="info"
          style={{
            background: 'rgba(1, 180, 126, 0.4)',
            border: '1px solid #01b47e',
          }}
        />
      )}

      {isUserNftsLoading && (
        <Row>
          <Col xxl="3" xl="3" lg="3" md="6" sm="12" xs="12" className="mt-3">
            <Card className="nft-square-card nft-dark-card text-center">
              <Skeleton.Image active={isUserNftsLoading} className="w-100" />
            </Card>
          </Col>

          <Col xxl="3" xl="3" lg="3" md="6" sm="12" xs="12" className="mt-3">
            <Card className="nft-square-card nft-dark-card text-center">
              <Skeleton.Image active={isUserNftsLoading} className="w-100" />
            </Card>
          </Col>

          <Col xxl="3" xl="3" lg="3" md="6" sm="12" xs="12" className="mt-3">
            <Card className="nft-square-card nft-dark-card text-center">
              <Skeleton.Image active={isUserNftsLoading} className="w-100" />
            </Card>
          </Col>

          <Col xxl="3" xl="3" lg="3" md="6" sm="12" xs="12" className="mt-3">
            <Card className="nft-square-card nft-dark-card text-center">
              <Skeleton.Image active={isUserNftsLoading} className="w-100" />
            </Card>
          </Col>
        </Row>
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
                <img src={nft} alt="nft" className="w-100" />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default UserNftPage;
