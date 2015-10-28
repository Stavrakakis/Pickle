/// <reference path="../../typings/react/react-global.d.ts" />

import dispatcher = require("../Dispatcher/Dispatcher")
import NewChannelAction = require("../Channels/NewChannelAction");
import ChannelStore = require("../Channels/ChannelStore");
import Channel from "../Channels/Channel";
import ChannelListItem from "./ChannelListItem";

export default class ChannelPanel extends React.Component<any, any> {

  private channelStore: ChannelStore;
  private channels: Array<Channel>;

  constructor(props : any) {
    super(props);

    this.channelStore = props.store;
    this.channels = this.channelStore.channels;
    this.state = {};
  }

  channelClicked = (event) => {
      console.log(event);
  }

  onNewChannel = (newChannel: NewChannelAction) => {
    this.setState({
       channels: this.channelStore.channels
      });
  }

  componentDidMount() {
      this.props.store.addListener(ChannelStore.NEW_CHANNEL, this.onNewChannel);
  }

  public render() {
    var channelList = this.channels.map((channel) => { return <ChannelListItem channel={channel}/>});

    return (
      <div>
        <ul>
          {channelList}
        </ul>
      </div>
      );
  };
}
