import React from 'react';
import Style from './styles.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

class Cad extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            a:""
        }
    }


    addUser(){
        /*var thisState = this.state;
        const auth = this.props.firebase.auth();
        auth.createUserWithEmailAndPassword(this.state.email,this.state.password).then(function(snapshot) {
            const rootRef = this.props.firebase.database().ref();
            const speedRef = rootRef.child('users/'+snapshot.user.uid);
            speedRef.set( {
                name:thisState.name,
                email:thisState.email,
                professional:thisState.professional,
                crp:thisState.crp
            } );
        });
        */
    }

    render(){
        return(
            <Container> 
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>

                                <Card.Title></Card.Title>

                                <Col className="text-center" lg="12">
                                    <img src=""/>
                                </Col>
                                 
                                <Form.Group data-control="login">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.change}
                                        placeholder="Enter email"/>
                                </Form.Group>
                                <Row>
                                    <Col ld="6" md="6" xs="6">
                                        <Button onClick={this.login} variant="primary">Entrar</Button>
                                    </Col>
                                    <Col ld="6" md="6" xs="6" className="text-right">
                                        <Button onClick={this.openCad} bool="true" variant="secondary">Cadastrar</Button>
                                    </Col>
                                </Row>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Cad;