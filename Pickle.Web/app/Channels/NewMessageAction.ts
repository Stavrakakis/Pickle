import Channel from "./Channel";
import Action = require('../Actions/Action')

/**
 * A Flux Action which is sent to increment the Counter
 * This action is "marked" a view sourced action i.e. an action triggered by user interaction
 */
class NewMessageAction extends Action{

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

export = NewMessageAction
