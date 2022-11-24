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
            <View style={styles.container}> 
            {
                this.state.user.length == 0 ?
                <Text>  </Text> :
                <View style={styles.containerBio}>
                <Text style={styles.usern}> Nombre: {this.state.user[0].data.usuario} </Text> 
                <Text style={styles.usern}> Mail: {this.state.user[0].data.owner} </Text> 
                <Text style={styles.usern}> Biografìa: {this.state.user[0].data.biografia} </Text> 
                <
                <Image
                style={styles.photo}
                source={{ uri: this.state.user.photo }}
                resizeMode='contain'
                />
                </View>
            }


            <Text style={styles.title}> Mis {this.state.posts.length} posteos  </Text>
            <FlatList 
                data={this.state.posts}
                keyExtractor={ onePost => onePost.id.toString()}
                renderItem={ ({item}) => <Post postData={item} navigation={this.props.navigation} />}
            /> 
                <TouchableOpacity onPress={ () => this.logout ()} style= {styles.buttonOut}>
                        <Text style={styles.out}>Salir de mi cuenta</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.deleteProfile ()} style= {styles.buttonEliminar}>
                        <Text>Eliminar mi cuenta</Text>
                </TouchableOpacity>
            
        </View>
        );
    }
};

const styles = StyleSheet.create({
    title:{
        fontSize: 22,
        color: "rgb(52, 152, 219)",
        fontFamily: 'raleway heavy',
        textAlign: 'center',
        fontWeight: 50,
        alignItems: 'center'
    },
    photo: {
        height: 200,
        width: 200,
        border: '2px solid #ddd',
        borderRadius: '50%',
        padding: 5,
        alignItems: 'center',
        margin: '3%'
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    usern: {
        fontFamily: 'raleway heavy',
        fontSize: 20,
        color: 'black',
        marginLeft: 15, 
    },
    out: {
        fontFamily: 'raleway heavy',
        fontSize: 15,
        alignItems: 'center',
    },
    buttonOut: {
        width:'30%',
        color:"#FFA400",
        alignItems: 'center',
        borderColor: 'rgb(77, 86, 86)',
        borderWidth: 3,
        borderRadius: 12,
        marginBottom: 5,
        marginTop: 25
    },
    buttonEliminar: {
        width:'30%',
        color:"#FFA400",
        alignItems: 'center',
        borderColor: 'rgb(77, 86, 86)',
        borderWidth: 3,
        borderRadius: 12,
        marginBottom: 25,
        marginTop: 10
    },
    containerBio: {
        display: 'flex',
        alignItems: 'center'
    },
})

export default Perfil