import React from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';

import * as firebase from 'firebase';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:{}
    }
  }

  componentWillMount(){
    //console.log("teste");
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
        <Header />
        { this.state.user ? (<Home/>) : (<Login />) }
        
      </div>
    )
  }
};


export default App;
