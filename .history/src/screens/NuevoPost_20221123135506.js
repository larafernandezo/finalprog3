import React, {Component} from 'react'
import {Text, StyleSheet, TextInput, TouchableOpacity,View} from 'react-native';
import {auth, db} from '../firebase/config';
import MyCamera from "../components/Camera";



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

   
    createPost(texto, photo){
        db.collection('posts').add({
                owner: auth.currentUser.email, 
                textoPost: texto,
                photo: photo,
                likes:[],
                comments:[],
                createdAt: Date.now()
            })

            .then(() => {
                this.setState({
                    textoPost:'',
                    showCamera: true,
                })
                this.props.navigation.navigate('Home')
            })
            .catch( e => console.log(e))
    }

    onImageUpload(url){
        this.setState({
            photo: url,
            showCamera: false,
        })
    }

    render(){
        return(
            <View>
            {
                this.state.showCamera ?
                <MyCamera onImageUpload={url => this.onImageUpload(url)}/>
                :
                <View style={styles.container}>
                    <Text> Nuevo posteo form</Text>
                    <View>
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
export default NuevoPost;