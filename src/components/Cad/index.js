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
            questions:[],
            tab:0
        }

        this.renderQuestions = this.renderQuestions.bind(this);
        this.questions = this.questions.bind(this);
    }


    componentDidMount(){
        this.questions();
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

    questions(){
        const rootRef = this.props.firebase.database().ref();
        const speedRef = rootRef.child('questions/cad');
        speedRef.on('value', (snapshot) => {
            var questions = [];
            for(var key in snapshot.val()){
                var question = snapshot.val()[key];
                questions.push(question);
            }

            this.setState({questions:questions});
        });
    }

    renderQuestions(){
        var questionsCad = this.state.questions.map( (item,key) => {
            console.log(item);
            return (
                <div data-tab={key} hidden>
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>    
                    <input type="text"></input>
                </div>
            )
        } );

        return(
            <>
                {questionsCad}
            </>
        );
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
                                 
                                <Row>
                                    <Col>
                                        <div data-tab="0">
                                            <p>Para seu cadastro preciso de algumas informacoes</p>
                                            <p>Email</p>    
                                            <input type="text"></input>
                                        </div>
                                        <this.renderQuestions/>
                                    </Col>
                                </Row>
                                
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