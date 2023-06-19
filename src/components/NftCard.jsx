import { Button, Card, Typography } from 'antd';
import React, { useState } from 'react';

const NftCard = ({ nftData }) => {
  const { Title, Text } = Typography;
  const [count, setCount] = useState(1)

  const handleDecrease = () => {
    if(count > 1) {
      setCount((count) => count-1)
    }
  }

  const handleIncrease = () => {
    setCount((count) => count+1)
  }

  return (
    <Card className={`${nftData?.type}-nft-card`}>
      <div className="main-div p-3">
        <Title level={5}>
          <span className={`${nftData?.type}-text text-uppercase`}>
            {nftData.name}
          </span>
          <span>{` `}NFT</span>
        </Title>

        <img
          src={nftData?.image}
          alt="nft-img"
          className={`${nftData?.type}-nft-bg col-11 mt-4 mb-4`}
        />

        <div>
          <Title level={5}>
            <span className={`${nftData?.type}-text`}>{nftData.total}</span>
            {` `}/{` `}
            {nftData.limit}
          </Title>
        </div>

        <div className='mt-4 count-container'>
          <div className='d-flex justify-content-between'>
            <Button className='count-button' onClick={handleDecrease}>-</Button>
            <Text className="my-auto">{count}</Text>
            <Button className='count-button' onClick={handleIncrease}>+</Button>
          </div>
        </div>

        <hr />
        <div className='d-flex justify-content-between'>
          <Text type="secondary">Price</Text>
          <Text>{nftData.price} BUSD</Text>
        </div>

        <hr />
        <div className='d-flex justify-content-between'>
          <Text type="secondary">Shared revenue</Text>
          <Text>{nftData.sharedRevenue}</Text>
        </div>

        <hr />
        <div className='d-flex justify-content-between'>
          <Text type="secondary">APR</Text>
          <Text>{nftData.APR}</Text>
        </div>

        <hr />
        <div className='d-flex justify-content-between'>
          <Text type="secondary">Equity share</Text>
          <Text>{nftData.equityShare}</Text>
        </div>

        <hr />
        <div className='d-flex justify-content-between'>
          <Text type="secondary">Total</Text>
          <Text>{count * nftData.price} BUSD</Text>
        </div>

        <hr />
        <div className='d-flex justify-content-around'>
          <Button type='ghost' className={`${nftData?.type}-nft-btn text-dark text-uppercase`}>Approve BUSD</Button>
          <Button disabled>MINT NOW</Button>
        </div>
      </div>
    </Card>
  );
};

export default NftCard;
