import React, { useState, useEffect } from 'react';
import { Layout, Typography } from 'antd';
import Image from 'next/image';
import { Sun, Moon } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '@/redux/themeSlice';
import WalletConnectWidget from '../WalletConnectWidget';
import { useRouter } from 'next/router';

const HeaderComponent = () => {
  const { Header } = Layout;
  const router = useRouter();
  const { themeState } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { Title } = Typography;

  // dynamic navbar items class names
  const [nftMintClass, setNftMintClass] = useState('')
  const [referralSystemClass, setReferralSystemClass] = useState('')
  const [adminClass, setAdminClass] = useState('')

  useEffect(() => {
    if(router?.pathname === '/') {
      setNftMintClass('text-primary')
      setReferralSystemClass('text-light')
      setAdminClass('text-light')
    } 
    if(router?.pathname === '/referral-system') {
      setNftMintClass('text-light')
      setReferralSystemClass('text-primary')
      setAdminClass('text-light')
    }
    if(router?.pathname === '/admin') {
      setNftMintClass('text-light')
      setReferralSystemClass('text-light')
      setAdminClass('text-primary')
    }
  }, [router?.pathname])

  const toggleTheme = () => {
    if (themeState === 'dark') {
      localStorage.setItem('nft_equity_theme', 'light');
      dispatch(setTheme('light'));
    } else {
      localStorage.setItem('nft_equity_theme', 'dark');
      dispatch(setTheme('dark'));
    }
  };

  return (
    <Header className="fixed-top nft-header">
      <div className="d-flex justify-content-between container">
        <div>
          <Image src="/Logo.svg" width={193} height={52} alt="logo" />
        </div>

        <div className="center">
          <div className="d-flex">
            <Title level={5} className={`m-0 mx-2 ${nftMintClass}`} style={{cursor: 'pointer'}} onClick={() => router.push('/')}>
              NFT MINT
            </Title>

            <Title level={5} className={`m-0 mx-2 ${referralSystemClass}`} style={{cursor: 'pointer'}} onClick={() => router.push('/referral-system')}>
              REFERRAL SYSTEM
            </Title>

            <Title level={5} className={`m-0 mx-2 ${adminClass}`} style={{cursor: 'pointer'}} onClick={() => router.push('/admin')}>
              ADMIN
            </Title>
          </div>
        </div>

        <div className="d-flex">
          <div style={{ marginRight: '10px' }}>
            <WalletConnectWidget />
          </div>

          <div style={{ marginTop: '-3px' }}>
            {themeState === 'light' && (
              <Sun
                size={20}
                color="white"
                style={{ cursor: 'pointer' }}
                onClick={toggleTheme}
              />
            )}

            {themeState === 'dark' && (
              <Moon
                size={20}
                color="white"
                style={{ cursor: 'pointer' }}
                onClick={toggleTheme}
              />
            )}
          </div>
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
