import React, { useEffect, useState } from "react";

import Web3 from "web3";
// import styled from "styled-components";

import HelloWorldABI from "./HelloWorld.json";
const HelloWorldContract = "0x52E7Aac47c05793D919a1c5C4F093289C9495Eb6";

function HelloWorld() {
  const [walletAmount, setWalletAmount] = useState(0);

  async function getWalletAmount() {
    async function loadWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        return true;
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        return true;
      } else {
        return false;
      }
    }

    var wallet = await loadWeb3();

    if (wallet) {
      const web3 = window.web3;

      const accounts = await web3.eth.getAccounts();
      const address = { account: accounts[0] }.account;

      if (address) {
        web3.eth.getBalance(address, function (error, wei) {
          if (!error) {
            var balance = web3.utils.fromWei(wei, "ether");
            setWalletAmount(balance.substring(0, 4));
          }
        });
      }
    }
  }

  async function Read_Word() {
    const web3 = window.web3;
    const Ethaccounts = await web3.eth.getAccounts();
    const HelloContract = new web3.eth.Contract(
      HelloWorldABI.abi,
      HelloWorldContract
    );

    await HelloContract.methods.read_word().call(function (error, result) {
      console.log(result);
    });

    await HelloContract.methods
      .Change_Word("42")
      .send({ from: Ethaccounts[0], value: 0 })
      .once("receipt", (receipt) => {
        console.log(receipt);
        console.log("transaction hash" + receipt.transactionHash);
      });

    await HelloContract.methods.read_word().call(function (error, result) {
      console.log(result);
    });
  }

  useEffect(() => {
    getWalletAmount();
    // Read_Word();
  }, []);

  return (
    <>
      <h2 Style="text-align: center"> Hello World </h2>
      <h2 Style="text-align: center"> Total Amount: {walletAmount} </h2>
    </>
  );
}

export default HelloWorld;
