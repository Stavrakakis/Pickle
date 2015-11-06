/// <reference path="../typings/flux/flux.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />

import Events = require("events");
import jquery = require("jquery");

import Channel from "./Channel";
import ChatMessageApiModel from "./Models/ChatMessageApiModel";

interface IChannelStore {

    getChannels(): JQueryPromise<Array<Channel>>;
    getChannelsForHub(hubId: string): JQueryPromise<Array<Channel>>;
    getMessagesForChannel(channel: Channel): JQueryPromise<Array<ChatMessageApiModel>>;
}

export default IChannelStore;

