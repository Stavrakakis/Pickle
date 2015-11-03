/// <reference path="../../typings/react/react-global.d.ts" />

import dispatcher = require("../Dispatcher/Dispatcher")
import NewChannelAction = require("../Channels/NewChannelAction");

import Channel from "../Channels/Channel";
import ChannelStoreEvents from "../Channels/ChannelStoreEvents";
import ChannelListItem from "./ChannelListItem";
import IChannelStore from "../Channels/IChannelStore";

export default class ChannelPanel extends React.Component<any, any> {

    private channelStore: IChannelStore;

    constructor(props: any) {
        super(props);

        this.channelStore = props.store;
        this.state = {
            channels: []
        };
    }

    channelClicked = (event) => {
        console.log(event);
    }

    onNewChannel = (newChannel: NewChannelAction) => {

        this.channelStore.getChannels().then((channels) => {
            this.setState({
                channels: channels
            });
        });
    }

    componentDidMount() {
        this.props.store.addListener(ChannelStoreEvents.NEW_CHANNEL, this.onNewChannel);

        this.channelStore.getChannels().then((channels) => {
            this.setState({
                channels: channels
            });
        });
    }

    public render() {
        var channelList = this.state.channels.map((channel) => { return <ChannelListItem channel={channel}/> });

        return (
            <div>
        <ul>
          {channelList}
            </ul>
                </div>
        );
    };
}
