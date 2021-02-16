import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Web3 from "web3";

import HelloWorldABI from "./HelloWorld.json";
const HelloWorldContract = "0x52E7Aac47c05793D919a1c5C4F093289C9495Eb6";

export const MoblieButton = styled.div`
  margin-top: 25px;

  padding-top: 10px;
  padding-bottom: 10px;

  font-size: 20px;
  text-align: center;
  width: 15%;
  height: 20px;
  border-radius: 10px;
  border: 2px #6685ff solid;
  font-family: sans-serif;
  color: #0a3cff;
  background-color: #a8baff;
  box-shadow: 1px 2px;
`;

export const TextAera = styled.input`
  margin-bottom: 0px;
  font-size: 22px;
  width: 47%;
  text-align: center;

  border-radius: 42px;
  border: 2px #6685ff solid;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  :focus {
    outline: 0;
    box-shadow: 0 0 10px blue;
  }
`;

function HelloWorld() {
  const [walletAmount, setWalletAmount] = useState(0);
  const [newWord, SetNewWord] = useState("Enter New Word / Text");
  const [currentWord, setCurrentWord] = useState("");

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

  async function Write_Word() {
    const web3 = window.web3;
    const Ethaccounts = await web3.eth.getAccounts();
    const HelloContract = new web3.eth.Contract(
      HelloWorldABI.abi,
      HelloWorldContract
    );

    await HelloContract.methods
      .Change_Word(newWord)
      .send({ from: Ethaccounts[0], value: 0 })
      .once("receipt", (receipt) => {
        console.log(receipt);
        console.log("transaction hash" + receipt.transactionHash);
      });
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
      setCurrentWord(result);
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
      <h2>Enter Word:</h2>
      <TextAera
        type="text"
        value={newWord}
        onChange={(e) => SetNewWord(e.target.value)}
      />

      <MoblieButton onClick={() => Write_Word()}>Send New Info</MoblieButton>
      <MoblieButton onClick={() => Read_Word()}>Read Current Word</MoblieButton>

      <h2>Current Word:</h2>
      <p>{currentWord}</p>
    </>
  );
}

export default HelloWorld;
