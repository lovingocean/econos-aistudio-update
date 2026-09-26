import { Web3Network, Web3WalletProvider, Web3WalletState } from '../types/omnifinExchange';

export interface Web3ConnectResult {
  success: boolean;
  address?: string;
  network?: Web3Network;
  chainId?: number;
  ethBalance?: number;
  error?: string;
  isIframeBlocked?: boolean;
}

class Web3WalletManager {
  private listenersAttached: boolean = false;
  private onStateChangeCallback?: (state: Partial<Web3WalletState>) => void;
  private eip6963Providers: Map<string, any> = new Map();

  constructor() {
    if (typeof window !== 'undefined') {
      // EIP-6963: Multi Injected Provider Discovery
      window.addEventListener('eip6963:announceProvider', (event: any) => {
        if (event.detail?.info && event.detail?.provider) {
          const key = event.detail.info.rdns || event.detail.info.name || Math.random().toString();
          this.eip6963Providers.set(key.toLowerCase(), event.detail.provider);
          if (event.detail.info.rdns?.includes('metamask') || event.detail.info.name?.toLowerCase().includes('metamask')) {
            this.eip6963Providers.set('metamask', event.detail.provider);
          }
        }
      });
      try {
        window.dispatchEvent(new Event('eip6963:requestProvider'));
      } catch {
        // Safe ignore
      }
    }
  }

  public setStateCallback(cb: (state: Partial<Web3WalletState>) => void) {
    this.onStateChangeCallback = cb;
  }

  public isRunningInIframe(): boolean {
    try {
      return typeof window !== 'undefined' && window.self !== window.top;
    } catch {
      return true;
    }
  }

  public getMetaMaskProvider(): any {
    if (typeof window === 'undefined') return null;

    // 1. EIP-6963 announced MetaMask provider
    if (this.eip6963Providers.has('metamask')) {
      return this.eip6963Providers.get('metamask');
    }

    // 2. window.ethereum with multiple providers
    const ethereum = (window as any).ethereum;
    if (ethereum?.providers && Array.isArray(ethereum.providers)) {
      const metaMask = ethereum.providers.find((p: any) => p.isMetaMask && !p.isPhantom && !p.isBrave);
      if (metaMask) return metaMask;
      const anyMetaMask = ethereum.providers.find((p: any) => p.isMetaMask);
      if (anyMetaMask) return anyMetaMask;
      return ethereum.providers[0];
    }

    // 3. Direct window.ethereum
    if (ethereum) {
      return ethereum;
    }

    // 4. Check parent frame if same-origin (safe try/catch)
    try {
      if (window.parent && (window.parent as any).ethereum) {
        return (window.parent as any).ethereum;
      }
    } catch {
      // Cross-origin iframe blocked
    }

    return null;
  }

  public isEthereumAvailable(): boolean {
    return Boolean(this.getMetaMaskProvider());
  }

  public isSolanaAvailable(): boolean {
    return typeof window !== 'undefined' && Boolean((window as any).solana?.isPhantom || (window as any).solana);
  }

  public async getConnectedAccount(): Promise<string | null> {
    const provider = this.getMetaMaskProvider();
    if (!provider) return null;
    try {
      const accounts: string[] = await provider.request({ method: 'eth_accounts' });
      return accounts && accounts.length > 0 ? accounts[0] : null;
    } catch {
      return null;
    }
  }

