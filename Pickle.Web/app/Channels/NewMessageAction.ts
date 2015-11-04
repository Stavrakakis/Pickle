import Channel from "./Channel";
import Action from "../Actions/Action";

export default class NewMessageAction extends Action {

    private _message: string;
    private _channel: Channel;

    constructor(channel: Channel, message: string) {

        super();

        this._message = message;
        this._channel = channel;
    }

    get message(): string {
        return this._message;
    }

    get channel(): Channel {
      return this._channel;
    }
}
