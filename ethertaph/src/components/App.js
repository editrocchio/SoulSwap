import '../App.css';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConnectBtn from './ConnectBtn';
import { useState } from "react";
import React from 'react';
import Info from './Info'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
  const { ethereum } = window;
  const web3 = new Web3(window.web3.currentProvider);
  const { abi } = require('../GravestoneFactory.json');
  const ethertaphAddress = "0x19983dc33507bb0d5C46e8CDdAC1B8399E18D572";
  const connectBtnDiv = document.querySelector('.connectBtnDiv');
  let ethertaph = new web3.eth.Contract(abi, ethertaphAddress);
  let userAccount;

  const renderView = useState(0);
  const currentView = renderView[0];
  const setRenderVew = renderView[1];

  const graveyardEntry = useState(false);
  const isGraveyardEntry = graveyardEntry[0];
  const setGraveyardEntry = graveyardEntry[1];


  function getGravestoneDetails(id) {
    return ethertaph.methods.gravestones(id).call();
  }

  function gravestoneToOwner(id) {
    return ethertaph.methods.gravestoneToOwner(id).call();
  }

  function getGravestonesByOwner(owner) {
    return ethertaph.methods.getGravestonesByOwner(owner).call();
  }

  let accountInterval = setInterval(function() {
    // Check if account has changed
    if (web3.eth.accounts[0] !== userAccount) {
      userAccount = web3.eth.accounts[0];
      // Call a function to update the UI with the new account
      getGravestonesByOwner(userAccount)
      .then(displayGravestones);
    }
  }, 100);

  function displayGravestones() {
      
  }

  function renderMainView() {
    switch(currentView) {
      case 0:
        return <ConnectBtn />;
      case 1: 
        return !isGraveyardEntry ? <div className="centered">
          <Info /><Card>
        <Button variant="dark" onClick={handleEnterGraveyardClick}>Enter Graveyard</Button>
      </Card>
      </div> : null
      case 2:
        //todo
      default:
        return null;
    }
  }

  function checkIfConnectedOnLoad() {
    web3.eth.getAccounts(function(err, accounts){
      if (accounts.length != 0) {
        setRenderVew(1);
      }
    });
  }

  ethereum.on('accountsChanged', (accounts) => {
    setRenderVew(1);
  });

  function handleEnterGraveyardClick() {
    setGraveyardEntry(true);
  }

  checkIfConnectedOnLoad();

  return (
    <div>{renderMainView()}</div>
  );
}

export default App;
