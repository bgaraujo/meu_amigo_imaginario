import React from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user:{},
      load:true
    }
    this.startScreen = this.startScreen.bind(this);
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount(){
    this.authListener();
  }

  authListener(){
    this.props.firebase.auth().onAuthStateChanged((user) => {
      if( user ){
        this.setState({user});
        localStorage.setItem('user',user.uid);
      }else{
        this.setState({user:null});
        localStorage.removeItem('user');
      }
      this.setState({load:false});
    });
  }

  startScreen(){
    return(
      <div>
        { this.state.user ? <Home firebase={this.props.firebase} /> : <Login firebase={this.props.firebase} /> }
      </div>
    );
  }

  render(){
    const startScreen = this.startScreen();
    return(
      <div className="App">
        {this.state.load ? <div></div> : startScreen }
      </div>
    )
  }
};


export default App;
