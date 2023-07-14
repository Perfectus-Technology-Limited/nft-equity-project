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
} from 'antd';
import { changeFeePercentages } from '@/Blockchain/admin.service';
import { useSigner } from 'wagmi';

const ChangeFeePercentages = () => {
  const { Panel } = Collapse;
  const { data: signer } = useSigner();

  const [devFee, setDevFee] = useState(null);
  const [expencesFee, setExpencesFee] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuery = async () => {
    try {
      setLoading(true);
      const result = await changeFeePercentages(signer, devFee, expencesFee);

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
        <Panel header="changeFeePercentages">
          <span>_devFee</span>
          <Input
            value={devFee}
            placeholder="_devFee"
            onChange={(e) => setDevFee(e.target.value)}
            suffix="%"
            type="number"
            onWheel={(e) => e.target.blur()}
          />
          <div className="mt-3">
            <span>_expencesFee</span>
            <Input
              value={expencesFee}
              placeholder="_expencesFee"
              onChange={(e) => setExpencesFee(e.target.value)}
              suffix="%"
              type="number"
              onWheel={(e) => e.target.blur()}
            />
          </div>
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

export default ChangeFeePercentages;
