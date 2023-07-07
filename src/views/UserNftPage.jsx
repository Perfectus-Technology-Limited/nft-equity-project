import { Card } from 'antd';
import React from 'react';
import { Col, Row } from 'reactstrap';

const UserNftPage = () => {
  return (
    <div className="mt-5 mb-5">
      <Row>
        <Col xxl="4" xl="4" lg="4" md="6" sm="12" xs="12">
          <Card className="nft-square-card nft-dark-card"></Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserNftPage;
