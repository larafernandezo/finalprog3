import React, { Component } from 'react';

class Home extends Component {
    constructor(){
        super();
        this.state = {
            posteos: [],

        }
    }

    componentDidMount() {
        db.collection('posteos').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posteos: posts
                    })
                })

            }
        )
    }

    render(){
       
    }
}

export default Home;