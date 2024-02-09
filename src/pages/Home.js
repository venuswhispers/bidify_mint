import React, { useEffect, useRef, useState, useMemo } from "react";
import { NFTStorage } from "nft.storage";
import bannerImg from "../assets/images/heroIllustration.svg";
import bidifyLogo from "../assets/images/bidify.png";
import disturb from "../assets/images/disturb.png";
import preview from "../assets/images/preview.svg";
import mintLogo from "../assets/images/mintlogo.png";
import info from "../assets/images/info.png";
import telegram from "../assets/images/telegram.png";
import tweeter from "../assets/images/tweeter.png";
import facebook from "../assets/images/facebook.png";
import instagram from "../assets/images/instagram.png";
import discord from "../assets/images/discord.png";
import youtube from "../assets/images/youtube.png";
import auction from "../assets/images/auction.png";
import { uploadToPinata } from "../utils/pinata";
import { FetchWrapper } from "use-nft";
import VerticalLinearStepper from "../components/Stepper";
// import { switchNetwork } from "../wallet"
import useWeb3 from "../hooks/useWeb3";


import {
  FACTORY_ADDRESSES,
  NETWORKS,
  supportedChainIds,
  getLogUrl,
  snowApi,
  baseUrl,
  TOKEN_ADDRESSES,
  PINATA_KEY,
} from "../constants/config";
import { ABI, BIDIFY, ERC721_ABI } from "../constants/abis";

import { ethers, Contract } from "ethers";
import { Buffer } from "buffer";
import axios from "axios";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import Terms from "../assets/docs/Bidify_Mint_Terms_and_Conditions.pdf";
import Policy from "../assets/docs/Bidify_Mint_Privacy_Policy.pdf";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { create } from 'ipfs-http-client'
const client = new NFTStorage({ token: PINATA_KEY });

const postUrl = `https://cryptosi.us2.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`;
// const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', apiPath: '/ipfs/api/v0' })

// const transackLogo = "https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=1.25,format=auto/https%3A%2F%2F2568214732-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FyKT7ulakWzij4PDiIp6U%252Ficon%252FTbk5OkyEAiidHiC1yXpm%252FsK_Kgoxa_400x400.jpeg%3Falt%3Dmedia%26token%3Dacdf28e9-2036-4d48-93ce-dbd0eb6f5714"

