import React from 'react';
import Style from './styles.css';
import * as firebase from 'firebase';
import Header from '../Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Feed from './Feed';


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            uid:localStorage.getItem('user'),
            wellcomeMessage:"Bom dia!",
            user:{},
            post:{
                created:"",
                uid:"",
                level:5,
                message:""
            },
            show:false
        }
        this.change = this.change.bind(this);
        this.savePost = this.savePost.bind(this);
        this.loading = this.loading.bind(this);
    }

    componentDidMount(){
        var date = new Date();
        if( date.getHours() >= 12 && date.getHours() <= 18 )
            this.setState({wellcomeMessage:"Boa tarde!"});
        if( date.getHours() > 18 && date.getHours() <= 24 )
            this.setState({wellcomeMessage:"Boa noite!"});
    }

    change(e){
        var post = this.state.post;
        post[e.target.name]=e.target.value;
        this.setState({post:post});
    }

    savePost(){
        this.setState({show:true});
        var date = new Date();
        var post =  this.state.post;
        post.created = date.getTime();
        post.uid = this.state.uid;

        const rootRef = firebase.database().ref();
        const speedRef = rootRef.child('users/'+this.state.uid+'/feed');
        speedRef.push(post).then(()=>{
            this.setState({post:{
                created:"",
                uid:"",
                level:5,
                message:""
            }});
            this.setState({show:false});
        });
    }

    loading(){
        return(
            <Modal show={this.state.show} className="text-center loading">
                <Spinner animation="border" variant="light" />
            </Modal>
        )
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
                        <Row>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Como voce se sente hoje?</Card.Title>
                                    <Form.Group>
                                        <Form.Control 
                                            as="select"
                                            name="level"
                                            onChange={this.change}
                                            value={this.state.post.level}
                                        >
                                            <option value='5'>😎 Cagado de feliz</option>
                                            <option value='4'>🙂 Ok</option>
                                            <option value='3'>😐 Poderia estar melhor</option>
                                            <option value='2'>😔 Estou mal</option>
                                            <option value='1'>😭 Precido de ajuda</option>                                    
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            name="message"
                                            onChange={this.change}
                                            value={this.state.post.message}
                                            as="textarea"
                                            rows="3"
                                            placeholder="conte o motivo..." />
                                    </Form.Group>
                                    <Button onClick={this.savePost}>Salvar</Button>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Feed uid={this.state.uid} />
                    </Col>
                </Row>
                <this.loading/>
            </Container>
        )
    }
}
export default Home;
