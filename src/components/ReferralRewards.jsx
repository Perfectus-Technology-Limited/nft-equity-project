import { Card, Typography, Space, Input, Button, Tooltip, Alert, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { CopyFilled, CheckOutlined } from '@ant-design/icons';
import { useAccount } from 'wagmi';
import dynamic from 'next/dynamic';
import { Row, Col } from 'reactstrap';
import axios from 'axios';

const ReferralRewards = () => {
  const { Title, Text } = Typography;
  const [isRefLinkCopied, setIsRefLinkCopied] = useState(false);
  const [refLink, setRefLink] = useState(null);
  const { address:account } = useAccount();

  const [totalRewardsAmount, setTotalRewardsAmount] = useState(0);
  const [totalRewardsAmountLoading, setTotalRewardsAmountLoading] = useState(false);
  const [referralCount, setReferralCount] = useState(0);
  const [referralCountLoading, setReferralCountLoading] = useState(false);


  const handleCopy = () => {
    setIsRefLinkCopied(true);
    navigator.clipboard.writeText(refLink);
    setTimeout(() => {
      setIsRefLinkCopied(false);
    }, 2000);
  };

  useEffect(() => {
    const origin =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : '';
    if (account) {
      setRefLink(origin + '/?ref=' + account);
    } else {
      setRefLink(null);
    }
  }, [account]);

  useEffect(() => {
    if(account) {
      fetchReferralRewards()
      fetchReferralCount()
    }
  }, [account])

  const fetchReferralRewards = async () => {
    try {
      setTotalRewardsAmountLoading(true);
      let config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/referal-income-details/get-total-reward/${account}`,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      };
      const response = await axios(config);
      if (response.status === 200) {
        const payload = response.data.payload;
        if (payload) {
          setTotalRewardsAmount(payload.totalRewardAmount)
          setTotalRewardsAmountLoading(false);
        }
      }
    } catch (error) {
      setTotalRewardsAmountLoading(false);
      console.log(error);
    }
  }

  const fetchReferralCount = async () => {
    try {
      setReferralCountLoading(true);
      let config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/referal-income-details/get-referal-count/${account}`,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      };
      const response = await axios(config);
      if (response.status === 200) {
        const payload = response.data.payload;
        if (payload) {
          setReferralCount(payload.count);
        } else {
          setReferralCount(0);
        }
        setReferralCountLoading(false);
      }
    } catch (error) {
      setReferralCountLoading(false);
      console.log(error)
    }
  }

  return (
    <Card className="nft-square-card nft-dark-card">
      <div className="text-center">
        <Title level={5}>
          <span className="text-primary">REFERRAL</span>
          <span>{` `}REWARDS</span>
        </Title>

        <div className="mt-3">
          <Text type="secondary" className="text-uppercase">
            RECEIVE A 0.5% SHARE FOR 1-5 DIRECT REFERRALS
          </Text><br />
          <Text type="secondary" className="text-uppercase">
          0.75% SHARE FOR 5-10 DIRECT REFERRALS
          </Text><br />
          <Text type="secondary" className="text-uppercase">
          1% SHARE FOR 10+ DIRECT REFERRALS
          </Text><br />
          <Text type="secondary" className="text-uppercase">
          RECEIVE A 0.35% SHARE FOR YOUR LEVEL 2 REFERRALS
          </Text><br />
          <Text type="secondary" className="text-uppercase">
          RECEIVE A 0.25% SHARE FOR YOUR LEVEL 3 REFERRALS
          </Text><br />
        </div>

        <div className="mt-2">
          {account ? (
            <Row>
              <Col xxl="12" xl="12" lg="12" md="12" sm="12" xs="12">
                <Space.Compact
                  style={{
                    width: '100%',
                  }}
                >
                  <Input value={refLink} className="text-center" />

                  {!isRefLinkCopied ? (
                    <Tooltip title="Copy">
                      <Button type="primary" onClick={handleCopy}>
                        <div style={{ marginTop: '0px' }}>
                          <CopyFilled />
                        </div>
                      </Button>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Copied">
                      <Button type="primary">
                        <div style={{ marginTop: '0px' }}>
                          <CheckOutlined />
                        </div>
                      </Button>
                    </Tooltip>
                  )}
                </Space.Compact>
              </Col>

              <Col
                xxl="6"
                xl="6"
                lg="6"
                md="6"
                sm="12"
                xs="12"
                className="mt-3"
              >
                <Card hoverable>
                  <Title level={5} className="m-0">
                    {totalRewardsAmountLoading ? <Spin size="small" /> : <Text>{parseFloat(totalRewardsAmount.toFixed(2))} BUSD</Text>}
                  </Title>
                  <Text type="secondary">
                    Your total rewards from referrals
                  </Text>
                </Card>
              </Col>

              <Col
                xxl="6"
                xl="6"
                lg="6"
                md="6"
                sm="12"
                xs="12"
                className="mt-3"
              >
                <Card hoverable>
                  <Title level={5} className="m-0">
                    { referralCountLoading ? <Spin size='small' /> : referralCount }
                  </Title>
                  <Text type="secondary">Your referrals</Text>
                </Card>
              </Col>
            </Row>
          ) : (
            <Alert
              message={
                <Text className="text-uppercase small" type="warning">
                  Please connect your wallet to generate referral link
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

export default dynamic(() => Promise.resolve(ReferralRewards), { ssr: false });
