/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./Actions/Action.ts"/>

import dispatcher = require("./Dispatcher/Dispatcher")

import Channel from "./Channels/Channel";
import ChannelActivationAction from "./Channels/ChannelActivationAction";
import ChannelStoreEvents from "./Channels/ChannelStoreEvents";
import ChannelStore from "./Channels/ChannelStore";
import ChannelPanel from "./ChannelPanel/ChannelPanel";
import ChatPanel from "./ChatPanel/ChatPanel";
import NewMessageAction from "./Channels/NewMessageAction";

namespace app.components {

    class ChatAppProps {

    }
    
    class ChatAppState {
        activeChatChannels: Array<Channel>;
    }
    
    export class ChatApp extends React.Component<ChatAppProps, ChatAppState> {

        private messages: Array<string>;
        private channelStore: ChannelStore;
        private channels: Array<Channel>;
        private ChannelStore: ChannelStore;

        constructor(props: ChatAppProps) {
            super(props);

            this.channelStore = new ChannelStore();

            this.state = {
                activeChatChannels: []
            };
        }

        onChannelActivated = (channelActivationAction: ChannelActivationAction) => {
            
        }

        componentDidMount() {
            this.channelStore.addListener(ChannelStoreEvents.CHANNEL_ACTIVATED, this.onChannelActivated);

            this.channelStore.getChannels().then((channels) => {
                this.setState({
                    activeChatChannels: channels
                });
            });
        }

        public render() {

            var chatPanels = this.state.activeChatChannels.map((channel) => {
                return <ChatPanel channelStore={this.channelStore} activeChannel={channel}/>
            }); 

            return (
                <div>
                <ChannelPanel channelStore={this.channelStore}></ChannelPanel>
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
