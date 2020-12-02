import firebase from 'firebase/app';
import * as React from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import {
    ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native-gesture-handler';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  return (
    <TouchableWithoutFeedback
      style={{ height: "100%" }}
      onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.errorMessage}>
            <Text style={styles.error}>{errorMsg}</Text>
          </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.inputTitle}>Email Address</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCompleteType="email"
                onChangeText={(text) => setEmail(text)}
                value={email}
              ></TextInput>
            </View>

            <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                secureTextEntry
                onChangeText={(password) => setPassword(password)}
                value={password}
              ></TextInput>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={{
              alignItems: "center",
              marginTop: 32,
            }}
          >
            <Text style={{ color: "#414959", fontSize: 13 }}>
              New to Cookit?
            </Text>
            <Text style={{ fontWeight: "500", color: "#E9446A" }}>Sign up</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
