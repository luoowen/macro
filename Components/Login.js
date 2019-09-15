import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, 
    ImageBackground
} from 'react-native';

export default class Login extends Component {

    render(){
        return (
            <ImageBackground style = {styles.backgroundContainer}>


            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})