/// <reference path="./typings/react/react-global.d.ts" />
/// <reference path="./typings/jquery/jquery.d.ts" />
/// <reference path="./Actions/Action.ts"/>

import $ = require("jquery");

require("./App.less");

import Channel from "./Channels/Channel";
import ChannelStore from "./Channels/ChannelStore";
import ChannelStoreEvents from "./Channels/ChannelStoreEvents";
import ChannelActivationAction from "./Channels/ChannelActivationAction";
import HubStore from "./Hubs/HubStore";
import { ChannelPanel } from "./ChannelPanel/ChannelPanel";
import ChatPanel from "./ChatPanel/ChatPanel";
import HubApiModel from "./Hubs/Models/HubApiModel";

class ChatAppProps {

}

class ChatAppState {
    public activeChannel: Channel;
}

export class ChatApp extends React.Component<ChatAppProps, ChatAppState> {

    private channelStore: ChannelStore;
    private hubStore: HubStore;
    private hub: HubApiModel;

    constructor(props: ChatAppProps) {
        super(props);

        this.channelStore = new ChannelStore($);
        this.hubStore = new HubStore();

        this.state = {
            activeChannel: null
        };
    }

    // handlers

    private onChannelActivated = (event: ChannelActivationAction): void => {
        this.setState({
            activeChannel: event.channel
        });
    };

    public render(): JSX.Element {
        
        if (!this.hub) {
            return <div></div>;
        }

        return (<div>
                    <ChannelPanel channelStore={this.channelStore} hub={this.hub} activeChannel={this.state.activeChannel} />
                    <ChatPanel channelStore={this.channelStore} activeChannel={this.state.activeChannel} />
                </div>);
    };

    public componentDidMount(): void {

        this.channelStore.addListener(ChannelStoreEvents.CHANNEL_ACTIVATED, this.onChannelActivated);

        this.hubStore.getHubs()
            .then((hubs: Array<HubApiModel>) => {

                this.hub = hubs[0];

                return this.channelStore.getChannelsForHub(this.hub.id).then((channels: Array<Channel>) => {
                    this.setState({
                        activeChannel: channels[0]
                    });
                });
            });        
    };
}

function render(): void {
    React.render(
        <ChatApp/>,
        document.getElementsByClassName("chatapp")[0]
    );
}

$(document).ready(() => {
    render();
});
