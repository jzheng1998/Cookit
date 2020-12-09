import 'firebase/firestore';

import firebase from 'firebase/app';
import * as React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import { View } from '../components/Themed';

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const [loading, setLoading] = React.useState(true);
  const [recipeLoading, setRecipeLoading] = React.useState(true);
  const [user, setUser] = React.useState<any>(null);
  const [profile, setProfile] = React.useState<any>(null);
  const [recipes, setRecipes] = React.useState([]);

  React.useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setUser(user);
      getFavRecipes(user.uid);
      setLoading(false);
      // setProfile({ uri: user.photoURL });
      setProfile(require("../assets/images/no-profile-photo.png"));
    } else {
      setProfile(require("../assets/images/no-profile-photo.png"));
    }
  }, []);

  const getFavRecipes = (uid: string) => {
    const database = firebase.firestore();
    const userRef = database.collection("users").doc(uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const temp = doc.data();
          setRecipes(temp?.favoriteRecipes);
          setRecipeLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("Home");
      });
  };

  if (loading)
    return <ActivityIndicator size="large" style={styles.loadingContainer} />;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.infoContainer}>
          <View>
            <Image style={styles.userProfile} source={profile} />
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={{ fontSize: 24 }}>{user.displayName}</Text>
            <Text style={{ fontSize: 16, paddingTop: 10 }}>{user.email}</Text>
          </View>
        </View>

        <Divider
          style={{ backgroundColor: "lightgray", height: 3, width: "100%" }}
        />

        <View style={styles.favContainer}>
          {recipeLoading ? (
            <ActivityIndicator size="large" style={styles.loadingContainer} />
          ) : recipes.length == 0 ? (
            <View
              style={{ alignSelf: "center", flex: 1, justifyContent: "center" }}
            >
              <Text style={{ fontSize: 24 }}>No Favorite Recipes.</Text>
            </View>
          ) : (
            <ScrollView>
              {recipes.map((recipe: any, key: number) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Detail", {
                        // recipeId:
                        //   "http://www.edamam.com/ontologies/edamam.owl#recipe_f0b024958ac7323cae871df98a36d313",
                        // url:
                        //   "https://smittenkitchen.com/2016/03/spring-chicken-salad-toasts/",
                        recipeId: recipe.uri,
                        url: recipe.url,
                      })
                    }
                    key={key}
                  >
                    <Card>
                      <Card.Image source={{ uri: recipe.image }} />
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
                        {recipe.label}
                      </Text>
                    </Card>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>
      </View>
      <View style={styles.signOutContainer}>
        <TouchableOpacity onPress={signOut}>
          <Text style={{ color: "#ff1a1a", fontSize: 24, textAlign: "center" }}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
  },
  mainContainer: {
    flex: 9,
  },
  infoContainer: {
    borderBottomWidth: 0.5,
    flex: 1,
    flexDirection: "row",
  },
  userProfileContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  userProfile: {
    borderRadius: 150,
    borderWidth: 0.5,
    height: 100,
    margin: 20,
    width: 100,
  },
  userInfoContainer: {
    alignItems: "flex-start",
    flex: 2,
    flexDirection: "column",
    justifyContent: "center",
  },
  favContainer: {
    flex: 4,
    flexDirection: "column",
  },
  signOutContainer: {
    borderTopWidth: 0.5,
    flex: 1,
    justifyContent: "center",
  },
});
