/// <reference path="../../typings/react/react-global.d.ts" />

import dispatcher = require("../Dispatcher/Dispatcher");

import Channel from "../Channels/Channel";
import ChannelActivationAction from "../Channels/ChannelActivationAction";

class ChannelListItemProps {
    channel: Channel;
}

class ChannelListItemState {

}

export default class ChannelListItem extends React.Component<ChannelListItemProps, ChannelListItemState> {

  private channel: Channel;

  constructor(props: ChannelListItemProps) {
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