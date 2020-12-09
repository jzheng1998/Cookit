import axios from 'axios';
import firebase from 'firebase/app';
import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import edamam_api from '../api-keys/edamam';
import data from '../api-keys/TestData';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function RecipeDetailsScreen(
  { navigation }: { navigation: any },
  recipeId: string
) {
  const [recipe, setRecipe] = React.useState<any>({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [done, setDone] = React.useState(false);
  const [userInformation, setUserInformation] = React.useState({});

  React.useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  React.useEffect(() => {
    if (recipeId && recipeId != "") {
      // axios
      //   .get("https://api.edamam.com/search?", {
      //     params: {
      //       r: recipeId,
      //       app_id: edamam_api.app_id,
      //       app_key: edamam_api.app_key,
      //     },
      //   })
      //   .then((response) => {
      //     setRecipe(response);
      //     setLoading(false);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      setRecipe(data.hits[0]);
      setLoading(false);
    }
  }, [recipeId]);

  const markAsComplete = () => {
    const database = firebase.firestore();
  };

  if (loading)
    return <ActivityIndicator style={styles.loadingContainer} size="large" />;

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer} />
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.footerText}>Mark As Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  contentContainer: {
    flex: 1,
  },
  footerContainer: {
    backgroundColor: "lightblue",
    height: "10%",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 24,
    textAlign: "center",
    textTransform: "capitalize",
  },
});
