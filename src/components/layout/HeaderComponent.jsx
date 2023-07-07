import React, { useState, useEffect } from 'react';
import { Layout, Typography } from 'antd';
import Image from 'next/image';
import { Sun, Moon } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '@/redux/themeSlice';
import { openMenu } from '@/redux/mobileMenuSlice';
import WalletConnectWidget from '../WalletConnectWidget';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import { MenuOutlined } from '@ant-design/icons';
import MobileMenuComponent from './MobileMenuComponent';

const HeaderComponent = () => {
  const [windowSize, setWindowSize] = useState('');
  const { Header } = Layout;
  const router = useRouter();
  const { themeState } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { Title } = Typography;
  const { address: account } = useAccount();

  const adminAccounts = process.env.NEXT_PUBLIC_ADMINS_ACCOUNT;
  const [isAdmin, setIsAdmin] = useState(false);

  // dynamic navbar items class names
  const [nftMintClass, setNftMintClass] = useState('');
  const [referralSystemClass, setReferralSystemClass] = useState('');
  const [adminClass, setAdminClass] = useState('');
  const [myNftClass, setMyNftClass] = useState('');

  useEffect(() => {
    // make sure your function is being called in client side only
    if (typeof window !== 'undefined') {
      setWindowSize(window.innerWidth);
    }
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  // check is admin
  useEffect(() => {
    let admins = adminAccounts ? adminAccounts.split(',') : null;
    if (account && admins?.length > 0) {
      const result = admins.find(
        (item) => item.toLowerCase() === account.toLowerCase()
      );
      if (result) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, [account, adminAccounts]);

  useEffect(() => {
    if (router?.pathname === '/') {
      setNftMintClass('text-primary');
      setReferralSystemClass('text-light');
      setAdminClass('text-light');
      setMyNftClass('text-light');
    }
    if (router?.pathname === '/referral-system') {
      setNftMintClass('text-light');
      setReferralSystemClass('text-primary');
      setAdminClass('text-light');
      setMyNftClass('text-light');
    }
    if (router?.pathname === '/admin') {
      setNftMintClass('text-light');
      setReferralSystemClass('text-light');
      setAdminClass('text-primary');
      setMyNftClass('text-light');
    }
    if (router?.pathname === '/user-nfts') {
      setNftMintClass('text-light');
      setReferralSystemClass('text-light');
      setAdminClass('text-light');
      setMyNftClass('text-primary');
    }
  }, [router?.pathname]);

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
    <Header className="fixed-top nft-header" style={{ zIndex: 100 }}>
      <div className="d-flex justify-content-between container">
        <div>
          {windowSize >= 1000 ? (
            <Image src="/Logo.svg" width={193} height={52} alt="logo" />
          ) : (
            <div style={{ marginLeft: '-50px' }}>
              <Image src="/Logo.svg" width={120} height={52} alt="logo" />
            </div>
          )}
        </div>

        {windowSize >= 1000 && (
          <div className="center">
            <div className="d-flex">
              <Title
                level={5}
                className={`m-0 mx-2 ${nftMintClass}`}
                style={{ cursor: 'pointer' }}
                onClick={() => router.push('/')}
              >
                NFT MINT
              </Title>

              <Title
                level={5}
                className={`m-0 mx-2 ${referralSystemClass}`}
                style={{ cursor: 'pointer' }}
                onClick={() => router.push('/referral-system')}
              >
                REFERRAL SYSTEM
              </Title>

              {account && (
                <Title
                  level={5}
                  className={`m-0 mx-2 ${myNftClass}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push('/user-nfts')}
                >
                  MY NFT
                </Title>
              )}

              {isAdmin && (
                <Title
                  level={5}
                  className={`m-0 mx-2 ${adminClass}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push('/admin')}
                >
                  ADMIN
                </Title>
              )}
            </div>
          </div>
        )}

        {windowSize >= 1000 ? (
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
        ) : (
          <div style={{ marginRight: '-50px' }} className="text-light">
            <MenuOutlined onClick={() => dispatch(openMenu())} />
          </div>
        )}
      </div>

      <MobileMenuComponent />
    </Header>
  );
};

export default HeaderComponent;
