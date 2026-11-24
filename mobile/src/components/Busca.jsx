import React from 'react'
import { TextInput, Text, View, Pressable, StyleSheet } from 'react-native'

const Busca = ({ termo, onTermoAlterado, onBuscar, onLimpar }) => {
    return (
        <View style={styles.container}>
            <Pressable
                onPress={onBuscar}
                style={styles.btnBuscar}>
                <Text style={styles.texto}>buscar</Text>
            </Pressable>

            <TextInput
                value={termo}
                onChangeText={onTermoAlterado}
                placeholder='Digite o título de um filme'
                onSubmitEditing={onBuscar}
                placeholderTextColor="#ffffff"
                style={styles.input}
            />

            {termo !== '' ?
                <Pressable
                    onPress={onLimpar}
                    style={styles.btnLimpar}
                >
                    <Text style={styles.texto}>✕</Text>
                </Pressable>
                :
                null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: "#28015c96",
        borderRadius: 5,
        padding: 6,
        marginHorizontal: 15,
        marginBottom: 5
    },
    input: {
        flex: 1,
        color: "#ffffff",
        paddingVertical: 0,
        paddingHorizontal: 10,
    },
    btnBuscar: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
        backgroundColor: "#ffeb6a"
    },
    btnLimpar: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
        backgroundColor: "#ffeb6a"
    },
    texto: {
        color: '#260047',
        fontWeight: 'bold'
    }
})

export default Busca