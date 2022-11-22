import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from 'firebase';

//para usarflatlist lo primeero que nescesigamos ees un estado con datos 
class Comment extends Component {
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

export default Comment;