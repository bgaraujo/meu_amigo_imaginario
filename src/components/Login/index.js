import React from 'react';
import * as firebase from 'firebase';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Style from './styles.css';


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            email:'',
            password:'',
            show:false,
            professional:false,
            crp:""
        }
        this.login = this.login.bind(this);
        this.change = this.change.bind(this);
        this.modalShow = this.modalShow.bind(this);
        this.modalHide = this.modalHide.bind(this);
        this.addUser = this.addUser.bind(this);
        this.Teste = this.Teste.bind(this);
    }

    Teste(){
        return(
            <Form.Group>
                <Form.Label>Conselho Regional de Psicologia</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text>CRP</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        name="crp"
                        value={this.state.crp}
                        onChange={this.change}
                    >
                    </FormControl>
                </InputGroup>
                <Form.Text className="text-muted">
                    Somente profissionais da area podem ajudar então é necessario ter seu registro ativo
                </Form.Text>
            </Form.Group>
        )
    }

    login(e){
        const auth = firebase.auth();
        auth.signInWithEmailAndPassword(this.state.email,this.state.password);
    }

    addUser(){
        var thisState = this.state;
        const auth = firebase.auth();
        auth.createUserWithEmailAndPassword(this.state.email,this.state.password).then(function(snapshot) {
            const rootRef = firebase.database().ref();
            const speedRef = rootRef.child('users/'+snapshot.user.uid);
            speedRef.set( {
                name:thisState.name,
                email:thisState.email,
                professional:thisState.professional,
                crp:thisState.crp
            } );
        });;
    }

    modalShow(){
        this.setState({show:true});
    }
    modalHide(){
        this.setState({show:false});
    }

    change(e){
        this.setState({[e.target.name]:e.target.value});
        if(e.target.name === "personType" && e.target.value === "P")
            this.setState({professional:true});
        if(e.target.name === "personType" && e.target.value === "N")
            this.setState({professional:false});
    }

    render(){
        return(
            <Container> 
                
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.change}
                                        placeholder="Enter email"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password"
                                        name="password" 
                                        value={this.state.password} 
                                        onChange={this.change}
                                        placeholder="Password"/>
                                </Form.Group>
                                <Row>
                                    <Col ld="6" md="6" xs="6">
                                        <Button onClick={this.login} variant="primary">Entrar</Button>
                                    </Col>
                                    <Col ld="6" md="6" xs="6" className="text-right">
                                        <Button onClick={this.modalShow} variant="secondary">Cadastrar</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>


                <Modal show={this.state.show} onHide={this.modalHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastro</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Nome</Form.Label>

                                <Form.Control
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.change}
                                    type="text"
                                    placeholder="Sua Graça aqui" />

                                <Form.Text className="text-muted">
                                    Seu nome é apenas para efeito de registro, não sera compartilhado a menos que você permita
                                </Form.Text>

                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email</Form.Label>

                                <Form.Control
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.change}
                                    type="email"
                                    placeholder="Seu email aqui" />

                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Senha</Form.Label>

                                <Form.Control
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.change}
                                    type="password"
                                    placeholder="Sua Senha aqui" />
                                
                            </Form.Group>
                            
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                    <InputGroup.Text>Voce é</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                    as="select"
                                    name="personType"
                                    value={this.state.personType}
                                    onChange={this.change}
                                    >
                                    <option value="N">Paciente</option>
                                    <option value="P">Voluntario</option>
                                    </FormControl>
                                </InputGroup>
                            </Form.Group>

                            {this.state.professional ? (<this.Teste/>) : ('') }

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={this.addUser} >Cadastrar</Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        );
    }
}


export default Login;

