import React from 'react'
import { View, FlatList, StyleSheet, Text } from 'react-native'
import CartaoFilme from './CartaoFilme'
import { formatarNota } from '../utils/formatacao'

const ListaFilmes = ({ titulo, filmes }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {titulo}
      </Text>

      <FlatList
        data={filmes}
        keyExtractor={(filme) => String(filme.id)}
        renderItem={({ item }) => <CartaoFilme
            titulo={item.titulo}
            ano={item.ano}
            nota={formatarNota(item.nota)}
            poster={item.poster}
          />}
      />

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14
  },
  titulo: {
    color: "#ffffff",
    fontWeight: "bold",
  },

})

export default ListaFilmes