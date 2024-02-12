import eth from "../assets/images/eth.png";
import matic from "../assets/images/matic.png";
import avax from "../assets/images/avax.png";
import egem from "../assets/images/egem.png";
import bnb from "../assets/images/bnb.png";
import gnosis from "../assets/images/gnosis.png";
import etc from "../assets/images/etc.png";
// import klaytn from "../assets/images/klaytn.png";
import evmos from "../assets/images/evmos.png";
import moonriver from "../assets/images/moonriver.png";


export const NetworkId = {
  POLYGON: 137,
  // POLYGON_TESTNET: 80001,
  RINKEBY: 4,
  ETHEREUM: 1,
  ETHERGEM: 1987,
  AVALANCHE: 43114,
  BSC: 56,
  GNOSIS: 100,
  ETC: 61,
  KLAYTN: 8217,
  ARBITRUM: 42161,
  OPTIMISM: 10,
  MANTLE: 5000,
  GOERLI: 5,
  SEPOLIA: 11155111,
  BASE: 8453,
  SCROLL: 534352,
  BERA_TEST: 80085

  // FUJI: 43113,
};
export const supportedChainIds = [ NetworkId.POLYGON, NetworkId.BSC, NetworkId.ETC, NetworkId.GNOSIS, NetworkId.ETHERGEM, NetworkId.AVALANCHE, NetworkId.MOONRIVER, NetworkId.EVMOS, NetworkId.ARBITRUM, NetworkId.OPTIMISM]

export const FACTORY_ADDRESSES = {
  [NetworkId.BSC]: "0xf58D78F353C67a1FeDf1C8dc60cF09c88B3b8ACc", //verified & adjusted
  [NetworkId.AVALANCHE]: "0xf58D78F353C67a1FeDf1C8dc60cF09c88B3b8ACc", //verified & adjusted
  [NetworkId.POLYGON]: "0x58dD4052c3d4e4f020365AE4dfAE16d1Fdd1f763",//verified & adjusted
  [NetworkId.ETC]: "0xf58D78F353C67a1FeDf1C8dc60cF09c88B3b8ACc", //verified & adjusted
  [NetworkId.MANTLE]: "0xf58D78F353C67a1FeDf1C8dc60cF09c88B3b8ACc",//verified & adjusted
  [NetworkId.SCROLL]: "0x21E17d7D4f6B6e4116591730CEec05EC63cF9924",//verified & adjusted
  [NetworkId.BERA_TEST]: "0xD76e5a10702156c4155443EC93Ff634b6F12a312",//verified & adjusted

  // [NetworkId.RINKEBY]: "0x0f79f4239F343fc932F357eFAAeE405a90d28e42", //verified
  // [NetworkId.ETHERGEM]: "0x5A4Aa5B8f54763A22A7bE54F30Be650fe040b8eA", //
  // [NetworkId.GNOSIS]: "0x86E25f1e266eA4831b3CBb68164753DcbA30D047", //verified
  // [NetworkId.EVMOS]: "0x86E25f1e266eA4831b3CBb68164753DcbA30D047", //verified
  // [NetworkId.MOONRIVER]: "0x86E25f1e266eA4831b3CBb68164753DcbA30D047", //verified
  // [NetworkId.ARBITRUM]: "0x86E25f1e266eA4831b3CBb68164753DcbA30D047", //verified
  // [NetworkId.OPTIMISM]: "0x04Fe964916B24deb3C2D7E6A8d9873b054E52492", //verified
  // [NetworkId.zkSyncTestnet]: "0x694DCbFBD60e8C4923B130570Ba55Ba237c4f12A",
  // [NetworkId.zkSyncMainnet]: "0x694DCbFBD60e8C4923B130570Ba55Ba237c4f12A",


  // [NetworkId.GOERLI]: "0x42f12c2BCee63eFC1894f47D37e9535759C19ecA",//verified & adjusted
  [NetworkId.GOERLI]: "0xdCeFcaA6ED6D4cAA953F8F7aB71978b6aD2107c0",//verified & adjusted
  [NetworkId.SEPOLIA]: "0x09994c7E1eD02E56d097BcCFD0Da47dFF0F66e99"//verified
};
export const TOKEN_ADDRESSES = {
  [NetworkId.BSC]: "0x2861171F7a3dD05DC2E875374841D5C49a8e5dCB",//verified & adjusted
  [NetworkId.AVALANCHE]: "0x7DA6DF0e81a6eD9F98B3fd374CF6bE4f3099216E",//verified & adjusted
  [NetworkId.POLYGON]: "0x08E7733a6D2a7Fc0363Dae117F8608AAb518F996",//verified & adjusted
  [NetworkId.ETC]: "0x7DA6DF0e81a6eD9F98B3fd374CF6bE4f3099216E",//verified & adjusted
  [NetworkId.MANTLE]: "0x7DA6DF0e81a6eD9F98B3fd374CF6bE4f3099216E",//verified & adjusted
  [NetworkId.SCROLL]: "0xD76e5a10702156c4155443EC93Ff634b6F12a312",//verified & adjusted
  [NetworkId.BERA_TEST]: "0x21E17d7D4f6B6e4116591730CEec05EC63cF9924",//verified & adjusted

  // [NetworkId.RINKEBY]: "0xFe4317e87958f5b408aF9d8fFf78F228435fd0C8",
  // [NetworkId.ETHERGEM]: "0xf3195693ddb32822cdf759305a91b674ab1382e1",
  // [NetworkId.GNOSIS]: "0xCbd697f76e90435Dce788ce14e096f732803fA71",
  // [NetworkId.MOONRIVER]: "0xCbd697f76e90435Dce788ce14e096f732803fA71",
  // [NetworkId.EVMOS]: "0xCbd697f76e90435Dce788ce14e096f732803fA71",
  // [NetworkId.ARBITRUM]: "0xCbd697f76e90435Dce788ce14e096f732803fA71",
  // [NetworkId.OPTIMISM]: "0xC254F215840EB03Ef7ff7E2707CB5787d529579a",
  // [NetworkId.zkSyncTestnet]: "0x464Efc76aedddAD363dAd78375873456C0a21BBc",
  // [NetworkId.zkSyncMainnet]: "0x464Efc76aedddAD363dAd78375873456C0a21BBc",

  [NetworkId.GOERLI]: "0x92d53Ae63e427BB78B34c3D7eF8a0dA95f238697",//verified & adjusted
  [NetworkId.SEPOLIA]: "0x7DA6DF0e81a6eD9F98B3fd374CF6bE4f3099216E"//verified
}

