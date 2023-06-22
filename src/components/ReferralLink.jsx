import { Card, Typography, Space, Input, Button, Tooltip, Alert } from 'antd';
import React, { useState, useEffect } from 'react';
import { CopyFilled, CheckOutlined } from '@ant-design/icons';
import { useAccount } from 'wagmi';
import dynamic from 'next/dynamic';

const ReferralLink = () => {
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
    if (address) {
      setRefLink(process.env.NEXT_PUBLIC_REFERRAL_LINK_BASE_URL + address);
    } else {
      setRefLink(null);
    }
  }, [address]);

  return (
    <Card className="nft-square-card nft-dark-card">
      <div className="text-center">
        <Title level={5}>
          <span className="text-primary">REFERRAL</span>
          <span>{` `}LINK</span>
        </Title>

        <div className="mt-3">
          <Text type="secondary" className="text-uppercase">
            Receive a 10% share when SOMEONE utilize your referral link.
          </Text>
        </div>

        <div className="col-lg-10 mx-auto mt-2">
          {address ? (
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
          ) : (
            <Alert
              message={
                <Text className='text-uppercase small' type="warning">Please connect your wallet to generate referral link</Text>
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

export default dynamic(() => Promise.resolve(ReferralLink), { ssr: false });
