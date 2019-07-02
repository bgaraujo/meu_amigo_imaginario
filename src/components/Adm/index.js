import React from 'react';
import Style from './styles.css';
import Header from '../Header';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdNoteAdd,MdDelete } from "react-icons/md";

class Adm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            questions:{
                cad:[],
                aval:[],
                moti:[]
            },
            show:false,
            update:false
        }
        this.getQuestions = this.getQuestions.bind(this);
        this.setQuestion = this.setQuestion.bind(this);
        this.modal = this.modal.bind(this);
        this.formQuestionCad = this.formQuestionCad.bind(this);
        this.updateQuestion = this.updateQuestion.bind(this);
    }

    componentDidMount(){
        this.getQuestions();
    }

    getQuestions(){
        var questions = this.state.questions;
        const rootRef = this.props.firebase.database().ref();
        const speedRef = rootRef.child('questions');
        speedRef.on('value', (snapshot) => {
            
            for(var key in snapshot.val()){
                var question = snapshot.val()[key];
                questions[key] = [];
                for( var iQuestion in  question){
                    var cQuestion = question[iQuestion];
                    questions[key].push(cQuestion);
                }
            }

            this.setState({questions:questions});
        });
        
    }

    setQuestion(){
        const rootRef = this.props.firebase.database().ref();
        
        var submit = true;
        for (let index = 0; index < document.querySelectorAll('[data-cad]').length; index++) {
                var element = document.querySelectorAll('[data-cad]')[index];
                if( element.value == "" ){
                    element.className += " is-invalid";
                    submit = false;
                }
        }

        if(!submit)
            return false;

        var question = {
            title:document.querySelector('[data-cad=title]').value,
            description:document.querySelector('[data-cad=description]').value,
        };

        const speedRef = rootRef.child('questions/'+document.querySelector('[data-cad=type]').value);
        speedRef.push(question).then(()=>{ 
            document.querySelector('[data-cad=title]').value = "";
            document.querySelector('[data-cad=description]').value = "";
            this.setState({show:false});
        });

    }

    modal(e){
        if( e.target.getAttribute('bool') == 'true' )
            this.setState({show:true});
        else
            this.setState({show:false});
    }

    updateQuestion(e){
        console.log( e.target.getAttribute('data-key') );
    }


    formQuestionCad(){
        return(
            <Modal show={this.state.show}>
    
                <Modal.Body>
                    <h1>Nova Pergunta</h1>
                    
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>* Titulo da Pergunta</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Famos falar Sobre voce"
                                data-cad="title"
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>* Descricao da Pergunta</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Qual seu nome?"
                                data-cad="description"
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>* Tipo de pergunta</Form.Label>
                            <Form.Control 
                                as="select"
                                data-cad="type"
                            >
                                <option value="cad">Cadastro</option>
                                <option value="aval">Avaliacao</option>
                                <option value="moti">Motivacao</option>
                            </Form.Control>
                        </Form.Group>
                        <p><em>* campos obrigatorios.</em></p>
                    </Form>

                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.modal} bool="false" >Cancelar</Button>
                    <Button variant="primary" onClick={this.setQuestion}>Salvar</Button>
                </Modal.Footer>

            </Modal>
        )
    }

    render(){
        var questionsCad = this.state.questions.cad.map( (item,key) => {
            return (
                <ListGroup.Item 
                    key={key} 
                    onClick={this.updateQuestion} 
                    data-key={item.key}
                >
                    {item.description}
                </ListGroup.Item>
            )
        } );

        var questionsAval = this.state.questions.aval.map( (item,key) => {
            return (
                <ListGroup.Item 
                    key={key} 
                    onClick={this.updateQuestion} 
                    data-key={item.key}
                >
                    {item.description}
                </ListGroup.Item>
            )
        } );

        var questionsMoti = this.state.questions.moti.map( (item,key) => {
            return (
                <ListGroup.Item 
                    key={key} 
                    onClick={this.updateQuestion} 
                    data-key={item.key}
                >
                    {item.description}
                </ListGroup.Item>
            )
        } );

        return(
            <>
                <Container>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <br/>
                            <Button  onClick={this.modal} bool="true">
                                Adicionar uma nova pergunta
                                <MdNoteAdd/>
                            </Button>
                        </Col>
                    </Row>
                    
                    <br/>

                    <Accordion defaultActiveKey="0">
                        
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Pergundas de Cadastro
                                </Accordion.Toggle>
                            </Card.Header>

                            <Accordion.Collapse eventKey="0">
                                
                                <Card.Body>
                                    <ListGroup>
                                        {questionsCad}
                                    </ListGroup>
                                </Card.Body>

                            </Accordion.Collapse>
                        </Card>

                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                Perguntas de Avaliacao
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">

                                <Card.Body>
                                    <ListGroup>
                                        {questionsAval}
                                    </ListGroup>
                                </Card.Body>

                            </Accordion.Collapse>
                        </Card>

                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                Perguntas de Motivacao
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">

                                <Card.Body>
                                    <ListGroup>
                                        {questionsMoti}
                                    </ListGroup>
                                </Card.Body>

                            </Accordion.Collapse>
                        </Card>

                    </Accordion>
                </Container>
                {this.state.show ? <this.formQuestionCad/> : "" }
            </>
        )
    }
}
export default Adm;
