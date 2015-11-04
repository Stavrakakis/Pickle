/// <reference path="../../typings/flux/flux.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />


import Events = require("events");
import jquery = require("jquery");
import Dispatcher from "../Dispatcher/Dispatcher";

import Action from "../Actions/Action";
import NewMessageAction from "./NewMessageAction";
import ChannelActivationAction from "./ChannelActivationAction";
import NewChannelAction from "./NewChannelAction";
import Channel from "./Channel";
import IChannelStore from "./IChannelStore";
import ChannelStoreEvents from "../Channels/ChannelStoreEvents";

export default class ChannelStore extends Events.EventEmitter implements IChannelStore {

    constructor() {

        super();

        Dispatcher.register((action: Action) => {
            if (action instanceof NewMessageAction) {
                let newMessageAction = (<NewMessageAction>action);

                let uri = "/api/messages/" + newMessageAction.channel.id;
                let self = this;
                return jquery.ajax(
                    {
                        url: uri,
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify({ message: newMessageAction.message }),
                        success: (): void => {
                            self.emit(ChannelStoreEvents.NEW_MESSAGE, newMessageAction.message);
                        }
                    }
                );
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
        return jquery.get(
            "/api/channels",
            function (result: Array<Channel>): Array<Channel> {
                let data: Array<Channel> = result.map((apiModel: any) => { return new Channel(apiModel.id, apiModel.name); });
                return data;
            });
    }

    public getMessagesForChannel(channel: Channel): JQueryPromise<Array<string>> {

        return jquery.get("/api/messages/" + channel.id, function (messages: Array<string>): Array<string> {

            return messages;
        });
    }
}
