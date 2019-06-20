import React from 'react';
import Button from 'react-bootstrap/Button';
import Style from './styles.css';


class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            a:""
        }
        this.logOff = this.logOff.bind(this);
    }
    logOff(){
        const auth = this.props.firebase.auth();
        auth.signOut();
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only"></span></a>
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