const Home = () => {
  // const { account, library, activate, deactivate } = useWeb3React();

  const { address, isConnected, isConnecting, isReconnecting, connector, chainId, signer } = useWeb3();// hook address, isconnected, inConnecting.. @dew

  const [buffer, setBuffer] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(1);
  const [forSale, setForSale] = useState(false);
  const [bid, setBid] = useState(0);
  const [endingPrice, setEndingPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [type, setType] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [approving, setApproving] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [transaction, setTransaction] = useState("");
  const [approved, setApproved] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [cost, setCost] = useState(0);
  const [collectionName, setCollectionName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [collections, setCollections] = useState([]);
  const [symbolEditable, setSymbolEditable] = useState(true);
  const [erc721, setErc721] = useState("");
  const [toast, setToast] = useState("");
  const [advanced, setAdvanced] = useState(false);
  const [expand, setExpand] = useState(false);
  const [agree, setAgree] = useState(false);

  const inputFile = React.useRef(null);

  const [bidifyMinter, setBidifyMinter] = useState(null);
  const [bidifyToken, setBidifyToken] = useState(null);

  const [activeStep, setActiveStep] = React.useState(0);
  const [rate, setRate] = React.useState(0);
  // const [email, setEmail] = useState("")

  const [open, setOpen] = useState(false);
  const [openCollection, setOpenCollection] = useState(false);
  const drop = useRef("network");
  const collection = useRef("collection");


  const handleClick = (e) => {
    if (!collection.current) return;
    if (!drop.current) return;
    if (!e.target.closest(`#${collection.current.id}`) && openCollection) {
      setOpenCollection(false);
    }
    if (!e.target.closest(`#${drop.current.id}`) && open) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (toast) {
      setTimeout(() => setToast(""), 5000);
    }
  }, [toast]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  useEffect(() => {
    // if (chainId && chainId !== acceptedChainId) {
    //   switchNetwork?.(acceptedChainId)
    // }
    console.log({ chainId, isConnecting })
  }, [chainId, isConnecting])

  const getLogo = () => {
    return mintLogo;
  };
  const getSymbol = () => {
    // if(chainId === undefined) return ethLogo
    switch (chainId) {
      case 1:
      case 4:
      case 10:
      case 42161:
        return "ETH";
      case 1987:
        return "EGEM";
      case 137:
      case 80001:
        return "MATIC";
      case 43113:
      case 43114:
        // return avaxLogo
        return "AVAX";
      case 56:
        return "BNB";
      case 8217:
        return "KLAY";
      case 100:
        return "XDAI";
      case 61:
        return "ETC";
      case 1285:
        return "MOVR";
      case 9001:
        return "EVMOS";
      case 280:
        return "ETH";
      case 324:
        return "ETH";
      default:
        return "Currency";
    }
  };
  const readImage = (event) => {
    console.log(event.target.files.length)
    if (!event.target.files.length) {
      setBuffer(null);
      inputFile.current.value = "";
      setType("");
      return;
    }
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setType(file.type);
      setBuffer(Buffer(reader.result));
    };
  };

  const getLogs = async () => {
    // const web3 = new Web3(new Web3.providers.HttpProvider(URLS[chainId]));
    const topic0 =
      "0x5424fbee1c8f403254bd729bf71af07aa944120992dfa4f67cd0e7846ef7b8de";
    let logs = [];
    try {
      const ret = await axios.get(
        `${getLogUrl[chainId]}&fromBlock=0&${
          chainId === 9001 || chainId === 100 || chainId === 61
            ? "toBlock=latest&"
            : ""
        }address=${BIDIFY.address[chainId]}&topic0=${topic0}&apikey=${
          snowApi[chainId]
        }`
      );
      logs = ret.data.result;
    } catch (e) {
      setToast(e.message);
      console.log(e.message);
    }
    return logs ? logs.length : 0;
  };
  const checkAllowd = async (address) => {
    console.log(address, BIDIFY.address[chainId])

    try {
      if (!BIDIFY.address[chainId]) {
        throw "No auction for this chain";
      }
      const allowed = await bidifyToken.isApprovedForAll(
        address,
        BIDIFY.address[chainId]
      ).catch(err => {
        console.log("@dew1204/not allowed-------->", err)
        throw "This is not allowed";
      });
      setApproved(allowed);
      setErc721(address);
    } catch (err) {
      setToast(err)
    }
  };
  const signList = async () => {
    setApproving(true);
    try {
      const BidifyToken = new ethers.Contract(
        erc721,
        ERC721_ABI,
        // library.getSigner() @modified by dew
        signer,
      );
      const tx = await BidifyToken.setApprovalForAll(
        BIDIFY.address[chainId],
        true
      );
      console.log("@dew1204/approve --------------->", tx);
      const _tx = await tx.wait();
      console.log("@dew1204/approve --------------->", _tx);
      await checkAllowd(erc721);
      setApproving(false);
    } catch (e) {
      setApproving(false);
      setToast(e.message);
      console.log(e);
    }
  };
  /**
   * upload data to /bidify.org
   * @param {*} data 
   * @param {*} forSale 
   * @dew1204
   */
  const addToDatabase = async (data, forSale) => {
    try {
      if (forSale) {
        await axios.post(`${baseUrl}/admin`, data);
      } else {
        await axios.post(`${baseUrl}/adminCollection`, data);
      }
    } catch (error) {
      setToast(error.message);
    }
  };
  const list = async (token, price, ending, days) => {
    const currency = "0x0000000000000000000000000000000000000000";
    const platform = erc721;
    const Bidify = new ethers.Contract(
      BIDIFY.address[chainId],
      BIDIFY.abi,
      signer, //@dew1204
    );
    try {
      const tx = await Bidify.list(
        currency,
        platform,
        token,
        ethers.utils.parseEther(price.toString()).toString(),
        ethers.utils.parseEther(ending.toString()).toString(),
        days,
        true,
        "0x0000000000000000000000000000000000000000"
      );
      await tx.wait();
    } catch (error) {
      setToast(error.message);
      return console.log("list error", error);
    }
  };
  const getDetailFromId = async (id) => {
    try {
      console.log("checking get detail from id = 1");
      const detail = await getListingDetail(id);
      console.log("checking get detail from id = 2", detail);
      const fetchedValue = await getFetchValues(detail);
      console.log("checking get detail from id = 3", fetchedValue);
      return { ...fetchedValue, ...detail, network: chainId };
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  const getListingDetail = async (id) => {
    const bidify = new ethers.Contract(
      BIDIFY.address[chainId],
      BIDIFY.abi,
      signer //@dew1204
    );
    const raw = await bidify.getListing(id.toString());
    const nullIfZeroAddress = (value) => {
      if (value === "0x0000000000000000000000000000000000000000") {
        return null;
      }
      return value;
    };

    let currency = nullIfZeroAddress(raw.currency);
    let highBidder = nullIfZeroAddress(raw.highBidder);
    let currentBid = raw.price;
    let nextBid = await bidify.getNextBid(id);
    let endingPrice = raw.endingPrice;
    // let decimals = 18;
    if (currentBid.toString() === nextBid.toString()) {
      currentBid = null;
    } else {
      currentBid = ethers.utils.formatEther(currentBid);
    }

    let referrer = nullIfZeroAddress(raw.referrer);
    let marketplace = nullIfZeroAddress(raw.marketplace);

    let bids = [];

    return {
      id,
      creator: raw.creator,
      currency,
      platform: raw.platform,
      token: raw.token.toString(),

      highBidder,
      currentBid,
      nextBid: ethers.utils.formatEther(nextBid),
      endingPrice: ethers.utils.formatEther(endingPrice),

      referrer,
      allowMarketplace: raw.allowMarketplace,
      marketplace,

      endTime: raw.endTime.toString(),
      paidOut: raw.paidOut,
      isERC721: raw.isERC721,

      bids,
    };
  };
  const getFetchValues = async (val) => {
    let provider;
    switch (chainId) {
      case 1:
        provider = new ethers.providers.InfuraProvider(
          "mainnet",
          "0c8149f8e63b4b818d441dd7f74ab618"
        );
        break;
      case 3:
        provider = new ethers.providers.InfuraProvider(
          "ropsten",
          "0c8149f8e63b4b818d441dd7f74ab618"
        );
        break;
      case 4:
        provider = new ethers.providers.InfuraProvider(
          "rinkeby",
          "0c8149f8e63b4b818d441dd7f74ab618"
        );
        break;
      case 5:
        provider = new ethers.providers.InfuraProvider(
          "goerli",
          "0c8149f8e63b4b818d441dd7f74ab618"
        );
        break;
      case 42:
        provider = new ethers.providers.InfuraProvider(
          "kovan",
          "0c8149f8e63b4b818d441dd7f74ab618"
        );
        break;
      case 1987:
      case 43114:
      case 137:
      case 56:
      case 9001:
      case 1285:
      case 61:
      case 100:
        provider = new ethers.providers.JsonRpcProvider(NETWORKS[chainId].url);
        break;
      default:
        console.log("select valid chain");
    }

    const ethersConfig = {
      ethers: { Contract },
      provider: provider,
    };

    const fetcher = ["ethers", ethersConfig];

    function ipfsUrl(cid, path = "") {
      return `https://dweb.link/ipfs/${cid}${path}`;
    }

    function imageurl(url) {
      const check = url.substr(16, 4);
      if (check === "ipfs") {
        const manipulated = url.substr(16, 16 + 45);
        return "https://dweb.link/" + manipulated;
      } else {
        return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      }
    }

    const fetchWrapper = new FetchWrapper(fetcher, {
      jsonProxy: (url) => {
        return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      },
      imageProxy: (url) => {
        return imageurl(url);
      },
      ipfsUrl: (cid, path) => {
        return ipfsUrl(cid, path);
      },
    });
    const result = await fetchWrapper.fetchNft(val?.platform, val?.token);
    const finalResult = {
      ...result,
      platform: val?.platform,
      token: val?.token,
      isERC721: result.owner ? true : false,
    };
    return finalResult;
  };
  /**
   * get Mint const with account
   * @dew1204
   */
  const getCost = async (_bidifyMinter = bidifyMinter) => {
    // console.log(amount)
    try {
      if (!_bidifyMinter) {
        throw "cannot read the bidifyMint contract";
      } 
      const mintCost = await _bidifyMinter.calculateCost(amount).catch(err => { 
        setCost(0);
        throw `err in contract.calculateCost call ${chainId}`; 
      });
      console.log("@dew1204/mint const ---------->", mintCost);
      setCost(mintCost);
    } catch (err) {
      console.log("@dew1204/getCost ----------->", err);
    }
  };
  /**
   * get Collections with account
   * @dew1204
   */
  const getCollectionsData = async (_bidifyMinter = bidifyMinter) => {
    // @modified by dew
    try {
      if (!_bidifyMinter) {
        throw "cannot read the bidifyMint contract";
      }
      const collections = await _bidifyMinter.getCollections().catch(err => { throw `err in contract.getCollections call ${chainId}` });
      console.log("@dew1204 collections ------------->", collections);
      setCollections(collections);
    } catch (err) {
      console.log("@dew1204/getCollectionsData ------->", err);
      setCollections([]);
    }
  };

  useEffect(() => {
    console.log("@dew1204/current web3 data ------------>", { address, chainId, factory: FACTORY_ADDRESSES[chainId] });

    if (address && FACTORY_ADDRESSES[chainId] && signer) {
      const _bidifyMinter = new ethers.Contract(FACTORY_ADDRESSES[chainId], ABI, signer);
      const _bidifyToken = new ethers.Contract(address, ERC721_ABI, signer);
      setBidifyToken(_bidifyToken);
      setBidifyMinter(_bidifyMinter);
      getCost(_bidifyMinter);
      getCollectionsData(_bidifyMinter);
    } else {
      setBidifyMinter(null);
      setBidifyToken(null);
    }

  }, [address, chainId, signer]);

  /**
   * validate if all input fields are valid
   * @dew1204
   */
  const filterFormFields = () => {
    if (!buffer) {
      // throw "Upload data for minting NFT";
    } else if (!name) {
      throw "Input name for NFT";
    } else if (!description) {
      throw "Input description for NFT";
    } else if (advanced && !collectionName) {
      throw "Input collection Name";
    } else if (advanced && !symbol) {
      throw "Input symbol";
    } else if (amount < 1) {
      throw "invalid amount";
    }
  }

  const onSubmit = async () => {

    console.log("@dew1204/onSubmit-------------->", { address: address, chainId: chainId, signer: signer, factory: FACTORY_ADDRESSES[chainId] });

    try {

      if (!isConnected) {
        throw "Connect wallet before start.";
      } else if (!bidifyMinter) {
        throw "Can't not read contract, please reconnect the wallet"
      }
      
      filterFormFields(); //filters all fields are valid

      setIsLoading(true);
      setActiveStep(0);
      setRate(0);

      const bufferData = Buffer.from(buffer); // Replace with your actual buffer data
      const blob = new Blob([bufferData]);

      const _data = await uploadToPinata(
        blob,
        ({loaded, total}) => { 
          setRate(Math.floor(loaded * 100 / total))
        }
      ).catch(err => {
        console.log(err);
        throw "File upload failed to IPFS. Please retry.";
      });
      
      setActiveStep(1);
      setRate(0);

      const imageUrl = `https://ipfs.io/ipfs/${_data.IpfsHash}`; //https://ipfs.io/ipfs/${cid} @dew1204
      console.log({imageUrl})

      const _metaData = await uploadToPinata(
        new File(
          [
            JSON.stringify({
              name: name,
              description: description,
              assetType: "image",
              image: imageUrl,
            })
          ], "metadata.json"
        ),
        ({loaded, total}) => { 
          setRate(Math.floor(loaded * 100 / total))
        }
      ).catch(err => {
        console.log(err);
        throw "Metadata upload failed to IPFS. Please retry.";
      });
      
      setActiveStep(2);
      setRate(0);
      
      const metadataUrl = `https://ipfs.io/ipfs/${_metaData.IpfsHash}`;
      // const metadataUrl = `https://ipfs.io/ipfs/${_metaData.IpfsHash}/metadata.json`;
      console.log({metadataUrl});

    
      const dataToDatabase = {
        description: description,
        image: imageUrl,
        metadataUrl: metadataUrl,
        name: name,
        owner: address,
        platform: erc721,
        network: chainId,
        isERC721: true,
      };
      const tokenURIJson = metadataUrl;

      
      let platform = ethers.constants.AddressZero;
      for (let i = 0; i < collections.length; i++) {
        if (collections[i].name === collectionName)
          platform = collections[i].platform;
      }
      
      let exist = platform === ethers.constants.AddressZero ? false : true;
      if (!advanced) exist = true;
      const mintCost = await bidifyMinter.calculateCost(amount).catch(err => {
        console.log(err);
        throw "Mint cost calculation failed.";
      });

      console.log("@dew1204 mint cost--------------->", { tokenURIJson, amount, mintCost });

      console.log("------------", {
        uri: tokenURIJson.toString(),
        amount,
        collectionName: advanced ? collectionName : "TOKEN_ADDRESSES BidifyMint Nft",
        symbol: advanced ? symbol : "SBN",
        platform: advanced ? platform : TOKEN_ADDRESSES[chainId],
        addition: {
          value: mintCost,
          from: address,
          gasLimit: 3000000,
          gasPrice: 3000000,
        },
      });
      // const tx = await bidifyMinter.mint(tokenURIJson.toString(), amount, advanced ? collectionName : "TOKEN_ADDRESSES BidifyMint Nft", advanced ? symbol : "SBN", advanced ? platform : TOKEN_ADDRESSES[chainId], { value: mintCost, from: account, gasLimit:3000000, gasPrice:3000000})
      console.log("@dew1204 ----------->", platform, advanced, advanced ? platform : TOKEN_ADDRESSES[chainId]);
      console.log("@dew1204mint-------->", {
        uri:tokenURIJson.toString(),
        amount,
        collection: advanced ? collectionName : "TOKEN_ADDRESSES BidifyMint Nft",
        symbol: advanced ? symbol : "SBN",
        platform: advanced ? platform : TOKEN_ADDRESSES[chainId],
        etc: chainId === 137 ? { value: mintCost, from: address, gasLimit: 285000, gasPrice: ethers.utils.parseUnits('300', 'gwei') } :
        { value: mintCost, from: address }
      });

      const tx = await bidifyMinter.mint(
        tokenURIJson.toString(),
        amount,
        advanced ? collectionName : "TOKEN_ADDRESSES BidifyMint Nft",
        advanced ? symbol : "SBN",
        advanced ? platform : TOKEN_ADDRESSES[chainId],
        chainId === 137 ? { value: mintCost, from: address, gasLimit: 285000, gasPrice: ethers.utils.parseUnits('300', 'gwei') } :
        { value: mintCost, from: address }
      ).catch(err => {
        console.log(err);
        throw "NFT mint failed.";
      });
      console.log("tx---------------->", tx);
      const txHash = await tx.wait().catch(err => {
        console.log(err);
        throw "Getting transaction failed.";
      });
      // await signList()
      setTransaction(txHash.transactionHash);
      if (!exist) {
        txHash.events.shift();
      }
      // console.log('txHash', txHash)
      let tokenIds = [];
      // if (chainId === 4 || chainId === 43114 || chainId === 56 || chainId === 100 || chainId === 61 || chainId === 1285 || chainId === 9001 || chainId === 10 || chainId === 42161) {
      // }
      console.log("@dew1204 tx event ------------->", txHash.events);
      if (chainId === 137) { //if polygon
        txHash.events.forEach(item => {
          if (item.data === "0x") {
            const hex = item.topics[3];
            tokenIds.push(Number(ethers.utils.hexValue(hex)));
          }
        })
      } else {
        tokenIds = txHash.events.map((event) => {
          console.log(event)
          const hex = event.topics.length > 1 ? event.topics[3] : event.topics[0];
          return Number(ethers.utils.hexValue(hex));
        });
      }
      console.log("@dew1204 tokenIds --------------->", tokenIds);
      setActiveStep(3);
      setRate(0);

      if (forSale) {
        const totalCount = await getLogs();
        if (totalCount > 0) {
          const latestDetail = await getDetailFromId(
            (totalCount - 1).toString()
          );
          console.log(latestDetail);
        }
        console.log(tokenIds, totalCount);
        for (let i = 0; i < tokenIds.length; i++) {
          await list(tokenIds[i].toString(), bid, endingPrice, duration);
        }
        while (
          (await getDetailFromId(
            (totalCount + tokenIds.length - 1).toString()
          )) === null
        ) {
          console.log("while loop: delaying");
        }

        setActiveStep(4);
        setRate(0);

        const pData = [];
        try {
          for (let i = 0; i < tokenIds.length; i++) {
            const listingDetail = getDetailFromId((i + totalCount).toString());
            pData.push(listingDetail);
          }
        } catch (e) {
          console.log(e.message ? e.message : e);
        }
        const data = await Promise.all(pData);
        console.log("data from chain", data);
        
        //save data to db @dew1204
        await axios.post(`${baseUrl}/admin`, data, {
          onUploadProgress: ({loaded, total}) => { 
            setRate(Math.floor(loaded * 100 / total));
          }
        }).catch(err => {
          console.log(err);
          throw "Database saving failed."
        })
      } else {
        const data = [];
        for (let i = 0; i < tokenIds.length; i++) {
          data.push({ ...dataToDatabase, token: tokenIds[i].toString() });
        }

        //await addToDatabase(data, forSale);
        //save data to DB @dew1204
        await axios.post(`${baseUrl}/adminCollection`, data, {
          onUploadProgress: ({loaded, total}) => { 
            setRate(Math.floor(loaded * 100 / total))
          }
        }).catch(err => {
          console.log(err)
          throw "Database saving failed."
        });
      }

      setShowAlert(true);
      getCollectionsData();
      if (type === "") {
        setType("none");
      }
    } catch (err) {
      if (err.message) {
        setToast(err.message);
      } else {
        setToast(err);
      }
      console.log("err", err);
    } finally {
      setIsLoading(false);
      setActiveStep(0);
      setRate(0);

      // setBuffer(null);
      // inputFile.current.value = "";
      setType("");
    }
  };

  useEffect(() => {
    let exist = false;

    const _collection = collections.find(item => item.name === collectionName);
    if (_collection) {
      exist = true;
      setSymbol(_collection.symbol);
      if (chainId !== 10 || chainId !== 42161) {
        // setErc721(_collection.platform);
        checkAllowd(_collection.platform);
      }
    } else {
      setSymbolEditable(true);
      setSymbol("");
      setErc721("");
      setApproved(false);
      setForSale(false);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName, chainId]);
  
  const handleSelectCollection = (item) => {
    console.log(item)
    setSymbolEditable(false);
    setOpenCollection(false);
    setCollectionName(item.name);
    setSymbol(item.symbol);
    // if (chainId !== 10 || chainId !== 42161) setErc721(item.platform);
  };
  const handleDismiss = () => {
    setBuffer(null);
    inputFile.current.value = "";//@dew1204 rest file input

    setType(null);
    setName("");
    setCollectionName("");
    setSymbol("");
    setAmount(1);
    setDescription("");
    setBid(0);
    setDuration(0);
    setShowAlert(false);
  };
  const CustomForm = ({ status, message, onValidated }) => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      email &&
        email.indexOf("@") > -1 &&
        onValidated({
          EMAIL: email,
        });
    };

    return (
      <form
        className="flex flex-col items-center w-full gap-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex w-full gap-2">
          <input
            type="email"
            name="email"
            className="rounded-lg flex-grow min-w-[140px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="flex items-center h-[48px] text-white bg-[#e48b24] hover:bg-[#f7a531] focus:ring-4 focus:ring-[#f7b541] font-medium rounded-lg text-sm px-4 py-2 text-center"
            type="submit"
          >
            Subscribe
          </button>
        </div>
        {status === "sending" && (
          <div className="text-[#F09132]">sending...</div>
        )}
        {status === "error" && (
          <div
            className="text-[#da4141]"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === "success" && (
          <div
            className="text-[#3ac662]"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
      </form>
    );
  };
  const _renderSucessModal = () => {
    return (
      <div className="overflow-y-auto overflow-x-hidden fixed w-full bg-[rgba(0,0,0,0.4)] h-[100vh] flex justify-center items-start top-0 right-0 left-0 z-[999999]">
        <div className="relative w-full h-auto max-w-4xl p-4 mx-2 sm:mt-8">
          <div className="relative my-auto bg-[#DCDAE9] rounded-3xl shadow-lg dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={handleDismiss}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="p-6 pb-0 text-center">
              <img
                className="mx-auto -mt-12 mb-8 w-12 h-12 bg-[#FFEAD6] rounded-full p-2 text-gray-400 dark:text-gray-200"
                src={bidifyLogo}
                alt="logo"
              />
              <h3 className="mb-5 text-xl font-medium text-[#F09132] ">
                Congratulations on your newly Minted NFT
              </h3>
              <a
                href={`${NETWORKS[chainId].explorer}/tx/${transaction}`}
                target="_blank"
                rel="noreferrer"
                className="self-center mt-4 text-white bg-[#e48b24] hover:bg-[#f7a531] focus:ring-4 focus:ring-[#f7b541] font-medium rounded-lg text-sm px-8 mx-auto py-2.5 text-center"
              >
                View Transaction
              </a>
              <img
                className={`mt-8 min-w-[240px] max-w-[240px] mx-auto rounded-lg ${
                  buffer ? "" : "animate-pulse"
                }`}
                src={
                  buffer
                    ? `data:${type};base64,${buffer.toString("base64")}`
                    : preview
                }
                alt="preview"
              />
              <p className="text-xl mt-4 font-bold tracking-tight break-words text-[#AA5E0D]">
                {name}
              </p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <p className="text-[#F09132]">Share with the world</p>
                <a
                  href={`https://twitter.com/intent/tweet?url=${NETWORKS[chainId].explorer}/tx/${transaction}&text=Please%20check%20out%20this%20${NETWORKS[chainId]?.label}%20NFT%20I%20just%20minted%20on%20mint.bidify.org`}
                >
                  <img src={tweeter} alt="social" />
                </a>
                {/* Please%20check%20out%20this%20${NETWORKS[chainId].label}%20NFT%20I%20just%20minted%20on%20mint.bidify.org */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${NETWORKS[chainId].explorer}/tx/${transaction}&quote=Please%20check%20out%20this%20${NETWORKS[chainId]?.label}%20NFT%20I%20just%20minted%20on%20mint.bidify.org`}
                >
                  <img src={facebook} alt="social" />
                </a>
                <a
                  href={`https://t.me/share/url?url=${NETWORKS[chainId].explorer}/tx/${transaction}&text=Please%20check%20out%20this%20${NETWORKS[chainId]?.label}%20NFT%20I%20just%20minted%20on%20mint.bidify.org`}
                >
                  <img src={telegram} alt="social" />
                </a>
              </div>
            </div>

            <div className="flex flex-col py-2 mt-2 border border-transparent border-t-slate-400 border-t-1">
              <button
                className="self-center text-[#e48b24] fill-[#e48b24] hover:text-[#f7a531] hover:fill-[#f7a531] focus:ring-2 focus:ring-[#f7b541] font-medium rounded-lg text-sm px-8 mx-auto py-2.5 text-center flex items-center"
                onClick={() => setExpand((value) => !value)}
              >
                {!expand ? "Expand" : "Hide"}
                {!expand ? (
                  <svg
                    viewBox="0 0 24 24"
                    color="text"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path>
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    color="text"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.11997 14.7101L12 10.8301L15.88 14.7101C16.27 15.1001 16.9 15.1001 17.29 14.7101C17.68 14.3201 17.68 13.6901 17.29 13.3001L12.7 8.7101C12.31 8.3201 11.68 8.3201 11.29 8.7101L6.69997 13.3001C6.30997 13.6901 6.30997 14.3201 6.69997 14.7101C7.08997 15.0901 7.72997 15.1001 8.11997 14.7101Z"></path>
                  </svg>
                )}
              </button>
              {expand && (
                <div className="flex flex-col justify-between w-full gap-6 px-6 py-2 sm:flex-row">
                  <div className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-3">
                      <p className="text-[#e48b24]">Follow our socials:</p>
                      <a
                        href="https://twitter.com/Crypto_SI"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img className="w-[24px]" src={tweeter} alt="social" />
                      </a>
                      <a
                        href="https://www.instagram.com/cryptosi.eth"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className="w-[24px]"
                          src={instagram}
                          alt="social"
                        />
                      </a>
                      <a
                        href="https://www.youtube.com/channel/UCcOzf3f6ZWVlIu-6qQpjudA"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img className="w-[28px]" src={youtube} alt="social" />
                      </a>
                    </div>
                    <a
                      className="flex items-center text-white bg-[#e48b24] hover:bg-[#f7a531] focus:ring-4 focus:ring-[#f7b541] font-medium rounded-lg text-sm px-4 py-2 text-center"
                      href="https://discord.bidify.org"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        className="mt-1 w-[28px]"
                        src={discord}
                        alt="social"
                      />
                      Join our Discord
                    </a>
                  </div>
                  <div className="flex flex-col items-center w-full gap-3 sm:w-auto">
                    <p className="text-[#e48b24] h-[28px]">
                      Join our email list for future updates
                    </p>
                    <MailchimpSubscribe
                      url={postUrl}
                      render={({ subscribe, status, message }) => (
                        <CustomForm
                          status={status}
                          message={message}
                          onValidated={(formData) => subscribe(formData)}
                        />
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="z-[9999] md:hidden fixed gap-3 right-[20px] bottom-[50px] flex flex-col items-center">
        <a
          href="https://bidify.org"
          target="_blank"
          rel="noreferrer"
          className="items-center gap-1 p-3 text-lg font-medium text-white bg-[#f78410] rounded-full flex"
        >
          <img
            className="h-[30px] w-[30px] invert"
            src={auction}
            alt="auction"
          />
        </a>
        <a
          className="flex gap-2 items-center p-3 rounded-full bg-[#f78410]"
          href="https://youtu.be/QnmIbgLfC1Y"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            className="h-[30px] w-[30px]"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="10 8 16 12 10 16 10 8"></polygon>
          </svg>
        </a>
      </div>
      {/* <span className="flex w-3 h-3">
                
            </span> */}
      <div className="fixed w-full flex justify-between py-1 px-4 items-center shadow-xl z-[999999] bg-[#0000003d] backdrop-filter backdrop-blur-[8px]">
        <img
          className="max-h-[40px] sm:max-h-[75px]"
          src={getLogo()}
          alt="logo"
        />
        <div className="flex gap-0 my-0 sm:my-3 sm:gap-4">
          <ConnectButton></ConnectButton>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#e48b24] to-[#85623a] flex items-center justify-between px-4 pt-6 md:pt-24 pb-1 md:pb-0">
        <div className="flex flex-col items-start ml-12">
          <span className="text-white text-4xl font-bold max-w-[650px] leading-normal lg:block hidden">
            Mint and List Nfts on Multiple Network
          </span>
          <div className="flex items-center gap-3">
            <a
              href="https://bidify.cloud"
              target="_blank"
              rel="noreferrer"
              className="items-center hidden gap-1 px-6 py-4 mt-4 mb-12 text-lg font-medium text-white bg-black rounded-lg md:flex hover:bg-gray-700"
            >
              Explore Marketplace
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
            </a>
            <a
              className="hidden md:flex gap-2 mt-4 mb-12 items-center px-3 py-[10px] rounded-lg hover:bg-[#ffffff33]"
              href="https://youtu.be/QnmIbgLfC1Y"
              target="popup"
              onClick={() =>
                window.open(
                  "https://youtu.be/QnmIbgLfC1Y",
                  "Watch Tutorial",
                  "width=800,height=600"
                )
              }
              rel="noreferrer"
            >
              <svg
                className="h-[40px] w-[40px]"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
              </svg>
              <p className="text-lg font-medium">Watch Tutorial</p>
            </a>
          </div>
        </div>
        <img
          className="min-w-[100px] lg:min-w-[400px] mb-12 mr-12 non-movable"
          src={bannerImg}
          alt="hero"
        />
      </div>
      <div className="mx-2 sm:mx-16 shadow-xl rounded-lg py-4 mb-8 mt-[-70px] md:mt-[-80px] bg-white z-33">
        <div className="flex flex-col-reverse items-center max-w-5xl gap-4 px-6 mx-auto mb-8 md:flex-row">
          <div className="flex flex-col items-center w-full">
            <span className="text-4xl text-[#e48b24] font-bold">Preview</span>
            <div className="max-w-sm mt-8 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <img
                className={`rounded-t-lg ${buffer ? "" : "animate-pulse"}`}
                src={
                  buffer
                    ? `data:${type};base64,${buffer.toString("base64")}`
                    : preview
                }
                alt="preview"
              />
              <div className="flex flex-col gap-4 p-5">
                {name ? (
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 break-words dark:text-white">
                    {name}
                  </h5>
                ) : (
                  <div className="w-1/2 animate-pulse min-h-[20px] bg-gray-300 rounded-full"></div>
                )}
                {description ? (
                  <pre className="font-normal text-gray-700 break-words whitespace-pre-wrap dark:text-gray-400">
                    {description}
                  </pre>
                ) : (
                  <div className="flex flex-col gap-2 animate-pulse">
                    <div className="w-full min-h-[15px] bg-gray-300 rounded-full"></div>
                    <div className="w-1/2 min-h-[15px] bg-gray-300 rounded-full"></div>
                    <div className="w-full min-h-[15px] bg-gray-300 rounded-full"></div>
                  </div>
                )}
                {forSale && (
                  <div className="flex justify-between">
                    {bid ? (
                      <span className="">
                        {bid} {getSymbol()}
                      </span>
                    ) : (
                      <div className="w-[50px] animate-pulse min-h-[15px] bg-gray-300 rounded-full"></div>
                    )}
                    {duration ? (
                      <span className="">{duration} Days</span>
                    ) : (
                      <div className="w-[50px] animate-pulse min-h-[15px] bg-gray-300 rounded-full"></div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <p className="mt-4 self-center sm:hidden text-[#e48b24] flex items-center gap-1">
              fee ={" "}
              {Number(cost) > 0
                ? `${ethers.utils.formatEther(cost)} ${getSymbol()}`
                : "N/A"}
              <img
                data-tooltip-target="tooltip-fee"
                className="w-[15px] h-[15px]"
                src={info}
                alt="info"
              />
            </p>
            {chainId !== undefined && (
              <label className="block mt-3 text-sm font-medium text-center text-gray-900 sm:hidden dark:text-gray-300">
                You don't have any {getSymbol(chainId)}?
                <button
                  className="text-[#e48b24]"
                  onClick={() =>
                    window.open(
                      process.env.REACT_APP_TRANSACK_URL,
                      "Buy Token",
                      "width=800,height=600,popup"
                    )
                  }
                >
                  Buy Crypto
                </button>
              </label>
            )}
            <button
              type="submit"
              className={`flex sm:hidden items-center justify-center self-center w-3/4 mt-4 text-white focus:ring-4 focus:ring-[#f7b541] font-medium rounded-lg text-sm px-12 py-2.5 text-center dark:bg-[#f7a531] dark:hover:bg-[#f7b541] dark:focus:ring-[#f7b541] ${
                agree && !isLoading
                  ? "bg-[#e48b24] hover:bg-[#f7a531]"
                  : "pointer-events-none bg-gray-500"
              }`}
              onClick={onSubmit}
            >
              {isLoading && (
                <svg
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              {advanced ? "Mint Advanced NFT" : "Mint TOKEN_ADDRESSES NFT"}
            </button>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-center w-full mt-8">
              <span className="ml-3 mr-3 text-lg font-medium text-gray-900 dark:text-gray-300">
                TOKEN_ADDRESSES
              </span>
              <label
                htmlFor="yellow-toggle"
                className="relative inline-flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  onChange={(e) => {
                    setAdvanced(e.target.checked);
                  }}
                  id="yellow-toggle"
                  className="sr-only peer"
                  checked={advanced}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
              </label>
              <span className="ml-3 text-lg font-medium text-gray-900 dark:text-gray-300">
                Advanced
              </span>
            </div>
            {/* File Upload */}
            <label
              className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="user_avatar"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              type="file"
              ref={inputFile}
              accept="image/png, image/gif, image/jpeg"
              onChange={readImage}
            />
            {/* Title */}
            <label
              htmlFor="title"
              className="flex items-center gap-1 mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Title
              <img
                data-tooltip-target="tooltip-title"
                className="w-[15px] h-[15px]"
                src={info}
                alt="info"
              />
            </label>
            <div
              id="tooltip-title"
              role="tooltip"
              className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-[#e48b24] rounded-lg shadow-sm opacity-0 transition-opacity max-w-sm duration-300 tooltip dark:bg-gray-700"
            >
              The name of your NFT
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <input
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#e48b24] focus:border-[#e48b24] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#e48b24] dark:focus:border-[#e48b24]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* Collection */}
            {advanced && (
              <div className="flex gap-2 mt-4">
                <div className="flex-col flex-grow">
                  <label
                    htmlFor="collection"
                    className="flex items-center gap-1 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Collection
                    <img
                      data-tooltip-target="tooltip-collection"
                      className="w-[15px] h-[15px]"
                      src={info}
                      alt="info"
                    />
                  </label>
                  <div
                    id="tooltip-collection"
                    role="tooltip"
                    className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-[#e48b24] rounded-lg shadow-sm opacity-0 transition-opacity max-w-sm duration-300 tooltip dark:bg-gray-700"
                  >
                    You may name your collection if you intend to mint multiple
                    NFTs belonging to the same collection (Case Sensitive)
                    <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                  <div
                    className="relative flex"
                    // ref={collection}
                    id="collection"
                  >
                    <input
                      type="text"
                      onClick={() => setOpenCollection(true)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#e48b24] focus:border-[#e48b24] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#e48b24] dark:focus:border-[#e48b24]"
                      value={collectionName}
                      onChange={(e) => setCollectionName(e.target.value)}
                    />
                    {openCollection && (
                      <div className="z-10 mr-2 text-base list-none bg-white w-full absolute top-[45px] rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                        <ul
                          className="w-full py-0"
                          aria-labelledby="collectionField"
                        >
                          {collections
                            .filter((item) =>
                              item.name
                                .toLowerCase()
                                .includes(collectionName.toLowerCase())
                            )
                            .map((item) => {
                              // const network = NETWORKS[networkId]
                              return (
                                <li key={item.platform}>
                                  <span
                                    onClick={() => handleSelectCollection(item)}
                                    className="flex items-center w-full gap-2 px-4 py-1 text-gray-700 cursor-pointer text-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                  >
                                    {item.name}
                                  </span>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-col">
                  <label
                    htmlFor="symbol"
                    className="flex items-center gap-1 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Symbol
                    <img
                      data-tooltip-target="tooltip-symbol"
                      className="w-[15px] h-[15px]"
                      src={info}
                      alt="info"
                    />
                  </label>
                  <div
                    id="tooltip-symbol"
                    role="tooltip"
                    className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-[#e48b24] rounded-lg shadow-sm opacity-0 transition-opacity max-w-sm duration-300 tooltip dark:bg-gray-700"
                  >
                    Your collection should have a shortened 4 letter name
                    <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                  <input
                    type="text"
                    id="symbol"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#e48b24] focus:border-[#e48b24] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#e48b24] dark:focus:border-[#e48b24]"
                    onChange={(e) => setSymbol(e.target.value)}
                    maxLength={4}
                    value={symbol}
                    disabled={!symbolEditable}
                  />
                </div>
              </div>
            )}
            {/* Description     */}
            <label
              htmlFor="message"
              className="flex items-center gap-1 mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Description
              <img
                data-tooltip-target="tooltip-description"
                className="w-[15px] h-[15px]"
                src={info}
                alt="info"
              />
            </label>
            <div
              id="tooltip-description"
              role="tooltip"
              className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-[#e48b24] rounded-lg shadow-sm opacity-0 transition-opacity max-w-sm duration-300 tooltip dark:bg-gray-700"
            >
              Description of your NFT, here you may include information about
              the image, the inspiration and the meaning of your NFT
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#e48b24] focus:border-[#e48b24] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#e48b24] dark:focus:border-[#e48b24]"
              placeholder=""
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            {/* Amount */}
            <label
              htmlFor="amount"
              className="flex items-center gap-1 mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Quantity{" "}
              <img
                data-tooltip-target="tooltip-amount"
                className="w-[15px] h-[15px]"
                src={info}
                alt="info"
              />
            </label>
            <div
              id="tooltip-amount"
              role="tooltip"
              className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-[#e48b24] rounded-lg shadow-sm opacity-0 transition-opacity max-w-sm duration-300 tooltip dark:bg-gray-700"
            >
              The amount of NFTs to be minted, example choosing 4 will mint 4
              identical NFTs
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <input
              type="number"
              id="amount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#e48b24] focus:border-[#e48b24] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#e48b24] dark:focus:border-[#e48b24]"
              onChange={(e) => setAmount(Number(e.target.value))}
              defaultValue={1}
              min={1}
            />
            {/* Is for Sale     */}
            {erc721 && advanced && (
              <div className="flex items-center mt-4">
                <input
                  id="checkbox-3"
                  aria-describedby="checkbox-3"
                  type="checkbox"
                  className="w-4 h-4 text-[#e48b24] bg-gray-100 rounded border-gray-300 focus:ring-[#e48b24] dark:focus:ring-[#e48b24] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e) => setForSale(e.target.checked)}
                />
                <label
                  htmlFor="checkbox-3"
                  className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Is For Sale?
                </label>
              </div>
            )}
            {/* Initial Bid     */}
            {forSale && !approved && (
              <button
                type="submit"
                className="flex items-center justify-center mt-8 text-white bg-[#e48b24] hover:bg-[#f7a531] focus:ring-4 focus:ring-[#f7b541] font-medium rounded-lg text-sm px-12 py-2.5 text-center dark:bg-[#f7a531] dark:hover:bg-[#f7b541] dark:focus:ring-[#f7b541]"
                onClick={signList}
                disabled={approving}
              >
                {approving && (
                  <svg
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                Approve
              </button>
            )}
            {/* Initial bid */}
            {forSale && approved && (
              <div className="flex">
                <span className="min-w-[128px] text-center mt-4 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  Initial Bid
                </span>
                <input
                  type="number"
                  id="website-admin"
                  className="mt-4 rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-[#e48b24] focus:border-[#e48b24] block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#e48b24] dark:focus:border-[#e48b24]"
                  onChange={(e) => setBid(e.target.value)}
                />
              </div>
            )}
            {/* Buy it now price */}
            {forSale && approved && (
              <div className="flex">
                <span className="min-w-[128px] text-center mt-4 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  Buy It Now Price
                </span>
                <input
                  type="number"
                  id="website-admin"
                  className="mt-4 rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-[#e48b24] focus:border-[#e48b24] block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#e48b24] dark:focus:border-[#e48b24]"
                  onChange={(e) => setEndingPrice(e.target.value)}
                />
              </div>
            )}
            {/* Auction Length     */}
            {forSale && approved && (
              <div className="flex">
                <span className="min-w-[128px] text-center mt-4 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  Auction Length
                </span>
                <input
                  type="number"
                  id="website-admin"
                  className="mt-4 rounded-none bg-gray-50 border border-gray-300 text-gray-900 focus:ring-[#e48b24] focus:border-[#e48b24] block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#e48b24] dark:focus:border-[#e48b24]"
                  onChange={(e) => setDuration(e.target.value)}
                />
                <span className="inline-flex items-center px-3 mt-4 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  Days
                </span>
              </div>
            )}
            {/* Terms and conditions and Privacy Policy */}
            <div className="flex items-center mt-6">
              <input
                id="checkbox-3"
                aria-describedby="checkbox-3"
                type="checkbox"
                className="w-4 h-4 text-[#e48b24] bg-gray-100 rounded border-gray-300 focus:ring-[#e48b24] dark:focus:ring-[#e48b24] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label
                htmlFor="checkbox-3"
                className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                I agree to Bidify Mint's{" "}
                <a
                  className="text-[#e48b24]"
                  href={Terms}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Terms &amp; Conditions
                </a>{" "}
                and{" "}
                <a
                  className="text-[#e48b24]"
                  href={Policy}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>
            <div className="flex items-center justify-center gap-1 mt-4">
              <label className="self-center hidden sm:block text-[#e48b24]">
                fee ={" "}
                {Number(cost) > 0
                  ? `${ethers.utils.formatEther(cost)} ${getSymbol()}`
                  : "N/A"}
              </label>
              <img
                data-tooltip-target="tooltip-fee"
                className="w-[15px] h-[15px] hidden sm:block"
                src={info}
                alt="info"
              />
            </div>
            <div
              id="tooltip-fee"
              role="tooltip"
              className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-[#e48b24] rounded-lg shadow-sm opacity-0 transition-opacity max-w-sm duration-300 tooltip dark:bg-gray-700"
            >
              This fee does not include the network fee, which is usually very
              small (except eth), the final fee will be displayed in your
              metamask
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            {chainId !== undefined && (
              <label className="hidden mt-3 text-sm font-medium text-center text-gray-900 sm:block dark:text-gray-300">
                You don't have any {getSymbol(chainId)}?{" "}
                <button
                  className="text-[#e48b24]"
                  href="#"
                  rel="noopener noreferrer"
                  onClick={() =>
                    window.open(
                      process.env.REACT_APP_TRANSACK_URL,
                      "Buy Token",
                      "width=800,height=600"
                    )
                  }
                >
                  Buy Crypto
                </button>
              </label>
            )}
            <button
              type="submit"
              className={`hidden sm:flex items-center justify-center self-center w-full mt-2 text-white  focus:ring-4 focus:ring-[#f7b541] font-medium rounded-lg text-sm px-12 py-2.5 text-center dark:bg-[#f7a531] dark:hover:bg-[#f7b541] dark:focus:ring-[#f7b541] ${
                agree && !isLoading
                  ? "bg-[#e48b24] hover:bg-[#f7a531]"
                  : "pointer-events-none bg-gray-500"
              }`}
              onClick={onSubmit}
            >
              {isLoading && (
                <svg
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              {advanced ? "Mint Advanced NFT" : "Mint TOKEN_ADDRESSES NFT"}
            </button>

            {isLoading && <VerticalLinearStepper activeStep={activeStep} forSale={forSale} rate={rate} chain={NETWORKS[chainId].label}/>}
          </div>
        </div>
      </div>
      {toast && (
        <div
          className={`w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400 fixed top-24 right-5`}
          role="alert"
        >
          <div className="flex">
            <div className="ml-3 text-sm font-normal">
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {toast}
                </span>
              </div>
              {/* <div className="mt-2 text-sm font-normal">{toast}</div> */}
            </div>
            <button
              onClick={() => setToast("")}
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
      {showAlert && _renderSucessModal()}
    </div>
  );
};

export default Home;
