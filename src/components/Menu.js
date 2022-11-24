import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MiPerfil from '../screens/MiPerfil';
import NuevoPost from "../screens/NuevoPost"
import Home from '../screens/Home';
import React, { Component } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function Menu () {
    return(
        <Tab.Navigator screenOptions = {{ tabBarShowLabel: false}}>
            <Tab.Screen name = "Home" component={ Home } options ={ { tabBarIcon: () => <Feather name="home" size={24} color="#b8eb91" /> } }  />
            <Tab.Screen name = "Postear" component={ NuevoPost }  options ={{ tabBarIcon: () => <Feather name="plus-circle" size={24} color="#ce68fd" /> }}/>
            <Tab.Screen name = "Perfil" component={ MiPerfil } options={{ tabBarIcon: () => <MaterialIcons name="tag-faces" size={24} color="#fa9c3c" /> }}/>
        </Tab.Navigator>
    );
};

export default Menu;