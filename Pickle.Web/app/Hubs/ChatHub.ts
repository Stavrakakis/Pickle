/// <reference path="../typings/signalr/signalr.d.ts" />

interface SignalR {
    chatHub: IChatHub;
}

interface IChatHub {
    client: ChatClient;
    server: ChatServer;
}

interface ChatClient {
    broadcastMessage(channelId: string, name: string, message: string): void;
}

interface ChatServer {
    send(channelId: string, message: string): JQueryPromise<void>;
}