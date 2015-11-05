/// <reference path="../typings/react/react-global.d.ts" />

import dispatcher from "../Dispatcher/Dispatcher";
import SendMessageAction from "../Channels/SendMessageAction";
import ChannelStore from "../Channels/ChannelStore";
import ChannelStoreEvents from "../Channels/ChannelStoreEvents";
import Channel from "../Channels/Channel";
import ChatMessageApiModel from "../Channels/Models/ChatMessageApiModel";

class ChatPanelProps {
    public channelStore: ChannelStore;
    public activeChannel: Channel;
}

class ChatPanelState {
    public message: string;
    public messages: Array<ChatMessageApiModel>;
}

export default class ChatPanel extends React.Component<ChatPanelProps, ChatPanelState> {

    constructor(props: ChatPanelProps) {
        super(props);

        this.state = {
            message: null,
            messages: []
        };
    }

    private onMessageChanged = (event: any): void => {
        this.setState({
            message: event.target.value,
            messages: this.state.messages
        });
    };

    private onNewMessage = () => {
        this.props.channelStore.getMessagesForChannel(this.props.activeChannel)
            .then((messages: Array<ChatMessageApiModel>) => {
                this.setState({
                    messages: messages,
                    message: this.state.message
                });
            });
    };

    private sendMessage = (event: any): void => {
        event.preventDefault();
        dispatcher.dispatch(new SendMessageAction(this.props.activeChannel, this.state.message));
        this.setState({
            message: null,
            messages: this.state.messages
        });
    };

    public componentDidMount(): void {
        this.props.channelStore.addListener(ChannelStoreEvents.NEW_MESSAGE, this.onNewMessage);

        this.props.channelStore.getMessagesForChannel(this.props.activeChannel)
            .then((messages: Array<ChatMessageApiModel>) => {
                this.setState({
                    message: this.state.message,
                    messages: messages
                });
            });
    };

    public render(): JSX.Element {

        let messages: Array<JSX.Element> = [];

        for (var i = 0; i < this.state.messages.length; i++) {
            messages.push(<div>{this.state.messages[i].message}</div>);
        }

        return (
            <div>
          <header>Chat Panel - {this.props.activeChannel.name}</header>
          <div>{messages}</div>
          <form onSubmit={this.sendMessage}>
            <input type="text" value={this.state.message} onChange={this.onMessageChanged}/>
            <button type="submit">Send</button>
              </form>
                </div>
        );
    };
}
