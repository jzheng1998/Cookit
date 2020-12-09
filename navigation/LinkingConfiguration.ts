import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Home: "Home",
      Detail: "Detail",
      Login: "Login",
      Register: "Register",
      NotFound: "*",
    },
  },
};
