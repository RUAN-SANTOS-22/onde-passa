import { StyleSheet, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Cabecalho from './src/components/Cabecalho';
import Credito from './src/components/Credito';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Cabecalho />
        </View>
        <View style={styles.rodape}>
          <Credito />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17002f',
  },
  rodape: {
    padding: 10
  }
});
