/// <reference path="./typings/react/react-global.d.ts" />
/// <reference path="./typings/jquery/jquery.d.ts" />
/// <reference path="./Actions/Action.ts"/>

import $ = require("jquery");

import Channel from "./Channels/Channel";
import ChannelStore from "./Channels/ChannelStore";
import HubStore from "./Hubs/HubStore";
import { ChannelPanel } from "./ChannelPanel/ChannelPanel";
import ChatPanel from "./ChatPanel/ChatPanel";
import HubApiModel from "./Hubs/Models/HubApiModel";

class ChatAppProps {

}

class ChatAppState {
    public activeChatChannels: Array<Channel>;
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
            activeChatChannels: []
        };
    }

    public render(): JSX.Element {

        let chatPanels = this.state.activeChatChannels.map((channel: Channel) => {
            return <ChatPanel channelStore={this.channelStore} activeChannel={channel}/>;
        });

        return (
            <div>
                <h2>{ this.hub ? this.hub.name : null }</h2>
            <ChannelPanel channelStore={this.channelStore} hubId={ this.hub ? this.hub.id : null }></ChannelPanel>
            {chatPanels}
                </div>
        );
    };

    public componentDidMount(): void {

        this.hubStore.getHubs()
            .then((hubs: Array<HubApiModel>) => {

                this.hub = hubs[0];

                return this.channelStore.getChannelsForHub(this.hub.id).then((channels: Array<Channel>) => {
                    this.setState({
                        activeChatChannels: channels
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
