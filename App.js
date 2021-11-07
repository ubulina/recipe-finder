import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Image, Alert } from 'react-native';



export default function App() {

  const [ingredient, setIngredient] = useState('')
  const [recipies, setRecipies] = useState([])

  const getRecipies = () => {

    //console.log(ingredient)

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)

    .then(response => response.json())
    .then(responseJson => setRecipies(responseJson.meals))         
    .catch(error => { 
        Alert.alert('Error', error); 
    });
    
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden="true" />
      <FlatList 
        style={{marginLeft: "5%"}}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item }) => 
          <View>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
            <Image 
              style={{width:100, height:100}}
              source={{uri: `${item.strMealThumb}`}}  
            />  
          </View>}
        data={recipies} 
        ItemSeparatorComponent={listSeparator} 

      />

      <Text>Give main ingredient and find recipies!</Text>
      <TextInput style={styles.input} placeholder='main ingredient' 
          onChangeText={ingredient => setIngredient(ingredient)} 
      />
      <Button title="Find" onPress={getRecipies} />                 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 250
    
  },
  input: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1, 
  }
});
