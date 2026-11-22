import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Credito = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>
                Este produto usa a API do TMDB, mas não é endossado nem certificado pelo TMDB.
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center'
    },
    texto: {
        fontSize: 9,
        color: '#b0a0ba',
        textAlign: 'center'
    }
})

export default Credito