import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Slider,
    TouchableWithoutFeedback,
    Dimensions,
    YellowBox
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage';

const flashModeOrder = {
    off: 'on',
    on: 'auto',
    auto: 'torch',
    torch: 'off',
};

export default class Camera extends React.Component {
    state = {
        flash: 'off',
        autoFocus: 'on',
        autoFocusPoint: {
            normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
            drawRectPosition: {
                x: Dimensions.get('window').width * 0.5 - 32,
                y: Dimensions.get('window').height * 0.5 - 32,
            },
        },
        depth: 0,
        type: 'back',
        whiteBalance: 'auto',
        ratio: '16:9',
        recordOptions: {
            mute: false,
            maxDuration: 5,
            quality: RNCamera.Constants.VideoQuality['288p'],
        },
        isRecording: false,
        canDetectFaces: false,
        canDetectText: false,
        canDetectBarcode: false,
        faces: [],
        textBlocks: [],
        barcodes: [],
        image: "",
        date: "",
    };

    toggleFacing() {
        this.setState({
            type: this.state.type === 'back' ? 'front' : 'back',
        });
    }

    toggleFlash() {
        this.setState({
            flash: flashModeOrder[this.state.flash],
        });
    }

    toggleFocus() {
        this.setState({
            autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
        });
    }

    setFocusDepth(depth) {
        this.setState({
            depth,
        });
    }

    takePicture = async function () {
        if (this.camera) {
            const data = await this.camera.takePictureAsync(); //location in cache
            this.storeData(data);
            this.props.navigation.navigate('ViewPicture', { itemId: Math.floor(Math.random() * 100), url: data.uri });
        }
    };

    storeData = async (data) => {

        await AsyncStorage.setItem("Picture", data.uri).catch(alert);
    }

    toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));

    componentDidMount() {
        const { navigation } = this.props;
        const url = navigation.getParam('url', 'some default value that doesnt matter');
        this.setState({
            image: url,
        });
        console.disableYellowBox = true;
    }

    renderCamera() {

        const drawFocusRingPosition = {
            top: this.state.autoFocusPoint.drawRectPosition.y - 32,
            left: this.state.autoFocusPoint.drawRectPosition.x - 32,
        };
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}
                type={this.state.type}
                flashMode={this.state.flash}
                autoFocus={this.state.autoFocus}
                autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
                ratio={this.state.ratio}
                focusDepth={this.state.depth}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                captureAudio={false}
            >
                <View style={StyleSheet.absoluteFill}>
                    <View style={drawFocusRingPosition} />
                    <View style={{ flex: 1 }} />
                </View>
                <View
                    style={{
                        flex: 0.5,
                        height: 72,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}
                    >
                        <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
                            <Text style={styles.flipText}> FLIP </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
                            <Text style={styles.flipFlash}> FLASH: {this.state.flash} </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}
                    >
                    </View>
                </View>
                <View style={{ bottom: 0 }}>
                    <View
                        style={{
                            height: 20,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            alignSelf: 'flex-end',
                        }}
                    >
                        <Slider
                            style={{ width: 150, marginTop: 5, alignSelf: 'flex-end' }}
                            onValueChange={this.setFocusDepth.bind(this)}
                            step={0.1}
                            disabled={this.state.autoFocus === 'on'}
                        />
                    </View>
                    <View
                        style={{
                            height: 56,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            alignSelf: 'flex-end',
                        }}
                    >
                        <TouchableOpacity
                            style={[styles.bottomFlipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
                            onPress={this.toggleFocus.bind(this)}
                        >
                            <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.bottomFlipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
                            onPress={this.takePicture.bind(this)}
                        >
                            <Text style={styles.flipText}> SNAP </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </RNCamera >
        );
    }

    render() {
        return <View style={styles.container}>{this.renderCamera()}</View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#000',
    },
    flipButton: {
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        paddingHorizontal: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomFlipButton: {
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    autoFocusBox: {
        position: 'absolute',
        height: 64,
        width: 64,
        borderRadius: 12,
        borderWidth: 2,
        opacity: 0.4,
    },
    flipText: {
        color: 'white',
        fontSize: 15,
        width: 50,
    },
    flipFlash: {
        color: 'white',
        fontSize: 15,
        width: 100,
    },
    picButton: {
        backgroundColor: 'darkseagreen',
    },
});