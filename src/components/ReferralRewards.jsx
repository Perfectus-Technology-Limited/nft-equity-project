import { Card, Typography, Space, Input, Button, Tooltip, Alert } from 'antd';
import React, { useState, useEffect } from 'react';
import { CopyFilled, CheckOutlined } from '@ant-design/icons';
import { useAccount } from 'wagmi';
import dynamic from 'next/dynamic';
import { Row, Col } from 'reactstrap';

const ReferralRewards = () => {
  const { Title, Text } = Typography;
  const [isRefLinkCopied, setIsRefLinkCopied] = useState(false);
  const [refLink, setRefLink] = useState(null);
  const { address } = useAccount();

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
    if (address) {
      setRefLink(origin + '/?ref=' + address);
    } else {
      setRefLink(null);
    }
  }, [address]);

  return (
    <Card className="nft-square-card nft-dark-card">
      <div className="text-center">
        <Title level={5}>
          <span className="text-primary">REFERRAL</span>
          <span>{` `}REWARDS</span>
        </Title>

        <div className="mt-3">
          <Text type="secondary" className="text-uppercase">
            Receive a 10% share when SOMEONE utilize your referral link.
          </Text>
        </div>

        <div className="mt-2">
          {address ? (
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
                  <Title level={5} className="m-0">$560</Title>
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
                <Title level={5} className="m-0">23</Title>
                  <Text type="secondary">
                    Your referrals
                  </Text>
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
