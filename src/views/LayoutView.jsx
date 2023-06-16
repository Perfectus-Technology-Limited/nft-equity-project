import React from 'react';
import { ConfigProvider, theme, Layout } from 'antd';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { useEffect } from 'react';
import HeaderComponent from '@/components/layout/HeaderComponent';
import FooterComponent from '@/components/layout/FooterComponent';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '@/redux/themeSlice';

const LayoutView = ({ children }) => {
  const { Content } = Layout;
  const { themeState } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  // light/dark themes related styles files
  const themes = {
    dark: `dark-theme.css`,
    light: `light-theme.css`,
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentTheme = localStorage.getItem('nft_equity_theme') || 'dark'; // get the user theme state from localStorage
      dispatch(setTheme(currentTheme));
    }
  }, []);

  return (
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={themeState}>
      <ConfigProvider
        theme={{
          algorithm:
            themeState === 'dark'
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
          token: {
            colorPrimary: '#01B47E',
          },
        }}
      >
        <div>
          <Layout>
            <HeaderComponent />
            <Content
              style={{
                paddingTop: '60px',
                minHeight: '100vh',
                background: themeState === 'dark' ? '#0F1113' : '#EEEEEE',
              }}
            >
              <div className="container">{children}</div>
            </Content>
            <FooterComponent />
          </Layout>
        </div>
      </ConfigProvider>
    </ThemeSwitcherProvider>
  );
};

export default LayoutView;
