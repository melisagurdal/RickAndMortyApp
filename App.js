import React, { useState, useEffect, Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	SafeAreaView,
	FlatList
} from 'react-native';
import axios from 'axios';

const API = "https://rickandmortyapi.com/api"
class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			characters: []
		}
	}

	getCharacters(){
		axios.get(`${API}character`)
		.then((response) => {
			this.setState({
				characters: response.data && response.data.results || [] 
			})
		})
		.catch((error) => {
			console.log("error", error)
		})
	}

	componentDidMount(){
		this.getCharacters()
	}


	render() {
		return (
			<View style={styles.container}>
				<Text>Characters</Text>
				<FlatList 
				data = {this.state.characters}
				renderItem={({item, index}) => {
					return(
						<Text key={index}>{item.name}</Text>
					)
				}}
				/>	
			</View>


		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default App;