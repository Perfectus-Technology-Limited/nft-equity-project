import React from 'react';
import { Card, Typography } from 'antd';
import { Row, Col } from 'reactstrap';

const PropertyDetailsCard = () => {
  const { Title, Text } = Typography;

  return (
    <Card className="nft-square-card">
      <Row>
        <Col xxl="7">
          <Title level={5}>
            <span className="text-primary">BERAWA PROPERTY</span>
            <span>{` `}DETAILS</span>
          </Title>

          <div className="mt-3">
            <Text type="secondary" className="property-description">
              In the heart of the bustling and exploding Canggu of Bali,
              Indonesia. Property prices are set to explode over the next decade
              so why not take advantage today and own a piece of the island of
              paradise and earn some passive income along the way.
            </Text>
          </div>

          <Row className="mt-4">
            <Text className="options-section">&#x2022; 3 Bedroom Villa</Text>
            <Text className="options-section">&#x2022; 220m2 Villa</Text>
            <Text className="options-section">&#x2022; 190m2 Plot</Text>
            <Text className="options-section">&#x2022; Leasehold</Text>
          </Row>
        </Col>

        <Col>
          <img
            src="https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?cs=srgb&dl=pexels-pixabay-280222.jpg&fm=jpg"
            className="property-image"
            alt="property"
          />
          <div className="text-center view-full-property-bg">
            <Text className="small text-light">VIEW FULL PROPERTY</Text>
          </div>
        </Col>
      </Row>

      <Row className="mt-4 col-10 options-section">
        <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
          <Text className="text-primary">&#x2022; 3 Parking/Garage</Text>
        </Col>
        <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
          <Text className="text-primary">&#x2022; Porter/Security</Text>
        </Col>
        <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
          <Text className="text-primary">&#x2022; Air Conditioning</Text>
        </Col>

        <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
          <Text className="text-primary">&#x2022; Washer</Text>
        </Col>
        <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
          <Text className="text-primary">&#x2022; Television</Text>
        </Col>
        <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
          <Text className="text-primary">&#x2022; Balcony/Terrace</Text>
        </Col>

        <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
          <Text className="text-primary">&#x2022; Onsite Maintenance</Text>
        </Col>
        <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
          <Text className="text-primary">&#x2022; Barbeque</Text>
        </Col>
        <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
          <Text className="text-primary">&#x2022; Ventilation</Text>
        </Col>

        <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
          <Text className="text-primary">&#x2022; Outdoor Shower</Text>
        </Col>
        <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
          <Text className="text-primary">&#x2022; Garden</Text>
        </Col>
        <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
          <Text className="text-primary">&#x2022; Rural/Secluded</Text>
        </Col>

        <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
          <Text className="text-primary">&#x2022; Microwave</Text>
        </Col>
        <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
          <Text className="text-primary">&#x2022; Intercom</Text>
        </Col>
        <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
          <Text className="text-primary">&#x2022; Parking</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default PropertyDetailsCard;
