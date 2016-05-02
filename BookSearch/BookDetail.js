/*
 * Class for displaying the books title, author, and a short description.
 */


// Enables strict mode, which adds improved error handling to React Native JavaScript code
'use strict';
 
// Loads the react-native module and assigns it to the variable React
var React = require('react-native');
 
// Enables you to assign multiple object properties to a single variable
// Meaning, use React instead of React.Text, etc
var {
    StyleSheet,
    Text,
    View,
    Component,
    Image
   } = React;
 
// The style sheet
var styles = StyleSheet.create({
    container: {
        marginTop: 75,
        alignItems: 'center'
    },
    image: {
        width: 107,
        height: 165,
        padding: 10
    },
    description: {
        padding: 10,
        fontSize: 15,
        color: '#656565'
    }
});
 
// Data is passed into this class by setting its props property to extract data from.
// Checks if the data passed in has an image and description before populating the 
// view with this data.
class BookDetail extends Component {
    render() {
    var book = this.props.book;
    var imageURI = (typeof book.volumeInfo.imageLinks !== 'undefined') ? book.volumeInfo.imageLinks.thumbnail : '';
    var description = (typeof book.volumeInfo.description !== 'undefined') ? book.volumeInfo.description : '';
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: imageURI}} />
            <Text style={styles.description}>{description}</Text>
        </View>
    );
}
}
 
// Exports the BookDetail class thus making it available for use by other files. 
module.exports = BookDetail;