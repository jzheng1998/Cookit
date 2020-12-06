import axios from 'axios';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import edamam_api from '../api-keys/edamam';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function TabOneScreen({ navigation }: { navigation: any }, recipe_id: string) {
  const [recipe, setRecipe] = React.useState<any[]>();

  const getRecipe = () => {
    axios
    .get("https://api.edamam.com/search?", {
        params: {
          r: recipe_id,
          app_id: edamam_api.app_id,
          app_key: edamam_api.app_key,
        },
    })
    .then((response) => {
      setRecipe(response.data.hits);
    })
    .catch((error) => {
        console.log(error);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {recipe &&
        recipe.map((collection: any, key: number) => {
          return (
            <>
              <View>
                <WebView
                    source={{ uri: collection.recipe.url }}
                    style={{marginTop: 10}}
                />
                <View style={styles.footer}>
                  <TouchableOpacity onPress={() => navigation.replace("Home")}>
                    <Text> Mark As Complete </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text> Favorite </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text> Error page. </Text>
              </View>
            </>
          );
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  footer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#000000"
  }
});
