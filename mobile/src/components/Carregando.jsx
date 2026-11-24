import React from 'react'
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native'


const Carregando = ({ mensagem = 'Carregando...' }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#e1b6fd" />
            <Text style={styles.mensagem}>
                {mensagem}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mensagem: {
        paddingVertical: 10,
        color: "#e1b6fd"
    },
})

export default Carregando