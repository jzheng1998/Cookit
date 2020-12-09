import axios from 'axios';
import firebase from 'firebase/app';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Divider, Icon, SearchBar } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import edamam_api from '../api-keys/edamam';
import data from '../api-keys/TestData';
import Tag from '../components/Tags';
import { Text, View } from '../components/Themed';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [ingredients, setIngredients] = React.useState<any[]>(["Apple"]);
  const [search, setSearch] = React.useState("");
  const [recipes, setRecipes] = React.useState<any[]>(data.hits);
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  const addIngredient = () => {
    if (search && search != "") {
      setIngredients([...ingredients, search]);
      setSearch("");
      // Try to limit the quota
      // getRecipes();
    }
  };

  const redirect = () => {
    if (loggedIn) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("Login");
    }
  };

  const getRecipes = () => {
    console.log(ingredients);
    if (ingredients) {
      axios
        .get("https://api.edamam.com/search?", {
          params: {
            q: ingredients.join(),
            app_id: edamam_api.app_id,
            app_key: edamam_api.app_key,
          },
        })
        .then((response) => {
          setRecipes(response.data.hits);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          lightTheme
          round
          containerStyle={styles.searchBarContainer}
          inputStyle={{ fontSize: 20 }}
          value={search}
          onChangeText={(search) => setSearch(search)}
          onSubmitEditing={addIngredient}
          placeholder="Input ingredients..."
        />
        <View style={{ alignSelf: "center", marginHorizontal: 7 }}>
          <TouchableOpacity onPress={() => redirect()}>
            <Icon name="user-circle" type="font-awesome-5" size={35} />
          </TouchableOpacity>
        </View>
      </View>
      <Divider style={styles.divider} />
      {ingredients && ingredients.length != 0 ? (
        <View>
          <ScrollView horizontal={true}>
            {ingredients &&
              ingredients.map((ingredient: string, key: number) => {
                return (
                  <Tag
                    key={key}
                    label={ingredient}
                    onPress={(e: any) => {
                      setIngredients(
                        ingredients.filter((item) => {
                          return item !== ingredient;
                        })
                      );
                      console.log(ingredients);
                    }}
                  />
                );
              })}
          </ScrollView>
          <Divider style={styles.divider} />
        </View>
      ) : (
        <View></View>
      )}
      <View style={styles.body}>
        <ScrollView>
          {recipes &&
            recipes.map((collection: any, key: number) => {
              return (
                <Card key={key}>
                  <Card.Image source={{ uri: collection.recipe.image }} />
                  <Card.Divider />
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 16,
                      overflow: "hidden",
                      textAlign: "center",
                      textTransform: "capitalize",
                    }}
                  >
                    {collection.recipe.label}
                  </Text>
                </Card>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.5,
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
  },
  header: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },
  searchBarContainer: {
    backgroundColor: "white",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    flex: 1,
    height: "100%",
    justifyContent: "center",
    paddingRight: 0,
  },
  body: {
    display: "flex",
    flex: 9,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "lightgray",
    height: 3,
    width: "100%",
  },
});
