import React from 'react'
import { useState, useEffect } from 'react';
import backendClient from '../utils/backendClient';
import { ScrollView, Image, Text, StyleSheet, View, Pressable } from 'react-native';
import Carregando from './Carregando';
import { formatarNota } from '../utils/formatacao';
import { formatarDuracao } from '../utils/formatacao';
import Provedores from './Provedores';

const DetalhesFilme = ({ id, onVoltar }) => {
    const [filme, setFilme] = useState(null)
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(null)

    useEffect(() => {
        setCarregando(true)
        setErro(null)

        backendClient.get('/filme', {
            params: {
                id
            }
        })
            .then(resposta => {
                setFilme(resposta.data)
                setCarregando(false)
            })
            .catch(erro => {
                erro.response.data.mensagem ?
                    setErro(erro.response.data.mensagem)
                    :
                    setErro("Não foi possível carregaros detalhes.")

                setCarregando(false)
            })
    }, [id])

    const linhaInfo = filme ?
        [filme.ano,
        filme.duracao != null ?
            formatarDuracao(filme.duracao)
            :
            null,
        ...filme.generos
        ]
            .filter(info => info !== null && info !== '')
            .join(' · ')
        :
        ''
    const semProvedores = filme ?
        filme.ondeAssistir.assinatura.length === 0 &&
        filme.ondeAssistir.aluguel.length === 0 &&
        filme.ondeAssistir.compra.length === 0
        :
        false

    return (
        <View style={styles.container}>
            <Pressable
                onPress={onVoltar}
                style={styles.btnVoltar}
            >
                <Text style={styles.textoVoltar}>
                    ‹ Voltar
                </Text>
            </Pressable>

            {carregando ?
                <Carregando mensagem='Carregando os detalhes...' />
                :
                erro ?
                    <Text style={styles.erro}>
                        {erro}
                    </Text>
                    :
                    <ScrollView>
                        {filme.fundo ?
                            <Image
                                source={{ uri: filme.fundo }}
                                style={styles.fundo}
                            />
                            :
                            null
                        }

                        <View style={styles.infoFilme}>
                            {filme.poster ?
                                <Image
                                    source={{ uri: filme.poster }}
                                    style={styles.poster}
                                />
                                :
                                <View style={styles.retanguloSemPoster}>
                                    <Text style={styles.textoSemPoster}>Sem Pôster</Text>
                                </View>
                            }
                            <View style={styles.info}>
                                <Text style={styles.titulo}>
                                    {filme.titulo}
                                </Text>
                                {linhaInfo ?
                                    <Text style={styles.linhaInfo}>{linhaInfo}</Text>
                                    :
                                    null
                                }
                                <Text style={styles.nota}>{formatarNota(filme.nota)}</Text>
                            </View>
                        </View>

                        <View style={styles.infoSinopse}>
                            <Text style={styles.subtitulo}>Sinopse</Text>
                            <Text style={styles.sinopse}>
                                {filme.sinopse ? filme.sinopse : 'Sinopse indisponível'}
                            </Text>
                        </View>

                        <View style={styles.secaoOnde}>
                            <Text style={styles.subtitulo}>Onde assistir no Brasil</Text>

                            {semProvedores ?
                                <Text style={styles.sinopse}>
                                    Este filme não está disponível em nenhum serviço no Brasil no momento.
                                </Text>
                                :
                                <>
                                    <Provedores titulo="Assinatura" provedores={filme.ondeAssistir.assinatura} />
                                    <Provedores titulo="Aluguel" provedores={filme.ondeAssistir.aluguel} />
                                    <Provedores titulo="Compra" provedores={filme.ondeAssistir.compra} />
                                </>
                            }

                            <Text style={styles.credito}>Dados de disponibilidade: JustWatch</Text>
                        </View>
                    </ScrollView>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btnVoltar: {
        padding: 12
    },
    textoVoltar: {
        color: "#ffeb6a",
        fontWeight: 'bold',
        fontSize: 18
    },
    erro: {
        color: '#aaaaaa',
        paddingHorizontal: 30
    },
    fundo: {
        width: '100%',
        height: 180,
        borderRadius: 5
    },
    infoFilme: {
        flexDirection: 'row',
        gap: 12,
        padding: 14
    },
    poster: {
        width: 100,
        height: 150,
        borderRadius: 5
    },
    retanguloSemPoster: {
        backgroundColor: '#aaaaaa',
        width: 100,
        height: 150,
        borderRadius: 5,
        justifyContent: 'center'
    },
    textoSemPoster: {
        textAlign: 'center'
    },
    info: {
        flex: 1,
        gap: 4
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#aaaaaa'
    },
    linhaInfo: {
        color: "#b0a0ba"
    },
    nota: {
        color: '#ffeb6a'
    },
    infoSinopse: {
        paddingHorizontal: 14,
        gap: 6
    },
    subtitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e3e3e3'
    },
    sinopse: {
        color: '#cacaca'
    },
    secaoOnde: {
        paddingHorizontal: 14,
        paddingVertical: 16,
        gap: 12,
    },
    credito: {
        fontSize: 10,
        fontStyle: 'italic',
        color: '#b0a0ba'
    }
})

export default DetalhesFilme