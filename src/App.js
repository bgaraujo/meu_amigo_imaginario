import React from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';

import * as firebase from 'firebase';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      speed:10,
      user:{}
    }
  }

  componentWillMount(){
    //console.log("teste");
  }

  componentDidMount(){
    const rootRef = firebase.database().ref();
    const speedRef = rootRef.child('speed');
    const auth = firebase.auth();
    var user = auth.currentUser;

    
    if( user ){
      this.setState({user});
      //localStorage.setItem('user',user.uid);
    }else{
      this.setState({user:null});
      //localStorage.removeItem('user');
    }

    speedRef.on('value',snap => {
        this.setState({
          speed:snap.val()
        });
    })
  }

  render(){
    firebase.auth(
      console.log(this)
    );
    return(
      <div className="App">
        <Header />
        { this.state.user ? (<Home/>) : (<Login />) }
        
      </div>
    )
  }
};


export default App;
