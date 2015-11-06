/// <reference path="../typings/signalr/signalr.d.ts" />

interface SignalR {
    chatHub: IChatHub;
}

interface IChatHub {
    client: ChatClient;
    server: ChatServer;
}

interface ChatClient {
    broadcastMessage(hubId: string, channelId: string, name: string, message: string): void;
}

interface ChatServer {
    send(hubId: string, channelId: string, message: string): JQueryPromise<void>;
}