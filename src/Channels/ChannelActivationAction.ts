
import Action = require('../Actions/Action')
import Channel from "./Channel";
/**
 * A Flux Action which is sent to increment the Counter
 * This action is "marked" a view sourced action i.e. an action triggered by user interaction
 */
class ChannelActivationEvent extends Action{

    private _channel: Channel;

    constructor(channel: Channel){

        super(Action.Source.View)
        this._channel = channel;
    }

    get channel() {
        return this._channel;
    }
}

export = ChannelActivationEvent
