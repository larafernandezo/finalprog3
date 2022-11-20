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
            <View style={styles.container}>
            <Text style={styles.titulo}>Regístrate</Text>    
            <View style={styles.form}>
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
                        style={styles.campo}
                    />
                    <TextInput 
                        placeholder= 'Contraseña'
                        keyboardType= 'default'
                        secureTextEntry = {true}
                        onChangeText={ texto => this.setState({contraseña : texto})}
                        value = {this.state.contraseña}
                        style={styles.campo}
                    />
                    <TextInput 
                        placeholder= 'Nombre de Usuario'
                        keyboardType= 'default'
                        onChangeText={ texto => this.setState({usuario : texto})}
                        value = {this.state.usuario}
                        style={styles.campo}
                    />
                    <TextInput 
                        placeholder= 'Biografía'
                        keyboardType= 'default'
                        onChangeText={ texto => this.setState({biografia : texto})}
                        value = {this.state.bio}
                        style={styles.campo}
                    />  
                    {
                        this.state.showCamera ? 
                            <View style={{width: "125vh", height: "125vh"}}>
                                <MyCamera onImageUpload={url => this.onImageUpload(url)}/>
                            </View>
                            :
                            <TouchableOpacity onPress={ () => this.setState({showCamera: true})}> 
                                <Text style={styles.boton}>Registrarme</Text>
                            </TouchableOpacity>
                    }

            {
                this.state.email =="" || this.state.contraseña =="" || this.state.usuario == "" ? 
                    <TouchableOpacity>
                        <Text style={styles.botonerror}>Registrarme</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity onPress={ () => this.registrarUsuario ( this.state.email,  this.state.contraseña, this.state.usuario, this.state.biografia, this.state.imagen)}>
                        <Text style={styles.boton}>Registrarme</Text>
                    </TouchableOpacity>
            }
                    <Text onPress={ () => this.props.navigation.navigate ("Login")} style={styles.link}>¿Ya tenés una cuenta? Iniciar Sesión</Text>
                    
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'rgb(234,252,255)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {
        fontFamily: 'Courier',
        fontSize: 22,
        margin: 20
    },
    form:{
        backgroundColor: 'rgb(94, 171, 194)',
        borderRadius: 10,
        padding: 15
    },
    error: {
        fontFamily: 'Courier',
        fontSize: 10,
        margin: 10,
        color: 'rgb(217,33,33)'
    },
    campo: {
        backgroundColor: 'rgb(234,252,255)',
        fontFamily: 'Courier',
        fontSize: 14,
        margin: 8,
        borderRadius: 10,
        textAlign: 'center',
        color: 'rgb(115, 115, 115)',
        padding: 5
    },
    boton: {
        fontFamily: 'Courier',
        fontSize: 14,
        margin: 10,
        backgroundColor: 'rgb(0,170,228)',
        borderRadius: 10,
        textAlign: 'center',
        padding: 5
    },
    botonerror: {
        fontFamily: 'Courier',
        fontSize: 14,
        margin: 10,
        backgroundColor: 'rgb(105,105,105)',
        borderRadius: 10,
        textAlign: 'center',
        padding: 5
    },
    link: {
        fontFamily: 'Courier',
        fontSize: 10,
        margin: 4,
        textAlign: 'right'
    },
    icono:{
        height: 120,
        width: 120
    }
})

export default Registro;