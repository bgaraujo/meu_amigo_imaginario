import React from 'react';
import Style from './styles.css';


class Cad extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            a:""
        }
    }


    addUser(){
        var thisState = this.state;
        const auth = this.props.firebase.auth();
        auth.createUserWithEmailAndPassword(this.state.email,this.state.password).then(function(snapshot) {
            const rootRef = this.props.firebase.database().ref();
            const speedRef = rootRef.child('users/'+snapshot.user.uid);
            speedRef.set( {
                name:thisState.name,
                email:thisState.email,
                professional:thisState.professional,
                crp:thisState.crp
            } );
        });;
    }

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              
            </nav>
        );
    }
}

export default Cad;