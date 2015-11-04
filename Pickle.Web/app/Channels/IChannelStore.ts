/// <reference path="../typings/flux/flux.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />

import Events = require("events");
import jquery = require("jquery");

import Channel from "./Channel";

interface IChannelStore {

    getChannels(): JQueryPromise<Array<Channel>>;
    getMessagesForChannel(channel: Channel): JQueryPromise<Array<string>>;
}

export default IChannelStore;

