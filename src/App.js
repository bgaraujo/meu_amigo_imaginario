import React from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Adm from './components/Adm';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user:{},
      load:true,
      adm:false
    }
    this.startScreen = this.startScreen.bind(this);
    this.authListener = this.authListener.bind(this);
    this.admin = this.admin.bind(this);
    this.loading = this.loading.bind(this);
    this.showLoad = this.showLoad.bind(this);
  }

  componentDidMount(){
    this.authListener();
  }

  authListener(){
    this.props.firebase.auth().onAuthStateChanged((user) => {
      if( user ){
        this.setState({user});
        localStorage.setItem('user',user.uid);
        this.admin(user.uid);
      }else{
        this.setState({user:null});
        localStorage.removeItem('user');
        this.setState({load:false});
      }
      
    });
  }

  admin(uid){
    const rootRef = this.props.firebase.database().ref();
    const speedRef = rootRef.child('users/'+uid);
    speedRef.on('value', (snapshot) => {
        if( snapshot.val().type == "admin" ){
          this.setState({adm:true});
          this.setState({load:false});
        }
    });
  }

  showLoad(boolean = false){
    this.setState({load:boolean});
  }

  loading(){
    return(
        <Modal show={this.state.load} className="text-center loading">
            <Spinner animation="border" variant="light" />
        </Modal>
    )
  }

  startScreen(){
    return(
      <div>
        { this.state.user ? ( this.state.adm ? <Adm firebase={this.props.firebase} showLoad={this.showLoad} /> : <Home firebase={this.props.firebase} showLoad={this.showLoad}/> ) : <Login firebase={this.props.firebase} /> }
      </div>
    );
  }

  render(){
    const startScreen = this.startScreen();
    return(
      <div className="App">
        {this.state.load ? <this.loading/> : < this.startScreen /> }
      </div>
    )
  }

};

export default App;
