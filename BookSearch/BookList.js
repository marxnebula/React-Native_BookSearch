/*
 * Class for displaying the list of books.
 * It passes the book object that corresponds to that particular row to the BookDetail class.
 */



// Enables strict mode, which adds improved error handling to React Native JavaScript code
'use strict';

var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction';
 
// Loads the react-native module and assigns it to the variable React
var React = require('react-native');

// The BookDetail class
var BookDetail = require('./BookDetail');

// Enables you to assign multiple object properties to a single variable
// Meaning, use React instead of React.Text, etc
var {
    Image,
    StyleSheet,
    Text,
    View,
    Component,
    ListView,
    TouchableHighlight,
    ActivityIndicatorIOS
   } = React;
 
 // The style sheet
 // flexDirection: row -> This will make the children of the element with that 
 // style to be laid out horizontally rather than vertically which is the default.
 // flex: 1 ->  This makes that view occupy the rest of the space not occupied by the image.
 // flex: 2 in both styles would make image and text occupy same amount of space.
var styles = StyleSheet.create({
    container: {
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
   loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   }
});
 
class BookList extends Component {

    // The DataSource is an interface that ListView uses to determine which rows 
    // have changed over the course of updates to the UI. Provide a function that 
    // compares the identity of a pair of rows and this is used to determine the 
    // changes in a list of data.
    constructor(props) {
       super(props);
       this.state = {
            isLoading = true,
           dataSource: new ListView.DataSource({
               rowHasChanged: (row1, row2) => row1 !== row2
           })
       };
   }

   // Called when the component is loaded/mounted onto the UI view. 
   // Calls fetchData().
   componentDidMount() {
       this.fetchData();
   }
 
    // Calls to the Google books API and sets the dataSource property
    // with the data it gets from the response.  It also sets isLoading.
   fetchData() {
       fetch(REQUEST_URL)
       .then((response) => response.json())
       .then((responseData) => {
           this.setState({
               dataSource: this.state.dataSource.cloneWithRows(responseData.items),
               isLoading: false
           });
       })
       .done();
   }


    render() {
       if (this.state.isLoading) {
           return this.renderLoadingView();
       }
 
       return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderBook.bind(this)}
                style={styles.listView}
            />
        );
}  
    
renderLoadingView() {
    return (
        <View style={styles.loading}>
            <ActivityIndicatorIOS
                size='large'/>
            <Text>
                Loading books...
            </Text>
        </View>
    );
}

    renderBook(book) {
       return (
            <TouchableHighlight onPress={() => this.showBookDetail(book)}  underlayColor='#dddddd'>
                <View>
                    <View style={styles.container}>
                        <Image
                            source={{uri: book.volumeInfo.imageLinks.thumbnail}}
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

   // This will push the BookDetail view onto the navigation stack and set the title 
   // seen on the navigation bar. It passes the book object that corresponds to that 
   // particular row to the BookDetail class.
   showBookDetail(book) {
       this.props.navigator.push({
           title: book.volumeInfo.title,
           component: BookDetail,
           passProps: {book}
       });
   }
}
 
// Exports the BookList class thus making it available for use by other files. 
module.exports = BookList;