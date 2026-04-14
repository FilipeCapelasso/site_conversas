const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios'); // Instale: npm install axios

const app = express();
const server = http.createServer(app);
const io = new Server(server, { maxHttpBufferSize: 1e8 });

// CONFIGURAÇÃO SECRETA (Protegida no Servidor)
const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "SUA_URL_AQUI";

app.disable('x-powered-by');

// Proxy de Segurança para a Busca: O Token de IA nunca vaza para o usuário
app.get('/api/search', async (req, res) => {
    try {
        const { query } = req.query;
        // O servidor faz a chamada ao Google, o cliente nunca vê a SCRIPT_URL
        const response = await axios.get(`${SCRIPT_URL}?action=buscarUsuarios&query=${encodeURIComponent(query)}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// ... resto do seu código de Socket.io ...
