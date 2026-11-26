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
import DetalhesFilme from './src/components/DetalhesFilme';

export default function App() {
  const [emAlta, setEmAlta] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [buscando, setBuscando] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState(null)
  const [termo, setTermo] = useState('')
  const [termoBuscado, setTermoBuscado] = useState('')
  const [resultado, setResultado] = useState(null)
  const [filmeSelecionado, setFilmeSelecionado] = useState(null)

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

  useEffect(() => {
    const termoLimpo = termo.trim()

    setBuscando(false)

    if (termoLimpo === '') {
      setResultado(null)
      setErro(null)
      return
    }

    if (termoLimpo.length < 3) {
      return
    }

    let ativa = true

    const agendamento = setTimeout(() => {
      setBuscando(true)

      backendClient.get('/filmes', {
        params: {
          busca: termoLimpo
        }
      })
        .then(resposta => {
          if (!ativa) return

          setResultado(resposta.data)
          setTermoBuscado(termoLimpo)
          setErro(null)
          setBuscando(false)
        })
        .catch(erro => {
          if (!ativa) return

          erro.response?.data?.mensagem ?
            setErro(erro.response.data.mensagem)
            :
            setErro('Não foi possível buscar os filmes.')
          setBuscando(false)
        })
    }, 600)

    return () => {
      ativa = false
      clearTimeout(agendamento)
    }
  }, [termo])

  const limpar = () => {
    setTermo('')
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        {filmeSelecionado === null ?
          <View style={styles.subContainer}>
            <Cabecalho />
            <Busca
              termo={termo}
              onTermoAlterado={setTermo}
              buscando={buscando}
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
                      onSelecionar={setFilmeSelecionado}
                    />
                    :
                    resultado.length === 0 ?
                      <Text style={styles.erro}> Nenhum filme encontrado para "{termoBuscado}"</Text>
                      :
                      <ListaFilmes
                        titulo={`Resultados para "${termoBuscado}"`}
                        filmes={resultado}
                        onSelecionar={setFilmeSelecionado}
                      />
              }
            </View>
          </View>
          :
          <View style={styles.subContainer}>
            <DetalhesFilme
              id={filmeSelecionado}
              onVoltar={() => setFilmeSelecionado(null)}
            />
          </View>
        }

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
    padding: 1,
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
