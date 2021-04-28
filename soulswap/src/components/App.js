import '../App.css';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConnectBtn from './ConnectBtn';
import { useState } from "react";
import React from 'react';
import Info from './Info'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TopBar from './TopBar';
import Graveyard from './Graveyard';

function App() {
  const { ethereum } = window;
  const web3 = new Web3(window.ethereum);
  const { abi } = require('../GravestoneFactory.json');
  const ethertaphAddress = "0x19983dc33507bb0d5C46e8CDdAC1B8399E18D572";
  const connectBtnDiv = document.querySelector('.connectBtnDiv');
  let ethertaph = new web3.eth.Contract(abi, ethertaphAddress);
  let userAccount;
  const [currentView, setRenderVew] = useState(0);
  const [isGraveyardEntry, setGraveyardEntry] = useState(false);

  function getGravestoneDetails(id) {
    return ethertaph.methods.gravestones(id).call();
  }

  function gravestoneToOwner(id) {
    return ethertaph.methods.gravestoneToOwner(id).call();
  }

  function getGravestonesByOwner(owner) {
    return ethertaph.methods.getGravestonesByOwner(owner).call();
  }

  // let accountInterval = setInterval(function() {
  //   // Check if account has changed
  //   if (web3.eth.accounts[0] !== userAccount) {
  //     userAccount = web3.eth.accounts[0];
  //     // Call a function to update the UI with the new account
  //     getGravestonesByOwner(userAccount)
  //     .then(displayGravestones);
  //   }
  // }, 100);

  function displayGravestones() {
      
  }

  function handleEnterGraveyardClick() {
    setGraveyardEntry(true);
  }

  return (
    <div className="wrapper">
    <header><TopBar /></header>
    {!isGraveyardEntry ? <div className="centered">
          <Info />
        <Card>
        < Button variant="dark" onClick={handleEnterGraveyardClick}>Enter Graveyard</Button>
        </Card>
        <ConnectBtn /> </div> : <div className="centered"> <Graveyard /></div>}
      </div>
  );
}

export default App;
