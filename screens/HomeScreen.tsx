import axios from 'axios';
import firebase from 'firebase/app';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Divider, Icon, SearchBar } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import Tag from '../components/Tags';
import { Text, View } from '../components/Themed';
import data from '../constants/TestData';

const initialQuery = ["Apple", "Chicken"];

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [ingredients, setIngredients] = React.useState<any[]>(initialQuery);
  const [search, setSearch] = React.useState("");
  const [recipes, setRecipes] = React.useState<any>(null);
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

  React.useEffect(() => {
    if (ingredients.length != 0) {
      axios
        .get("https://api.edamam.com/search?", {
          params: {
            q: ingredients.join(),
            app_id: process.env.EDAMAM_API_ID,
            app_key: process.env.EDAMAM_API_KEY,
          },
        })
        .then((response) => {
          setRecipes(response.data.hits);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [ingredients]);

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
    if (ingredients) {
      axios
        .get("https://api.edamam.com/search?", {
          params: {
            q: ingredients.join(),
            app_id: process.env.EDAMAM_API_ID,
            app_key: process.env.EDAMAM_API_KEY,
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
    <SafeAreaView style={styles.container}>
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
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Detail", {
                      recipe: collection.recipe,
                    })
                  }
                  key={key}
                >
                  <Card>
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
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
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
