import {Text, FlatList, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {auth, db} from '../firebase/config';
import React, { Component } from 'react';
import Post from '../components/Post'

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

        deleteProfile(){
            auth.currentUser.delete()
                .then( () => {
                    this.props.navigation.navigate("Login")
                })
                .catch(error => 
                    this.setState({
                    error: 'No se ha podido borrar su cuenta'
                })
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
                style={styles.photo}
                source={{ uri: this.state.user.photo }}
                resizeMode='contain'
                />
                </View>
            }


            <Text> Mis {this.state.posts.length} posteos  </Text>
            <FlatList 
                data={this.state.posts}
                keyExtractor={ onePost => onePost.id.toString()}
                renderItem={ ({item}) => <Post postData={item} navigation={this.props.navigation} />}
            /> 
                <TouchableOpacity onPress={ () => this.logout ()}>
                        <Text>Salir de mi cuenta</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.deleteProfile ()}>
                        <Text>Eliminar mi cuenta</Text>
                </TouchableOpacity>
            
        </View>
        );
    }
};

const styles = StyleSheet.create({
    title:{
        fontSize: 22,
        color: "red"
    },
    phot: {
        width: 250,
        height: 250
    }
})

export default Perfil