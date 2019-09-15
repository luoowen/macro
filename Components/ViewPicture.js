import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Button,
    Image,
    Dimensions,
    FlatList,
    Text,
} from 'react-native';

export default class ViewPicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleText: 'Added Successfully',
            justifyContent: 'center',
            image: "default",
            food: [],
        };
    }

    _onPressTakeAgain = () => {
        this.props.navigation.navigate('Camera')
    }

    renderItem = food => (
        <TouchableOpacity
            style={styles.list}
            onPress={() => {
                this.props.navigation.navigate('Info', {
                    id: food.item,
                })
            }}
        >
            <Text style={styles.lightText}>
                {}
                {food.item}
                {}
            </Text>
        </TouchableOpacity>
    );

    FlatListItemSeparator = () => <View style={styles.line} />;

    componentDidMount() {
        const { navigation } = this.props;
        const url = navigation.getParam('url', 'some default value that doesnt matter');
        this.setState({
            image: url,
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
                <View style={styles.button}>
                    <Button onPress={this._onPressTakeAgain} title={"Take Again"} />
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Activities</Text>
                    {this.FlatListItemSeparator()}
                    <FlatList
                        data={this.state.array}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={food => this.renderItem(food)}
                        keyExtractor={(item, index) => index.toString()}
                    />
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
        backgroundColor: '#ffffff',
    },
    image: {
        flex: 1,
        width: null,
        height: null,
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});