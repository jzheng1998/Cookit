import * as React from "react";
import axios from "axios";
import { StyleSheet } from "react-native";
import { Card, Divider, Icon, SearchBar } from "react-native-elements";

import { Text, View } from "../components/Themed";
import edamam_api from "../api-keys/edamam";

export default function HomeScreen() {
  const [ingredients, setIngredients] = React.useState([] as string[]);
  const [search, setSearch] = React.useState("");
  const [recipes, setRecipes] = React.useState(null);

  const addIngredient = () => {
    if (search != null || search != "") {
      ingredients.push(search);
    }
    setSearch("");
  };

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  React.useEffect(() => {
    const config = {
      method: "get",
      baseURL: "https://api.edamam.com/",
      params: {
        q: "",
        app_id: edamam_api.app_id,
        app_key: edamam_api.app_key,
      },
    };

    // axios(config)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [ingredients]);

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
          size={40}
        />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.body}>
        {/* {{
          if(recipes: any[]) {
            recipes.map((key, i) => {
              return <Card key={key}></Card>;
            });
          },
        }} */}
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
