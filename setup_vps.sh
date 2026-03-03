#!/bin/bash

# Script de Instalação Automática para VPS (Ubuntu/Debian)

# 1. Atualizar sistema
echo "🔄 Atualizando sistema..."
sudo apt update && sudo apt upgrade -y

# 2. Instalar Node.js 20
echo "📦 Instalando Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Instalar Git e PM2
echo "🛠️ Instalando Git e PM2..."
sudo apt install -y git
sudo npm install -g pm2 localtunnel

# 4. Clonar Repositório (Substitua SEU_USUARIO e SEU_REPO)
# Se a pasta já existir, faz pull
if [ -d "telegram-ecommerce" ]; then
    echo "📂 Pasta encontrada. Atualizando..."
    cd telegram-ecommerce
    git pull
else
    echo "📂 Clonando repositório..."
    # ATENÇÃO: O usuário deve substituir este link pelo link do repo dele
    echo "⚠️  Por favor, digite o link do seu repositório GitHub (ex: https://github.com/usuario/repo.git):"
    read REPO_URL
    git clone $REPO_URL telegram-ecommerce
    cd telegram-ecommerce
fi

# 5. Instalar Dependências
echo "📦 Instalando dependências..."
npm install

# 6. Criar arquivo .env se não existir
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env padrão..."
    echo "BOT_TOKEN=SEU_TOKEN_AQUI" > .env
    echo "WEBAPP_URL=https://seulink.loca.lt" >> .env
    echo "PORT=3000" >> .env
    echo "⚠️  EDITE O ARQUIVO .env COM SEU TOKEN: nano .env"
fi

# 7. Iniciar com PM2
echo "🚀 Iniciando servidor..."
pm2 start server.js --name "telegram-bot"
pm2 save
pm2 startup

echo "✅ Instalação concluída!"
echo "------------------------------------------------"
echo "PRÓXIMOS PASSOS:"
echo "1. Edite o .env: nano .env (Coloque seu Token do Bot)"
echo "2. Reinicie o bot: pm2 restart telegram-bot"
echo "3. Para HTTPS (Link seguro): npx localtunnel --port 3000 --subdomain minhaloja123"
echo "------------------------------------------------"
