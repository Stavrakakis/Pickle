/// <reference path="../../typings/react/react-global.d.ts" />

import dispatcher = require("../Dispatcher/Dispatcher");
import Channel from "../Channels/Channel";
import ChannelActivationAction = require("../Channels/ChannelActivationAction");

export default class ChannelListItem extends React.Component<any, any> {

  private channel: Channel;

  constructor(props : any) {
    super(props);
    this.channel = props.channel;
  }

  channelClicked = (event) => {
      dispatcher.dispatch(new ChannelActivationAction(this.channel));
  }

  public render() {

    return (
      <li onClick={this.channelClicked}>{this.channel.name}</li>
      );
  };
}
