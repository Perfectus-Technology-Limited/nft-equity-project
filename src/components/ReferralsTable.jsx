import { Card, Typography, Table, Alert, Pagination } from 'antd';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAccount } from 'wagmi';
import axios from 'axios';

const ReferralsTable = () => {
  const { Title, Text } = Typography;
  const { address } = useAccount();
  const [referralData, setReferralData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalReferralData, setTotalReferralData] = useState(0);

  useEffect(() => {
    if (address) {
      fetchReferralData();
    }
  }, [address, currentPage, pageLimit]);

  const fetchReferralData = async () => {
    try {
      setLoading(true);
      let config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/referal-income-details/get-by-user/${address}?page=${currentPage}&limit=${pageLimit}`,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      };
      const response = await axios(config);
      console.log('response: ', response);
      if (response.status === 200) {
        const payload = response.data.payload;
        if (payload) {
          const total = payload.meta.totalItems;
          setTotalReferralData(total);
          setReferralData(payload.items);
        } else {
          setPoolDataList([]);
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const columns = [
    {
      title: <div className="text-center text-light">Wallet Address</div>,
      dataIndex: 'fromAddress',
      key: 'id',
      render: (text) => (
        <div className="text-center text-nowrap">
          <Text>{text}</Text>
        </div>
      ),
    },
    {
      title: <div className="text-center text-light">Referral Level</div>,
      dataIndex: 'level',
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
        <div className="text-center text-nowrap">
          <Text>{text} BUSD</Text>
        </div>
      ),
    },
    // {
    //   title: <div className="text-center text-light">Rewards</div>,
    //   dataIndex: 'rewards',
    //   key: 'id',
    //   render: (text) => (
    //     <div className="text-center">
    //       <Text>{text}</Text>
    //     </div>
    //   ),
    // },
  ];

  const onChange = (page, pageSize) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
    if (pageSize) {
      setPageLimit(pageSize);
    }
  };

  return (
    <Card className="nft-square-card nft-dark-card">
      <div className="text-center">
        <Title level={5}>
          <span className="text-primary">YOUR</span>
          <span>{` `}REFERRALS</span>
        </Title>

        <div className="mt-3">
          {address ? (
            <>
              <Table
                dataSource={referralData}
                columns={columns}
                rowKey="id"
                rowClassName={(record, index) =>
                  index % 2 === 1 ? 'table-row-light' : ''
                }
                loading={loading}
                pagination={false}
                className="table-responsive"
              />

              <div className="d-flex justify-content-center mt-3">
                <Pagination
                  total={totalReferralData}
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${totalReferralData} items`
                  }
                  defaultPageSize={pageLimit}
                  pageSizeOptions={['10', '20', '30', '50', '100']}
                  current={currentPage}
                  onChange={onChange}
                />
              </div>
            </>
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
