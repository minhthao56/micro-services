import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useSession } from '../ctx';
import {add} from "utils/add"
import {MyView} from "expo-shared-ui"

export default function TabOneScreen() {
    const val = useSession();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One Customer App</Text>
      <Text style={styles.title}>{add(2,3)}</Text>
      <MyView/>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          val?.signOut();
        }}>
        Sign Out
      </Text>
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
});