  public async fetchOnChainBalance(address: string, network: Web3Network = 'arbitrum'): Promise<number> {
    const rpcUrls: Record<string, string> = {
      arbitrum: 'https://arbitrum-one-rpc.publicnode.com',
      ethereum: 'https://ethereum-rpc.publicnode.com',
      base: 'https://base-rpc.publicnode.com',
      polygon: 'https://polygon-rpc.publicnode.com'
    };

    const url = rpcUrls[network] || rpcUrls.arbitrum;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_getBalance',
          params: [address, 'latest']
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.result) {
          const wei = BigInt(data.result);
          const eth = Number(wei) / 1e18;
          return Number(eth.toFixed(4));
        }
      }
    } catch (e) {
      console.warn('[Web3] Public RPC balance lookup failed:', e);
    }
    return 0;
  }

  // Connect using a pasted or entered address directly (for iframes or watch-only)
  public async connectAddress(rawAddress: string, network: Web3Network = 'arbitrum'): Promise<Web3ConnectResult> {
    const address = rawAddress.trim();
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return {
        success: false,
        error: 'Invalid Ethereum address. Must be 42 characters starting with 0x.'
      };
    }

    const ethBalance = await this.fetchOnChainBalance(address, network);
    const chainId = network === 'arbitrum' ? 42161 : network === 'ethereum' ? 1 : network === 'base' ? 8453 : 137;

    return {
      success: true,
      address,
      network,
      chainId,
      ethBalance
    };
  }

  public async connect(provider: Web3WalletProvider = 'metamask'): Promise<Web3ConnectResult> {
    // 1. Solana Phantom connection
    if (provider === 'phantom') {
      if (!this.isSolanaAvailable()) {
        const inIframe = this.isRunningInIframe();
        return {
          success: false,
          isIframeBlocked: inIframe,
          error: inIframe
            ? 'Phantom extension cannot inject into embedded preview frames. Open in a standalone tab or connect your address directly.'
            : 'Phantom Wallet is not detected. Please install Phantom from https://phantom.app/'
        };
      }
      try {
        const resp = await (window as any).solana.connect();
        const address = resp.publicKey.toString();
        return {
          success: true,
          address,
          network: 'solana',
          chainId: 101,
          ethBalance: 0
        };
      } catch (err: any) {
        return {
          success: false,
          error: err.message || 'Solana connection rejected by user'
        };
      }
    }

    // 2. EVM Providers (MetaMask, Coinbase Wallet, Rabby)
    const ethProvider = this.getMetaMaskProvider();

    if (!ethProvider) {
      const inIframe = this.isRunningInIframe();
      if (inIframe) {
        return {
          success: false,
          isIframeBlocked: true,
          error: 'IFRAME_RESTRICTION: MetaMask is active in your browser, but Chrome security prevents extensions from injecting into embedded preview iframes. Open the app in a new standalone tab to connect your live extension directly, or paste your 0x address below.'
        };
      }

      return {
        success: false,
        error: `MetaMask extension was not detected. Please make sure the MetaMask extension is unlocked and enabled in your browser extensions manager.`
      };
    }

    try {
      // Request user account authorization from MetaMask
      const accounts: string[] = await ethProvider.request({ method: 'eth_requestAccounts' });
      if (!accounts || accounts.length === 0) {
        return {
          success: false,
          error: 'No accounts selected in MetaMask.'
        };
      }

      const address = accounts[0];

      // Read Chain ID
      let chainId = 42161;
      try {
        const chainIdHex: string = await ethProvider.request({ method: 'eth_chainId' });
        chainId = parseInt(chainIdHex, 16);
      } catch {
        // Fallback
      }
      const network = this.mapChainIdToNetwork(chainId);

      // Read Real On-Chain ETH Balance
      let ethBalance = 0;
      try {
        const balanceHex: string = await ethProvider.request({
          method: 'eth_getBalance',
          params: [address, 'latest']
        });
        const wei = BigInt(balanceHex);
        ethBalance = Number(wei) / 1e18;
      } catch (balErr) {
        ethBalance = await this.fetchOnChainBalance(address, network);
      }

      this.attachEventListeners(ethProvider);

      return {
        success: true,
        address,
        network,
        chainId,
        ethBalance: Number(ethBalance.toFixed(4))
      };
    } catch (err: any) {
      if (err.code === 4001) {
        return {
          success: false,
          error: 'Connection request was cancelled in MetaMask.'
        };
      }
      if (err.code === -32002 || err.message?.includes('Already processing')) {
        return {
          success: false,
          error: 'A connection request is already waiting in MetaMask. Click the MetaMask icon in your browser toolbar to approve.'
        };
      }
      return {
        success: false,
        error: err.message || 'Failed to connect MetaMask.'
      };
    }
  }

  public async switchNetwork(targetNetwork: Web3Network): Promise<boolean> {
    const ethProvider = this.getMetaMaskProvider();
    if (!ethProvider || targetNetwork === 'solana') return false;

    const chainConfigs: Record<Exclude<Web3Network, 'solana'>, { chainId: string; chainName: string; rpcUrls: string[]; nativeCurrency: any; blockExplorerUrls: string[] }> = {
      arbitrum: {
        chainId: '0xa4b1', // 42161
        chainName: 'Arbitrum One',
        rpcUrls: ['https://arbitrum-one-rpc.publicnode.com'],
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        blockExplorerUrls: ['https://arbiscan.io']
      },
      ethereum: {
        chainId: '0x1', // 1
        chainName: 'Ethereum Mainnet',
        rpcUrls: ['https://ethereum-rpc.publicnode.com'],
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        blockExplorerUrls: ['https://etherscan.io']
      },
      base: {
        chainId: '0x2105', // 8453
        chainName: 'Base',
        rpcUrls: ['https://base-rpc.publicnode.com'],
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        blockExplorerUrls: ['https://basescan.org']
      },
      polygon: {
        chainId: '0x89', // 137
        chainName: 'Polygon Mainnet',
        rpcUrls: ['https://polygon-rpc.publicnode.com'],
        nativeCurrency: { name: 'POL', symbol: 'POL', decimals: 18 },
        blockExplorerUrls: ['https://polygonscan.com']
      }
    };

    const targetConfig = chainConfigs[targetNetwork];
    if (!targetConfig) return false;

    try {
      await ethProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: targetConfig.chainId }]
      });
      return true;
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await ethProvider.request({
            method: 'wallet_addEthereumChain',
            params: [targetConfig]
          });
          return true;
        } catch (addError) {
          console.error('[Web3] Failed to add chain:', addError);
          return false;
        }
      }
      return false;
    }
  }

  private mapChainIdToNetwork(chainId: number): Web3Network {
    switch (chainId) {
      case 1: return 'ethereum';
      case 42161: return 'arbitrum';
      case 8453: return 'base';
      case 137: return 'polygon';
      default: return 'arbitrum';
    }
  }

  private attachEventListeners(provider: any) {
    if (this.listenersAttached || !provider?.on) return;

    provider.on('accountsChanged', async (accounts: string[]) => {
      if (!accounts || accounts.length === 0) {
        this.onStateChangeCallback?.({
          isConnected: false,
          address: null,
          walletProvider: null
        });
      } else {
        const address = accounts[0];
        const ethBalance = await this.fetchOnChainBalance(address, 'arbitrum');
        this.onStateChangeCallback?.({
          isConnected: true,
          address,
          walletBalances: {
            usdo: 0,
            btc: 0,
            eth: ethBalance,
            sol: 0
          }
        });
      }
    });

    provider.on('chainChanged', (chainIdHex: string) => {
      const chainId = parseInt(chainIdHex, 16);
      this.onStateChangeCallback?.({
        chainId,
        network: this.mapChainIdToNetwork(chainId)
      });
    });

    this.listenersAttached = true;
  }
}

export const web3WalletManager = new Web3WalletManager();
