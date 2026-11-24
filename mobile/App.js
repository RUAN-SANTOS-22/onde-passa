import { useState, useEffect } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Cabecalho from './src/components/Cabecalho';
import Credito from './src/components/Credito';
import Carregando from './src/components/Carregando';
import CartaoFilme from './src/components/CartaoFilme';
import ListaFilmes from './src/components/ListaFilmes';
import backendClient from './src/utils/backendClient'
import Busca from './src/components/Busca';

export default function App() {
  const [emAlta, setEmAlta] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState(null)
  const [termo, setTermo] = useState('')
  const [termoBuscado, setTermoBuscado] = useState('')
  const [resultado, setResultado] = useState(null)

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

  const buscar = () => {
    setMensagem('Procurando filmes...')
    setCarregando(true)

    backendClient.get('/filmes', {
      params: {
        busca: termo
      }
    })
      .then(resposta => {
        setResultado(resposta.data)
        setTermoBuscado(termo)
        setErro(null)
        setCarregando(false)
      })
      .catch(erro => {
        {
          erro.response.data.mensagem ?
            setErro(erro.response.data.mensagem)
            :
            setErro('Não foi possível buscar os filmes.')
        }
        setCarregando(false)
      })
  }

  const limpar = () => {
    setTermo('')
    setResultado(null)
    setErro(null)
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Cabecalho />
        <Busca
          termo={termo}
          onTermoAlterado={setTermo}
          onBuscar={buscar}
          onLimpar={limpar}
        />
        <View style={styles.subContainer}>
          {carregando ?
            <Carregando mensagem={mensagem} />
            :
            erro ?
              <Text style={styles.erro}>
                {erro}
              </Text>
              :
              resultado === null ?
                <ListaFilmes
                  titulo="Em alta nesta semana"
                  filmes={emAlta}
                />
                :
                resultado.length === 0 ?
                  <Text style={styles.erro}> Nenhum filme encontrado para "{termoBuscado}"</Text>
                  :
                  <ListaFilmes
                    titulo={`Resultados para "${termoBuscado}"`}
                    filmes={resultado}
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
