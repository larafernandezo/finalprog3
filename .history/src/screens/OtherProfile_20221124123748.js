import React, { Component } from 'react';
import { View, FlatList, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';
import { AntDesign } from '@expo/vector-icons';

class OtherProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuario: [],
            usuario: '',
            biografia: '',
            email: '',
            photo: '',
            posteos: []
        }
    }

    componentDidMount() {
        const email = this.props.route.params.email;


        db.collection('users').where('owner', '==', email).onSnapshot(
            docs => {//todos datos de la colección
                let usuario;

                //CAMBIAR POR WHERE
                docs.forEach(doc => { //por cada documento, quiero un doc y la función que ejecutaré por cada doc
                    const data = doc.data();

                    if (data.owner === email) {
                        usuario = data

                    }
                });

                this.setState({
                    nombre: user.owner,
                    usuario: usuario.usuario,
                    biografia: user.biografia,
                   // photo: usuario.photo
                });
            }
        )
        db.collection('posts').where('owner', '==', email).orderBy('createdAt', 'asc').onSnapshot(
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


    logOut() {
        auth.signOut();
        this.props.navigation.navigate('Login')
    }


    render() {
        return (
            <View style={styles.container} >
                <AntDesign name="left" size={24} color="black" onPress={() => this.props.navigation.navigate('Home')} style={styles.back}/>
                <View style={styles.containerBio}>
                    <Image
                        style={styles.photo}
                        source={{ uri: this.state.photo }}
                    />
                    <Text style={styles.text}>Nombre del usuario:{this.state.nombre}</Text>
                    <Text style={styles.text} >Usuario:{this.state.user}</Text>
                    <Text style={styles.text} >Bio:{this.state.biografia}</Text>
                    <TouchableOpacity onPress={() => this.logOut()}>
                        <Text style={styles.button} >  <button>Logout</button></Text>
                    </TouchableOpacity>
                    
                </View>
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Post postData={item} navigation={this.props.navigation} id={item.id} />}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

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
        backgroundColor: 'white',
        alignItems: 'left',
        marginLeft: 5
    },
    containerBio: {
        display: 'flex',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Playfair Display',
        color: 'black',
        fontSize: 20
    },
    button: {
        backgroundColor: 'white',
        color: 'white',
        border: 'none',
        padding: 5
    },
    back: {
        margin: '4%'
    }
})

export default OtherProfile;