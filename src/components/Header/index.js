import React from 'react';
import Button from 'react-bootstrap/Button';
import Style from './styles.css';
import * as firebase from 'firebase';


class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {a:""};
        this.logOff = this.logOff.bind(this);
    }

    logOff(){
        const auth = firebase.auth();
        auth.signOut();
    }
    render(){
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">Navbar</a>
                
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only"></span></a>
                        </li>
                    </ul>
                    
                    <Button>Solicitar ajuda!</Button>
                    <Button variant="dark" onClick={this.logOff}>
                        Sair
                    </Button>
                </div>
            </nav>
        );
    }
}

export default Header;