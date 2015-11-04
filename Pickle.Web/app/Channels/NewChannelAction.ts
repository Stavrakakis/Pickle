import Action from "../Actions/Action";
import Channel from "./Channel";

export default class NewChannelAction extends Action {

    private _channel: Channel;

    constructor(channel: Channel) {

        super();
        this._channel = channel;
    }

    public get channel(): Channel {
        return this._channel;
    }
}
