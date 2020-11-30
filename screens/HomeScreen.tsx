import * as React from "react";
import axios from "axios";
import { StyleSheet } from "react-native";
import { Card, Divider, Icon, SearchBar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View } from "../components/Themed";
import edamam_api from "../api-keys/edamam";
import data from "../api-keys/TestData";

export default function HomeScreen() {
  const [ingredients, setIngredients] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState("");
  const [recipes, setRecipes] = React.useState<any[]>(data.hits);

  const addIngredient = () => {
    if (search != null || search != "") {
      ingredients.push(search);
      // Try to limit the quota
      // getRecipes();
    }
    setSearch("");
  };

  const updateSearch = (search: string) => {
    setSearch(search);
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
          onChangeText={updateSearch}
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
      <View style={styles.body}>
        <ScrollView>
          {recipes.map((collection: any, key: any) => {
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
  },
  header: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },
  searchBarContainer: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
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
