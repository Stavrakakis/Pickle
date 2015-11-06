/// <reference path="../typings/react/react.d.ts" />
/// <reference path="../typings/react/react-global.d.ts" />

import Channel from "../Channels/Channel";
import ChannelStoreEvents from "../Channels/ChannelStoreEvents";
import ChannelListItem from "./ChannelListItem";
import ChannelStore from "../Channels/ChannelStore";

export class ChannelPanelProps {
    public channelStore: ChannelStore;
    public hubId: string;
}

class ChannelPanelState {
    public channels: Array<Channel>;
}

export class ChannelPanel extends React.Component<ChannelPanelProps, ChannelPanelState> {

    constructor(props: ChannelPanelProps) {
        super(props);
        
        this.state = {
            channels: []
        };
    }

    // handlers

    private onNewChannel = (): void => {
        this.getChannels();
    };

    // public
        
    public componentDidMount(): void {
        this.props.channelStore.addListener(ChannelStoreEvents.NEW_CHANNEL, this.onNewChannel);

        this.getChannels();
    };

    public render(): JSX.Element {
        let channelList = this.state.channels.map((channel: Channel) => {
            return <ChannelListItem channel={channel}/>;
        });

        return (
            <div>
        <ul>
          {channelList}
            </ul>
                </div>
        );
    };
    
    // private 

    private getChannels(): JQueryPromise<void> {

        let channels = this.props.hubId
            ? this.props.channelStore.getChannelsForHub(this.props.hubId)
            : this.props.channelStore.getChannels();

        return channels.then((chans: Array<Channel>) => {
            this.setState({
                channels: chans
            });
        });
    };

}
