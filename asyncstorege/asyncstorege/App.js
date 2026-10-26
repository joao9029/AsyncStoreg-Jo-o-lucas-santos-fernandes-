import { StyleSheet, Text, View } from 'react-native';
import AssetExample from './components/AssetExample';
import Home from './Page/Home';

export default function App() {
  return (
    <View style={styles.container}>
     <Home/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

});
