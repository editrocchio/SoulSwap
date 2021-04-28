import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React from 'react';
import img from './test.png'


class Gravestone extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: this.props.firstName,
            middleName: this.props.middleName,
            lastName: this.props.lastName,
            birthDate: this.props.birthDate,
            deathDate: this.props.deathDate,
            obituary: this.props.obituary,
            image: this.props.image
        }
    }

    render() {
        return <Card>
            <Card.Img variant="top" src={img} />
            <Card.Body>
            <Card.Title>{this.state.firstName + " " + this.state.middleName + " " 
                + this.state.lastName}<br/>{"Born: " + this.state.birthDate}
                <br/>{"Died: " + this.state.deathDate}</Card.Title>
            <Card.Text>
                <b>Obituary</b><br/>
                {this.state.obituary}         
            </Card.Text>
            </Card.Body>
        </Card>
    }
}

export default Gravestone;