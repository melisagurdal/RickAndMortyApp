import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import axios from 'axios';

const API = "https://rickandmortyapi.com/api/"
class App extends Component {

	
		constructor(props) {
			super(props);
	
			this.state = {
				characters: [],
				currentPage: 2,
				totalPages: 0
			}
		}
	
		getCharacters(page = 1){
			axios.get(`${API}character/?page=${page}`)
			.then((response) => {
				let newData = this.state.characters;
				let data =  response.data && response.data.results || [];
	
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
	
		componentDidMount(){
			this.getCharacters()
		}
	
		render() {
			return (
				<View style={styles.container}>
					<Text>CHARACTERS</Text>
					<FlatList
						style={styles.list}
						data={this.state.characters}
						renderItem={({item, index}) => {
							return (
								<View key={index} style={styles.container}>
									
									<Image source={{uri: item.image}} style={styles.image} resizeMode= "cover" />
					
									<View style={[styles.column, { marginLeft: 50}]}>
										<Text style={[styles.text, { fontWeight: "bold"}]}>{item.name}</Text>
								
		
									</View>
								</View>
								
							)
						}}
						ListFooterComponent={() => {
							return (<Text>-- End --</Text>)
						}}
						onEndReachedThreshold={0}
						onEndReached={this.getCharacters.bind(this,this.state.currentPage + 1 )}
						
					/>
				</View>
			);
	
		}
	}
	
	
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			flexWrap: 'wrap',
			flexDirection: 'row',
			backgroundColor: '#fffd',
			marginTop: 10
		},
		list: {
			flex: 1, 
			width: "100%", 
			padding: 10,
			marginTop: 10,
			backgroundColor: 'blue'
		},
		image: {
			width: 150, 
			height: 150,
			
		},
		row:{ 
			flex: 1,
			flexDirection: "row",
			margin: 10,
		
		},
		column: {
			flex: 1,
			flexDirection: "column",
			justifyContent: "center",
			backgroundColor: 'red'
		},
		text: {
			fontSize: 20
		}
	})
	
	export default App;