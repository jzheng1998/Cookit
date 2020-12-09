import 'firebase/firestore';

import axios from 'axios';
import firebase from 'firebase/app';
import * as React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';

import edamam_api from '../api-keys/edamam';
import data from '../api-keys/TestData';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function RecipeDetailsScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [done, setDone] = React.useState(false);
  const [uid, setUID] = React.useState("");

  React.useEffect(() => {
    if (route?.params?.recipeId && route?.params?.url) {
      getSetting();
      setLoading(false);
    }
  }, []);

  const getSetting = () => {
    const user = firebase.auth().currentUser;
    const database = firebase.firestore();
    if (user) {
      setUID(user.uid);
      setLoggedIn(true);
      const userRef = database.collection("users").doc(user.uid);
      userRef.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setDone(data?.doneRecipes.includes(route.params.recipeId));
        } else {
          console.log("No such document.");
        }
      });
    }
  };

  const updateComplete = () => {
    const database = firebase.firestore();
    const userRef = database.collection("users").doc(uid);
    if (done) {
      userRef
        .update({
          doneRecipes: firebase.firestore.FieldValue.arrayRemove(
            route.params.recipeId
          ),
        })
        .then(() => {
          setDone(false);
        });
    } else {
      userRef
        .update({
          doneRecipes: firebase.firestore.FieldValue.arrayUnion(
            route.params.recipeId
          ),
        })
        .then(() => {
          setDone(true);
        });
    }
  };

  if (loading)
    return <ActivityIndicator style={styles.loadingContainer} size="large" />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ width: 100, justifyContent: "center" }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              flexDirection: "row",
              paddingLeft: 10,
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <Icon
              color="#4d88ff"
              name="chevron-left"
              type="font-awesome-5"
              size={25}
            />
            <Text
              style={{
                color: "#4d88ff",
                fontSize: 16,
                paddingLeft: 5,
              }}
            >
              Home
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 16 }}>Recipe Name</Text>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            justifyContent: "center",
            paddingRight: 10,
            width: 100,
          }}
        >
          <TouchableOpacity>
            <Icon name="star" type="font-awesome-5" solid={false} size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <WebView
        containerStyle={styles.contentContainer}
        originWhitelist={["*"]}
        renderLoading={() => (
          <ActivityIndicator style={{ flex: 1 }} size="large" />
        )}
        source={{
          uri: route.params.url,
        }}
        startInLoadingState={true}
      />
      {loggedIn ? (
        <View
          style={[
            styles.footerContainer,
            { backgroundColor: done ? "lightgreen" : "#4d79ff" },
          ]}
        >
          <TouchableOpacity onPress={() => updateComplete()}>
            <Text style={styles.footerText}>
              {done ? "Completed" : "Mark As Complete"}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.footerContainer, { backgroundColor: "#aeaeae" }]}>
          <Text style={styles.footerText}>Mark As Complete</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
  },
  headerContainer: {
    flexDirection: "row",
    height: 50,
  },
  back: {
    flex: 1,
    flexDirection: "row",
  },
  contentContainer: {
    flex: 1,
  },
  footerContainer: {
    height: "10%",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 24,
    textAlign: "center",
    textTransform: "capitalize",
  },
});
