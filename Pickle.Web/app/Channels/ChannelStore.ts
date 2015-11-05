/// <reference path="../typings/flux/flux.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/signalr/signalr.d.ts" />
/// <reference path="../Hubs/ChatHub.ts" />

import events = require("events");
import dispatcher from "../Dispatcher/Dispatcher";

import Action from "../Actions/Action";
import SendMessageAction from "./SendMessageAction";
import ChannelActivationAction from "./ChannelActivationAction";
import NewChannelAction from "./NewChannelAction";
import Channel from "./Channel";
import IChannelStore from "./IChannelStore";
import ChannelStoreEvents from "../Channels/ChannelStoreEvents";
import ChatMessageApiModel from "./Models/ChatMessageApiModel";

export default class ChannelStore extends events.EventEmitter implements IChannelStore {

    private $: JQueryStatic;
    private dispatcherToken: string;

    constructor($: JQueryStatic) {
        
        super();

        this.$ = $;
        
        $.connection.chatHub.client.broadcastMessage = (channelId: string, username: string, message: string): void => {
            
            this.emit(ChannelStoreEvents.NEW_MESSAGE, new ChatMessageApiModel(channelId, username, message));
        };

        $.connection.hub.start();
        
        this.dispatcherToken =
            dispatcher.register((action: Action) => {
            if (action instanceof SendMessageAction) {
                
                let sendMessageAction = (<SendMessageAction>action);                

                this.sendMessageToChatHub(sendMessageAction.channel, sendMessageAction.message);
                this.sendMessageToApi(sendMessageAction.channel, sendMessageAction.message);                
            }

            if (action instanceof NewChannelAction) {
                // let newChannelAction = (<NewChannelAction>action);

                // this.emit(ChannelStoreEvents.NEW_CHANNEL, (newChannelAction.channel));
            }

            if (action instanceof ChannelActivationAction) {
                // let channelActivationAction = (<ChannelActivationAction>action);

                // this.emit(ChannelStoreEvents.CHANNEL_ACTIVATED, channelActivationAction);
            }
        });
    }

    public getChannels(): JQueryPromise<Array<Channel>> {
        return this.$.get(
            "/api/channels",
            (result: Array<Channel>): Array<Channel> => {
                let data: Array<Channel> = result.map((apiModel: any) => { return new Channel(apiModel.id, apiModel.name); });
                return data;
            });
    }

    public getMessagesForChannel(channel: Channel): JQueryPromise<Array<ChatMessageApiModel>> {

        return this.$.get("/api/messages/" + channel.id, (messages: Array<ChatMessageApiModel>) => {
            return messages;
        });
    }

    public dispose(): void {
        dispatcher.unregister(this.dispatcherToken);
    };

    // private 

    private sendMessageToChatHub(channel: Channel, message: string): void {
                
        this.$.connection.chatHub.server.send(channel.id, message);
    };

    private sendMessageToApi(channel: Channel, message: string): void {

        let uri = "/api/messages/" + channel.id;

        this.$.ajax(
            {
                url: uri,
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({ message: message })
            }
        );
    };
}

