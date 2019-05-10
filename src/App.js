import React from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import * as firebase from 'firebase';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      speed:10
    }
  }

  componentDidMount(){
    const rootRef = firebase.database().ref();
    const speedRef = rootRef.child('speed');
    const auth = firebase.auth();
    var user = auth.currentUser;

    console.log(user);

    speedRef.on('value',snap => {
        this.setState({
          speed:snap.val()
        });
    })
  }

  render(){
    return(
      <div className="App">
        <Header />
        <Login />
      </div>
    )
  }
};


export default App;
