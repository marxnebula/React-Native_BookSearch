/*
 * Application for searching for books using the Google Books API to get the data.
 * User can browse to see the details of the author, title, and a short description.
 * Also displays a featured page of books.


  - Created by Jordan Patrick Marx 
    (5/1/2016)
 */




// Enables strict mode, which adds improved error handling to React Native JavaScript code
'use strict';
 
// Loads the react-native module and assigns it to the variable React
var React = require('react-native');

// The featured and search classes
var Featured = require('./Featured');
var Search = require('./Search');
 

// Enables you to assign multiple object properties to a single variable
// Meaning, use React instead of React.Text, etc
var {
    AppRegistry,
    TabBarIOS,
    Component
   } = React;
 

// BookSearch class
class BookSearch extends Component {
 
    // Create the states here
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'featured'
        };
    }
 
    // The TabBarIOS component creates a tab bar.
    // There are two TabBarIOS.Item which defines a function that will be called
    // when the item is pressed.
    render() {
        return (
            <TabBarIOS selectedTab={this.state.selectedTab}>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'featured'}
                    systemIcon={{uri:'featured'}}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'featured'
                        });
                    }}>
                    <Featured/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'search'}
                    systemIcon={{uri:'search'}}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'search'
                        });
                    }}>
                    <Search/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}
 

// Defines the entry point to the application. 
// This is where the JavaScript code start executing
AppRegistry.registerComponent('BookSearch', () => BookSearch);
