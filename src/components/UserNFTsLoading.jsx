import React from 'react';
import { Card, Skeleton } from 'antd';
import { Col, Row } from 'reactstrap';

const UserNFTsLoading = ({ isUserNftsLoading }) => {
  return (
    <div>
      <Row>
        <Col xxl="3" xl="3" lg="3" md="6" sm="12" xs="12" className="mt-3">
          <Card className="nft-square-card nft-dark-card text-center">
            <Skeleton.Input
              active={isUserNftsLoading}
              size={'default'}
              block={false}
              className="mb-3"
            />
            <Skeleton.Image active={isUserNftsLoading} className="w-100 mb-3" />
            <Skeleton active={isUserNftsLoading} />
          </Card>
        </Col>

        <Col xxl="3" xl="3" lg="3" md="6" sm="12" xs="12" className="mt-3">
          <Card className="nft-square-card nft-dark-card text-center">
            <Skeleton.Input
              active={isUserNftsLoading}
              size={'default'}
              block={false}
              className="mb-3"
            />
            <Skeleton.Image active={isUserNftsLoading} className="w-100 mb-3" />
            <Skeleton active={isUserNftsLoading} />
          </Card>
        </Col>

        <Col xxl="3" xl="3" lg="3" md="6" sm="12" xs="12" className="mt-3">
          <Card className="nft-square-card nft-dark-card text-center">
            <Skeleton.Input
              active={isUserNftsLoading}
              size={'default'}
              block={false}
              className="mb-3"
            />
            <Skeleton.Image active={isUserNftsLoading} className="w-100 mb-3" />
            <Skeleton active={isUserNftsLoading} />
          </Card>
        </Col>

        <Col xxl="3" xl="3" lg="3" md="6" sm="12" xs="12" className="mt-3">
          <Card className="nft-square-card nft-dark-card text-center">
            <Skeleton.Input
              active={isUserNftsLoading}
              size={'default'}
              block={false}
              className="mb-3"
            />
            <Skeleton.Image active={isUserNftsLoading} className="w-100 mb-3" />
            <Skeleton active={isUserNftsLoading} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserNFTsLoading;
