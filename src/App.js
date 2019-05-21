import React from 'react';
import './App.css';
import * as firebase from 'firebase';
import Login from './components/Login';
import Home from './components/Home';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:{}
    }
  }

  componentDidMount(){
    this.authListener();
  }

  authListener(){
    firebase.auth().onAuthStateChanged((user) => {
      if( user ){
        this.setState({user});
        localStorage.setItem('user',user.uid);
      }else{
        this.setState({user:null});
        localStorage.removeItem('user');
      }
    });
  }

  render(){
    return(
      <div className="App">
      
        { this.state.user ? (<Home />) : (<Login />) }
        
      </div>
    )
  }
};


export default App;
