/**
 * server.js — Custom Next.js server with Socket.IO embedded.
 *
 * WHY: Next.js API routes are stateless (serverless-style). They cannot hold
 * a persistent WebSocket connection. By wrapping Next.js in a custom HTTP
 * server, Socket.IO attaches to the same HTTP server, same port (3000).
 * One process. One deployment.
 *
 * HOW: Requests that match the Socket.IO path (/socket.io/*) are handled by
 * Socket.IO before Next.js ever sees them. All other requests pass through
 * to the standard Next.js request handler.
 *
 * API routes access the Socket.IO instance via: global._io
 */

const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');

const dev  = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3000', 10);

const app    = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    // 1. Create a plain Node HTTP server backed by Next.js
    const httpServer = createServer((req, res) => handle(req, res));

    // 2. Attach Socket.IO to the same HTTP server
    //    Using default path "/socket.io" — completely separate from /api/* routes
    const io = new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
        transports: ['websocket', 'polling'], // websocket preferred; polling as fallback
    });

    // 3. Expose the io instance globally so Next.js API routes can emit events
    global._io = io;

    // 4. Connection lifecycle logging
    io.on('connection', (socket) => {
        console.log(`[Socket.IO] Client connected    → ${socket.id}`);

        socket.on('disconnect', (reason) => {
            console.log(`[Socket.IO] Client disconnected ← ${socket.id} (${reason})`);
        });
    });

    // 5. Start listening
    httpServer.listen(port, () => {
        console.log(`\n> Next.js + Socket.IO ready on http://localhost:${port}`);
        console.log(`> Mode: ${dev ? 'development' : 'production'}\n`);
    });
});
