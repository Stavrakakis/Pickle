export default class Channel {
  name:string;
  participants: Array<string>;
  recentMessages: Array<string>;

  constructor(name: string) {
    this.name = name;
    this.recentMessages = [
      "Hello, this is a first message",
      "Sup, a second message"
    ];
  }
}
