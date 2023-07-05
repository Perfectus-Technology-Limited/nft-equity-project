import React from 'react';
import PropertyDetailsCard from '@/components/PropertyDetailsCard';
import RentalRevenueCal from '@/components/RentalRevenueCal';
import NftCard from '@/components/NftCard';
import { Col, Row } from 'reactstrap';
import ReferralLink from '@/components/ReferralLink';
import { motion } from 'framer-motion';
import { container, item } from '@/utils/FramerMotion';

const HomePage = () => {
  const nftData = [
    {
      id: 1,
      tierId: 3,
      type: 'standard',
      total: 40,
    },
    {
      id: 2,
      tierId: 2,
      type: 'bronze',
      total: 30,
    },
    {
      id: 3,
      tierId: 1,
      type: 'silver',
      total: 20,
    },
    {
      id: 4,
      tierId: 0,
      type: 'gold',
      total: 10,
    },
  ];

  return (
    <div className="mt-5 mb-5">
      <motion.div variants={container} initial="hidden" animate="visible">
        <motion.div variants={item}>
          <Row>
            <Col xxl="8" xl="8" lg="8" md="8" sm="12" xs="12" className="mt-3">
              <PropertyDetailsCard />
            </Col>

            <Col xxl="4" xl="4" lg="4" md="4" sm="12" xs="12" className="mt-3">
              <RentalRevenueCal />
            </Col>
          </Row>
        </motion.div>

        <motion.div variants={item}>
          <Row className="mt-5">
            {nftData.map((nft) => (
              <Col
                xxl="3"
                xl="3"
                lg="3"
                md="6"
                sm="12"
                xs="12"
                className="mt-3"
                key={nft.id}
              >
                <NftCard tierData={nft} />
              </Col>
            ))}
          </Row>
        </motion.div>

        <motion.div variants={item}>
          <Row className="mt-5">
            <Col>
              <ReferralLink />
            </Col>
          </Row>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
