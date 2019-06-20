import React from 'react';
import * as firebase from 'firebase';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

class Feed extends React.Component{
    _isMounted = false;

    constructor(props){
        super(props);
        this.state = {
            uid:props.uid,
            feed:[]
        }
        this.render = this.render.bind(this);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount(){
        const rootRef = firebase.database().ref();
        const speedRef = rootRef.child('users/'+this.state.uid+'/feed');
        speedRef.on('value', (snapshot) => {
            var feed = [];
            for (var id in snapshot.val()) {
                var post = snapshot.val()[id];
                feed.push(post);
            }
            this.setState({
                feed: feed
            });
        });
    }


    render(){
        return(
            <Row>
                {this.state.feed.map((item) => {
                    return (
                        <Card>
                            <Card.Body>
                                {item.message}
                            </Card.Body>
                        </Card>
                    )
                })}
            </Row>
        )
    }

    
}

export default Feed;