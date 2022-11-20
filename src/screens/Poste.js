import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput} from 'react-native';
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from '../firebase/config'
import Post from '../components/Post';


class Posts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posteos: [],
        }
    }
    //el estado es inmutable, hay que pisarlo con algo nuevo. Por eos hacemos un nuevo array de posts
    // en el estado guardamos todo lo que queremos rendrizar porque cualq variable q no este ahi no va a se identificada por react
    //react solo lee los cambios de las props
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
        fontWeight:'bold',
        fontFamily: 'Playfair Display',
        textAlign:'center',
        color:'black',
        fontSize: 40,   
        
        
    },
    view:{
        flex:1
    }
})

export default Posts;