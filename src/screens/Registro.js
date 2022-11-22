import React, {Component} from 'react';
import {auth, db} from '../firebase/config';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import MyCamera from '../components/Camera';

class Registro extends Component {
    constructor(){
        super()
        //Seteamos un state inicial cero para lograr los inputs vacios. Tambien creamos propiedad errors para el catch//
        this.state = {
            email: "",
            contraseña: "",
            usuario: "",
            biografia: "",
            imagen: "",
            error: "",
            showCamera: false
        }
    }
onImageUpload(url){
    this.setState({
        imagen: url,
        showCamera: false
    })
}
registrarUsuario(email,contra, usuario, biografia, imagen){
    //Lo que queremos hacer es registrar en Firebase que damos de alta al usuario y si el registro sale bien entonces redireccionar a Login //
    //Hacemos uso de auth de firebase y aprovechamos el método createUserWithEmailAndPassword con los parámetros obligatorios que son email y pass//
    auth.createUserWithEmailAndPassword(email,contra)
        .then(res =>{
            //Este método es asincronico por lo que retorna una promise, si se cumple la promise entonces tenemos sucede un then. En el then hacemos uso de add para agregar la coleccion users y dar de alta al usuario con los valores propios de este usuari//
                db.collection("users").add({
                    owner:email,
                    usuario: usuario, 
                    biografia: biografia,
                    imagen:imagen,
                    fechaCreacion: Date.now()
                })
                //Add tambien retorna una promesa por lo que si se cumple devolverá lo que suceda en el then
                .then(()=>{
                    this.setState({
                        email: "",
                        contraseña: "",
                        usuario: "",
                        biografia: "",
                        imagen: "",
                        error: ""
                    })
                    //Redireccionamiento a login//
                    this.props.navigation.navigate("Login")
                })
                .catch(error => console.log(error))    
        })
        .catch(error => 
            this.setState({
            error: error.message
        })
        )}

    render(){
        return(
            <View style={styles.fondo}>
            <Text style={styles.titulo}>Regístrate en cuestión de segundos</Text>    
            <View style={styles.caja}>
            <Text style={styles.error}>{this.state.error}</Text>
                    <TextInput 
                        placeholder= 'Cuenta de Email'
                        keyboardType= 'email-address'
                        onChangeText={ 
                            texto => this.setState({
                                email : texto
                            })
                        }
                        value = {this.state.email}
                        style={styles.fillin}
                    />
                    <TextInput 
                        placeholder= 'Contraseña'
                        keyboardType= 'default'
                        secureTextEntry = {true}
                        onChangeText={ texto => this.setState({contraseña : texto})}
                        value = {this.state.contraseña}
                        style={styles.fillin}
                    />
                    <TextInput 
                        placeholder= 'Nombre de Usuario'
                        keyboardType= 'default'
                        onChangeText={ texto => this.setState({usuario : texto})}
                        value = {this.state.usuario}
                        style={styles.fillin}
                    />
                    <TextInput 
                        placeholder= 'Biografía'
                        keyboardType= 'default'
                        onChangeText={ texto => this.setState({biografia : texto})}
                        value = {this.state.bio}
                        style={styles.fillin}
                    />  
                    {
                        this.state.showCamera ? 
                            <View style={{width: "125vh", height: "125vh"}}>
                                <MyCamera onImageUpload={url => this.onImageUpload(url)}/>
                            </View>
                            :
                            <TouchableOpacity onPress={ () => this.setState({showCamera: true})}> 
                                <Text style={styles.cont}>Subir Foto</Text>
                            </TouchableOpacity>
                    }

            {
                this.state.email =="" || this.state.contraseña =="" || this.state.usuario == "" ? 
                    <TouchableOpacity>
                        <Text style={styles.alerta}>Registrarme</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity onPress={ () => this.registrarUsuario ( this.state.email,  this.state.contraseña, this.state.usuario, this.state.biografia, this.state.imagen)}>
                        <Text style={styles.cont}>Registrarme</Text>
                    </TouchableOpacity>
            }
                    <Text onPress={ () => this.props.navigation.navigate ("Login")} style={styles.switch}>¿Ya tenés una cuenta? Inicia Sesión haciendo click aquí</Text>
                    
                </View>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    fondo: {
        alignItems: 'center',
        backgroundColor: 'rgb(234, 242, 248)',
    },
    titulo: {
        color: 'rgb(52, 152, 219)',
        fontFamily: 'avenir',
        fontSize: 26,
        margin: 60,
    },
    caja:{
        backgroundColor: 'rgb(215, 219, 221)',
        borderRadius: 10,
        padding: 40,
         
    },
    fillin: {
        backgroundColor: 'rgb(253, 254, 254)',
        color: 'rgb(179, 182, 183)',
        fontFamily: 'avenir',
        fontSize: 13,
        margin: 10,
        borderRadius: 6,
        textAlign: 'center',
        padding: 5,
        textAlign: 'left',
    },
    cont: {
        fontFamily: 'avenir',
        fontSize: 14,
        margin: 10,
        backgroundColor: 'rgb(123, 125, 125)',
        borderRadius: 10,
        textAlign: 'center',
        color: 'rgb(234,252,255)',
        padding: 5,
    },
    alerta: {
        fontFamily: 'avenir',
        fontSize: 14,
        margin: 10,
        backgroundColor: 'rgb(52, 152, 219)',
        borderRadius: 10,
        textAlign: 'center',
        padding: 5,
        color: 'rgb(234,252,255)',
    },
    switch: {
        fontFamily: 'avenir',
        fontSize: 10,
        margin: 4,
        textAlign: 'center',
        color:'rgb(77, 86, 86)',
    },
    error: {
        fontFamily: 'avenir',
        fontSize: 19,
        margin: 20,
        color: 'rgb(203, 67, 53)'
    },
})


export default Registro;