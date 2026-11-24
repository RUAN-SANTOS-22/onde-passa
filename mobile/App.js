import { useState, useEffect } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Cabecalho from './src/components/Cabecalho';
import Credito from './src/components/Credito';
import Carregando from './src/components/Carregando';
import CartaoFilme from './src/components/CartaoFilme';
import ListaFilmes from './src/components/ListaFilmes';
import backendClient from './src/utils/backendClient'

export default function App() {
  const [emAlta, setEmAlta] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    backendClient.get('/em-alta')
      .then(resposta => {
        setEmAlta(resposta.data)
        setCarregando(false)
      })
      .catch(erro => {
        console.log(erro)

        setCarregando(false)
        setErro("Não foi possível carregar os filmes. Verifique se o backend está no ar.")
      })
  })

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Cabecalho />
        <View style={styles.subContainer}>
          {carregando ?
            <Carregando mensagem="Buscando os filmes em alta..." />
            :
            erro ?
              <Text style={styles.erro}>
                {erro}
              </Text>
              :
              <ListaFilmes
                titulo="Em alta nesta semana"
                filmes={emAlta}
              />
          }
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
    padding: 5,
    backgroundColor: '#17002f',
  },
  subContainer: {
    flex: 1,
  },
  erro: {
    color: '#ebebeb',
    paddingHorizontal: 30
  },
  rodape: {
    padding: 10
  }
});
