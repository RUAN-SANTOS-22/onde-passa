import React from 'react'
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'

const Provedores = ({ titulo, provedores }) => {
    if (provedores.length === 0) {
        return null
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{titulo}</Text>

            <ScrollView horizontal>
                {provedores.map(provedor =>
                    <View key={provedor.nome} style={styles.item}>
                        <Image
                            source={{ uri: provedor.logo }}
                            style={styles.logo}
                        />
                        <Text style={styles.nome} numberOfLines={2}>
                            {provedor.nome}
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 8
    },
    titulo: {
        color: '#b0a0ba',
        fontSize: 14
    },
    item: {
        width: 64,
        alignItems: 'center',
        gap: 4
    },
    logo: {
        width: 56,
        height: 56,
        borderRadius: 8
    },
    nome: {
        color: '#b0a0ba',
        fontSize: 11,
        textAlign: 'center'
    }
})

export default Provedores