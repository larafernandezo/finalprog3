import React, { Component } from 'react';
import { Camera } from 'expo-camera';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { storage } from '../firebase/config';
import { Feather } from '@expo/vector-icons';

class MyCamera extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photo: '',
            showCamera: true,
            permission: false,
        }
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()// a traves de est emetodo lo que le decimos ees que nos permita acceder a la camera
            .then(() => {
                this.setState({
                    permission: true,
                })
            })
            .catch(e => console.log(e))
    }

    takePicture() {
        this.metodosDeCamera.takePictureAsync()
                .then(photo => {
                this.setState({
                    photo: photo.uri, //Es una uri interna temporal de la photo.
                    showCamera: false
                })
            })
            .catch (e => console.log (e))
    }

    savePhoto() {
        fetch(this.state.photo)
            .then(res => res.blob())
            .then(image => {
                const ref = storage.ref(`photos/${Date.now()}.jpg`)
                ref.put(image) //ref es un atributo, es una rederencia a esa camara apara despues poder pedirle a esa camara
                    .then(() => {
                        ref.getDownloadURL()
                            .then(url => {
                                console.log(url)
                                this.props.onImageUpload(url);
                            })
                    })
            })
            .catch(e => console.log(e))
    }
    rechazar() {
        this.setState({
            photo: '',
            showCamera: true
        })
    }

    render() {
        return (
            <View>
                {this.state.showCamera === false ?
                    <View>
                        <Image style={styles.preview}
                            source={{ uri: this.state.photo }}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.savePhoto()}>
                            <Text>Aceptar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.rechazar()}>
                            <Text>Rechazar</Text>
                        </TouchableOpacity>
                    </View> :
                    <View style={styles.container}>

                        <Camera
                            style={styles.cameraBody}
                            type={Camera.Constants.Type.back}//yo puse back xq quiero q sea pal cel 
                            ref={metodosDeCamera => this.metodosDeCamera = metodosDeCamera} //esta ref va a buscatr esee componenete
                            //meetodos
                        />
                        

                        <TouchableOpacity
                            style={styles.shootButton}
                            onPress={() => this.takePicture()}>
                            <Feather name="camera" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                }
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF143',
        borderRadius: '5%',
        height: '35vw',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '8%',
        display: 'flex',
    },
    button: {
        width: '65vw',
        height: '55vh',
        padding: '30px'
    },

    preview: {
        width: '110%',
        height: '80vh',
        position: 'absolute'
    },

    shootButton: {
        marginTop: '200%'
    },
    cameraBody: {
        width: '70vw',
        height: '100vh',
        position: 'absolute',

    },
})
export default MyCamera;