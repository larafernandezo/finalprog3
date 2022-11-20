import React, { Component } from 'react';
import {auth, db} from '../firebase/config';
import {Text, FlatList, View} from 'react-native';
import Post from '../components/Post';

class Home extends Component {
    constructor(){
        super();
        this.state = {
            posteos: [],

        }
    }
//aca dice coleccion posts on sanpchot , voy armando un edstado con la variable qu epueda terminar en el estado a post
//Con esa variable van a estar los post
//con ese estado 
//estoy trayendo todo lo que tengga la coleccion de posteos 
    componentDidMount() {
        db.collection('posteos').onSnapshot(
            docs => {
                 //console.log(docs);
                let posts = []; //armo una varible con estado y acavan a estra todos los datos
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posteos: posts
                    })
                })

            }
        )
    }


    //con ese estado voy a crear una flat list que lo que va a hacer es renderizar un componente post al que vamos a pasar la informacion de item 
//CUANDO REDEricemos en el renderItem el temrino que va ahi siempr e es ITEM no lo podemos cambiar por posts
// por q estamos desestructurando item derenderItem. Por eso depsues lo que hago es pasarle a ese item como informacion al posteo 
//el componente post le paso todo lo que yo recibo en ese elemnto item 
//como llega por props despues lo puedo procesar. Vamos al componente post ahora. solo para el ejemplo de la clase
//Vamos a hacer dos cosas con la flatlist vamoos a armar una lista cortita para q retorne una lista de texto
//despues vamos a hacer que esa flatlist renderice ottrocomponente  al cual le vamos a pasar ptops para q se puedan ver 
//
    render(){
        console.log(this.state.posts);
        return(
            <View>
                <Text> Home</Text>
                <Text> Lista de posteos </Text>
         
        
                    <FlatList 
                        data={this.state.posts}
                        keyExtractor={ onePost => onePost.id.toString()}
                        renderItem={ ({item}) => <Post postData={item} />}
                    />        
                
            </View>
//en la flatlist estoy renderizando lo q le voy a pasar een el componente post 
        )
    }
}

export default Home;