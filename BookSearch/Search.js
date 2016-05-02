/*
 * Class for setting up the NavigatorIOS for Search.
 */


// Enables strict mode, which adds improved error handling to React Native JavaScript code
'use strict';

// Loads the react-native module and assigns it to the variable React
var React = require('react-native');

// The SearchBooks class
var SearchBooks = require('./SearchBooks');
 
// Enables you to assign multiple object properties to a single variable
// Meaning, use React instead of React.Text, etc
var {
    StyleSheet,
    NavigatorIOS,
    Component
   } = React;

// The style sheet
var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
 
// Use the NavigatorIOS component to construct a navigation controller.
// Set its initial route to the BookList component (which will be its root view) 
// and set a title that will appear on the navigation bar
class Search extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
            title: 'Search Books',
            component: SearchBooks
        }}/>            
        );
    }
}
 
 // Exports the Search class thus making it available for use by other files. 
module.exports = Search;