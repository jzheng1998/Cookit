import firebase from 'firebase/app';
import * as React from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { View } from '../components/Themed';

export default function ProfileScreen() {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setUser(user);
      setLoading(false);
    }
  }, []);

  if (loading)
    return <ActivityIndicator size="large" style={styles.loadingContainer} />;
  return (
    <View>
      <Text>{user.displayName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
  },
});
