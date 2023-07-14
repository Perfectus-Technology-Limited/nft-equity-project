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
import { changePropertyPrice } from '@/Blockchain/admin.service';

const ChangePropertyPrice = () => {
  const { Panel } = Collapse;
  const { data: signer } = useSigner();

  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuery = async () => {
    try {
      setLoading(true);
      const result = await changePropertyPrice(signer, price);
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
  }

  return (
    <Card className="nft-square-card nft-dark-card mt-3">
      <Collapse>
        <Panel header="changePropertyPrice">
          <span>_price</span>
          <Input
            value={price}
            placeholder="_price"
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            suffix="$"
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
  )
}

export default ChangePropertyPrice