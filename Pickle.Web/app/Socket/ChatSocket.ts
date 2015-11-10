/// <reference path="../typings/signalr/signalr.d.ts" />

//import ChatMessageApiModel from "../Channels/Models/ChatMessageApiModel";

interface SignalR {
    chatHub: IChatHub;
}

interface IChatHub {
    client: ChatClient;
    server: ChatServer;
}

interface ChatClient {
    broadcastMessage(hubId: string, channelId: string, name: string, message: string, createdDate: Date): void;
}

interface ChatServer {
    send(hubId: string, channelId: string, message: string, createdDate: Date): JQueryPromise<void>;
}