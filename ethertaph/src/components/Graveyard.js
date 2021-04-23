import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Gravestone from './Gravestone';

function Graveyard() {

    return(
        <CardColumns>
             <Gravestone 
                firstName="test" 
                middleName="testMiddle" 
                lastName="testLast" 
                birthDate="January 1 1989"
                deathDate="April 4 2021"
                obituary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                erat a ante."
                image="./test.png"/>
            <Gravestone 
                firstName="test" 
                middleName="testMiddle" 
                lastName="testLast" 
                birthDate="January 1 1989"
                deathDate="April 4 2021"
                obituary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                erat a ante."
                image="./test.png"/>
            <Gravestone 
                firstName="test" 
                middleName="testMiddle" 
                lastName="testLast" 
                birthDate="January 1 1989"
                deathDate="April 4 2021"
                obituary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                erat a ante."
                image="./test.png"/>
            
            <Gravestone 
                firstName="test" 
                middleName="testMiddle" 
                lastName="testLast" 
                birthDate="January 1 1989"
                deathDate="April 4 2021"
                obituary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                erat a ante."
                image="./test.png"/>
            <Gravestone 
                firstName="test" 
                middleName="testMiddle" 
                lastName="testLast" 
                birthDate="January 1 1989"
                deathDate="April 4 2021"
                obituary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                erat a ante."
                image="./test.png"/>
            <Gravestone 
                firstName="test" 
                middleName="testMiddle" 
                lastName="testLast" 
                birthDate="January 1 1989"
                deathDate="April 4 2021"
                obituary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                erat a ante."
                image="./test.png"/>
                
            <Gravestone 
                firstName="testtt" 
                middleName="testMiddle" 
                lastName="testLast" 
                birthDate="January 1 1989"
                deathDate="April 4 2021"
                obituary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                erat a ante."
                image="./test.png"/>
            </CardColumns>
    )
}

export default Graveyard;