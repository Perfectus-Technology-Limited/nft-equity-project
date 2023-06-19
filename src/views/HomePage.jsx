import React from 'react'
import PropertyDetailsCard from '@/components/PropertyDetailsCard';
import RentalRevenueCal from '@/components/RentalRevenueCal';
import { Col, Row } from 'reactstrap';

const HomePage = () => {

  return (
    <div className='mt-5'>
      <Row>
        <Col xxl="8" xl="8" lg="8" md="8" sm="12" xs="12">
          <PropertyDetailsCard />
        </Col>

        <Col xxl="4" xl="4" lg="4" md="4" sm="12" xs="12">
          <RentalRevenueCal />
        </Col>
      </Row>
    </div>
  )
}

export default HomePage