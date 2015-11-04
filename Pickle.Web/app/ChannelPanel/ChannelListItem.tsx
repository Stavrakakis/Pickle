/// <reference path="../../typings/react/react-global.d.ts" />

import dispatcher from "../Dispatcher/Dispatcher";
import Channel from "../Channels/Channel";
import ChannelActivationAction from "../Channels/ChannelActivationAction";

class ChannelListItemProps {
    public channel: Channel;
}

class ChannelListItemState {
}

export default class ChannelListItem extends React.Component<ChannelListItemProps, ChannelListItemState> {

  private channel: Channel;

  constructor(props: ChannelListItemProps) {
    super(props);
    this.channel = props.channel;
  }

  private channelClicked = () => {
      dispatcher.dispatch(new ChannelActivationAction(this.channel));
  };

  public render(): JSX.Element {

    return (
      <li onClick={this.channelClicked}>{this.channel.name}</li>
      );
  };
}
