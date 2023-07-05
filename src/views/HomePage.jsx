import React, { useState, useEffect } from 'react';
import PropertyDetailsCard from '@/components/PropertyDetailsCard';
import RentalRevenueCal from '@/components/RentalRevenueCal';
import NftCard from '@/components/NftCard';
import { Col, Row } from 'reactstrap';
import ReferralLink from '@/components/ReferralLink';
import { motion } from 'framer-motion';
import { container, item } from '@/utils/FramerMotion';
import { fetchAllowance } from '@/Blockchain/web3.service';
import { useAccount } from 'wagmi';
import { utils } from 'ethers';

const HomePage = () => {
  const { address } = useAccount();

  const [isAllowanceLoading, setIsAllowanceLoading] = useState(false);
  const [allowance, setAllowance] = useState(0);

  useEffect(() => {
    if (address) {
      getAllowance();
    }
  }, [address]);

  const getAllowance = async () => {
    try {
      setIsAllowanceLoading(true);
      const result = await fetchAllowance(address);
      const allowance = result.toString();
      const allowanceFormattedString = utils.formatUnits(allowance, 18);
      const allowanceFormattedNumber = Number(allowanceFormattedString);
      setAllowance(allowanceFormattedNumber);
      setIsAllowanceLoading(false);
    } catch (error) {
      setIsAllowanceLoading(false);
      console.log(error);
    }
  };

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
                <NftCard
                  tierData={nft}
                  getAllowance={getAllowance}
                  isAllowanceLoading={isAllowanceLoading}
                  allowance={allowance}
                />
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
