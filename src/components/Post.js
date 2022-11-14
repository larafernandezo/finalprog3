import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';

import {auth, db} from '../firebase/config';
import firebase from 'firebase';

//Que tengo en el componente post? que es el que se renderiza. es un componente cpm estado que tiene un esado con  estos dos datos
// cantidad de likes y milike. Un metodo que es el de like 

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            cantidadDeLikes:this.props.postData.data.likes.length, //length del array de likes. La base de datos nos tiene quee dar esto, hacemos un lentght del aray de datos para q me devuelva un numero de lo q ya tenga., data son los likes y despue slenght
            miLike:false
        }
    }

    componentDidMount(){
        //chequear si el email del usuario logueado está en el array. 
        //El usuario logueado se obtiene de auth.currentUser.email. Chequear que este importado auth.
        //Si está, voy a cambiar el estado miLike.
        if(this.props.postData.data.likes.includes(auth.currentUser.email)){ 
            this.setState({
                miLike:true
            })
        }
    }
//Metodo 1 like
    like(){
        // 
        //agregar el email del usuario logueado a un array en el posteo.
        //le estamos diciendo a la coleccion de post  que queremos modificar algo, posteo ya existe
        // que vamos a modificar tenemos que identificar cual es el documento y depeus  que queeremos hacer update, teenemos doc y despues update
        //.doc ideentificamos el documento quee queremos modificar y deespues update ele tengo que pasar que quiero cambiar y por ultimo esta un theen por si queeremos hacer algo
        // y un catch por si rompe todo. Firebase me dice todo ok con tu update para modificar cosas pero 
        //me tenes que decir en donde! y ese en donde lee tengo que decir cual es el elemnto, y de donde saco ese id del elemento 
        //que tenego que modificar? Es algo que viene  por props, asiq  pongo post.propsdta.id por q ese es el elemneto que tiene el id del post 
        //y en update le paso iun objeto literal con lo que quiero modificar 
        //ACA necesito los metodos e arra, firebase.firestore.Fieldavaliue.arrayunion y adento le pongo el elemento osea el emaikl del usuario
        //
        db.collection('posts')
            .doc(this.props.postData.id) //identificar el documento
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) //traer el email del usuario logueado con auth.currentUser.email. Chequear que este importado auth.
            })
            //En este then tenemos dos cosas sumarle uno y 
            .then(()=> this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes +1,
                miLike: true, 
                })
            )
            .catch(e=>console.log(e))
    }

    //Metodo 2 unlike
    unlike(){
        db.collection('posts')
        .doc(this.props.postData.id) //identificar el documento
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) //traer el email del usuario logueado con auth.currentUser.email. Chequear que este importado auth.
        })
        .then(()=> this.setState({
            likes: this.props.postDatalikes.length ,
            miLike: false, 
            })
        )
        .catch(e=>console.log(e))
    }
    agregarComentario() {
        let unComentario = {
            author: auth.currentUser.email,
            createdAt: Date.now(),
            commentText: this.state.comment
        }
    //aca actualizamos en la base y sabemos el post a comentar
        db.collection('posts').doc(this.props.postData.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion(unComentario)
        })
            .then(() => {
                //Cambia el  estado para vaciar el formulario 
                console.log('Se guardo tu comemtario');
                this.setState({
                    comment:''
                })
            })
            .catch(e => console.log(e))
    }

    // El render me muestra primero las props para ver que estoy subiendo h depsues lo que queremos  ee mostrar en el componenete post la informacion que pusimos en el texto 
    //Vieew y todo es e choclo de datos. This proops son las props , postData es la propiedad con la quee yo llamo  a la informacion que va a recibir el post
    //Cuando nosotros armamos el item este tiene 2 partes, la informacion por un lado, la data y por otro lado tiene el iD
    //Lo que queremos es la data del texto, entonces cada vez quee yo imprima algo voy a mostrar el texto del psot aca

    render(){
        console.log(this.props);
        //para los que estamos usando la base del proyecto, Ale lo que hizo fue ajarcodiar la  a la home osea esto carga a la pagina y cae en l ahome, esto esta puesto en la pagina
        //Voy a register, q es la primera pantalla que carga. Puso la siguiente linea de codigo
        //componendismount this.props.navigarion.navigate ('homemenu")
        return(
            <View>
                <Image 
                    style={styles.photo}
                    source={{uri: this.props.postData.data.photo}}
                    resizeMode='cover'
                />
                <Text> {this.props.postData.data.textoPost} </Text>
                <Text> Cantidad de Likes: {this.state.cantidadDeLikes} </Text>
                { this.state.miLike ? 
                    <TouchableOpacity onPress={ ()=> this.unlike() }>
                        <Text>Ya no me gusta</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={ ()=> this.like() }>
                        <Text>Me gusta</Text>
                    </TouchableOpacity>
                }
                 <TextInput keyboardType='default'
                        placeholder='Escribi un comentario'
                        onChangeText={(text) => { this.setState({ comment: text }) }}
                        value={this.state.comment}
                    />
                    <TouchableOpacity onPress={() => this.agregarComentario()}>
                        <Text style={styles.button} >Comentar</Text>
                    </TouchableOpacity>       
            </View>
        )
    }
}
const styles = StyleSheet.create({
    photo:{
        height:250
    }
}) 

export default Post;