/**
 * Network details required to add a network to a user's wallet, as defined in EIP-3085 (https://eips.ethereum.org/EIPS/eip-3085)
 */
// export const netOrder = [ 137, 56, 61, 100, 1987, 43114, 4, 1285, 9001]
export const NETWORKS = {
  [NetworkId.POLYGON]: {
    image: matic,
    label: "Polygon",
    symbol: "MATIC",
    chainId: 137,
    explorer: "https://polygonscan.com",
    url: "https://polygon-rpc.com",
  },
  [NetworkId.BSC]: {
    image: bnb,
    label: "Binance Smart Chain",
    symbol: "BNB",
    chainId: 56,
    explorer: "https://bscscan.com",
    url: "https://bsc-dataseed1.binance.org",
  },
  [NetworkId.MANTLE]: {
    image: bnb,
    label: "Mantle",
    symbol: "MNT",
    chainId: 5000,
    explorer: "https://explorer.mantle.xyz",
    url: "https://explorer.mantle.xyz",
  },
  [NetworkId.ETC]: {
    image: etc,
    label: "Ethereum Classic",
    chainId: 61,
    symbol: "ETC",
    explorer: "https://etc.tokenview.com/en", //"https://blockscout.com/etc/mainnet/",
    url: "https://etc.etcdesktop.com",
  },
  [NetworkId.AVALANCHE]: {
    image: avax,
    label: "Avalanche",
    symbol: "AVAX",
    chainId: 43114,
    explorer: "https://snowtrace.io",
    url: "https://api.avax.network/ext/bc/C/rpc",
  },
  [NetworkId.BASE]: {
    image: avax,
    label: "BASE",
    chainId: 8453,
    symbol: "BASE",
    explorer: "https://basescan.org",
    url: "https://mainnet.base.org",
  },
  [NetworkId.ARBITRUM]: {
    image: "https://bridge.arbitrum.io/logo.png",
    label: "Arbitrum",
    symbol: "ETH",
    chainId: 42161,
    explorer: "https://arbiscan.io",
    url: ""
  },
  [NetworkId.OPTIMISM]: {
    image: "https://assets-global.website-files.com/611dbb3c82ba72fbc285d4e2/611fd32ddac3c1856c306c37_optimism%20logo%20icon.svg",
    label: "Optimism",
    chainId: 10,
    symbol: "ETH",
    explorer: "https://optimistic.etherscan.io",
    url: ""
  },
  [NetworkId.SCROLL]: {
    image: "https://assets-global.website-files.com/611dbb3c82ba72fbc285d4e2/611fd32ddac3c1856c306c37_optimism%20logo%20icon.svg",
    label: "Scroll",
    chainId: 15343520,
    symbol: "ETH",
    explorer: "https://scrollscan.com",
    url: "https://rpc.scroll.io"
  },
  [NetworkId.zkSyncTestnet]: {
    image: "/zksync-arrows.svg",
    label: "zkSyncTestnet",
    chainId: 280,
    explorer: "https://goerli.explorer.zksync.io", //"https://zksync2-testnet.zkscan.io/",
    url: "https://testnet.era.zksync.dev"
  },
  [NetworkId.zkSyncMainnet]: {
    image: "/zksync-arrows.svg",
    label: "zkSyncMainnet",
    chainId: 324,
    explorer: "https://explorer.zksync.io", //"https://zksync2-mainnet.zkscan.io/",
    url: "https://mainnet.era.zksync.io"
  },

  //testnet
  [NetworkId.GOERLI]: {
    image: "/ether.png",
    label: "goerliTestnet",
    chainId: 5,
    symbol: "ETH",
    explorer: "https://goerli.etherscan.io", //"https://zksync2-mainnet.zkscan.io/",
    url: "https://goerli.etherscan.io"
  },
  [NetworkId.SEPOLIA]: {
    image: "/ether.png",
    label: "sepoliaTestnet",
    chainId: 11155111,
    symbol: "ETH",
    explorer: "https://sepolia.etherscan.io", //"https://zksync2-mainnet.zkscan.io/",
    url: "https://sepolia.etherscan.io/"
  },
  [NetworkId.BERA_TEST]: {
    image: "/bera_test.avif",
    label: "beraTestnet",
    chainId: 80085,
    symbol: "BERA",
    explorer: "https://artio.beratrail.io/",
    url: "https://api.routescan.io/v2/network/testnet/evm/80085/etherscan"
  }
  
  // [NetworkId.KLAYTN]: {
  //   image: klaytn,
  //   label: "Klaytn Mainnet",
  //   chainId: 8217
  // }
  // [NetworkId.FUJI]: {
  //   image: avax,
  //   label: "Avalanche Fuji",
  //   chainId: 43113
  // },
};

