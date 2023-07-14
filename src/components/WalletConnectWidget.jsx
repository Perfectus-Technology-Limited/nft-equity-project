import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button, Avatar } from 'antd';
import { SHA256 } from 'crypto-js';
import Identicon from 'identicon.js';

const WalletConnectWidget = () => {
  const [windowSize, setWindowSize] = useState('');

  const generateAvatar = (seed) => {
    const options = {
      size: 80, // Adjust the size of the identicon image
    };
    const hash = SHA256(seed).toString();
    const data = new Identicon(hash.slice(0, 15), options).toString();
    return 'data:image/png;base64,' + data;
  };

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

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button type="primary" onClick={openConnectModal}>
                    Connect
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    type="default"
                    onClick={openChainModal}
                    style={{
                      color: 'red',
                      background: 'rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12, marginTop: '15px' }}>
                  <Button
                    onClick={openChainModal}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: 'white',
                    }}
                    type="default"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 20,
                          height: 20,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 20, height: 20, marginTop: '-5px' }}
                          />
                        )}
                      </div>
                    )}
                    {windowSize > 1400 ? chain.name : ''}
                  </Button>

                  <Button onClick={openAccountModal} type="primary">
                    <div className="d-flex">
                      <Avatar
                        size={22}
                        style={{ marginRight: '5px' }}
                        src={generateAvatar(account.displayName)}
                      />
                      {account.displayBalance
                        ? ` ${account.displayBalance}`
                        : ''}
                    </div>
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnectWidget;
