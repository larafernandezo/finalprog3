import React, { Component, ReactFragment } from 'react';
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
        Camera.requestCameraPermissionsAsync()
            .then(() => {
                this.setState({
                    permission: true,
                })
            })
            .catch(e => console.log(e))
    }

    Sacar() {
        this.metodosDeCamera.SacarAsync()
            .then(photo => {
                this.setState({
                    photo: photo.uri, //Es una uri interna temporal de la foto.
                    showCamera: false
                })
            })
    }

    savePhoto() {
        fetch(this.state.photo)
            .then(res => res.blob())
            .then(image => {
                const ref = storage.ref(`photos/${Date.now()}.jpg`)
                ref.put(image)
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
                            type={Camera.Constants.Type.back}
                            ref={metodosDeCamera => this.metodosDeCamera = metodosDeCamera}
                        />

                        <TouchableOpacity
                            style={styles.shootButton}
                            onPress={() => this.Sacar()}>
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
        backgroundColor: '#FF1493',
        borderRadius: '5%',
        height: '150vw',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '8%',
        display: 'flex',
    },
    cameraBody: {
        width: '65vw',
        height: '55vh',
        position: 'absolute',

    },

    preview: {
        width: '100%',
        height: '70vh',
        position: 'absolute'
    },

    shootButton: {
        marginTop: '200%'
    },
    button: {
        width: '65vw',
        height: '55vh',
        padding: '30px'
    }
})
export default MyCamera;