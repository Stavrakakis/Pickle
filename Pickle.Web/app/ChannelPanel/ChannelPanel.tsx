/// <reference path="../typings/react/react-global.d.ts" />

import Channel from "../Channels/Channel";
import ChannelStoreEvents from "../Channels/ChannelStoreEvents";
import ChannelListItem from "./ChannelListItem";
import ChannelStore from "../Channels/ChannelStore";

class ChannelPanelProps {
    public channelStore: ChannelStore;
}

class ChannelPanelState {
    public channels: Array<Channel>;
}

export default class ChannelPanel extends React.Component<ChannelPanelProps, ChannelPanelState> {

    constructor(props: ChannelPanelProps) {
        super(props);

        this.state = {
            channels: []
        };
    }

    private onNewChannel = (): void => {

        this.props.channelStore.getChannels().then((channels: Array<Channel>) => {
            this.setState({
                channels: channels
            });
        });
    };

    public componentDidMount(): void {
        this.props.channelStore.addListener(ChannelStoreEvents.NEW_CHANNEL, this.onNewChannel);

        this.props.channelStore.getChannels().then((channels: Array<Channel>) => {
            this.setState({
                channels: channels
            });
        });
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
}
