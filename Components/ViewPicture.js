import React, { Component } from 'react';
import {
    Alert,
    ActivityIndicator,
    StyleSheet,
    View,
    Button,
    Image,
    Dimensions,
    FlatList,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { GOOGLE_API_KEY } from 'react-native-dotenv'

export default class ViewPicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "default",
            uploading: false,
            googleResponse: {
                "responses": [
                    {
                        "labelAnnotations": []
                    }
                ]
            },
        };
    }

    submitToGoogle = async () => {
        try {
            let body = JSON.stringify({
                requests: [
                    {
                        features: [
                            { type: 'LABEL_DETECTION', maxResults: 10 }
                        ],
                        image: { content: this.state.image }
                    }
                ]
            });

            fetch(
                "https://vision.googleapis.com/v1/images:annotate?key=" + GOOGLE_API_KEY,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: body
                }
            )
                .then(res => res.json())
                .then(json => {
                    this.setState({ googleResponse: json.responses[0].labelAnnotations })
                    console.log(json.responses[0].labelAnnotations);
                })
                .catch(err => console.log(err));

        } catch (error) {
            console.log(error);
        }
    };

    _onPressTakeAgain = () => {
        this.props.navigation.navigate('Camera')
    }

    renderItem = food => (
        <TouchableOpacity
            style={styles.list}
            onPress={() => {
                this.props.navigation.navigate('Info', {
                    id: food.item.description,
                })
            }}
        >
            <Text style={styles.lightText}>
                {}
                {food.item.description}
                {}
            </Text>
        </TouchableOpacity>
    );

    FlatListItemSeparator = () => <View style={styles.line} />;

    submit = (base) => {
        this.setState({
            image: base
        }, function () { this.submitToGoogle() });
    }

    componentDidMount() {
        const { navigation } = this.props;
        var RNFS = require('react-native-fs');
        const url = navigation.getParam('url', 'some default value that doesnt matter');
        this.setState({
            image: url,
        }, function () {
            RNFS.readFile(this.state.image, 'base64')
                .then(res => {
                    this.submit(res);
                });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: this.state.image }}
                    //for some reason, the picture will turn out sideways, so this style will rotate the picture by 90 degrees and make it fit the screen size
                    style={styles.image}
                />
                <Text>{"\n"}</Text>

                <View style={styles.buttonContainer}>
                    <Button onPress={this._onPressTakeAgain} title={"Take Picture Again"} />
                </View>

                <View style={styles.container}>
                    <Text style={styles.title}>Is this a...</Text>
                    {this.FlatListItemSeparator()}
                    <FlatList
                        data={this.state.googleResponse}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={item => this.renderItem(item)}
                        keyExtractor={(item, index) => item.id}
                    />
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    contentContainer: {
        paddingTop: 30
    },
    image: {
        flex: 1,
        width: Dimensions.get('window').height / 2,
        height: Dimensions.get('window').width / 1.25,
        resizeMode: 'contain',
        transform: [{ rotate: '90deg' }]
    },
    list: {
        paddingVertical: 15,
        margin: 3,
        flexDirection: 'row',
        backgroundColor: '#FFFAFA',
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: -1
    },
    line: {
        height: 0.5,
        width: '100%',
        backgroundColor: 'gray'
    },
    title: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: 'gray',
        margin: 20
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

//visualizeFood('./images/cookie.jpg').catch(console.error);

/*
 <View style={styles.container}>
                        <Text style={styles.title}>Is this a?</Text>
                        {this.FlatListItemSeparator()}
                        <FlatList
                            data={this.state.googleResponse.responses[0].labelAnnotations}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            renderItem={item => this.renderItem(item)}
                            keyExtractor={(item, index) => item.id}
                        />
                    </View>
*/