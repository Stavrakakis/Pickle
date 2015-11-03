/// <reference path="../../typings/flux/flux.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />

import Dispatcher = require("../Dispatcher/Dispatcher");
import Action = require("../Actions/Action");
import NewMessageAction = require("./NewMessageAction");
import ChannelActivationAction = require("./ChannelActivationAction");
import NewChannelAction = require("./NewChannelAction");
import Events = require("events");
import Channel from "./Channel";
import jquery = require("jquery");
import IChannelStore from "./IChannelStore";
import ChannelStoreEvents from "../Channels/ChannelStoreEvents";

class ChannelStore extends Events.EventEmitter implements IChannelStore {
        
    constructor() {

        super();

        Dispatcher.register((action: Action) => {
            if (action instanceof NewMessageAction) {
                let newMessageAction = (<NewMessageAction>action);

                var uri = "https://localhost:44306/api/messages/" + newMessageAction.channel.id;
                var self = this;
                return jquery.ajax(
                    {
                        url: uri,
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify({ message: newMessageAction.message }),
                        success: function (messages) {
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

    getChannels(): JQueryPromise<Array<Channel>> {
        return jquery.get("https://localhost:44306/api/channels", function (result) {
            let data: Array<Channel> = result.map((apiModel) => { return new Channel(apiModel.id, apiModel.name); });
            return data;
        });
    }

    getMessagesForChannel(channel: Channel): JQueryPromise<Array<string>> {

        return jquery.get("https://localhost:44306/api/messages/" + channel.id, function (messages) {

            return messages;
        });
    }
}

export = ChannelStore;

