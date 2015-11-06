/// <reference path="../typings/react/react-global.d.ts" />

import $ = require("jquery");

import dispatcher from "../Dispatcher/Dispatcher";
import SendMessageAction from "../Channels/SendMessageAction";
import ChannelActivationAction from "../Channels/ChannelActivationAction";
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

    private chatId: string;
    
    constructor(props: ChatPanelProps) {
        super(props);

        this.chatId = this.props.activeChannel.hubId + this.props.activeChannel.id;

        this.state = {
            message: null,
            messages: []
        };
    }

    private onChannelActivated = (event: ChannelActivationAction): void => {
        this.getMessages(event.channel).then((messages: Array<ChatMessageApiModel>) => {

            this.chatId = this.props.activeChannel.hubId + this.props.activeChannel.id;

            this.setState({
                message: "",
                messages: messages
            });

            this.scrollToBottom();
        });
    };

    private onMessageChanged = (event: any): void => {
        this.setState({
            message: event.target.value,
            messages: this.state.messages
        });
    };

    private onNewMessage = (newMessage: ChatMessageApiModel) => {

        if (newMessage.channelId === this.props.activeChannel.id) {

            this.state.messages.push(newMessage);

            this.setState({
                messages: this.state.messages,
                message: this.state.message
            });

            this.scrollToBottom();
        }
    };

    private sendMessage = (event: any): void => {
        event.preventDefault();

        if (!this.state.message) {
            return;
        }

        dispatcher.dispatch(new SendMessageAction(this.props.activeChannel, this.state.message));
        this.setState({
            message: null,
            messages: this.state.messages
        });
    };

    public componentDidMount(): void {

        this.props.channelStore.addListener(ChannelStoreEvents.NEW_MESSAGE, this.onNewMessage);
        this.props.channelStore.addListener(ChannelStoreEvents.CHANNEL_ACTIVATED, this.onChannelActivated);

        this.getMessages(this.props.activeChannel)
            .then((messages: Array<ChatMessageApiModel>) => {
                this.setState({
                    messages: messages,
                    message: null
                });

                this.scrollToBottom();
            });
    };

    public render(): JSX.Element {

        let messages: Array<JSX.Element> = [];

        for (var i = 0; i < this.state.messages.length; i++) {
            let message = this.state.messages[i];
            messages.push(<div><span>{message.username}: </span><span>{message.message}</span></div>);
        }

        return (
            <section id={"p-chat-panel-container-" + this.chatId}
                     className="p-chat-panel-container">
                <header>{this.props.activeChannel.name}</header>
                <div id={"p-chat-panel-" + this.chatId} className="p-chat-panel">
                    <ul>
                      {messages}
                    </ul>
                </div>
                <form onSubmit={this.sendMessage}>
                    <input type="text" value={this.state.message} onChange={this.onMessageChanged}/>
                    <button type="submit">Send</button>
                </form>
            </section>);
    };
    
    // private

    private scrollToBottom(): void {
        let element = $("#p-chat-panel-" + this.chatId)[0];
        element.scrollTop = element.scrollHeight;
    };

    private getMessages(channel: Channel): JQueryPromise<Array<ChatMessageApiModel>> {
        return this.props.channelStore.getMessagesForChannel(channel)
            .then((messages: Array<ChatMessageApiModel>) => {
                return messages;
            });
    };
}
