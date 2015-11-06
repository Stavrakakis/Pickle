/// <reference path="../typings/react/react.d.ts" />
/// <reference path="../typings/react/react-global.d.ts" />

import Channel from "../Channels/Channel";
import ChannelStoreEvents from "../Channels/ChannelStoreEvents";
import ChannelActivationAction from "../Channels/ChannelActivationAction";
import ChannelListItem from "./ChannelListItem";
import ChannelStore from "../Channels/ChannelStore";
import HubApiModel from "../Hubs/Models/HubApiModel";

export class ChannelPanelProps {
    public channelStore: ChannelStore;
    public hub: HubApiModel;
    public activeChannel: Channel;
}

class ChannelPanelState {
    public channels: Array<Channel>;
    public activeChannel: Channel;
}

export class ChannelPanel extends React.Component<ChannelPanelProps, ChannelPanelState> {

    constructor(props: ChannelPanelProps) {
        super(props);
        
        this.state = {
            channels: [],
            activeChannel: props.activeChannel
        };
    }
    
    // handlers

    private onChannelActivated = (event: ChannelActivationAction): void => {
        this.setState({
            channels: this.state.channels,
            activeChannel: event.channel
        });
    };
    private onNewChannel = (): void => {
        this.getChannels();
    };

    // public
        
    public componentDidMount(): void {

        this.props.channelStore.addListener(ChannelStoreEvents.CHANNEL_ACTIVATED, this.onChannelActivated);
        this.props.channelStore.addListener(ChannelStoreEvents.NEW_CHANNEL, this.onNewChannel);
        this.getChannels();
    };

    public render(): JSX.Element {

        let channelList = this.state.channels.map((channel: Channel) => {
            
            return <ChannelListItem channel={channel} active={ this.state.activeChannel.id === channel.id } />;
        });

        return (
            <div id="pickle-channel-panel">
                <h2>{this.props.hub ? this.props.hub.name : ""}</h2>
                <ul>
                    {channelList}
                </ul>
            </div>
        );
    };
    
    // private 

    private getChannels(): JQueryPromise<void> {

        let channels = this.props.hub
            ? this.props.channelStore.getChannelsForHub(this.props.hub.id)
            : this.props.channelStore.getChannels();

        return channels.then((chans: Array<Channel>) => {
            this.setState({
                channels: chans,
                activeChannel: this.state.activeChannel
            });
        });
    };

}
