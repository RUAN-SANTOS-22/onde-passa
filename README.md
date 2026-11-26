# OndePassa

* Gustavo Alves Pereira RA: 2040482422041
* João Pedro Alves dos Santos RA: 2040482422043
* Larissa Vitoria Nogueira do Vale RA: 2040482422012
* Ruan Victor Freitas Santos RA: 2040482422022

## Como executar

### Backend

Antes de começar, tenha o Node.js instalado.

Entre na pasta do backend e instale as dependências:

```bash
cd backend
npm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Abra o `.env` e coloque o seu token do TMDB:

```
TMDB_TOKEN=seu_token_aqui
```

Para obter o token, crie uma conta gratuita em https://www.themoviedb.org, acesse Configurações > API e copie o **Token de Leitura da API** (API Read Access Token). Use esse token, e não a chave da API.

Inicie o servidor:

```bash
npm run dev
```

Quando aparecer `Backend do OndePassa no ar. Porta: 3000.`, o servidor está funcionando. Para testar, abra http://localhost:3000 no navegador.

### Aplicativo

Entre na pasta do aplicativo e instale as dependências:

```bash
cd mobile
npm install
```

Abra o arquivo `src/utils/backendClient.js` e troque o IP pelo do computador onde o backend está rodando:

```js
baseURL: 'http://SEU_IP_AQUI:3000'
```

Para descobrir o IP, abra o terminal e use `ipconfig` no Windows (campo "Endereço IPv4" da rede Wi-Fi) ou `ifconfig` no Linux e no macOS.

Inicie o aplicativo:

```bash
npx expo start
```

No celular, instale o **Expo Go**, abra o aplicativo e escaneie o QR Code que aparece no terminal. O celular e o computador precisam estar na mesma rede Wi-Fi e o firewall do computador deve permitir conexões do Node. Se o aplicativo abrir mas não carregar os filmes, confira o IP no `backendClient.js`. 