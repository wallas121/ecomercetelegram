# Guia de Deploy em VPS (Ubuntu) para E-commerce Telegram

Este guia explica como colocar seu e-commerce no ar usando uma VPS (Servidor Virtual Privado) com Ubuntu.

## Pré-requisitos

1.  **VPS:** Um servidor Ubuntu 20.04 ou superior (DigitalOcean, AWS, Vultr, Hetzner, etc.).
2.  **Domínio:** Um domínio registrado (ex: `sualoja.com`) apontando para o IP da sua VPS.
    *   Crie um registro `A` no DNS do seu domínio apontando para o IP da VPS.

## Passo 1.1: Configurar Domínio na Vercel (DNS)

Se você comprou o domínio na Vercel, siga estes passos para apontá-lo para sua VPS:

1.  Acesse o painel da Vercel -> **Domains**.
2.  Selecione o seu domínio.
3.  Vá em **DNS Records**.
4.  Adicione um novo registro:
    *   **Type:** `A`
    *   **Name:** `@` (para o domínio raiz, ex: `sualoja.com`) ou `www`
    *   **Value:** O endereço IP da sua VPS (ex: `123.45.67.89`)
    *   **TTL:** Pode deixar o padrão (Auto ou 60).
5.  Clique em **Add**.

*Aguarde alguns minutos (pode levar até 24h, mas na Vercel costuma ser rápido) para que a propagação ocorra.*

## Passo 2: Preparar o Servidor

Acesse sua VPS via SSH:
```bash
ssh root@seu_ip_aqui
```

Atualize o sistema e instale as ferramentas necessárias:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx
```

## Passo 2: Instalar Node.js

Instale a versão LTS do Node.js (v18 ou v20):
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

Verifique a instalação:
```bash
node -v
npm -v
```

## Passo 3: Configurar o Projeto

1.  Crie uma pasta para o projeto:
    ```bash
    mkdir -p /var/www/telegram-ecommerce
    cd /var/www/telegram-ecommerce
    ```

2.  Copie os arquivos do seu computador para a VPS. Você pode usar `scp` ou `git`.
    *   Se usar **SCP** (do seu terminal local):
        ```bash
        # Estando na pasta do projeto no seu PC
        scp -r package.json server.js public .env root@seu_ip:/var/www/telegram-ecommerce/
        ```
    *   *Nota: A pasta `public` deve conter o build do React (que já fizemos).*

3.  Instale as dependências na VPS:
    ```bash
    cd /var/www/telegram-ecommerce
    npm install --production
    ```

4.  Configure o arquivo `.env`:
    *   Certifique-se de que o `.env` tem o token do seu bot correto.
    *   `BOT_TOKEN=seu_token_aqui`
    *   `WEBAPP_URL=https://seu_dominio.com` (A URL completa do seu site)
    *   `PORT=3000`

## Passo 4: Configurar o Gerenciador de Processos (PM2)

O PM2 mantém seu site rodando mesmo se o servidor reiniciar ou der erro.

```bash
sudo npm install -g pm2
pm2 start server.js --name "telegram-shop"
pm2 save
pm2 startup
```
(Execute o comando que o `pm2 startup` exibir para configurar a inicialização automática).

## Passo 5: Configurar Nginx (Servidor Web)

O Nginx vai receber as requisições da internet e passar para o seu Node.js, além de gerenciar o SSL.

1.  Crie um arquivo de configuração:
    ```bash
    sudo nano /etc/nginx/sites-available/telegram-shop
    ```

2.  Cole o seguinte conteúdo (altere `seu_dominio.com` pelo seu domínio real):
    ```nginx
    server {
        listen 80;
        server_name seu_dominio.com www.seu_dominio.com;

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

3.  Ative o site e reinicie o Nginx:
    ```bash
    sudo ln -s /etc/nginx/sites-available/telegram-shop /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    ```

## Passo 6: Configurar HTTPS (SSL Grátis)

O Telegram **EXIGE** HTTPS para Mini Apps. Vamos usar o Certbot (Let's Encrypt).

1.  Instale o Certbot:
    ```bash
    sudo apt install -y certbot python3-certbot-nginx
    ```

2.  Gere o certificado:
    ```bash
    sudo certbot --nginx -d seu_dominio.com -d www.seu_dominio.com
    ```
    (Siga as instruções na tela, aceite os termos e escolha redirecionar HTTP para HTTPS).

## Passo 7: Finalizar no Telegram

1.  Vá no @BotFather.
2.  Edite seu bot -> Menu Button (ou comando `/setmenubutton`).
3.  Coloque a URL do seu site: `https://seu_dominio.com`.

Pronto! Seu e-commerce agora está rodando profissionalmente em uma VPS com HTTPS seguro.
