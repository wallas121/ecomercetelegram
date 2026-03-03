require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve os arquivos do frontend

// Configuração do Bot
// Se não houver token definido, o bot não inicia, mas o servidor web sim (para testes de frontend)
const BOT_TOKEN = process.env.BOT_TOKEN;
let bot = null;

if (BOT_TOKEN) {
    bot = new Telegraf(BOT_TOKEN);

    // Comando /start
    bot.start((ctx) => {
        ctx.reply('Bem-vindo à Loja Demo!', Markup.keyboard([
            [Markup.button.webApp('🛒 Abrir Loja', process.env.WEBAPP_URL || 'https://seu-url-ngrok.ngrok-free.app')]
        ]).resize());
    });

    // Lida com dados enviados pelo WebApp (quando o usuário clica em "Comprar" no frontend)
    // Nota: O Telegram envia os dados como uma mensagem de serviço se configurado via KeyboardButton.webApp
    // Mas se o WebApp usar sendData, o bot recebe no evento 'web_app_data'
    bot.on('web_app_data', (ctx) => {
        const data = ctx.webAppData.data.json();
        ctx.reply(`Pedido recebido! Você comprou: ${data.items.map(i => i.name).join(', ')}. Total: R$ ${data.total}`);
    });

    bot.launch().then(() => {
        console.log('Bot iniciado!');
    }).catch((err) => {
        console.error('Erro ao iniciar bot:', err);
    });

    // Graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
} else {
    console.log('BOT_TOKEN não definido no .env. O bot não será iniciado, apenas o servidor web.');
}

// Endpoint para receber pedidos via API (caso o frontend faça POST direto em vez de usar sendData do Telegram)
app.post('/api/order', (req, res) => {
    const { order, user } = req.body;
    console.log('Novo pedido recebido via API:', order);
    
    // Aqui você salvaria no banco de dados
    
    // Se tiver o bot e o chat_id, pode notificar o usuário
    if (bot && user && user.id) {
        bot.telegram.sendMessage(user.id, `Seu pedido foi processado com sucesso! ID: ${Date.now()}`);
    }

    res.json({ success: true, message: 'Pedido recebido com sucesso!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse http://localhost:${PORT} para ver a loja (em modo simulação)`);
});
