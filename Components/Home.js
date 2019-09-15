import React from 'react';
import {
    Button,
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default class Home extends React.Component {
    
    constructor(props) {
        super(props);
    }

    _onPressStartStopButton = () => {
        
        this.props.navigation.navigate('Camera')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.button}>
                    <Button onPress={this._onPressStartStopButton} title={"Go"} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150,
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});