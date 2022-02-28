import React, { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import abi from "./utils/HOA.json";
import "./App.css";
import Carousel from "./Carousel";
import Footer from "./Footer";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const contractAddress = "0x14797D04C94558ab0DD0F76E52490eef2A4542B8";

  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      /*
       * First make sure we have access to window.ethereum
       */
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
       * Check if we're authorized to access the user's wallet
       */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain " + chainId);

      // String, hex code of the chainId of the Rinkebey test network
      const rinkebyChainId = "0x4";
      if (chainId !== rinkebyChainId) {
        alert("You are not connected to the Rinkeby Test Network!");
      }

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const functionCall = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const HOAContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let count = await HOAContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Setup our listener.
  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        // THIS IS THE MAGIC SAUCE.
        // This will essentially "capture" our event when our contract throws it.
        // If you're familiar with webhooks, it's very similar to that!
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber());
          alert(
            `Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${contractAddress}/${tokenId.toNumber()}`
          );
        });

        console.log("Setup event listener!");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const mintNft = async () => {
    // try {
    //   const { ethereum } = window;
    //   if (ethereum) {
    //     const provider = new ethers.providers.Web3Provider(ethereum);
    //     const signer = provider.getSigner();
    //     const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);
    //     console.log("Going to pop wallet now to pay gas...")
    //     //mint NFT
    //     // let nftTxn = await connectedContract.makeAnEpicNFT();
    //     console.log("Mining...please wait.")
    //     setIsClaiming(true);
    //     // await nftTxn.wait();
    //     // console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
    //     setIsClaiming(false);
    //   } else {
    //     console.log("Ethereum object doesn't exist!");
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  };

  /*
   * This runs our function when the page loads.
   */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="mainContainer">
      <section className="one">
        <div className="dataContainer">
          <span className="center">
            <img className="circle" src="/android-chrome-192x192.png" />
          </span>
          <div className="header">Hall Of Apes</div>
          {!currentAccount ? (
            <a className="connBtn" onClick={connectWallet}>
              Connect Wallet
            </a>
          ) : (
            <div className="mint-nft">
              <h1>Mint your free Hall Of Apes Membership NFT</h1>
              <a
                className="connBtn"
                disabled={isClaiming}
                onClick={() => mintNft()}
              >
                {isClaiming ? "Minting..." : "Mint your APE"}
              </a>
            </div>
          )}
        </div>
      </section>
      {currentAccount ? (<div><section className="two">
        <img className="roadMap" src="./BizziesNFT_2022_Roadmap.png"></img>
      </section>
      <section className="three" aria-label="Gallery">
        <div className="collectionTitle">
          <h1>Bizzies Collection</h1>
        </div>
        
            <Carousel/>
      </section> </div>) : null}
  
      <Footer/>
    </div>
  );
};

export default App;
