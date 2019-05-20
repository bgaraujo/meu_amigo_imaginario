import React from 'react';
import Style from '.';
import Header from '../Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            uid:localStorage.getItem('user'),
            wellcomeMessage:"Bom dia!"
        }
    }

    /*
    
        //const rootRef = firebase.database().ref();
    //const speedRef = rootRef.child('speed');

    /*
    speedRef.on('value',snap => {
        this.setState({
          speed:snap.val()
        });
    })*/

    componentDidMount(){
        var date = new Date();
        if( date.getHours() >= 12 && date.getHours() <= 18 )
            this.setState({wellcomeMessage:"Boa tarde!"});
        if( date.getHours() > 18 && date.getHours() <= 24 )
            this.setState({wellcomeMessage:"Boa noite!"});
    }
    

    render(){
        return(
            <Container>
                <Header />
                <Row>
                    <Col lg="4">
                        <Jumbotron>
                            <Container>
                                <h1>{this.state.wellcomeMessage}</h1>
                                <p >Conte-me sobre seu dia</p>
                            </Container>
                        </Jumbotron>
                    </Col>
                    <Col lg="8">
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Home;
