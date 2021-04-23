import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';


function Info() {
    return (
        <Accordion className="infoAccord">
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="outline-dark" eventKey="0">
                    What is this?
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>Ethertaph allows you to permanently memorialize lost love ones on 
                    Ethereum Mainnet. Add their details and an image which will be converted to 
                    Base64 and minted into an ERC721 token. You can keep the token and
                    choose to make their memorial public in the graveyard for anyone to view. </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="outline-dark" eventKey="1">
                    Is it free?
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                <Card.Body>Ethertaph collects no fees, but you will need to pay the ETH transaction fee
                    required to call the contract and mint the ERC721 token.<br/>If you'd like to donate to help 
                    with server costs...<br/><b>ETH:</b> 0x111<br/><b>BTC:</b>11111<br/><b>XRP:</b>1111
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="outline-dark" eventKey="2">
                    Tech stack
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                <Card.Body>Frontend: React, React-Bootstrap<br/>Backend: Solidity, Mongo DB
                <br/><a href="https://github.com/editrocchio/ethertaph">Github</a></Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion>

    );
}

export default Info;