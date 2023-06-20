import React from 'react';
import { Card, Typography } from 'antd';
import { Row, Col } from 'reactstrap';
import BatuBolongBanner from '../assets/BatuBolongVilla/batu-bolong-banner.jpg';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/viewFullPropertySlice';
import ViewFullProperty from './ViewFullProperty';

const PropertyDetailsCard = () => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();

  return (
    <>
      <Card className="nft-square-card nft-dark-card h-100">
        <Row>
          <Col xxl="7">
            <Title level={5}>
              <span className="text-primary">BATU BOLONG 2 BED TOWNHOUSE</span>
              <span>{` `}DETAILS</span>
            </Title>

            <div className="mt-3">
              <Text type="secondary" className="property-description">
                This fully furnished two bedroom two level townhouse with your
                own private pool is nestled in the beautiful and popular area of
                Canggu. This is a prime opportunity to own your own piece of
                paradise on the island of the gods in Bali.
              </Text>
            </div>

            <Row className="mt-4">
              <Text className="options-section">&#x2022; Rent Ready</Text>
              <Text className="options-section">&#x2022; 127SqMt</Text>
              <Text className="options-section">&#x2022; Lease Hold</Text>
              <Text className="options-section">&#x2022; 2 Bedrooms</Text>
              <Text className="options-section">&#x2022; 2 Bathrooms</Text>
              <Text className="options-section">&#x2022; Private Pool</Text>
            </Row>
          </Col>

          <Col>
            <Image
              src={BatuBolongBanner}
              className="property-image"
              alt="property"
            />
            <div
              className="text-center view-full-property-bg"
              onClick={() => dispatch(openModal())}
            >
              <Text className="small text-light">VIEW FULL PROPERTY</Text>
            </div>
          </Col>
        </Row>

        <Row className="mt-4 options-section">
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Text className="text-primary">&#x2022; Ventilation</Text>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Text className="text-primary">&#x2022; Premium Quality Materials</Text>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Text className="text-primary">&#x2022; 2 minute walk to Berawa Beach</Text>
          </Col>

          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Text className="text-primary">&#x2022; Close top Restaurants</Text>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Text className="text-primary">&#x2022; Guest Concierge</Text>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Text className="text-primary">&#x2022; Television</Text>
          </Col>

          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Text className="text-primary">&#x2022; Garden</Text>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Text className="text-primary">&#x2022; Parking/Garage</Text>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Text className="text-primary">&#x2022; Balcony / Terrace</Text>
          </Col>

          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Text className="text-primary">&#x2022; Gated Community</Text>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Text className="text-primary">&#x2022; Security</Text>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Text className="text-primary">&#x2022; Onsite Maintenance</Text>
          </Col>

          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Text className="text-primary">&#x2022; Microwave / Oven</Text>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Text className="text-primary">&#x2022; Air Conditioning</Text>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Text className="text-primary">&#x2022; Private Pool</Text>
          </Col>
        </Row>
      </Card>
      <ViewFullProperty />
    </>
  );
};

export default PropertyDetailsCard;
