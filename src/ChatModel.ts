/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./IChatModel.d.ts"/>

export default class ChatModel implements IChatModel {

  messages: Array<string>;

  constructor() {
    this.messages = [];
  }
}
