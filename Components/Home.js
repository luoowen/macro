import React from 'react';
import {
    Button,
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,

} from 'react-native';
import { Card, CardItem, Body, Container, Content, List, ListItem, Left, Fab, Icon } from 'native-base';
import * as firebase from 'firebase';
import { FIREBASE_API_KEY } from 'react-native-dotenv';

const cs = []

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        const firebaseConfig = {
            apiKey: FIREBASE_API_KEY,
            authDomain: "macro-dbe61.firebaseapp.com",
            databaseURL: "https://macro-dbe61.firebaseio.com",
            projectId: "macro-dbe61",
            storageBucket: "macro-dbe61.appspot.com",
            messagingSenderId: "307615212931",
            appId: "1:307615212931:web:5656aaaa803430c6aa42b6"
        };

        firebase.initializeApp(firebaseConfig);

        this.database = firebase.database();
        this.storage = firebase.storage();

        this.state = {
            history: []
        };

        this.database.ref('users/' + 'owen' + '/history').once('value')
            .then(ss => {

                let history = [];

                let vals = ss.val();
                for (let k in vals) {
                    history.push(vals[k]);
                }

                this.setState({
                    history: history
                });
            });


    }

    navToCamera = () => {
        this.props.navigation.navigate('Camera')
    }

    render() {
        return (

            <Container style={{ margin: 24 }}>


                <Fab containerStyle={{}} style={{ zIndex:999, backgroundColor: "#f44336" }} onPress={() => this.navToCamera()}>
                    <Icon name="ios-add" />
                </Fab>

                <Content style={{ flexDirection: 'column' }}>

                    <Card style={{ padding: 24, alignItems: "center" }}>
                        <CardItem style={{ alignItems: "center" }}>
                            <Body style={{ alignContent: "center" }}>
                                <Text style={{ fontSize: 36, fontWeight: "bold" }}>Macro</Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Text style={{ fontSize: 24, fontWeight: "bold" }}>History</Text>

                    <FlatList data={this.state.history}
                        keyExtractor={a => a.name}
                        renderItem={(a) => (
                            <Card>
                                <CardItem>

                                    <Left>
                                        <Body>
                                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{a.item.name}</Text>
                                            <Text>{a.item.cals} cals</Text>
                                        </Body>
                                    </Left>
                                </CardItem>

                                <CardItem cardBody>
                                    <Image source={{ uri: a.item.uri }} style={{ height: 200, width: null, flex: 1 }} />
                                </CardItem>
                            </Card>
                        )}>
                    </FlatList>

                </Content>
            </Container>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
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