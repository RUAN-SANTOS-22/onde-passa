import React from 'react'
import { TextInput, Text, View, Pressable, StyleSheet,ActivityIndicator } from 'react-native'

const Busca = ({ termo, onTermoAlterado, onLimpar, buscando }) => {
    const tamanho = termo.trim().length

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <TextInput
                    value={termo}
                    onChangeText={onTermoAlterado}
                    placeholder='Digite o título de um filme'
                    placeholderTextColor="#ffffff"
                    style={styles.input}
                />
                {buscando ?
                    <ActivityIndicator size="small" color="#e1b6fd" />
                    :
                    null
                }
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
            {tamanho > 0 && tamanho < 3 ?
                <Text style={styles.dica}>Digite pelo menos 3 letras.</Text>
                :
                null
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        marginBottom: 5
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: "#28015c96",
        borderRadius: 5,
        padding: 6,
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
    },
    dica: {
        color: '#b0a0ba',
        fontSize: 12,
        paddingLeft: 6,
        marginTop: 4
    }
})

export default Busca