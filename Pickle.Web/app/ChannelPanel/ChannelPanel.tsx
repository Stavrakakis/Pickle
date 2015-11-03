/// <reference path="../../typings/react/react-global.d.ts" />

import dispatcher = require("../Dispatcher/Dispatcher");

import Channel from "../Channels/Channel";
import ChannelStoreEvents from "../Channels/ChannelStoreEvents";
import ChannelListItem from "./ChannelListItem";
import ChannelStore from "../Channels/ChannelStore";
import NewChannelAction from "../Channels/NewChannelAction";

class ChannelPanelProps {
    channelStore: ChannelStore;
}

class ChannelPanelState {
    channels: Array<Channel>;
}

export default class ChannelPanel extends React.Component<ChannelPanelProps, ChannelPanelState> {
    
    constructor(props: ChannelPanelProps) {
        super(props);
        
        this.state = {
            channels: []
        };
    }

    channelClicked = (event) => {
        console.log(event);
    }

    onNewChannel = (newChannel: NewChannelAction) => {

        this.props.channelStore.getChannels().then((channels) => {
            this.setState({
                channels: channels
            });
        });
    }

    componentDidMount() {
        this.props.channelStore.addListener(ChannelStoreEvents.NEW_CHANNEL, this.onNewChannel);

        this.props.channelStore.getChannels().then((channels) => {
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