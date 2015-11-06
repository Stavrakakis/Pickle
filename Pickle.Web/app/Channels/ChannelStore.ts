/// <reference path="../typings/flux/flux.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/signalr/signalr.d.ts" />
/// <reference path="../Socket/ChatSocket.ts" />

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
import ChannelApiModel from "./Models/ChannelApiModel";

export default class ChannelStore extends events.EventEmitter implements IChannelStore {

    private $: JQueryStatic;
    private dispatcherToken: string;

    constructor($: JQueryStatic) {
        
        super();

        this.$ = $;
        
        $.connection.chatHub.client.broadcastMessage = (hubId: string, channelId: string, username: string, message: string): void => {
            
            this.emit(ChannelStoreEvents.NEW_MESSAGE, new ChatMessageApiModel(hubId, channelId, username, message));
        };

        $.connection.hub.start();
        
        this.dispatcherToken =
            dispatcher.register((action: Action) => {
            if (action instanceof SendMessageAction) {
                
                let sendMessageAction = (<SendMessageAction>action);                

                this.sendMessageToApi(sendMessageAction.channel, sendMessageAction.message)
                    .then(() => {
                        this.sendMessageToChatHub(sendMessageAction.channel, sendMessageAction.message);
                    })
                    .fail((error: any) => {
                        console.log(error);
                    });
                
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

        let uri = "/api/channels";

        return this.$.get(
            uri,
            (result: Array<Channel>): Array<Channel> => {
                let data: Array<Channel> = result.map((apiModel: any) => {
                    return new Channel(apiModel.id, apiModel.hubId, apiModel.name);
                });
                return data;
            });
    }

    public getChannelsForHub(hubId: string): JQueryPromise<Array<Channel>> {

        let uri = "/api/" + hubId + "/channels";

        return this.$.get(
            uri,
            (result: Array<ChannelApiModel>): Array<Channel> => {
                let data = result.map((apiModel: ChannelApiModel) => {
                    return new Channel(apiModel.id, apiModel.hubId, apiModel.name);
                });
                return data;
            });
    }

    public getMessagesForChannel(channel: Channel): JQueryPromise<Array<ChatMessageApiModel>> {

        let uri = "/api/" + channel.hubId + "/" + channel.id + "/messages";

        return this.$.get(uri, (messages: Array<ChatMessageApiModel>) => {
            return messages;
        });
    }

    public dispose(): void {
        dispatcher.unregister(this.dispatcherToken);
    };

    // private 

    private sendMessageToChatHub(channel: Channel, message: string): void {
                
        this.$.connection.chatHub.server.send(channel.hubId, channel.id, message);
    };

    private sendMessageToApi(channel: Channel, message: string): JQueryPromise<void> {

        let uri = "/api/" + channel.hubId + "/" + channel.id + "/messages";

        return this.$.ajax(
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

