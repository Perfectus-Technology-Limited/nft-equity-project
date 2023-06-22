import React, { useState, useEffect } from 'react';
import { Button, Card, Typography } from 'antd';
import { Row, Col } from 'reactstrap';
import BatuBolongBanner from '../assets/BatuBolongVilla/batu-bolong-banner.jpg';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/viewFullPropertySlice';
import ViewFullProperty from './ViewFullProperty';
import ImageLoader from '@/utils/ImageLoader';

const PropertyDetailsCard = () => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const [importedImages, setImportedImages] = useState([]);

  useEffect(() => {
    const importImages = async () => {
      const importedImages = await ImageLoader();

      setImportedImages(importedImages);
    };

    importImages();
  }, []);

  return (
    <>
      <Card className="nft-square-card nft-dark-card h-100">
        <Row>
          <Col>
            {(importedImages.length === 1 || importedImages.length === 2) && (
              <Row>
                <div className="image-container">
                  <Image
                    src={importedImages[0]}
                    className="property-image"
                    alt="property-image"
                  />
                </div>
                <div className="overlay">
                  <p className="text-uppercase small">
                    + {importedImages.length - 1} images
                  </p>
                </div>
              </Row>
            )}

            {importedImages.length >= 3 && (
              <Row>
                <Col xxl="12" xl="12" lg="12" md="12" sm="12" xs="12">
                  <Image
                    src={importedImages[0]}
                    className="property-image"
                    alt="property-image"
                  />
                </Col>
                <Col className="mt-1" style={{ marginRight: '-20px' }}>
                  <Image
                    src={importedImages[1]}
                    className="property-image"
                    alt="property-image"
                  />
                </Col>
                <Col
                  className="mt-1"
                  onClick={() => dispatch(openModal())}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="image-container">
                    <Image
                      src={importedImages[2]}
                      className="property-image"
                      alt="property-image"
                    />
                    <div className="overlay">
                      <p className="text-uppercase small">
                        + {importedImages.length - 3} images
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            )}
          </Col>

          <Col xxl="7" className="mt-sm-4 mt-lg-0">
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
        </Row>

        <Row className="mt-4 options-section">
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Text className="text-primary">&#x2022; Ventilation</Text>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Text className="text-primary">
              &#x2022; Premium Quality Materials
            </Text>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Text className="text-primary">
              &#x2022; 2 minute walk to Berawa Beach
            </Text>
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
