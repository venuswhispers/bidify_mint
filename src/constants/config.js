import eth from "../assets/images/eth.png"
import matic from "../assets/images/matic.png"
import avax from "../assets/images/avax.png"
import egem from "../assets/images/egem.png"
import bnb from "../assets/images/bnb.png"
import gnosis from "../assets/images/gnosis.png"
import etc from "../assets/images/etc.png"
// import klaytn from "../assets/images/klaytn.png"
import evmos from "../assets/images/evmos.png"
import moonriver from "../assets/images/moonriver.png"

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
  EVMOS: 9001,
  MOONRIVER: 1285,
  ARBITRUM: 42161,
  OPTIMISM: 10,
  zkSyncTestnet: 280,
  zkSyncMainnet: 324,

  GOERLI: 5,
  SEPOLIA: 11155111
  // FUJI: 43113,
};
export const supportedChainIds = [ NetworkId.POLYGON, NetworkId.BSC, NetworkId.ETC, NetworkId.GNOSIS, NetworkId.ETHERGEM, NetworkId.AVALANCHE, NetworkId.MOONRIVER, NetworkId.EVMOS, NetworkId.ARBITRUM, NetworkId.OPTIMISM]

export const addresses = {
  [NetworkId.POLYGON]: "0x683F246253934862B86b042476837a5e9B91E326", //verified
  [NetworkId.RINKEBY]: "0x0f79f4239F343fc932F357eFAAeE405a90d28e42", //verified
  [NetworkId.ETHERGEM]: "0x5A4Aa5B8f54763A22A7bE54F30Be650fe040b8eA", //
  [NetworkId.AVALANCHE]: "0x0a8D5435a43c8d63b47D6E61F5eE88868A1b8Ed9", //verified
  [NetworkId.BSC]: "0x57aa9274d64185A77DAde4c104A49eD52C9D42Af", //verified
  [NetworkId.GNOSIS]: "0x86E25f1e266eA4831b3CBb68164753DcbA30D047", //verified
  [NetworkId.ETC]: "0x86E25f1e266eA4831b3CBb68164753DcbA30D047", //verified
  [NetworkId.EVMOS]: "0x86E25f1e266eA4831b3CBb68164753DcbA30D047", //verified
  [NetworkId.MOONRIVER]: "0x86E25f1e266eA4831b3CBb68164753DcbA30D047", //verified
  [NetworkId.ARBITRUM]: "0x86E25f1e266eA4831b3CBb68164753DcbA30D047", //verified
  [NetworkId.OPTIMISM]: "0x04Fe964916B24deb3C2D7E6A8d9873b054E52492", //verified
  [NetworkId.zkSyncTestnet]: "0x694DCbFBD60e8C4923B130570Ba55Ba237c4f12A",
  [NetworkId.zkSyncMainnet]: "0x694DCbFBD60e8C4923B130570Ba55Ba237c4f12A",
  [NetworkId.GOERLI]: "0xc77Ef11a940015012d17340105D6AABFD7baF168",

  [NetworkId.SEPOLIA]: "0x09994c7E1eD02E56d097BcCFD0Da47dFF0F66e99"//verified
};
export const standard = {
  [NetworkId.POLYGON]: "0x78A46265BedEfF1f18C3696dB01669A76B7833C8",
  [NetworkId.RINKEBY]: "0xFe4317e87958f5b408aF9d8fFf78F228435fd0C8",
  [NetworkId.ETHERGEM]: "0xf3195693ddb32822cdf759305a91b674ab1382e1",
  [NetworkId.AVALANCHE]: "0x0603347E9f803D28b59B8346480b1a43a11eE100",
  [NetworkId.BSC]: "0xCE387EEAD4bf81D5665EacBC457CcAea51955863",
  [NetworkId.GNOSIS]: "0xCbd697f76e90435Dce788ce14e096f732803fA71",
  [NetworkId.ETC]: "0xCbd697f76e90435Dce788ce14e096f732803fA71",
  [NetworkId.MOONRIVER]: "0xCbd697f76e90435Dce788ce14e096f732803fA71",
  [NetworkId.EVMOS]: "0xCbd697f76e90435Dce788ce14e096f732803fA71",
  [NetworkId.ARBITRUM]: "0xCbd697f76e90435Dce788ce14e096f732803fA71",
  [NetworkId.OPTIMISM]: "0xC254F215840EB03Ef7ff7E2707CB5787d529579a",
  [NetworkId.zkSyncTestnet]: "0x464Efc76aedddAD363dAd78375873456C0a21BBc",
  [NetworkId.zkSyncMainnet]: "0x464Efc76aedddAD363dAd78375873456C0a21BBc",
}
// export const platforms = {
//   [NetworkId.POLYGON]: "0x175bc1bACF1fc054A5CA30AdeC155f00AaA2ce06",
//   [NetworkId.RINKEBY]: "0x3521750B9abda780854C570e83624aCB1EB7afe7",
//   [NetworkId.ETHERGEM]: "0x43dF4869458f2B81782cE29951d057253a68Ffc6",
//   [NetworkId.AVALANCHE]: "0x0c11e7AC0864624e22935748ea092A27bD7B4924"
// }

