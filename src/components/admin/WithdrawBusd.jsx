import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Collapse,
  Button,
  Input,
  Spin,
  notification,
  Select,
  Radio,
} from 'antd';
import { useSigner } from 'wagmi';
import { withdrawBusd } from '@/Blockchain/admin.service';

const WithdrawBusd = () => {
  const { Panel } = Collapse;
  const { data: signer } = useSigner();

  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuery = async () => {
    try {
      setLoading(true);
      const result = await withdrawBusd(signer, amount);
      if (result) {
        notification['success']({
          key: 'admin',
          message: 'Success!',
          description: 'Executed successfully!',
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      notification['error']({
        key: 'admin',
        message: 'Error!',
        description: error,
      });
    }
  };

  return (
    <Card className="nft-square-card nft-dark-card mt-3">
      <Collapse>
        <Panel header="withdrawBusd">
          <span>_amount</span>
          <Input
            value={amount}
            placeholder="_amount"
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            suffix="BUSD"
            onWheel={(e) => e.target.blur()}
          />

          <Button
            size="small"
            type="primary"
            loading={loading}
            style={{ padding: '0px 20px' }}
            onClick={() => handleQuery()}
            className="mt-3"
          >
            Write
          </Button>
        </Panel>
      </Collapse>
    </Card>
  );
};

export default WithdrawBusd;
