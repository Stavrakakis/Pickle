
import Action = require('../Actions/Action')
import Channel from "./Channel";

export default class ChannelActivationEvent extends Action{

    private _channel: Channel;

    constructor(channel: Channel){

        super(Action.Source.View)
        this._channel = channel;
    }

    get channel() {
        return this._channel;
    }
}