import React from 'react';
import { Layout } from 'antd';

const FooterComponent = () => {
  const { Footer } = Layout;

  return (
    <Footer className="text-center footer-bg">
      Copyrights © {new Date().getFullYear()}{' '}
      <a
        href="https://nftequity.group"
        target="_blank"
        rel="noreferrer"
        className="no-text-decorations text-primary"
      >
        NFT Equity Group
      </a>
      <br />
      Developed by{' '}
      <a
        href="https://perfectustec.com"
        target="_blank"
        rel="noreferrer"
        className="no-text-decorations text-primary"
      >
        Perfectus
      </a>
    </Footer>
  );
};

export default FooterComponent;
