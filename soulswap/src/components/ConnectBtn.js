import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import Web3 from 'web3';
function ConnectBtn() {
    const [isLoading, setLoading] = useState(false);
    const [connected, setConnected] = useState(false);
    const [buttonText, setButtonText] = useState("Connect Metamask");

    const { ethereum } = window;
    const web3 = new Web3(window.ethereum);

    web3.eth.getAccounts(function(error, accounts) {
        if(accounts.length !== 0) {
            setButtonText("Connected");
            setConnected(true);
        }
    });

    const connectWallet = async () => {
        try {
            await ethereum.request({ method: 'eth_requestAccounts' }).then(function() {
              setConnected(true);
          });
        } catch (error) {
          console.error(error);
        }
    };
    
    useEffect(() => {
        if (isLoading) {
            setButtonText("Connecting...");

            connectWallet().then(() => {
                setLoading(false);
                setButtonText(connected ? "Connected" : "Connect Metamask");
            });
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
        <div className="connectBtn">
            <Button
            variant="primary"
            disabled={isLoading || connected}
            onClick={!isLoading ? handleClick : null}
            >
            {buttonText}
            </Button>
        </div> 
    );
}
  
export default ConnectBtn;