import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      LoginScreen: "Login",
      RegisterScreen: "Register",
      NotFound: "*",
    },
  },
};
