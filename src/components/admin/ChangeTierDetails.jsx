import React, { useState, useEffect } from 'react';
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
import { getTierData } from '@/Blockchain/web3.service';
import { utils } from 'ethers';
import { changeTierDetails } from '@/Blockchain/admin.service';

const ChangeTierDetails = () => {
  const { Panel } = Collapse;
  const { data: signer } = useSigner();

  // tier related data
  const [tierId, setTierId] = useState(null);
  const [price, setPrice] = useState(null);
  const [equityShare, setEquityShare] = useState(null);
  const [revenueShare, setRevenueShare] = useState(null);
  const [daoWeight, setDaoWeight] = useState(null);
  const [uri, setUri] = useState(null);
  const [tierDataLoading, setTierDataLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChangeTier = (value) => {
    setTierId(value);
  };

  useEffect(() => {
    if (tierId !== null) {
      fetchTierData();
    }
  }, [tierId]);

  const fetchTierData = async () => {
    try {
      setTierDataLoading(true);
      const result = await getTierData(tierId);
      const price = result.price.toString();
      const priceFormattedString = utils.formatUnits(price, 18);
      const priceFormattedNumber = Number(priceFormattedString);
      setPrice(priceFormattedNumber);

      const equityShare = result.equityShare.toString();
      const equityShareString = utils.formatUnits(equityShare, 2);
      const equityShareNumber = Number(equityShareString);
      setEquityShare(equityShareNumber);

      const sharedRevenue = result.revenueShare.toString();
      const sharedRevenueString = utils.formatUnits(sharedRevenue, 2);
      const sharedRevenueNumber = Number(sharedRevenueString);
      setRevenueShare(sharedRevenueNumber);

      const daoWeight = result.daoWeight.toString();
      const daoWeightString = utils.formatUnits(daoWeight, 2);
      const daoWeightNumber = Number(daoWeightString);
      setDaoWeight(daoWeightNumber);

      const uri = result.uri;
      setUri(uri);

      setRevenueShare(sharedRevenueNumber);
      setTierDataLoading(false);
    } catch (error) {
      setTierDataLoading(false);
      notification['error']({
        key: 'admin',
        message: 'Error!',
        description: error,
      });
    }
  };

  const handleQuery = async () => {
    try {
      setLoading(true);
      const result = await changeTierDetails(
        signer,
        tierId,
        price,
        equityShare,
        revenueShare,
        daoWeight,
        uri
      );

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
        <Panel header="changeTierDetails">
          <span>Select Tier</span>
          <Select
            placeholder="select tier"
            onChange={handleChangeTier}
            className="w-100"
            options={[
              {
                value: 0,
                label: 'Gold',
              },
              {
                value: 1,
                label: 'Silver',
              },
              {
                value: 2,
                label: 'Bronze',
              },
              {
                value: 3,
                label: 'Standard',
              },
            ]}
          />

          <div className="mt-3">
            {tierDataLoading ? (
              <Spin />
            ) : (
              <div>
                <div>
                  <span>_price</span>
                  <Input
                    value={price}
                    placeholder="_price"
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                <div className="mt-3">
                  <span>_equityShare</span>
                  <Input
                    value={equityShare}
                    placeholder="_equityShare"
                    onChange={(e) => setEquityShare(e.target.value)}
                    type="number"
                    suffix="%"
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                <div className="mt-3">
                  <span>_revenueShare</span>
                  <Input
                    value={revenueShare}
                    placeholder="_revenueShare"
                    onChange={(e) => setRevenueShare(e.target.value)}
                    type="number"
                    suffix="%"
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                <div className="mt-3">
                  <span>_daoWeight</span>
                  <Input
                    value={daoWeight}
                    placeholder="_daoWeight"
                    onChange={(e) => setDaoWeight(e.target.value)}
                    type="number"
                    suffix="%"
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                <div className="mt-3">
                  <span>_uri</span>
                  <Input
                    value={uri}
                    placeholder="_uri"
                    onChange={(e) => setUri(e.target.value)}
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
              </div>
            )}
          </div>
        </Panel>
      </Collapse>
    </Card>
  );
};

export default ChangeTierDetails;
