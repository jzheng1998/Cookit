import 'firebase/firestore';

import firebase from 'firebase';
import * as React from 'react';
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

export default function RegisterScreen({ navigation }: { navigation: any }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setErrorMsg("Password doesn't match.");
    } else {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          setupDocument();
        })
        .catch((error) => {
          setErrorMsg(error.message);
        });
    }
  };

  const setupDocument = () => {
    const user = firebase.auth().currentUser;
    // Update user display name
    user?.updateProfile({
      displayName: name,
    });

    const database = firebase.firestore();
    const users = database.collection("users");
    users
      .doc(user?.uid)
      .set({
        favoriteRecipes: [],
        doneRecipes: [],
      })
      .then((doc) => {
        setLoading(false);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  return (
    <TouchableWithoutFeedback
      style={{ height: "100%" }}
      onPress={() => Keyboard.dismiss()}
    >
      <Spinner visible={loading} />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.errorMessage}>
            <Text style={styles.error}>{errorMsg}</Text>
          </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.inputTitle}>Full Name</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(name) => setName(name)}
                value={name}
              />
            </View>

            <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>Email Address</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCompleteType="email"
                onChangeText={(email) => setEmail(email)}
                value={email}
              />
            </View>

            <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                secureTextEntry
                onChangeText={(password) => setPassword(password)}
                value={password}
              />
            </View>

            <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                secureTextEntry
                onChangeText={(confirmPassword) =>
                  setConfirmPassword(confirmPassword)
                }
                value={confirmPassword}
              ></TextInput>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign Up</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "white",
  },

  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  errorMessage: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});
