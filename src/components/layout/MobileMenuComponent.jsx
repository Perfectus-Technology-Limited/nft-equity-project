import React, { useState, useEffect } from 'react';
import { Drawer, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { closeMenu } from '@/redux/mobileMenuSlice';
import { CloseCircleOutlined } from '@ant-design/icons';
import { setTheme } from '@/redux/themeSlice';
import { Sun, Moon } from 'react-feather';
import WalletConnectWidget from '../WalletConnectWidget';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import Image from 'next/image';

const MobileMenuComponent = () => {
  const { menuOpened } = useSelector((state) => state.mobileMenu);
  const { themeState } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const router = useRouter();
  const { Text, Title } = Typography;
  const { address: account } = useAccount();

  // dynamic navbar items class names
  const [nftMintClass, setNftMintClass] = useState('');
  const [referralSystemClass, setReferralSystemClass] = useState('');
  const [adminClass, setAdminClass] = useState('');
  const [myNftClass, setMyNftClass] = useState('');

  const adminAccounts = process.env.NEXT_PUBLIC_ADMINS_ACCOUNT;
  const [isAdmin, setIsAdmin] = useState(false);

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
    <Drawer
      placement="left"
      onClose={() => dispatch(closeMenu())}
      open={menuOpened}
      style={{ zIndex: 9999, width: '100vw' }}
      closable={false}
    >
      <div className="d-flex justify-content-between">
        <div>
          <Image
            src="/Logo.svg"
            width={120}
            height={52}
            alt="logo"
            style={{ marginTop: '-10px' }}
          />
        </div>

        <div>
          <Text className="text-light">
            <CloseCircleOutlined onClick={() => dispatch(closeMenu())} />
          </Text>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <WalletConnectWidget />
      </div>

      <div className="text-center">
        <Title
          level={5}
          className={`m-0 mx-2 ${nftMintClass} mt-4`}
          style={{ cursor: 'pointer' }}
          onClick={() => router.push('/')}
        >
          NFT MINT
        </Title>

        <Title
          level={5}
          className={`m-0 mx-2 ${referralSystemClass} mt-4`}
          style={{ cursor: 'pointer' }}
          onClick={() => router.push('/referral-system')}
        >
          REFERRAL SYSTEM
        </Title>

        {account && (
          <Title
            level={5}
            className={`m-0 mx-2 ${myNftClass} mt-4`}
            style={{ cursor: 'pointer' }}
            onClick={() => router.push('/user-nfts')}
          >
            MY NFTS
          </Title>
        )}

        {isAdmin && (
          <Title
            level={5}
            className={`m-0 mx-2 ${adminClass} mt-4`}
            style={{ cursor: 'pointer' }}
            onClick={() => router.push('/admin')}
          >
            ADMIN
          </Title>
        )}
      </div>

      <div className="d-flex justify-content-center mt-4">
        {themeState === 'light' && (
          <Sun size={20} style={{ cursor: 'pointer' }} onClick={toggleTheme} />
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
    </Drawer>
  );
};

export default MobileMenuComponent;
