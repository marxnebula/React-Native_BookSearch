/*
 * Class for searching for a book. A URL is constructed depending on the data entered.
 * A user can search by title, author or both title and author. If results are returned, 
 * SearchResults will be pushed on to the navigation stack otherwise an error message will 
 * be displayed. We also pass the response data to the SearchResults class.
 */


// Enables strict mode, which adds improved error handling to React Native JavaScript code
'use strict';
 
// Loads the react-native module and assigns it to the variable React
var React = require('react-native');

// The SearchResults class
var SearchResults = require('./SearchResults');
 
// Enables you to assign multiple object properties to a single variable
// Meaning, use React instead of React.Text, etc
var {
    StyleSheet,
    View,
    Text,
    Component,
    TextInput,
    TouchableHighlight,
    ActivityIndicatorIOS
    } = React;

// The style sheet
var styles = StyleSheet.create({
    container: {
        marginTop: 65,
        padding: 10
    },
    searchInput: {
        height: 36,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        borderWidth: 1,
        flex: 1,
        borderRadius: 4,
        padding: 5
    },
    button: {
        height: 36,
        backgroundColor: '#f39c12',
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 15
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    instructions: {
        fontSize: 18,
        alignSelf: 'center',
        marginBottom: 15
    },
    fieldLabel: {
        fontSize: 15,
        marginTop: 15
    },
    errorMessage: {
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 15,
        color: 'red'
    }
});
 
class SearchBooks extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            bookAuthor: '',
            bookTitle: '',
            isLoading: false,
            errorMessage: ''
        };
    }
 
    // Check if isLoading is true and create an activity indicator if it is,
    // otherwise, create an empty view. Create the search form that will be used 
    // to insert queries. A callback function for each TextInput component 
    // will be called when the value of the component changes.
    render() {
        var spinner = this.state.isLoading ?
            ( <ActivityIndicatorIOS
                hidden='true'
                size='large'/> ) :
            ( <View/>);
        return (
            <View style={styles.container}>
                <Text style={styles.instructions}>Search by book title and/or author</Text>
                <View>
                    <Text style={styles.fieldLabel}>Book Title:</Text>
                    <TextInput style={styles.searchInput} onChange={this.bookTitleInput.bind(this)}/>
                </View>
                <View>
                    <Text style={styles.fieldLabel}>Author:</Text>
                    <TextInput style={styles.searchInput} onChange={this.bookAuthorInput.bind(this)}/>
                </View>
                <TouchableHighlight style={styles.button}
                                    underlayColor='#f1c40f'
                                    onPress={this.searchBooks.bind(this)}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableHighlight>
                {spinner}
                <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
            </View>
        );
    }
 
    // Will set the bookTitle state properties with the data entered by the user
    bookTitleInput(event) {
        this.setState({ bookTitle: event.nativeEvent.text });
    }
 
    // Will set the bookAuthor state properties with the data entered by the user
    bookAuthorInput(event) {
        this.setState({ bookAuthor: event.nativeEvent.text });
    }
 
    // Called when the user presses the Search button.
    searchBooks() {
        this.fetchData();
    }
 
    // When the Search button is pressed, a URL is constructed depending on the data entered.
    // A user can search by title, author or both title and author. If results are returned, 
    // SearchResults will be pushed on to the navigation stack otherwise an error message will 
    // be displayed. We also pass the response data to the SearchResults class.
    fetchData() {
 
        this.setState({ isLoading: true });
 
        var baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';
        if (this.state.bookAuthor !== '') {
            baseURL += encodeURIComponent('inauthor:' + this.state.bookAuthor);
        }
        if (this.state.bookTitle !== '') {
            baseURL += (this.state.bookAuthor === '') ? encodeURIComponent('intitle:' + this.state.bookTitle) : encodeURIComponent('+intitle:' + this.state.bookTitle);
        }
 
        console.log('URL: >>> ' + baseURL);
        fetch(baseURL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ isLoading: false});
                if (responseData.items) {
 
                    this.props.navigator.push({
                        title: 'Search Results',
                        component: SearchResults,
                        passProps: {books: responseData.items}
                    });
                } else {
                    this.setState({ errorMessage: 'No results found'});
                }
            })
            .catch(error =>
                this.setState({
                    isLoading: false,
                    errorMessage: error
                }))
            .done();
    }
 
}
 
// Exports the SearchBooks class thus making it available for use by other files. 
module.exports = SearchBooks;