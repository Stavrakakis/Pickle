/// <reference path="../../typings/react/react-global.d.ts" />

import dispatcher = require("../Dispatcher/Dispatcher")
import NewMessageAction = require("../Channels/NewMessageAction");
import ChannelStore = require("../Channels/ChannelStore");
import Channel from "../Channels/Channel";

export default class ChatPanel extends React.Component<any, any> {

  private channelStore: ChannelStore;

  constructor(props : any) {
    super(props);

    this.channelStore = props.store;

    this.state = {
      message: null,
      messages: [],
      activeChannel: props.activeChannel
    };
  }

  onMessageChanged = (event) => {
    this.setState({
        message: event.target.value
      });
  }

  onNewMessage = (newMessage: NewMessageAction) => {
    this.channelStore.getMessagesForChannel(this.state.activeChannel).then((messages) => {
      this.setState({
       messages: messages 
      });
    });    
  };

  messageUpdated = (event) => {
    this.setState({message: event.target.value});
  }

  sendMessage = (event) => {
    event.preventDefault();
    dispatcher.dispatch(new NewMessageAction(this.state.activeChannel, this.state.message));
    this.setState({message: null});
  }

  componentDidMount() {
      this.props.store.addListener(ChannelStore.NEW_MESSAGE, this.onNewMessage);
      
      this.channelStore.getMessagesForChannel(this.state.activeChannel)
        .then((messages) => { 
          this.setState({messages: messages});
        });
  }

  // the JSX syntax is quite intuitive but check out
  // https://facebook.github.io/react/docs/jsx-in-depth.html
  // if you need additional help
  public render() {
      var messages = [];

      for (var i=0; i < this.state.messages.length; i++) {
          messages.push(<div>{this.state.messages[i]}</div>);
      }

      return (
        <div>
          <header>Chat Panel - {this.state.activeChannel.name}</header>
          <div>{messages}</div>
          <form onSubmit={this.sendMessage}>
            <input type="text" value={this.state.message} onChange={this.onMessageChanged}/>
            <button type="submit">Send</button>
          </form>
        </div>
      );
  };
}
