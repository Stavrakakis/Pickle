/// <reference path="../../typings/flux/flux.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />

import Dispatcher = require("../Dispatcher/Dispatcher");
import Action = require("../Actions/Action");
import NewMessageAction = require("./NewMessageAction");
import ChannelActivationAction = require("./ChannelActivationAction");
import NewChannelAction = require("./NewChannelAction");
import Events = require("events");
import Channel from "./Channel";

class ChannelStore extends Events.EventEmitter {

  public static NEW_MESSAGE = "new_message";
  public static NEW_CHANNEL = "new_channel";
  public static CHANNEL_ACTIVATED = "channel_activated";

  private _channels: Array<Channel>;

  constructor() {

    super();
    this._channels = [new Channel("Bristol"), new Channel("Edinburgh")];

    Dispatcher.register((action: Action) => {
      if (action instanceof NewMessageAction) {
          let newMessageAction = (<NewMessageAction>action);

          let channel = this._channels.filter(c => c.name == newMessageAction.channel.name)[0];
          channel.recentMessages.push(newMessageAction.message);

          this.emit(ChannelStore.NEW_MESSAGE, newMessageAction.message);
      }

      if (action instanceof NewChannelAction) {
          let newChannelAction = (<NewChannelAction>action);
          this._channels.push(newChannelAction.channel);
          this.emit(ChannelStore.NEW_CHANNEL, (newChannelAction.channel));
      }

      if (action instanceof ChannelActivationAction) {
          let channelActivationAction = (<ChannelActivationAction>action);

          this.emit(ChannelStore.CHANNEL_ACTIVATED, channelActivationAction);
      }
    });
  }

  get channels(): Array<Channel> {
    return this._channels;
  }

  getMessagesForChannel(channel: Channel): Array<string> {
    return this.channels.filter(c => c.name == channel.name)[0].recentMessages;
  }
}

export = ChannelStore;
