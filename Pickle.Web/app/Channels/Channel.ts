export default class Channel {
  id: string;
  name:string;
  participants: Array<string>;
  recentMessages: Array<string>;

  constructor(id: string, name: string) {
    this.name = name;
    this.recentMessages = [];
  }
}
