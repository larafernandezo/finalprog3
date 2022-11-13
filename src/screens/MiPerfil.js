import {Text, FlatList, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {auth, db} from '../firebase/config'
import firebase from 'firebase'
import React, { Component } from 'react';
import Posteo from '../components/Posteo'

class Perfil extends Component {
    constructor(){
        super()
        this.state = {
            user:[],
            posts:[],
            email:'',
            bio:'',
            photo:'',
        }
    };
    componentDidMount(){
            db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
                docs =>{
                        let posts = [];
                   docs.forEach( doc => {
                        posts.push({
                            id: doc.id,
                            data: doc.data()
                })
                       this.setState({
                        posts: posts,
                   })
                })
                }
            )
            db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
                docs => {
                    let user = [];
                    docs.forEach( doc => {
                        user.push({
                            id: doc.id,
                            data: doc.data()
                        })
                        this.setState({
                            user: user
                        })
                    }) 
                }
            )
        }


logout() {
    auth.signOut()
    this.props.navigation.navigate('Login')
        } 

    render(){
        return(
            <View>
            {
                this.state.user.length == 0 ?
                <Text>  </Text> :
                <View >
                <Text> {this.state.user[0].data.usuario} </Text> 
                <Text> {this.state.user[0].data.owner} </Text> 
                <Text> {this.state.user[0].data.biografia} </Text> 
                <Image
                source={this.state.user[0].data.imagen}
                resizeMode='cover'
                />
                </View>
            }


            <Text> Lista de sus {this.state.posts.length} posteos  </Text>
            <FlatList 
                data={this.state.posts}
                keyExtractor={ onePost => onePost.id.toString()}
                renderItem={ ({item}) => <Post postData={item} navigation={this.props.navigation} />}
            /> 
                <TouchableOpacity onPress={ () => this.logout ()}>
                        <Text>Salir de mi cuenta</Text>
                </TouchableOpacity>

            
        </View>
        );
    }
};

const styles = StyleSheet.create({
    title:{
        fontSize: 22,
        color: "red"
    }
})

export default Perfil