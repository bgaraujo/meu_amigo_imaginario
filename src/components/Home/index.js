import React from 'react';
import Style from '.';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            uid:localStorage.getItem('user'),
            wellcomeMessage:"Bom dia!"
        }
    }

    /*
    
        //const rootRef = firebase.database().ref();
    //const speedRef = rootRef.child('speed');

    /*
    speedRef.on('value',snap => {
        this.setState({
          speed:snap.val()
        });
    })*/

    componentDidMount(){
        var date = new Date();
        if( date.getHours() >= 12 && date.getHours() <= 18 )
            this.setState({wellcomeMessage:"Boa tarde!"});
        if( date.getHours() > 18 && date.getHours() <= 24 )
            this.setState({wellcomeMessage:"Boa noite!"});
    }
    

    render(){
        console.log();
        return(
            <div class="container"> 
                <div class="row align-items-center">
                    <div class="col-4">
                        <div class="jumbotron jumbotron-fluid">
                            <div class="container">
                                <h1 class="display-4">{this.state.wellcomeMessage}</h1>
                                <p class="lead">Conte-me sobre seu dia</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-8">
                        
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;
