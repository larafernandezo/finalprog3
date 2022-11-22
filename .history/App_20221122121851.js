import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registro from './src/screens/Registro';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Menu from './src/components/Menu';
import MyCamera from './src/components/Camera';
import OtherProfile from './src/screens/OtherProfile';
import Perfil from './src/screens/Perfil';


const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options= {{ headerShown : false}}/>
        <Stack.Screen name='Registro' component={Registro} options= {{ headerShown : false}}/>
        <Stack.Screen name='Home' component={Home} options= {{ headerShown : false}}/>
        <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
        <Stack.Screen name='Menu' component={Menu} options= {{ headerShown : false}}/>
        <Stack.Screen name="Comentario" component={Comentario} options={{ headerShown: false }} />
        <Stack.Screen name="OtherProfile" component={OtherProfile} options={{ headerShown: false }} />
        <Stack.Screen name="MyCamera" component={MyCamera} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;