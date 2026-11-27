require('dotenv').config()
const axios = require('axios')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

const TMDB_TOKEN = process.env.TMDB_TOKEN

const simplificarFilme = (filme) => {
    return {
        id: filme.id,
        titulo: filme.title,
        ano: filme.release_date ? filme.release_date.slice(0, 4) : null,
        nota: Number(filme.vote_average.toFixed(1)),
        poster: filme.poster_path ? `https://image.tmdb.org/t/p/w342${filme.poster_path}` : null
    }
}

const simplificarProvedores = (provedores) => {
    return provedores && provedores.length != 0 ?
        provedores.map(provedor => {
            const obj = {
                nome: provedor.provider_name,
                logo: `https://image.tmdb.org/t/p/w92${provedor.logo_path}`
            }
            return obj
        })
        :
        []
}

const tmdbClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`
    },
    params: {
        language: "pt-BR",
    }
})

app.get('/em-alta', (req, res) => {
    //console.log('chamou?')
    tmdbClient.get('/trending/movie/week')
        .then(resposta => {
            const filmesEmAlta = resposta.data.results.map(simplificarFilme)

            res.json(filmesEmAlta)
        })
        .catch((erro) => {
            console.log(erro)
            res.status(502).json({
                mensagem: 'Não foi possível consultar o catálogo de filmes.'
            })
        })
})

app.get('/filmes', (req, res) => {
    const busca = req.query.busca

    if (!busca || !busca.trim()) {
        return res.status(400).json({ "mensagem": "Informe o título de um filme." })
    }
    const termo = busca.trim()

    console.log(`Busca: ${termo}`)

    tmdbClient.get('/search/movie', {
        params: {
            query: termo,
            include_adult: false
        }
    })
        .then(resposta => {
            const filmes = resposta.data.results.map(simplificarFilme)
            res.json(filmes)
        })
        .catch(erro => {
            console.log(erro)

            res.status(502).json({
                mensagem: 'Não foi possível consultar o catálogo de filmes.'
            })
        })
})
app.get('/filme', (req, res) => {
    //console.log(req.query.id)
    const id = req.query.id
    if (!id) {
        return res.status(400).json({ "mensagem": "Informe o id do filme." })
    }

    tmdbClient.get(`/movie/${id}`, {
        params: {
            append_to_response: "watch/providers"
        }
    })
        .then(resposta => {
            //console.log(resposta.data['watch/providers'].results.BR)
            const filme = resposta.data
            const provedorBR = resposta.data['watch/providers'].results.BR ?
                resposta.data['watch/providers'].results.BR
                :
                {}

            //console.log(resposta.data)
            //console.log(provedorBR)
            res.json({
                ...simplificarFilme(filme),
                duracao: (filme.runtime || filme.runtime != 0) ? filme.runtime : null,
                generos: filme.genres.map(genero => genero["name"]),
                sinopse: filme.overview ? filme.overview : null,
                fundo: filme.backdrop_path ? `https://image.tmdb.org/t/p/w780/${filme.backdrop_path}` : null,
                ondeAssistir: {
                    assinatura: simplificarProvedores(provedorBR.flatrate),
                    aluguel: simplificarProvedores(provedorBR.rent),
                    compra: simplificarProvedores(provedorBR.buy)
                }
            })
        })
        .catch(erro => {
            console.log(erro)
            //console.log(erro.response.status)
            erro.response.status == 404 ?
                res.status(404).json({ mensagem: "Filme não encontrado." })
                :
                res.status(502).json({ mensagem: 'Não foi possível consultar o catálogo de filmes.' })
        })
})

app.get('/', (req, res) => {
    res.json({ app: "OndePassa", status: "online" })
})

const port = 3000
app.listen(port, () => console.log(`Backend do OndePassa no ar. Porta: ${port}.`))