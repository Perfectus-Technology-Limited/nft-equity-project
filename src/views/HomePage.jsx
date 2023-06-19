import React from 'react';
import PropertyDetailsCard from '@/components/PropertyDetailsCard';
import RentalRevenueCal from '@/components/RentalRevenueCal';
import NftCard from '@/components/NftCard';
import { Col, Row } from 'reactstrap';

const HomePage = () => {
  const sampleNftData = [
    {
      id: 1,
      type: 'standard',
      name: 'Standard',
      image: 'https://i.ibb.co/f03wyMp/NFT-Equity-Group-standard-1.png',
      limit: 40,
      total: 12,
      price: 4700,
      sharedRevenue: '15%',
      APR: '≤ 8%',
      equityShare: '0.85%/NFT'
    },
    {
      id: 2,
      type: 'bronze',
      name: 'Bronze',
      image: 'https://i.ibb.co/QFtGnMq/NFT-Equity-Group-bronze-1.png',
      limit: 30,
      total: 8,
      price: 6500,
      sharedRevenue: '22.5%',
      APR: '≤ 10%',
      equityShare: '0.85%/NFT'
    },
    {
      id: 3,
      type: 'silver',
      name: 'Silver',
      image: 'https://i.ibb.co/p1S6q5f/NFT-Equity-Group-silver-1.png',
      limit: 20,
      total: 5,
      price: 8400,
      sharedRevenue: '27.5%',
      APR: '≤ 12%',
      equityShare: '1.16%/NFT'
    },
    {
      id: 4,
      type: 'gold',
      name: 'Gold',
      image: 'https://i.ibb.co/cbh7zpV/NFT-Equity-Group-gold-1.png',
      limit: 10,
      total: 3,
      price: 12500,
      sharedRevenue: '35%',
      APR: '≤ 15%',
      equityShare: '2%/NFT'
    },
  ];

  return (
    <div className="mt-5 mb-5">
      <Row>
        <Col xxl="8" xl="8" lg="8" md="8" sm="12" xs="12" className='mt-3'>
          <PropertyDetailsCard />
        </Col>

        <Col xxl="4" xl="4" lg="4" md="4" sm="12" xs="12" className='mt-3'>
          <RentalRevenueCal />
        </Col>
      </Row>

      <Row className="mt-5">
        {sampleNftData.map((nft) => (
          <Col xxl="3" xl="3" lg="3" md="6" sm="12" xs="12" className='mt-3' key={nft.id}>
            <NftCard nftData={nft} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
