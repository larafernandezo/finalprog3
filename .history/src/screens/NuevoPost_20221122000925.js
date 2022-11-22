import React, {Component} from 'react'
import {Text, StyleSheet, TextInput, TouchableOpacity,View, Image} from 'react-native';
import {auth, db} from '../firebase/config';
import MyCamera from "../components/Camera";


//Tenemos un componente que es  un componente con estado (nueevopost).


class NuevoPost extends Component{
    constructor(props){
        super(props)
        this.state={
            textoPost:'',
            createdAt:'',
            photo:'',
            showCamera: true,
        
        }
    }

    //Tiene un metodo crear posteo que va a recibir eel texto del post y una foto
    //Este metodo deberia pegarle a la coleccion post . Llamo a la coleccion post
    //Con add le agrego un elemento , que le ponmos a ese  elemnto? La info que querramos
    // Le tenemos que poner un momento de crcaion y le vamos a tener que gregar algo , un email que es quien lo crea al posteo. 
    //Este email esta puesto a mano pero deberia ser del usuario q se registra en ese momento . 
    //Deberiamos teener un meetodo de out que mee traiga el usuario  registardo en ese momento 
    // despues hay un texto, una foto que een principio sto no va a ser una imagen sino una url peero va a venir por parametro dl algun lugar 
    //Despues teenemos que agregar dos posiciones adentro del posteo. Una q va a ser un array de likes  y otra
    //un array de comentarios, por lo pronto estan  vacios.
    createPost(texto, photo){
        db.collection('posts').add({
                owner: auth.currentUser.email, //deberia ser el usuario registrado. auth.currentUser
                textoPost: texto,
                photo: photo,
                likes:[],
                comments:[],
                createdAt: Date.now()
            })
            //Aabajo teenemos un setState que limpia todos los datos e va a tener el formulario q en principio lo unico q se ve en el foormulario es el campo de texto 
            // Limpio el campo de texto y yast.
            //Despuesredireccionamos a la home si todo va bien a la pantalla de home.
            //Catch para q no se rompa nada
            .then(() => {
                this.setState({
                    textoPost:'',
                    showCamera: true,
                })
                this.props.navigation.navigate('Home')
            })
            .catch( e => console.log(e))
    }

    onImageUpload(url){//metodo pa que queede parejo, cuando la foto se suba necvesito q me traigas el dato osea una url 
        this.setState({
            photo: url,
            showCamera: false,
        })
    }
//El render funciona, tengo un formulario para cargar un nuevo post, tine un campo de teext imput 
//poner propiedad para transformarlo een textArea 
//Lo que pasa despues con el this.state vamos a star actualizando l  esatdo  y por ultimo mostrando lo q estamos actualkizando se elo mostramos al usuario
//Est formulario qu ahora solo tien un campo va a eestar ejecutando un touchabl opacity  con la palabra guardar
// y l metodo va a ser creatpost.

    render(){
        return(
            <View>
            {
                this.state.showCamera ?
                <MyCamera onImageUpload={url => this.onImageUpload(url)}/>
                :
                <View style={styles.container}>
                    <Text> Nuevo posteo form</Text>
                    
                        <TextInput  
                            placeholder='Descripcion para tu foto'
                            keyboardType='text'
                            onChangeText={ text => this.setState({textoPost:text}) }
                            value={this.state.textoPost}
                            style={styles.field}
                        /> 
                        <TouchableOpacity onPress={()=>this.createPost(this.state.textoPost, this.state.photo)}>
                            <Text>Subir</Text>
                        </TouchableOpacity>
                    
                </View>
            }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        marginTop: 3
    },
    field: {
        borderColor: '#ff380',
        borderWidth: 1,
        marginBottom: 8,
        borderRadius: 2,
        padding: 3,
        
    },
    title: {
        marginBottom: 9
    },
   
})
//CON  EL posteo creado voy a ir a la home, pantalla principal y lo que voy a hacr en ele component dismount d ela hjome voy a estar trayendo todo lo que tiene la coleccion de posteos 
//que dice (sigo en home)
export default NuevoPost;