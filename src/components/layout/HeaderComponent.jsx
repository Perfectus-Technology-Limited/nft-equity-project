import React from 'react';
import { Layout } from 'antd';
import Image from 'next/image';
import { Sun, Moon } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '@/redux/themeSlice';
import WalletConnectWidget from '../WalletConnectWidget';

const HeaderComponent = () => {
  const { Header } = Layout;
  const { themeState } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

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
