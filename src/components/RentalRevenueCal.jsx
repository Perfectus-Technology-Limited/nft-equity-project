import { Card, Typography, Select, Slider } from 'antd';
import React, { useState } from 'react';

const min = 0;
const max = 850;

const RentalRevenueCal = () => {
  const { Title, Text } = Typography;
  const [rentalCapacityPerYear, setRentalCapacityPerYear] = useState(50);
  const [dailyRentalPriceRangeLower, setDailyRentalPriceRangeLower] =
    useState(0);
  const [dailyRentalPriceRangeUpper, setDailyRentalPriceRangeUpper] =
    useState(400);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onChangeRentalCapacityPerYear = (value) => {
    setRentalCapacityPerYear(value);
  };

  const onChangeDailyRentalRange = (value) => {
    setDailyRentalPriceRangeLower(value[0]);
    setDailyRentalPriceRangeUpper(value[1]);
  };

  return (
    <Card className="nft-square-card nft-dark-card h-100">
      <Title level={5} className="text-uppercase">
        <span className="text-primary">Rental Revenue</span>
        <span>{` `}Calculator</span>
      </Title>

      <div className="mt-4">
        <Select
          defaultValue="Tampah Hills"
          style={{
            width: '100%',
          }}
          size="large"
          onChange={handleChange}
          options={[
            {
              value: 'Tampah Hills',
              label: <Text>Tampah Hills</Text>,
            },
          ]}
        />
      </div>

      <div className="mt-4">
        <Select
          defaultValue="gold"
          style={{
            width: '100%',
          }}
          size="large"
          onChange={handleChange}
          options={[
            {
              value: 'gold',
              label: (
                <Text>
                  <span className="gold-text">GOLD</span>
                  <span>{` `}NFT</span>
                </Text>
              ),
            },
            {
              value: 'silver',
              label: (
                <Text>
                  <span className="silver-text">SILVER</span>
                  <span>{` `}NFT</span>
                </Text>
              ),
            },
            {
              value: 'bronze',
              label: (
                <Text>
                  <span className="bronze-text">BRONZE</span>
                  <span>{` `}NFT</span>
                </Text>
              ),
            },
            {
              value: 'standard',
              label: (
                <Text>
                  <span className="standard-text">STANDARD</span>
                  <span>{` `}NFT</span>
                </Text>
              ),
            },
          ]}
        />
      </div>

      <div className="mt-4">
        <div className="d-flex justify-content-between">
          <Text type="secondary">Rental capacity per year</Text>
          <Text>{rentalCapacityPerYear}%</Text>
        </div>
        <Slider
          value={rentalCapacityPerYear}
          onChange={onChangeRentalCapacityPerYear}
        />
      </div>

      <div className="mt-4">
        <Text type="secondary">Daily rental price range</Text>
        <div className="d-flex justify-content-between">
          <Text>${min}</Text>
          <Text>${max}</Text>
        </div>
        <Slider
          range
          min={min}
          max={max}
          value={[dailyRentalPriceRangeLower, dailyRentalPriceRangeUpper]}
          onChange={onChangeDailyRentalRange}
        />
      </div>

      <div className='mt-4'>
        <div className='d-flex justify-content-between'>
          <Text className='fw-bold'>Yearly ROI</Text>
          <Text className='text-primary fw-bold'>17.5%</Text>
        </div>
      </div>

      <div className='mt-4'>
        <div className='d-flex justify-content-between'>
          <Text className='fw-bold'>Yearly Income</Text>
          <Text className='text-primary fw-bold'>$2,688</Text>
        </div>
      </div>
    </Card>
  );
};

export default RentalRevenueCal;
