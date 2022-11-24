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
                <View >
                <Text style={styles.usern}> Nombre: {this.state.user[0].data.usuario} </Text> 
                <Text style={styles.usern}> Mail: {this.state.user[0].data.owner} </Text> 
                <Text style={styles.usern}> Biografìa: {this.state.user[0].data.biografia} </Text> 
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
        import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from 'firebase';

//para usarflatlist lo primeero que nescesigamos ees un estado con datos 
class Comentario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: '',
      id: this.props.route.params.id,
      data: '',
      comentario: ''
    };
  }

  componentDidMount() {
    db.collection("posts").doc(this.state.id).onSnapshot((doc) => {
        this.setState({
          data: doc.data(),
        });8    
      });
  }

  publicarComentario() {
    //Armar el comentario.
    let unComentario = {
        author: auth.currentUser.email,
        createdAt: Date.now(),
        comentarioTexto: this.state.comentario
    }
    //Actualizar comentario en la base. Puntualmente en este documento.
    //Saber cual es el post que queremos actualizar
    db.collection('posts').doc(this.state.id).update({
        comentarios: firebase.firestore.FieldValue.arrayUnion(unComentario)
    })
        .then(() => {
            //Cambiar un estado para limpiar el form
            this.setState({
                comentario:''
            })
        })
        .catch(e => console.log(e))
}
//Flatlist tienen data. key extractor y render item.
//en data va la info del array en este caso his.state. comeentarios, es el array quee cargamos el estado en la lineas 14.
//Fijarme si va con s o no.
//en key extractor va alguna manera de construir una clave unica, en este caso pos, ese parametro representa a cada uno de los elementos del array y le digo q lo que quiero es q en el return
//para construir esa clavee unica use de  post su id pero teniendo en cuenta q es un numero necesito pasarlo a cadena de texto. Y por ultimo queremos renderizar algo
//para renderizar algo tenemos que colocar un objeto literal que tiene item adentro, que si bien se lee como obj literal en realizad estamos estructurando el elemento item
//quee viene en render item. lo que queeremos hacer es imprimir cosas, por eso es q usamos arrow function y vamos a decirle que imprima todos los titulos de nuestros comentarios.
//ZDentro de text le decimo q de los comentarios lo que qieremos escrubir son los teetxo.



//AHora podemos renderizae un componente, pasarle props
// Armamos un view para q no rompa yl eeponemos ele text y la flatlist
//flat tiene sus 3 domponentes data, key xtractor y y el otro es render item 
//
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.data.Description}</Text>
        <FlatList data={this.state.data.comentarios} keyExtractor={(post) => post.createdAt.toString()} renderItem={({ item }) => (
        <Text> {" "} {item.author}: {item.comentarioTexto} </Text>)}/>
        <TextInput keyboardType='default' placeholder='Escribí tu comentario' onChangeText={(text) => { this.setState({ comentario: text }) }} value={this.state.comentario}/>
        <TouchableOpacity onPress={() => this.publicarComentario()}>
            <Text style={styles.button} >Comentar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
  },
  logo: {
    width: 500,
    height: 500,
  },
});

export default Comentario;
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

})

export default Perfil