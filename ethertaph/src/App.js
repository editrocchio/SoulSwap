import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConnectBtn from './ConnectBtn';

function App() {
  const { ethereum } = window;
  const web3 = new Web3(window.web3.currentProvider);
  const { abi } = require('./GravestoneFactory.json');
  const ethertaphAddress = "0x19983dc33507bb0d5C46e8CDdAC1B8399E18D572";
  let ethertaph = new web3.eth.Contract(abi, ethertaphAddress);
  let userAccount;

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
  
  return (
    <ConnectBtn />

  );
}

export default App;
