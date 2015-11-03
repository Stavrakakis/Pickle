import Channel from "./Channel";
import Action = require('../Actions/Action')

export default class NewMessageAction extends Action{

    private _message: string;
    private _channel: Channel;
    constructor(channel: Channel, message: string){

        super(Action.Source.View)
        this._message = message;
        this._channel = channel;
    }

    get message() {
        return this._message;
    }

    get channel() {
      return this._channel;
    }
}
