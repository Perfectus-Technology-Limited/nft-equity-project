import React, { useState, useEffect } from 'react';
import { Card, Typography, notification, Spin } from 'antd';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/viewFullPropertySlice';
import ViewFullProperty from './ViewFullProperty';
import ImageLoader from '@/utils/ImageLoader';
import { Row, Col } from 'reactstrap';
import {
  MdOutlineAir,
  MdWorkspacePremium,
  MdBalcony,
  MdOutlineSecurity,
  MdOutlineMicrowave,
} from 'react-icons/md';
import { BiRestaurant } from 'react-icons/bi';
import {
  FaUmbrellaBeach,
  FaConciergeBell,
  FaSwimmingPool,
} from 'react-icons/fa';
import { PiTelevisionSimpleLight } from 'react-icons/pi';
import { TbGardenCart, TbAirConditioning } from 'react-icons/tb';
import { GiHomeGarage, GiGate } from 'react-icons/gi';
import { BsBuildingGear } from 'react-icons/bs';
import { getPropertyPrice } from '@/Blockchain/web3.service';

const PropertyDetailsCard = () => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const [importedImages, setImportedImages] = useState([]);
  const [propertyPriceLoading, setPropertyPriceLoading] = useState(false);
  const [propertyPrice, setPropertyPrice] = useState('N/A');

  useEffect(() => {
    const importImages = async () => {
      const importedImages = await ImageLoader();

      setImportedImages(importedImages);
    };

    importImages();
  }, []);

  useEffect(() => {
    fetchPropertyPrice()
  }, [])

  const fetchPropertyPrice = async () => {
    try {
      setPropertyPriceLoading(true);
      const price = await getPropertyPrice();
      setPropertyPrice(Number(price));
      setPropertyPriceLoading(false);
    } catch (error) {
      setPropertyPriceLoading(true);
      setPropertyPrice('N/A');
      notification['error']({
        key: 'property_price',
        message: 'Oops!',
        description: error,
      });
    }
  }

  return (
    <>
      <Card className="nft-square-card nft-dark-card h-100">
        <Row>
          <Col
            onClick={() => dispatch(openModal())}
            style={{ cursor: 'pointer' }}
          >
            {(importedImages.length === 1 || importedImages.length === 2) && (
              <Row>
                <div className="image-container">
                  <Image
                    src={importedImages[0]}
                    className="property-image"
                    alt="property-image"
                  />
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

            <Row>
              <Col xxl="6" xl="6" lg="6" md="6" sm="6" xs="6" className="mt-4">
                <Text className="fw-lighter">Price</Text>
                <Title level={5} className="m-0 fw-lighter" type="secondary">
                  $ { propertyPriceLoading ? <Spin size="small" /> : propertyPrice}
                </Title>
              </Col>
              <Col xxl="6" xl="6" lg="6" md="6" sm="6" xs="6" className="mt-4">
                <Text className="fw-lighter">Land Size</Text>
                <Title level={5} className="m-0 fw-lighter" type="secondary">
                  106 sq.m.
                </Title>
              </Col>
              <Col xxl="6" xl="6" lg="6" md="6" sm="6" xs="6" className="mt-4">
                <Text className="fw-lighter">Build</Text>
                <Title level={5} className="m-0 fw-lighter" type="secondary">
                  Two Floors
                </Title>
              </Col>
              <Col xxl="6" xl="6" lg="6" md="6" sm="6" xs="6" className="mt-4">
                <Text className="fw-lighter">Build Size</Text>
                <Title level={5} className="m-0 fw-lighter" type="secondary">
                  127 sq.m.
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="mt-4 options-section">
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Title level={4} className="text-primary fw-lighter">
              <MdOutlineAir /> <Text type="secondary">Ventilation</Text>
            </Title>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Title level={4} className="text-primary fw-lighter">
              <MdWorkspacePremium />{' '}
              <Text type="secondary">Premium Quality Materials</Text>
            </Title>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Title level={4} className="text-primary fw-lighter">
              <FaUmbrellaBeach />{' '}
              <Text type="secondary">2 minute walk to Berawa Beach</Text>
            </Title>
          </Col>

          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Title level={4} className="text-primary fw-lighter">
              <BiRestaurant />{' '}
              <Text type="secondary">Close top Restaurants</Text>
            </Title>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Title level={4} className="text-primary fw-lighter">
              <FaConciergeBell /> <Text type="secondary">Guest Concierge</Text>
            </Title>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Title level={4} className="text-primary fw-lighter">
              <PiTelevisionSimpleLight />{' '}
              <Text type="secondary">Television</Text>
            </Title>
          </Col>

          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Title level={4} className="text-primary fw-lighter">
              <TbGardenCart /> <Text type="secondary">Garden</Text>
            </Title>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Title level={4} className="text-primary fw-lighter">
              <GiHomeGarage /> <Text type="secondary">Parking/Garage</Text>
            </Title>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Title level={4} className="text-primary fw-lighter">
              <MdBalcony /> <Text type="secondary">Balcony / Terrace</Text>
            </Title>
          </Col>

          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Title level={4} className="text-primary fw-lighter">
              <GiGate /> <Text type="secondary">Gated Community</Text>
            </Title>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Title level={4} className="text-primary fw-lighter">
              <MdOutlineSecurity /> <Text type="secondary">Security</Text>
            </Title>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Title level={4} className="text-primary fw-lighter">
              <BsBuildingGear />{' '}
              <Text type="secondary">Onsite Maintenance</Text>
            </Title>
          </Col>

          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Title level={4} className="text-primary fw-lighter">
              <MdOutlineMicrowave />{' '}
              <Text type="secondary">Microwave / Oven</Text>
            </Title>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Title level={4} className="text-primary fw-lighter">
              <TbAirConditioning />{' '}
              <Text type="secondary">Air Conditioning</Text>
            </Title>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="6" sm="6" xs="12">
            <Title level={4} className="text-primary fw-lighter">
              <FaSwimmingPool /> <Text type="secondary">Private Pool</Text>
            </Title>
          </Col>
        </Row>
      </Card>
      <ViewFullProperty />
    </>
  );
};

export default PropertyDetailsCard;
