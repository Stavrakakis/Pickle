/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./Actions/Action.ts"/>

import Channel from "./Channels/Channel";
import ChannelStore from "./Channels/ChannelStore";
import ChannelPanel from "./ChannelPanel/ChannelPanel";
import ChatPanel from "./ChatPanel/ChatPanel";


class ChatAppProps {

}

class ChatAppState {
    public activeChatChannels: Array<Channel>;
}

export class ChatApp extends React.Component<ChatAppProps, ChatAppState> {

    private channelStore: ChannelStore;

    constructor(props: ChatAppProps) {
        super(props);

        this.channelStore = new ChannelStore();

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
            <ChannelPanel channelStore={this.channelStore}></ChannelPanel>
            {chatPanels}
                </div>
        );
    };

    public componentDidMount(): void {

        this.channelStore.getChannels().then((channels: Array<Channel>) => {
            this.setState({
                activeChatChannels: channels
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

render();
