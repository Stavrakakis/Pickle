
/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./IChatModel.d.ts"/>
/// <reference path="./ChatModel.ts"/>

import ChatModel from "./ChatModel";

namespace app.components {

  export class ChatApp extends React.Component<any, any> {

    constructor(props : any) {
      super(props);
      let model = new ChatModel();
      this.state = {
      };
    }

    // the JSX syntax is quite intuitive but check out
    // https://facebook.github.io/react/docs/jsx-in-depth.html
    // if you need additional help
    public render() {

        return (
          <div>Test App</div>
        );
    };
  }
}

var ChatApp = app.components.ChatApp;

function render() {
  React.render(
    <ChatApp />,
    document.getElementsByClassName('chatapp')[0]
  );
}

render();
