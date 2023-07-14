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
  Radio
} from 'antd';
import { useSigner } from 'wagmi';
import { whitelistUsers } from '@/Blockchain/admin.service';

const WhitelistUsers = () => {

  const { Panel } = Collapse;
  const { data: signer } = useSigner();

  const [walletAddress, setWalletAddress] = useState(null);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleQuery = async () => {
    try {
      setLoading(true);
      const result = await whitelistUsers(signer, walletAddress, status);

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
        <Panel header="whitelistUsers">
          <div>
            <span>_wallet (address)</span>
            <Input 
              value={walletAddress}
              placeholder="_wallet (address)"
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </div>

          <div className='mt-3'>
            <span>_status</span>
            <div className='mt-1'>
              <Radio.Group onChange={(e) => setStatus(e.target.value)} value={status}>
                <Radio value={true}>True</Radio>
                <Radio value={false}>False</Radio>
              </Radio.Group>
            </div>
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
  )
}

export default WhitelistUsers