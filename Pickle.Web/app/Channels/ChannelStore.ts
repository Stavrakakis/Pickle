/// <reference path="../typings/flux/flux.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/signalr/signalr.d.ts" />
/// <reference path="../Hubs/ChatHub" />

import events = require("events");
import $ = require("jquery");
import dispatcher from "../Dispatcher/Dispatcher";

import Action from "../Actions/Action";
import SendMessageAction from "./SendMessageAction";
import ChannelActivationAction from "./ChannelActivationAction";
import NewChannelAction from "./NewChannelAction";
import Channel from "./Channel";
import IChannelStore from "./IChannelStore";
import ChannelStoreEvents from "../Channels/ChannelStoreEvents";

export default class ChannelStore extends events.EventEmitter implements IChannelStore {

    constructor() {

        super();
        
        $.connection.chatHub.client.broadcastMessage = (name: string, message: string): void => {
            console.log(name + ", " + message);
        };

        $.connection.hub.start().done(() => {
            console.log("connected");
        });


        dispatcher.register((action: Action) => {
            if (action instanceof SendMessageAction) {
                
                let sendMessageAction = (<SendMessageAction>action);                
                this.sendMessageToChatHub(sendMessageAction.channel, sendMessageAction.message);
                this.sendMessageToApi(sendMessageAction.channel, sendMessageAction.message);                
            }

            if (action instanceof NewChannelAction) {
                let newChannelAction = (<NewChannelAction>action);
                this.emit(ChannelStoreEvents.NEW_CHANNEL, (newChannelAction.channel));
            }

            if (action instanceof ChannelActivationAction) {
                let channelActivationAction = (<ChannelActivationAction>action);

                this.emit(ChannelStoreEvents.CHANNEL_ACTIVATED, channelActivationAction);
            }
        });
    }

    public getChannels(): JQueryPromise<Array<Channel>> {
        return $.get(
            "/api/channels",
            function (result: Array<Channel>): Array<Channel> {
                let data: Array<Channel> = result.map((apiModel: any) => { return new Channel(apiModel.id, apiModel.name); });
                return data;
            });
    }

    public getMessagesForChannel(channel: Channel): JQueryPromise<Array<string>> {

        return $.get("/api/messages/" + channel.id, function (messages: Array<string>): Array<string> {

            return messages;
        });
    }

    private sendMessageToChatHub(channel: Channel, message: string): void {

        console.log("sending message to " + channel.name);
        
        $.connection.chatHub.server.send(message);
    };

    private sendMessageToApi(channel: Channel, message: string): void {

        let uri = "/api/messages/" + channel.id;

        $.ajax(
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
