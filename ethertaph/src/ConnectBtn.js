import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";

function ConnectBtn() {
    const [isLoading, setLoading] = useState(false);
    const connectedState = useState(false)
    const { ethereum } = window;

    const connected = connectedState[0];
    const setConnected = connectedState[1]; 
    
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
            connectWallet().then(() => {
            setLoading(false);
        });
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
        !connected ? <div className="centered">
            <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? handleClick : null}
            >
            {isLoading ? 'Connecting...' : 'Connect Metamask'}
            </Button>
        </div> : null
    );
}
  
export default ConnectBtn;