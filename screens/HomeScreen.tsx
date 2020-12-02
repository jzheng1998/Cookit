import * as React from "react";
import axios from "axios";
import { StyleSheet } from "react-native";
import { Card, Divider, Icon, SearchBar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View } from "../components/Themed";
import edamam_api from "../api-keys/edamam";
import data from "../api-keys/TestData";
import Tag from "../components/Tags";

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [ingredients, setIngredients] = React.useState<any[]>(["Apple"]);
  const [search, setSearch] = React.useState("");
  const [recipes, setRecipes] = React.useState<any[]>(data.hits);

  const addIngredient = () => {
    if (search && search != "") {
      setIngredients([...ingredients, search]);
      setSearch("");
      // Try to limit the quota
      // getRecipes();
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
      <Divider style={styles.divider} />
      <View style={styles.header}>
        <SearchBar
          lightTheme
          round
          containerStyle={styles.searchBarContainer}
          value={search}
          onChangeText={(search) => setSearch(search)}
          onSubmitEditing={addIngredient}
          placeholder="Input ingredients..."
        />
        <Icon
          containerStyle={{ justifyContent: "center", marginHorizontal: 10 }}
          name="user-circle"
          type="font-awesome-5"
          size={35}
        />
      </View>
      <Divider style={styles.divider} />
      {ingredients && ingredients.length != 0 ? (
        <View style={styles.tagsContainer}>
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
    justifyContent: "center",
  },
  tagsContainer: {
    borderBottomWidth: 1,
    flexDirection: "row",
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
    backgroundColor: "black",
    height: 1,
    width: "100%",
  },
});
