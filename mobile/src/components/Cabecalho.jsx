import React from 'react'
import { View, Text, StyleSheet} from 'react-native'

const Cabecalho = () => {
  return (
    <View style={styles.container}>
        <View style={styles.alinhaTitulo}>
            <Text style={styles.emogi}>🍿</Text>
            <Text style={styles.titulo}>OndePassa</Text>
        </View>
      
        <Text style={styles.subtitulo}>
            Descubra onde assistir qualquer filme
        </Text>
       

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 18
    },
    alinhaTitulo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6
    },
    emogi: {
        fontSize: 34,      
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 28,
        color: "#faf3ff"
    },
    subtitulo: {
        fontSize: 14,
        color: "#b0a0ba",
        paddingLeft: 16
    },

})

export default Cabecalho