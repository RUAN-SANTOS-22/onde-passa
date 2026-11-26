import React from 'react'
import { View, Image, StyleSheet, Text, Pressable } from 'react-native'

const CartaoFilme = ({ titulo, ano, nota, poster, onSelecionar }) => {
    return (
        <Pressable style={styles.container} onPress={onSelecionar}>
            {poster ?
                <Image
                    source={{ uri: poster }}
                    style={styles.poster}
                />
                :
                <View style={styles.retanguloSemPoster}>
                    <Text style={styles.textoSemPoster}>Sem Pôster</Text>
                </View>
            }
            <View style={styles.infoFilme}>
                <Text style={styles.titulo} numberOfLines={2}>
                    {titulo}
                </Text>
                {ano ?
                    <Text style={styles.ano} >
                        {ano}
                    </Text>
                    :
                    null
                }
                <Text style={styles.nota} >
                    {nota}
                </Text>
            </View>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 6,
        padding: 10,
        backgroundColor: "#28015c96",
        marginBottom: 10,
        gap: 8
    },
    poster: {
        width: 70,
        height: 105,
        borderRadius: 6,
    },
    titulo: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#faf3ff"
    },
    retanguloSemPoster: {
        backgroundColor: "#dbdbdb",
        width: 70,
        height: 105,
        borderRadius: 6,
        justifyContent: 'center',
    },
    textoSemPoster: {
        textAlign: 'center'
    },
    infoFilme: {
        flex: 1,
        gap: 4
    },
    ano: {
        color: "#b0a0ba"
    },
    nota: {
        color: "#ffeb6a"
    }


})


export default CartaoFilme