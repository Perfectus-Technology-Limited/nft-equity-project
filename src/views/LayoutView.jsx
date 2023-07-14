import React, { useState, useEffect } from 'react';
import { ConfigProvider, theme, Layout } from 'antd';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import HeaderComponent from '@/components/layout/HeaderComponent';
import FooterComponent from '@/components/layout/FooterComponent';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '@/redux/themeSlice';
import { useRouter } from 'next/router';
import { LoadingIcon } from '@/utils/LoadingIcon';
import { Spin } from 'antd';

const LayoutView = ({ children }) => {
  const { Content } = Layout;
  const { themeState } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    if (!themeState) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [themeState]);

  useEffect(() => {
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', () => setLoading(true));
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    window.addEventListener('load', handleComplete);

    return () => {
      router.events.off('routeChangeStart', () => setLoading(true));
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
      window.removeEventListener('load', handleComplete);
    };
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
            {loading ? (
              <div className="center">
                <Spin indicator={LoadingIcon} />
              </div>
            ) : (
              <>
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
              </>
            )}
          </Layout>
        </div>
      </ConfigProvider>
    </ThemeSwitcherProvider>
  );
};

export default LayoutView;
