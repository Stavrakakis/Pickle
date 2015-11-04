/// <reference path="../typings/signalr/signalr.d.ts" />

interface SignalR {
    chatHub: IChatHub;
}

interface IChatHub {
    client: ChatClient;
    server: ChatServer;
}

interface ChatClient {
    broadcastMessage(name: string, message: string): void;
}

interface ChatServer {
    send(message: string): JQueryPromise<void>;
}