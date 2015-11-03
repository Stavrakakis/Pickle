/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./Actions/Action.ts"/>

import dispatcher = require("./Dispatcher/Dispatcher")
import NewMessageAction = require("./Channels/NewMessageAction");
import ChannelActivationAction = require("./Channels/ChannelActivationAction");
import ChannelStore = require("./Channels/ChannelStore");
import Channel from "./Channels/Channel";
import ChannelPanel from "./ChannelPanel/ChannelPanel";
import ChatPanel from "./ChatPanel/ChatPanel";

namespace app.components {

    export class ChatApp extends React.Component<any, any> {

        private messages: Array<string>;
        private channelStore: ChannelStore;
        private channels: Array<Channel>;
        private ChannelStore: ChannelStore;
        private activeChatChannels: Array<Channel>;

        constructor(props: any) {
            super(props);

            this.channelStore = new ChannelStore();
            this.activeChatChannels = [];

            this.state = {
                activeChatChannels: this.activeChatChannels
            };
        }

        onChannelActivated = (channelActivationAction: ChannelActivationAction) => {

            this.activeChatChannels.push(channelActivationAction.channel);
            this.setState({
                activeChatChannels: this.activeChatChannels
            });
        }

        componentDidMount() {
            this.channelStore.addListener(ChannelStore.CHANNEL_ACTIVATED, this.onChannelActivated);

            this.channelStore.getChannels().then((channels) => {
                this.setState({
                    activeChatChannels: channels
                });
            });
        }

        // the JSX syntax is quite intuitive but check out
        // https://facebook.github.io/react/docs/jsx-in-depth.html
        // if you need additional help
        public render() {

            var chatPanels = this.state.activeChatChannels.map((channel) => {
                return <ChatPanel store={this.channelStore} activeChannel={channel}/>
            });

            return (
                <div>
                <ChannelPanel store={this.channelStore}></ChannelPanel>
                {chatPanels}
                </div>
            );
        };
    }
}

var ChatApp = app.components.ChatApp;
function render() {
    React.render(
        <ChatApp/>,
        document.getElementsByClassName('chatapp')[0]
    );
}




render();
