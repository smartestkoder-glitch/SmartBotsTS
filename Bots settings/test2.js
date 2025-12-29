import { createServer, createClient } from "minecraft-protocol";

const proxy = createServer({
    'online-mode': false,   // FunTime проверяет Mojang аккаунт
    host: '0.0.0.0',
    port: 25566,           // сюда будешь коннектиться из Minecraft
    version: '1.20.1'
});

proxy.on('login', client => {
    console.log(`[PROXY] Игрок зашел: ${client.username}`);

    const server = createClient({
        host: "mc.funtime.su", // адрес FunTime
        port: 25565,            // порт сервера
        username: client.username,
        version: '1.20.1'
    });

    client.on('packet', (data, meta) => {
        console.log("C->S", meta.name, data);
        server.write(meta.name, data);
    });

    server.on('packet', (data, meta) => {
        console.log("S->C", meta.name);
        client.write(meta.name, data);
    });

    server.on('end', () => console.log("[PROXY] Сервер закрыл соединение"));
    server.on('error', err => console.log("[PROXY] Ошибка сервера:", err));
});

proxy.on('error', err => console.log("[PROXY] Ошибка прокси:", err));
