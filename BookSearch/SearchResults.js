/*
 * Class for displaying the results of the searched book.
 * Uses ListView to display the books. Pushes the selected books detail to BookDetail class.
 */


// Enables strict mode, which adds improved error handling to React Native JavaScript code
'use strict';
 
// Loads the react-native module and assigns it to the variable React
var React = require('react-native');

// The BookDetail class
var BookDetail = require('./BookDetail');

// Enables you to assign multiple object properties to a single variable
// Meaning, use React instead of React.Text, etc
var {
    StyleSheet,
    View,
    Text,
    Component,
    TouchableHighlight,
    Image,
    ListView
    } = React;
 
// The style sheet
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginBottom: 8
    },
    author: {
        color: '#656565'
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    listView: {
        backgroundColor: '#F5FCFF'
    },
    cellContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    rightContainer: {
        flex: 1
    }
});
 
// The SearchResults class
class SearchResults extends Component {
 
    // Create states here
    constructor(props) {
        super(props);
 
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (row1, row2) => row1 !== row2});
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.books)
        };
    }
 
    render() {
 
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderBook.bind(this)}
                style={styles.listView}
                />
        );
    }
 
    renderBook(book) {
        var imageURI = (typeof book.volumeInfo.imageLinks !== 'undefined') ? book.volumeInfo.imageLinks.thumbnail : '';
 
        return (
            <TouchableHighlight onPress={() => this.showBookDetail(book)}
                                underlayColor='#dddddd'>
                <View>
                    <View style={styles.cellContainer}>
                        <Image
                            source={{uri: imageURI}}
                            style={styles.thumbnail} />
                        <View style={styles.rightContainer}>
                            <Text style={styles.title}>{book.volumeInfo.title}</Text>
                            <Text style={styles.author}>{book.volumeInfo.authors}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
        );
    }
 
    // Pushes the book detail to BookDetail
    showBookDetail(book) {
 
        this.props.navigator.push({
            title: book.volumeInfo.title,
            component: BookDetail,
            passProps: {book}
        });
    }
 
}
 
// Exports the SearchResults class thus making it available for use by other files. 
module.exports = SearchResults;