/**
 * Network details required to add a network to a user's wallet, as defined in EIP-3085 (https://eips.ethereum.org/EIPS/eip-3085)
 */
// export const netOrder = [ 137, 56, 61, 100, 1987, 43114, 4, 1285, 9001]
export const NETWORKS = {
  [NetworkId.POLYGON]: {
    image: matic,
    label: "Polygon",
    chainId: 137,
    explorer: "https://polygonscan.com",
    url: "https://polygon-rpc.com",
  },
  // [NetworkId.POLYGON_TESTNET]: {
  //   image: matic,
  //   label: "Polygon Mumbai",
  //   chainId: 80001
  // },
  // [NetworkId.ETHEREUM]: {
  //   image: eth,
  //   label: "Ethereum",
  //   chainId: 1,
  //   url: "https://mainnet.infura.io/v3/0c8149f8e63b4b818d441dd7f74ab618"
  // },
  [NetworkId.BSC]: {
    image: bnb,
    label: "Binance Smart Chain",
    chainId: 56,
    explorer: "https://bscscan.com",
    url: "https://bsc-dataseed1.binance.org",
  },
  [NetworkId.ETC]: {
    image: etc,
    label: "Ethereum Classic",
    chainId: 61,
    explorer: "https://etc.tokenview.com/en", //"https://blockscout.com/etc/mainnet/",
    url: "https://etc.etcdesktop.com",
  },
  [NetworkId.GNOSIS]: {
    image: gnosis,
    label: "Gnosis Chain",
    chainId: 100,
    explorer: "https://xdai.tokenview.com/en", //"https://blockscout.com/xdai/mainnet/",
    url: "https://rpc.gnosischain.com",
  },
  [NetworkId.ETHERGEM]: {
    image: egem,
    label: "Ethergem",
    chainId: 1987,
    explorer: "https://blockscout.egem.io",
    url: "https://lb.rpc.egem.io",
  },
  [NetworkId.AVALANCHE]: {
    image: avax,
    label: "Avalanche",
    chainId: 43114,
    explorer: "https://snowtrace.io",
    url: "https://api.avax.network/ext/bc/C/rpc",
  },
  [NetworkId.RINKEBY]: {
    image: eth,
    label: "Rinkeby",
    chainId: 4,
    explorer: "https://rinkeby.etherscan.io",
    url: "https://rinkeby.infura.io/v3/0c8149f8e63b4b818d441dd7f74ab618",
  },
  [NetworkId.MOONRIVER]: {
    image: moonriver,
    label: "Moonriver",
    chainId: 1285,
    explorer: "https://moonriver.moonscan.io",
    url: "https://rpc.api.moonriver.moonbeam.network",
  },
  [NetworkId.EVMOS]: {
    image: evmos,
    label: "Evmos",
    chainId: 9001,
    explorer: "https://evm.evmos.org",
    url: "https://eth.bd.evmos.org:8545",
  },
  [NetworkId.ARBITRUM]: {
    image: "https://bridge.arbitrum.io/logo.png",
    label: "Arbitrum",
    chainId: 42161,
    explorer: "https://arbiscan.io",
    url: ""
  },
  [NetworkId.OPTIMISM]: {
    image: "https://assets-global.website-files.com/611dbb3c82ba72fbc285d4e2/611fd32ddac3c1856c306c37_optimism%20logo%20icon.svg",
    label: "Optimism",
    chainId: 10,
    explorer: "https://optimistic.etherscan.io",
    url: ""
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
    explorer: "https://goerli.etherscan.io", //"https://zksync2-mainnet.zkscan.io/",
    url: "https://goerli.etherscan.io"
  },
  [NetworkId.SEPOLIA]: {
    image: "/ether.png",
    label: "sepoliaTestnet",
    chainId: 11155111,
    explorer: "https://sepolia.etherscan.io", //"https://zksync2-mainnet.zkscan.io/",
    url: "https://sepolia.etherscan.io/"
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


