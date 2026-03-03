# Como Testar Seu E-commerce Localmente

Para testar no seu computador (Localhost) e fazer funcionar no Telegram, você precisa de 3 passos simples:

## Passo 1: Iniciar o Servidor
Abra um terminal na pasta do projeto e rode:
```bash
npm start
```
*Isso vai ligar seu site em `http://localhost:3000`.*

## Passo 2: Criar o Túnel HTTPS (Obrigatório para Telegram)
O Telegram não aceita `localhost`, ele precisa de um link seguro (`https`). Vamos usar o **localtunnel** para criar uma "ponte" do seu PC para a internet.

Abra **OUTRO** terminal (mantenha o anterior rodando) e rode:
```bash
npx localtunnel --port 3000
```
*Ele vai te dar um link parecido com: `https://nome-aleatorio.loca.lt`.*

**IMPORTANTE:** O Localtunnel tem uma proteção. Na primeira vez que você abrir esse link, ele vai pedir uma senha. A senha é o seu IP externo.
1. Abra o link gerado no navegador.
2. Se pedir senha, copie o IP que aparece na página (ou pegue em `https://loca.lt/mypublicip`) e cole lá.
3. Clique em "Click to Submit".

## Passo 3: Configurar o Bot
1. Copie o link HTTPS gerado (ex: `https://nome-aleatorio.loca.lt`).
2. Abra o arquivo `.env` e cole em `WEBAPP_URL`:
   ```env
   WEBAPP_URL=https://nome-aleatorio.loca.lt
   ```
3. Reinicie o servidor do Passo 1 (Ctrl+C e `npm start` de novo) para ele pegar o novo link.
4. **No Telegram (@BotFather):**
   - Envie `/mybots` -> Selecione seu bot.
   - Vá em `Bot Settings` -> `Menu Button` -> `Configure Menu Button`.
   - Envie o link HTTPS que você gerou.

Pronto! Agora quando você abrir o bot e clicar no botão, ele vai carregar o site que está rodando no seu computador.
