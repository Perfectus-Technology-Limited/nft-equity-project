import { Card, Typography, Table, Alert } from 'antd';
import React from 'react';
import dynamic from 'next/dynamic';
import { useAccount } from 'wagmi';

const ReferralsTable = () => {
  const { Title, Text } = Typography;
  const { address } = useAccount();

  const dataSource = [
    {
      id: 1,
      wallet_address: '0xad09c8A0CC1bA773FED5dabb36f32Abe3668BFE8',
      referral_level: 1,
      amount: '$12,840',
      rewards: '0.5%',
    },
    {
      id: 2,
      wallet_address: '0x7caF0403937CCb030d5Fb0E42Ef00f682309e973',
      referral_level: 3,
      amount: '$12,000',
      rewards: '0.25%',
    },
    {
      id: 3,
      wallet_address: '0xad09c8A0CC1bA773FED5dabb36f32Abe3668BFE8',
      referral_level: 2,
      amount: '$10,840',
      rewards: '0.35%',
    },
    {
      id: 4,
      wallet_address: '0xad09c8A0CC1bA773FED5dabb36f32Abe3668BFE8',
      referral_level: 1,
      amount: '$14,640',
      rewards: '0.5%',
    },
  ];

  const columns = [
    {
      title: <div className="text-center text-light">Wallet Address</div>,
      dataIndex: 'wallet_address',
      key: 'id',
      render: (text) => (
        <div className="text-center">
          <Text>{text}</Text>
        </div>
      ),
    },
    {
      title: <div className="text-center text-light">Referral Level</div>,
      dataIndex: 'referral_level',
      key: 'id',
      render: (text) => (
        <div className="text-center">
          <Text>{text}</Text>
        </div>
      ),
    },
    {
      title: <div className="text-center text-light">Amount</div>,
      dataIndex: 'amount',
      key: 'id',
      render: (text) => (
        <div className="text-center">
          <Text>{text}</Text>
        </div>
      ),
    },
    {
      title: <div className="text-center text-light">Rewards</div>,
      dataIndex: 'rewards',
      key: 'id',
      render: (text) => (
        <div className="text-center">
          <Text>{text}</Text>
        </div>
      ),
    },
  ];

  return (
    <Card className="nft-square-card nft-dark-card">
      <div className="text-center">
        <Title level={5}>
          <span className="text-primary">YOUR</span>
          <span>{` `}REFERRALS</span>
        </Title>

        <div className="mt-3">
          {address ? (
            <Table
              dataSource={dataSource}
              columns={columns}
              rowKey="id"
              rowClassName={(record, index) =>
                index % 2 === 1 ? 'table-row-light' : ''
              }
            />
          ) : (
              <Alert
                message={
                  <Text className="text-uppercase small" type="warning">
                    Please connect your wallet to see your referrals
                  </Text>
                }
                type="warning"
                showIcon
              />
          )}
        </div>
      </div>
    </Card>
  );
};

export default dynamic(() => Promise.resolve(ReferralsTable), { ssr: false });
