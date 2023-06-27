import { Card, Typography, Select, Slider } from 'antd';
import React, { useState, useEffect } from 'react';

const minRental = 195;
const maxRental = 350;

const minRentalCapacity = 50;
const maxRentalCapacity = 90;

// batu bolong values
const nftRevShare = 0.62;
const goldRevShare = 0.35;
const silverRevShare = 0.275;
const bronzeRevShare = 0.225;
const standardRevShare = 0.15;
const goldNftPrice = 6482;
const silverNftPrice = 4380;
const bronzeNftPrice = 3328;
const standardNftPrice = 2452;
const goldCount = 10;
const silverCount = 20;
const bronzeCount = 30;
const standardCount = 40;
const goldApr = 22;
const silverApr = 13;
const bronzeApr = 10;
const standardApr = 7;

const RentalRevenueCal = () => {
  const { Title, Text } = Typography;
  const [rentalCapacityPerYear, setRentalCapacityPerYear] = useState(70);
  const [dailyRentalPrice, setDailyRentalPrice] = useState(225);
  const [nftType, setNftType] = useState('gold');

  const [yearlyRoi, setYearlyRoi] = useState(17.5);
  const [yearlyIncome, setYearlyIncome] = useState(2688);

  const handleChange = (value) => {
    setNftType(value);
  };

  const onChangeRentalCapacityPerYear = (value) => {
    setRentalCapacityPerYear(value);
  };

  const onChangeDailyRentalRange = (value) => {
    setDailyRentalPrice(value);
  };

  useEffect(() => {
    const numberOfDaysRented = Math.floor((rentalCapacityPerYear * 365) / 100);
    const totalRevenue = dailyRentalPrice * numberOfDaysRented;
    const revenueShare = totalRevenue * nftRevShare;

    let nftRevenueShare = 0;
    let revenuePerNftHolder = 0;
    let aprPercentage = 0;

    switch (nftType) {
      case 'gold':
        nftRevenueShare = revenueShare * goldRevShare;
        revenuePerNftHolder = nftRevenueShare / goldCount;
        aprPercentage = (revenuePerNftHolder / goldNftPrice) * 100;
        break;
      case 'silver':
        nftRevenueShare = revenueShare * silverRevShare;
        revenuePerNftHolder = nftRevenueShare / silverCount;
        aprPercentage = (revenuePerNftHolder / silverNftPrice) * 100;
        break;
      case 'bronze':
        nftRevenueShare = revenueShare * bronzeRevShare;
        revenuePerNftHolder = nftRevenueShare / bronzeCount;
        aprPercentage = (revenuePerNftHolder / bronzeNftPrice) * 100;
        break;
      case 'standard':
        nftRevenueShare = revenueShare * standardRevShare;
        revenuePerNftHolder = nftRevenueShare / standardCount;
        aprPercentage = (revenuePerNftHolder / standardNftPrice) * 100;
        break;
      default:
        break;
    }

    setYearlyIncome(revenuePerNftHolder);
    setYearlyRoi(aprPercentage);
  }, [rentalCapacityPerYear, dailyRentalPrice, nftType]);

  return (
    <Card className="nft-square-card nft-dark-card h-100">
      <Title level={5} className="text-uppercase">
        <span className="text-primary">Rental Revenue</span>
        <span>{` `}Calculator</span>
      </Title>

      <div className="mt-4">
        <Select
          defaultValue="Batu Bolong"
          style={{
            width: '100%',
          }}
          size="large"
          onChange={handleChange}
          options={[
            {
              value: 'Batu Bolong',
              label: <Text>Batu Bolong</Text>,
            },
          ]}
        />
      </div>

      <div className="mt-4">
        <Select
          value={nftType}
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
        <Text type="secondary">Rental capacity per year</Text>

        <div className="d-flex justify-content-between">
          <Text>{minRentalCapacity}%</Text>
          <Text>{maxRentalCapacity}%</Text>
        </div>
        <Slider
          min={minRentalCapacity}
          max={maxRentalCapacity}
          value={rentalCapacityPerYear}
          onChange={onChangeRentalCapacityPerYear}
        />
      </div>

      <div className="mt-4">
        <Text type="secondary">Daily rental price range</Text>
        <div className="d-flex justify-content-between">
          <Text>${minRental}</Text>
          <Text>${maxRental}</Text>
        </div>
        <Slider
          min={minRental}
          max={maxRental}
          value={dailyRentalPrice}
          onChange={onChangeDailyRentalRange}
        />
      </div>

      <div className="mt-4">
        <div className="d-flex justify-content-between">
          <Text className="fw-bold">Yearly Income</Text>
          <Text className="text-primary fw-bold">
            ${yearlyIncome.toFixed(2)}
          </Text>
        </div>
      </div>

      <div className="mt-4">
        <div className="d-flex justify-content-between">
          <Text className="fw-bold">Yearly ROI</Text>
          <Text className="text-primary fw-bold">{yearlyRoi.toFixed(2)}%</Text>
        </div>
      </div>
    </Card>
  );
};

export default RentalRevenueCal;
