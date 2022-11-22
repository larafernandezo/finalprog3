import React, {Component} from 'react'
import { Text, View,TextInput, TouchableOpacity, StyleSheet, Image, FlatList} from 'react-native'
import {auth, db} from '../firebase/config';
import firebase from 'firebase'
import { FontAwesome } from '@expo/vector-icons';

class Post extends Component {
    constructor (props){
        super (props)
        this.state={
            likes: 0,
            myLike: false,
            comment: ''
           
        }
    }
componentDidMount() {
    if (this.props.postData.data.likes) {
        this.setState({
            likes: this.props.postData.data.likes.length,
            myLike: this.props.postData.data.likes.includes(auth.currentUser.email),
        })
    }
}

like(){
    //agregar mi mailal array
    db.collection('posts')
    .doc(this.props.postData.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion (auth.currentUser.email)
    })
    .then(()=> this.setState({
        //cambiar el estado de likes y de myLike
       
        likes: this.props.postData.data.likes.length,
        myLike: true
    })
    )
    .catch(e=>console.log(e))
}

unLike(){
     //Quitar mi email a un array
    db.collection('posts').doc(this.props.postData.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove (auth.currentUser.email)
    })
    .then(()=> this.setState({
         //Cambiar el estado de likes y de mylike.
        likes: this.props.postData.data.likes.length,
        myLike: false
    })
    )
    .catch(e=>console.log(e))
}
publicarComentario() {
    //Armar el comentario.
    let oneComment = {
        author: auth.currentUser.email,
        createdAt: Date.now(),
        commentText: this.state.comment
    }
    //Actualizar comentario en la base. Puntualmente en este documento.
    //Saber cual es el post que queremos actualizar
    db.collection('posts').doc(this.props.postData.id).update({
        comments: firebase.firestore.FieldValue.arrayUnion(oneComment)
    })
        .then(() => {
            //Cambiar un estado para limpiar el form
            console.log('Comentario guardado');
            this.setState({
                comment:''
            })
        })
        .catch(e => console.log(e))
}

render(){
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('OtherProfile', {email: this.props.postData.data.owner})}>
            <Text  style={styles.user}>Subido por: {this.props.postData.data.owner} </Text>
            </TouchableOpacity>
            <Image
                style={styles.img}
                source={{uri: this.props.postData.data.photo}} 
            />
            {
                this.state.myLike ?
                
            <TouchableOpacity style={styles.like} onPress={()=> this.unLike()} >
                <FontAwesome name='heart' color='red' size={35} />
            </TouchableOpacity>
                :
             <TouchableOpacity style={styles.like} onPress={()=> this.like()} >
                <FontAwesome name='heart-o' color='red' size={35} />
             </TouchableOpacity>
            } 
            <Text style={styles.text}> {this.state.likes} likes</Text>
            <Text style={styles.text}> Descripción: {this.props.postData.data.textoPost} </Text>
            {
                this.props.postData.data.comments == undefined ?
                   
                       
                        <Text>No hay comentarios, comenta primero</Text>
                        :
                        <React.Fragment>
                        <FlatList
                            data={this.props.postData.data.comments.slice(-4)}
                            keyExtractor={post => post.createdAt.toString()}
                            renderItem={({ item }) => <Text> {item.author}: {item.commentText}</Text>}
                        /> 
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', {id: this.props.id})}>Más comentarios</TouchableOpacity>
                    </React.Fragment>
                    
            }
                    <TextInput keyboardType='default'
                        placeholder='Escribí tu comentario'
                        onChangeText={(text) => { this.setState({ comment: text }) }}
                        value={this.state.comment}
                    />
                         
        </View>
    )
}
}
const styles= StyleSheet.create ({

 
    container:{
     alignItems:'center',
    },
    text:{
    marginTop: 0,
    fontFamily: 'avenir',
    fontSize:18,
    color:'black', 
    marginLeft:'0'  
    },
    img:{
        height:350,
        width:350,
        border: '10px solid gainsboro',
        borderRadius:4 ,
        padding: 5,
        alignItems:'center'
          
    },
   
    like:{
        marginRight:'25%',
        marginTop: 2,
    },button:{
        backgroundColor: 'black',
        color: 'black',
        border: 'none',
        padding: 5 
    },
    user:{
        fontFamily: 'avenir',
        color:'black',
        fontSize:18,
        marginRight:'40%',
        width:"100%",
        borderRadius:4,
        alignItems:'left'
    },


    

})
export default Post;