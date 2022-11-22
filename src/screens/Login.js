import React, {Component} from 'react';
import {auth} from '../firebase/config';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: "",
            contraseña: "",
            error: ""
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(usuario => {
            if (usuario){
                this.props.navigation.navigate ("Menu")
            }
        })
    }

    iniciarUsuario(email, contraseña){
        auth.signInWithEmailAndPassword(email, contraseña)
            .then( res => {
                this.props.navigation.navigate("Menu")
            })
            .catch(error => 
                this.setState({
                error: error.message
            })
            )
    }

    render(){
        return(
            <View style={styles.fondo}>

            <Text style={styles.error}>{this.state.error}</Text>


                <Text style={styles.titulo}>Iniciar Sesión</Text>

                <View style={styles.caja}>
                <Text style={styles.error}>{this.state.error}</Text>
                    <TextInput 
                        placeholder= 'Cuenta de Email'
                        keyboardType= 'email-address'
                        onChangeText={ texto => this.setState({email : texto})}
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


{
                this.state.email =="" || this.state.contraseña =="" ? 
                    <TouchableOpacity>
                        <Text style={styles.alerta}>Ingresar</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity onPress={ () => this.iniciarUsuario (this.state.email, this.state.contraseña)} >
                        <Text style={styles.cont}>Ingresar</Text>
                    </TouchableOpacity>
            
}

                    <Text onPress={ () => this.props.navigation.navigate ('Registro')} style={styles.switch}>¿No tenés cuenta? Registrate haciendo click aquí</Text>
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
        borderRadius: 6,
        padding: 20,
         
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
        backgroundColor: 'rgb(234,252,255)',
        borderRadius: 10,
        textAlign: 'center',
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



export default Login;