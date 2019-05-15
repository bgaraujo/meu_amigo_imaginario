import React from 'react';
import { auth } from 'firebase';
import * as firebase from 'firebase';


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        }
        this.login = this.login.bind(this);
        this.change = this.change.bind(this);
    }

    login(e){
        const auth = firebase.auth();
        var loginReturn =  auth.signInWithEmailAndPassword(this.state.email,this.state.password);
        console.log(loginReturn);
    }

    change(e){
        this.setState({[e.target.name]:e.target.value});
    }

    render(){
        return(
            <div class="container"> 
                <div class="row align-items-center">
                    <div class="col">
                        <div class="card mx-auto col-6">
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" name="email" value={this.state.email} onChange={this.change} class="form-control" placeholder="Enter email"/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" name="password" value={this.state.password} onChange={this.change} class="form-control"  placeholder="Password"/>
                                </div>
                                <button onClick={this.login} class="btn btn-primary">Entrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Login;