export const baseUrl = "https://bidify.cloud/api"
// export const baseUrl = "http://localhost:8080/api"
export const getLogUrl = {
  [NetworkId.POLYGON]: "https://api.polygonscan.com/api?module=logs&action=getLogs",
  [NetworkId.AVALANCHE]: "https://api.snowtrace.io/api?module=logs&action=getLogs",
  [NetworkId.RINKEBY]: "https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs",
  [NetworkId.ETHERGEM]: "https://blockscout.egem.io/api?module=logs&action=getLogs",
  [NetworkId.BSC]: "https://api.bscscan.com/api?module=logs&action=getLogs",
  [NetworkId.EVMOS]: "https://evm.evmos.org/api?module=logs&action=getLogs",
  [NetworkId.MOONRIVER]: "https://api-moonriver.moonscan.io/api?module=logs&action=getLogs",
  [NetworkId.GNOSIS]: "https://blockscout.com/xdai/mainnet/api?module=logs&action=getLogs",
  [NetworkId.ETC]: "https://blockscout.com/etc/mainnet/api?module=logs&action=getLogs",
  [NetworkId.zkSyncTestnet]: "https://zksync2-testnet.zkscan.io/api?module=logs&action=getLogs",
  [NetworkId.zkSyncMainnet]: "https://zksync2-mainnet.zkscan.io/api?module=logs&action=getLogs",
}
export const snowApi = {
  43114: "Y72B4EMH42SYS5C3RGGIDJM9HPQKYUSUTH",
  137: "XKIRV2YEWTDJIXRQSXB42PT78P1879NTJT",
  4: "1GT2QR7K76T2EAU72UEP43M82W72TMQAU6",
  56: "WYSBB1UFVWFNRVRMCRZ6PMI5XD3K1D2A9F"
}

export const PINATA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyZmRmYThiMi1hZjBmLTQ3ODktODc3Zi0zMDA5YjJlYzliZWYiLCJlbWFpbCI6ImphbmlzbGVlMTIwNEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiM2NjM2IwNTQ5YmY4YjhiMjgxODMiLCJzY29wZWRLZXlTZWNyZXQiOiJkOTg3NmE1M2IxMzlhYzhlZmFjNTE5ODgxYmM2ZTNmNTAxZGY5MTgxZTYzOTJmODM0ZmYwNDRiYjFkZjE1NTc3IiwiaWF0IjoxNzA3MDU4NzA0fQ.a1DwUMFUIPsH6h2dI0UfrNdeLc0TLIlx27ADU3Fo0E8";
export const PINATA_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS"

