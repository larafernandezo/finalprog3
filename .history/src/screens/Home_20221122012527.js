import React, { Component } from 'react';
import { View, Text, FlatList,  StyleSheet, TextInput} from 'react-native';
import Post from '../components/Post';
import { db } from '../firebase/config'


class Posts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posteos: [],
        }
    }
    
    componentDidMount() {
        db.collection('posts').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posteos: posts,
                })
            })
    }

    render() {
        return (
          //prueba1 descomento para ver si funca
            <View style={styles.view}>
            <Text style={styles.title}> Lista de posteos</Text>
            <FlatList 
                    data={this.state.posteos}
                    keyExtractor={ item => item.id.toString()}
                    renderItem={ ({item}) => <Post postData={item} navigation={this.props.navigation} id={item.id}/>}
            />  
            </View>
        )
    }
}
const styles = StyleSheet.create({
    
   title:{
        fontSize: 40,   
        fontWeight:'bold',
        textAlign:'center',
        fontFamily: 'avenir',
        color: 'rgb(127, 255, 212)'
        
    },
    view:{
        flex:1
    }
})

export default Posts;