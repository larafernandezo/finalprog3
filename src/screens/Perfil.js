import React, {Component} from "react";
import {auth, db} from '../firebase/config'
import {View, Text, StyleSheet, Image} from "react-native";
import {FlatList} from "react-native-web"
import Post from "../components/Post";


class Perfil extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:[],
            posteos:[],
            email:'',
            bio:'',

        }
    };


    componentDidMount(){
        console.log(this.props)
            db.collection('posts').where('owner', '==', this.props.route.params.email).onSnapshot(
                docs =>{
                        let posts = [];
                   docs.forEach( doc => {
                        posts.push({
                            id: doc.id,
                            data: doc.data()
                })
                       this.setState({
                        posts: posts,
                        loading: false,
                   })
                })
                }
            )
            db.collection('users').where('owner', '==', this.props.route.params.email).onSnapshot(
                docs => {
                    let user = [];
                    docs.forEach( doc => {
                        user.push({
                            id: doc.id,
                            data: doc.data(),
                        })
                        this.setState({
                            user: user
                        })
                    }) 
                }
            )
        }
        cerrarSesion() {
            auth.signOut()
            this.props.navigation.navigate("Register")
        }

    render(){
        console.log(this.state.user.photo);
        return(
            <View>
            <View>
                <Text onPress={() => this.cerrarSesion()}>Cerrar sesión</Text>
            </View>
            {
                this.state.user.length == 0 ?
                <Text></Text> :
                <Text> Profile Name : {this.state.user.userName} </Text>
            }
            <Image
                style={styles.foto}
                source={{ uri: this.state.user.photo }}
                resizeMode='contain'
                />
            <Text> Lista de posteos</Text>
            <FlatList 
                data={this.state.posts}
                keyExtractor={ onePost => onePost.id.toString()}
                renderItem={ ({item}) => <Post postData={item} />}
            />       
        </View>
        );
    }
};

const styles = StyleSheet.create({
    foto:{
        width:150,
        height:150
    }
})

export default Perfil;