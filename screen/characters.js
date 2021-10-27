
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import axios from 'axios';

const API = "https://rickandmortyapi.com/api/"
class App extends Component {


	constructor(props) {
		super(props);

		this.state = {
			characters: [],
			currentPage: 1,
			totalPages: 0
		}
	}

	getCharacters(page = 1) {
		axios.get(`${API}character/?page=${page}`)
			.then((response) => {
				let newData = this.state.characters;
				let data = response.data && response.data.results || [];

				data.map((data) => {
					newData.push(data);
				})

				this.setState({
					characters: newData,
					totalPages: response.data && response.data.info.pages || 0,
					currentPage: page
				})
			})
			.catch((error) => {
				console.log("error", error)
			})
	}

	componentDidMount() {
		this.getCharacters()
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={{ fontWeight: "50"}}>CHARACTERS</Text>
				<FlatList
				 columnWrapperStyle={{ justifyContent: 'space-between' }}
				 numColumns={2}
					style={styles.list}
					data={this.state.characters}
					renderItem={({ item, index }) => {
						return (
							<View key={index} style={styles.container}>
								<Image source={{ uri: item.image }} style={styles.image} />
								<Text style={[styles.text, { fontWeight: "bold" }]}>{item.name}</Text>
							</View>

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
		flexDirection: "column",
		marginTop: 15,
		paddingHorizontal: 10

	},
	list: {
		flex: 1,
		flexDirection: "column",

	},
	image: {
		width: 180,
		height: 180,
		borderRadius: 25
	

	},
	row: {
		flexDirection: "row",
		flexWrap: "wrap",

	},
	text: {
		flex: 1,
		fontSize: 20,
		justifyContent: "center",
		alignItems: "center"

	}
})

export default App;