import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons';

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
        });
      });
  }

  publicarComentario() {
    //Armar el comentario.
    let unComentario = {
        author: auth.currentUser.email,
        createdAt: Date.now(),
        comentarioTexto: this.state.comentario
    }
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




  render() {
    return (//aca iria el siguiente codigo, pero nos rompe asi que lo dejmaos comentado
    //<View style={styles.container}>
    <Text style={styles.texto}>Comentarios del posteo</Text>
    {
      this.state.arrComments.length > 0 ?
        <FlatList
          data={this.state.arrComments.sort((actual, vecino)=> actual.createdAt - vecino.createdAt).reverse()}
          keyExtractor={item => item.createdAt.toString()}
          renderItem={({ item }) => <Text style={styles.textComm}>{item.owner} comento: {item.comment}</Text>}
          
        />
        :
        <Text style={styles.texto2}>No hay comentarios, se el primero en comentar</Text>
    }
    <View>
      <TextInput
        placeholder='Escribi tu comentario...'
        style={styles.input}
        keyboardType='default'
        onChangeText={text => this.setState({ comentario: text })}
        value={this.state.comentario}
      />

      {
        this.state.comentario.length > 0 ?
          <TouchableOpacity onPress={() => this.sendComment(this.state.comentario)}>
            <Text style={styles.texto2}>Comentar</Text>
          </TouchableOpacity>
          :
          ""
      }

    </View>
  </View>
)
}
}
    
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "white"
  },
  button: {
    backgroundColor: 'lightblue',
    borderRadius: '5%'
  },
  textoPost: {
    fontWeight: 'bold',
    margin: '4%'
},
  input: {
    borderRadius: 5,
    backgroundColor: 'white',
    width: '80%',
    height: '5%',
    padding: '5%',
    margin: '8%'
  },
  back: {
    margin: '4%'
  },
  
});

export default Comment;