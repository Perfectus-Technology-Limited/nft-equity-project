import React, { useEffect, useState } from 'react';
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
import ChangeFeePercentages from '@/components/admin/ChangeFeePercentages';
import WhitelistUsers from '@/components/admin/WhitelistUsers';
import WithdrawBusd from '@/components/admin/WithdrawBusd';
import ChangeTierDetails from '@/components/admin/ChangeTierDetails';
import ChangePropertyPrice from '@/components/admin/ChangePropertyPrice';
import { ethers } from 'ethers';
import { useAccount, useSigner } from 'wagmi';
import { configs } from '@/Blockchain/web3.config';
import { getNFTContractABIWriteFunctions } from '@/Blockchain/admin.service';
import parse from 'html-react-parser'

const AdminPage = () => {
  const { Option } = Select;
  const { Panel } = Collapse;

  const [inputArguments, setInputArguments] = useState([]);
  const [inputBoolArguments, setInputBoolArguments] = useState(true);
  const [isBoolFunction, setIsBoolFunction] = useState(false);
  const [isFunctionCallLoading, setIsFunctionCallLoading] = useState([]);
  const [resultView, setResultView] = useState([]);

  const writeFunctions = getNFTContractABIWriteFunctions();

  const { address: account } = useAccount();
  const { data: signer } = useSigner();

  const handleQuery = (abiData) => async () => {
    if (!account) {
      notification['error']({
        message: 'Authentication Error',
        description: 'Please connect your wallet to proceed',
      });
    }

    //decode input values
    const functionName = abiData.name;
    const argumentLength = abiData.inputs.length;
    const argumentArray = [];
    for (let i = 0; i < argumentLength; i++) {
      const key = functionName + i;
      const filteredInput = inputArguments[key];
      argumentArray.push(filteredInput);
    }

    setIsFunctionCallLoading((prev) => ({ ...prev, [functionName]: true }));

    try {
      //create web3 instance
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_BSC_RPC_PROVIDER
      );

      const contractAddress = configs.nftContractAddress;
      const contractABI = JSON.parse(configs.nftContractABI);

      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );

      const contractInstanceWithSigner = contractInstance.connect(signer);
      // console.log('functionName', functionName);
      // console.log('argumentArray', argumentArray);
      // console.log('inputBoolArguments', inputBoolArguments);

      let writeReceipt;

      if (!isBoolFunction) {
        writeReceipt = await contractInstanceWithSigner[functionName](
          ...argumentArray
        );
      } else {
        writeReceipt = await contractInstanceWithSigner[functionName](
          inputBoolArguments
        );
      }

      const result = await writeReceipt.wait();
      console.log('TX SUCCESS ', result);

      const htmlResult = `<a 
            href=${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}/tx/${result?.transactionHash}
            target="_blank"
            className="view-your-tx"
        >
        View your transaction<a>`;
      setResultView((prev) => ({ ...prev, [functionName]: htmlResult }));
      setIsFunctionCallLoading((prev) => ({ ...prev, [functionName]: false }));
      notification['success']({
        message: 'Success',
        description: 'Transaction has been completed',
      });
    } catch (error) {
      let errorMessage =
        'Something went wrong while trying to execute the transaction';
      if (error && error.message) {
        errorMessage = error.message;
      }
      if (error && error.reason && error.reason !== '') {
        errorMessage = error.reason;
      }
      console.log('WRITE ERROR ', error);
      setResultView((prev) => ({ ...prev, [functionName]: errorMessage }));
      setIsFunctionCallLoading((prev) => ({ ...prev, [functionName]: false }));
      notification['error']({
        message: 'Execution Error',
        description: errorMessage,
      });
    }
  };

  const handleChange = (e) => {
    if (e.target) {
      const { value, id } = e.target;
      setInputArguments((prev) => ({ ...prev, [id]: value }));
      setIsBoolFunction(false);
    } else {
      setInputBoolArguments(e);
      setIsBoolFunction(true);
    }
  };

  const buildInputRows = (itemName, inputArgs) => {
    const inputArray = [];
    for (let i = 0; i < inputArgs.length; i++) {
      inputArray.push(
        <div className="mt-1" key={i}>
          <span key={i}>{inputArgs[i].name}</span>
          {inputArgs[i].type === 'bool' ? (
            <Select
              style={{
                width: '100%',
              }}
              placeholder="select true or false"
              defaultValue={true}
              onChange={handleChange}
              optionLabelProp="label"
            >
              <Option value={true} label="true">
                true
              </Option>
              <Option value={false} label="false">
                false
              </Option>
            </Select>
          ) : (
            <Input
              placeholder={inputArgs[i].type}
              onChange={handleChange}
              key={itemName + i}
              id={itemName + i}
            />
          )}
        </div>
      );
    }

    return inputArray;
  };

  return (
    <div className='mt-5 mb-5'>
      <Row>
        <Col span={24}>
          {writeFunctions.map((item, index) => (
            <Card className="nft-square-card nft-dark-card mt-3" key={index}>
              <Collapse defaultActiveKey={['1']}>
                <Panel header={item.name}>
                  {item.inputs ? (
                    <>{buildInputRows(item.name, item.inputs)}</>
                  ) : (
                    <></>
                  )}

                  {isFunctionCallLoading[item.name] ? (
                    <div className="result-container mt-3">
                      <Spin size="small" />
                    </div>
                  ) : (
                    <div className="result-container mt-3">
                      {parse(
                        resultView[item.name] ? resultView[item.name] : ''
                      )}
                    </div>
                  )}

                  <Button
                    size="small"
                    type='primary'
                    loading={isFunctionCallLoading[item.name]}
                    style={{ padding: '0px 20px' }}
                    onClick={handleQuery(item)}
                    className="mt-3"
                  >
                    Write
                  </Button>
                </Panel>
              </Collapse>
            </Card>
          ))}
        </Col>
        
        <Col span={24}>
          <ChangeFeePercentages />
        </Col>

        <Col span={24}>
          <WhitelistUsers />
        </Col>

        <Col span={24}>
          <WithdrawBusd />
        </Col>

        <Col span={24}>
          <ChangeTierDetails />
        </Col>

        <Col span={24}>
          <ChangePropertyPrice />
        </Col>
      </Row>
    </div>
  );
};

export default AdminPage;
