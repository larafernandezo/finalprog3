import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MiPerfil from '../screens/MiPerfil';
import NuevoPost from "../screens/NuevoPost"
import Home from '../screens/Home';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react';

const Tab = createBottomTabNavigator();

function Menu () {
    return(
        <Tab.Navigator screenOptions = {{ tabBarShowLabel: false}}>
            <Tab.Screen name = "Home" component={ Home } options = { {tabBarIcon:() => <AntDesign name="search1" size={24} color="black" />}} />
            <Tab.Screen name = "Postear" component={ NuevoPost } />
            <Tab.Screen name = "Perfil" component={ MiPerfil } />
        </Tab.Navigator>
    );
};

export default Menu;